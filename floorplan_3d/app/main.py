"""3D Floorplan app: installs the Lovelace card and serves a small status panel via ingress."""

import asyncio
import hashlib
import html
import json
import logging
import os
import shutil
from pathlib import Path

import aiohttp
from aiohttp import web

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
log = logging.getLogger("floorplan_3d")

CARD_SRC = Path("/app/www/floorplan-3d-card.js")
CONFIG_DIR = Path(os.environ.get("HA_CONFIG_DIR", "/homeassistant"))
WWW_DIR = CONFIG_DIR / "www"
CARD_DIR = WWW_DIR / "floorplan-3d"
CARD_DST = CARD_DIR / "floorplan-3d-card.js"
OPTIONS = Path("/data/options.json")
S6_ENV = Path("/run/s6/container_environment")


def read_env(name: str) -> str:
    """Read a container variable; s6-overlay may strip it from our process environment."""
    value = os.environ.get(name, "")
    if not value and (S6_ENV / name).is_file():
        value = (S6_ENV / name).read_text().strip()
    return value


TOKEN = read_env("SUPERVISOR_TOKEN")
WS_URL = "ws://supervisor/core/websocket"
API_URL = "http://supervisor/core/api"
CARD_FILE = "floorplan-3d-card.js"

state = {
    "version": "",
    "installed": False,
    "www_created": False,
    "resource": "nicht geprüft",
    "resource_ok": False,
    "url": "",
    "error": "",
}


def load_options() -> dict:
    try:
        return json.loads(OPTIONS.read_text())
    except (OSError, ValueError):
        return {"register_resource": True}


def install_card() -> str:
    """Copy the bundled card into /config/www and return its versioned /local URL."""
    state["www_created"] = not WWW_DIR.exists()
    CARD_DIR.mkdir(parents=True, exist_ok=True)
    shutil.copyfile(CARD_SRC, CARD_DST)
    digest = hashlib.sha256(CARD_SRC.read_bytes()).hexdigest()[:10]
    state["installed"] = True
    state["url"] = f"/local/floorplan-3d/{CARD_FILE}?v={digest}"
    log.info("Karte nach %s kopiert", CARD_DST)
    return state["url"]


class CoreWS:
    def __init__(self, session: aiohttp.ClientSession):
        self.session = session
        self.ws: aiohttp.ClientWebSocketResponse | None = None
        self.msg_id = 0

    async def __aenter__(self):
        self.ws = await self.session.ws_connect(WS_URL, heartbeat=30)
        msg = await self.ws.receive_json()
        if msg.get("type") != "auth_required":
            raise RuntimeError(f"Unerwartete Antwort: {msg}")
        if not TOKEN:
            raise RuntimeError("Kein SUPERVISOR_TOKEN vorhanden")
        await self.ws.send_json({"type": "auth", "access_token": TOKEN})
        msg = await self.ws.receive_json()
        if msg.get("type") != "auth_ok":
            raise RuntimeError(f"Anmeldung an Home Assistant fehlgeschlagen: {msg.get('message') or msg.get('type')}")
        return self

    async def __aexit__(self, *exc):
        if self.ws:
            await self.ws.close()

    async def call(self, payload: dict):
        self.msg_id += 1
        await self.ws.send_json({"id": self.msg_id, **payload})
        while True:
            msg = await self.ws.receive_json()
            if msg.get("id") == self.msg_id and msg.get("type") == "result":
                if not msg.get("success"):
                    err = msg.get("error", {})
                    raise RuntimeError(err.get("message") or json.dumps(err))
                return msg.get("result")


async def register_resource(url: str) -> None:
    async with aiohttp.ClientSession() as session:
        async with CoreWS(session) as ws:
            resources = await ws.call({"type": "lovelace/resources"})
            existing = [r for r in resources if CARD_FILE in r.get("url", "")]
            if not existing:
                await ws.call({"type": "lovelace/resources/create", "res_type": "module", "url": url})
                state["resource"] = "neu eingetragen"
            elif existing[0]["url"] != url:
                await ws.call(
                    {
                        "type": "lovelace/resources/update",
                        "resource_id": existing[0]["id"],
                        "res_type": "module",
                        "url": url,
                    }
                )
                state["resource"] = "aktualisiert"
            else:
                state["resource"] = "bereits eingetragen"
            for extra in existing[1:]:
                await ws.call({"type": "lovelace/resources/delete", "resource_id": extra["id"]})
    state["resource_ok"] = True
    state["error"] = ""
    log.info("Dashboard-Ressource %s: %s", state["resource"], url)


async def notify(title: str, message: str) -> None:
    async with aiohttp.ClientSession() as session:
        await session.post(
            f"{API_URL}/services/persistent_notification/create",
            headers={"Authorization": f"Bearer {TOKEN}"},
            json={"title": title, "message": message, "notification_id": "floorplan_3d"},
        )


async def setup() -> None:
    url = install_card()
    if not load_options().get("register_resource", True):
        state["resource"] = "automatisches Eintragen ist ausgeschaltet"
        return
    # Home Assistant may still be starting; retry for a few minutes.
    for attempt in range(30):
        try:
            await register_resource(url)
            break
        except Exception as err:  # noqa: BLE001
            state["error"] = str(err)
            if "yaml" in str(err).lower() or "mode" in str(err).lower():
                state["resource"] = "Dashboards laufen im YAML-Modus – bitte Ressource manuell eintragen"
                break
            log.warning("Ressource konnte nicht eingetragen werden (Versuch %s): %s", attempt + 1, err)
            await asyncio.sleep(10)
    else:
        state["resource"] = "fehlgeschlagen"

    if state["www_created"]:
        try:
            await notify(
                "3D Floorplan",
                "Der Ordner `www` wurde neu angelegt. Bitte Home Assistant **einmal neu starten**, "
                "damit die 3D Floorplan Card geladen werden kann.",
            )
        except Exception as err:  # noqa: BLE001
            log.warning("Benachrichtigung fehlgeschlagen: %s", err)


PAGE = """<!doctype html>
<html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>3D Floorplan</title>
<style>
:root {{ color-scheme: light dark; --ok:#2e7d32; --bad:#c62828; }}
body {{ font: 15px/1.5 system-ui, sans-serif; margin: 0; padding: 24px 16px; background: Canvas; color: CanvasText; }}
main {{ max-width: 720px; margin: 0 auto; }}
h1 {{ font-size: 22px; margin: 0 0 4px; }}
.card {{ border: 1px solid color-mix(in srgb, CanvasText 15%, transparent); border-radius: 12px; padding: 16px; margin: 16px 0; }}
dt {{ font-weight: 600; }} dd {{ margin: 0 0 8px; }}
.ok {{ color: var(--ok); }} .bad {{ color: var(--bad); }}
code {{ background: color-mix(in srgb, CanvasText 8%, transparent); padding: 1px 5px; border-radius: 4px; }}
button {{ font: inherit; padding: 6px 14px; border-radius: 8px; border: 1px solid #03a9f4; background: #03a9f4; color: #fff; cursor: pointer; }}
ol li {{ margin-bottom: 6px; }}
</style></head>
<body><main>
<h1>3D Floorplan</h1>
<div>Version {version}</div>
<div class="card"><dl>
<dt>Karte installiert</dt><dd class="{inst_cls}">{installed}</dd>
<dt>Dashboard-Ressource</dt><dd class="{res_cls}">{resource}</dd>
<dt>Ressourcen-URL</dt><dd><code>{url}</code></dd>
{error}
</dl>
<form method="post" action="register"><button>Ressource erneut eintragen</button></form>
</div>
<div class="card">
<b>So legst du deinen Grundriss an</b>
<ol>
<li>Ein Dashboard öffnen → <b>Bearbeiten</b> → <b>Karte hinzufügen</b>.</li>
<li>„<b>3D Floorplan Card</b>“ auswählen. Sie startet mit einer Beispielwohnung.</li>
<li>Im Editor mit <i>Raum + Wände</i>, <i>Wand</i>, <i>Tür</i>, <i>Fenster</i> deine Wohnung zeichnen.</li>
<li>Mit <i>Hitbox</i> Bereiche aufziehen und Entitäten zuweisen (Lampen, Sensoren, Buttons …).</li>
<li><b>Speichern</b> – fertig.</li>
</ol>
Taucht die Karte nicht auf, Browser-Cache leeren (Strg+F5){restart}.
</div>
</main></body></html>"""


async def page(_request: web.Request) -> web.Response:
    err = f'<dt>Letzter Fehler</dt><dd class="bad">{html.escape(state["error"])}</dd>' if state["error"] else ""
    body = PAGE.format(
        version=html.escape(state["version"]),
        installed="ja" if state["installed"] else "nein",
        inst_cls="ok" if state["installed"] else "bad",
        resource=html.escape(state["resource"]),
        res_cls="ok" if state["resource_ok"] else "bad",
        url=html.escape(state["url"] or "–"),
        error=err,
        restart=" und, falls der Ordner <code>www</code> neu angelegt wurde, Home Assistant einmal neu starten"
        if state["www_created"]
        else "",
    )
    return web.Response(text=body, content_type="text/html")


async def reregister(_request: web.Request) -> web.Response:
    try:
        await register_resource(install_card())
    except Exception as err:  # noqa: BLE001
        state["error"] = str(err)
    raise web.HTTPSeeOther("./")


@web.middleware
async def ingress_only(request: web.Request, handler):
    # Only the Supervisor ingress proxy may talk to us.
    if TOKEN and request.remote != "172.30.32.2":
        raise web.HTTPForbidden()
    return await handler(request)


async def main() -> None:
    try:
        state["version"] = Path("/app/VERSION").read_text().strip()
    except OSError:
        state["version"] = ""
    log.info("3D Floorplan %s, Token vorhanden: %s", state["version"] or "?", bool(TOKEN))
    app = web.Application(middlewares=[ingress_only])
    app.router.add_get("/", page)
    app.router.add_post("/register", reregister)
    runner = web.AppRunner(app)
    await runner.setup()
    await web.TCPSite(runner, "0.0.0.0", 8099).start()
    log.info("Panel läuft auf Port 8099")
    await setup()
    await asyncio.Event().wait()


if __name__ == "__main__":
    asyncio.run(main())
