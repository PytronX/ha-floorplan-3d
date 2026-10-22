var Vu=new Set(["light","switch","fan","input_boolean","cover","automation","media_player","humidifier","siren","valve"]),Gu=new Set(["button","input_button","scene","script"]),Wu=new Set(["on","open","opening","playing","unlocked","home","active"]);function tn(i){return i.split(".")[0]}function fl(i,t="tap"){let e=t==="hold"?i.hold_action??"more-info":t==="double_tap"?i.double_tap_action??"none":i.action??"auto";if(e!=="auto")return e;if(!i.entity)return"none";let n=tn(i.entity);return Vu.has(n)?"toggle":Gu.has(n)?"press":"more-info"}function di(i){return i?Wu.has(i.state)?!0:tn(i.entity_id)==="climate"?i.state!=="off"&&i.state!=="unavailable":!1:!1}function pl(i,t){i.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:t},bubbles:!0,composed:!0}))}async function sh(i,t,e,n="tap",s){if(!e.entity)return;let r=fl(e,n),o=e.entity,a=tn(o);switch(r){case"toggle":await i.callService("homeassistant","toggle",{entity_id:o});break;case"press":a==="button"||a==="input_button"?await i.callService(a,"press",{entity_id:o}):a==="scene"||a==="script"?await i.callService(a,"turn_on",{entity_id:o}):await i.callService("homeassistant","turn_on",{entity_id:o});break;case"more-info":s?s(o):pl(t,o);break}}function ki(i,t){if(!t)return"\u2014";if(i.formatEntityState)try{return i.formatEntityState(t)}catch{}let e=t.attributes.unit_of_measurement;return e?`${t.state} ${e}`:t.state}function Bi(i,t){return i?.attributes.friendly_name||t}function Hs(i){let t=i?.attributes??{};if(Array.isArray(t.rgb_color))return t.rgb_color;if(Array.isArray(t.hs_color))return $u(t.hs_color[0],t.hs_color[1]);let e=t.color_temp_kelvin??(t.color_temp?1e6/t.color_temp:void 0);return e?Xu(e):[255,214,160]}function $r(i){if(!i||i.state!=="on")return 0;let t=i.attributes.brightness;return t==null?1:Math.max(.03,Math.min(1,t/255))}function $u(i,t){let e=t/100,n=s=>{let r=(s+i/60)%6;return Math.round(255*(1-e*Math.max(0,Math.min(r,4-r,1))))};return[n(5),n(3),n(1)]}function Xu(i){let t=i/100,e=o=>Math.round(Math.max(0,Math.min(255,o))),n=t<=66?255:329.698727446*Math.pow(t-60,-.1332047592),s=t<=66?99.4708025861*Math.log(t)-161.1195681661:288.1221695283*Math.pow(t-60,-.0755148492),r=t>=66?255:t<=19?0:138.5177312231*Math.log(t-10)-305.0447927307;return[e(n),e(s),e(r)]}var ve={wall_height:250,wall_thickness:12,wall_color:"#e8e4dc",floor_color:"#c9b79c",height:420};function Dn(i){return{walls:i?.walls??[],openings:i?.openings??[],rooms:i?.rooms??[],hotspots:i?.hotspots??[],objects:i?.objects??[]}}var qu=["Erdgeschoss","Obergeschoss","Dachgeschoss"];function zs(i){return qu[i]??`${i}. Obergeschoss`}function Vs(i){return i.floors?.length?i.floors.map((t,e)=>({id:t.id||`f${e+1}`,name:t.name||zs(e),floorplan:Dn(t.floorplan)})):[{id:"f1",name:zs(0),floorplan:Dn(i.floorplan)}]}function hn(i){return i+Math.random().toString(36).slice(2,8)}function Hi(i){let t=0;for(let e=0;e<i.length;e++){let[n,s]=i[e],[r,o]=i[(e+1)%i.length];t+=n*o-r*s}return Math.abs(t)/2/1e4}function zi(i){return`${i.toLocaleString("de-DE",{minimumFractionDigits:1,maximumFractionDigits:1})} m\xB2`}var si={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},ri={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},kh=0,nc=1,Bh=2;var ic=1,Hh=2,Rn=3,gn=0,ze=1,an=2,Vn=0,xi=1,Dr=2,sc=3,rc=4,zh=5,Jn=100,Vh=101,Gh=102,Wh=103,$h=104,Xh=200,qh=201,Yh=202,Zh=203,wo=204,Eo=205,jh=206,Kh=207,Jh=208,Qh=209,td=210,ed=211,nd=212,id=213,sd=214,ia=0,sa=1,ra=2,_i=3,oa=4,aa=5,la=6,ca=7,oc=0,rd=1,od=2,Gn=0,ad=1,ld=2,cd=3,hd=4,dd=5,ud=6,fd=7;var ac=300,Ri=301,Ci=302,ha=303,da=304,Nr=306,as=1e3,Kn=1001,To=1002,sn=1003,pd=1004;var Ur=1005;var xn=1006,ua=1007;var oi=1008;var yn=1009,lc=1010,cc=1011,ws=1012,fa=1013,ai=1014,Cn=1015,Es=1016,pa=1017,ma=1018,Ts=1020,hc=35902,dc=35899,uc=1021,fc=1022,ln=1023,ls=1026,As=1027,pc=1028,ga=1029,mc=1030,xa=1031;var _a=1033,Fr=33776,Or=33777,kr=33778,Br=33779,va=35840,ya=35841,ba=35842,Ma=35843,Sa=36196,wa=37492,Ea=37496,Ta=37808,Aa=37809,Ra=37810,Ca=37811,Pa=37812,Ia=37813,La=37814,Da=37815,Na=37816,Ua=37817,Fa=37818,Oa=37819,ka=37820,Ba=37821,Ha=36492,za=36494,Va=36495,Ga=36283,Wa=36284,$a=36285,Xa=36286;var nr=2300,Ao=2301,Mo=2302,Wl=2400,$l=2401,Xl=2402;var md=3200,gd=3201;var gc=0,xd=1,Wn="",be="srgb",vi="srgb-linear",ir="linear",ie="srgb";var gi=7680;var ql=519,_d=512,vd=513,yd=514,xc=515,bd=516,Md=517,Sd=518,wd=519,Ro=35044;var _c="300 es",mn=2e3,sr=2001;var En=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){let n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){let n=this._listeners;if(n===void 0)return;let s=n[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let n=e[t.type];if(n!==void 0){t.target=this;let s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}},Le=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],rh=1234567,rs=Math.PI/180,cs=180/Math.PI;function wn(){let i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Le[i&255]+Le[i>>8&255]+Le[i>>16&255]+Le[i>>24&255]+"-"+Le[t&255]+Le[t>>8&255]+"-"+Le[t>>16&15|64]+Le[t>>24&255]+"-"+Le[e&63|128]+Le[e>>8&255]+"-"+Le[e>>16&255]+Le[e>>24&255]+Le[n&255]+Le[n>>8&255]+Le[n>>16&255]+Le[n>>24&255]).toLowerCase()}function $t(i,t,e){return Math.max(t,Math.min(e,i))}function vc(i,t){return(i%t+t)%t}function Yu(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function Zu(i,t,e){return i!==t?(e-i)/(t-i):0}function Qs(i,t,e){return(1-e)*i+e*t}function ju(i,t,e,n){return Qs(i,t,1-Math.exp(-e*n))}function Ku(i,t=1){return t-Math.abs(vc(i,t*2)-t)}function Ju(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function Qu(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function tf(i,t){return i+Math.floor(Math.random()*(t-i+1))}function ef(i,t){return i+Math.random()*(t-i)}function nf(i){return i*(.5-Math.random())}function sf(i){i!==void 0&&(rh=i);let t=rh+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function rf(i){return i*rs}function of(i){return i*cs}function af(i){return(i&i-1)===0&&i!==0}function lf(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function cf(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function hf(i,t,e,n,s){let r=Math.cos,o=Math.sin,a=r(e/2),l=o(e/2),c=r((t+n)/2),d=o((t+n)/2),h=r((t-n)/2),u=o((t-n)/2),p=r((n-t)/2),x=o((n-t)/2);switch(s){case"XYX":i.set(a*d,l*h,l*u,a*c);break;case"YZY":i.set(l*u,a*d,l*h,a*c);break;case"ZXZ":i.set(l*h,l*u,a*d,a*c);break;case"XZX":i.set(a*d,l*x,l*p,a*c);break;case"YXY":i.set(l*p,a*d,l*x,a*c);break;case"ZYZ":i.set(l*x,l*p,a*d,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function pn(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function ee(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}var Pi={DEG2RAD:rs,RAD2DEG:cs,generateUUID:wn,clamp:$t,euclideanModulo:vc,mapLinear:Yu,inverseLerp:Zu,lerp:Qs,damp:ju,pingpong:Ku,smoothstep:Ju,smootherstep:Qu,randInt:tf,randFloat:ef,randFloatSpread:nf,seededRandom:sf,degToRad:rf,radToDeg:of,isPowerOfTwo:af,ceilPowerOfTwo:lf,floorPowerOfTwo:cf,setQuaternionFromProperEuler:hf,normalize:ee,denormalize:pn},K=class i{constructor(t=0,e=0){i.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=$t(this.x,t.x,e.x),this.y=$t(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=$t(this.x,t,e),this.y=$t(this.y,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar($t(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos($t(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},rn=class{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let l=n[s+0],c=n[s+1],d=n[s+2],h=n[s+3],u=r[o+0],p=r[o+1],x=r[o+2],m=r[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=d,t[e+3]=h;return}if(a===1){t[e+0]=u,t[e+1]=p,t[e+2]=x,t[e+3]=m;return}if(h!==m||l!==u||c!==p||d!==x){let g=1-a,f=l*u+c*p+d*x+h*m,y=f>=0?1:-1,b=1-f*f;if(b>Number.EPSILON){let E=Math.sqrt(b),A=Math.atan2(E,f*y);g=Math.sin(g*A)/E,a=Math.sin(a*A)/E}let _=a*y;if(l=l*g+u*_,c=c*g+p*_,d=d*g+x*_,h=h*g+m*_,g===1-a){let E=1/Math.sqrt(l*l+c*c+d*d+h*h);l*=E,c*=E,d*=E,h*=E}}t[e]=l,t[e+1]=c,t[e+2]=d,t[e+3]=h}static multiplyQuaternionsFlat(t,e,n,s,r,o){let a=n[s],l=n[s+1],c=n[s+2],d=n[s+3],h=r[o],u=r[o+1],p=r[o+2],x=r[o+3];return t[e]=a*x+d*h+l*p-c*u,t[e+1]=l*x+d*u+c*h-a*p,t[e+2]=c*x+d*p+a*u-l*h,t[e+3]=d*x-a*h-l*u-c*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(n/2),d=a(s/2),h=a(r/2),u=l(n/2),p=l(s/2),x=l(r/2);switch(o){case"XYZ":this._x=u*d*h+c*p*x,this._y=c*p*h-u*d*x,this._z=c*d*x+u*p*h,this._w=c*d*h-u*p*x;break;case"YXZ":this._x=u*d*h+c*p*x,this._y=c*p*h-u*d*x,this._z=c*d*x-u*p*h,this._w=c*d*h+u*p*x;break;case"ZXY":this._x=u*d*h-c*p*x,this._y=c*p*h+u*d*x,this._z=c*d*x+u*p*h,this._w=c*d*h-u*p*x;break;case"ZYX":this._x=u*d*h-c*p*x,this._y=c*p*h+u*d*x,this._z=c*d*x-u*p*h,this._w=c*d*h+u*p*x;break;case"YZX":this._x=u*d*h+c*p*x,this._y=c*p*h+u*d*x,this._z=c*d*x-u*p*h,this._w=c*d*h-u*p*x;break;case"XZY":this._x=u*d*h-c*p*x,this._y=c*p*h-u*d*x,this._z=c*d*x+u*p*h,this._w=c*d*h+u*p*x;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],l=e[9],c=e[2],d=e[6],h=e[10],u=n+a+h;if(u>0){let p=.5/Math.sqrt(u+1);this._w=.25/p,this._x=(d-l)*p,this._y=(r-c)*p,this._z=(o-s)*p}else if(n>a&&n>h){let p=2*Math.sqrt(1+n-a-h);this._w=(d-l)/p,this._x=.25*p,this._y=(s+o)/p,this._z=(r+c)/p}else if(a>h){let p=2*Math.sqrt(1+a-n-h);this._w=(r-c)/p,this._x=(s+o)/p,this._y=.25*p,this._z=(l+d)/p}else{let p=2*Math.sqrt(1+h-n-a);this._w=(o-s)/p,this._x=(r+c)/p,this._y=(l+d)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs($t(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,l=e._y,c=e._z,d=e._w;return this._x=n*d+o*a+s*c-r*l,this._y=s*d+o*l+r*a-n*c,this._z=r*d+o*c+n*l-s*a,this._w=o*d-n*a-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);let n=this._x,s=this._y,r=this._z,o=this._w,a=o*t._w+n*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;let l=1-a*a;if(l<=Number.EPSILON){let p=1-e;return this._w=p*o+e*this._w,this._x=p*n+e*this._x,this._y=p*s+e*this._y,this._z=p*r+e*this._z,this.normalize(),this}let c=Math.sqrt(l),d=Math.atan2(c,a),h=Math.sin((1-e)*d)/c,u=Math.sin(e*d)/c;return this._w=o*h+this._w*u,this._x=n*h+this._x*u,this._y=s*h+this._y*u,this._z=r*h+this._z*u,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},R=class i{constructor(t=0,e=0,n=0){i.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(oh.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(oh.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){let e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*s-a*n),d=2*(a*e-r*s),h=2*(r*n-o*e);return this.x=e+l*c+o*h-a*d,this.y=n+l*d+a*c-r*h,this.z=s+l*h+r*d-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=$t(this.x,t.x,e.x),this.y=$t(this.y,t.y,e.y),this.z=$t(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=$t(this.x,t,e),this.y=$t(this.y,t,e),this.z=$t(this.z,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar($t(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,l=e.z;return this.x=s*l-r*a,this.y=r*o-n*l,this.z=n*a-s*o,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return ml.copy(this).projectOnVector(t),this.sub(ml)}reflect(t){return this.sub(ml.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos($t(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},ml=new R,oh=new rn,Gt=class i{constructor(t,e,n,s,r,o,a,l,c){i.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,l,c)}set(t,e,n,s,r,o,a,l,c){let d=this.elements;return d[0]=t,d[1]=s,d[2]=a,d[3]=e,d[4]=r,d[5]=l,d[6]=n,d[7]=o,d[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],d=n[4],h=n[7],u=n[2],p=n[5],x=n[8],m=s[0],g=s[3],f=s[6],y=s[1],b=s[4],_=s[7],E=s[2],A=s[5],P=s[8];return r[0]=o*m+a*y+l*E,r[3]=o*g+a*b+l*A,r[6]=o*f+a*_+l*P,r[1]=c*m+d*y+h*E,r[4]=c*g+d*b+h*A,r[7]=c*f+d*_+h*P,r[2]=u*m+p*y+x*E,r[5]=u*g+p*b+x*A,r[8]=u*f+p*_+x*P,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],d=t[8];return e*o*d-e*a*c-n*r*d+n*a*l+s*r*c-s*o*l}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],d=t[8],h=d*o-a*c,u=a*l-d*r,p=c*r-o*l,x=e*h+n*u+s*p;if(x===0)return this.set(0,0,0,0,0,0,0,0,0);let m=1/x;return t[0]=h*m,t[1]=(s*c-d*n)*m,t[2]=(a*n-s*o)*m,t[3]=u*m,t[4]=(d*e-s*l)*m,t[5]=(s*r-a*e)*m,t[6]=p*m,t[7]=(n*l-c*e)*m,t[8]=(o*e-n*r)*m,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+t,-s*c,s*l,-s*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(gl.makeScale(t,e)),this}rotate(t){return this.premultiply(gl.makeRotation(-t)),this}translate(t,e){return this.premultiply(gl.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}},gl=new Gt;function yc(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function hs(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Ed(){let i=hs("canvas");return i.style.display="block",i}var ah={};function ds(i){i in ah||(ah[i]=!0,console.warn(i))}function Td(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}var lh=new Gt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),ch=new Gt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function df(){let i={enabled:!0,workingColorSpace:vi,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===ie&&(s.r=Bn(s.r),s.g=Bn(s.g),s.b=Bn(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===ie&&(s.r=os(s.r),s.g=os(s.g),s.b=os(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Wn?ir:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return ds("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return ds("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[vi]:{primaries:t,whitePoint:n,transfer:ir,toXYZ:lh,fromXYZ:ch,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:be},outputColorSpaceConfig:{drawingBufferColorSpace:be}},[be]:{primaries:t,whitePoint:n,transfer:ie,toXYZ:lh,fromXYZ:ch,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:be}}}),i}var jt=df();function Bn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function os(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var Vi,Co=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{Vi===void 0&&(Vi=hs("canvas")),Vi.width=t.width,Vi.height=t.height;let s=Vi.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=Vi}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=hs("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Bn(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Bn(e[n]/255)*255):e[n]=Bn(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},uf=0,us=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:uf++}),this.uuid=wn(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):e instanceof VideoFrame?t.set(e.displayHeight,e.displayWidth,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(xl(s[o].image)):r.push(xl(s[o]))}else r=xl(s);n.url=r}return e||(t.images[this.uuid]=n),n}};function xl(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Co.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var ff=0,_l=new R,He=class i extends En{constructor(t=i.DEFAULT_IMAGE,e=i.DEFAULT_MAPPING,n=Kn,s=Kn,r=xn,o=oi,a=ln,l=yn,c=i.DEFAULT_ANISOTROPY,d=Wn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:ff++}),this.uuid=wn(),this.name="",this.source=new us(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new K(0,0),this.repeat=new K(1,1),this.center=new K(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Gt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(_l).x}get height(){return this.source.getSize(_l).y}get depth(){return this.source.getSize(_l).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let n=t[e];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==ac)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case as:t.x=t.x-Math.floor(t.x);break;case Kn:t.x=t.x<0?0:1;break;case To:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case as:t.y=t.y-Math.floor(t.y);break;case Kn:t.y=t.y<0?0:1;break;case To:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};He.DEFAULT_IMAGE=null;He.DEFAULT_MAPPING=ac;He.DEFAULT_ANISOTROPY=1;var ne=class i{constructor(t=0,e=0,n=0,s=1){i.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r,l=t.elements,c=l[0],d=l[4],h=l[8],u=l[1],p=l[5],x=l[9],m=l[2],g=l[6],f=l[10];if(Math.abs(d-u)<.01&&Math.abs(h-m)<.01&&Math.abs(x-g)<.01){if(Math.abs(d+u)<.1&&Math.abs(h+m)<.1&&Math.abs(x+g)<.1&&Math.abs(c+p+f-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let b=(c+1)/2,_=(p+1)/2,E=(f+1)/2,A=(d+u)/4,P=(h+m)/4,L=(x+g)/4;return b>_&&b>E?b<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(b),s=A/n,r=P/n):_>E?_<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(_),n=A/s,r=L/s):E<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(E),n=P/r,s=L/r),this.set(n,s,r,e),this}let y=Math.sqrt((g-x)*(g-x)+(h-m)*(h-m)+(u-d)*(u-d));return Math.abs(y)<.001&&(y=1),this.x=(g-x)/y,this.y=(h-m)/y,this.z=(u-d)/y,this.w=Math.acos((c+p+f-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=$t(this.x,t.x,e.x),this.y=$t(this.y,t.y,e.y),this.z=$t(this.z,t.z,e.z),this.w=$t(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=$t(this.x,t,e),this.y=$t(this.y,t,e),this.z=$t(this.z,t,e),this.w=$t(this.w,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar($t(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Po=class extends En{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:xn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new ne(0,0,t,e),this.scissorTest=!1,this.viewport=new ne(0,0,t,e);let s={width:t,height:e,depth:n.depth},r=new He(s);this.textures=[];let o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(t={}){let e={minFilter:xn,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let s=Object.assign({},t.textures[e].image);this.textures[e].source=new us(s)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},Tn=class extends Po{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},rr=class extends He{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=sn,this.minFilter=sn,this.wrapR=Kn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var Io=class extends He{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=sn,this.minFilter=sn,this.wrapR=Kn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var on=class{constructor(t=new R(1/0,1/0,1/0),e=new R(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(dn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(dn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=dn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,dn):dn.fromBufferAttribute(r,o),dn.applyMatrix4(t.matrixWorld),this.expandByPoint(dn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Xr.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Xr.copy(n.boundingBox)),Xr.applyMatrix4(t.matrixWorld),this.union(Xr)}let s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,dn),dn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Gs),qr.subVectors(this.max,Gs),Gi.subVectors(t.a,Gs),Wi.subVectors(t.b,Gs),$i.subVectors(t.c,Gs),$n.subVectors(Wi,Gi),Xn.subVectors($i,Wi),ui.subVectors(Gi,$i);let e=[0,-$n.z,$n.y,0,-Xn.z,Xn.y,0,-ui.z,ui.y,$n.z,0,-$n.x,Xn.z,0,-Xn.x,ui.z,0,-ui.x,-$n.y,$n.x,0,-Xn.y,Xn.x,0,-ui.y,ui.x,0];return!vl(e,Gi,Wi,$i,qr)||(e=[1,0,0,0,1,0,0,0,1],!vl(e,Gi,Wi,$i,qr))?!1:(Yr.crossVectors($n,Xn),e=[Yr.x,Yr.y,Yr.z],vl(e,Gi,Wi,$i,qr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,dn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(dn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Nn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Nn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Nn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Nn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Nn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Nn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Nn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Nn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Nn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},Nn=[new R,new R,new R,new R,new R,new R,new R,new R],dn=new R,Xr=new on,Gi=new R,Wi=new R,$i=new R,$n=new R,Xn=new R,ui=new R,Gs=new R,qr=new R,Yr=new R,fi=new R;function vl(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){fi.fromArray(i,r);let a=s.x*Math.abs(fi.x)+s.y*Math.abs(fi.y)+s.z*Math.abs(fi.z),l=t.dot(fi),c=e.dot(fi),d=n.dot(fi);if(Math.max(-Math.max(l,c,d),Math.min(l,c,d))>a)return!1}return!0}var pf=new on,Ws=new R,yl=new R,Hn=class{constructor(t=new R,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):pf.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Ws.subVectors(t,this.center);let e=Ws.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(Ws,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(yl.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Ws.copy(t.center).add(yl)),this.expandByPoint(Ws.copy(t.center).sub(yl))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},Un=new R,bl=new R,Zr=new R,qn=new R,Ml=new R,jr=new R,Sl=new R,Qn=class{constructor(t=new R,e=new R(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Un)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=Un.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Un.copy(this.origin).addScaledVector(this.direction,e),Un.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){bl.copy(t).add(e).multiplyScalar(.5),Zr.copy(e).sub(t).normalize(),qn.copy(this.origin).sub(bl);let r=t.distanceTo(e)*.5,o=-this.direction.dot(Zr),a=qn.dot(this.direction),l=-qn.dot(Zr),c=qn.lengthSq(),d=Math.abs(1-o*o),h,u,p,x;if(d>0)if(h=o*l-a,u=o*a-l,x=r*d,h>=0)if(u>=-x)if(u<=x){let m=1/d;h*=m,u*=m,p=h*(h+o*u+2*a)+u*(o*h+u+2*l)+c}else u=r,h=Math.max(0,-(o*u+a)),p=-h*h+u*(u+2*l)+c;else u=-r,h=Math.max(0,-(o*u+a)),p=-h*h+u*(u+2*l)+c;else u<=-x?(h=Math.max(0,-(-o*r+a)),u=h>0?-r:Math.min(Math.max(-r,-l),r),p=-h*h+u*(u+2*l)+c):u<=x?(h=0,u=Math.min(Math.max(-r,-l),r),p=u*(u+2*l)+c):(h=Math.max(0,-(o*r+a)),u=h>0?r:Math.min(Math.max(-r,-l),r),p=-h*h+u*(u+2*l)+c);else u=o>0?-r:r,h=Math.max(0,-(o*u+a)),p=-h*h+u*(u+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,h),s&&s.copy(bl).addScaledVector(Zr,u),p}intersectSphere(t,e){Un.subVectors(t.center,this.origin);let n=Un.dot(this.direction),s=Un.dot(Un)-n*n,r=t.radius*t.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,l,c=1/this.direction.x,d=1/this.direction.y,h=1/this.direction.z,u=this.origin;return c>=0?(n=(t.min.x-u.x)*c,s=(t.max.x-u.x)*c):(n=(t.max.x-u.x)*c,s=(t.min.x-u.x)*c),d>=0?(r=(t.min.y-u.y)*d,o=(t.max.y-u.y)*d):(r=(t.max.y-u.y)*d,o=(t.min.y-u.y)*d),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),h>=0?(a=(t.min.z-u.z)*h,l=(t.max.z-u.z)*h):(a=(t.max.z-u.z)*h,l=(t.min.z-u.z)*h),n>l||a>s)||((a>n||n!==n)&&(n=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,Un)!==null}intersectTriangle(t,e,n,s,r){Ml.subVectors(e,t),jr.subVectors(n,t),Sl.crossVectors(Ml,jr);let o=this.direction.dot(Sl),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;qn.subVectors(this.origin,t);let l=a*this.direction.dot(jr.crossVectors(qn,jr));if(l<0)return null;let c=a*this.direction.dot(Ml.cross(qn));if(c<0||l+c>o)return null;let d=-a*qn.dot(Sl);return d<0?null:this.at(d/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},se=class i{constructor(t,e,n,s,r,o,a,l,c,d,h,u,p,x,m,g){i.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,l,c,d,h,u,p,x,m,g)}set(t,e,n,s,r,o,a,l,c,d,h,u,p,x,m,g){let f=this.elements;return f[0]=t,f[4]=e,f[8]=n,f[12]=s,f[1]=r,f[5]=o,f[9]=a,f[13]=l,f[2]=c,f[6]=d,f[10]=h,f[14]=u,f[3]=p,f[7]=x,f[11]=m,f[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){let e=this.elements,n=t.elements,s=1/Xi.setFromMatrixColumn(t,0).length(),r=1/Xi.setFromMatrixColumn(t,1).length(),o=1/Xi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(s),c=Math.sin(s),d=Math.cos(r),h=Math.sin(r);if(t.order==="XYZ"){let u=o*d,p=o*h,x=a*d,m=a*h;e[0]=l*d,e[4]=-l*h,e[8]=c,e[1]=p+x*c,e[5]=u-m*c,e[9]=-a*l,e[2]=m-u*c,e[6]=x+p*c,e[10]=o*l}else if(t.order==="YXZ"){let u=l*d,p=l*h,x=c*d,m=c*h;e[0]=u+m*a,e[4]=x*a-p,e[8]=o*c,e[1]=o*h,e[5]=o*d,e[9]=-a,e[2]=p*a-x,e[6]=m+u*a,e[10]=o*l}else if(t.order==="ZXY"){let u=l*d,p=l*h,x=c*d,m=c*h;e[0]=u-m*a,e[4]=-o*h,e[8]=x+p*a,e[1]=p+x*a,e[5]=o*d,e[9]=m-u*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){let u=o*d,p=o*h,x=a*d,m=a*h;e[0]=l*d,e[4]=x*c-p,e[8]=u*c+m,e[1]=l*h,e[5]=m*c+u,e[9]=p*c-x,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){let u=o*l,p=o*c,x=a*l,m=a*c;e[0]=l*d,e[4]=m-u*h,e[8]=x*h+p,e[1]=h,e[5]=o*d,e[9]=-a*d,e[2]=-c*d,e[6]=p*h+x,e[10]=u-m*h}else if(t.order==="XZY"){let u=o*l,p=o*c,x=a*l,m=a*c;e[0]=l*d,e[4]=-h,e[8]=c*d,e[1]=u*h+m,e[5]=o*d,e[9]=p*h-x,e[2]=x*h-p,e[6]=a*d,e[10]=m*h+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(mf,t,gf)}lookAt(t,e,n){let s=this.elements;return qe.subVectors(t,e),qe.lengthSq()===0&&(qe.z=1),qe.normalize(),Yn.crossVectors(n,qe),Yn.lengthSq()===0&&(Math.abs(n.z)===1?qe.x+=1e-4:qe.z+=1e-4,qe.normalize(),Yn.crossVectors(n,qe)),Yn.normalize(),Kr.crossVectors(qe,Yn),s[0]=Yn.x,s[4]=Kr.x,s[8]=qe.x,s[1]=Yn.y,s[5]=Kr.y,s[9]=qe.y,s[2]=Yn.z,s[6]=Kr.z,s[10]=qe.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],d=n[1],h=n[5],u=n[9],p=n[13],x=n[2],m=n[6],g=n[10],f=n[14],y=n[3],b=n[7],_=n[11],E=n[15],A=s[0],P=s[4],L=s[8],w=s[12],S=s[1],I=s[5],D=s[9],H=s[13],O=s[2],U=s[6],z=s[10],q=s[14],V=s[3],rt=s[7],nt=s[11],ht=s[15];return r[0]=o*A+a*S+l*O+c*V,r[4]=o*P+a*I+l*U+c*rt,r[8]=o*L+a*D+l*z+c*nt,r[12]=o*w+a*H+l*q+c*ht,r[1]=d*A+h*S+u*O+p*V,r[5]=d*P+h*I+u*U+p*rt,r[9]=d*L+h*D+u*z+p*nt,r[13]=d*w+h*H+u*q+p*ht,r[2]=x*A+m*S+g*O+f*V,r[6]=x*P+m*I+g*U+f*rt,r[10]=x*L+m*D+g*z+f*nt,r[14]=x*w+m*H+g*q+f*ht,r[3]=y*A+b*S+_*O+E*V,r[7]=y*P+b*I+_*U+E*rt,r[11]=y*L+b*D+_*z+E*nt,r[15]=y*w+b*H+_*q+E*ht,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],l=t[9],c=t[13],d=t[2],h=t[6],u=t[10],p=t[14],x=t[3],m=t[7],g=t[11],f=t[15];return x*(+r*l*h-s*c*h-r*a*u+n*c*u+s*a*p-n*l*p)+m*(+e*l*p-e*c*u+r*o*u-s*o*p+s*c*d-r*l*d)+g*(+e*c*h-e*a*p-r*o*h+n*o*p+r*a*d-n*c*d)+f*(-s*a*d-e*l*h+e*a*u+s*o*h-n*o*u+n*l*d)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],d=t[8],h=t[9],u=t[10],p=t[11],x=t[12],m=t[13],g=t[14],f=t[15],y=h*g*c-m*u*c+m*l*p-a*g*p-h*l*f+a*u*f,b=x*u*c-d*g*c-x*l*p+o*g*p+d*l*f-o*u*f,_=d*m*c-x*h*c+x*a*p-o*m*p-d*a*f+o*h*f,E=x*h*l-d*m*l-x*a*u+o*m*u+d*a*g-o*h*g,A=e*y+n*b+s*_+r*E;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let P=1/A;return t[0]=y*P,t[1]=(m*u*r-h*g*r-m*s*p+n*g*p+h*s*f-n*u*f)*P,t[2]=(a*g*r-m*l*r+m*s*c-n*g*c-a*s*f+n*l*f)*P,t[3]=(h*l*r-a*u*r-h*s*c+n*u*c+a*s*p-n*l*p)*P,t[4]=b*P,t[5]=(d*g*r-x*u*r+x*s*p-e*g*p-d*s*f+e*u*f)*P,t[6]=(x*l*r-o*g*r-x*s*c+e*g*c+o*s*f-e*l*f)*P,t[7]=(o*u*r-d*l*r+d*s*c-e*u*c-o*s*p+e*l*p)*P,t[8]=_*P,t[9]=(x*h*r-d*m*r-x*n*p+e*m*p+d*n*f-e*h*f)*P,t[10]=(o*m*r-x*a*r+x*n*c-e*m*c-o*n*f+e*a*f)*P,t[11]=(d*a*r-o*h*r-d*n*c+e*h*c+o*n*p-e*a*p)*P,t[12]=E*P,t[13]=(d*m*s-x*h*s+x*n*u-e*m*u-d*n*g+e*h*g)*P,t[14]=(x*a*s-o*m*s-x*n*l+e*m*l+o*n*g-e*a*g)*P,t[15]=(o*h*s-d*a*s+d*n*l-e*h*l-o*n*u+e*a*u)*P,this}scale(t){let e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,l=t.z,c=r*o,d=r*a;return this.set(c*o+n,c*a-s*l,c*l+s*a,0,c*a+s*l,d*a+n,d*l-s*o,0,c*l-s*a,d*l+s*o,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){let s=this.elements,r=e._x,o=e._y,a=e._z,l=e._w,c=r+r,d=o+o,h=a+a,u=r*c,p=r*d,x=r*h,m=o*d,g=o*h,f=a*h,y=l*c,b=l*d,_=l*h,E=n.x,A=n.y,P=n.z;return s[0]=(1-(m+f))*E,s[1]=(p+_)*E,s[2]=(x-b)*E,s[3]=0,s[4]=(p-_)*A,s[5]=(1-(u+f))*A,s[6]=(g+y)*A,s[7]=0,s[8]=(x+b)*P,s[9]=(g-y)*P,s[10]=(1-(u+m))*P,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){let s=this.elements,r=Xi.set(s[0],s[1],s[2]).length(),o=Xi.set(s[4],s[5],s[6]).length(),a=Xi.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],un.copy(this);let c=1/r,d=1/o,h=1/a;return un.elements[0]*=c,un.elements[1]*=c,un.elements[2]*=c,un.elements[4]*=d,un.elements[5]*=d,un.elements[6]*=d,un.elements[8]*=h,un.elements[9]*=h,un.elements[10]*=h,e.setFromRotationMatrix(un),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,s,r,o,a=mn,l=!1){let c=this.elements,d=2*r/(e-t),h=2*r/(n-s),u=(e+t)/(e-t),p=(n+s)/(n-s),x,m;if(l)x=r/(o-r),m=o*r/(o-r);else if(a===mn)x=-(o+r)/(o-r),m=-2*o*r/(o-r);else if(a===sr)x=-o/(o-r),m=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=d,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=h,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=x,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=mn,l=!1){let c=this.elements,d=2/(e-t),h=2/(n-s),u=-(e+t)/(e-t),p=-(n+s)/(n-s),x,m;if(l)x=1/(o-r),m=o/(o-r);else if(a===mn)x=-2/(o-r),m=-(o+r)/(o-r);else if(a===sr)x=-1/(o-r),m=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=d,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=h,c[9]=0,c[13]=p,c[2]=0,c[6]=0,c[10]=x,c[14]=m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}},Xi=new R,un=new se,mf=new R(0,0,0),gf=new R(1,1,1),Yn=new R,Kr=new R,qe=new R,hh=new se,dh=new rn,_n=class i{constructor(t=0,e=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let s=t.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],d=s[9],h=s[2],u=s[6],p=s[10];switch(e){case"XYZ":this._y=Math.asin($t(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-d,p),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-$t(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin($t(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-h,p),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-$t(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(u,p),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin($t(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-d,c),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-$t(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-d,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return hh.makeRotationFromQuaternion(t),this.setFromRotationMatrix(hh,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return dh.setFromEuler(this),this.setFromQuaternion(dh,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};_n.DEFAULT_ORDER="XYZ";var fs=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},xf=0,uh=new R,qi=new rn,Fn=new se,Jr=new R,$s=new R,_f=new R,vf=new rn,fh=new R(1,0,0),ph=new R(0,1,0),mh=new R(0,0,1),gh={type:"added"},yf={type:"removed"},Yi={type:"childadded",child:null},wl={type:"childremoved",child:null},we=class i extends En{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:xf++}),this.uuid=wn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let t=new R,e=new _n,n=new rn,s=new R(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new se},normalMatrix:{value:new Gt}}),this.matrix=new se,this.matrixWorld=new se,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new fs,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return qi.setFromAxisAngle(t,e),this.quaternion.multiply(qi),this}rotateOnWorldAxis(t,e){return qi.setFromAxisAngle(t,e),this.quaternion.premultiply(qi),this}rotateX(t){return this.rotateOnAxis(fh,t)}rotateY(t){return this.rotateOnAxis(ph,t)}rotateZ(t){return this.rotateOnAxis(mh,t)}translateOnAxis(t,e){return uh.copy(t).applyQuaternion(this.quaternion),this.position.add(uh.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(fh,t)}translateY(t){return this.translateOnAxis(ph,t)}translateZ(t){return this.translateOnAxis(mh,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Fn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Jr.copy(t):Jr.set(t,e,n);let s=this.parent;this.updateWorldMatrix(!0,!1),$s.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Fn.lookAt($s,Jr,this.up):Fn.lookAt(Jr,$s,this.up),this.quaternion.setFromRotationMatrix(Fn),s&&(Fn.extractRotation(s.matrixWorld),qi.setFromRotationMatrix(Fn),this.quaternion.premultiply(qi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(gh),Yi.child=t,this.dispatchEvent(Yi),Yi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(yf),wl.child=t,this.dispatchEvent(wl),wl.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Fn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Fn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Fn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(gh),Yi.child=t,this.dispatchEvent(Yi),Yi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){let o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose($s,t,_f),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose($s,vf,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){let n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let l=a.shapes;if(Array.isArray(l))for(let c=0,d=l.length;c<d;c++){let h=l[c];r(t.shapes,h)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(t.materials,this.material[l]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let l=this.animations[a];s.animations.push(r(t.animations,l))}}if(e){let a=o(t.geometries),l=o(t.materials),c=o(t.textures),d=o(t.images),h=o(t.shapes),u=o(t.skeletons),p=o(t.animations),x=o(t.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),d.length>0&&(n.images=d),h.length>0&&(n.shapes=h),u.length>0&&(n.skeletons=u),p.length>0&&(n.animations=p),x.length>0&&(n.nodes=x)}return n.object=s,n;function o(a){let l=[];for(let c in a){let d=a[c];delete d.metadata,l.push(d)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let s=t.children[n];this.add(s.clone())}return this}};we.DEFAULT_UP=new R(0,1,0);we.DEFAULT_MATRIX_AUTO_UPDATE=!0;we.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var fn=new R,On=new R,El=new R,kn=new R,Zi=new R,ji=new R,xh=new R,Tl=new R,Al=new R,Rl=new R,Cl=new ne,Pl=new ne,Il=new ne,Mn=class i{constructor(t=new R,e=new R,n=new R){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),fn.subVectors(t,e),s.cross(fn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){fn.subVectors(s,e),On.subVectors(n,e),El.subVectors(t,e);let o=fn.dot(fn),a=fn.dot(On),l=fn.dot(El),c=On.dot(On),d=On.dot(El),h=o*c-a*a;if(h===0)return r.set(0,0,0),null;let u=1/h,p=(c*l-a*d)*u,x=(o*d-a*l)*u;return r.set(1-p-x,x,p)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,kn)===null?!1:kn.x>=0&&kn.y>=0&&kn.x+kn.y<=1}static getInterpolation(t,e,n,s,r,o,a,l){return this.getBarycoord(t,e,n,s,kn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,kn.x),l.addScaledVector(o,kn.y),l.addScaledVector(a,kn.z),l)}static getInterpolatedAttribute(t,e,n,s,r,o){return Cl.setScalar(0),Pl.setScalar(0),Il.setScalar(0),Cl.fromBufferAttribute(t,e),Pl.fromBufferAttribute(t,n),Il.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(Cl,r.x),o.addScaledVector(Pl,r.y),o.addScaledVector(Il,r.z),o}static isFrontFacing(t,e,n,s){return fn.subVectors(n,e),On.subVectors(t,e),fn.cross(On).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return fn.subVectors(this.c,this.b),On.subVectors(this.a,this.b),fn.cross(On).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return i.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return i.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return i.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return i.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return i.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,s=this.b,r=this.c,o,a;Zi.subVectors(s,n),ji.subVectors(r,n),Tl.subVectors(t,n);let l=Zi.dot(Tl),c=ji.dot(Tl);if(l<=0&&c<=0)return e.copy(n);Al.subVectors(t,s);let d=Zi.dot(Al),h=ji.dot(Al);if(d>=0&&h<=d)return e.copy(s);let u=l*h-d*c;if(u<=0&&l>=0&&d<=0)return o=l/(l-d),e.copy(n).addScaledVector(Zi,o);Rl.subVectors(t,r);let p=Zi.dot(Rl),x=ji.dot(Rl);if(x>=0&&p<=x)return e.copy(r);let m=p*c-l*x;if(m<=0&&c>=0&&x<=0)return a=c/(c-x),e.copy(n).addScaledVector(ji,a);let g=d*x-p*h;if(g<=0&&h-d>=0&&p-x>=0)return xh.subVectors(r,s),a=(h-d)/(h-d+(p-x)),e.copy(s).addScaledVector(xh,a);let f=1/(g+m+u);return o=m*f,a=u*f,e.copy(n).addScaledVector(Zi,o).addScaledVector(ji,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},Ad={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Zn={h:0,s:0,l:0},Qr={h:0,s:0,l:0};function Ll(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}var kt=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=be){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,jt.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=jt.workingColorSpace){return this.r=t,this.g=e,this.b=n,jt.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=jt.workingColorSpace){if(t=vc(t,1),e=$t(e,0,1),n=$t(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=Ll(o,r,t+1/3),this.g=Ll(o,r,t),this.b=Ll(o,r,t-1/3)}return jt.colorSpaceToWorking(this,s),this}setStyle(t,e=be){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=be){let n=Ad[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Bn(t.r),this.g=Bn(t.g),this.b=Bn(t.b),this}copyLinearToSRGB(t){return this.r=os(t.r),this.g=os(t.g),this.b=os(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=be){return jt.workingToColorSpace(De.copy(this),t),Math.round($t(De.r*255,0,255))*65536+Math.round($t(De.g*255,0,255))*256+Math.round($t(De.b*255,0,255))}getHexString(t=be){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=jt.workingColorSpace){jt.workingToColorSpace(De.copy(this),e);let n=De.r,s=De.g,r=De.b,o=Math.max(n,s,r),a=Math.min(n,s,r),l,c,d=(a+o)/2;if(a===o)l=0,c=0;else{let h=o-a;switch(c=d<=.5?h/(o+a):h/(2-o-a),o){case n:l=(s-r)/h+(s<r?6:0);break;case s:l=(r-n)/h+2;break;case r:l=(n-s)/h+4;break}l/=6}return t.h=l,t.s=c,t.l=d,t}getRGB(t,e=jt.workingColorSpace){return jt.workingToColorSpace(De.copy(this),e),t.r=De.r,t.g=De.g,t.b=De.b,t}getStyle(t=be){jt.workingToColorSpace(De.copy(this),t);let e=De.r,n=De.g,s=De.b;return t!==be?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(Zn),this.setHSL(Zn.h+t,Zn.s+e,Zn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Zn),t.getHSL(Qr);let n=Qs(Zn.h,Qr.h,e),s=Qs(Zn.s,Qr.s,e),r=Qs(Zn.l,Qr.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},De=new kt;kt.NAMES=Ad;var bf=0,An=class extends En{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:bf++}),this.uuid=wn(),this.name="",this.type="Material",this.blending=xi,this.side=gn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=wo,this.blendDst=Eo,this.blendEquation=Jn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new kt(0,0,0),this.blendAlpha=0,this.depthFunc=_i,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ql,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=gi,this.stencilZFail=gi,this.stencilZPass=gi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==xi&&(n.blending=this.blending),this.side!==gn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==wo&&(n.blendSrc=this.blendSrc),this.blendDst!==Eo&&(n.blendDst=this.blendDst),this.blendEquation!==Jn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==_i&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==ql&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==gi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==gi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==gi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let o=[];for(let a in r){let l=r[a];delete l.metadata,o.push(l)}return o}if(e){let r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}},yi=class extends An{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new kt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new _n,this.combine=oc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}};var Se=new R,to=new K,Mf=0,Ue=class{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Mf++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Ro,this.updateRanges=[],this.gpuType=Cn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)to.fromBufferAttribute(this,e),to.applyMatrix3(t),this.setXY(e,to.x,to.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Se.fromBufferAttribute(this,e),Se.applyMatrix3(t),this.setXYZ(e,Se.x,Se.y,Se.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Se.fromBufferAttribute(this,e),Se.applyMatrix4(t),this.setXYZ(e,Se.x,Se.y,Se.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Se.fromBufferAttribute(this,e),Se.applyNormalMatrix(t),this.setXYZ(e,Se.x,Se.y,Se.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Se.fromBufferAttribute(this,e),Se.transformDirection(t),this.setXYZ(e,Se.x,Se.y,Se.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=pn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=ee(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=pn(e,this.array)),e}setX(t,e){return this.normalized&&(e=ee(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=pn(e,this.array)),e}setY(t,e){return this.normalized&&(e=ee(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=pn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=ee(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=pn(e,this.array)),e}setW(t,e){return this.normalized&&(e=ee(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=ee(e,this.array),n=ee(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=ee(e,this.array),n=ee(n,this.array),s=ee(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=ee(e,this.array),n=ee(n,this.array),s=ee(s,this.array),r=ee(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Ro&&(t.usage=this.usage),t}};var or=class extends Ue{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var ar=class extends Ue{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var Kt=class extends Ue{constructor(t,e,n){super(new Float32Array(t),e,n)}},Sf=0,en=new se,Dl=new we,Ki=new R,Ye=new on,Xs=new on,Ie=new R,Te=class i extends En{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Sf++}),this.uuid=wn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(yc(t)?ar:or)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Gt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return en.makeRotationFromQuaternion(t),this.applyMatrix4(en),this}rotateX(t){return en.makeRotationX(t),this.applyMatrix4(en),this}rotateY(t){return en.makeRotationY(t),this.applyMatrix4(en),this}rotateZ(t){return en.makeRotationZ(t),this.applyMatrix4(en),this}translate(t,e,n){return en.makeTranslation(t,e,n),this.applyMatrix4(en),this}scale(t,e,n){return en.makeScale(t,e,n),this.applyMatrix4(en),this}lookAt(t){return Dl.lookAt(t),Dl.updateMatrix(),this.applyMatrix4(Dl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ki).negate(),this.translate(Ki.x,Ki.y,Ki.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let s=0,r=t.length;s<r;s++){let o=t[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Kt(n,3))}else{let n=Math.min(t.length,e.count);for(let s=0;s<n;s++){let r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new on);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new R(-1/0,-1/0,-1/0),new R(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){let r=e[n];Ye.setFromBufferAttribute(r),this.morphTargetsRelative?(Ie.addVectors(this.boundingBox.min,Ye.min),this.boundingBox.expandByPoint(Ie),Ie.addVectors(this.boundingBox.max,Ye.max),this.boundingBox.expandByPoint(Ie)):(this.boundingBox.expandByPoint(Ye.min),this.boundingBox.expandByPoint(Ye.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Hn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new R,1/0);return}if(t){let n=this.boundingSphere.center;if(Ye.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){let a=e[r];Xs.setFromBufferAttribute(a),this.morphTargetsRelative?(Ie.addVectors(Ye.min,Xs.min),Ye.expandByPoint(Ie),Ie.addVectors(Ye.max,Xs.max),Ye.expandByPoint(Ie)):(Ye.expandByPoint(Xs.min),Ye.expandByPoint(Xs.max))}Ye.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)Ie.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Ie));if(e)for(let r=0,o=e.length;r<o;r++){let a=e[r],l=this.morphTargetsRelative;for(let c=0,d=a.count;c<d;c++)Ie.fromBufferAttribute(a,c),l&&(Ki.fromBufferAttribute(t,c),Ie.add(Ki)),s=Math.max(s,n.distanceToSquared(Ie))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ue(new Float32Array(4*n.count),4));let o=this.getAttribute("tangent"),a=[],l=[];for(let L=0;L<n.count;L++)a[L]=new R,l[L]=new R;let c=new R,d=new R,h=new R,u=new K,p=new K,x=new K,m=new R,g=new R;function f(L,w,S){c.fromBufferAttribute(n,L),d.fromBufferAttribute(n,w),h.fromBufferAttribute(n,S),u.fromBufferAttribute(r,L),p.fromBufferAttribute(r,w),x.fromBufferAttribute(r,S),d.sub(c),h.sub(c),p.sub(u),x.sub(u);let I=1/(p.x*x.y-x.x*p.y);isFinite(I)&&(m.copy(d).multiplyScalar(x.y).addScaledVector(h,-p.y).multiplyScalar(I),g.copy(h).multiplyScalar(p.x).addScaledVector(d,-x.x).multiplyScalar(I),a[L].add(m),a[w].add(m),a[S].add(m),l[L].add(g),l[w].add(g),l[S].add(g))}let y=this.groups;y.length===0&&(y=[{start:0,count:t.count}]);for(let L=0,w=y.length;L<w;++L){let S=y[L],I=S.start,D=S.count;for(let H=I,O=I+D;H<O;H+=3)f(t.getX(H+0),t.getX(H+1),t.getX(H+2))}let b=new R,_=new R,E=new R,A=new R;function P(L){E.fromBufferAttribute(s,L),A.copy(E);let w=a[L];b.copy(w),b.sub(E.multiplyScalar(E.dot(w))).normalize(),_.crossVectors(A,w);let I=_.dot(l[L])<0?-1:1;o.setXYZW(L,b.x,b.y,b.z,I)}for(let L=0,w=y.length;L<w;++L){let S=y[L],I=S.start,D=S.count;for(let H=I,O=I+D;H<O;H+=3)P(t.getX(H+0)),P(t.getX(H+1)),P(t.getX(H+2))}}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Ue(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let u=0,p=n.count;u<p;u++)n.setXYZ(u,0,0,0);let s=new R,r=new R,o=new R,a=new R,l=new R,c=new R,d=new R,h=new R;if(t)for(let u=0,p=t.count;u<p;u+=3){let x=t.getX(u+0),m=t.getX(u+1),g=t.getX(u+2);s.fromBufferAttribute(e,x),r.fromBufferAttribute(e,m),o.fromBufferAttribute(e,g),d.subVectors(o,r),h.subVectors(s,r),d.cross(h),a.fromBufferAttribute(n,x),l.fromBufferAttribute(n,m),c.fromBufferAttribute(n,g),a.add(d),l.add(d),c.add(d),n.setXYZ(x,a.x,a.y,a.z),n.setXYZ(m,l.x,l.y,l.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let u=0,p=e.count;u<p;u+=3)s.fromBufferAttribute(e,u+0),r.fromBufferAttribute(e,u+1),o.fromBufferAttribute(e,u+2),d.subVectors(o,r),h.subVectors(s,r),d.cross(h),n.setXYZ(u+0,d.x,d.y,d.z),n.setXYZ(u+1,d.x,d.y,d.z),n.setXYZ(u+2,d.x,d.y,d.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Ie.fromBufferAttribute(t,e),Ie.normalize(),t.setXYZ(e,Ie.x,Ie.y,Ie.z)}toNonIndexed(){function t(a,l){let c=a.array,d=a.itemSize,h=a.normalized,u=new c.constructor(l.length*d),p=0,x=0;for(let m=0,g=l.length;m<g;m++){a.isInterleavedBufferAttribute?p=l[m]*a.data.stride+a.offset:p=l[m]*d;for(let f=0;f<d;f++)u[x++]=c[p++]}return new Ue(u,d,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new i,n=this.index.array,s=this.attributes;for(let a in s){let l=s[a],c=t(l,n);e.setAttribute(a,c)}let r=this.morphAttributes;for(let a in r){let l=[],c=r[a];for(let d=0,h=c.length;d<h;d++){let u=c[d],p=t(u,n);l.push(p)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,l=o.length;a<l;a++){let c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let l in n){let c=n[l];t.data.attributes[l]=c.toJSON(t.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],d=[];for(let h=0,u=c.length;h<u;h++){let p=c[h];d.push(p.toJSON(t.data))}d.length>0&&(s[l]=d,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone());let s=t.attributes;for(let c in s){let d=s[c];this.setAttribute(c,d.clone(e))}let r=t.morphAttributes;for(let c in r){let d=[],h=r[c];for(let u=0,p=h.length;u<p;u++)d.push(h[u].clone(e));this.morphAttributes[c]=d}this.morphTargetsRelative=t.morphTargetsRelative;let o=t.groups;for(let c=0,d=o.length;c<d;c++){let h=o[c];this.addGroup(h.start,h.count,h.materialIndex)}let a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},_h=new se,pi=new Qn,eo=new Hn,vh=new R,no=new R,io=new R,so=new R,Nl=new R,ro=new R,yh=new R,oo=new R,fe=class extends we{constructor(t=new Te,e=new yi){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);let a=this.morphTargetInfluences;if(r&&a){ro.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let d=a[l],h=r[l];d!==0&&(Nl.fromBufferAttribute(h,t),o?ro.addScaledVector(Nl,d):ro.addScaledVector(Nl.sub(e),d))}e.add(ro)}return e}raycast(t,e){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),eo.copy(n.boundingSphere),eo.applyMatrix4(r),pi.copy(t.ray).recast(t.near),!(eo.containsPoint(pi.origin)===!1&&(pi.intersectSphere(eo,vh)===null||pi.origin.distanceToSquared(vh)>(t.far-t.near)**2))&&(_h.copy(r).invert(),pi.copy(t.ray).applyMatrix4(_h),!(n.boundingBox!==null&&pi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,pi)))}_computeIntersections(t,e,n){let s,r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,d=r.attributes.uv1,h=r.attributes.normal,u=r.groups,p=r.drawRange;if(a!==null)if(Array.isArray(o))for(let x=0,m=u.length;x<m;x++){let g=u[x],f=o[g.materialIndex],y=Math.max(g.start,p.start),b=Math.min(a.count,Math.min(g.start+g.count,p.start+p.count));for(let _=y,E=b;_<E;_+=3){let A=a.getX(_),P=a.getX(_+1),L=a.getX(_+2);s=ao(this,f,t,n,c,d,h,A,P,L),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{let x=Math.max(0,p.start),m=Math.min(a.count,p.start+p.count);for(let g=x,f=m;g<f;g+=3){let y=a.getX(g),b=a.getX(g+1),_=a.getX(g+2);s=ao(this,o,t,n,c,d,h,y,b,_),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let x=0,m=u.length;x<m;x++){let g=u[x],f=o[g.materialIndex],y=Math.max(g.start,p.start),b=Math.min(l.count,Math.min(g.start+g.count,p.start+p.count));for(let _=y,E=b;_<E;_+=3){let A=_,P=_+1,L=_+2;s=ao(this,f,t,n,c,d,h,A,P,L),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{let x=Math.max(0,p.start),m=Math.min(l.count,p.start+p.count);for(let g=x,f=m;g<f;g+=3){let y=g,b=g+1,_=g+2;s=ao(this,o,t,n,c,d,h,y,b,_),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}}};function wf(i,t,e,n,s,r,o,a){let l;if(t.side===ze?l=n.intersectTriangle(o,r,s,!0,a):l=n.intersectTriangle(s,r,o,t.side===gn,a),l===null)return null;oo.copy(a),oo.applyMatrix4(i.matrixWorld);let c=e.ray.origin.distanceTo(oo);return c<e.near||c>e.far?null:{distance:c,point:oo.clone(),object:i}}function ao(i,t,e,n,s,r,o,a,l,c){i.getVertexPosition(a,no),i.getVertexPosition(l,io),i.getVertexPosition(c,so);let d=wf(i,t,e,n,no,io,so,yh);if(d){let h=new R;Mn.getBarycoord(yh,no,io,so,h),s&&(d.uv=Mn.getInterpolatedAttribute(s,a,l,c,h,new K)),r&&(d.uv1=Mn.getInterpolatedAttribute(r,a,l,c,h,new K)),o&&(d.normal=Mn.getInterpolatedAttribute(o,a,l,c,h,new R),d.normal.dot(n.direction)>0&&d.normal.multiplyScalar(-1));let u={a,b:l,c,normal:new R,materialIndex:0};Mn.getNormal(no,io,so,u.normal),d.face=u,d.barycoord=h}return d}var Ge=class i extends Te{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let l=[],c=[],d=[],h=[],u=0,p=0;x("z","y","x",-1,-1,n,e,t,o,r,0),x("z","y","x",1,-1,n,e,-t,o,r,1),x("x","z","y",1,1,t,n,e,s,o,2),x("x","z","y",1,-1,t,n,-e,s,o,3),x("x","y","z",1,-1,t,e,n,s,r,4),x("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new Kt(c,3)),this.setAttribute("normal",new Kt(d,3)),this.setAttribute("uv",new Kt(h,2));function x(m,g,f,y,b,_,E,A,P,L,w){let S=_/P,I=E/L,D=_/2,H=E/2,O=A/2,U=P+1,z=L+1,q=0,V=0,rt=new R;for(let nt=0;nt<z;nt++){let ht=nt*I-H;for(let yt=0;yt<U;yt++){let Bt=yt*S-D;rt[m]=Bt*y,rt[g]=ht*b,rt[f]=O,c.push(rt.x,rt.y,rt.z),rt[m]=0,rt[g]=0,rt[f]=A>0?1:-1,d.push(rt.x,rt.y,rt.z),h.push(yt/P),h.push(1-nt/L),q+=1}}for(let nt=0;nt<L;nt++)for(let ht=0;ht<P;ht++){let yt=u+ht+U*nt,Bt=u+ht+U*(nt+1),Ut=u+(ht+1)+U*(nt+1),Ot=u+(ht+1)+U*nt;l.push(yt,Bt,Ot),l.push(Bt,Ut,Ot),V+=6}a.addGroup(p,V,w),p+=V,u+=q}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};function Ii(i){let t={};for(let e in i){t[e]={};for(let n in i[e]){let s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function Oe(i){let t={};for(let e=0;e<i.length;e++){let n=Ii(i[e]);for(let s in n)t[s]=n[s]}return t}function Ef(i){let t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function bc(i){let t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:jt.workingColorSpace}var Rd={clone:Ii,merge:Oe},Tf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Af=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,vn=class extends An{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Tf,this.fragmentShader=Af,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Ii(t.uniforms),this.uniformsGroups=Ef(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}},lr=class extends we{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new se,this.projectionMatrix=new se,this.projectionMatrixInverse=new se,this.coordinateSystem=mn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},jn=new R,bh=new K,Mh=new K,Ee=class extends lr{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=cs*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(rs*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return cs*2*Math.atan(Math.tan(rs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){jn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(jn.x,jn.y).multiplyScalar(-t/jn.z),jn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(jn.x,jn.y).multiplyScalar(-t/jn.z)}getViewSize(t,e){return this.getViewBounds(t,bh,Mh),e.subVectors(Mh,bh)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(rs*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,e-=o.offsetY*n/c,s*=o.width/l,n*=o.height/c}let a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},Ji=-90,Qi=1,Lo=class extends we{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Ee(Ji,Qi,t,e);s.layers=this.layers,this.add(s);let r=new Ee(Ji,Qi,t,e);r.layers=this.layers,this.add(r);let o=new Ee(Ji,Qi,t,e);o.layers=this.layers,this.add(o);let a=new Ee(Ji,Qi,t,e);a.layers=this.layers,this.add(a);let l=new Ee(Ji,Qi,t,e);l.layers=this.layers,this.add(l);let c=new Ee(Ji,Qi,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,l]=e;for(let c of e)this.remove(c);if(t===mn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===sr)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,l,c,d]=this.children,h=t.getRenderTarget(),u=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),x=t.xr.enabled;t.xr.enabled=!1;let m=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,o),t.setRenderTarget(n,2,s),t.render(e,a),t.setRenderTarget(n,3,s),t.render(e,l),t.setRenderTarget(n,4,s),t.render(e,c),n.texture.generateMipmaps=m,t.setRenderTarget(n,5,s),t.render(e,d),t.setRenderTarget(h,u,p),t.xr.enabled=x,n.texture.needsPMREMUpdate=!0}},cr=class extends He{constructor(t=[],e=Ri,n,s,r,o,a,l,c,d){super(t,e,n,s,r,o,a,l,c,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},Do=class extends Tn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new cr(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Ge(5,5,5),r=new vn({name:"CubemapFromEquirect",uniforms:Ii(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:ze,blending:Vn});r.uniforms.tEquirect.value=e;let o=new fe(s,r),a=e.minFilter;return e.minFilter===oi&&(e.minFilter=xn),new Lo(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){let r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}},Ne=class extends we{constructor(){super(),this.isGroup=!0,this.type="Group"}},Rf={type:"move"},ps=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ne,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ne,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new R,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new R),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ne,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new R,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new R),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null,a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(let m of t.hand.values()){let g=e.getJointPose(m,n),f=this._getHandJoint(c,m);g!==null&&(f.matrix.fromArray(g.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=g.radius),f.visible=g!==null}let d=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],u=d.position.distanceTo(h.position),p=.02,x=.005;c.inputState.pinching&&u>p+x?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&u<=p-x&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Rf)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new Ne;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}};var bi=class extends we{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new _n,this.environmentIntensity=1,this.environmentRotation=new _n,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}},No=class{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=Ro,this.updateRanges=[],this.version=0,this.uuid=wn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=e.array[n+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=wn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=wn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},Be=new R,hr=class i{constructor(t,e,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)Be.fromBufferAttribute(this,e),Be.applyMatrix4(t),this.setXYZ(e,Be.x,Be.y,Be.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Be.fromBufferAttribute(this,e),Be.applyNormalMatrix(t),this.setXYZ(e,Be.x,Be.y,Be.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Be.fromBufferAttribute(this,e),Be.transformDirection(t),this.setXYZ(e,Be.x,Be.y,Be.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=pn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=ee(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=ee(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=ee(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=ee(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=ee(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=pn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=pn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=pn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=pn(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=ee(e,this.array),n=ee(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=ee(e,this.array),n=ee(n,this.array),s=ee(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=ee(e,this.array),n=ee(n,this.array),s=ee(s,this.array),r=ee(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return new Ue(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new i(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},ms=class extends An{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new kt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},ts,qs=new R,es=new R,ns=new R,is=new K,Ys=new K,Cd=new se,lo=new R,Zs=new R,co=new R,Sh=new K,Ul=new K,wh=new K,dr=class extends we{constructor(t=new ms){if(super(),this.isSprite=!0,this.type="Sprite",ts===void 0){ts=new Te;let e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new No(e,5);ts.setIndex([0,1,2,0,2,3]),ts.setAttribute("position",new hr(n,3,0,!1)),ts.setAttribute("uv",new hr(n,2,3,!1))}this.geometry=ts,this.material=t,this.center=new K(.5,.5),this.count=1}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),es.setFromMatrixScale(this.matrixWorld),Cd.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),ns.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&es.multiplyScalar(-ns.z);let n=this.material.rotation,s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));let o=this.center;ho(lo.set(-.5,-.5,0),ns,o,es,s,r),ho(Zs.set(.5,-.5,0),ns,o,es,s,r),ho(co.set(.5,.5,0),ns,o,es,s,r),Sh.set(0,0),Ul.set(1,0),wh.set(1,1);let a=t.ray.intersectTriangle(lo,Zs,co,!1,qs);if(a===null&&(ho(Zs.set(-.5,.5,0),ns,o,es,s,r),Ul.set(0,1),a=t.ray.intersectTriangle(lo,co,Zs,!1,qs),a===null))return;let l=t.ray.origin.distanceTo(qs);l<t.near||l>t.far||e.push({distance:l,point:qs.clone(),uv:Mn.getInterpolation(qs,lo,Zs,co,Sh,Ul,wh,new K),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}};function ho(i,t,e,n,s,r){is.subVectors(i,e).addScalar(.5).multiply(n),s!==void 0?(Ys.x=r*is.x-s*is.y,Ys.y=s*is.x+r*is.y):Ys.copy(is),i.copy(t),i.x+=Ys.x,i.y+=Ys.y,i.applyMatrix4(Cd)}var Fl=new R,Cf=new R,Pf=new Gt,nn=class{constructor(t=new R(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let s=Fl.subVectors(n,e).cross(Cf.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){let n=t.delta(Fl),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||Pf.getNormalMatrix(t),s=this.coplanarPoint(Fl).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},mi=new Hn,If=new K(.5,.5),uo=new R,gs=class{constructor(t=new nn,e=new nn,n=new nn,s=new nn,r=new nn,o=new nn){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){let a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=mn,n=!1){let s=this.planes,r=t.elements,o=r[0],a=r[1],l=r[2],c=r[3],d=r[4],h=r[5],u=r[6],p=r[7],x=r[8],m=r[9],g=r[10],f=r[11],y=r[12],b=r[13],_=r[14],E=r[15];if(s[0].setComponents(c-o,p-d,f-x,E-y).normalize(),s[1].setComponents(c+o,p+d,f+x,E+y).normalize(),s[2].setComponents(c+a,p+h,f+m,E+b).normalize(),s[3].setComponents(c-a,p-h,f-m,E-b).normalize(),n)s[4].setComponents(l,u,g,_).normalize(),s[5].setComponents(c-l,p-u,f-g,E-_).normalize();else if(s[4].setComponents(c-l,p-u,f-g,E-_).normalize(),e===mn)s[5].setComponents(c+l,p+u,f+g,E+_).normalize();else if(e===sr)s[5].setComponents(l,u,g,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),mi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),mi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(mi)}intersectsSprite(t){mi.center.set(0,0,0);let e=If.distanceTo(t.center);return mi.radius=.7071067811865476+e,mi.applyMatrix4(t.matrixWorld),this.intersectsSphere(mi)}intersectsSphere(t){let e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let s=e[n];if(uo.x=s.normal.x>0?t.max.x:t.min.x,uo.y=s.normal.y>0?t.max.y:t.min.y,uo.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(uo)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var xs=class extends An{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new kt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}},Uo=new R,Fo=new R,Eh=new se,js=new Qn,fo=new Hn,Ol=new R,Th=new R,Oo=class extends we{constructor(t=new Te,e=new xs){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)Uo.fromBufferAttribute(e,s-1),Fo.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=Uo.distanceTo(Fo);t.setAttribute("lineDistance",new Kt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){let n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),fo.copy(n.boundingSphere),fo.applyMatrix4(s),fo.radius+=r,t.ray.intersectsSphere(fo)===!1)return;Eh.copy(s).invert(),js.copy(t.ray).applyMatrix4(Eh);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,d=n.index,u=n.attributes.position;if(d!==null){let p=Math.max(0,o.start),x=Math.min(d.count,o.start+o.count);for(let m=p,g=x-1;m<g;m+=c){let f=d.getX(m),y=d.getX(m+1),b=po(this,t,js,l,f,y,m);b&&e.push(b)}if(this.isLineLoop){let m=d.getX(x-1),g=d.getX(p),f=po(this,t,js,l,m,g,x-1);f&&e.push(f)}}else{let p=Math.max(0,o.start),x=Math.min(u.count,o.start+o.count);for(let m=p,g=x-1;m<g;m+=c){let f=po(this,t,js,l,m,m+1,m);f&&e.push(f)}if(this.isLineLoop){let m=po(this,t,js,l,x-1,p,x-1);m&&e.push(m)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function po(i,t,e,n,s,r,o){let a=i.geometry.attributes.position;if(Uo.fromBufferAttribute(a,s),Fo.fromBufferAttribute(a,r),e.distanceSqToSegment(Uo,Fo,Ol,Th)>n)return;Ol.applyMatrix4(i.matrixWorld);let c=t.ray.origin.distanceTo(Ol);if(!(c<t.near||c>t.far))return{distance:c,point:Th.clone().applyMatrix4(i.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:i}}var Ah=new R,Rh=new R,ur=class extends Oo{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[];for(let s=0,r=e.count;s<r;s+=2)Ah.fromBufferAttribute(e,s),Rh.fromBufferAttribute(e,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+Ah.distanceTo(Rh);t.setAttribute("lineDistance",new Kt(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var Mi=class extends He{constructor(t,e,n,s,r,o,a,l,c){super(t,e,n,s,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},fr=class extends He{constructor(t,e,n=ai,s,r,o,a=sn,l=sn,c,d=ls,h=1){if(d!==ls&&d!==As)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let u={width:t,height:e,depth:h};super(u,s,r,o,a,l,d,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new us(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}},pr=class extends He{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}};var mr=class i extends Te{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);let r=[],o=[],a=[],l=[],c=new R,d=new K;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let h=0,u=3;h<=e;h++,u+=3){let p=n+h/e*s;c.x=t*Math.cos(p),c.y=t*Math.sin(p),o.push(c.x,c.y,c.z),a.push(0,0,1),d.x=(o[u]/t+1)/2,d.y=(o[u+1]/t+1)/2,l.push(d.x,d.y)}for(let h=1;h<=e;h++)r.push(h,h+1,0);this.setIndex(r),this.setAttribute("position",new Kt(o,3)),this.setAttribute("normal",new Kt(a,3)),this.setAttribute("uv",new Kt(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.segments,t.thetaStart,t.thetaLength)}},ti=class i extends Te{constructor(t=1,e=1,n=1,s=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};let c=this;s=Math.floor(s),r=Math.floor(r);let d=[],h=[],u=[],p=[],x=0,m=[],g=n/2,f=0;y(),o===!1&&(t>0&&b(!0),e>0&&b(!1)),this.setIndex(d),this.setAttribute("position",new Kt(h,3)),this.setAttribute("normal",new Kt(u,3)),this.setAttribute("uv",new Kt(p,2));function y(){let _=new R,E=new R,A=0,P=(e-t)/n;for(let L=0;L<=r;L++){let w=[],S=L/r,I=S*(e-t)+t;for(let D=0;D<=s;D++){let H=D/s,O=H*l+a,U=Math.sin(O),z=Math.cos(O);E.x=I*U,E.y=-S*n+g,E.z=I*z,h.push(E.x,E.y,E.z),_.set(U,P,z).normalize(),u.push(_.x,_.y,_.z),p.push(H,1-S),w.push(x++)}m.push(w)}for(let L=0;L<s;L++)for(let w=0;w<r;w++){let S=m[w][L],I=m[w+1][L],D=m[w+1][L+1],H=m[w][L+1];(t>0||w!==0)&&(d.push(S,I,H),A+=3),(e>0||w!==r-1)&&(d.push(I,D,H),A+=3)}c.addGroup(f,A,0),f+=A}function b(_){let E=x,A=new K,P=new R,L=0,w=_===!0?t:e,S=_===!0?1:-1;for(let D=1;D<=s;D++)h.push(0,g*S,0),u.push(0,S,0),p.push(.5,.5),x++;let I=x;for(let D=0;D<=s;D++){let O=D/s*l+a,U=Math.cos(O),z=Math.sin(O);P.x=w*z,P.y=g*S,P.z=w*U,h.push(P.x,P.y,P.z),u.push(0,S,0),A.x=U*.5+.5,A.y=z*.5*S+.5,p.push(A.x,A.y),x++}for(let D=0;D<s;D++){let H=E+D,O=I+D;_===!0?d.push(O,O+1,H):d.push(O+1,O,H),L+=3}c.addGroup(f,L,_===!0?1:2),f+=L}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},gr=class i extends ti{constructor(t=1,e=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new i(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}};var mo=new R,go=new R,kl=new R,xo=new Mn,xr=class extends Te{constructor(t=null,e=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:e},t!==null){let s=Math.pow(10,4),r=Math.cos(rs*e),o=t.getIndex(),a=t.getAttribute("position"),l=o?o.count:a.count,c=[0,0,0],d=["a","b","c"],h=new Array(3),u={},p=[];for(let x=0;x<l;x+=3){o?(c[0]=o.getX(x),c[1]=o.getX(x+1),c[2]=o.getX(x+2)):(c[0]=x,c[1]=x+1,c[2]=x+2);let{a:m,b:g,c:f}=xo;if(m.fromBufferAttribute(a,c[0]),g.fromBufferAttribute(a,c[1]),f.fromBufferAttribute(a,c[2]),xo.getNormal(kl),h[0]=`${Math.round(m.x*s)},${Math.round(m.y*s)},${Math.round(m.z*s)}`,h[1]=`${Math.round(g.x*s)},${Math.round(g.y*s)},${Math.round(g.z*s)}`,h[2]=`${Math.round(f.x*s)},${Math.round(f.y*s)},${Math.round(f.z*s)}`,!(h[0]===h[1]||h[1]===h[2]||h[2]===h[0]))for(let y=0;y<3;y++){let b=(y+1)%3,_=h[y],E=h[b],A=xo[d[y]],P=xo[d[b]],L=`${_}_${E}`,w=`${E}_${_}`;w in u&&u[w]?(kl.dot(u[w].normal)<=r&&(p.push(A.x,A.y,A.z),p.push(P.x,P.y,P.z)),u[w]=null):L in u||(u[L]={index0:c[y],index1:c[b],normal:kl.clone()})}}for(let x in u)if(u[x]){let{index0:m,index1:g}=u[x];mo.fromBufferAttribute(a,m),go.fromBufferAttribute(a,g),p.push(mo.x,mo.y,mo.z),p.push(go.x,go.y,go.z)}this.setAttribute("position",new Kt(p,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}},Ze=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(t,e){let n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],n,s=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){let n=this.getLengths(),s=0,r=n.length,o;e?o=e:o=t*n[r-1];let a=0,l=r-1,c;for(;a<=l;)if(s=Math.floor(a+(l-a)/2),c=n[s]-o,c<0)a=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===o)return s/(r-1);let d=n[s],u=n[s+1]-d,p=(o-d)/u;return(s+p)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);let o=this.getPoint(s),a=this.getPoint(r),l=e||(o.isVector2?new K:new R);return l.copy(a).sub(o).normalize(),l}getTangentAt(t,e){let n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){let n=new R,s=[],r=[],o=[],a=new R,l=new se;for(let p=0;p<=t;p++){let x=p/t;s[p]=this.getTangentAt(x,new R)}r[0]=new R,o[0]=new R;let c=Number.MAX_VALUE,d=Math.abs(s[0].x),h=Math.abs(s[0].y),u=Math.abs(s[0].z);d<=c&&(c=d,n.set(1,0,0)),h<=c&&(c=h,n.set(0,1,0)),u<=c&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let p=1;p<=t;p++){if(r[p]=r[p-1].clone(),o[p]=o[p-1].clone(),a.crossVectors(s[p-1],s[p]),a.length()>Number.EPSILON){a.normalize();let x=Math.acos($t(s[p-1].dot(s[p]),-1,1));r[p].applyMatrix4(l.makeRotationAxis(a,x))}o[p].crossVectors(s[p],r[p])}if(e===!0){let p=Math.acos($t(r[0].dot(r[t]),-1,1));p/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(p=-p);for(let x=1;x<=t;x++)r[x].applyMatrix4(l.makeRotationAxis(s[x],p*x)),o[x].crossVectors(s[x],r[x])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){let t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}},_s=class extends Ze{constructor(t=0,e=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(t,e=new K){let n=e,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);let a=this.aStartAngle+t*r,l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let d=Math.cos(this.aRotation),h=Math.sin(this.aRotation),u=l-this.aX,p=c-this.aY;l=u*d-p*h+this.aX,c=u*h+p*d+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},ko=class extends _s{constructor(t,e,n,s,r,o){super(t,e,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}};function Mc(){let i=0,t=0,e=0,n=0;function s(r,o,a,l){i=r,t=a,e=-3*r+3*o-2*a-l,n=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){s(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,d,h){let u=(o-r)/c-(a-r)/(c+d)+(a-o)/d,p=(a-o)/d-(l-o)/(d+h)+(l-a)/h;u*=d,p*=d,s(o,a,u,p)},calc:function(r){let o=r*r,a=o*r;return i+t*r+e*o+n*a}}}var _o=new R,Bl=new Mc,Hl=new Mc,zl=new Mc,Bo=class extends Ze{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new R){let n=e,s=this.points,r=s.length,o=(r-(this.closed?0:1))*t,a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,d;this.closed||a>0?c=s[(a-1)%r]:(_o.subVectors(s[0],s[1]).add(s[0]),c=_o);let h=s[a%r],u=s[(a+1)%r];if(this.closed||a+2<r?d=s[(a+2)%r]:(_o.subVectors(s[r-1],s[r-2]).add(s[r-1]),d=_o),this.curveType==="centripetal"||this.curveType==="chordal"){let p=this.curveType==="chordal"?.5:.25,x=Math.pow(c.distanceToSquared(h),p),m=Math.pow(h.distanceToSquared(u),p),g=Math.pow(u.distanceToSquared(d),p);m<1e-4&&(m=1),x<1e-4&&(x=m),g<1e-4&&(g=m),Bl.initNonuniformCatmullRom(c.x,h.x,u.x,d.x,x,m,g),Hl.initNonuniformCatmullRom(c.y,h.y,u.y,d.y,x,m,g),zl.initNonuniformCatmullRom(c.z,h.z,u.z,d.z,x,m,g)}else this.curveType==="catmullrom"&&(Bl.initCatmullRom(c.x,h.x,u.x,d.x,this.tension),Hl.initCatmullRom(c.y,h.y,u.y,d.y,this.tension),zl.initCatmullRom(c.z,h.z,u.z,d.z,this.tension));return n.set(Bl.calc(l),Hl.calc(l),zl.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new R().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function Ch(i,t,e,n,s){let r=(n-t)*.5,o=(s-e)*.5,a=i*i,l=i*a;return(2*e-2*n+r+o)*l+(-3*e+3*n-2*r-o)*a+r*i+e}function Lf(i,t){let e=1-i;return e*e*t}function Df(i,t){return 2*(1-i)*i*t}function Nf(i,t){return i*i*t}function tr(i,t,e,n){return Lf(i,t)+Df(i,e)+Nf(i,n)}function Uf(i,t){let e=1-i;return e*e*e*t}function Ff(i,t){let e=1-i;return 3*e*e*i*t}function Of(i,t){return 3*(1-i)*i*i*t}function kf(i,t){return i*i*i*t}function er(i,t,e,n,s){return Uf(i,t)+Ff(i,e)+Of(i,n)+kf(i,s)}var _r=class extends Ze{constructor(t=new K,e=new K,n=new K,s=new K){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new K){let n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(er(t,s.x,r.x,o.x,a.x),er(t,s.y,r.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Ho=class extends Ze{constructor(t=new R,e=new R,n=new R,s=new R){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new R){let n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(er(t,s.x,r.x,o.x,a.x),er(t,s.y,r.y,o.y,a.y),er(t,s.z,r.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},vr=class extends Ze{constructor(t=new K,e=new K){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new K){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new K){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},zo=class extends Ze{constructor(t=new R,e=new R){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new R){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new R){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},yr=class extends Ze{constructor(t=new K,e=new K,n=new K){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new K){let n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(tr(t,s.x,r.x,o.x),tr(t,s.y,r.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Vo=class extends Ze{constructor(t=new R,e=new R,n=new R){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new R){let n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(tr(t,s.x,r.x,o.x),tr(t,s.y,r.y,o.y),tr(t,s.z,r.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},br=class extends Ze{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new K){let n=e,s=this.points,r=(s.length-1)*t,o=Math.floor(r),a=r-o,l=s[o===0?o:o-1],c=s[o],d=s[o>s.length-2?s.length-1:o+1],h=s[o>s.length-3?s.length-1:o+2];return n.set(Ch(a,l.x,c.x,d.x,h.x),Ch(a,l.y,c.y,d.y,h.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new K().fromArray(s))}return this}},Yl=Object.freeze({__proto__:null,ArcCurve:ko,CatmullRomCurve3:Bo,CubicBezierCurve:_r,CubicBezierCurve3:Ho,EllipseCurve:_s,LineCurve:vr,LineCurve3:zo,QuadraticBezierCurve:yr,QuadraticBezierCurve3:Vo,SplineCurve:br}),Go=class extends Ze{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){let t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){let n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Yl[n](e,t))}return this}getPoint(t,e){let n=t*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=n){let o=s[r]-n,a=this.curves[r],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,e)}r++}return null}getLength(){let t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let t=[],e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){let e=[],n;for(let s=0,r=this.curves;s<r.length;s++){let o=r[s],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,l=o.getPoints(a);for(let c=0;c<l.length;c++){let d=l[c];n&&n.equals(d)||(e.push(d),n=d)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){let t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){let s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let s=t.curves[e];this.curves.push(new Yl[s.type]().fromJSON(s))}return this}},ei=class extends Go{constructor(t){super(),this.type="Path",this.currentPoint=new K,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){let n=new vr(this.currentPoint.clone(),new K(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){let r=new yr(this.currentPoint.clone(),new K(t,e),new K(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,r,o){let a=new _r(this.currentPoint.clone(),new K(t,e),new K(n,s),new K(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(t){let e=[this.currentPoint.clone()].concat(t),n=new br(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,r,o){let a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+a,e+l,n,s,r,o),this}absarc(t,e,n,s,r,o){return this.absellipse(t,e,n,n,s,r,o),this}ellipse(t,e,n,s,r,o,a,l){let c=this.currentPoint.x,d=this.currentPoint.y;return this.absellipse(t+c,e+d,n,s,r,o,a,l),this}absellipse(t,e,n,s,r,o,a,l){let c=new _s(t,e,n,s,r,o,a,l);if(this.curves.length>0){let h=c.getPoint(0);h.equals(this.currentPoint)||this.lineTo(h.x,h.y)}this.curves.push(c);let d=c.getPoint(1);return this.currentPoint.copy(d),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){let t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}},je=class extends ei{constructor(t){super(t),this.uuid=wn(),this.type="Shape",this.holes=[]}getPointsHoles(t){let e=[];for(let n=0,s=this.holes.length;n<s;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){let s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let s=t.holes[e];this.holes.push(new ei().fromJSON(s))}return this}};function Bf(i,t,e=2){let n=t&&t.length,s=n?t[0]*e:i.length,r=Pd(i,0,s,e,!0),o=[];if(!r||r.next===r.prev)return o;let a,l,c;if(n&&(r=Wf(i,t,r,e)),i.length>80*e){a=1/0,l=1/0;let d=-1/0,h=-1/0;for(let u=e;u<s;u+=e){let p=i[u],x=i[u+1];p<a&&(a=p),x<l&&(l=x),p>d&&(d=p),x>h&&(h=x)}c=Math.max(d-a,h-l),c=c!==0?32767/c:0}return Mr(r,o,e,a,l,c,0),o}function Pd(i,t,e,n,s){let r;if(s===ep(i,t,e,n)>0)for(let o=t;o<e;o+=n)r=Ph(o/n|0,i[o],i[o+1],r);else for(let o=e-n;o>=t;o-=n)r=Ph(o/n|0,i[o],i[o+1],r);return r&&vs(r,r.next)&&(wr(r),r=r.next),r}function Si(i,t){if(!i)return i;t||(t=i);let e=i,n;do if(n=!1,!e.steiner&&(vs(e,e.next)||ge(e.prev,e,e.next)===0)){if(wr(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function Mr(i,t,e,n,s,r,o){if(!i)return;!o&&r&&Zf(i,n,s,r);let a=i;for(;i.prev!==i.next;){let l=i.prev,c=i.next;if(r?zf(i,n,s,r):Hf(i)){t.push(l.i,i.i,c.i),wr(i),i=c.next,a=c.next;continue}if(i=c,i===a){o?o===1?(i=Vf(Si(i),t),Mr(i,t,e,n,s,r,2)):o===2&&Gf(i,t,e,n,s,r):Mr(Si(i),t,e,n,s,r,1);break}}}function Hf(i){let t=i.prev,e=i,n=i.next;if(ge(t,e,n)>=0)return!1;let s=t.x,r=e.x,o=n.x,a=t.y,l=e.y,c=n.y,d=Math.min(s,r,o),h=Math.min(a,l,c),u=Math.max(s,r,o),p=Math.max(a,l,c),x=n.next;for(;x!==t;){if(x.x>=d&&x.x<=u&&x.y>=h&&x.y<=p&&Js(s,a,r,l,o,c,x.x,x.y)&&ge(x.prev,x,x.next)>=0)return!1;x=x.next}return!0}function zf(i,t,e,n){let s=i.prev,r=i,o=i.next;if(ge(s,r,o)>=0)return!1;let a=s.x,l=r.x,c=o.x,d=s.y,h=r.y,u=o.y,p=Math.min(a,l,c),x=Math.min(d,h,u),m=Math.max(a,l,c),g=Math.max(d,h,u),f=Zl(p,x,t,e,n),y=Zl(m,g,t,e,n),b=i.prevZ,_=i.nextZ;for(;b&&b.z>=f&&_&&_.z<=y;){if(b.x>=p&&b.x<=m&&b.y>=x&&b.y<=g&&b!==s&&b!==o&&Js(a,d,l,h,c,u,b.x,b.y)&&ge(b.prev,b,b.next)>=0||(b=b.prevZ,_.x>=p&&_.x<=m&&_.y>=x&&_.y<=g&&_!==s&&_!==o&&Js(a,d,l,h,c,u,_.x,_.y)&&ge(_.prev,_,_.next)>=0))return!1;_=_.nextZ}for(;b&&b.z>=f;){if(b.x>=p&&b.x<=m&&b.y>=x&&b.y<=g&&b!==s&&b!==o&&Js(a,d,l,h,c,u,b.x,b.y)&&ge(b.prev,b,b.next)>=0)return!1;b=b.prevZ}for(;_&&_.z<=y;){if(_.x>=p&&_.x<=m&&_.y>=x&&_.y<=g&&_!==s&&_!==o&&Js(a,d,l,h,c,u,_.x,_.y)&&ge(_.prev,_,_.next)>=0)return!1;_=_.nextZ}return!0}function Vf(i,t){let e=i;do{let n=e.prev,s=e.next.next;!vs(n,s)&&Ld(n,e,e.next,s)&&Sr(n,s)&&Sr(s,n)&&(t.push(n.i,e.i,s.i),wr(e),wr(e.next),e=i=s),e=e.next}while(e!==i);return Si(e)}function Gf(i,t,e,n,s,r){let o=i;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&Jf(o,a)){let l=Dd(o,a);o=Si(o,o.next),l=Si(l,l.next),Mr(o,t,e,n,s,r,0),Mr(l,t,e,n,s,r,0);return}a=a.next}o=o.next}while(o!==i)}function Wf(i,t,e,n){let s=[];for(let r=0,o=t.length;r<o;r++){let a=t[r]*n,l=r<o-1?t[r+1]*n:i.length,c=Pd(i,a,l,n,!1);c===c.next&&(c.steiner=!0),s.push(Kf(c))}s.sort($f);for(let r=0;r<s.length;r++)e=Xf(s[r],e);return e}function $f(i,t){let e=i.x-t.x;if(e===0&&(e=i.y-t.y,e===0)){let n=(i.next.y-i.y)/(i.next.x-i.x),s=(t.next.y-t.y)/(t.next.x-t.x);e=n-s}return e}function Xf(i,t){let e=qf(i,t);if(!e)return t;let n=Dd(e,i);return Si(n,n.next),Si(e,e.next)}function qf(i,t){let e=t,n=i.x,s=i.y,r=-1/0,o;if(vs(i,e))return e;do{if(vs(i,e.next))return e.next;if(s<=e.y&&s>=e.next.y&&e.next.y!==e.y){let h=e.x+(s-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(h<=n&&h>r&&(r=h,o=e.x<e.next.x?e:e.next,h===n))return o}e=e.next}while(e!==t);if(!o)return null;let a=o,l=o.x,c=o.y,d=1/0;e=o;do{if(n>=e.x&&e.x>=l&&n!==e.x&&Id(s<c?n:r,s,l,c,s<c?r:n,s,e.x,e.y)){let h=Math.abs(s-e.y)/(n-e.x);Sr(e,i)&&(h<d||h===d&&(e.x>o.x||e.x===o.x&&Yf(o,e)))&&(o=e,d=h)}e=e.next}while(e!==a);return o}function Yf(i,t){return ge(i.prev,i,t.prev)<0&&ge(t.next,i,i.next)<0}function Zf(i,t,e,n){let s=i;do s.z===0&&(s.z=Zl(s.x,s.y,t,e,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,jf(s)}function jf(i){let t,e=1;do{let n=i,s;i=null;let r=null;for(t=0;n;){t++;let o=n,a=0;for(let c=0;c<e&&(a++,o=o.nextZ,!!o);c++);let l=e;for(;a>0||l>0&&o;)a!==0&&(l===0||!o||n.z<=o.z)?(s=n,n=n.nextZ,a--):(s=o,o=o.nextZ,l--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=o}r.nextZ=null,e*=2}while(t>1);return i}function Zl(i,t,e,n,s){return i=(i-e)*s|0,t=(t-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,i|t<<1}function Kf(i){let t=i,e=i;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==i);return e}function Id(i,t,e,n,s,r,o,a){return(s-o)*(t-a)>=(i-o)*(r-a)&&(i-o)*(n-a)>=(e-o)*(t-a)&&(e-o)*(r-a)>=(s-o)*(n-a)}function Js(i,t,e,n,s,r,o,a){return!(i===o&&t===a)&&Id(i,t,e,n,s,r,o,a)}function Jf(i,t){return i.next.i!==t.i&&i.prev.i!==t.i&&!Qf(i,t)&&(Sr(i,t)&&Sr(t,i)&&tp(i,t)&&(ge(i.prev,i,t.prev)||ge(i,t.prev,t))||vs(i,t)&&ge(i.prev,i,i.next)>0&&ge(t.prev,t,t.next)>0)}function ge(i,t,e){return(t.y-i.y)*(e.x-t.x)-(t.x-i.x)*(e.y-t.y)}function vs(i,t){return i.x===t.x&&i.y===t.y}function Ld(i,t,e,n){let s=yo(ge(i,t,e)),r=yo(ge(i,t,n)),o=yo(ge(e,n,i)),a=yo(ge(e,n,t));return!!(s!==r&&o!==a||s===0&&vo(i,e,t)||r===0&&vo(i,n,t)||o===0&&vo(e,i,n)||a===0&&vo(e,t,n))}function vo(i,t,e){return t.x<=Math.max(i.x,e.x)&&t.x>=Math.min(i.x,e.x)&&t.y<=Math.max(i.y,e.y)&&t.y>=Math.min(i.y,e.y)}function yo(i){return i>0?1:i<0?-1:0}function Qf(i,t){let e=i;do{if(e.i!==i.i&&e.next.i!==i.i&&e.i!==t.i&&e.next.i!==t.i&&Ld(e,e.next,i,t))return!0;e=e.next}while(e!==i);return!1}function Sr(i,t){return ge(i.prev,i,i.next)<0?ge(i,t,i.next)>=0&&ge(i,i.prev,t)>=0:ge(i,t,i.prev)<0||ge(i,i.next,t)<0}function tp(i,t){let e=i,n=!1,s=(i.x+t.x)/2,r=(i.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==i);return n}function Dd(i,t){let e=jl(i.i,i.x,i.y),n=jl(t.i,t.x,t.y),s=i.next,r=t.prev;return i.next=t,t.prev=i,e.next=s,s.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function Ph(i,t,e,n){let s=jl(i,t,e);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function wr(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function jl(i,t,e){return{i,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function ep(i,t,e,n){let s=0;for(let r=t,o=e-n;r<e;r+=n)s+=(i[o]-i[r])*(i[r+1]+i[o+1]),o=r;return s}var Kl=class{static triangulate(t,e,n=2){return Bf(t,e,n)}},Sn=class i{static area(t){let e=t.length,n=0;for(let s=e-1,r=0;r<e;s=r++)n+=t[s].x*t[r].y-t[r].x*t[s].y;return n*.5}static isClockWise(t){return i.area(t)<0}static triangulateShape(t,e){let n=[],s=[],r=[];Ih(t),Lh(n,t);let o=t.length;e.forEach(Ih);for(let l=0;l<e.length;l++)s.push(o),o+=e[l].length,Lh(n,e[l]);let a=Kl.triangulate(n,s);for(let l=0;l<a.length;l+=3)r.push(a.slice(l,l+3));return r}};function Ih(i){let t=i.length;t>2&&i[t-1].equals(i[0])&&i.pop()}function Lh(i,t){for(let e=0;e<t.length;e++)i.push(t[e].x),i.push(t[e].y)}var zn=class i extends Te{constructor(t=new je([new K(.5,.5),new K(-.5,.5),new K(-.5,-.5),new K(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];let n=this,s=[],r=[];for(let a=0,l=t.length;a<l;a++){let c=t[a];o(c)}this.setAttribute("position",new Kt(s,3)),this.setAttribute("uv",new Kt(r,2)),this.computeVertexNormals();function o(a){let l=[],c=e.curveSegments!==void 0?e.curveSegments:12,d=e.steps!==void 0?e.steps:1,h=e.depth!==void 0?e.depth:1,u=e.bevelEnabled!==void 0?e.bevelEnabled:!0,p=e.bevelThickness!==void 0?e.bevelThickness:.2,x=e.bevelSize!==void 0?e.bevelSize:p-.1,m=e.bevelOffset!==void 0?e.bevelOffset:0,g=e.bevelSegments!==void 0?e.bevelSegments:3,f=e.extrudePath,y=e.UVGenerator!==void 0?e.UVGenerator:np,b,_=!1,E,A,P,L;f&&(b=f.getSpacedPoints(d),_=!0,u=!1,E=f.computeFrenetFrames(d,!1),A=new R,P=new R,L=new R),u||(g=0,p=0,x=0,m=0);let w=a.extractPoints(c),S=w.shape,I=w.holes;if(!Sn.isClockWise(S)){S=S.reverse();for(let et=0,J=I.length;et<J;et++){let j=I[et];Sn.isClockWise(j)&&(I[et]=j.reverse())}}function H(et){let j=10000000000000001e-36,Z=et[0];for(let ut=1;ut<=et.length;ut++){let st=ut%et.length,ft=et[st],zt=ft.x-Z.x,Ht=ft.y-Z.y,T=zt*zt+Ht*Ht,v=Math.max(Math.abs(ft.x),Math.abs(ft.y),Math.abs(Z.x),Math.abs(Z.y)),B=j*v*v;if(T<=B){et.splice(st,1),ut--;continue}Z=ft}}H(S),I.forEach(H);let O=I.length,U=S;for(let et=0;et<O;et++){let J=I[et];S=S.concat(J)}function z(et,J,j){return J||console.error("THREE.ExtrudeGeometry: vec does not exist"),et.clone().addScaledVector(J,j)}let q=S.length;function V(et,J,j){let Z,ut,st,ft=et.x-J.x,zt=et.y-J.y,Ht=j.x-et.x,T=j.y-et.y,v=ft*ft+zt*zt,B=ft*T-zt*Ht;if(Math.abs(B)>Number.EPSILON){let $=Math.sqrt(v),tt=Math.sqrt(Ht*Ht+T*T),X=J.x-zt/$,Rt=J.y+ft/$,dt=j.x-T/tt,Et=j.y+Ht/tt,Tt=((dt-X)*T-(Et-Rt)*Ht)/(ft*T-zt*Ht);Z=X+ft*Tt-et.x,ut=Rt+zt*Tt-et.y;let ot=Z*Z+ut*ut;if(ot<=2)return new K(Z,ut);st=Math.sqrt(ot/2)}else{let $=!1;ft>Number.EPSILON?Ht>Number.EPSILON&&($=!0):ft<-Number.EPSILON?Ht<-Number.EPSILON&&($=!0):Math.sign(zt)===Math.sign(T)&&($=!0),$?(Z=-zt,ut=ft,st=Math.sqrt(v)):(Z=ft,ut=zt,st=Math.sqrt(v/2))}return new K(Z/st,ut/st)}let rt=[];for(let et=0,J=U.length,j=J-1,Z=et+1;et<J;et++,j++,Z++)j===J&&(j=0),Z===J&&(Z=0),rt[et]=V(U[et],U[j],U[Z]);let nt=[],ht,yt=rt.concat();for(let et=0,J=O;et<J;et++){let j=I[et];ht=[];for(let Z=0,ut=j.length,st=ut-1,ft=Z+1;Z<ut;Z++,st++,ft++)st===ut&&(st=0),ft===ut&&(ft=0),ht[Z]=V(j[Z],j[st],j[ft]);nt.push(ht),yt=yt.concat(ht)}let Bt;if(g===0)Bt=Sn.triangulateShape(U,I);else{let et=[],J=[];for(let j=0;j<g;j++){let Z=j/g,ut=p*Math.cos(Z*Math.PI/2),st=x*Math.sin(Z*Math.PI/2)+m;for(let ft=0,zt=U.length;ft<zt;ft++){let Ht=z(U[ft],rt[ft],st);Pt(Ht.x,Ht.y,-ut),Z===0&&et.push(Ht)}for(let ft=0,zt=O;ft<zt;ft++){let Ht=I[ft];ht=nt[ft];let T=[];for(let v=0,B=Ht.length;v<B;v++){let $=z(Ht[v],ht[v],st);Pt($.x,$.y,-ut),Z===0&&T.push($)}Z===0&&J.push(T)}}Bt=Sn.triangulateShape(et,J)}let Ut=Bt.length,Ot=x+m;for(let et=0;et<q;et++){let J=u?z(S[et],yt[et],Ot):S[et];_?(P.copy(E.normals[0]).multiplyScalar(J.x),A.copy(E.binormals[0]).multiplyScalar(J.y),L.copy(b[0]).add(P).add(A),Pt(L.x,L.y,L.z)):Pt(J.x,J.y,0)}for(let et=1;et<=d;et++)for(let J=0;J<q;J++){let j=u?z(S[J],yt[J],Ot):S[J];_?(P.copy(E.normals[et]).multiplyScalar(j.x),A.copy(E.binormals[et]).multiplyScalar(j.y),L.copy(b[et]).add(P).add(A),Pt(L.x,L.y,L.z)):Pt(j.x,j.y,h/d*et)}for(let et=g-1;et>=0;et--){let J=et/g,j=p*Math.cos(J*Math.PI/2),Z=x*Math.sin(J*Math.PI/2)+m;for(let ut=0,st=U.length;ut<st;ut++){let ft=z(U[ut],rt[ut],Z);Pt(ft.x,ft.y,h+j)}for(let ut=0,st=I.length;ut<st;ut++){let ft=I[ut];ht=nt[ut];for(let zt=0,Ht=ft.length;zt<Ht;zt++){let T=z(ft[zt],ht[zt],Z);_?Pt(T.x,T.y+b[d-1].y,b[d-1].x+j):Pt(T.x,T.y,h+j)}}}Y(),it();function Y(){let et=s.length/3;if(u){let J=0,j=q*J;for(let Z=0;Z<Ut;Z++){let ut=Bt[Z];wt(ut[2]+j,ut[1]+j,ut[0]+j)}J=d+g*2,j=q*J;for(let Z=0;Z<Ut;Z++){let ut=Bt[Z];wt(ut[0]+j,ut[1]+j,ut[2]+j)}}else{for(let J=0;J<Ut;J++){let j=Bt[J];wt(j[2],j[1],j[0])}for(let J=0;J<Ut;J++){let j=Bt[J];wt(j[0]+q*d,j[1]+q*d,j[2]+q*d)}}n.addGroup(et,s.length/3-et,0)}function it(){let et=s.length/3,J=0;bt(U,J),J+=U.length;for(let j=0,Z=I.length;j<Z;j++){let ut=I[j];bt(ut,J),J+=ut.length}n.addGroup(et,s.length/3-et,1)}function bt(et,J){let j=et.length;for(;--j>=0;){let Z=j,ut=j-1;ut<0&&(ut=et.length-1);for(let st=0,ft=d+g*2;st<ft;st++){let zt=q*st,Ht=q*(st+1),T=J+Z+zt,v=J+ut+zt,B=J+ut+Ht,$=J+Z+Ht;Yt(T,v,B,$)}}}function Pt(et,J,j){l.push(et),l.push(J),l.push(j)}function wt(et,J,j){le(et),le(J),le(j);let Z=s.length/3,ut=y.generateTopUV(n,s,Z-3,Z-2,Z-1);C(ut[0]),C(ut[1]),C(ut[2])}function Yt(et,J,j,Z){le(et),le(J),le(Z),le(J),le(j),le(Z);let ut=s.length/3,st=y.generateSideWallUV(n,s,ut-6,ut-3,ut-2,ut-1);C(st[0]),C(st[1]),C(st[3]),C(st[1]),C(st[2]),C(st[3])}function le(et){s.push(l[et*3+0]),s.push(l[et*3+1]),s.push(l[et*3+2])}function C(et){r.push(et.x),r.push(et.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return ip(e,n,t)}static fromJSON(t,e){let n=[];for(let r=0,o=t.shapes.length;r<o;r++){let a=e[t.shapes[r]];n.push(a)}let s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new Yl[s.type]().fromJSON(s)),new i(n,t.options)}},np={generateTopUV:function(i,t,e,n,s){let r=t[e*3],o=t[e*3+1],a=t[n*3],l=t[n*3+1],c=t[s*3],d=t[s*3+1];return[new K(r,o),new K(a,l),new K(c,d)]},generateSideWallUV:function(i,t,e,n,s,r){let o=t[e*3],a=t[e*3+1],l=t[e*3+2],c=t[n*3],d=t[n*3+1],h=t[n*3+2],u=t[s*3],p=t[s*3+1],x=t[s*3+2],m=t[r*3],g=t[r*3+1],f=t[r*3+2];return Math.abs(a-d)<Math.abs(o-c)?[new K(o,1-l),new K(c,1-h),new K(u,1-x),new K(m,1-f)]:[new K(a,1-l),new K(d,1-h),new K(p,1-x),new K(g,1-f)]}};function ip(i,t,e){if(e.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){let r=i[n];e.shapes.push(r.uuid)}else e.shapes.push(i.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}var Er=class i extends Te{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};let r=t/2,o=e/2,a=Math.floor(n),l=Math.floor(s),c=a+1,d=l+1,h=t/a,u=e/l,p=[],x=[],m=[],g=[];for(let f=0;f<d;f++){let y=f*u-o;for(let b=0;b<c;b++){let _=b*h-r;x.push(_,-y,0),m.push(0,0,1),g.push(b/a),g.push(1-f/l)}}for(let f=0;f<l;f++)for(let y=0;y<a;y++){let b=y+c*f,_=y+c*(f+1),E=y+1+c*(f+1),A=y+1+c*f;p.push(b,_,A),p.push(_,E,A)}this.setIndex(p),this.setAttribute("position",new Kt(x,3)),this.setAttribute("normal",new Kt(m,3)),this.setAttribute("uv",new Kt(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.widthSegments,t.heightSegments)}};var Tr=class i extends Te{constructor(t=new je([new K(0,.5),new K(-.5,-.5),new K(.5,-.5)]),e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};let n=[],s=[],r=[],o=[],a=0,l=0;if(Array.isArray(t)===!1)c(t);else for(let d=0;d<t.length;d++)c(t[d]),this.addGroup(a,l,d),a+=l,l=0;this.setIndex(n),this.setAttribute("position",new Kt(s,3)),this.setAttribute("normal",new Kt(r,3)),this.setAttribute("uv",new Kt(o,2));function c(d){let h=s.length/3,u=d.extractPoints(e),p=u.shape,x=u.holes;Sn.isClockWise(p)===!1&&(p=p.reverse());for(let g=0,f=x.length;g<f;g++){let y=x[g];Sn.isClockWise(y)===!0&&(x[g]=y.reverse())}let m=Sn.triangulateShape(p,x);for(let g=0,f=x.length;g<f;g++){let y=x[g];p=p.concat(y)}for(let g=0,f=p.length;g<f;g++){let y=p[g];s.push(y.x,y.y,0),r.push(0,0,1),o.push(y.x,y.y)}for(let g=0,f=m.length;g<f;g++){let y=m[g],b=y[0]+h,_=y[1]+h,E=y[2]+h;n.push(b,_,E),l+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes;return sp(e,t)}static fromJSON(t,e){let n=[];for(let s=0,r=t.shapes.length;s<r;s++){let o=e[t.shapes[s]];n.push(o)}return new i(n,t.curveSegments)}};function sp(i,t){if(t.shapes=[],Array.isArray(i))for(let e=0,n=i.length;e<n;e++){let s=i[e];t.shapes.push(s.uuid)}else t.shapes.push(i.uuid);return t}var wi=class i extends Te{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));let l=Math.min(o+a,Math.PI),c=0,d=[],h=new R,u=new R,p=[],x=[],m=[],g=[];for(let f=0;f<=n;f++){let y=[],b=f/n,_=0;f===0&&o===0?_=.5/e:f===n&&l===Math.PI&&(_=-.5/e);for(let E=0;E<=e;E++){let A=E/e;h.x=-t*Math.cos(s+A*r)*Math.sin(o+b*a),h.y=t*Math.cos(o+b*a),h.z=t*Math.sin(s+A*r)*Math.sin(o+b*a),x.push(h.x,h.y,h.z),u.copy(h).normalize(),m.push(u.x,u.y,u.z),g.push(A+_,1-b),y.push(c++)}d.push(y)}for(let f=0;f<n;f++)for(let y=0;y<e;y++){let b=d[f][y+1],_=d[f][y],E=d[f+1][y],A=d[f+1][y+1];(f!==0||o>0)&&p.push(b,_,A),(f!==n-1||l<Math.PI)&&p.push(_,E,A)}this.setIndex(p),this.setAttribute("position",new Kt(x,3)),this.setAttribute("normal",new Kt(m,3)),this.setAttribute("uv",new Kt(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};var ys=class i extends Te{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);let o=[],a=[],l=[],c=[],d=new R,h=new R,u=new R;for(let p=0;p<=n;p++)for(let x=0;x<=s;x++){let m=x/s*r,g=p/n*Math.PI*2;h.x=(t+e*Math.cos(g))*Math.cos(m),h.y=(t+e*Math.cos(g))*Math.sin(m),h.z=e*Math.sin(g),a.push(h.x,h.y,h.z),d.x=t*Math.cos(m),d.y=t*Math.sin(m),u.subVectors(h,d).normalize(),l.push(u.x,u.y,u.z),c.push(x/s),c.push(p/n)}for(let p=1;p<=n;p++)for(let x=1;x<=s;x++){let m=(s+1)*p+x-1,g=(s+1)*(p-1)+x-1,f=(s+1)*(p-1)+x,y=(s+1)*p+x;o.push(m,g,y),o.push(g,f,y)}this.setIndex(o),this.setAttribute("position",new Kt(a,3)),this.setAttribute("normal",new Kt(l,3)),this.setAttribute("uv",new Kt(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}};var Fe=class extends An{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new kt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new kt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=gc,this.normalScale=new K(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new _n,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};var Wo=class extends An{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=md,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},$o=class extends An{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function bo(i,t){return!i||i.constructor===t?i:typeof t.BYTES_PER_ELEMENT=="number"?new t(i):Array.prototype.slice.call(i)}function rp(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}var Ei=class{constructor(t,e,n,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,s=e[n],r=e[n-1];n:{t:{let o;e:{i:if(!(t<s)){for(let a=n+2;;){if(s===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=s,s=e[++n],t<s)break t}o=e.length;break e}if(!(t>=r)){let a=e[1];t<a&&(n=2,r=a);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(s=r,r=e[--n-1],t>=r)break t}o=n,n=0;break e}break n}for(;n<o;){let a=n+o>>>1;t<e[a]?o=a:n=a+1}if(s=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=t*s;for(let o=0;o!==s;++o)e[o]=n[r+o];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Xo=class extends Ei{constructor(t,e,n,s){super(t,e,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Wl,endingEnd:Wl}}intervalChanged_(t,e,n){let s=this.parameterPositions,r=t-2,o=t+1,a=s[r],l=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case $l:r=t,a=2*e-n;break;case Xl:r=s.length-2,a=e+s[r]-s[r+1];break;default:r=t,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case $l:o=t,l=2*n-e;break;case Xl:o=1,l=n+s[1]-s[0];break;default:o=t-1,l=e}let c=(n-e)*.5,d=this.valueSize;this._weightPrev=c/(e-a),this._weightNext=c/(l-n),this._offsetPrev=r*d,this._offsetNext=o*d}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,d=this._offsetPrev,h=this._offsetNext,u=this._weightPrev,p=this._weightNext,x=(n-e)/(s-e),m=x*x,g=m*x,f=-u*g+2*u*m-u*x,y=(1+u)*g+(-1.5-2*u)*m+(-.5+u)*x+1,b=(-1-p)*g+(1.5+p)*m+.5*x,_=p*g-p*m;for(let E=0;E!==a;++E)r[E]=f*o[d+E]+y*o[c+E]+b*o[l+E]+_*o[h+E];return r}},qo=class extends Ei{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,d=(n-e)/(s-e),h=1-d;for(let u=0;u!==a;++u)r[u]=o[c+u]*h+o[l+u]*d;return r}},Yo=class extends Ei{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t){return this.copySampleValue_(t-1)}},Ke=class{constructor(t,e,n,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=bo(e,this.TimeBufferType),this.values=bo(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:bo(t.times,Array),values:bo(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(n.interpolation=s)}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new Yo(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new qo(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Xo(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case nr:e=this.InterpolantFactoryMethodDiscrete;break;case Ao:e=this.InterpolantFactoryMethodLinear;break;case Mo:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return nr;case this.InterpolantFactoryMethodLinear:return Ao;case this.InterpolantFactoryMethodSmooth:return Mo}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]*=t}return this}trim(t,e){let n=this.times,s=n.length,r=0,o=s-1;for(;r!==s&&n[r]<t;)++r;for(;o!==-1&&n[o]>e;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==r;a++){let l=n[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),t=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),t=!1;break}o=l}if(s!==void 0&&rp(s))for(let a=0,l=s.length;a!==l;++a){let c=s[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===Mo,r=t.length-1,o=1;for(let a=1;a<r;++a){let l=!1,c=t[a],d=t[a+1];if(c!==d&&(a!==1||c!==t[0]))if(s)l=!0;else{let h=a*n,u=h-n,p=h+n;for(let x=0;x!==n;++x){let m=e[h+x];if(m!==e[u+x]||m!==e[p+x]){l=!0;break}}}if(l){if(a!==o){t[o]=t[a];let h=a*n,u=o*n;for(let p=0;p!==n;++p)e[u+p]=e[h+p]}++o}}if(r>0){t[o]=t[r];for(let a=r*n,l=o*n,c=0;c!==n;++c)e[l+c]=e[a+c];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,s=new n(this.name,t,e);return s.createInterpolant=this.createInterpolant,s}};Ke.prototype.ValueTypeName="";Ke.prototype.TimeBufferType=Float32Array;Ke.prototype.ValueBufferType=Float32Array;Ke.prototype.DefaultInterpolation=Ao;var ni=class extends Ke{constructor(t,e,n){super(t,e,n)}};ni.prototype.ValueTypeName="bool";ni.prototype.ValueBufferType=Array;ni.prototype.DefaultInterpolation=nr;ni.prototype.InterpolantFactoryMethodLinear=void 0;ni.prototype.InterpolantFactoryMethodSmooth=void 0;var Zo=class extends Ke{constructor(t,e,n,s){super(t,e,n,s)}};Zo.prototype.ValueTypeName="color";var jo=class extends Ke{constructor(t,e,n,s){super(t,e,n,s)}};jo.prototype.ValueTypeName="number";var Ko=class extends Ei{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-e)/(s-e),c=t*a;for(let d=c+a;c!==d;c+=4)rn.slerpFlat(r,0,o,c-a,o,c,l);return r}},Ar=class extends Ke{constructor(t,e,n,s){super(t,e,n,s)}InterpolantFactoryMethodLinear(t){return new Ko(this.times,this.values,this.getValueSize(),t)}};Ar.prototype.ValueTypeName="quaternion";Ar.prototype.InterpolantFactoryMethodSmooth=void 0;var ii=class extends Ke{constructor(t,e,n){super(t,e,n)}};ii.prototype.ValueTypeName="string";ii.prototype.ValueBufferType=Array;ii.prototype.DefaultInterpolation=nr;ii.prototype.InterpolantFactoryMethodLinear=void 0;ii.prototype.InterpolantFactoryMethodSmooth=void 0;var Jo=class extends Ke{constructor(t,e,n,s){super(t,e,n,s)}};Jo.prototype.ValueTypeName="vector";var So={enabled:!1,files:{},add:function(i,t){this.enabled!==!1&&(this.files[i]=t)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}},Qo=class{constructor(t,e,n){let s=this,r=!1,o=0,a=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.abortController=new AbortController,this.itemStart=function(d){a++,r===!1&&s.onStart!==void 0&&s.onStart(d,o,a),r=!0},this.itemEnd=function(d){o++,s.onProgress!==void 0&&s.onProgress(d,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(d){s.onError!==void 0&&s.onError(d)},this.resolveURL=function(d){return l?l(d):d},this.setURLModifier=function(d){return l=d,this},this.addHandler=function(d,h){return c.push(d,h),this},this.removeHandler=function(d){let h=c.indexOf(d);return h!==-1&&c.splice(h,2),this},this.getHandler=function(d){for(let h=0,u=c.length;h<u;h+=2){let p=c[h],x=c[h+1];if(p.global&&(p.lastIndex=0),p.test(d))return x}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}},Nd=new Qo,bs=class{constructor(t){this.manager=t!==void 0?t:Nd,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){let n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}};bs.DEFAULT_MATERIAL_NAME="__DEFAULT";var ss=new WeakMap,ta=class extends bs{constructor(t){super(t)}load(t,e,n,s){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);let r=this,o=So.get(`image:${t}`);if(o!==void 0){if(o.complete===!0)r.manager.itemStart(t),setTimeout(function(){e&&e(o),r.manager.itemEnd(t)},0);else{let h=ss.get(o);h===void 0&&(h=[],ss.set(o,h)),h.push({onLoad:e,onError:s})}return o}let a=hs("img");function l(){d(),e&&e(this);let h=ss.get(this)||[];for(let u=0;u<h.length;u++){let p=h[u];p.onLoad&&p.onLoad(this)}ss.delete(this),r.manager.itemEnd(t)}function c(h){d(),s&&s(h),So.remove(`image:${t}`);let u=ss.get(this)||[];for(let p=0;p<u.length;p++){let x=u[p];x.onError&&x.onError(h)}ss.delete(this),r.manager.itemError(t),r.manager.itemEnd(t)}function d(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),So.add(`image:${t}`,a),r.manager.itemStart(t),a.src=t,a}};var Rr=class extends bs{constructor(t){super(t)}load(t,e,n,s){let r=new He,o=new ta(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(t,function(a){r.image=a,r.needsUpdate=!0,e!==void 0&&e(r)},n,s),r}},Ms=class extends we{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new kt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}},Ti=class extends Ms{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(we.DEFAULT_UP),this.updateMatrix(),this.groundColor=new kt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}},Vl=new se,Dh=new R,Nh=new R,ea=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new K(512,512),this.mapType=yn,this.map=null,this.mapPass=null,this.matrix=new se,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new gs,this._frameExtents=new K(1,1),this._viewportCount=1,this._viewports=[new ne(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera,n=this.matrix;Dh.setFromMatrixPosition(t.matrixWorld),e.position.copy(Dh),Nh.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Nh),e.updateMatrixWorld(),Vl.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Vl,e.coordinateSystem,e.reversedDepth),e.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Vl)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}};var Uh=new se,Ks=new R,Gl=new R,Jl=class extends ea{constructor(){super(new Ee(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new K(4,2),this._viewportCount=6,this._viewports=[new ne(2,1,1,1),new ne(0,1,1,1),new ne(3,1,1,1),new ne(1,1,1,1),new ne(3,0,1,1),new ne(1,0,1,1)],this._cubeDirections=[new R(1,0,0),new R(-1,0,0),new R(0,0,1),new R(0,0,-1),new R(0,1,0),new R(0,-1,0)],this._cubeUps=[new R(0,1,0),new R(0,1,0),new R(0,1,0),new R(0,1,0),new R(0,0,1),new R(0,0,-1)]}updateMatrices(t,e=0){let n=this.camera,s=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),Ks.setFromMatrixPosition(t.matrixWorld),n.position.copy(Ks),Gl.copy(n.position),Gl.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(Gl),n.updateMatrixWorld(),s.makeTranslation(-Ks.x,-Ks.y,-Ks.z),Uh.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Uh,n.coordinateSystem,n.reversedDepth)}},Cr=class extends Ms{constructor(t,e,n=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Jl}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}},Pr=class extends lr{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-t,o=n+t,a=s+e,l=s-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=d*this.view.offsetY,l=a-d*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},Ql=class extends ea{constructor(){super(new Pr(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Ai=class extends Ms{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(we.DEFAULT_UP),this.updateMatrix(),this.target=new we,this.shadow=new Ql}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}};var na=class extends Ee{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}};var Sc="\\[\\]\\.:\\/",op=new RegExp("["+Sc+"]","g"),wc="[^"+Sc+"]",ap="[^"+Sc.replace("\\.","")+"]",lp=/((?:WC+[\/:])*)/.source.replace("WC",wc),cp=/(WCOD+)?/.source.replace("WCOD",ap),hp=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",wc),dp=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",wc),up=new RegExp("^"+lp+cp+hp+dp+"$"),fp=["material","materials","bones","map"],tc=class{constructor(t,e,n){let s=n||ue.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},ue=class i{constructor(t,e,n){this.path=e,this.parsedPath=n||i.parseTrackName(e),this.node=i.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new i.Composite(t,e,n):new i(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(op,"")}static parseTrackName(t){let e=up.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);fp.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===e||a.uuid===e)return a;let l=n(a.children);if(l)return l}return null},s=n(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)t[e++]=n[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=i.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=e.objectIndex;switch(n){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let d=0;d<t.length;d++)if(t[d].name===c){c=d;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(c!==void 0){if(t[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let o=t[s];if(o===void 0){let c=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?a=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};ue.Composite=tc;ue.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};ue.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};ue.prototype.GetterByBindingType=[ue.prototype._getValue_direct,ue.prototype._getValue_array,ue.prototype._getValue_arrayElement,ue.prototype._getValue_toArray];ue.prototype.SetterByBindingTypeAndVersioning=[[ue.prototype._setValue_direct,ue.prototype._setValue_direct_setNeedsUpdate,ue.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ue.prototype._setValue_array,ue.prototype._setValue_array_setNeedsUpdate,ue.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ue.prototype._setValue_arrayElement,ue.prototype._setValue_arrayElement_setNeedsUpdate,ue.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ue.prototype._setValue_fromArray,ue.prototype._setValue_fromArray_setNeedsUpdate,ue.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var E_=new Float32Array(1);var Fh=new se,Ir=class{constructor(t,e,n=0,s=1/0){this.ray=new Qn(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new fs,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Fh.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Fh),this}intersectObject(t,e=!0,n=[]){return ec(t,this,n,e),n.sort(Oh),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)ec(t[s],this,n,e);return n.sort(Oh),n}};function Oh(i,t){return i.distance-t.distance}function ec(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){let r=i.children;for(let o=0,a=r.length;o<a;o++)ec(r[o],t,e,!0)}}var Ss=class{constructor(t=1,e=0,n=0){this.radius=t,this.phi=e,this.theta=n}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=$t(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos($t(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var Lr=class extends En{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){if(t===void 0){console.warn("THREE.Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}};function Ec(i,t,e,n){let s=pp(n);switch(e){case uc:return i*t;case pc:return i*t/s.components*s.byteLength;case ga:return i*t/s.components*s.byteLength;case mc:return i*t*2/s.components*s.byteLength;case xa:return i*t*2/s.components*s.byteLength;case fc:return i*t*3/s.components*s.byteLength;case ln:return i*t*4/s.components*s.byteLength;case _a:return i*t*4/s.components*s.byteLength;case Fr:case Or:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case kr:case Br:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case ya:case Ma:return Math.max(i,16)*Math.max(t,8)/4;case va:case ba:return Math.max(i,8)*Math.max(t,8)/2;case Sa:case wa:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Ea:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Ta:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Aa:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case Ra:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case Ca:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case Pa:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case Ia:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case La:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case Da:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Na:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case Ua:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case Fa:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Oa:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case ka:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Ba:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case Ha:case za:case Va:return Math.ceil(i/4)*Math.ceil(t/4)*16;case Ga:case Wa:return Math.ceil(i/4)*Math.ceil(t/4)*8;case $a:case Xa:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function pp(i){switch(i){case yn:case lc:return{byteLength:1,components:1};case ws:case cc:case Es:return{byteLength:2,components:1};case pa:case ma:return{byteLength:2,components:4};case ai:case fa:case Cn:return{byteLength:4,components:1};case hc:case dc:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"180"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="180");function su(){let i=null,t=!1,e=null,n=null;function s(r,o){e(r,o),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function gp(i){let t=new WeakMap;function e(a,l){let c=a.array,d=a.usage,h=c.byteLength,u=i.createBuffer();i.bindBuffer(l,u),i.bufferData(l,c,d),a.onUploadCallback();let p;if(c instanceof Float32Array)p=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)p=i.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?p=i.HALF_FLOAT:p=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=i.SHORT;else if(c instanceof Uint32Array)p=i.UNSIGNED_INT;else if(c instanceof Int32Array)p=i.INT;else if(c instanceof Int8Array)p=i.BYTE;else if(c instanceof Uint8Array)p=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:h}}function n(a,l,c){let d=l.array,h=l.updateRanges;if(i.bindBuffer(c,a),h.length===0)i.bufferSubData(c,0,d);else{h.sort((p,x)=>p.start-x.start);let u=0;for(let p=1;p<h.length;p++){let x=h[u],m=h[p];m.start<=x.start+x.count+1?x.count=Math.max(x.count,m.start+m.count-x.start):(++u,h[u]=m)}h.length=u+1;for(let p=0,x=h.length;p<x;p++){let m=h[p];i.bufferSubData(c,m.start*d.BYTES_PER_ELEMENT,d,m.start,m.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let l=t.get(a);l&&(i.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let d=t.get(a);(!d||d.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}var xp=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,_p=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,vp=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,yp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,bp=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Mp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Sp=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,wp=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Ep=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Tp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Ap=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Rp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Cp=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Pp=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Ip=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Lp=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Dp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Np=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Up=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Fp=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Op=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,kp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Bp=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Hp=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,zp=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Vp=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Gp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Wp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,$p=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Xp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,qp="gl_FragColor = linearToOutputTexel( gl_FragColor );",Yp=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Zp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,jp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Kp=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Jp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Qp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,tm=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,em=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,nm=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,im=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,sm=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,rm=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,om=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,am=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lm=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,cm=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,hm=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,dm=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,um=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,fm=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,pm=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,mm=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,gm=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,xm=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,_m=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,vm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,ym=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,bm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Mm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Sm=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,wm=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Em=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Tm=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Am=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Rm=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Cm=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Pm=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Im=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Lm=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Dm=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Nm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Um=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Fm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Om=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,km=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Bm=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Hm=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,zm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Vm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Gm=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Wm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,$m=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Xm=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,qm=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Ym=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Zm=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,jm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Km=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Jm=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Qm=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,tg=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,eg=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,ng=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,ig=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,sg=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,rg=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,og=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,ag=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,lg=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,cg=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,hg=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,dg=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,ug=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,fg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,pg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,mg=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,gg=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,xg=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,_g=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,vg=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,yg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,bg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Mg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Sg=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,wg=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Eg=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Tg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Ag=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Rg=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Cg=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Pg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Ig=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Lg=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Dg=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ng=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Ug=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Fg=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Og=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,kg=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Bg=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Hg=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,zg=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Vg=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Gg=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Wg=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,$g=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Xg=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,qg=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Yg=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Zg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Xt={alphahash_fragment:xp,alphahash_pars_fragment:_p,alphamap_fragment:vp,alphamap_pars_fragment:yp,alphatest_fragment:bp,alphatest_pars_fragment:Mp,aomap_fragment:Sp,aomap_pars_fragment:wp,batching_pars_vertex:Ep,batching_vertex:Tp,begin_vertex:Ap,beginnormal_vertex:Rp,bsdfs:Cp,iridescence_fragment:Pp,bumpmap_pars_fragment:Ip,clipping_planes_fragment:Lp,clipping_planes_pars_fragment:Dp,clipping_planes_pars_vertex:Np,clipping_planes_vertex:Up,color_fragment:Fp,color_pars_fragment:Op,color_pars_vertex:kp,color_vertex:Bp,common:Hp,cube_uv_reflection_fragment:zp,defaultnormal_vertex:Vp,displacementmap_pars_vertex:Gp,displacementmap_vertex:Wp,emissivemap_fragment:$p,emissivemap_pars_fragment:Xp,colorspace_fragment:qp,colorspace_pars_fragment:Yp,envmap_fragment:Zp,envmap_common_pars_fragment:jp,envmap_pars_fragment:Kp,envmap_pars_vertex:Jp,envmap_physical_pars_fragment:cm,envmap_vertex:Qp,fog_vertex:tm,fog_pars_vertex:em,fog_fragment:nm,fog_pars_fragment:im,gradientmap_pars_fragment:sm,lightmap_pars_fragment:rm,lights_lambert_fragment:om,lights_lambert_pars_fragment:am,lights_pars_begin:lm,lights_toon_fragment:hm,lights_toon_pars_fragment:dm,lights_phong_fragment:um,lights_phong_pars_fragment:fm,lights_physical_fragment:pm,lights_physical_pars_fragment:mm,lights_fragment_begin:gm,lights_fragment_maps:xm,lights_fragment_end:_m,logdepthbuf_fragment:vm,logdepthbuf_pars_fragment:ym,logdepthbuf_pars_vertex:bm,logdepthbuf_vertex:Mm,map_fragment:Sm,map_pars_fragment:wm,map_particle_fragment:Em,map_particle_pars_fragment:Tm,metalnessmap_fragment:Am,metalnessmap_pars_fragment:Rm,morphinstance_vertex:Cm,morphcolor_vertex:Pm,morphnormal_vertex:Im,morphtarget_pars_vertex:Lm,morphtarget_vertex:Dm,normal_fragment_begin:Nm,normal_fragment_maps:Um,normal_pars_fragment:Fm,normal_pars_vertex:Om,normal_vertex:km,normalmap_pars_fragment:Bm,clearcoat_normal_fragment_begin:Hm,clearcoat_normal_fragment_maps:zm,clearcoat_pars_fragment:Vm,iridescence_pars_fragment:Gm,opaque_fragment:Wm,packing:$m,premultiplied_alpha_fragment:Xm,project_vertex:qm,dithering_fragment:Ym,dithering_pars_fragment:Zm,roughnessmap_fragment:jm,roughnessmap_pars_fragment:Km,shadowmap_pars_fragment:Jm,shadowmap_pars_vertex:Qm,shadowmap_vertex:tg,shadowmask_pars_fragment:eg,skinbase_vertex:ng,skinning_pars_vertex:ig,skinning_vertex:sg,skinnormal_vertex:rg,specularmap_fragment:og,specularmap_pars_fragment:ag,tonemapping_fragment:lg,tonemapping_pars_fragment:cg,transmission_fragment:hg,transmission_pars_fragment:dg,uv_pars_fragment:ug,uv_pars_vertex:fg,uv_vertex:pg,worldpos_vertex:mg,background_vert:gg,background_frag:xg,backgroundCube_vert:_g,backgroundCube_frag:vg,cube_vert:yg,cube_frag:bg,depth_vert:Mg,depth_frag:Sg,distanceRGBA_vert:wg,distanceRGBA_frag:Eg,equirect_vert:Tg,equirect_frag:Ag,linedashed_vert:Rg,linedashed_frag:Cg,meshbasic_vert:Pg,meshbasic_frag:Ig,meshlambert_vert:Lg,meshlambert_frag:Dg,meshmatcap_vert:Ng,meshmatcap_frag:Ug,meshnormal_vert:Fg,meshnormal_frag:Og,meshphong_vert:kg,meshphong_frag:Bg,meshphysical_vert:Hg,meshphysical_frag:zg,meshtoon_vert:Vg,meshtoon_frag:Gg,points_vert:Wg,points_frag:$g,shadow_vert:Xg,shadow_frag:qg,sprite_vert:Yg,sprite_frag:Zg},mt={common:{diffuse:{value:new kt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Gt},alphaMap:{value:null},alphaMapTransform:{value:new Gt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Gt}},envmap:{envMap:{value:null},envMapRotation:{value:new Gt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Gt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Gt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Gt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Gt},normalScale:{value:new K(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Gt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Gt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Gt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Gt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new kt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new kt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Gt},alphaTest:{value:0},uvTransform:{value:new Gt}},sprite:{diffuse:{value:new kt(16777215)},opacity:{value:1},center:{value:new K(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Gt},alphaMap:{value:null},alphaMapTransform:{value:new Gt},alphaTest:{value:0}}},Pn={basic:{uniforms:Oe([mt.common,mt.specularmap,mt.envmap,mt.aomap,mt.lightmap,mt.fog]),vertexShader:Xt.meshbasic_vert,fragmentShader:Xt.meshbasic_frag},lambert:{uniforms:Oe([mt.common,mt.specularmap,mt.envmap,mt.aomap,mt.lightmap,mt.emissivemap,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.fog,mt.lights,{emissive:{value:new kt(0)}}]),vertexShader:Xt.meshlambert_vert,fragmentShader:Xt.meshlambert_frag},phong:{uniforms:Oe([mt.common,mt.specularmap,mt.envmap,mt.aomap,mt.lightmap,mt.emissivemap,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.fog,mt.lights,{emissive:{value:new kt(0)},specular:{value:new kt(1118481)},shininess:{value:30}}]),vertexShader:Xt.meshphong_vert,fragmentShader:Xt.meshphong_frag},standard:{uniforms:Oe([mt.common,mt.envmap,mt.aomap,mt.lightmap,mt.emissivemap,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.roughnessmap,mt.metalnessmap,mt.fog,mt.lights,{emissive:{value:new kt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Xt.meshphysical_vert,fragmentShader:Xt.meshphysical_frag},toon:{uniforms:Oe([mt.common,mt.aomap,mt.lightmap,mt.emissivemap,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.gradientmap,mt.fog,mt.lights,{emissive:{value:new kt(0)}}]),vertexShader:Xt.meshtoon_vert,fragmentShader:Xt.meshtoon_frag},matcap:{uniforms:Oe([mt.common,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.fog,{matcap:{value:null}}]),vertexShader:Xt.meshmatcap_vert,fragmentShader:Xt.meshmatcap_frag},points:{uniforms:Oe([mt.points,mt.fog]),vertexShader:Xt.points_vert,fragmentShader:Xt.points_frag},dashed:{uniforms:Oe([mt.common,mt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Xt.linedashed_vert,fragmentShader:Xt.linedashed_frag},depth:{uniforms:Oe([mt.common,mt.displacementmap]),vertexShader:Xt.depth_vert,fragmentShader:Xt.depth_frag},normal:{uniforms:Oe([mt.common,mt.bumpmap,mt.normalmap,mt.displacementmap,{opacity:{value:1}}]),vertexShader:Xt.meshnormal_vert,fragmentShader:Xt.meshnormal_frag},sprite:{uniforms:Oe([mt.sprite,mt.fog]),vertexShader:Xt.sprite_vert,fragmentShader:Xt.sprite_frag},background:{uniforms:{uvTransform:{value:new Gt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Xt.background_vert,fragmentShader:Xt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Gt}},vertexShader:Xt.backgroundCube_vert,fragmentShader:Xt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Xt.cube_vert,fragmentShader:Xt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Xt.equirect_vert,fragmentShader:Xt.equirect_frag},distanceRGBA:{uniforms:Oe([mt.common,mt.displacementmap,{referencePosition:{value:new R},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Xt.distanceRGBA_vert,fragmentShader:Xt.distanceRGBA_frag},shadow:{uniforms:Oe([mt.lights,mt.fog,{color:{value:new kt(0)},opacity:{value:1}}]),vertexShader:Xt.shadow_vert,fragmentShader:Xt.shadow_frag}};Pn.physical={uniforms:Oe([Pn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Gt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Gt},clearcoatNormalScale:{value:new K(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Gt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Gt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Gt},sheen:{value:0},sheenColor:{value:new kt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Gt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Gt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Gt},transmissionSamplerSize:{value:new K},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Gt},attenuationDistance:{value:0},attenuationColor:{value:new kt(0)},specularColor:{value:new kt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Gt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Gt},anisotropyVector:{value:new K},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Gt}}]),vertexShader:Xt.meshphysical_vert,fragmentShader:Xt.meshphysical_frag};var qa={r:0,b:0,g:0},Li=new _n,jg=new se;function Kg(i,t,e,n,s,r,o){let a=new kt(0),l=r===!0?0:1,c,d,h=null,u=0,p=null;function x(b){let _=b.isScene===!0?b.background:null;return _&&_.isTexture&&(_=(b.backgroundBlurriness>0?e:t).get(_)),_}function m(b){let _=!1,E=x(b);E===null?f(a,l):E&&E.isColor&&(f(E,1),_=!0);let A=i.xr.getEnvironmentBlendMode();A==="additive"?n.buffers.color.setClear(0,0,0,1,o):A==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||_)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function g(b,_){let E=x(_);E&&(E.isCubeTexture||E.mapping===Nr)?(d===void 0&&(d=new fe(new Ge(1,1,1),new vn({name:"BackgroundCubeMaterial",uniforms:Ii(Pn.backgroundCube.uniforms),vertexShader:Pn.backgroundCube.vertexShader,fragmentShader:Pn.backgroundCube.fragmentShader,side:ze,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),d.geometry.deleteAttribute("normal"),d.geometry.deleteAttribute("uv"),d.onBeforeRender=function(A,P,L){this.matrixWorld.copyPosition(L.matrixWorld)},Object.defineProperty(d.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(d)),Li.copy(_.backgroundRotation),Li.x*=-1,Li.y*=-1,Li.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(Li.y*=-1,Li.z*=-1),d.material.uniforms.envMap.value=E,d.material.uniforms.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,d.material.uniforms.backgroundBlurriness.value=_.backgroundBlurriness,d.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,d.material.uniforms.backgroundRotation.value.setFromMatrix4(jg.makeRotationFromEuler(Li)),d.material.toneMapped=jt.getTransfer(E.colorSpace)!==ie,(h!==E||u!==E.version||p!==i.toneMapping)&&(d.material.needsUpdate=!0,h=E,u=E.version,p=i.toneMapping),d.layers.enableAll(),b.unshift(d,d.geometry,d.material,0,0,null)):E&&E.isTexture&&(c===void 0&&(c=new fe(new Er(2,2),new vn({name:"BackgroundMaterial",uniforms:Ii(Pn.background.uniforms),vertexShader:Pn.background.vertexShader,fragmentShader:Pn.background.fragmentShader,side:gn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=E,c.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,c.material.toneMapped=jt.getTransfer(E.colorSpace)!==ie,E.matrixAutoUpdate===!0&&E.updateMatrix(),c.material.uniforms.uvTransform.value.copy(E.matrix),(h!==E||u!==E.version||p!==i.toneMapping)&&(c.material.needsUpdate=!0,h=E,u=E.version,p=i.toneMapping),c.layers.enableAll(),b.unshift(c,c.geometry,c.material,0,0,null))}function f(b,_){b.getRGB(qa,bc(i)),n.buffers.color.setClear(qa.r,qa.g,qa.b,_,o)}function y(){d!==void 0&&(d.geometry.dispose(),d.material.dispose(),d=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(b,_=1){a.set(b),l=_,f(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(b){l=b,f(a,l)},render:m,addToRenderList:g,dispose:y}}function Jg(i,t){let e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=u(null),r=s,o=!1;function a(S,I,D,H,O){let U=!1,z=h(H,D,I);r!==z&&(r=z,c(r.object)),U=p(S,H,D,O),U&&x(S,H,D,O),O!==null&&t.update(O,i.ELEMENT_ARRAY_BUFFER),(U||o)&&(o=!1,_(S,I,D,H),O!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(O).buffer))}function l(){return i.createVertexArray()}function c(S){return i.bindVertexArray(S)}function d(S){return i.deleteVertexArray(S)}function h(S,I,D){let H=D.wireframe===!0,O=n[S.id];O===void 0&&(O={},n[S.id]=O);let U=O[I.id];U===void 0&&(U={},O[I.id]=U);let z=U[H];return z===void 0&&(z=u(l()),U[H]=z),z}function u(S){let I=[],D=[],H=[];for(let O=0;O<e;O++)I[O]=0,D[O]=0,H[O]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:D,attributeDivisors:H,object:S,attributes:{},index:null}}function p(S,I,D,H){let O=r.attributes,U=I.attributes,z=0,q=D.getAttributes();for(let V in q)if(q[V].location>=0){let nt=O[V],ht=U[V];if(ht===void 0&&(V==="instanceMatrix"&&S.instanceMatrix&&(ht=S.instanceMatrix),V==="instanceColor"&&S.instanceColor&&(ht=S.instanceColor)),nt===void 0||nt.attribute!==ht||ht&&nt.data!==ht.data)return!0;z++}return r.attributesNum!==z||r.index!==H}function x(S,I,D,H){let O={},U=I.attributes,z=0,q=D.getAttributes();for(let V in q)if(q[V].location>=0){let nt=U[V];nt===void 0&&(V==="instanceMatrix"&&S.instanceMatrix&&(nt=S.instanceMatrix),V==="instanceColor"&&S.instanceColor&&(nt=S.instanceColor));let ht={};ht.attribute=nt,nt&&nt.data&&(ht.data=nt.data),O[V]=ht,z++}r.attributes=O,r.attributesNum=z,r.index=H}function m(){let S=r.newAttributes;for(let I=0,D=S.length;I<D;I++)S[I]=0}function g(S){f(S,0)}function f(S,I){let D=r.newAttributes,H=r.enabledAttributes,O=r.attributeDivisors;D[S]=1,H[S]===0&&(i.enableVertexAttribArray(S),H[S]=1),O[S]!==I&&(i.vertexAttribDivisor(S,I),O[S]=I)}function y(){let S=r.newAttributes,I=r.enabledAttributes;for(let D=0,H=I.length;D<H;D++)I[D]!==S[D]&&(i.disableVertexAttribArray(D),I[D]=0)}function b(S,I,D,H,O,U,z){z===!0?i.vertexAttribIPointer(S,I,D,O,U):i.vertexAttribPointer(S,I,D,H,O,U)}function _(S,I,D,H){m();let O=H.attributes,U=D.getAttributes(),z=I.defaultAttributeValues;for(let q in U){let V=U[q];if(V.location>=0){let rt=O[q];if(rt===void 0&&(q==="instanceMatrix"&&S.instanceMatrix&&(rt=S.instanceMatrix),q==="instanceColor"&&S.instanceColor&&(rt=S.instanceColor)),rt!==void 0){let nt=rt.normalized,ht=rt.itemSize,yt=t.get(rt);if(yt===void 0)continue;let Bt=yt.buffer,Ut=yt.type,Ot=yt.bytesPerElement,Y=Ut===i.INT||Ut===i.UNSIGNED_INT||rt.gpuType===fa;if(rt.isInterleavedBufferAttribute){let it=rt.data,bt=it.stride,Pt=rt.offset;if(it.isInstancedInterleavedBuffer){for(let wt=0;wt<V.locationSize;wt++)f(V.location+wt,it.meshPerAttribute);S.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=it.meshPerAttribute*it.count)}else for(let wt=0;wt<V.locationSize;wt++)g(V.location+wt);i.bindBuffer(i.ARRAY_BUFFER,Bt);for(let wt=0;wt<V.locationSize;wt++)b(V.location+wt,ht/V.locationSize,Ut,nt,bt*Ot,(Pt+ht/V.locationSize*wt)*Ot,Y)}else{if(rt.isInstancedBufferAttribute){for(let it=0;it<V.locationSize;it++)f(V.location+it,rt.meshPerAttribute);S.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=rt.meshPerAttribute*rt.count)}else for(let it=0;it<V.locationSize;it++)g(V.location+it);i.bindBuffer(i.ARRAY_BUFFER,Bt);for(let it=0;it<V.locationSize;it++)b(V.location+it,ht/V.locationSize,Ut,nt,ht*Ot,ht/V.locationSize*it*Ot,Y)}}else if(z!==void 0){let nt=z[q];if(nt!==void 0)switch(nt.length){case 2:i.vertexAttrib2fv(V.location,nt);break;case 3:i.vertexAttrib3fv(V.location,nt);break;case 4:i.vertexAttrib4fv(V.location,nt);break;default:i.vertexAttrib1fv(V.location,nt)}}}}y()}function E(){L();for(let S in n){let I=n[S];for(let D in I){let H=I[D];for(let O in H)d(H[O].object),delete H[O];delete I[D]}delete n[S]}}function A(S){if(n[S.id]===void 0)return;let I=n[S.id];for(let D in I){let H=I[D];for(let O in H)d(H[O].object),delete H[O];delete I[D]}delete n[S.id]}function P(S){for(let I in n){let D=n[I];if(D[S.id]===void 0)continue;let H=D[S.id];for(let O in H)d(H[O].object),delete H[O];delete D[S.id]}}function L(){w(),o=!0,r!==s&&(r=s,c(r.object))}function w(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:L,resetDefaultState:w,dispose:E,releaseStatesOfGeometry:A,releaseStatesOfProgram:P,initAttributes:m,enableAttribute:g,disableUnusedAttributes:y}}function Qg(i,t,e){let n;function s(c){n=c}function r(c,d){i.drawArrays(n,c,d),e.update(d,n,1)}function o(c,d,h){h!==0&&(i.drawArraysInstanced(n,c,d,h),e.update(d,n,h))}function a(c,d,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,d,0,h);let p=0;for(let x=0;x<h;x++)p+=d[x];e.update(p,n,1)}function l(c,d,h,u){if(h===0)return;let p=t.get("WEBGL_multi_draw");if(p===null)for(let x=0;x<c.length;x++)o(c[x],d[x],u[x]);else{p.multiDrawArraysInstancedWEBGL(n,c,0,d,0,u,0,h);let x=0;for(let m=0;m<h;m++)x+=d[m]*u[m];e.update(x,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function t0(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let P=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(P){return!(P!==ln&&n.convert(P)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(P){let L=P===Es&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(P!==yn&&n.convert(P)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&P!==Cn&&!L)}function l(P){if(P==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp",d=l(c);d!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",d,"instead."),c=d);let h=e.logarithmicDepthBuffer===!0,u=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),m=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),f=i.getParameter(i.MAX_VERTEX_ATTRIBS),y=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),b=i.getParameter(i.MAX_VARYING_VECTORS),_=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),E=x>0,A=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:h,reversedDepthBuffer:u,maxTextures:p,maxVertexTextures:x,maxTextureSize:m,maxCubemapSize:g,maxAttributes:f,maxVertexUniforms:y,maxVaryings:b,maxFragmentUniforms:_,vertexTextures:E,maxSamples:A}}function e0(i){let t=this,e=null,n=0,s=!1,r=!1,o=new nn,a=new Gt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,u){let p=h.length!==0||u||n!==0||s;return s=u,n=h.length,p},this.beginShadows=function(){r=!0,d(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,u){e=d(h,u,0)},this.setState=function(h,u,p){let x=h.clippingPlanes,m=h.clipIntersection,g=h.clipShadows,f=i.get(h);if(!s||x===null||x.length===0||r&&!g)r?d(null):c();else{let y=r?0:n,b=y*4,_=f.clippingState||null;l.value=_,_=d(x,u,b,p);for(let E=0;E!==b;++E)_[E]=e[E];f.clippingState=_,this.numIntersection=m?this.numPlanes:0,this.numPlanes+=y}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function d(h,u,p,x){let m=h!==null?h.length:0,g=null;if(m!==0){if(g=l.value,x!==!0||g===null){let f=p+m*4,y=u.matrixWorldInverse;a.getNormalMatrix(y),(g===null||g.length<f)&&(g=new Float32Array(f));for(let b=0,_=p;b!==m;++b,_+=4)o.copy(h[b]).applyMatrix4(y,a),o.normal.toArray(g,_),g[_+3]=o.constant}l.value=g,l.needsUpdate=!0}return t.numPlanes=m,t.numIntersection=0,g}}function n0(i){let t=new WeakMap;function e(o,a){return a===ha?o.mapping=Ri:a===da&&(o.mapping=Ci),o}function n(o){if(o&&o.isTexture){let a=o.mapping;if(a===ha||a===da)if(t.has(o)){let l=t.get(o).texture;return e(l,o.mapping)}else{let l=o.image;if(l&&l.height>0){let c=new Do(l.height);return c.fromEquirectangularTexture(i,o),t.set(o,c),o.addEventListener("dispose",s),e(c.texture,o.mapping)}else return null}}return o}function s(o){let a=o.target;a.removeEventListener("dispose",s);let l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}var Cs=4,Ud=[.125,.215,.35,.446,.526,.582],Ui=20,Tc=new Pr,Fd=new kt,Ac=null,Rc=0,Cc=0,Pc=!1,Ni=(1+Math.sqrt(5))/2,Rs=1/Ni,Od=[new R(-Ni,Rs,0),new R(Ni,Rs,0),new R(-Rs,0,Ni),new R(Rs,0,Ni),new R(0,Ni,-Rs),new R(0,Ni,Rs),new R(-1,1,-1),new R(1,1,-1),new R(-1,1,1),new R(1,1,1)],i0=new R,ja=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100,r={}){let{size:o=256,position:a=i0}=r;Ac=this._renderer.getRenderTarget(),Rc=this._renderer.getActiveCubeFace(),Cc=this._renderer.getActiveMipmapLevel(),Pc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,n,s,l,a),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Hd(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Bd(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Ac,Rc,Cc),this._renderer.xr.enabled=Pc,t.scissorTest=!1,Ya(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Ri||t.mapping===Ci?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Ac=this._renderer.getRenderTarget(),Rc=this._renderer.getActiveCubeFace(),Cc=this._renderer.getActiveMipmapLevel(),Pc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:xn,minFilter:xn,generateMipmaps:!1,type:Es,format:ln,colorSpace:vi,depthBuffer:!1},s=kd(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=kd(t,e,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=s0(r)),this._blurMaterial=r0(r,t,e)}return s}_compileMaterial(t){let e=new fe(this._lodPlanes[0],t);this._renderer.compile(e,Tc)}_sceneToCubeUV(t,e,n,s,r){let l=new Ee(90,1,e,n),c=[1,-1,1,1,1,1],d=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,p=h.toneMapping;h.getClearColor(Fd),h.toneMapping=Gn,h.autoClear=!1,h.state.buffers.depth.getReversed()&&(h.setRenderTarget(s),h.clearDepth(),h.setRenderTarget(null));let m=new yi({name:"PMREM.Background",side:ze,depthWrite:!1,depthTest:!1}),g=new fe(new Ge,m),f=!1,y=t.background;y?y.isColor&&(m.color.copy(y),t.background=null,f=!0):(m.color.copy(Fd),f=!0);for(let b=0;b<6;b++){let _=b%3;_===0?(l.up.set(0,c[b],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+d[b],r.y,r.z)):_===1?(l.up.set(0,0,c[b]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+d[b],r.z)):(l.up.set(0,c[b],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+d[b]));let E=this._cubeSize;Ya(s,_*E,b>2?E:0,E,E),h.setRenderTarget(s),f&&h.render(g,l),h.render(t,l)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=p,h.autoClear=u,t.background=y}_textureToCubeUV(t,e){let n=this._renderer,s=t.mapping===Ri||t.mapping===Ci;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Hd()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Bd());let r=s?this._cubemapMaterial:this._equirectMaterial,o=new fe(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;let l=this._cubeSize;Ya(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(o,Tc)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;let s=this._lodPlanes.length;for(let r=1;r<s;r++){let o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Od[(s-r-1)%Od.length];this._blur(t,r-1,r,o,a)}e.autoClear=n}_blur(t,e,n,s,r){let o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,s,"latitudinal",r),this._halfBlur(o,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,o,a){let l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let d=3,h=new fe(this._lodPlanes[s],c),u=c.uniforms,p=this._sizeLods[n]-1,x=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*Ui-1),m=r/x,g=isFinite(r)?1+Math.floor(d*m):Ui;g>Ui&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Ui}`);let f=[],y=0;for(let P=0;P<Ui;++P){let L=P/m,w=Math.exp(-L*L/2);f.push(w),P===0?y+=w:P<g&&(y+=2*w)}for(let P=0;P<f.length;P++)f[P]=f[P]/y;u.envMap.value=t.texture,u.samples.value=g,u.weights.value=f,u.latitudinal.value=o==="latitudinal",a&&(u.poleAxis.value=a);let{_lodMax:b}=this;u.dTheta.value=x,u.mipInt.value=b-n;let _=this._sizeLods[s],E=3*_*(s>b-Cs?s-b+Cs:0),A=4*(this._cubeSize-_);Ya(e,E,A,3*_,2*_),l.setRenderTarget(e),l.render(h,Tc)}};function s0(i){let t=[],e=[],n=[],s=i,r=i-Cs+1+Ud.length;for(let o=0;o<r;o++){let a=Math.pow(2,s);e.push(a);let l=1/a;o>i-Cs?l=Ud[o-i+Cs-1]:o===0&&(l=0),n.push(l);let c=1/(a-2),d=-c,h=1+c,u=[d,d,h,d,h,h,d,d,h,h,d,h],p=6,x=6,m=3,g=2,f=1,y=new Float32Array(m*x*p),b=new Float32Array(g*x*p),_=new Float32Array(f*x*p);for(let A=0;A<p;A++){let P=A%3*2/3-1,L=A>2?0:-1,w=[P,L,0,P+2/3,L,0,P+2/3,L+1,0,P,L,0,P+2/3,L+1,0,P,L+1,0];y.set(w,m*x*A),b.set(u,g*x*A);let S=[A,A,A,A,A,A];_.set(S,f*x*A)}let E=new Te;E.setAttribute("position",new Ue(y,m)),E.setAttribute("uv",new Ue(b,g)),E.setAttribute("faceIndex",new Ue(_,f)),t.push(E),s>Cs&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function kd(i,t,e){let n=new Tn(i,t,e);return n.texture.mapping=Nr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Ya(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function r0(i,t,e){let n=new Float32Array(Ui),s=new R(0,1,0);return new vn({name:"SphericalGaussianBlur",defines:{n:Ui,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Hc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Vn,depthTest:!1,depthWrite:!1})}function Bd(){return new vn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Hc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Vn,depthTest:!1,depthWrite:!1})}function Hd(){return new vn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Hc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Vn,depthTest:!1,depthWrite:!1})}function Hc(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function o0(i){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){let l=a.mapping,c=l===ha||l===da,d=l===Ri||l===Ci;if(c||d){let h=t.get(a),u=h!==void 0?h.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==u)return e===null&&(e=new ja(i)),h=c?e.fromEquirectangular(a,h):e.fromCubemap(a,h),h.texture.pmremVersion=a.pmremVersion,t.set(a,h),h.texture;if(h!==void 0)return h.texture;{let p=a.image;return c&&p&&p.height>0||d&&p&&s(p)?(e===null&&(e=new ja(i)),h=c?e.fromEquirectangular(a):e.fromCubemap(a),h.texture.pmremVersion=a.pmremVersion,t.set(a,h),a.addEventListener("dispose",r),h.texture):null}}}return a}function s(a){let l=0,c=6;for(let d=0;d<c;d++)a[d]!==void 0&&l++;return l===c}function r(a){let l=a.target;l.removeEventListener("dispose",r);let c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function a0(i){let t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let s=e(n);return s===null&&ds("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function l0(i,t,e,n){let s={},r=new WeakMap;function o(h){let u=h.target;u.index!==null&&t.remove(u.index);for(let x in u.attributes)t.remove(u.attributes[x]);u.removeEventListener("dispose",o),delete s[u.id];let p=r.get(u);p&&(t.remove(p),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,e.memory.geometries--}function a(h,u){return s[u.id]===!0||(u.addEventListener("dispose",o),s[u.id]=!0,e.memory.geometries++),u}function l(h){let u=h.attributes;for(let p in u)t.update(u[p],i.ARRAY_BUFFER)}function c(h){let u=[],p=h.index,x=h.attributes.position,m=0;if(p!==null){let y=p.array;m=p.version;for(let b=0,_=y.length;b<_;b+=3){let E=y[b+0],A=y[b+1],P=y[b+2];u.push(E,A,A,P,P,E)}}else if(x!==void 0){let y=x.array;m=x.version;for(let b=0,_=y.length/3-1;b<_;b+=3){let E=b+0,A=b+1,P=b+2;u.push(E,A,A,P,P,E)}}else return;let g=new(yc(u)?ar:or)(u,1);g.version=m;let f=r.get(h);f&&t.remove(f),r.set(h,g)}function d(h){let u=r.get(h);if(u){let p=h.index;p!==null&&u.version<p.version&&c(h)}else c(h);return r.get(h)}return{get:a,update:l,getWireframeAttribute:d}}function c0(i,t,e){let n;function s(u){n=u}let r,o;function a(u){r=u.type,o=u.bytesPerElement}function l(u,p){i.drawElements(n,p,r,u*o),e.update(p,n,1)}function c(u,p,x){x!==0&&(i.drawElementsInstanced(n,p,r,u*o,x),e.update(p,n,x))}function d(u,p,x){if(x===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,p,0,r,u,0,x);let g=0;for(let f=0;f<x;f++)g+=p[f];e.update(g,n,1)}function h(u,p,x,m){if(x===0)return;let g=t.get("WEBGL_multi_draw");if(g===null)for(let f=0;f<u.length;f++)c(u[f]/o,p[f],m[f]);else{g.multiDrawElementsInstancedWEBGL(n,p,0,r,u,0,m,0,x);let f=0;for(let y=0;y<x;y++)f+=p[y]*m[y];e.update(f,n,1)}}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=d,this.renderMultiDrawInstances=h}function h0(i){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function d0(i,t,e){let n=new WeakMap,s=new ne;function r(o,a,l){let c=o.morphTargetInfluences,d=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=d!==void 0?d.length:0,u=n.get(a);if(u===void 0||u.count!==h){let w=function(){P.dispose(),n.delete(a),a.removeEventListener("dispose",w)};u!==void 0&&u.texture.dispose();let p=a.morphAttributes.position!==void 0,x=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,g=a.morphAttributes.position||[],f=a.morphAttributes.normal||[],y=a.morphAttributes.color||[],b=0;p===!0&&(b=1),x===!0&&(b=2),m===!0&&(b=3);let _=a.attributes.position.count*b,E=1;_>t.maxTextureSize&&(E=Math.ceil(_/t.maxTextureSize),_=t.maxTextureSize);let A=new Float32Array(_*E*4*h),P=new rr(A,_,E,h);P.type=Cn,P.needsUpdate=!0;let L=b*4;for(let S=0;S<h;S++){let I=g[S],D=f[S],H=y[S],O=_*E*4*S;for(let U=0;U<I.count;U++){let z=U*L;p===!0&&(s.fromBufferAttribute(I,U),A[O+z+0]=s.x,A[O+z+1]=s.y,A[O+z+2]=s.z,A[O+z+3]=0),x===!0&&(s.fromBufferAttribute(D,U),A[O+z+4]=s.x,A[O+z+5]=s.y,A[O+z+6]=s.z,A[O+z+7]=0),m===!0&&(s.fromBufferAttribute(H,U),A[O+z+8]=s.x,A[O+z+9]=s.y,A[O+z+10]=s.z,A[O+z+11]=H.itemSize===4?s.w:1)}}u={count:h,texture:P,size:new K(_,E)},n.set(a,u),a.addEventListener("dispose",w)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let p=0;for(let m=0;m<c.length;m++)p+=c[m];let x=a.morphTargetsRelative?1:1-p;l.getUniforms().setValue(i,"morphTargetBaseInfluence",x),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",u.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",u.size)}return{update:r}}function u0(i,t,e,n){let s=new WeakMap;function r(l){let c=n.render.frame,d=l.geometry,h=t.get(l,d);if(s.get(h)!==c&&(t.update(h),s.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),s.get(l)!==c&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){let u=l.skeleton;s.get(u)!==c&&(u.update(),s.set(u,c))}return h}function o(){s=new WeakMap}function a(l){let c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:o}}var ru=new He,zd=new fr(1,1),ou=new rr,au=new Io,lu=new cr,Vd=[],Gd=[],Wd=new Float32Array(16),$d=new Float32Array(9),Xd=new Float32Array(4);function Ls(i,t,e){let n=i[0];if(n<=0||n>0)return i;let s=t*e,r=Vd[s];if(r===void 0&&(r=new Float32Array(s),Vd[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function Ae(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Re(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Ka(i,t){let e=Gd[t];e===void 0&&(e=new Int32Array(t),Gd[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function f0(i,t){let e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function p0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ae(e,t))return;i.uniform2fv(this.addr,t),Re(e,t)}}function m0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ae(e,t))return;i.uniform3fv(this.addr,t),Re(e,t)}}function g0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ae(e,t))return;i.uniform4fv(this.addr,t),Re(e,t)}}function x0(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ae(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Re(e,t)}else{if(Ae(e,n))return;Xd.set(n),i.uniformMatrix2fv(this.addr,!1,Xd),Re(e,n)}}function _0(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ae(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Re(e,t)}else{if(Ae(e,n))return;$d.set(n),i.uniformMatrix3fv(this.addr,!1,$d),Re(e,n)}}function v0(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ae(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Re(e,t)}else{if(Ae(e,n))return;Wd.set(n),i.uniformMatrix4fv(this.addr,!1,Wd),Re(e,n)}}function y0(i,t){let e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function b0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ae(e,t))return;i.uniform2iv(this.addr,t),Re(e,t)}}function M0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ae(e,t))return;i.uniform3iv(this.addr,t),Re(e,t)}}function S0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ae(e,t))return;i.uniform4iv(this.addr,t),Re(e,t)}}function w0(i,t){let e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function E0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ae(e,t))return;i.uniform2uiv(this.addr,t),Re(e,t)}}function T0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ae(e,t))return;i.uniform3uiv(this.addr,t),Re(e,t)}}function A0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ae(e,t))return;i.uniform4uiv(this.addr,t),Re(e,t)}}function R0(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(zd.compareFunction=xc,r=zd):r=ru,e.setTexture2D(t||r,s)}function C0(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||au,s)}function P0(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||lu,s)}function I0(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||ou,s)}function L0(i){switch(i){case 5126:return f0;case 35664:return p0;case 35665:return m0;case 35666:return g0;case 35674:return x0;case 35675:return _0;case 35676:return v0;case 5124:case 35670:return y0;case 35667:case 35671:return b0;case 35668:case 35672:return M0;case 35669:case 35673:return S0;case 5125:return w0;case 36294:return E0;case 36295:return T0;case 36296:return A0;case 35678:case 36198:case 36298:case 36306:case 35682:return R0;case 35679:case 36299:case 36307:return C0;case 35680:case 36300:case 36308:case 36293:return P0;case 36289:case 36303:case 36311:case 36292:return I0}}function D0(i,t){i.uniform1fv(this.addr,t)}function N0(i,t){let e=Ls(t,this.size,2);i.uniform2fv(this.addr,e)}function U0(i,t){let e=Ls(t,this.size,3);i.uniform3fv(this.addr,e)}function F0(i,t){let e=Ls(t,this.size,4);i.uniform4fv(this.addr,e)}function O0(i,t){let e=Ls(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function k0(i,t){let e=Ls(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function B0(i,t){let e=Ls(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function H0(i,t){i.uniform1iv(this.addr,t)}function z0(i,t){i.uniform2iv(this.addr,t)}function V0(i,t){i.uniform3iv(this.addr,t)}function G0(i,t){i.uniform4iv(this.addr,t)}function W0(i,t){i.uniform1uiv(this.addr,t)}function $0(i,t){i.uniform2uiv(this.addr,t)}function X0(i,t){i.uniform3uiv(this.addr,t)}function q0(i,t){i.uniform4uiv(this.addr,t)}function Y0(i,t,e){let n=this.cache,s=t.length,r=Ka(e,s);Ae(n,r)||(i.uniform1iv(this.addr,r),Re(n,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||ru,r[o])}function Z0(i,t,e){let n=this.cache,s=t.length,r=Ka(e,s);Ae(n,r)||(i.uniform1iv(this.addr,r),Re(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||au,r[o])}function j0(i,t,e){let n=this.cache,s=t.length,r=Ka(e,s);Ae(n,r)||(i.uniform1iv(this.addr,r),Re(n,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||lu,r[o])}function K0(i,t,e){let n=this.cache,s=t.length,r=Ka(e,s);Ae(n,r)||(i.uniform1iv(this.addr,r),Re(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||ou,r[o])}function J0(i){switch(i){case 5126:return D0;case 35664:return N0;case 35665:return U0;case 35666:return F0;case 35674:return O0;case 35675:return k0;case 35676:return B0;case 5124:case 35670:return H0;case 35667:case 35671:return z0;case 35668:case 35672:return V0;case 35669:case 35673:return G0;case 5125:return W0;case 36294:return $0;case 36295:return X0;case 36296:return q0;case 35678:case 36198:case 36298:case 36306:case 35682:return Y0;case 35679:case 36299:case 36307:return Z0;case 35680:case 36300:case 36308:case 36293:return j0;case 36289:case 36303:case 36311:case 36292:return K0}}var Lc=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=L0(e.type)}},Dc=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=J0(e.type)}},Nc=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(t,e[a.id],n)}}},Ic=/(\w+)(\])?(\[|\.)?/g;function qd(i,t){i.seq.push(t),i.map[t.id]=t}function Q0(i,t,e){let n=i.name,s=n.length;for(Ic.lastIndex=0;;){let r=Ic.exec(n),o=Ic.lastIndex,a=r[1],l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){qd(e,c===void 0?new Lc(a,i,t):new Dc(a,i,t));break}else{let h=e.map[a];h===void 0&&(h=new Nc(a),qd(e,h)),e=h}}}var Ps=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){let r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);Q0(r,o,this)}}setValue(t,e,n,s){let r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){let s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){let a=e[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,s)}}static seqWithValue(t,e){let n=[];for(let s=0,r=t.length;s!==r;++s){let o=t[s];o.id in e&&n.push(o)}return n}};function Yd(i,t,e){let n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}var tx=37297,ex=0;function nx(i,t){let e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){let a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}var Zd=new Gt;function ix(i){jt._getMatrix(Zd,jt.workingColorSpace,i);let t=`mat3( ${Zd.elements.map(e=>e.toFixed(4))} )`;switch(jt.getTransfer(i)){case ir:return[t,"LinearTransferOETF"];case ie:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function jd(i,t,e){let n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";let o=/ERROR: 0:(\d+)/.exec(r);if(o){let a=parseInt(o[1]);return e.toUpperCase()+`

`+r+`

`+nx(i.getShaderSource(t),a)}else return r}function sx(i,t){let e=ix(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function rx(i,t){let e;switch(t){case ad:e="Linear";break;case ld:e="Reinhard";break;case cd:e="Cineon";break;case hd:e="ACESFilmic";break;case ud:e="AgX";break;case fd:e="Neutral";break;case dd:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var Za=new R;function ox(){jt.getLuminanceCoefficients(Za);let i=Za.x.toFixed(4),t=Za.y.toFixed(4),e=Za.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function ax(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Hr).join(`
`)}function lx(i){let t=[];for(let e in i){let n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function cx(i,t){let e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(t,s),o=r.name,a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function Hr(i){return i!==""}function Kd(i,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Jd(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var hx=/^[ \t]*#include +<([\w\d./]+)>/gm;function Uc(i){return i.replace(hx,ux)}var dx=new Map;function ux(i,t){let e=Xt[t];if(e===void 0){let n=dx.get(t);if(n!==void 0)e=Xt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Uc(e)}var fx=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Qd(i){return i.replace(fx,px)}function px(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function tu(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function mx(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===ic?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===Hh?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Rn&&(t="SHADOWMAP_TYPE_VSM"),t}function gx(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Ri:case Ci:t="ENVMAP_TYPE_CUBE";break;case Nr:t="ENVMAP_TYPE_CUBE_UV";break}return t}function xx(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Ci:t="ENVMAP_MODE_REFRACTION";break}return t}function _x(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case oc:t="ENVMAP_BLENDING_MULTIPLY";break;case rd:t="ENVMAP_BLENDING_MIX";break;case od:t="ENVMAP_BLENDING_ADD";break}return t}function vx(i){let t=i.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function yx(i,t,e,n){let s=i.getContext(),r=e.defines,o=e.vertexShader,a=e.fragmentShader,l=mx(e),c=gx(e),d=xx(e),h=_x(e),u=vx(e),p=ax(e),x=lx(r),m=s.createProgram(),g,f,y=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x].filter(Hr).join(`
`),g.length>0&&(g+=`
`),f=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x].filter(Hr).join(`
`),f.length>0&&(f+=`
`)):(g=[tu(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+d:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Hr).join(`
`),f=[tu(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+d:"",e.envMap?"#define "+h:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Gn?"#define TONE_MAPPING":"",e.toneMapping!==Gn?Xt.tonemapping_pars_fragment:"",e.toneMapping!==Gn?rx("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Xt.colorspace_pars_fragment,sx("linearToOutputTexel",e.outputColorSpace),ox(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Hr).join(`
`)),o=Uc(o),o=Kd(o,e),o=Jd(o,e),a=Uc(a),a=Kd(a,e),a=Jd(a,e),o=Qd(o),a=Qd(a),e.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,g=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,f=["#define varying in",e.glslVersion===_c?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===_c?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);let b=y+g+o,_=y+f+a,E=Yd(s,s.VERTEX_SHADER,b),A=Yd(s,s.FRAGMENT_SHADER,_);s.attachShader(m,E),s.attachShader(m,A),e.index0AttributeName!==void 0?s.bindAttribLocation(m,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(m,0,"position"),s.linkProgram(m);function P(I){if(i.debug.checkShaderErrors){let D=s.getProgramInfoLog(m)||"",H=s.getShaderInfoLog(E)||"",O=s.getShaderInfoLog(A)||"",U=D.trim(),z=H.trim(),q=O.trim(),V=!0,rt=!0;if(s.getProgramParameter(m,s.LINK_STATUS)===!1)if(V=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,m,E,A);else{let nt=jd(s,E,"vertex"),ht=jd(s,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(m,s.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+U+`
`+nt+`
`+ht)}else U!==""?console.warn("THREE.WebGLProgram: Program Info Log:",U):(z===""||q==="")&&(rt=!1);rt&&(I.diagnostics={runnable:V,programLog:U,vertexShader:{log:z,prefix:g},fragmentShader:{log:q,prefix:f}})}s.deleteShader(E),s.deleteShader(A),L=new Ps(s,m),w=cx(s,m)}let L;this.getUniforms=function(){return L===void 0&&P(this),L};let w;this.getAttributes=function(){return w===void 0&&P(this),w};let S=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return S===!1&&(S=s.getProgramParameter(m,tx)),S},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(m),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=ex++,this.cacheKey=t,this.usedTimes=1,this.program=m,this.vertexShader=E,this.fragmentShader=A,this}var bx=0,Fc=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new Oc(t),e.set(t,n)),n}},Oc=class{constructor(t){this.id=bx++,this.code=t,this.usedTimes=0}};function Mx(i,t,e,n,s,r,o){let a=new fs,l=new Fc,c=new Set,d=[],h=s.logarithmicDepthBuffer,u=s.vertexTextures,p=s.precision,x={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(w){return c.add(w),w===0?"uv":`uv${w}`}function g(w,S,I,D,H){let O=D.fog,U=H.geometry,z=w.isMeshStandardMaterial?D.environment:null,q=(w.isMeshStandardMaterial?e:t).get(w.envMap||z),V=q&&q.mapping===Nr?q.image.height:null,rt=x[w.type];w.precision!==null&&(p=s.getMaxPrecision(w.precision),p!==w.precision&&console.warn("THREE.WebGLProgram.getParameters:",w.precision,"not supported, using",p,"instead."));let nt=U.morphAttributes.position||U.morphAttributes.normal||U.morphAttributes.color,ht=nt!==void 0?nt.length:0,yt=0;U.morphAttributes.position!==void 0&&(yt=1),U.morphAttributes.normal!==void 0&&(yt=2),U.morphAttributes.color!==void 0&&(yt=3);let Bt,Ut,Ot,Y;if(rt){let te=Pn[rt];Bt=te.vertexShader,Ut=te.fragmentShader}else Bt=w.vertexShader,Ut=w.fragmentShader,l.update(w),Ot=l.getVertexShaderID(w),Y=l.getFragmentShaderID(w);let it=i.getRenderTarget(),bt=i.state.buffers.depth.getReversed(),Pt=H.isInstancedMesh===!0,wt=H.isBatchedMesh===!0,Yt=!!w.map,le=!!w.matcap,C=!!q,et=!!w.aoMap,J=!!w.lightMap,j=!!w.bumpMap,Z=!!w.normalMap,ut=!!w.displacementMap,st=!!w.emissiveMap,ft=!!w.metalnessMap,zt=!!w.roughnessMap,Ht=w.anisotropy>0,T=w.clearcoat>0,v=w.dispersion>0,B=w.iridescence>0,$=w.sheen>0,tt=w.transmission>0,X=Ht&&!!w.anisotropyMap,Rt=T&&!!w.clearcoatMap,dt=T&&!!w.clearcoatNormalMap,Et=T&&!!w.clearcoatRoughnessMap,Tt=B&&!!w.iridescenceMap,ot=B&&!!w.iridescenceThicknessMap,_t=$&&!!w.sheenColorMap,Nt=$&&!!w.sheenRoughnessMap,Ct=!!w.specularMap,gt=!!w.specularColorMap,Wt=!!w.specularIntensityMap,N=tt&&!!w.transmissionMap,ct=tt&&!!w.thicknessMap,pt=!!w.gradientMap,Mt=!!w.alphaMap,at=w.alphaTest>0,Q=!!w.alphaHash,At=!!w.extensions,Vt=Gn;w.toneMapped&&(it===null||it.isXRRenderTarget===!0)&&(Vt=i.toneMapping);let ce={shaderID:rt,shaderType:w.type,shaderName:w.name,vertexShader:Bt,fragmentShader:Ut,defines:w.defines,customVertexShaderID:Ot,customFragmentShaderID:Y,isRawShaderMaterial:w.isRawShaderMaterial===!0,glslVersion:w.glslVersion,precision:p,batching:wt,batchingColor:wt&&H._colorsTexture!==null,instancing:Pt,instancingColor:Pt&&H.instanceColor!==null,instancingMorph:Pt&&H.morphTexture!==null,supportsVertexTextures:u,outputColorSpace:it===null?i.outputColorSpace:it.isXRRenderTarget===!0?it.texture.colorSpace:vi,alphaToCoverage:!!w.alphaToCoverage,map:Yt,matcap:le,envMap:C,envMapMode:C&&q.mapping,envMapCubeUVHeight:V,aoMap:et,lightMap:J,bumpMap:j,normalMap:Z,displacementMap:u&&ut,emissiveMap:st,normalMapObjectSpace:Z&&w.normalMapType===xd,normalMapTangentSpace:Z&&w.normalMapType===gc,metalnessMap:ft,roughnessMap:zt,anisotropy:Ht,anisotropyMap:X,clearcoat:T,clearcoatMap:Rt,clearcoatNormalMap:dt,clearcoatRoughnessMap:Et,dispersion:v,iridescence:B,iridescenceMap:Tt,iridescenceThicknessMap:ot,sheen:$,sheenColorMap:_t,sheenRoughnessMap:Nt,specularMap:Ct,specularColorMap:gt,specularIntensityMap:Wt,transmission:tt,transmissionMap:N,thicknessMap:ct,gradientMap:pt,opaque:w.transparent===!1&&w.blending===xi&&w.alphaToCoverage===!1,alphaMap:Mt,alphaTest:at,alphaHash:Q,combine:w.combine,mapUv:Yt&&m(w.map.channel),aoMapUv:et&&m(w.aoMap.channel),lightMapUv:J&&m(w.lightMap.channel),bumpMapUv:j&&m(w.bumpMap.channel),normalMapUv:Z&&m(w.normalMap.channel),displacementMapUv:ut&&m(w.displacementMap.channel),emissiveMapUv:st&&m(w.emissiveMap.channel),metalnessMapUv:ft&&m(w.metalnessMap.channel),roughnessMapUv:zt&&m(w.roughnessMap.channel),anisotropyMapUv:X&&m(w.anisotropyMap.channel),clearcoatMapUv:Rt&&m(w.clearcoatMap.channel),clearcoatNormalMapUv:dt&&m(w.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Et&&m(w.clearcoatRoughnessMap.channel),iridescenceMapUv:Tt&&m(w.iridescenceMap.channel),iridescenceThicknessMapUv:ot&&m(w.iridescenceThicknessMap.channel),sheenColorMapUv:_t&&m(w.sheenColorMap.channel),sheenRoughnessMapUv:Nt&&m(w.sheenRoughnessMap.channel),specularMapUv:Ct&&m(w.specularMap.channel),specularColorMapUv:gt&&m(w.specularColorMap.channel),specularIntensityMapUv:Wt&&m(w.specularIntensityMap.channel),transmissionMapUv:N&&m(w.transmissionMap.channel),thicknessMapUv:ct&&m(w.thicknessMap.channel),alphaMapUv:Mt&&m(w.alphaMap.channel),vertexTangents:!!U.attributes.tangent&&(Z||Ht),vertexColors:w.vertexColors,vertexAlphas:w.vertexColors===!0&&!!U.attributes.color&&U.attributes.color.itemSize===4,pointsUvs:H.isPoints===!0&&!!U.attributes.uv&&(Yt||Mt),fog:!!O,useFog:w.fog===!0,fogExp2:!!O&&O.isFogExp2,flatShading:w.flatShading===!0&&w.wireframe===!1,sizeAttenuation:w.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:bt,skinning:H.isSkinnedMesh===!0,morphTargets:U.morphAttributes.position!==void 0,morphNormals:U.morphAttributes.normal!==void 0,morphColors:U.morphAttributes.color!==void 0,morphTargetsCount:ht,morphTextureStride:yt,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:w.dithering,shadowMapEnabled:i.shadowMap.enabled&&I.length>0,shadowMapType:i.shadowMap.type,toneMapping:Vt,decodeVideoTexture:Yt&&w.map.isVideoTexture===!0&&jt.getTransfer(w.map.colorSpace)===ie,decodeVideoTextureEmissive:st&&w.emissiveMap.isVideoTexture===!0&&jt.getTransfer(w.emissiveMap.colorSpace)===ie,premultipliedAlpha:w.premultipliedAlpha,doubleSided:w.side===an,flipSided:w.side===ze,useDepthPacking:w.depthPacking>=0,depthPacking:w.depthPacking||0,index0AttributeName:w.index0AttributeName,extensionClipCullDistance:At&&w.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(At&&w.extensions.multiDraw===!0||wt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:w.customProgramCacheKey()};return ce.vertexUv1s=c.has(1),ce.vertexUv2s=c.has(2),ce.vertexUv3s=c.has(3),c.clear(),ce}function f(w){let S=[];if(w.shaderID?S.push(w.shaderID):(S.push(w.customVertexShaderID),S.push(w.customFragmentShaderID)),w.defines!==void 0)for(let I in w.defines)S.push(I),S.push(w.defines[I]);return w.isRawShaderMaterial===!1&&(y(S,w),b(S,w),S.push(i.outputColorSpace)),S.push(w.customProgramCacheKey),S.join()}function y(w,S){w.push(S.precision),w.push(S.outputColorSpace),w.push(S.envMapMode),w.push(S.envMapCubeUVHeight),w.push(S.mapUv),w.push(S.alphaMapUv),w.push(S.lightMapUv),w.push(S.aoMapUv),w.push(S.bumpMapUv),w.push(S.normalMapUv),w.push(S.displacementMapUv),w.push(S.emissiveMapUv),w.push(S.metalnessMapUv),w.push(S.roughnessMapUv),w.push(S.anisotropyMapUv),w.push(S.clearcoatMapUv),w.push(S.clearcoatNormalMapUv),w.push(S.clearcoatRoughnessMapUv),w.push(S.iridescenceMapUv),w.push(S.iridescenceThicknessMapUv),w.push(S.sheenColorMapUv),w.push(S.sheenRoughnessMapUv),w.push(S.specularMapUv),w.push(S.specularColorMapUv),w.push(S.specularIntensityMapUv),w.push(S.transmissionMapUv),w.push(S.thicknessMapUv),w.push(S.combine),w.push(S.fogExp2),w.push(S.sizeAttenuation),w.push(S.morphTargetsCount),w.push(S.morphAttributeCount),w.push(S.numDirLights),w.push(S.numPointLights),w.push(S.numSpotLights),w.push(S.numSpotLightMaps),w.push(S.numHemiLights),w.push(S.numRectAreaLights),w.push(S.numDirLightShadows),w.push(S.numPointLightShadows),w.push(S.numSpotLightShadows),w.push(S.numSpotLightShadowsWithMaps),w.push(S.numLightProbes),w.push(S.shadowMapType),w.push(S.toneMapping),w.push(S.numClippingPlanes),w.push(S.numClipIntersection),w.push(S.depthPacking)}function b(w,S){a.disableAll(),S.supportsVertexTextures&&a.enable(0),S.instancing&&a.enable(1),S.instancingColor&&a.enable(2),S.instancingMorph&&a.enable(3),S.matcap&&a.enable(4),S.envMap&&a.enable(5),S.normalMapObjectSpace&&a.enable(6),S.normalMapTangentSpace&&a.enable(7),S.clearcoat&&a.enable(8),S.iridescence&&a.enable(9),S.alphaTest&&a.enable(10),S.vertexColors&&a.enable(11),S.vertexAlphas&&a.enable(12),S.vertexUv1s&&a.enable(13),S.vertexUv2s&&a.enable(14),S.vertexUv3s&&a.enable(15),S.vertexTangents&&a.enable(16),S.anisotropy&&a.enable(17),S.alphaHash&&a.enable(18),S.batching&&a.enable(19),S.dispersion&&a.enable(20),S.batchingColor&&a.enable(21),S.gradientMap&&a.enable(22),w.push(a.mask),a.disableAll(),S.fog&&a.enable(0),S.useFog&&a.enable(1),S.flatShading&&a.enable(2),S.logarithmicDepthBuffer&&a.enable(3),S.reversedDepthBuffer&&a.enable(4),S.skinning&&a.enable(5),S.morphTargets&&a.enable(6),S.morphNormals&&a.enable(7),S.morphColors&&a.enable(8),S.premultipliedAlpha&&a.enable(9),S.shadowMapEnabled&&a.enable(10),S.doubleSided&&a.enable(11),S.flipSided&&a.enable(12),S.useDepthPacking&&a.enable(13),S.dithering&&a.enable(14),S.transmission&&a.enable(15),S.sheen&&a.enable(16),S.opaque&&a.enable(17),S.pointsUvs&&a.enable(18),S.decodeVideoTexture&&a.enable(19),S.decodeVideoTextureEmissive&&a.enable(20),S.alphaToCoverage&&a.enable(21),w.push(a.mask)}function _(w){let S=x[w.type],I;if(S){let D=Pn[S];I=Rd.clone(D.uniforms)}else I=w.uniforms;return I}function E(w,S){let I;for(let D=0,H=d.length;D<H;D++){let O=d[D];if(O.cacheKey===S){I=O,++I.usedTimes;break}}return I===void 0&&(I=new yx(i,S,w,r),d.push(I)),I}function A(w){if(--w.usedTimes===0){let S=d.indexOf(w);d[S]=d[d.length-1],d.pop(),w.destroy()}}function P(w){l.remove(w)}function L(){l.dispose()}return{getParameters:g,getProgramCacheKey:f,getUniforms:_,acquireProgram:E,releaseProgram:A,releaseShaderCache:P,programs:d,dispose:L}}function Sx(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,l){i.get(o)[a]=l}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function wx(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function eu(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function nu(){let i=[],t=0,e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(h,u,p,x,m,g){let f=i[t];return f===void 0?(f={id:h.id,object:h,geometry:u,material:p,groupOrder:x,renderOrder:h.renderOrder,z:m,group:g},i[t]=f):(f.id=h.id,f.object=h,f.geometry=u,f.material=p,f.groupOrder=x,f.renderOrder=h.renderOrder,f.z=m,f.group=g),t++,f}function a(h,u,p,x,m,g){let f=o(h,u,p,x,m,g);p.transmission>0?n.push(f):p.transparent===!0?s.push(f):e.push(f)}function l(h,u,p,x,m,g){let f=o(h,u,p,x,m,g);p.transmission>0?n.unshift(f):p.transparent===!0?s.unshift(f):e.unshift(f)}function c(h,u){e.length>1&&e.sort(h||wx),n.length>1&&n.sort(u||eu),s.length>1&&s.sort(u||eu)}function d(){for(let h=t,u=i.length;h<u;h++){let p=i[h];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:a,unshift:l,finish:d,sort:c}}function Ex(){let i=new WeakMap;function t(n,s){let r=i.get(n),o;return r===void 0?(o=new nu,i.set(n,[o])):s>=r.length?(o=new nu,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function Tx(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new R,color:new kt};break;case"SpotLight":e={position:new R,direction:new R,color:new kt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new R,color:new kt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new R,skyColor:new kt,groundColor:new kt};break;case"RectAreaLight":e={color:new kt,position:new R,halfWidth:new R,halfHeight:new R};break}return i[t.id]=e,e}}}function Ax(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new K};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new K};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new K,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}var Rx=0;function Cx(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function Px(i){let t=new Tx,e=Ax(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new R);let s=new R,r=new se,o=new se;function a(c){let d=0,h=0,u=0;for(let w=0;w<9;w++)n.probe[w].set(0,0,0);let p=0,x=0,m=0,g=0,f=0,y=0,b=0,_=0,E=0,A=0,P=0;c.sort(Cx);for(let w=0,S=c.length;w<S;w++){let I=c[w],D=I.color,H=I.intensity,O=I.distance,U=I.shadow&&I.shadow.map?I.shadow.map.texture:null;if(I.isAmbientLight)d+=D.r*H,h+=D.g*H,u+=D.b*H;else if(I.isLightProbe){for(let z=0;z<9;z++)n.probe[z].addScaledVector(I.sh.coefficients[z],H);P++}else if(I.isDirectionalLight){let z=t.get(I);if(z.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){let q=I.shadow,V=e.get(I);V.shadowIntensity=q.intensity,V.shadowBias=q.bias,V.shadowNormalBias=q.normalBias,V.shadowRadius=q.radius,V.shadowMapSize=q.mapSize,n.directionalShadow[p]=V,n.directionalShadowMap[p]=U,n.directionalShadowMatrix[p]=I.shadow.matrix,y++}n.directional[p]=z,p++}else if(I.isSpotLight){let z=t.get(I);z.position.setFromMatrixPosition(I.matrixWorld),z.color.copy(D).multiplyScalar(H),z.distance=O,z.coneCos=Math.cos(I.angle),z.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),z.decay=I.decay,n.spot[m]=z;let q=I.shadow;if(I.map&&(n.spotLightMap[E]=I.map,E++,q.updateMatrices(I),I.castShadow&&A++),n.spotLightMatrix[m]=q.matrix,I.castShadow){let V=e.get(I);V.shadowIntensity=q.intensity,V.shadowBias=q.bias,V.shadowNormalBias=q.normalBias,V.shadowRadius=q.radius,V.shadowMapSize=q.mapSize,n.spotShadow[m]=V,n.spotShadowMap[m]=U,_++}m++}else if(I.isRectAreaLight){let z=t.get(I);z.color.copy(D).multiplyScalar(H),z.halfWidth.set(I.width*.5,0,0),z.halfHeight.set(0,I.height*.5,0),n.rectArea[g]=z,g++}else if(I.isPointLight){let z=t.get(I);if(z.color.copy(I.color).multiplyScalar(I.intensity),z.distance=I.distance,z.decay=I.decay,I.castShadow){let q=I.shadow,V=e.get(I);V.shadowIntensity=q.intensity,V.shadowBias=q.bias,V.shadowNormalBias=q.normalBias,V.shadowRadius=q.radius,V.shadowMapSize=q.mapSize,V.shadowCameraNear=q.camera.near,V.shadowCameraFar=q.camera.far,n.pointShadow[x]=V,n.pointShadowMap[x]=U,n.pointShadowMatrix[x]=I.shadow.matrix,b++}n.point[x]=z,x++}else if(I.isHemisphereLight){let z=t.get(I);z.skyColor.copy(I.color).multiplyScalar(H),z.groundColor.copy(I.groundColor).multiplyScalar(H),n.hemi[f]=z,f++}}g>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=mt.LTC_FLOAT_1,n.rectAreaLTC2=mt.LTC_FLOAT_2):(n.rectAreaLTC1=mt.LTC_HALF_1,n.rectAreaLTC2=mt.LTC_HALF_2)),n.ambient[0]=d,n.ambient[1]=h,n.ambient[2]=u;let L=n.hash;(L.directionalLength!==p||L.pointLength!==x||L.spotLength!==m||L.rectAreaLength!==g||L.hemiLength!==f||L.numDirectionalShadows!==y||L.numPointShadows!==b||L.numSpotShadows!==_||L.numSpotMaps!==E||L.numLightProbes!==P)&&(n.directional.length=p,n.spot.length=m,n.rectArea.length=g,n.point.length=x,n.hemi.length=f,n.directionalShadow.length=y,n.directionalShadowMap.length=y,n.pointShadow.length=b,n.pointShadowMap.length=b,n.spotShadow.length=_,n.spotShadowMap.length=_,n.directionalShadowMatrix.length=y,n.pointShadowMatrix.length=b,n.spotLightMatrix.length=_+E-A,n.spotLightMap.length=E,n.numSpotLightShadowsWithMaps=A,n.numLightProbes=P,L.directionalLength=p,L.pointLength=x,L.spotLength=m,L.rectAreaLength=g,L.hemiLength=f,L.numDirectionalShadows=y,L.numPointShadows=b,L.numSpotShadows=_,L.numSpotMaps=E,L.numLightProbes=P,n.version=Rx++)}function l(c,d){let h=0,u=0,p=0,x=0,m=0,g=d.matrixWorldInverse;for(let f=0,y=c.length;f<y;f++){let b=c[f];if(b.isDirectionalLight){let _=n.directional[h];_.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(g),h++}else if(b.isSpotLight){let _=n.spot[p];_.position.setFromMatrixPosition(b.matrixWorld),_.position.applyMatrix4(g),_.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(g),p++}else if(b.isRectAreaLight){let _=n.rectArea[x];_.position.setFromMatrixPosition(b.matrixWorld),_.position.applyMatrix4(g),o.identity(),r.copy(b.matrixWorld),r.premultiply(g),o.extractRotation(r),_.halfWidth.set(b.width*.5,0,0),_.halfHeight.set(0,b.height*.5,0),_.halfWidth.applyMatrix4(o),_.halfHeight.applyMatrix4(o),x++}else if(b.isPointLight){let _=n.point[u];_.position.setFromMatrixPosition(b.matrixWorld),_.position.applyMatrix4(g),u++}else if(b.isHemisphereLight){let _=n.hemi[m];_.direction.setFromMatrixPosition(b.matrixWorld),_.direction.transformDirection(g),m++}}}return{setup:a,setupView:l,state:n}}function iu(i){let t=new Px(i),e=[],n=[];function s(d){c.camera=d,e.length=0,n.length=0}function r(d){e.push(d)}function o(d){n.push(d)}function a(){t.setup(e)}function l(d){t.setupView(e,d)}let c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function Ix(i){let t=new WeakMap;function e(s,r=0){let o=t.get(s),a;return o===void 0?(a=new iu(i),t.set(s,[a])):r>=o.length?(a=new iu(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}var Lx=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Dx=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Nx(i,t,e){let n=new gs,s=new K,r=new K,o=new ne,a=new Wo({depthPacking:gd}),l=new $o,c={},d=e.maxTextureSize,h={[gn]:ze,[ze]:gn,[an]:an},u=new vn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new K},radius:{value:4}},vertexShader:Lx,fragmentShader:Dx}),p=u.clone();p.defines.HORIZONTAL_PASS=1;let x=new Te;x.setAttribute("position",new Ue(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let m=new fe(x,u),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ic;let f=this.type;this.render=function(A,P,L){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||A.length===0)return;let w=i.getRenderTarget(),S=i.getActiveCubeFace(),I=i.getActiveMipmapLevel(),D=i.state;D.setBlending(Vn),D.buffers.depth.getReversed()===!0?D.buffers.color.setClear(0,0,0,0):D.buffers.color.setClear(1,1,1,1),D.buffers.depth.setTest(!0),D.setScissorTest(!1);let H=f!==Rn&&this.type===Rn,O=f===Rn&&this.type!==Rn;for(let U=0,z=A.length;U<z;U++){let q=A[U],V=q.shadow;if(V===void 0){console.warn("THREE.WebGLShadowMap:",q,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;s.copy(V.mapSize);let rt=V.getFrameExtents();if(s.multiply(rt),r.copy(V.mapSize),(s.x>d||s.y>d)&&(s.x>d&&(r.x=Math.floor(d/rt.x),s.x=r.x*rt.x,V.mapSize.x=r.x),s.y>d&&(r.y=Math.floor(d/rt.y),s.y=r.y*rt.y,V.mapSize.y=r.y)),V.map===null||H===!0||O===!0){let ht=this.type!==Rn?{minFilter:sn,magFilter:sn}:{};V.map!==null&&V.map.dispose(),V.map=new Tn(s.x,s.y,ht),V.map.texture.name=q.name+".shadowMap",V.camera.updateProjectionMatrix()}i.setRenderTarget(V.map),i.clear();let nt=V.getViewportCount();for(let ht=0;ht<nt;ht++){let yt=V.getViewport(ht);o.set(r.x*yt.x,r.y*yt.y,r.x*yt.z,r.y*yt.w),D.viewport(o),V.updateMatrices(q,ht),n=V.getFrustum(),_(P,L,V.camera,q,this.type)}V.isPointLightShadow!==!0&&this.type===Rn&&y(V,L),V.needsUpdate=!1}f=this.type,g.needsUpdate=!1,i.setRenderTarget(w,S,I)};function y(A,P){let L=t.update(m);u.defines.VSM_SAMPLES!==A.blurSamples&&(u.defines.VSM_SAMPLES=A.blurSamples,p.defines.VSM_SAMPLES=A.blurSamples,u.needsUpdate=!0,p.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new Tn(s.x,s.y)),u.uniforms.shadow_pass.value=A.map.texture,u.uniforms.resolution.value=A.mapSize,u.uniforms.radius.value=A.radius,i.setRenderTarget(A.mapPass),i.clear(),i.renderBufferDirect(P,null,L,u,m,null),p.uniforms.shadow_pass.value=A.mapPass.texture,p.uniforms.resolution.value=A.mapSize,p.uniforms.radius.value=A.radius,i.setRenderTarget(A.map),i.clear(),i.renderBufferDirect(P,null,L,p,m,null)}function b(A,P,L,w){let S=null,I=L.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(I!==void 0)S=I;else if(S=L.isPointLight===!0?l:a,i.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0||P.alphaToCoverage===!0){let D=S.uuid,H=P.uuid,O=c[D];O===void 0&&(O={},c[D]=O);let U=O[H];U===void 0&&(U=S.clone(),O[H]=U,P.addEventListener("dispose",E)),S=U}if(S.visible=P.visible,S.wireframe=P.wireframe,w===Rn?S.side=P.shadowSide!==null?P.shadowSide:P.side:S.side=P.shadowSide!==null?P.shadowSide:h[P.side],S.alphaMap=P.alphaMap,S.alphaTest=P.alphaToCoverage===!0?.5:P.alphaTest,S.map=P.map,S.clipShadows=P.clipShadows,S.clippingPlanes=P.clippingPlanes,S.clipIntersection=P.clipIntersection,S.displacementMap=P.displacementMap,S.displacementScale=P.displacementScale,S.displacementBias=P.displacementBias,S.wireframeLinewidth=P.wireframeLinewidth,S.linewidth=P.linewidth,L.isPointLight===!0&&S.isMeshDistanceMaterial===!0){let D=i.properties.get(S);D.light=L}return S}function _(A,P,L,w,S){if(A.visible===!1)return;if(A.layers.test(P.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&S===Rn)&&(!A.frustumCulled||n.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(L.matrixWorldInverse,A.matrixWorld);let H=t.update(A),O=A.material;if(Array.isArray(O)){let U=H.groups;for(let z=0,q=U.length;z<q;z++){let V=U[z],rt=O[V.materialIndex];if(rt&&rt.visible){let nt=b(A,rt,w,S);A.onBeforeShadow(i,A,P,L,H,nt,V),i.renderBufferDirect(L,null,H,nt,A,V),A.onAfterShadow(i,A,P,L,H,nt,V)}}}else if(O.visible){let U=b(A,O,w,S);A.onBeforeShadow(i,A,P,L,H,U,null),i.renderBufferDirect(L,null,H,U,A,null),A.onAfterShadow(i,A,P,L,H,U,null)}}let D=A.children;for(let H=0,O=D.length;H<O;H++)_(D[H],P,L,w,S)}function E(A){A.target.removeEventListener("dispose",E);for(let L in c){let w=c[L],S=A.target.uuid;S in w&&(w[S].dispose(),delete w[S])}}}var Ux={[ia]:sa,[ra]:la,[oa]:ca,[_i]:aa,[sa]:ia,[la]:ra,[ca]:oa,[aa]:_i};function Fx(i,t){function e(){let N=!1,ct=new ne,pt=null,Mt=new ne(0,0,0,0);return{setMask:function(at){pt!==at&&!N&&(i.colorMask(at,at,at,at),pt=at)},setLocked:function(at){N=at},setClear:function(at,Q,At,Vt,ce){ce===!0&&(at*=Vt,Q*=Vt,At*=Vt),ct.set(at,Q,At,Vt),Mt.equals(ct)===!1&&(i.clearColor(at,Q,At,Vt),Mt.copy(ct))},reset:function(){N=!1,pt=null,Mt.set(-1,0,0,0)}}}function n(){let N=!1,ct=!1,pt=null,Mt=null,at=null;return{setReversed:function(Q){if(ct!==Q){let At=t.get("EXT_clip_control");Q?At.clipControlEXT(At.LOWER_LEFT_EXT,At.ZERO_TO_ONE_EXT):At.clipControlEXT(At.LOWER_LEFT_EXT,At.NEGATIVE_ONE_TO_ONE_EXT),ct=Q;let Vt=at;at=null,this.setClear(Vt)}},getReversed:function(){return ct},setTest:function(Q){Q?it(i.DEPTH_TEST):bt(i.DEPTH_TEST)},setMask:function(Q){pt!==Q&&!N&&(i.depthMask(Q),pt=Q)},setFunc:function(Q){if(ct&&(Q=Ux[Q]),Mt!==Q){switch(Q){case ia:i.depthFunc(i.NEVER);break;case sa:i.depthFunc(i.ALWAYS);break;case ra:i.depthFunc(i.LESS);break;case _i:i.depthFunc(i.LEQUAL);break;case oa:i.depthFunc(i.EQUAL);break;case aa:i.depthFunc(i.GEQUAL);break;case la:i.depthFunc(i.GREATER);break;case ca:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Mt=Q}},setLocked:function(Q){N=Q},setClear:function(Q){at!==Q&&(ct&&(Q=1-Q),i.clearDepth(Q),at=Q)},reset:function(){N=!1,pt=null,Mt=null,at=null,ct=!1}}}function s(){let N=!1,ct=null,pt=null,Mt=null,at=null,Q=null,At=null,Vt=null,ce=null;return{setTest:function(te){N||(te?it(i.STENCIL_TEST):bt(i.STENCIL_TEST))},setMask:function(te){ct!==te&&!N&&(i.stencilMask(te),ct=te)},setFunc:function(te,Ln,bn){(pt!==te||Mt!==Ln||at!==bn)&&(i.stencilFunc(te,Ln,bn),pt=te,Mt=Ln,at=bn)},setOp:function(te,Ln,bn){(Q!==te||At!==Ln||Vt!==bn)&&(i.stencilOp(te,Ln,bn),Q=te,At=Ln,Vt=bn)},setLocked:function(te){N=te},setClear:function(te){ce!==te&&(i.clearStencil(te),ce=te)},reset:function(){N=!1,ct=null,pt=null,Mt=null,at=null,Q=null,At=null,Vt=null,ce=null}}}let r=new e,o=new n,a=new s,l=new WeakMap,c=new WeakMap,d={},h={},u=new WeakMap,p=[],x=null,m=!1,g=null,f=null,y=null,b=null,_=null,E=null,A=null,P=new kt(0,0,0),L=0,w=!1,S=null,I=null,D=null,H=null,O=null,U=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),z=!1,q=0,V=i.getParameter(i.VERSION);V.indexOf("WebGL")!==-1?(q=parseFloat(/^WebGL (\d)/.exec(V)[1]),z=q>=1):V.indexOf("OpenGL ES")!==-1&&(q=parseFloat(/^OpenGL ES (\d)/.exec(V)[1]),z=q>=2);let rt=null,nt={},ht=i.getParameter(i.SCISSOR_BOX),yt=i.getParameter(i.VIEWPORT),Bt=new ne().fromArray(ht),Ut=new ne().fromArray(yt);function Ot(N,ct,pt,Mt){let at=new Uint8Array(4),Q=i.createTexture();i.bindTexture(N,Q),i.texParameteri(N,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(N,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let At=0;At<pt;At++)N===i.TEXTURE_3D||N===i.TEXTURE_2D_ARRAY?i.texImage3D(ct,0,i.RGBA,1,1,Mt,0,i.RGBA,i.UNSIGNED_BYTE,at):i.texImage2D(ct+At,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,at);return Q}let Y={};Y[i.TEXTURE_2D]=Ot(i.TEXTURE_2D,i.TEXTURE_2D,1),Y[i.TEXTURE_CUBE_MAP]=Ot(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Y[i.TEXTURE_2D_ARRAY]=Ot(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Y[i.TEXTURE_3D]=Ot(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),it(i.DEPTH_TEST),o.setFunc(_i),j(!1),Z(nc),it(i.CULL_FACE),et(Vn);function it(N){d[N]!==!0&&(i.enable(N),d[N]=!0)}function bt(N){d[N]!==!1&&(i.disable(N),d[N]=!1)}function Pt(N,ct){return h[N]!==ct?(i.bindFramebuffer(N,ct),h[N]=ct,N===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=ct),N===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=ct),!0):!1}function wt(N,ct){let pt=p,Mt=!1;if(N){pt=u.get(ct),pt===void 0&&(pt=[],u.set(ct,pt));let at=N.textures;if(pt.length!==at.length||pt[0]!==i.COLOR_ATTACHMENT0){for(let Q=0,At=at.length;Q<At;Q++)pt[Q]=i.COLOR_ATTACHMENT0+Q;pt.length=at.length,Mt=!0}}else pt[0]!==i.BACK&&(pt[0]=i.BACK,Mt=!0);Mt&&i.drawBuffers(pt)}function Yt(N){return x!==N?(i.useProgram(N),x=N,!0):!1}let le={[Jn]:i.FUNC_ADD,[Vh]:i.FUNC_SUBTRACT,[Gh]:i.FUNC_REVERSE_SUBTRACT};le[Wh]=i.MIN,le[$h]=i.MAX;let C={[Xh]:i.ZERO,[qh]:i.ONE,[Yh]:i.SRC_COLOR,[wo]:i.SRC_ALPHA,[td]:i.SRC_ALPHA_SATURATE,[Jh]:i.DST_COLOR,[jh]:i.DST_ALPHA,[Zh]:i.ONE_MINUS_SRC_COLOR,[Eo]:i.ONE_MINUS_SRC_ALPHA,[Qh]:i.ONE_MINUS_DST_COLOR,[Kh]:i.ONE_MINUS_DST_ALPHA,[ed]:i.CONSTANT_COLOR,[nd]:i.ONE_MINUS_CONSTANT_COLOR,[id]:i.CONSTANT_ALPHA,[sd]:i.ONE_MINUS_CONSTANT_ALPHA};function et(N,ct,pt,Mt,at,Q,At,Vt,ce,te){if(N===Vn){m===!0&&(bt(i.BLEND),m=!1);return}if(m===!1&&(it(i.BLEND),m=!0),N!==zh){if(N!==g||te!==w){if((f!==Jn||_!==Jn)&&(i.blendEquation(i.FUNC_ADD),f=Jn,_=Jn),te)switch(N){case xi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Dr:i.blendFunc(i.ONE,i.ONE);break;case sc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case rc:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}else switch(N){case xi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Dr:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case sc:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case rc:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}y=null,b=null,E=null,A=null,P.set(0,0,0),L=0,g=N,w=te}return}at=at||ct,Q=Q||pt,At=At||Mt,(ct!==f||at!==_)&&(i.blendEquationSeparate(le[ct],le[at]),f=ct,_=at),(pt!==y||Mt!==b||Q!==E||At!==A)&&(i.blendFuncSeparate(C[pt],C[Mt],C[Q],C[At]),y=pt,b=Mt,E=Q,A=At),(Vt.equals(P)===!1||ce!==L)&&(i.blendColor(Vt.r,Vt.g,Vt.b,ce),P.copy(Vt),L=ce),g=N,w=!1}function J(N,ct){N.side===an?bt(i.CULL_FACE):it(i.CULL_FACE);let pt=N.side===ze;ct&&(pt=!pt),j(pt),N.blending===xi&&N.transparent===!1?et(Vn):et(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),o.setFunc(N.depthFunc),o.setTest(N.depthTest),o.setMask(N.depthWrite),r.setMask(N.colorWrite);let Mt=N.stencilWrite;a.setTest(Mt),Mt&&(a.setMask(N.stencilWriteMask),a.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),a.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),st(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?it(i.SAMPLE_ALPHA_TO_COVERAGE):bt(i.SAMPLE_ALPHA_TO_COVERAGE)}function j(N){S!==N&&(N?i.frontFace(i.CW):i.frontFace(i.CCW),S=N)}function Z(N){N!==kh?(it(i.CULL_FACE),N!==I&&(N===nc?i.cullFace(i.BACK):N===Bh?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):bt(i.CULL_FACE),I=N}function ut(N){N!==D&&(z&&i.lineWidth(N),D=N)}function st(N,ct,pt){N?(it(i.POLYGON_OFFSET_FILL),(H!==ct||O!==pt)&&(i.polygonOffset(ct,pt),H=ct,O=pt)):bt(i.POLYGON_OFFSET_FILL)}function ft(N){N?it(i.SCISSOR_TEST):bt(i.SCISSOR_TEST)}function zt(N){N===void 0&&(N=i.TEXTURE0+U-1),rt!==N&&(i.activeTexture(N),rt=N)}function Ht(N,ct,pt){pt===void 0&&(rt===null?pt=i.TEXTURE0+U-1:pt=rt);let Mt=nt[pt];Mt===void 0&&(Mt={type:void 0,texture:void 0},nt[pt]=Mt),(Mt.type!==N||Mt.texture!==ct)&&(rt!==pt&&(i.activeTexture(pt),rt=pt),i.bindTexture(N,ct||Y[N]),Mt.type=N,Mt.texture=ct)}function T(){let N=nt[rt];N!==void 0&&N.type!==void 0&&(i.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function v(){try{i.compressedTexImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function B(){try{i.compressedTexImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function $(){try{i.texSubImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function tt(){try{i.texSubImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function X(){try{i.compressedTexSubImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Rt(){try{i.compressedTexSubImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function dt(){try{i.texStorage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Et(){try{i.texStorage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Tt(){try{i.texImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ot(){try{i.texImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function _t(N){Bt.equals(N)===!1&&(i.scissor(N.x,N.y,N.z,N.w),Bt.copy(N))}function Nt(N){Ut.equals(N)===!1&&(i.viewport(N.x,N.y,N.z,N.w),Ut.copy(N))}function Ct(N,ct){let pt=c.get(ct);pt===void 0&&(pt=new WeakMap,c.set(ct,pt));let Mt=pt.get(N);Mt===void 0&&(Mt=i.getUniformBlockIndex(ct,N.name),pt.set(N,Mt))}function gt(N,ct){let Mt=c.get(ct).get(N);l.get(ct)!==Mt&&(i.uniformBlockBinding(ct,Mt,N.__bindingPointIndex),l.set(ct,Mt))}function Wt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),d={},rt=null,nt={},h={},u=new WeakMap,p=[],x=null,m=!1,g=null,f=null,y=null,b=null,_=null,E=null,A=null,P=new kt(0,0,0),L=0,w=!1,S=null,I=null,D=null,H=null,O=null,Bt.set(0,0,i.canvas.width,i.canvas.height),Ut.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:it,disable:bt,bindFramebuffer:Pt,drawBuffers:wt,useProgram:Yt,setBlending:et,setMaterial:J,setFlipSided:j,setCullFace:Z,setLineWidth:ut,setPolygonOffset:st,setScissorTest:ft,activeTexture:zt,bindTexture:Ht,unbindTexture:T,compressedTexImage2D:v,compressedTexImage3D:B,texImage2D:Tt,texImage3D:ot,updateUBOMapping:Ct,uniformBlockBinding:gt,texStorage2D:dt,texStorage3D:Et,texSubImage2D:$,texSubImage3D:tt,compressedTexSubImage2D:X,compressedTexSubImage3D:Rt,scissor:_t,viewport:Nt,reset:Wt}}function Ox(i,t,e,n,s,r,o){let a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new K,d=new WeakMap,h,u=new WeakMap,p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(T,v){return p?new OffscreenCanvas(T,v):hs("canvas")}function m(T,v,B){let $=1,tt=Ht(T);if((tt.width>B||tt.height>B)&&($=B/Math.max(tt.width,tt.height)),$<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){let X=Math.floor($*tt.width),Rt=Math.floor($*tt.height);h===void 0&&(h=x(X,Rt));let dt=v?x(X,Rt):h;return dt.width=X,dt.height=Rt,dt.getContext("2d").drawImage(T,0,0,X,Rt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+tt.width+"x"+tt.height+") to ("+X+"x"+Rt+")."),dt}else return"data"in T&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+tt.width+"x"+tt.height+")."),T;return T}function g(T){return T.generateMipmaps}function f(T){i.generateMipmap(T)}function y(T){return T.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?i.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function b(T,v,B,$,tt=!1){if(T!==null){if(i[T]!==void 0)return i[T];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let X=v;if(v===i.RED&&(B===i.FLOAT&&(X=i.R32F),B===i.HALF_FLOAT&&(X=i.R16F),B===i.UNSIGNED_BYTE&&(X=i.R8)),v===i.RED_INTEGER&&(B===i.UNSIGNED_BYTE&&(X=i.R8UI),B===i.UNSIGNED_SHORT&&(X=i.R16UI),B===i.UNSIGNED_INT&&(X=i.R32UI),B===i.BYTE&&(X=i.R8I),B===i.SHORT&&(X=i.R16I),B===i.INT&&(X=i.R32I)),v===i.RG&&(B===i.FLOAT&&(X=i.RG32F),B===i.HALF_FLOAT&&(X=i.RG16F),B===i.UNSIGNED_BYTE&&(X=i.RG8)),v===i.RG_INTEGER&&(B===i.UNSIGNED_BYTE&&(X=i.RG8UI),B===i.UNSIGNED_SHORT&&(X=i.RG16UI),B===i.UNSIGNED_INT&&(X=i.RG32UI),B===i.BYTE&&(X=i.RG8I),B===i.SHORT&&(X=i.RG16I),B===i.INT&&(X=i.RG32I)),v===i.RGB_INTEGER&&(B===i.UNSIGNED_BYTE&&(X=i.RGB8UI),B===i.UNSIGNED_SHORT&&(X=i.RGB16UI),B===i.UNSIGNED_INT&&(X=i.RGB32UI),B===i.BYTE&&(X=i.RGB8I),B===i.SHORT&&(X=i.RGB16I),B===i.INT&&(X=i.RGB32I)),v===i.RGBA_INTEGER&&(B===i.UNSIGNED_BYTE&&(X=i.RGBA8UI),B===i.UNSIGNED_SHORT&&(X=i.RGBA16UI),B===i.UNSIGNED_INT&&(X=i.RGBA32UI),B===i.BYTE&&(X=i.RGBA8I),B===i.SHORT&&(X=i.RGBA16I),B===i.INT&&(X=i.RGBA32I)),v===i.RGB&&(B===i.UNSIGNED_INT_5_9_9_9_REV&&(X=i.RGB9_E5),B===i.UNSIGNED_INT_10F_11F_11F_REV&&(X=i.R11F_G11F_B10F)),v===i.RGBA){let Rt=tt?ir:jt.getTransfer($);B===i.FLOAT&&(X=i.RGBA32F),B===i.HALF_FLOAT&&(X=i.RGBA16F),B===i.UNSIGNED_BYTE&&(X=Rt===ie?i.SRGB8_ALPHA8:i.RGBA8),B===i.UNSIGNED_SHORT_4_4_4_4&&(X=i.RGBA4),B===i.UNSIGNED_SHORT_5_5_5_1&&(X=i.RGB5_A1)}return(X===i.R16F||X===i.R32F||X===i.RG16F||X===i.RG32F||X===i.RGBA16F||X===i.RGBA32F)&&t.get("EXT_color_buffer_float"),X}function _(T,v){let B;return T?v===null||v===ai||v===Ts?B=i.DEPTH24_STENCIL8:v===Cn?B=i.DEPTH32F_STENCIL8:v===ws&&(B=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===ai||v===Ts?B=i.DEPTH_COMPONENT24:v===Cn?B=i.DEPTH_COMPONENT32F:v===ws&&(B=i.DEPTH_COMPONENT16),B}function E(T,v){return g(T)===!0||T.isFramebufferTexture&&T.minFilter!==sn&&T.minFilter!==xn?Math.log2(Math.max(v.width,v.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?v.mipmaps.length:1}function A(T){let v=T.target;v.removeEventListener("dispose",A),L(v),v.isVideoTexture&&d.delete(v)}function P(T){let v=T.target;v.removeEventListener("dispose",P),S(v)}function L(T){let v=n.get(T);if(v.__webglInit===void 0)return;let B=T.source,$=u.get(B);if($){let tt=$[v.__cacheKey];tt.usedTimes--,tt.usedTimes===0&&w(T),Object.keys($).length===0&&u.delete(B)}n.remove(T)}function w(T){let v=n.get(T);i.deleteTexture(v.__webglTexture);let B=T.source,$=u.get(B);delete $[v.__cacheKey],o.memory.textures--}function S(T){let v=n.get(T);if(T.depthTexture&&(T.depthTexture.dispose(),n.remove(T.depthTexture)),T.isWebGLCubeRenderTarget)for(let $=0;$<6;$++){if(Array.isArray(v.__webglFramebuffer[$]))for(let tt=0;tt<v.__webglFramebuffer[$].length;tt++)i.deleteFramebuffer(v.__webglFramebuffer[$][tt]);else i.deleteFramebuffer(v.__webglFramebuffer[$]);v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer[$])}else{if(Array.isArray(v.__webglFramebuffer))for(let $=0;$<v.__webglFramebuffer.length;$++)i.deleteFramebuffer(v.__webglFramebuffer[$]);else i.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&i.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let $=0;$<v.__webglColorRenderbuffer.length;$++)v.__webglColorRenderbuffer[$]&&i.deleteRenderbuffer(v.__webglColorRenderbuffer[$]);v.__webglDepthRenderbuffer&&i.deleteRenderbuffer(v.__webglDepthRenderbuffer)}let B=T.textures;for(let $=0,tt=B.length;$<tt;$++){let X=n.get(B[$]);X.__webglTexture&&(i.deleteTexture(X.__webglTexture),o.memory.textures--),n.remove(B[$])}n.remove(T)}let I=0;function D(){I=0}function H(){let T=I;return T>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+s.maxTextures),I+=1,T}function O(T){let v=[];return v.push(T.wrapS),v.push(T.wrapT),v.push(T.wrapR||0),v.push(T.magFilter),v.push(T.minFilter),v.push(T.anisotropy),v.push(T.internalFormat),v.push(T.format),v.push(T.type),v.push(T.generateMipmaps),v.push(T.premultiplyAlpha),v.push(T.flipY),v.push(T.unpackAlignment),v.push(T.colorSpace),v.join()}function U(T,v){let B=n.get(T);if(T.isVideoTexture&&ft(T),T.isRenderTargetTexture===!1&&T.isExternalTexture!==!0&&T.version>0&&B.__version!==T.version){let $=T.image;if($===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if($.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Y(B,T,v);return}}else T.isExternalTexture&&(B.__webglTexture=T.sourceTexture?T.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,B.__webglTexture,i.TEXTURE0+v)}function z(T,v){let B=n.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&B.__version!==T.version){Y(B,T,v);return}e.bindTexture(i.TEXTURE_2D_ARRAY,B.__webglTexture,i.TEXTURE0+v)}function q(T,v){let B=n.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&B.__version!==T.version){Y(B,T,v);return}e.bindTexture(i.TEXTURE_3D,B.__webglTexture,i.TEXTURE0+v)}function V(T,v){let B=n.get(T);if(T.version>0&&B.__version!==T.version){it(B,T,v);return}e.bindTexture(i.TEXTURE_CUBE_MAP,B.__webglTexture,i.TEXTURE0+v)}let rt={[as]:i.REPEAT,[Kn]:i.CLAMP_TO_EDGE,[To]:i.MIRRORED_REPEAT},nt={[sn]:i.NEAREST,[pd]:i.NEAREST_MIPMAP_NEAREST,[Ur]:i.NEAREST_MIPMAP_LINEAR,[xn]:i.LINEAR,[ua]:i.LINEAR_MIPMAP_NEAREST,[oi]:i.LINEAR_MIPMAP_LINEAR},ht={[_d]:i.NEVER,[wd]:i.ALWAYS,[vd]:i.LESS,[xc]:i.LEQUAL,[yd]:i.EQUAL,[Sd]:i.GEQUAL,[bd]:i.GREATER,[Md]:i.NOTEQUAL};function yt(T,v){if(v.type===Cn&&t.has("OES_texture_float_linear")===!1&&(v.magFilter===xn||v.magFilter===ua||v.magFilter===Ur||v.magFilter===oi||v.minFilter===xn||v.minFilter===ua||v.minFilter===Ur||v.minFilter===oi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(T,i.TEXTURE_WRAP_S,rt[v.wrapS]),i.texParameteri(T,i.TEXTURE_WRAP_T,rt[v.wrapT]),(T===i.TEXTURE_3D||T===i.TEXTURE_2D_ARRAY)&&i.texParameteri(T,i.TEXTURE_WRAP_R,rt[v.wrapR]),i.texParameteri(T,i.TEXTURE_MAG_FILTER,nt[v.magFilter]),i.texParameteri(T,i.TEXTURE_MIN_FILTER,nt[v.minFilter]),v.compareFunction&&(i.texParameteri(T,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(T,i.TEXTURE_COMPARE_FUNC,ht[v.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===sn||v.minFilter!==Ur&&v.minFilter!==oi||v.type===Cn&&t.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||n.get(v).__currentAnisotropy){let B=t.get("EXT_texture_filter_anisotropic");i.texParameterf(T,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,s.getMaxAnisotropy())),n.get(v).__currentAnisotropy=v.anisotropy}}}function Bt(T,v){let B=!1;T.__webglInit===void 0&&(T.__webglInit=!0,v.addEventListener("dispose",A));let $=v.source,tt=u.get($);tt===void 0&&(tt={},u.set($,tt));let X=O(v);if(X!==T.__cacheKey){tt[X]===void 0&&(tt[X]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,B=!0),tt[X].usedTimes++;let Rt=tt[T.__cacheKey];Rt!==void 0&&(tt[T.__cacheKey].usedTimes--,Rt.usedTimes===0&&w(v)),T.__cacheKey=X,T.__webglTexture=tt[X].texture}return B}function Ut(T,v,B){return Math.floor(Math.floor(T/B)/v)}function Ot(T,v,B,$){let X=T.updateRanges;if(X.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,v.width,v.height,B,$,v.data);else{X.sort((ot,_t)=>ot.start-_t.start);let Rt=0;for(let ot=1;ot<X.length;ot++){let _t=X[Rt],Nt=X[ot],Ct=_t.start+_t.count,gt=Ut(Nt.start,v.width,4),Wt=Ut(_t.start,v.width,4);Nt.start<=Ct+1&&gt===Wt&&Ut(Nt.start+Nt.count-1,v.width,4)===gt?_t.count=Math.max(_t.count,Nt.start+Nt.count-_t.start):(++Rt,X[Rt]=Nt)}X.length=Rt+1;let dt=i.getParameter(i.UNPACK_ROW_LENGTH),Et=i.getParameter(i.UNPACK_SKIP_PIXELS),Tt=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,v.width);for(let ot=0,_t=X.length;ot<_t;ot++){let Nt=X[ot],Ct=Math.floor(Nt.start/4),gt=Math.ceil(Nt.count/4),Wt=Ct%v.width,N=Math.floor(Ct/v.width),ct=gt,pt=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,Wt),i.pixelStorei(i.UNPACK_SKIP_ROWS,N),e.texSubImage2D(i.TEXTURE_2D,0,Wt,N,ct,pt,B,$,v.data)}T.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,dt),i.pixelStorei(i.UNPACK_SKIP_PIXELS,Et),i.pixelStorei(i.UNPACK_SKIP_ROWS,Tt)}}function Y(T,v,B){let $=i.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&($=i.TEXTURE_2D_ARRAY),v.isData3DTexture&&($=i.TEXTURE_3D);let tt=Bt(T,v),X=v.source;e.bindTexture($,T.__webglTexture,i.TEXTURE0+B);let Rt=n.get(X);if(X.version!==Rt.__version||tt===!0){e.activeTexture(i.TEXTURE0+B);let dt=jt.getPrimaries(jt.workingColorSpace),Et=v.colorSpace===Wn?null:jt.getPrimaries(v.colorSpace),Tt=v.colorSpace===Wn||dt===Et?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Tt);let ot=m(v.image,!1,s.maxTextureSize);ot=zt(v,ot);let _t=r.convert(v.format,v.colorSpace),Nt=r.convert(v.type),Ct=b(v.internalFormat,_t,Nt,v.colorSpace,v.isVideoTexture);yt($,v);let gt,Wt=v.mipmaps,N=v.isVideoTexture!==!0,ct=Rt.__version===void 0||tt===!0,pt=X.dataReady,Mt=E(v,ot);if(v.isDepthTexture)Ct=_(v.format===As,v.type),ct&&(N?e.texStorage2D(i.TEXTURE_2D,1,Ct,ot.width,ot.height):e.texImage2D(i.TEXTURE_2D,0,Ct,ot.width,ot.height,0,_t,Nt,null));else if(v.isDataTexture)if(Wt.length>0){N&&ct&&e.texStorage2D(i.TEXTURE_2D,Mt,Ct,Wt[0].width,Wt[0].height);for(let at=0,Q=Wt.length;at<Q;at++)gt=Wt[at],N?pt&&e.texSubImage2D(i.TEXTURE_2D,at,0,0,gt.width,gt.height,_t,Nt,gt.data):e.texImage2D(i.TEXTURE_2D,at,Ct,gt.width,gt.height,0,_t,Nt,gt.data);v.generateMipmaps=!1}else N?(ct&&e.texStorage2D(i.TEXTURE_2D,Mt,Ct,ot.width,ot.height),pt&&Ot(v,ot,_t,Nt)):e.texImage2D(i.TEXTURE_2D,0,Ct,ot.width,ot.height,0,_t,Nt,ot.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){N&&ct&&e.texStorage3D(i.TEXTURE_2D_ARRAY,Mt,Ct,Wt[0].width,Wt[0].height,ot.depth);for(let at=0,Q=Wt.length;at<Q;at++)if(gt=Wt[at],v.format!==ln)if(_t!==null)if(N){if(pt)if(v.layerUpdates.size>0){let At=Ec(gt.width,gt.height,v.format,v.type);for(let Vt of v.layerUpdates){let ce=gt.data.subarray(Vt*At/gt.data.BYTES_PER_ELEMENT,(Vt+1)*At/gt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,at,0,0,Vt,gt.width,gt.height,1,_t,ce)}v.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,at,0,0,0,gt.width,gt.height,ot.depth,_t,gt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,at,Ct,gt.width,gt.height,ot.depth,0,gt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else N?pt&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,at,0,0,0,gt.width,gt.height,ot.depth,_t,Nt,gt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,at,Ct,gt.width,gt.height,ot.depth,0,_t,Nt,gt.data)}else{N&&ct&&e.texStorage2D(i.TEXTURE_2D,Mt,Ct,Wt[0].width,Wt[0].height);for(let at=0,Q=Wt.length;at<Q;at++)gt=Wt[at],v.format!==ln?_t!==null?N?pt&&e.compressedTexSubImage2D(i.TEXTURE_2D,at,0,0,gt.width,gt.height,_t,gt.data):e.compressedTexImage2D(i.TEXTURE_2D,at,Ct,gt.width,gt.height,0,gt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):N?pt&&e.texSubImage2D(i.TEXTURE_2D,at,0,0,gt.width,gt.height,_t,Nt,gt.data):e.texImage2D(i.TEXTURE_2D,at,Ct,gt.width,gt.height,0,_t,Nt,gt.data)}else if(v.isDataArrayTexture)if(N){if(ct&&e.texStorage3D(i.TEXTURE_2D_ARRAY,Mt,Ct,ot.width,ot.height,ot.depth),pt)if(v.layerUpdates.size>0){let at=Ec(ot.width,ot.height,v.format,v.type);for(let Q of v.layerUpdates){let At=ot.data.subarray(Q*at/ot.data.BYTES_PER_ELEMENT,(Q+1)*at/ot.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Q,ot.width,ot.height,1,_t,Nt,At)}v.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ot.width,ot.height,ot.depth,_t,Nt,ot.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Ct,ot.width,ot.height,ot.depth,0,_t,Nt,ot.data);else if(v.isData3DTexture)N?(ct&&e.texStorage3D(i.TEXTURE_3D,Mt,Ct,ot.width,ot.height,ot.depth),pt&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ot.width,ot.height,ot.depth,_t,Nt,ot.data)):e.texImage3D(i.TEXTURE_3D,0,Ct,ot.width,ot.height,ot.depth,0,_t,Nt,ot.data);else if(v.isFramebufferTexture){if(ct)if(N)e.texStorage2D(i.TEXTURE_2D,Mt,Ct,ot.width,ot.height);else{let at=ot.width,Q=ot.height;for(let At=0;At<Mt;At++)e.texImage2D(i.TEXTURE_2D,At,Ct,at,Q,0,_t,Nt,null),at>>=1,Q>>=1}}else if(Wt.length>0){if(N&&ct){let at=Ht(Wt[0]);e.texStorage2D(i.TEXTURE_2D,Mt,Ct,at.width,at.height)}for(let at=0,Q=Wt.length;at<Q;at++)gt=Wt[at],N?pt&&e.texSubImage2D(i.TEXTURE_2D,at,0,0,_t,Nt,gt):e.texImage2D(i.TEXTURE_2D,at,Ct,_t,Nt,gt);v.generateMipmaps=!1}else if(N){if(ct){let at=Ht(ot);e.texStorage2D(i.TEXTURE_2D,Mt,Ct,at.width,at.height)}pt&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,_t,Nt,ot)}else e.texImage2D(i.TEXTURE_2D,0,Ct,_t,Nt,ot);g(v)&&f($),Rt.__version=X.version,v.onUpdate&&v.onUpdate(v)}T.__version=v.version}function it(T,v,B){if(v.image.length!==6)return;let $=Bt(T,v),tt=v.source;e.bindTexture(i.TEXTURE_CUBE_MAP,T.__webglTexture,i.TEXTURE0+B);let X=n.get(tt);if(tt.version!==X.__version||$===!0){e.activeTexture(i.TEXTURE0+B);let Rt=jt.getPrimaries(jt.workingColorSpace),dt=v.colorSpace===Wn?null:jt.getPrimaries(v.colorSpace),Et=v.colorSpace===Wn||Rt===dt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Et);let Tt=v.isCompressedTexture||v.image[0].isCompressedTexture,ot=v.image[0]&&v.image[0].isDataTexture,_t=[];for(let Q=0;Q<6;Q++)!Tt&&!ot?_t[Q]=m(v.image[Q],!0,s.maxCubemapSize):_t[Q]=ot?v.image[Q].image:v.image[Q],_t[Q]=zt(v,_t[Q]);let Nt=_t[0],Ct=r.convert(v.format,v.colorSpace),gt=r.convert(v.type),Wt=b(v.internalFormat,Ct,gt,v.colorSpace),N=v.isVideoTexture!==!0,ct=X.__version===void 0||$===!0,pt=tt.dataReady,Mt=E(v,Nt);yt(i.TEXTURE_CUBE_MAP,v);let at;if(Tt){N&&ct&&e.texStorage2D(i.TEXTURE_CUBE_MAP,Mt,Wt,Nt.width,Nt.height);for(let Q=0;Q<6;Q++){at=_t[Q].mipmaps;for(let At=0;At<at.length;At++){let Vt=at[At];v.format!==ln?Ct!==null?N?pt&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,At,0,0,Vt.width,Vt.height,Ct,Vt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,At,Wt,Vt.width,Vt.height,0,Vt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):N?pt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,At,0,0,Vt.width,Vt.height,Ct,gt,Vt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,At,Wt,Vt.width,Vt.height,0,Ct,gt,Vt.data)}}}else{if(at=v.mipmaps,N&&ct){at.length>0&&Mt++;let Q=Ht(_t[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,Mt,Wt,Q.width,Q.height)}for(let Q=0;Q<6;Q++)if(ot){N?pt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,_t[Q].width,_t[Q].height,Ct,gt,_t[Q].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,Wt,_t[Q].width,_t[Q].height,0,Ct,gt,_t[Q].data);for(let At=0;At<at.length;At++){let ce=at[At].image[Q].image;N?pt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,At+1,0,0,ce.width,ce.height,Ct,gt,ce.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,At+1,Wt,ce.width,ce.height,0,Ct,gt,ce.data)}}else{N?pt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,Ct,gt,_t[Q]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,Wt,Ct,gt,_t[Q]);for(let At=0;At<at.length;At++){let Vt=at[At];N?pt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,At+1,0,0,Ct,gt,Vt.image[Q]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,At+1,Wt,Ct,gt,Vt.image[Q])}}}g(v)&&f(i.TEXTURE_CUBE_MAP),X.__version=tt.version,v.onUpdate&&v.onUpdate(v)}T.__version=v.version}function bt(T,v,B,$,tt,X){let Rt=r.convert(B.format,B.colorSpace),dt=r.convert(B.type),Et=b(B.internalFormat,Rt,dt,B.colorSpace),Tt=n.get(v),ot=n.get(B);if(ot.__renderTarget=v,!Tt.__hasExternalTextures){let _t=Math.max(1,v.width>>X),Nt=Math.max(1,v.height>>X);tt===i.TEXTURE_3D||tt===i.TEXTURE_2D_ARRAY?e.texImage3D(tt,X,Et,_t,Nt,v.depth,0,Rt,dt,null):e.texImage2D(tt,X,Et,_t,Nt,0,Rt,dt,null)}e.bindFramebuffer(i.FRAMEBUFFER,T),st(v)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,$,tt,ot.__webglTexture,0,ut(v)):(tt===i.TEXTURE_2D||tt>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&tt<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,$,tt,ot.__webglTexture,X),e.bindFramebuffer(i.FRAMEBUFFER,null)}function Pt(T,v,B){if(i.bindRenderbuffer(i.RENDERBUFFER,T),v.depthBuffer){let $=v.depthTexture,tt=$&&$.isDepthTexture?$.type:null,X=_(v.stencilBuffer,tt),Rt=v.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,dt=ut(v);st(v)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,dt,X,v.width,v.height):B?i.renderbufferStorageMultisample(i.RENDERBUFFER,dt,X,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,X,v.width,v.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Rt,i.RENDERBUFFER,T)}else{let $=v.textures;for(let tt=0;tt<$.length;tt++){let X=$[tt],Rt=r.convert(X.format,X.colorSpace),dt=r.convert(X.type),Et=b(X.internalFormat,Rt,dt,X.colorSpace),Tt=ut(v);B&&st(v)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Tt,Et,v.width,v.height):st(v)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Tt,Et,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,Et,v.width,v.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function wt(T,v){if(v&&v.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,T),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let $=n.get(v.depthTexture);$.__renderTarget=v,(!$.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),U(v.depthTexture,0);let tt=$.__webglTexture,X=ut(v);if(v.depthTexture.format===ls)st(v)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,tt,0,X):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,tt,0);else if(v.depthTexture.format===As)st(v)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,tt,0,X):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,tt,0);else throw new Error("Unknown depthTexture format")}function Yt(T){let v=n.get(T),B=T.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==T.depthTexture){let $=T.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),$){let tt=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,$.removeEventListener("dispose",tt)};$.addEventListener("dispose",tt),v.__depthDisposeCallback=tt}v.__boundDepthTexture=$}if(T.depthTexture&&!v.__autoAllocateDepthBuffer){if(B)throw new Error("target.depthTexture not supported in Cube render targets");let $=T.texture.mipmaps;$&&$.length>0?wt(v.__webglFramebuffer[0],T):wt(v.__webglFramebuffer,T)}else if(B){v.__webglDepthbuffer=[];for(let $=0;$<6;$++)if(e.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[$]),v.__webglDepthbuffer[$]===void 0)v.__webglDepthbuffer[$]=i.createRenderbuffer(),Pt(v.__webglDepthbuffer[$],T,!1);else{let tt=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,X=v.__webglDepthbuffer[$];i.bindRenderbuffer(i.RENDERBUFFER,X),i.framebufferRenderbuffer(i.FRAMEBUFFER,tt,i.RENDERBUFFER,X)}}else{let $=T.texture.mipmaps;if($&&$.length>0?e.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=i.createRenderbuffer(),Pt(v.__webglDepthbuffer,T,!1);else{let tt=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,X=v.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,X),i.framebufferRenderbuffer(i.FRAMEBUFFER,tt,i.RENDERBUFFER,X)}}e.bindFramebuffer(i.FRAMEBUFFER,null)}function le(T,v,B){let $=n.get(T);v!==void 0&&bt($.__webglFramebuffer,T,T.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),B!==void 0&&Yt(T)}function C(T){let v=T.texture,B=n.get(T),$=n.get(v);T.addEventListener("dispose",P);let tt=T.textures,X=T.isWebGLCubeRenderTarget===!0,Rt=tt.length>1;if(Rt||($.__webglTexture===void 0&&($.__webglTexture=i.createTexture()),$.__version=v.version,o.memory.textures++),X){B.__webglFramebuffer=[];for(let dt=0;dt<6;dt++)if(v.mipmaps&&v.mipmaps.length>0){B.__webglFramebuffer[dt]=[];for(let Et=0;Et<v.mipmaps.length;Et++)B.__webglFramebuffer[dt][Et]=i.createFramebuffer()}else B.__webglFramebuffer[dt]=i.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){B.__webglFramebuffer=[];for(let dt=0;dt<v.mipmaps.length;dt++)B.__webglFramebuffer[dt]=i.createFramebuffer()}else B.__webglFramebuffer=i.createFramebuffer();if(Rt)for(let dt=0,Et=tt.length;dt<Et;dt++){let Tt=n.get(tt[dt]);Tt.__webglTexture===void 0&&(Tt.__webglTexture=i.createTexture(),o.memory.textures++)}if(T.samples>0&&st(T)===!1){B.__webglMultisampledFramebuffer=i.createFramebuffer(),B.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let dt=0;dt<tt.length;dt++){let Et=tt[dt];B.__webglColorRenderbuffer[dt]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,B.__webglColorRenderbuffer[dt]);let Tt=r.convert(Et.format,Et.colorSpace),ot=r.convert(Et.type),_t=b(Et.internalFormat,Tt,ot,Et.colorSpace,T.isXRRenderTarget===!0),Nt=ut(T);i.renderbufferStorageMultisample(i.RENDERBUFFER,Nt,_t,T.width,T.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+dt,i.RENDERBUFFER,B.__webglColorRenderbuffer[dt])}i.bindRenderbuffer(i.RENDERBUFFER,null),T.depthBuffer&&(B.__webglDepthRenderbuffer=i.createRenderbuffer(),Pt(B.__webglDepthRenderbuffer,T,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(X){e.bindTexture(i.TEXTURE_CUBE_MAP,$.__webglTexture),yt(i.TEXTURE_CUBE_MAP,v);for(let dt=0;dt<6;dt++)if(v.mipmaps&&v.mipmaps.length>0)for(let Et=0;Et<v.mipmaps.length;Et++)bt(B.__webglFramebuffer[dt][Et],T,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+dt,Et);else bt(B.__webglFramebuffer[dt],T,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+dt,0);g(v)&&f(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Rt){for(let dt=0,Et=tt.length;dt<Et;dt++){let Tt=tt[dt],ot=n.get(Tt),_t=i.TEXTURE_2D;(T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(_t=T.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(_t,ot.__webglTexture),yt(_t,Tt),bt(B.__webglFramebuffer,T,Tt,i.COLOR_ATTACHMENT0+dt,_t,0),g(Tt)&&f(_t)}e.unbindTexture()}else{let dt=i.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(dt=T.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(dt,$.__webglTexture),yt(dt,v),v.mipmaps&&v.mipmaps.length>0)for(let Et=0;Et<v.mipmaps.length;Et++)bt(B.__webglFramebuffer[Et],T,v,i.COLOR_ATTACHMENT0,dt,Et);else bt(B.__webglFramebuffer,T,v,i.COLOR_ATTACHMENT0,dt,0);g(v)&&f(dt),e.unbindTexture()}T.depthBuffer&&Yt(T)}function et(T){let v=T.textures;for(let B=0,$=v.length;B<$;B++){let tt=v[B];if(g(tt)){let X=y(T),Rt=n.get(tt).__webglTexture;e.bindTexture(X,Rt),f(X),e.unbindTexture()}}}let J=[],j=[];function Z(T){if(T.samples>0){if(st(T)===!1){let v=T.textures,B=T.width,$=T.height,tt=i.COLOR_BUFFER_BIT,X=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Rt=n.get(T),dt=v.length>1;if(dt)for(let Tt=0;Tt<v.length;Tt++)e.bindFramebuffer(i.FRAMEBUFFER,Rt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Tt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,Rt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Tt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,Rt.__webglMultisampledFramebuffer);let Et=T.texture.mipmaps;Et&&Et.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Rt.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Rt.__webglFramebuffer);for(let Tt=0;Tt<v.length;Tt++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(tt|=i.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(tt|=i.STENCIL_BUFFER_BIT)),dt){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Rt.__webglColorRenderbuffer[Tt]);let ot=n.get(v[Tt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,ot,0)}i.blitFramebuffer(0,0,B,$,0,0,B,$,tt,i.NEAREST),l===!0&&(J.length=0,j.length=0,J.push(i.COLOR_ATTACHMENT0+Tt),T.depthBuffer&&T.resolveDepthBuffer===!1&&(J.push(X),j.push(X),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,j)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,J))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),dt)for(let Tt=0;Tt<v.length;Tt++){e.bindFramebuffer(i.FRAMEBUFFER,Rt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Tt,i.RENDERBUFFER,Rt.__webglColorRenderbuffer[Tt]);let ot=n.get(v[Tt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,Rt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Tt,i.TEXTURE_2D,ot,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Rt.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.resolveDepthBuffer===!1&&l){let v=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[v])}}}function ut(T){return Math.min(s.maxSamples,T.samples)}function st(T){let v=n.get(T);return T.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function ft(T){let v=o.render.frame;d.get(T)!==v&&(d.set(T,v),T.update())}function zt(T,v){let B=T.colorSpace,$=T.format,tt=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||B!==vi&&B!==Wn&&(jt.getTransfer(B)===ie?($!==ln||tt!==yn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",B)),v}function Ht(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(c.width=T.naturalWidth||T.width,c.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(c.width=T.displayWidth,c.height=T.displayHeight):(c.width=T.width,c.height=T.height),c}this.allocateTextureUnit=H,this.resetTextureUnits=D,this.setTexture2D=U,this.setTexture2DArray=z,this.setTexture3D=q,this.setTextureCube=V,this.rebindTextures=le,this.setupRenderTarget=C,this.updateRenderTargetMipmap=et,this.updateMultisampleRenderTarget=Z,this.setupDepthRenderbuffer=Yt,this.setupFrameBufferTexture=bt,this.useMultisampledRTT=st}function kx(i,t){function e(n,s=Wn){let r,o=jt.getTransfer(s);if(n===yn)return i.UNSIGNED_BYTE;if(n===pa)return i.UNSIGNED_SHORT_4_4_4_4;if(n===ma)return i.UNSIGNED_SHORT_5_5_5_1;if(n===hc)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===dc)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===lc)return i.BYTE;if(n===cc)return i.SHORT;if(n===ws)return i.UNSIGNED_SHORT;if(n===fa)return i.INT;if(n===ai)return i.UNSIGNED_INT;if(n===Cn)return i.FLOAT;if(n===Es)return i.HALF_FLOAT;if(n===uc)return i.ALPHA;if(n===fc)return i.RGB;if(n===ln)return i.RGBA;if(n===ls)return i.DEPTH_COMPONENT;if(n===As)return i.DEPTH_STENCIL;if(n===pc)return i.RED;if(n===ga)return i.RED_INTEGER;if(n===mc)return i.RG;if(n===xa)return i.RG_INTEGER;if(n===_a)return i.RGBA_INTEGER;if(n===Fr||n===Or||n===kr||n===Br)if(o===ie)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Fr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Or)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===kr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Br)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Fr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Or)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===kr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Br)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===va||n===ya||n===ba||n===Ma)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===va)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===ya)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===ba)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Ma)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Sa||n===wa||n===Ea)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Sa||n===wa)return o===ie?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Ea)return o===ie?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Ta||n===Aa||n===Ra||n===Ca||n===Pa||n===Ia||n===La||n===Da||n===Na||n===Ua||n===Fa||n===Oa||n===ka||n===Ba)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Ta)return o===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Aa)return o===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Ra)return o===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Ca)return o===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Pa)return o===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Ia)return o===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===La)return o===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Da)return o===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Na)return o===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Ua)return o===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Fa)return o===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Oa)return o===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===ka)return o===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Ba)return o===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Ha||n===za||n===Va)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Ha)return o===ie?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===za)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Va)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Ga||n===Wa||n===$a||n===Xa)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Ga)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Wa)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===$a)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Xa)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Ts?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}var Bx=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Hx=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,kc=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let n=new pr(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new vn({vertexShader:Bx,fragmentShader:Hx,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new fe(new Er(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Bc=class extends En{constructor(t,e){super();let n=this,s=null,r=1,o=null,a="local-floor",l=1,c=null,d=null,h=null,u=null,p=null,x=null,m=typeof XRWebGLBinding<"u",g=new kc,f={},y=e.getContextAttributes(),b=null,_=null,E=[],A=[],P=new K,L=null,w=new Ee;w.viewport=new ne;let S=new Ee;S.viewport=new ne;let I=[w,S],D=new na,H=null,O=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let it=E[Y];return it===void 0&&(it=new ps,E[Y]=it),it.getTargetRaySpace()},this.getControllerGrip=function(Y){let it=E[Y];return it===void 0&&(it=new ps,E[Y]=it),it.getGripSpace()},this.getHand=function(Y){let it=E[Y];return it===void 0&&(it=new ps,E[Y]=it),it.getHandSpace()};function U(Y){let it=A.indexOf(Y.inputSource);if(it===-1)return;let bt=E[it];bt!==void 0&&(bt.update(Y.inputSource,Y.frame,c||o),bt.dispatchEvent({type:Y.type,data:Y.inputSource}))}function z(){s.removeEventListener("select",U),s.removeEventListener("selectstart",U),s.removeEventListener("selectend",U),s.removeEventListener("squeeze",U),s.removeEventListener("squeezestart",U),s.removeEventListener("squeezeend",U),s.removeEventListener("end",z),s.removeEventListener("inputsourceschange",q);for(let Y=0;Y<E.length;Y++){let it=A[Y];it!==null&&(A[Y]=null,E[Y].disconnect(it))}H=null,O=null,g.reset();for(let Y in f)delete f[Y];t.setRenderTarget(b),p=null,u=null,h=null,s=null,_=null,Ot.stop(),n.isPresenting=!1,t.setPixelRatio(L),t.setSize(P.width,P.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){r=Y,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){a=Y,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(Y){c=Y},this.getBaseLayer=function(){return u!==null?u:p},this.getBinding=function(){return h===null&&m&&(h=new XRWebGLBinding(s,e)),h},this.getFrame=function(){return x},this.getSession=function(){return s},this.setSession=async function(Y){if(s=Y,s!==null){if(b=t.getRenderTarget(),s.addEventListener("select",U),s.addEventListener("selectstart",U),s.addEventListener("selectend",U),s.addEventListener("squeeze",U),s.addEventListener("squeezestart",U),s.addEventListener("squeezeend",U),s.addEventListener("end",z),s.addEventListener("inputsourceschange",q),y.xrCompatible!==!0&&await e.makeXRCompatible(),L=t.getPixelRatio(),t.getSize(P),m&&"createProjectionLayer"in XRWebGLBinding.prototype){let bt=null,Pt=null,wt=null;y.depth&&(wt=y.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,bt=y.stencil?As:ls,Pt=y.stencil?Ts:ai);let Yt={colorFormat:e.RGBA8,depthFormat:wt,scaleFactor:r};h=this.getBinding(),u=h.createProjectionLayer(Yt),s.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),_=new Tn(u.textureWidth,u.textureHeight,{format:ln,type:yn,depthTexture:new fr(u.textureWidth,u.textureHeight,Pt,void 0,void 0,void 0,void 0,void 0,void 0,bt),stencilBuffer:y.stencil,colorSpace:t.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{let bt={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,e,bt),s.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),_=new Tn(p.framebufferWidth,p.framebufferHeight,{format:ln,type:yn,colorSpace:t.outputColorSpace,stencilBuffer:y.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),Ot.setContext(s),Ot.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function q(Y){for(let it=0;it<Y.removed.length;it++){let bt=Y.removed[it],Pt=A.indexOf(bt);Pt>=0&&(A[Pt]=null,E[Pt].disconnect(bt))}for(let it=0;it<Y.added.length;it++){let bt=Y.added[it],Pt=A.indexOf(bt);if(Pt===-1){for(let Yt=0;Yt<E.length;Yt++)if(Yt>=A.length){A.push(bt),Pt=Yt;break}else if(A[Yt]===null){A[Yt]=bt,Pt=Yt;break}if(Pt===-1)break}let wt=E[Pt];wt&&wt.connect(bt)}}let V=new R,rt=new R;function nt(Y,it,bt){V.setFromMatrixPosition(it.matrixWorld),rt.setFromMatrixPosition(bt.matrixWorld);let Pt=V.distanceTo(rt),wt=it.projectionMatrix.elements,Yt=bt.projectionMatrix.elements,le=wt[14]/(wt[10]-1),C=wt[14]/(wt[10]+1),et=(wt[9]+1)/wt[5],J=(wt[9]-1)/wt[5],j=(wt[8]-1)/wt[0],Z=(Yt[8]+1)/Yt[0],ut=le*j,st=le*Z,ft=Pt/(-j+Z),zt=ft*-j;if(it.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(zt),Y.translateZ(ft),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert(),wt[10]===-1)Y.projectionMatrix.copy(it.projectionMatrix),Y.projectionMatrixInverse.copy(it.projectionMatrixInverse);else{let Ht=le+ft,T=C+ft,v=ut-zt,B=st+(Pt-zt),$=et*C/T*Ht,tt=J*C/T*Ht;Y.projectionMatrix.makePerspective(v,B,$,tt,Ht,T),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}}function ht(Y,it){it===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(it.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(s===null)return;let it=Y.near,bt=Y.far;g.texture!==null&&(g.depthNear>0&&(it=g.depthNear),g.depthFar>0&&(bt=g.depthFar)),D.near=S.near=w.near=it,D.far=S.far=w.far=bt,(H!==D.near||O!==D.far)&&(s.updateRenderState({depthNear:D.near,depthFar:D.far}),H=D.near,O=D.far),D.layers.mask=Y.layers.mask|6,w.layers.mask=D.layers.mask&3,S.layers.mask=D.layers.mask&5;let Pt=Y.parent,wt=D.cameras;ht(D,Pt);for(let Yt=0;Yt<wt.length;Yt++)ht(wt[Yt],Pt);wt.length===2?nt(D,w,S):D.projectionMatrix.copy(w.projectionMatrix),yt(Y,D,Pt)};function yt(Y,it,bt){bt===null?Y.matrix.copy(it.matrixWorld):(Y.matrix.copy(bt.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(it.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(it.projectionMatrix),Y.projectionMatrixInverse.copy(it.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=cs*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return D},this.getFoveation=function(){if(!(u===null&&p===null))return l},this.setFoveation=function(Y){l=Y,u!==null&&(u.fixedFoveation=Y),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=Y)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(D)},this.getCameraTexture=function(Y){return f[Y]};let Bt=null;function Ut(Y,it){if(d=it.getViewerPose(c||o),x=it,d!==null){let bt=d.views;p!==null&&(t.setRenderTargetFramebuffer(_,p.framebuffer),t.setRenderTarget(_));let Pt=!1;bt.length!==D.cameras.length&&(D.cameras.length=0,Pt=!0);for(let C=0;C<bt.length;C++){let et=bt[C],J=null;if(p!==null)J=p.getViewport(et);else{let Z=h.getViewSubImage(u,et);J=Z.viewport,C===0&&(t.setRenderTargetTextures(_,Z.colorTexture,Z.depthStencilTexture),t.setRenderTarget(_))}let j=I[C];j===void 0&&(j=new Ee,j.layers.enable(C),j.viewport=new ne,I[C]=j),j.matrix.fromArray(et.transform.matrix),j.matrix.decompose(j.position,j.quaternion,j.scale),j.projectionMatrix.fromArray(et.projectionMatrix),j.projectionMatrixInverse.copy(j.projectionMatrix).invert(),j.viewport.set(J.x,J.y,J.width,J.height),C===0&&(D.matrix.copy(j.matrix),D.matrix.decompose(D.position,D.quaternion,D.scale)),Pt===!0&&D.cameras.push(j)}let wt=s.enabledFeatures;if(wt&&wt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&m){h=n.getBinding();let C=h.getDepthInformation(bt[0]);C&&C.isValid&&C.texture&&g.init(C,s.renderState)}if(wt&&wt.includes("camera-access")&&m){t.state.unbindTexture(),h=n.getBinding();for(let C=0;C<bt.length;C++){let et=bt[C].camera;if(et){let J=f[et];J||(J=new pr,f[et]=J);let j=h.getCameraImage(et);J.sourceTexture=j}}}}for(let bt=0;bt<E.length;bt++){let Pt=A[bt],wt=E[bt];Pt!==null&&wt!==void 0&&wt.update(Pt,it,c||o)}Bt&&Bt(Y,it),it.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:it}),x=null}let Ot=new su;Ot.setAnimationLoop(Ut),this.setAnimationLoop=function(Y){Bt=Y},this.dispose=function(){}}},Di=new _n,zx=new se;function Vx(i,t){function e(g,f){g.matrixAutoUpdate===!0&&g.updateMatrix(),f.value.copy(g.matrix)}function n(g,f){f.color.getRGB(g.fogColor.value,bc(i)),f.isFog?(g.fogNear.value=f.near,g.fogFar.value=f.far):f.isFogExp2&&(g.fogDensity.value=f.density)}function s(g,f,y,b,_){f.isMeshBasicMaterial||f.isMeshLambertMaterial?r(g,f):f.isMeshToonMaterial?(r(g,f),h(g,f)):f.isMeshPhongMaterial?(r(g,f),d(g,f)):f.isMeshStandardMaterial?(r(g,f),u(g,f),f.isMeshPhysicalMaterial&&p(g,f,_)):f.isMeshMatcapMaterial?(r(g,f),x(g,f)):f.isMeshDepthMaterial?r(g,f):f.isMeshDistanceMaterial?(r(g,f),m(g,f)):f.isMeshNormalMaterial?r(g,f):f.isLineBasicMaterial?(o(g,f),f.isLineDashedMaterial&&a(g,f)):f.isPointsMaterial?l(g,f,y,b):f.isSpriteMaterial?c(g,f):f.isShadowMaterial?(g.color.value.copy(f.color),g.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(g,f){g.opacity.value=f.opacity,f.color&&g.diffuse.value.copy(f.color),f.emissive&&g.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(g.map.value=f.map,e(f.map,g.mapTransform)),f.alphaMap&&(g.alphaMap.value=f.alphaMap,e(f.alphaMap,g.alphaMapTransform)),f.bumpMap&&(g.bumpMap.value=f.bumpMap,e(f.bumpMap,g.bumpMapTransform),g.bumpScale.value=f.bumpScale,f.side===ze&&(g.bumpScale.value*=-1)),f.normalMap&&(g.normalMap.value=f.normalMap,e(f.normalMap,g.normalMapTransform),g.normalScale.value.copy(f.normalScale),f.side===ze&&g.normalScale.value.negate()),f.displacementMap&&(g.displacementMap.value=f.displacementMap,e(f.displacementMap,g.displacementMapTransform),g.displacementScale.value=f.displacementScale,g.displacementBias.value=f.displacementBias),f.emissiveMap&&(g.emissiveMap.value=f.emissiveMap,e(f.emissiveMap,g.emissiveMapTransform)),f.specularMap&&(g.specularMap.value=f.specularMap,e(f.specularMap,g.specularMapTransform)),f.alphaTest>0&&(g.alphaTest.value=f.alphaTest);let y=t.get(f),b=y.envMap,_=y.envMapRotation;b&&(g.envMap.value=b,Di.copy(_),Di.x*=-1,Di.y*=-1,Di.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(Di.y*=-1,Di.z*=-1),g.envMapRotation.value.setFromMatrix4(zx.makeRotationFromEuler(Di)),g.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=f.reflectivity,g.ior.value=f.ior,g.refractionRatio.value=f.refractionRatio),f.lightMap&&(g.lightMap.value=f.lightMap,g.lightMapIntensity.value=f.lightMapIntensity,e(f.lightMap,g.lightMapTransform)),f.aoMap&&(g.aoMap.value=f.aoMap,g.aoMapIntensity.value=f.aoMapIntensity,e(f.aoMap,g.aoMapTransform))}function o(g,f){g.diffuse.value.copy(f.color),g.opacity.value=f.opacity,f.map&&(g.map.value=f.map,e(f.map,g.mapTransform))}function a(g,f){g.dashSize.value=f.dashSize,g.totalSize.value=f.dashSize+f.gapSize,g.scale.value=f.scale}function l(g,f,y,b){g.diffuse.value.copy(f.color),g.opacity.value=f.opacity,g.size.value=f.size*y,g.scale.value=b*.5,f.map&&(g.map.value=f.map,e(f.map,g.uvTransform)),f.alphaMap&&(g.alphaMap.value=f.alphaMap,e(f.alphaMap,g.alphaMapTransform)),f.alphaTest>0&&(g.alphaTest.value=f.alphaTest)}function c(g,f){g.diffuse.value.copy(f.color),g.opacity.value=f.opacity,g.rotation.value=f.rotation,f.map&&(g.map.value=f.map,e(f.map,g.mapTransform)),f.alphaMap&&(g.alphaMap.value=f.alphaMap,e(f.alphaMap,g.alphaMapTransform)),f.alphaTest>0&&(g.alphaTest.value=f.alphaTest)}function d(g,f){g.specular.value.copy(f.specular),g.shininess.value=Math.max(f.shininess,1e-4)}function h(g,f){f.gradientMap&&(g.gradientMap.value=f.gradientMap)}function u(g,f){g.metalness.value=f.metalness,f.metalnessMap&&(g.metalnessMap.value=f.metalnessMap,e(f.metalnessMap,g.metalnessMapTransform)),g.roughness.value=f.roughness,f.roughnessMap&&(g.roughnessMap.value=f.roughnessMap,e(f.roughnessMap,g.roughnessMapTransform)),f.envMap&&(g.envMapIntensity.value=f.envMapIntensity)}function p(g,f,y){g.ior.value=f.ior,f.sheen>0&&(g.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),g.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(g.sheenColorMap.value=f.sheenColorMap,e(f.sheenColorMap,g.sheenColorMapTransform)),f.sheenRoughnessMap&&(g.sheenRoughnessMap.value=f.sheenRoughnessMap,e(f.sheenRoughnessMap,g.sheenRoughnessMapTransform))),f.clearcoat>0&&(g.clearcoat.value=f.clearcoat,g.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(g.clearcoatMap.value=f.clearcoatMap,e(f.clearcoatMap,g.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,e(f.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(g.clearcoatNormalMap.value=f.clearcoatNormalMap,e(f.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===ze&&g.clearcoatNormalScale.value.negate())),f.dispersion>0&&(g.dispersion.value=f.dispersion),f.iridescence>0&&(g.iridescence.value=f.iridescence,g.iridescenceIOR.value=f.iridescenceIOR,g.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(g.iridescenceMap.value=f.iridescenceMap,e(f.iridescenceMap,g.iridescenceMapTransform)),f.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=f.iridescenceThicknessMap,e(f.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),f.transmission>0&&(g.transmission.value=f.transmission,g.transmissionSamplerMap.value=y.texture,g.transmissionSamplerSize.value.set(y.width,y.height),f.transmissionMap&&(g.transmissionMap.value=f.transmissionMap,e(f.transmissionMap,g.transmissionMapTransform)),g.thickness.value=f.thickness,f.thicknessMap&&(g.thicknessMap.value=f.thicknessMap,e(f.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=f.attenuationDistance,g.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(g.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(g.anisotropyMap.value=f.anisotropyMap,e(f.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=f.specularIntensity,g.specularColor.value.copy(f.specularColor),f.specularColorMap&&(g.specularColorMap.value=f.specularColorMap,e(f.specularColorMap,g.specularColorMapTransform)),f.specularIntensityMap&&(g.specularIntensityMap.value=f.specularIntensityMap,e(f.specularIntensityMap,g.specularIntensityMapTransform))}function x(g,f){f.matcap&&(g.matcap.value=f.matcap)}function m(g,f){let y=t.get(f).light;g.referencePosition.value.setFromMatrixPosition(y.matrixWorld),g.nearDistance.value=y.shadow.camera.near,g.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Gx(i,t,e,n){let s={},r={},o=[],a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(y,b){let _=b.program;n.uniformBlockBinding(y,_)}function c(y,b){let _=s[y.id];_===void 0&&(x(y),_=d(y),s[y.id]=_,y.addEventListener("dispose",g));let E=b.program;n.updateUBOMapping(y,E);let A=t.render.frame;r[y.id]!==A&&(u(y),r[y.id]=A)}function d(y){let b=h();y.__bindingPointIndex=b;let _=i.createBuffer(),E=y.__size,A=y.usage;return i.bindBuffer(i.UNIFORM_BUFFER,_),i.bufferData(i.UNIFORM_BUFFER,E,A),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,b,_),_}function h(){for(let y=0;y<a;y++)if(o.indexOf(y)===-1)return o.push(y),y;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(y){let b=s[y.id],_=y.uniforms,E=y.__cache;i.bindBuffer(i.UNIFORM_BUFFER,b);for(let A=0,P=_.length;A<P;A++){let L=Array.isArray(_[A])?_[A]:[_[A]];for(let w=0,S=L.length;w<S;w++){let I=L[w];if(p(I,A,w,E)===!0){let D=I.__offset,H=Array.isArray(I.value)?I.value:[I.value],O=0;for(let U=0;U<H.length;U++){let z=H[U],q=m(z);typeof z=="number"||typeof z=="boolean"?(I.__data[0]=z,i.bufferSubData(i.UNIFORM_BUFFER,D+O,I.__data)):z.isMatrix3?(I.__data[0]=z.elements[0],I.__data[1]=z.elements[1],I.__data[2]=z.elements[2],I.__data[3]=0,I.__data[4]=z.elements[3],I.__data[5]=z.elements[4],I.__data[6]=z.elements[5],I.__data[7]=0,I.__data[8]=z.elements[6],I.__data[9]=z.elements[7],I.__data[10]=z.elements[8],I.__data[11]=0):(z.toArray(I.__data,O),O+=q.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,D,I.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(y,b,_,E){let A=y.value,P=b+"_"+_;if(E[P]===void 0)return typeof A=="number"||typeof A=="boolean"?E[P]=A:E[P]=A.clone(),!0;{let L=E[P];if(typeof A=="number"||typeof A=="boolean"){if(L!==A)return E[P]=A,!0}else if(L.equals(A)===!1)return L.copy(A),!0}return!1}function x(y){let b=y.uniforms,_=0,E=16;for(let P=0,L=b.length;P<L;P++){let w=Array.isArray(b[P])?b[P]:[b[P]];for(let S=0,I=w.length;S<I;S++){let D=w[S],H=Array.isArray(D.value)?D.value:[D.value];for(let O=0,U=H.length;O<U;O++){let z=H[O],q=m(z),V=_%E,rt=V%q.boundary,nt=V+rt;_+=rt,nt!==0&&E-nt<q.storage&&(_+=E-nt),D.__data=new Float32Array(q.storage/Float32Array.BYTES_PER_ELEMENT),D.__offset=_,_+=q.storage}}}let A=_%E;return A>0&&(_+=E-A),y.__size=_,y.__cache={},this}function m(y){let b={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(b.boundary=4,b.storage=4):y.isVector2?(b.boundary=8,b.storage=8):y.isVector3||y.isColor?(b.boundary=16,b.storage=12):y.isVector4?(b.boundary=16,b.storage=16):y.isMatrix3?(b.boundary=48,b.storage=48):y.isMatrix4?(b.boundary=64,b.storage=64):y.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",y),b}function g(y){let b=y.target;b.removeEventListener("dispose",g);let _=o.indexOf(b.__bindingPointIndex);o.splice(_,1),i.deleteBuffer(s[b.id]),delete s[b.id],delete r[b.id]}function f(){for(let y in s)i.deleteBuffer(s[y]);o=[],s={},r={}}return{bind:l,update:c,dispose:f}}var Is=class{constructor(t={}){let{canvas:e=Ed(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:u=!1}=t;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=o;let x=new Uint32Array(4),m=new Int32Array(4),g=null,f=null,y=[],b=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Gn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let _=this,E=!1;this._outputColorSpace=be;let A=0,P=0,L=null,w=-1,S=null,I=new ne,D=new ne,H=null,O=new kt(0),U=0,z=e.width,q=e.height,V=1,rt=null,nt=null,ht=new ne(0,0,z,q),yt=new ne(0,0,z,q),Bt=!1,Ut=new gs,Ot=!1,Y=!1,it=new se,bt=new R,Pt=new ne,wt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Yt=!1;function le(){return L===null?V:1}let C=n;function et(M,F){return e.getContext(M,F)}try{let M={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:d,failIfMajorPerformanceCaveat:h};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"180"}`),e.addEventListener("webglcontextlost",pt,!1),e.addEventListener("webglcontextrestored",Mt,!1),e.addEventListener("webglcontextcreationerror",at,!1),C===null){let F="webgl2";if(C=et(F,M),C===null)throw et(F)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(M){throw console.error("THREE.WebGLRenderer: "+M.message),M}let J,j,Z,ut,st,ft,zt,Ht,T,v,B,$,tt,X,Rt,dt,Et,Tt,ot,_t,Nt,Ct,gt,Wt;function N(){J=new a0(C),J.init(),Ct=new kx(C,J),j=new t0(C,J,t,Ct),Z=new Fx(C,J),j.reversedDepthBuffer&&u&&Z.buffers.depth.setReversed(!0),ut=new h0(C),st=new Sx,ft=new Ox(C,J,Z,st,j,Ct,ut),zt=new n0(_),Ht=new o0(_),T=new gp(C),gt=new Jg(C,T),v=new l0(C,T,ut,gt),B=new u0(C,v,T,ut),ot=new d0(C,j,ft),dt=new e0(st),$=new Mx(_,zt,Ht,J,j,gt,dt),tt=new Vx(_,st),X=new Ex,Rt=new Ix(J),Tt=new Kg(_,zt,Ht,Z,B,p,l),Et=new Nx(_,B,j),Wt=new Gx(C,ut,j,Z),_t=new Qg(C,J,ut),Nt=new c0(C,J,ut),ut.programs=$.programs,_.capabilities=j,_.extensions=J,_.properties=st,_.renderLists=X,_.shadowMap=Et,_.state=Z,_.info=ut}N();let ct=new Bc(_,C);this.xr=ct,this.getContext=function(){return C},this.getContextAttributes=function(){return C.getContextAttributes()},this.forceContextLoss=function(){let M=J.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){let M=J.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return V},this.setPixelRatio=function(M){M!==void 0&&(V=M,this.setSize(z,q,!1))},this.getSize=function(M){return M.set(z,q)},this.setSize=function(M,F,G=!0){if(ct.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}z=M,q=F,e.width=Math.floor(M*V),e.height=Math.floor(F*V),G===!0&&(e.style.width=M+"px",e.style.height=F+"px"),this.setViewport(0,0,M,F)},this.getDrawingBufferSize=function(M){return M.set(z*V,q*V).floor()},this.setDrawingBufferSize=function(M,F,G){z=M,q=F,V=G,e.width=Math.floor(M*G),e.height=Math.floor(F*G),this.setViewport(0,0,M,F)},this.getCurrentViewport=function(M){return M.copy(I)},this.getViewport=function(M){return M.copy(ht)},this.setViewport=function(M,F,G,W){M.isVector4?ht.set(M.x,M.y,M.z,M.w):ht.set(M,F,G,W),Z.viewport(I.copy(ht).multiplyScalar(V).round())},this.getScissor=function(M){return M.copy(yt)},this.setScissor=function(M,F,G,W){M.isVector4?yt.set(M.x,M.y,M.z,M.w):yt.set(M,F,G,W),Z.scissor(D.copy(yt).multiplyScalar(V).round())},this.getScissorTest=function(){return Bt},this.setScissorTest=function(M){Z.setScissorTest(Bt=M)},this.setOpaqueSort=function(M){rt=M},this.setTransparentSort=function(M){nt=M},this.getClearColor=function(M){return M.copy(Tt.getClearColor())},this.setClearColor=function(){Tt.setClearColor(...arguments)},this.getClearAlpha=function(){return Tt.getClearAlpha()},this.setClearAlpha=function(){Tt.setClearAlpha(...arguments)},this.clear=function(M=!0,F=!0,G=!0){let W=0;if(M){let k=!1;if(L!==null){let lt=L.texture.format;k=lt===_a||lt===xa||lt===ga}if(k){let lt=L.texture.type,xt=lt===yn||lt===ai||lt===ws||lt===Ts||lt===pa||lt===ma,St=Tt.getClearColor(),vt=Tt.getClearAlpha(),Dt=St.r,Ft=St.g,It=St.b;xt?(x[0]=Dt,x[1]=Ft,x[2]=It,x[3]=vt,C.clearBufferuiv(C.COLOR,0,x)):(m[0]=Dt,m[1]=Ft,m[2]=It,m[3]=vt,C.clearBufferiv(C.COLOR,0,m))}else W|=C.COLOR_BUFFER_BIT}F&&(W|=C.DEPTH_BUFFER_BIT),G&&(W|=C.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),C.clear(W)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",pt,!1),e.removeEventListener("webglcontextrestored",Mt,!1),e.removeEventListener("webglcontextcreationerror",at,!1),Tt.dispose(),X.dispose(),Rt.dispose(),st.dispose(),zt.dispose(),Ht.dispose(),B.dispose(),gt.dispose(),Wt.dispose(),$.dispose(),ct.dispose(),ct.removeEventListener("sessionstart",bn),ct.removeEventListener("sessionend",Jc),ci.stop()};function pt(M){M.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),E=!0}function Mt(){console.log("THREE.WebGLRenderer: Context Restored."),E=!1;let M=ut.autoReset,F=Et.enabled,G=Et.autoUpdate,W=Et.needsUpdate,k=Et.type;N(),ut.autoReset=M,Et.enabled=F,Et.autoUpdate=G,Et.needsUpdate=W,Et.type=k}function at(M){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function Q(M){let F=M.target;F.removeEventListener("dispose",Q),At(F)}function At(M){Vt(M),st.remove(M)}function Vt(M){let F=st.get(M).programs;F!==void 0&&(F.forEach(function(G){$.releaseProgram(G)}),M.isShaderMaterial&&$.releaseShaderCache(M))}this.renderBufferDirect=function(M,F,G,W,k,lt){F===null&&(F=wt);let xt=k.isMesh&&k.matrixWorld.determinant()<0,St=Fu(M,F,G,W,k);Z.setMaterial(W,xt);let vt=G.index,Dt=1;if(W.wireframe===!0){if(vt=v.getWireframeAttribute(G),vt===void 0)return;Dt=2}let Ft=G.drawRange,It=G.attributes.position,Zt=Ft.start*Dt,re=(Ft.start+Ft.count)*Dt;lt!==null&&(Zt=Math.max(Zt,lt.start*Dt),re=Math.min(re,(lt.start+lt.count)*Dt)),vt!==null?(Zt=Math.max(Zt,0),re=Math.min(re,vt.count)):It!=null&&(Zt=Math.max(Zt,0),re=Math.min(re,It.count));let _e=re-Zt;if(_e<0||_e===1/0)return;gt.setup(k,W,St,G,vt);let de,ae=_t;if(vt!==null&&(de=T.get(vt),ae=Nt,ae.setIndex(de)),k.isMesh)W.wireframe===!0?(Z.setLineWidth(W.wireframeLinewidth*le()),ae.setMode(C.LINES)):ae.setMode(C.TRIANGLES);else if(k.isLine){let Lt=W.linewidth;Lt===void 0&&(Lt=1),Z.setLineWidth(Lt*le()),k.isLineSegments?ae.setMode(C.LINES):k.isLineLoop?ae.setMode(C.LINE_LOOP):ae.setMode(C.LINE_STRIP)}else k.isPoints?ae.setMode(C.POINTS):k.isSprite&&ae.setMode(C.TRIANGLES);if(k.isBatchedMesh)if(k._multiDrawInstances!==null)ds("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),ae.renderMultiDrawInstances(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount,k._multiDrawInstances);else if(J.get("WEBGL_multi_draw"))ae.renderMultiDraw(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount);else{let Lt=k._multiDrawStarts,pe=k._multiDrawCounts,Jt=k._multiDrawCount,$e=vt?T.get(vt).bytesPerElement:1,Oi=st.get(W).currentProgram.getUniforms();for(let Xe=0;Xe<Jt;Xe++)Oi.setValue(C,"_gl_DrawID",Xe),ae.render(Lt[Xe]/$e,pe[Xe])}else if(k.isInstancedMesh)ae.renderInstances(Zt,_e,k.count);else if(G.isInstancedBufferGeometry){let Lt=G._maxInstanceCount!==void 0?G._maxInstanceCount:1/0,pe=Math.min(G.instanceCount,Lt);ae.renderInstances(Zt,_e,pe)}else ae.render(Zt,_e)};function ce(M,F,G){M.transparent===!0&&M.side===an&&M.forceSinglePass===!1?(M.side=ze,M.needsUpdate=!0,Wr(M,F,G),M.side=gn,M.needsUpdate=!0,Wr(M,F,G),M.side=an):Wr(M,F,G)}this.compile=function(M,F,G=null){G===null&&(G=M),f=Rt.get(G),f.init(F),b.push(f),G.traverseVisible(function(k){k.isLight&&k.layers.test(F.layers)&&(f.pushLight(k),k.castShadow&&f.pushShadow(k))}),M!==G&&M.traverseVisible(function(k){k.isLight&&k.layers.test(F.layers)&&(f.pushLight(k),k.castShadow&&f.pushShadow(k))}),f.setupLights();let W=new Set;return M.traverse(function(k){if(!(k.isMesh||k.isPoints||k.isLine||k.isSprite))return;let lt=k.material;if(lt)if(Array.isArray(lt))for(let xt=0;xt<lt.length;xt++){let St=lt[xt];ce(St,G,k),W.add(St)}else ce(lt,G,k),W.add(lt)}),f=b.pop(),W},this.compileAsync=function(M,F,G=null){let W=this.compile(M,F,G);return new Promise(k=>{function lt(){if(W.forEach(function(xt){st.get(xt).currentProgram.isReady()&&W.delete(xt)}),W.size===0){k(M);return}setTimeout(lt,10)}J.get("KHR_parallel_shader_compile")!==null?lt():setTimeout(lt,10)})};let te=null;function Ln(M){te&&te(M)}function bn(){ci.stop()}function Jc(){ci.start()}let ci=new su;ci.setAnimationLoop(Ln),typeof self<"u"&&ci.setContext(self),this.setAnimationLoop=function(M){te=M,ct.setAnimationLoop(M),M===null?ci.stop():ci.start()},ct.addEventListener("sessionstart",bn),ct.addEventListener("sessionend",Jc),this.render=function(M,F){if(F!==void 0&&F.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(E===!0)return;if(M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),ct.enabled===!0&&ct.isPresenting===!0&&(ct.cameraAutoUpdate===!0&&ct.updateCamera(F),F=ct.getCamera()),M.isScene===!0&&M.onBeforeRender(_,M,F,L),f=Rt.get(M,b.length),f.init(F),b.push(f),it.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),Ut.setFromProjectionMatrix(it,mn,F.reversedDepth),Y=this.localClippingEnabled,Ot=dt.init(this.clippingPlanes,Y),g=X.get(M,y.length),g.init(),y.push(g),ct.enabled===!0&&ct.isPresenting===!0){let lt=_.xr.getDepthSensingMesh();lt!==null&&dl(lt,F,-1/0,_.sortObjects)}dl(M,F,0,_.sortObjects),g.finish(),_.sortObjects===!0&&g.sort(rt,nt),Yt=ct.enabled===!1||ct.isPresenting===!1||ct.hasDepthSensing()===!1,Yt&&Tt.addToRenderList(g,M),this.info.render.frame++,Ot===!0&&dt.beginShadows();let G=f.state.shadowsArray;Et.render(G,M,F),Ot===!0&&dt.endShadows(),this.info.autoReset===!0&&this.info.reset();let W=g.opaque,k=g.transmissive;if(f.setupLights(),F.isArrayCamera){let lt=F.cameras;if(k.length>0)for(let xt=0,St=lt.length;xt<St;xt++){let vt=lt[xt];th(W,k,M,vt)}Yt&&Tt.render(M);for(let xt=0,St=lt.length;xt<St;xt++){let vt=lt[xt];Qc(g,M,vt,vt.viewport)}}else k.length>0&&th(W,k,M,F),Yt&&Tt.render(M),Qc(g,M,F);L!==null&&P===0&&(ft.updateMultisampleRenderTarget(L),ft.updateRenderTargetMipmap(L)),M.isScene===!0&&M.onAfterRender(_,M,F),gt.resetDefaultState(),w=-1,S=null,b.pop(),b.length>0?(f=b[b.length-1],Ot===!0&&dt.setGlobalState(_.clippingPlanes,f.state.camera)):f=null,y.pop(),y.length>0?g=y[y.length-1]:g=null};function dl(M,F,G,W){if(M.visible===!1)return;if(M.layers.test(F.layers)){if(M.isGroup)G=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(F);else if(M.isLight)f.pushLight(M),M.castShadow&&f.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||Ut.intersectsSprite(M)){W&&Pt.setFromMatrixPosition(M.matrixWorld).applyMatrix4(it);let xt=B.update(M),St=M.material;St.visible&&g.push(M,xt,St,G,Pt.z,null)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||Ut.intersectsObject(M))){let xt=B.update(M),St=M.material;if(W&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),Pt.copy(M.boundingSphere.center)):(xt.boundingSphere===null&&xt.computeBoundingSphere(),Pt.copy(xt.boundingSphere.center)),Pt.applyMatrix4(M.matrixWorld).applyMatrix4(it)),Array.isArray(St)){let vt=xt.groups;for(let Dt=0,Ft=vt.length;Dt<Ft;Dt++){let It=vt[Dt],Zt=St[It.materialIndex];Zt&&Zt.visible&&g.push(M,xt,Zt,G,Pt.z,It)}}else St.visible&&g.push(M,xt,St,G,Pt.z,null)}}let lt=M.children;for(let xt=0,St=lt.length;xt<St;xt++)dl(lt[xt],F,G,W)}function Qc(M,F,G,W){let k=M.opaque,lt=M.transmissive,xt=M.transparent;f.setupLightsView(G),Ot===!0&&dt.setGlobalState(_.clippingPlanes,G),W&&Z.viewport(I.copy(W)),k.length>0&&Gr(k,F,G),lt.length>0&&Gr(lt,F,G),xt.length>0&&Gr(xt,F,G),Z.buffers.depth.setTest(!0),Z.buffers.depth.setMask(!0),Z.buffers.color.setMask(!0),Z.setPolygonOffset(!1)}function th(M,F,G,W){if((G.isScene===!0?G.overrideMaterial:null)!==null)return;f.state.transmissionRenderTarget[W.id]===void 0&&(f.state.transmissionRenderTarget[W.id]=new Tn(1,1,{generateMipmaps:!0,type:J.has("EXT_color_buffer_half_float")||J.has("EXT_color_buffer_float")?Es:yn,minFilter:oi,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:jt.workingColorSpace}));let lt=f.state.transmissionRenderTarget[W.id],xt=W.viewport||I;lt.setSize(xt.z*_.transmissionResolutionScale,xt.w*_.transmissionResolutionScale);let St=_.getRenderTarget(),vt=_.getActiveCubeFace(),Dt=_.getActiveMipmapLevel();_.setRenderTarget(lt),_.getClearColor(O),U=_.getClearAlpha(),U<1&&_.setClearColor(16777215,.5),_.clear(),Yt&&Tt.render(G);let Ft=_.toneMapping;_.toneMapping=Gn;let It=W.viewport;if(W.viewport!==void 0&&(W.viewport=void 0),f.setupLightsView(W),Ot===!0&&dt.setGlobalState(_.clippingPlanes,W),Gr(M,G,W),ft.updateMultisampleRenderTarget(lt),ft.updateRenderTargetMipmap(lt),J.has("WEBGL_multisampled_render_to_texture")===!1){let Zt=!1;for(let re=0,_e=F.length;re<_e;re++){let de=F[re],ae=de.object,Lt=de.geometry,pe=de.material,Jt=de.group;if(pe.side===an&&ae.layers.test(W.layers)){let $e=pe.side;pe.side=ze,pe.needsUpdate=!0,eh(ae,G,W,Lt,pe,Jt),pe.side=$e,pe.needsUpdate=!0,Zt=!0}}Zt===!0&&(ft.updateMultisampleRenderTarget(lt),ft.updateRenderTargetMipmap(lt))}_.setRenderTarget(St,vt,Dt),_.setClearColor(O,U),It!==void 0&&(W.viewport=It),_.toneMapping=Ft}function Gr(M,F,G){let W=F.isScene===!0?F.overrideMaterial:null;for(let k=0,lt=M.length;k<lt;k++){let xt=M[k],St=xt.object,vt=xt.geometry,Dt=xt.group,Ft=xt.material;Ft.allowOverride===!0&&W!==null&&(Ft=W),St.layers.test(G.layers)&&eh(St,F,G,vt,Ft,Dt)}}function eh(M,F,G,W,k,lt){M.onBeforeRender(_,F,G,W,k,lt),M.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),k.onBeforeRender(_,F,G,W,M,lt),k.transparent===!0&&k.side===an&&k.forceSinglePass===!1?(k.side=ze,k.needsUpdate=!0,_.renderBufferDirect(G,F,W,k,M,lt),k.side=gn,k.needsUpdate=!0,_.renderBufferDirect(G,F,W,k,M,lt),k.side=an):_.renderBufferDirect(G,F,W,k,M,lt),M.onAfterRender(_,F,G,W,k,lt)}function Wr(M,F,G){F.isScene!==!0&&(F=wt);let W=st.get(M),k=f.state.lights,lt=f.state.shadowsArray,xt=k.state.version,St=$.getParameters(M,k.state,lt,F,G),vt=$.getProgramCacheKey(St),Dt=W.programs;W.environment=M.isMeshStandardMaterial?F.environment:null,W.fog=F.fog,W.envMap=(M.isMeshStandardMaterial?Ht:zt).get(M.envMap||W.environment),W.envMapRotation=W.environment!==null&&M.envMap===null?F.environmentRotation:M.envMapRotation,Dt===void 0&&(M.addEventListener("dispose",Q),Dt=new Map,W.programs=Dt);let Ft=Dt.get(vt);if(Ft!==void 0){if(W.currentProgram===Ft&&W.lightsStateVersion===xt)return ih(M,St),Ft}else St.uniforms=$.getUniforms(M),M.onBeforeCompile(St,_),Ft=$.acquireProgram(St,vt),Dt.set(vt,Ft),W.uniforms=St.uniforms;let It=W.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(It.clippingPlanes=dt.uniform),ih(M,St),W.needsLights=ku(M),W.lightsStateVersion=xt,W.needsLights&&(It.ambientLightColor.value=k.state.ambient,It.lightProbe.value=k.state.probe,It.directionalLights.value=k.state.directional,It.directionalLightShadows.value=k.state.directionalShadow,It.spotLights.value=k.state.spot,It.spotLightShadows.value=k.state.spotShadow,It.rectAreaLights.value=k.state.rectArea,It.ltc_1.value=k.state.rectAreaLTC1,It.ltc_2.value=k.state.rectAreaLTC2,It.pointLights.value=k.state.point,It.pointLightShadows.value=k.state.pointShadow,It.hemisphereLights.value=k.state.hemi,It.directionalShadowMap.value=k.state.directionalShadowMap,It.directionalShadowMatrix.value=k.state.directionalShadowMatrix,It.spotShadowMap.value=k.state.spotShadowMap,It.spotLightMatrix.value=k.state.spotLightMatrix,It.spotLightMap.value=k.state.spotLightMap,It.pointShadowMap.value=k.state.pointShadowMap,It.pointShadowMatrix.value=k.state.pointShadowMatrix),W.currentProgram=Ft,W.uniformsList=null,Ft}function nh(M){if(M.uniformsList===null){let F=M.currentProgram.getUniforms();M.uniformsList=Ps.seqWithValue(F.seq,M.uniforms)}return M.uniformsList}function ih(M,F){let G=st.get(M);G.outputColorSpace=F.outputColorSpace,G.batching=F.batching,G.batchingColor=F.batchingColor,G.instancing=F.instancing,G.instancingColor=F.instancingColor,G.instancingMorph=F.instancingMorph,G.skinning=F.skinning,G.morphTargets=F.morphTargets,G.morphNormals=F.morphNormals,G.morphColors=F.morphColors,G.morphTargetsCount=F.morphTargetsCount,G.numClippingPlanes=F.numClippingPlanes,G.numIntersection=F.numClipIntersection,G.vertexAlphas=F.vertexAlphas,G.vertexTangents=F.vertexTangents,G.toneMapping=F.toneMapping}function Fu(M,F,G,W,k){F.isScene!==!0&&(F=wt),ft.resetTextureUnits();let lt=F.fog,xt=W.isMeshStandardMaterial?F.environment:null,St=L===null?_.outputColorSpace:L.isXRRenderTarget===!0?L.texture.colorSpace:vi,vt=(W.isMeshStandardMaterial?Ht:zt).get(W.envMap||xt),Dt=W.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,Ft=!!G.attributes.tangent&&(!!W.normalMap||W.anisotropy>0),It=!!G.morphAttributes.position,Zt=!!G.morphAttributes.normal,re=!!G.morphAttributes.color,_e=Gn;W.toneMapped&&(L===null||L.isXRRenderTarget===!0)&&(_e=_.toneMapping);let de=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,ae=de!==void 0?de.length:0,Lt=st.get(W),pe=f.state.lights;if(Ot===!0&&(Y===!0||M!==S)){let ke=M===S&&W.id===w;dt.setState(W,M,ke)}let Jt=!1;W.version===Lt.__version?(Lt.needsLights&&Lt.lightsStateVersion!==pe.state.version||Lt.outputColorSpace!==St||k.isBatchedMesh&&Lt.batching===!1||!k.isBatchedMesh&&Lt.batching===!0||k.isBatchedMesh&&Lt.batchingColor===!0&&k.colorTexture===null||k.isBatchedMesh&&Lt.batchingColor===!1&&k.colorTexture!==null||k.isInstancedMesh&&Lt.instancing===!1||!k.isInstancedMesh&&Lt.instancing===!0||k.isSkinnedMesh&&Lt.skinning===!1||!k.isSkinnedMesh&&Lt.skinning===!0||k.isInstancedMesh&&Lt.instancingColor===!0&&k.instanceColor===null||k.isInstancedMesh&&Lt.instancingColor===!1&&k.instanceColor!==null||k.isInstancedMesh&&Lt.instancingMorph===!0&&k.morphTexture===null||k.isInstancedMesh&&Lt.instancingMorph===!1&&k.morphTexture!==null||Lt.envMap!==vt||W.fog===!0&&Lt.fog!==lt||Lt.numClippingPlanes!==void 0&&(Lt.numClippingPlanes!==dt.numPlanes||Lt.numIntersection!==dt.numIntersection)||Lt.vertexAlphas!==Dt||Lt.vertexTangents!==Ft||Lt.morphTargets!==It||Lt.morphNormals!==Zt||Lt.morphColors!==re||Lt.toneMapping!==_e||Lt.morphTargetsCount!==ae)&&(Jt=!0):(Jt=!0,Lt.__version=W.version);let $e=Lt.currentProgram;Jt===!0&&($e=Wr(W,F,k));let Oi=!1,Xe=!1,Bs=!1,me=$e.getUniforms(),Je=Lt.uniforms;if(Z.useProgram($e.program)&&(Oi=!0,Xe=!0,Bs=!0),W.id!==w&&(w=W.id,Xe=!0),Oi||S!==M){Z.buffers.depth.getReversed()&&M.reversedDepth!==!0&&(M._reversedDepth=!0,M.updateProjectionMatrix()),me.setValue(C,"projectionMatrix",M.projectionMatrix),me.setValue(C,"viewMatrix",M.matrixWorldInverse);let Ve=me.map.cameraPosition;Ve!==void 0&&Ve.setValue(C,bt.setFromMatrixPosition(M.matrixWorld)),j.logarithmicDepthBuffer&&me.setValue(C,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),(W.isMeshPhongMaterial||W.isMeshToonMaterial||W.isMeshLambertMaterial||W.isMeshBasicMaterial||W.isMeshStandardMaterial||W.isShaderMaterial)&&me.setValue(C,"isOrthographic",M.isOrthographicCamera===!0),S!==M&&(S=M,Xe=!0,Bs=!0)}if(k.isSkinnedMesh){me.setOptional(C,k,"bindMatrix"),me.setOptional(C,k,"bindMatrixInverse");let ke=k.skeleton;ke&&(ke.boneTexture===null&&ke.computeBoneTexture(),me.setValue(C,"boneTexture",ke.boneTexture,ft))}k.isBatchedMesh&&(me.setOptional(C,k,"batchingTexture"),me.setValue(C,"batchingTexture",k._matricesTexture,ft),me.setOptional(C,k,"batchingIdTexture"),me.setValue(C,"batchingIdTexture",k._indirectTexture,ft),me.setOptional(C,k,"batchingColorTexture"),k._colorsTexture!==null&&me.setValue(C,"batchingColorTexture",k._colorsTexture,ft));let Qe=G.morphAttributes;if((Qe.position!==void 0||Qe.normal!==void 0||Qe.color!==void 0)&&ot.update(k,G,$e),(Xe||Lt.receiveShadow!==k.receiveShadow)&&(Lt.receiveShadow=k.receiveShadow,me.setValue(C,"receiveShadow",k.receiveShadow)),W.isMeshGouraudMaterial&&W.envMap!==null&&(Je.envMap.value=vt,Je.flipEnvMap.value=vt.isCubeTexture&&vt.isRenderTargetTexture===!1?-1:1),W.isMeshStandardMaterial&&W.envMap===null&&F.environment!==null&&(Je.envMapIntensity.value=F.environmentIntensity),Xe&&(me.setValue(C,"toneMappingExposure",_.toneMappingExposure),Lt.needsLights&&Ou(Je,Bs),lt&&W.fog===!0&&tt.refreshFogUniforms(Je,lt),tt.refreshMaterialUniforms(Je,W,V,q,f.state.transmissionRenderTarget[M.id]),Ps.upload(C,nh(Lt),Je,ft)),W.isShaderMaterial&&W.uniformsNeedUpdate===!0&&(Ps.upload(C,nh(Lt),Je,ft),W.uniformsNeedUpdate=!1),W.isSpriteMaterial&&me.setValue(C,"center",k.center),me.setValue(C,"modelViewMatrix",k.modelViewMatrix),me.setValue(C,"normalMatrix",k.normalMatrix),me.setValue(C,"modelMatrix",k.matrixWorld),W.isShaderMaterial||W.isRawShaderMaterial){let ke=W.uniformsGroups;for(let Ve=0,ul=ke.length;Ve<ul;Ve++){let hi=ke[Ve];Wt.update(hi,$e),Wt.bind(hi,$e)}}return $e}function Ou(M,F){M.ambientLightColor.needsUpdate=F,M.lightProbe.needsUpdate=F,M.directionalLights.needsUpdate=F,M.directionalLightShadows.needsUpdate=F,M.pointLights.needsUpdate=F,M.pointLightShadows.needsUpdate=F,M.spotLights.needsUpdate=F,M.spotLightShadows.needsUpdate=F,M.rectAreaLights.needsUpdate=F,M.hemisphereLights.needsUpdate=F}function ku(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return P},this.getRenderTarget=function(){return L},this.setRenderTargetTextures=function(M,F,G){let W=st.get(M);W.__autoAllocateDepthBuffer=M.resolveDepthBuffer===!1,W.__autoAllocateDepthBuffer===!1&&(W.__useRenderToTexture=!1),st.get(M.texture).__webglTexture=F,st.get(M.depthTexture).__webglTexture=W.__autoAllocateDepthBuffer?void 0:G,W.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(M,F){let G=st.get(M);G.__webglFramebuffer=F,G.__useDefaultFramebuffer=F===void 0};let Bu=C.createFramebuffer();this.setRenderTarget=function(M,F=0,G=0){L=M,A=F,P=G;let W=!0,k=null,lt=!1,xt=!1;if(M){let vt=st.get(M);if(vt.__useDefaultFramebuffer!==void 0)Z.bindFramebuffer(C.FRAMEBUFFER,null),W=!1;else if(vt.__webglFramebuffer===void 0)ft.setupRenderTarget(M);else if(vt.__hasExternalTextures)ft.rebindTextures(M,st.get(M.texture).__webglTexture,st.get(M.depthTexture).__webglTexture);else if(M.depthBuffer){let It=M.depthTexture;if(vt.__boundDepthTexture!==It){if(It!==null&&st.has(It)&&(M.width!==It.image.width||M.height!==It.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");ft.setupDepthRenderbuffer(M)}}let Dt=M.texture;(Dt.isData3DTexture||Dt.isDataArrayTexture||Dt.isCompressedArrayTexture)&&(xt=!0);let Ft=st.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(Ft[F])?k=Ft[F][G]:k=Ft[F],lt=!0):M.samples>0&&ft.useMultisampledRTT(M)===!1?k=st.get(M).__webglMultisampledFramebuffer:Array.isArray(Ft)?k=Ft[G]:k=Ft,I.copy(M.viewport),D.copy(M.scissor),H=M.scissorTest}else I.copy(ht).multiplyScalar(V).floor(),D.copy(yt).multiplyScalar(V).floor(),H=Bt;if(G!==0&&(k=Bu),Z.bindFramebuffer(C.FRAMEBUFFER,k)&&W&&Z.drawBuffers(M,k),Z.viewport(I),Z.scissor(D),Z.setScissorTest(H),lt){let vt=st.get(M.texture);C.framebufferTexture2D(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_CUBE_MAP_POSITIVE_X+F,vt.__webglTexture,G)}else if(xt){let vt=F;for(let Dt=0;Dt<M.textures.length;Dt++){let Ft=st.get(M.textures[Dt]);C.framebufferTextureLayer(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0+Dt,Ft.__webglTexture,G,vt)}}else if(M!==null&&G!==0){let vt=st.get(M.texture);C.framebufferTexture2D(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,vt.__webglTexture,G)}w=-1},this.readRenderTargetPixels=function(M,F,G,W,k,lt,xt,St=0){if(!(M&&M.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let vt=st.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&xt!==void 0&&(vt=vt[xt]),vt){Z.bindFramebuffer(C.FRAMEBUFFER,vt);try{let Dt=M.textures[St],Ft=Dt.format,It=Dt.type;if(!j.textureFormatReadable(Ft)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!j.textureTypeReadable(It)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=M.width-W&&G>=0&&G<=M.height-k&&(M.textures.length>1&&C.readBuffer(C.COLOR_ATTACHMENT0+St),C.readPixels(F,G,W,k,Ct.convert(Ft),Ct.convert(It),lt))}finally{let Dt=L!==null?st.get(L).__webglFramebuffer:null;Z.bindFramebuffer(C.FRAMEBUFFER,Dt)}}},this.readRenderTargetPixelsAsync=async function(M,F,G,W,k,lt,xt,St=0){if(!(M&&M.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let vt=st.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&xt!==void 0&&(vt=vt[xt]),vt)if(F>=0&&F<=M.width-W&&G>=0&&G<=M.height-k){Z.bindFramebuffer(C.FRAMEBUFFER,vt);let Dt=M.textures[St],Ft=Dt.format,It=Dt.type;if(!j.textureFormatReadable(Ft))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!j.textureTypeReadable(It))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let Zt=C.createBuffer();C.bindBuffer(C.PIXEL_PACK_BUFFER,Zt),C.bufferData(C.PIXEL_PACK_BUFFER,lt.byteLength,C.STREAM_READ),M.textures.length>1&&C.readBuffer(C.COLOR_ATTACHMENT0+St),C.readPixels(F,G,W,k,Ct.convert(Ft),Ct.convert(It),0);let re=L!==null?st.get(L).__webglFramebuffer:null;Z.bindFramebuffer(C.FRAMEBUFFER,re);let _e=C.fenceSync(C.SYNC_GPU_COMMANDS_COMPLETE,0);return C.flush(),await Td(C,_e,4),C.bindBuffer(C.PIXEL_PACK_BUFFER,Zt),C.getBufferSubData(C.PIXEL_PACK_BUFFER,0,lt),C.deleteBuffer(Zt),C.deleteSync(_e),lt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(M,F=null,G=0){let W=Math.pow(2,-G),k=Math.floor(M.image.width*W),lt=Math.floor(M.image.height*W),xt=F!==null?F.x:0,St=F!==null?F.y:0;ft.setTexture2D(M,0),C.copyTexSubImage2D(C.TEXTURE_2D,G,0,0,xt,St,k,lt),Z.unbindTexture()};let Hu=C.createFramebuffer(),zu=C.createFramebuffer();this.copyTextureToTexture=function(M,F,G=null,W=null,k=0,lt=null){lt===null&&(k!==0?(ds("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),lt=k,k=0):lt=0);let xt,St,vt,Dt,Ft,It,Zt,re,_e,de=M.isCompressedTexture?M.mipmaps[lt]:M.image;if(G!==null)xt=G.max.x-G.min.x,St=G.max.y-G.min.y,vt=G.isBox3?G.max.z-G.min.z:1,Dt=G.min.x,Ft=G.min.y,It=G.isBox3?G.min.z:0;else{let Qe=Math.pow(2,-k);xt=Math.floor(de.width*Qe),St=Math.floor(de.height*Qe),M.isDataArrayTexture?vt=de.depth:M.isData3DTexture?vt=Math.floor(de.depth*Qe):vt=1,Dt=0,Ft=0,It=0}W!==null?(Zt=W.x,re=W.y,_e=W.z):(Zt=0,re=0,_e=0);let ae=Ct.convert(F.format),Lt=Ct.convert(F.type),pe;F.isData3DTexture?(ft.setTexture3D(F,0),pe=C.TEXTURE_3D):F.isDataArrayTexture||F.isCompressedArrayTexture?(ft.setTexture2DArray(F,0),pe=C.TEXTURE_2D_ARRAY):(ft.setTexture2D(F,0),pe=C.TEXTURE_2D),C.pixelStorei(C.UNPACK_FLIP_Y_WEBGL,F.flipY),C.pixelStorei(C.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),C.pixelStorei(C.UNPACK_ALIGNMENT,F.unpackAlignment);let Jt=C.getParameter(C.UNPACK_ROW_LENGTH),$e=C.getParameter(C.UNPACK_IMAGE_HEIGHT),Oi=C.getParameter(C.UNPACK_SKIP_PIXELS),Xe=C.getParameter(C.UNPACK_SKIP_ROWS),Bs=C.getParameter(C.UNPACK_SKIP_IMAGES);C.pixelStorei(C.UNPACK_ROW_LENGTH,de.width),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,de.height),C.pixelStorei(C.UNPACK_SKIP_PIXELS,Dt),C.pixelStorei(C.UNPACK_SKIP_ROWS,Ft),C.pixelStorei(C.UNPACK_SKIP_IMAGES,It);let me=M.isDataArrayTexture||M.isData3DTexture,Je=F.isDataArrayTexture||F.isData3DTexture;if(M.isDepthTexture){let Qe=st.get(M),ke=st.get(F),Ve=st.get(Qe.__renderTarget),ul=st.get(ke.__renderTarget);Z.bindFramebuffer(C.READ_FRAMEBUFFER,Ve.__webglFramebuffer),Z.bindFramebuffer(C.DRAW_FRAMEBUFFER,ul.__webglFramebuffer);for(let hi=0;hi<vt;hi++)me&&(C.framebufferTextureLayer(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,st.get(M).__webglTexture,k,It+hi),C.framebufferTextureLayer(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,st.get(F).__webglTexture,lt,_e+hi)),C.blitFramebuffer(Dt,Ft,xt,St,Zt,re,xt,St,C.DEPTH_BUFFER_BIT,C.NEAREST);Z.bindFramebuffer(C.READ_FRAMEBUFFER,null),Z.bindFramebuffer(C.DRAW_FRAMEBUFFER,null)}else if(k!==0||M.isRenderTargetTexture||st.has(M)){let Qe=st.get(M),ke=st.get(F);Z.bindFramebuffer(C.READ_FRAMEBUFFER,Hu),Z.bindFramebuffer(C.DRAW_FRAMEBUFFER,zu);for(let Ve=0;Ve<vt;Ve++)me?C.framebufferTextureLayer(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,Qe.__webglTexture,k,It+Ve):C.framebufferTexture2D(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,Qe.__webglTexture,k),Je?C.framebufferTextureLayer(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,ke.__webglTexture,lt,_e+Ve):C.framebufferTexture2D(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,ke.__webglTexture,lt),k!==0?C.blitFramebuffer(Dt,Ft,xt,St,Zt,re,xt,St,C.COLOR_BUFFER_BIT,C.NEAREST):Je?C.copyTexSubImage3D(pe,lt,Zt,re,_e+Ve,Dt,Ft,xt,St):C.copyTexSubImage2D(pe,lt,Zt,re,Dt,Ft,xt,St);Z.bindFramebuffer(C.READ_FRAMEBUFFER,null),Z.bindFramebuffer(C.DRAW_FRAMEBUFFER,null)}else Je?M.isDataTexture||M.isData3DTexture?C.texSubImage3D(pe,lt,Zt,re,_e,xt,St,vt,ae,Lt,de.data):F.isCompressedArrayTexture?C.compressedTexSubImage3D(pe,lt,Zt,re,_e,xt,St,vt,ae,de.data):C.texSubImage3D(pe,lt,Zt,re,_e,xt,St,vt,ae,Lt,de):M.isDataTexture?C.texSubImage2D(C.TEXTURE_2D,lt,Zt,re,xt,St,ae,Lt,de.data):M.isCompressedTexture?C.compressedTexSubImage2D(C.TEXTURE_2D,lt,Zt,re,de.width,de.height,ae,de.data):C.texSubImage2D(C.TEXTURE_2D,lt,Zt,re,xt,St,ae,Lt,de);C.pixelStorei(C.UNPACK_ROW_LENGTH,Jt),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,$e),C.pixelStorei(C.UNPACK_SKIP_PIXELS,Oi),C.pixelStorei(C.UNPACK_SKIP_ROWS,Xe),C.pixelStorei(C.UNPACK_SKIP_IMAGES,Bs),lt===0&&F.generateMipmaps&&C.generateMipmap(pe),Z.unbindTexture()},this.initRenderTarget=function(M){st.get(M).__webglFramebuffer===void 0&&ft.setupRenderTarget(M)},this.initTexture=function(M){M.isCubeTexture?ft.setTextureCube(M,0):M.isData3DTexture?ft.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?ft.setTexture2DArray(M,0):ft.setTexture2D(M,0),Z.unbindTexture()},this.resetState=function(){A=0,P=0,L=null,Z.reset(),gt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return mn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=jt._getDrawingBufferColorSpace(t),e.unpackColorSpace=jt._getUnpackColorSpace()}};var cu={type:"change"},Vc={type:"start"},du={type:"end"},Ja=new Qn,hu=new nn,Wx=Math.cos(70*Pi.DEG2RAD),Ce=new R,We=2*Math.PI,oe={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},zc=1e-6,Qa=class extends Lr{constructor(t,e=null){super(t,e),this.state=oe.NONE,this.target=new R,this.cursor=new R,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:si.ROTATE,MIDDLE:si.DOLLY,RIGHT:si.PAN},this.touches={ONE:ri.ROTATE,TWO:ri.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new R,this._lastQuaternion=new rn,this._lastTargetPosition=new R,this._quat=new rn().setFromUnitVectors(t.up,new R(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Ss,this._sphericalDelta=new Ss,this._scale=1,this._panOffset=new R,this._rotateStart=new K,this._rotateEnd=new K,this._rotateDelta=new K,this._panStart=new K,this._panEnd=new K,this._panDelta=new K,this._dollyStart=new K,this._dollyEnd=new K,this._dollyDelta=new K,this._dollyDirection=new R,this._mouse=new K,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Xx.bind(this),this._onPointerDown=$x.bind(this),this._onPointerUp=qx.bind(this),this._onContextMenu=t_.bind(this),this._onMouseWheel=jx.bind(this),this._onKeyDown=Kx.bind(this),this._onTouchStart=Jx.bind(this),this._onTouchMove=Qx.bind(this),this._onMouseDown=Yx.bind(this),this._onMouseMove=Zx.bind(this),this._interceptControlDown=e_.bind(this),this._interceptControlUp=n_.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(cu),this.update(),this.state=oe.NONE}update(t=null){let e=this.object.position;Ce.copy(e).sub(this.target),Ce.applyQuaternion(this._quat),this._spherical.setFromVector3(Ce),this.autoRotate&&this.state===oe.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=We:n>Math.PI&&(n-=We),s<-Math.PI?s+=We:s>Math.PI&&(s-=We),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(Ce.setFromSpherical(this._spherical),Ce.applyQuaternion(this._quatInverse),e.copy(this.target).add(Ce),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){let a=Ce.length();o=this._clampDistance(a*this._scale);let l=a-o;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){let a=new R(this._mouse.x,this._mouse.y,0);a.unproject(this.object);let l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;let c=new R(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(a),this.object.updateMatrixWorld(),o=Ce.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(Ja.origin.copy(this.object.position),Ja.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Ja.direction))<Wx?this.object.lookAt(this.target):(hu.setFromNormalAndCoplanarPoint(this.object.up,this.target),Ja.intersectPlane(hu,this.target))))}else if(this.object.isOrthographicCamera){let o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>zc||8*(1-this._lastQuaternion.dot(this.object.quaternion))>zc||this._lastTargetPosition.distanceToSquared(this.target)>zc?(this.dispatchEvent(cu),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?We/60*this.autoRotateSpeed*t:We/60/60*this.autoRotateSpeed}_getZoomScale(t){let e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){Ce.setFromMatrixColumn(e,0),Ce.multiplyScalar(-t),this._panOffset.add(Ce)}_panUp(t,e){this.screenSpacePanning===!0?Ce.setFromMatrixColumn(e,1):(Ce.setFromMatrixColumn(e,0),Ce.crossVectors(this.object.up,Ce)),Ce.multiplyScalar(t),this._panOffset.add(Ce)}_pan(t,e){let n=this.domElement;if(this.object.isPerspectiveCamera){let s=this.object.position;Ce.copy(s).sub(this.target);let r=Ce.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/n.clientHeight,this.object.matrix),this._panUp(2*e*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),s=t-n.left,r=e-n.top,o=n.width,a=n.height;this._mouse.x=s/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(We*this._rotateDelta.x/e.clientHeight),this._rotateUp(We*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(We*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-We*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(We*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-We*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(n,s)}}_handleTouchStartDolly(t){let e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{let n=this._getSecondPointerPosition(t),s=.5*(t.pageX+n.x),r=.5*(t.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(We*this._rotateDelta.x/e.clientHeight),this._rotateUp(We*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){let e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let o=(t.pageX+e.x)*.5,a=(t.pageY+e.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new K,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){let e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){let e=t.deltaMode,n={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}};function $x(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i)))}function Xx(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function qx(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(du),this.state=oe.NONE;break;case 1:let t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function Yx(i){let t;switch(i.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case si.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=oe.DOLLY;break;case si.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=oe.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=oe.ROTATE}break;case si.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=oe.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=oe.PAN}break;default:this.state=oe.NONE}this.state!==oe.NONE&&this.dispatchEvent(Vc)}function Zx(i){switch(this.state){case oe.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case oe.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case oe.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function jx(i){this.enabled===!1||this.enableZoom===!1||this.state!==oe.NONE||(i.preventDefault(),this.dispatchEvent(Vc),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(du))}function Kx(i){this.enabled!==!1&&this._handleKeyDown(i)}function Jx(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case ri.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=oe.TOUCH_ROTATE;break;case ri.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=oe.TOUCH_PAN;break;default:this.state=oe.NONE}break;case 2:switch(this.touches.TWO){case ri.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=oe.TOUCH_DOLLY_PAN;break;case ri.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=oe.TOUCH_DOLLY_ROTATE;break;default:this.state=oe.NONE}break;default:this.state=oe.NONE}this.state!==oe.NONE&&this.dispatchEvent(Vc)}function Qx(i){switch(this._trackPointer(i),this.state){case oe.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case oe.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case oe.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case oe.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=oe.NONE}}function t_(i){this.enabled!==!1&&i.preventDefault()}function e_(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function n_(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}var Ns=class extends we{constructor(t=document.createElement("div")){super(),this.isCSS2DObject=!0,this.element=t,this.element.style.position="absolute",this.element.style.userSelect="none",this.element.setAttribute("draggable",!1),this.center=new K(.5,.5),this.addEventListener("removed",function(){this.traverse(function(e){e.element instanceof e.element.ownerDocument.defaultView.Element&&e.element.parentNode!==null&&e.element.remove()})})}copy(t,e){return super.copy(t,e),this.element=t.element.cloneNode(!0),this.center=t.center,this}},Ds=new R,uu=new se,fu=new se,pu=new R,mu=new R,tl=class{constructor(t={}){let e=this,n,s,r,o,a={objects:new WeakMap},l=t.element!==void 0?t.element:document.createElement("div");l.style.overflow="hidden",this.domElement=l,this.getSize=function(){return{width:n,height:s}},this.render=function(x,m){x.matrixWorldAutoUpdate===!0&&x.updateMatrixWorld(),m.parent===null&&m.matrixWorldAutoUpdate===!0&&m.updateMatrixWorld(),uu.copy(m.matrixWorldInverse),fu.multiplyMatrices(m.projectionMatrix,uu),d(x,x,m),p(x)},this.setSize=function(x,m){n=x,s=m,r=n/2,o=s/2,l.style.width=x+"px",l.style.height=m+"px"};function c(x){x.isCSS2DObject&&(x.element.style.display="none");for(let m=0,g=x.children.length;m<g;m++)c(x.children[m])}function d(x,m,g){if(x.visible===!1){c(x);return}if(x.isCSS2DObject){Ds.setFromMatrixPosition(x.matrixWorld),Ds.applyMatrix4(fu);let f=Ds.z>=-1&&Ds.z<=1&&x.layers.test(g.layers)===!0,y=x.element;y.style.display=f===!0?"":"none",f===!0&&(x.onBeforeRender(e,m,g),y.style.transform="translate("+-100*x.center.x+"%,"+-100*x.center.y+"%)translate("+(Ds.x*r+r)+"px,"+(-Ds.y*o+o)+"px)",y.parentNode!==l&&l.appendChild(y),x.onAfterRender(e,m,g));let b={distanceToCameraSquared:h(g,x)};a.objects.set(x,b)}for(let f=0,y=x.children.length;f<y;f++)d(x.children[f],m,g)}function h(x,m){return pu.setFromMatrixPosition(x.matrixWorld),mu.setFromMatrixPosition(m.matrixWorld),pu.distanceToSquared(mu)}function u(x){let m=[];return x.traverseVisible(function(g){g.isCSS2DObject&&m.push(g)}),m}function p(x){let m=u(x).sort(function(f,y){if(f.renderOrder!==y.renderOrder)return y.renderOrder-f.renderOrder;let b=a.objects.get(f).distanceToCameraSquared,_=a.objects.get(y).distanceToCameraSquared;return b-_}),g=m.length;for(let f=0,y=m.length;f<y;f++)m[f].element.style.zIndex=g-f}}};var i_={dark:{color:2960685,roughness:.6},metal:{color:12172739,roughness:.3,metalness:.7},white:{color:15987697,roughness:.6},ceramic:{color:16514043,roughness:.2},wood:{color:10779218,roughness:.7},stone:{color:3947840,roughness:.35},glass:{color:13626111,roughness:.05,transparent:!0,opacity:.28,depthWrite:!1},tinted:{color:1845043,roughness:.1,metalness:.4},screen:{color:724499,roughness:.2,metalness:.3},green:{color:4160819,roughness:.85},green2:{color:6069828,roughness:.85},pot:{color:11756863,roughness:.8},soil:{color:3877406,roughness:1},shade:{color:16774882,roughness:.8,emissive:16769704,emissiveIntensity:.35},basin:{color:14673128,roughness:.15},rubber:{color:1447446,roughness:.9},lamp_front:{color:16777215,emissive:16774352,emissiveIntensity:.8},lamp_rear:{color:12589080,emissive:9437184,emissiveIntensity:.6},hob:{color:4860458,roughness:.4},book0:{color:9056047,roughness:.8},book1:{color:3100554,roughness:.8},book2:{color:4029002,roughness:.8},book3:{color:13214247,roughness:.8}},Gc=class{constructor(t,e,n,s){this.W=t;this.D=e;this.H=n;this.main=s;this.group=new Ne;this.mats=new Map}mat(t){let e=this.mats.get(t);return e||(e=new Fe(i_[t]),this.mats.set(t,e)),e}accent(t=.18){let e=`accent${t}`,n=this.mats.get(e);if(!n){let s=this.main.clone();s.color.lerp(new kt(t>0?16777215:0),Math.abs(t)),n=s,this.mats.set(e,n)}return n}add(t,e,n,s,r){e.map&&(t=s_(t));let o=new fe(t,e);return o.position.set(n,s,r),this.group.add(o),o}box(t,e,n,s,r,o,a=this.main){s<=0||r<=0||o<=0||this.add(new Ge(s,r,o),a,t,e+r/2,n)}cyl(t,e,n,s,r,o,a=this.main,l=1,c=28){if(o<=0)return;let d=new ti(l,1,1,c);d.scale(s,o,r),this.add(d,a,t,e+o/2,n)}ball(t,e,n,s,r,o,a=this.main){let l=new wi(1,24,16);l.scale(s,r,o),this.add(l,a,t,e,n)}};function s_(i){let t=i.index?i.toNonIndexed():i,e=t.getAttribute("position"),n=new Float32Array(e.count*2),s=new R,r=new R,o=new R,a=new R;for(let l=0;l+2<e.count;l+=3){s.fromBufferAttribute(e,l),r.fromBufferAttribute(e,l+1),o.fromBufferAttribute(e,l+2),a.subVectors(r,s).cross(o.clone().sub(s));let c=Math.abs(a.x),d=Math.abs(a.y),h=Math.abs(a.z);for(let u=0;u<3;u++){let p=u===0?s:u===1?r:o,x=(l+u)*2;c>=d&&c>=h?(n[x]=p.z,n[x+1]=p.y):d>=h?(n[x]=p.x,n[x+1]=p.z):(n[x]=p.x,n[x+1]=p.y)}}return t.setAttribute("uv",new Ue(n,2)),t}var $c=["Grundformen","Wohnzimmer","Leuchten","K\xFCche & Essen","Schlafzimmer","Bad","B\xFCro","Sonstiges"];function gu(i,t){let{W:e,D:n,H:s}=i,r=.07,o=Math.min(.2,e*.14),a=Math.min(.45,s*.55),l=Math.min(.22,n*.25);for(let u of[-1,1])for(let p of[-1,1])i.cyl(u*(e/2-.07),0,p*(n/2-.07),.025,.025,r,i.mat("dark"));i.box(0,r,0,e,a-r-.12,n),i.box(0,r,-n/2+l/2,e,s-r,l);let c=Math.min(s*.78,a+.2);for(let u of[-1,1])i.box(u*(e/2-o/2),r,0,o,c-r,n);let d=e-2*o,h=d/t;for(let u=0;u<t;u++){let p=-d/2+h*(u+.5);i.box(p,a-.12,l/2,h-.02,.14,n-l-.02,i.accent()),i.box(p,a+.02,-n/2+l+.06,h-.03,(s-a)*.8,.12,i.accent())}}function Vr(i,t,e,n,s){let{W:r,D:o}=i;for(let a of[-1,1])for(let l of[-1,1])i.box(a*(r/2-n-e/2),0,l*(o/2-n-e/2),e,t,e,s)}function r_(i,t=i.main){let{W:e,D:n,H:s}=i;i.box(0,s-.04,0,e,.04,n,t),Vr(i,s-.04,.05,.04,t)}function xu(i,t){let{W:e,D:n,H:s}=i,r=.08,o=Math.min(.32,s*.4),a=Math.min(.52,s*.62),l=.07;Vr(i,r,.06,.03,i.mat("dark")),i.box(0,r,0,e,o-r,n),i.box(0,o,l/2,e-.06,a-o,n-l-.04,i.mat("white")),i.box(0,r,-n/2+l/2,e,s-r,l);let c=(e-.16)/t;for(let d=0;d<t;d++)i.box(-(e-.16)/2+c*(d+.5),a,-n/2+l+.24,c-.06,.12,.36,i.mat("ceramic"));i.box(0,a,n*.14,e-.03,.07,n*.66,i.accent(.35))}function _u(i,t,e,n="v"){let{W:s,D:r,H:o}=i;i.box(0,e,-.01,s,o-e,r-.02);let a=s/t;for(let l=0;l<t;l++){let c=-s/2+a*(l+.5);if(i.box(c,e+.01,r/2-.01,a-.006,o-e-.02,.02),n==="v"){let d=t===1||l%2===0?1:-1,h=Math.min(.3,(o-e)*.25);i.box(c+d*(a/2-.05),e+(o-e)/2-h/2,r/2+.012,.015,h,.02,i.mat("metal"))}else i.box(c,o-.08,r/2+.012,Math.min(.2,a*.5),.015,.02,i.mat("metal"))}}function vu(i,t,e){let{W:n,D:s,H:r}=i;i.box(0,e,-.01,n,r-e,s-.02);let o=(r-e)/t;for(let a=0;a<t;a++){let l=e+o*a;i.box(0,l+.006,s/2-.01,n-.02,o-.012,.02,i.accent(.08)),i.box(0,l+o/2-.008,s/2+.012,Math.min(.18,n*.4),.016,.02,i.mat("metal"))}}function yu(i,t){let{W:e,D:n,H:s}=i;i.box(0,0,-.04,e,.1,n-.08,i.mat("dark")),i.box(0,.1,-.01,e,s-.14,n-.02);let r=e/t;for(let o=0;o<t;o++){let a=-e/2+r*(o+.5);i.box(a,.11,n/2-.01,r-.006,s-.16,.02),i.box(a,s-.13,n/2+.012,Math.min(.25,r*.5),.015,.02,i.mat("metal"))}i.box(0,s-.04,.01,e,.04,n+.02,i.mat("stone"))}function bu(i,t,e,n,s=.7){i.cyl(0,t,0,n,n,e,i.mat("shade"),s)}var Us=[{id:"box",label:"W\xFCrfel / Quader",category:"Grundformen",w:60,d:60,h:60,color:"#9aa7b4",build:i=>i.box(0,0,0,i.W,i.H,i.D)},{id:"sphere",label:"Kugel",category:"Grundformen",w:60,d:60,h:60,color:"#9aa7b4",round:!0,build:i=>i.ball(0,i.H/2,0,i.W/2,i.H/2,i.D/2)},{id:"cylinder",label:"Zylinder",category:"Grundformen",w:50,d:50,h:80,color:"#9aa7b4",round:!0,build:i=>i.cyl(0,0,0,i.W/2,i.D/2,i.H,i.main,1,40)},{id:"cone",label:"Kegel",category:"Grundformen",w:50,d:50,h:80,color:"#9aa7b4",round:!0,build:i=>i.cyl(0,0,0,i.W/2,i.D/2,i.H,i.main,0,40)},{id:"pyramid",label:"Pyramide",category:"Grundformen",w:60,d:60,h:60,color:"#9aa7b4",build:i=>{let t=new gr(Math.SQRT1_2,1,4);t.rotateY(Math.PI/4),t.scale(i.W,i.H,i.D),i.add(t,i.main,0,i.H/2,0)}},{id:"torus",label:"Ring (Torus)",category:"Grundformen",w:60,d:60,h:18,color:"#9aa7b4",round:!0,build:i=>{let t=new ys(.35,.15,20,48);t.rotateX(Math.PI/2),t.scale(i.W,i.H/.3,i.D),i.add(t,i.main,0,i.H/2,0)}},{id:"hemisphere",label:"Halbkugel",category:"Grundformen",w:60,d:60,h:30,color:"#9aa7b4",round:!0,build:i=>{let t=new wi(1,32,12,0,Math.PI*2,0,Math.PI/2);t.scale(i.W/2,i.H,i.D/2),i.add(t,i.main,0,0,0);let e=new mr(1,32);e.rotateX(Math.PI/2),e.scale(i.W/2,1,i.D/2),i.add(e,i.main,0,.001,0)}},{id:"wedge",label:"Keil / Rampe",category:"Grundformen",w:60,d:100,h:40,color:"#9aa7b4",build:i=>{let t=new je([new K(-i.D/2,0),new K(i.D/2,0),new K(-i.D/2,i.H)]),e=new zn(t,{depth:i.W,bevelEnabled:!1});e.translate(0,0,-i.W/2),e.rotateY(-Math.PI/2),i.add(e,i.main,0,0,0)}},{id:"sofa",label:"Sofa",category:"Wohnzimmer",w:220,d:95,h:85,color:"#7b8794",build:i=>gu(i,i.W>1.8?3:2)},{id:"armchair",label:"Sessel",category:"Wohnzimmer",w:90,d:90,h:85,color:"#7b8794",build:i=>gu(i,1)},{id:"coffee_table",label:"Couchtisch",category:"Wohnzimmer",w:110,d:60,h:42,color:"#a47a52",build:i=>{i.box(0,i.H-.04,0,i.W,.04,i.D),i.box(0,.1,0,i.W-.1,.02,i.D-.1),Vr(i,i.H-.04,.035,.03,i.mat("dark"))}},{id:"tv_board",label:"TV-Board",category:"Wohnzimmer",w:180,d:40,h:50,color:"#e9e6df",build:i=>{Vr(i,.06,.04,.05,i.mat("dark")),i.box(0,.06,-.01,i.W,i.H-.06,i.D-.02);let t=Math.max(1,Math.round(i.W/.6)),e=i.W/t;for(let n=0;n<t;n++){let s=-i.W/2+e*(n+.5);i.box(s,.07,i.D/2-.01,e-.008,i.H-.08,.02,i.accent(-.06)),i.box(s,i.H-.07,i.D/2+.012,Math.min(.16,e*.4),.014,.02,i.mat("metal"))}}},{id:"tv",label:"Fernseher",category:"Wohnzimmer",w:120,d:8,h:72,z:50,color:"#222222",build:i=>{let t=Math.min(i.D,.05);i.box(0,0,0,i.W*.3,.015,Math.max(i.D,.2),i.mat("dark")),i.box(0,.015,0,.06,.06,.03,i.mat("dark")),i.box(0,.06,0,i.W,i.H-.06,t),i.box(0,.075,t/2+.001,i.W-.03,i.H-.09,.002,i.mat("screen"))}},{id:"shelf",label:"Regal",category:"Wohnzimmer",w:80,d:35,h:180,color:"#d9c3a0",build:i=>{let{W:t,D:e,H:n}=i;for(let l of[-1,1])i.box(l*(t/2-.01),0,0,.02,n,e);i.box(0,0,-e/2+.005,t,n,.01);let s=Math.max(2,Math.round(n/.36)),r=(n-.02)/s,o=3,a=()=>(o=o*16807%2147483647)/2147483647;for(let l=0;l<=s;l++){let c=l*r;if(i.box(0,c,0,t-.04,.02,e),l===s||l===0)continue;let d=-t/2+.03;for(;d<t/2-.08&&a()>.08;){let h=.025+a()*.025,u=Math.min(r-.04,.18+a()*.1);i.box(d+h/2,c+.02,.02,h,u,e*.7,i.mat(`book${Math.floor(a()*4)}`)),d+=h+.003,a()>.85&&(d+=.1)}}}},{id:"plant",label:"Pflanze",category:"Wohnzimmer",w:50,d:50,h:110,color:"#3f7d33",round:!0,build:i=>{let{W:t,D:e,H:n}=i,s=n*.3;i.cyl(0,0,0,t*.28,e*.28,s,i.mat("pot"),1.2),i.cyl(0,s-.01,0,t*.31,e*.31,.012,i.mat("soil"));let r=n-s,o=[[0,.55,0,.42,"main"],[.22,.4,.1,.3,"green2"],[-.2,.42,-.12,.3,"main"],[.05,.78,-.08,.28,"green2"],[-.1,.3,.2,.26,"main"]];for(let[a,l,c,d,h]of o)i.ball(a*t,s+l*r,c*e,d*t,d*r*.9,d*e,h==="main"?i.main:i.mat(h))}},{id:"rug",label:"Teppich",category:"Wohnzimmer",w:200,d:140,h:1,color:"#b5654a",build:i=>i.box(0,0,0,i.W,Math.max(i.H,.005),i.D)},{id:"floor_lamp",label:"Stehlampe",category:"Leuchten",w:40,d:40,h:170,color:"#2d2d2d",round:!0,build:i=>{let t=Math.min(i.W,i.D)/2;i.cyl(0,0,0,t*.7,t*.7,.03),i.cyl(0,.03,0,.012,.012,i.H-.33,i.mat("metal")),bu(i,i.H-.32,.32,t)}},{id:"table_lamp",label:"Tischleuchte",category:"Leuchten",w:30,d:30,h:45,z:50,color:"#c7b299",round:!0,build:i=>{let t=Math.min(i.W,i.D)/2;i.ball(0,i.H*.18,0,t*.55,i.H*.18,t*.55),i.cyl(0,i.H*.3,0,.01,.01,i.H*.3,i.mat("metal")),bu(i,i.H*.55,i.H*.45,t,.65)}},{id:"ceiling_lamp",label:"Deckenleuchte",category:"Leuchten",w:50,d:50,h:12,z:238,color:"#ffffff",round:!0,build:i=>{i.cyl(0,i.H*.75,0,i.W/2,i.D/2,i.H*.25);let t=new wi(1,32,10,0,Math.PI*2,Math.PI/2,Math.PI/2);t.scale(i.W/2-.01,i.H*.75,i.D/2-.01),i.add(t,i.mat("shade"),0,i.H*.75,0)}},{id:"pendant_lamp",label:"Pendelleuchte",category:"Leuchten",w:40,d:40,h:90,z:160,color:"#2d2d2d",round:!0,build:i=>{let t=Math.min(i.W,i.D)/2;i.cyl(0,.25,0,.004,.004,i.H-.25,i.mat("dark")),i.cyl(0,0,0,t,t,.25,i.main,.25),i.cyl(0,.002,0,t*.92,t*.92,.01,i.mat("shade"))}},{id:"dining_table",label:"Esstisch",category:"K\xFCche & Essen",w:160,d:90,h:75,color:"#a47a52",build:i=>r_(i)},{id:"round_table",label:"Runder Tisch",category:"K\xFCche & Essen",w:100,d:100,h:75,color:"#a47a52",round:!0,build:i=>{i.cyl(0,i.H-.04,0,i.W/2,i.D/2,.04,i.main,1,40),i.cyl(0,.03,0,.05,.05,i.H-.07,i.mat("dark")),i.cyl(0,0,0,i.W*.25,i.D*.25,.03,i.mat("dark"))}},{id:"chair",label:"Stuhl",category:"K\xFCche & Essen",w:45,d:50,h:90,color:"#a47a52",build:i=>{let{W:t,D:e,H:n}=i,s=Math.min(.46,n*.52);Vr(i,s-.04,.035,.02,i.main),i.box(0,s-.04,0,t,.04,e);for(let r of[-1,1])i.box(r*(t/2-.0375),s,-e/2+.0375,.035,n-s,.035);i.box(0,n-.22,-e/2+.03,t-.06,.18,.025)}},{id:"kitchen_base",label:"K\xFCchenzeile (Unterschrank)",category:"K\xFCche & Essen",w:120,d:60,h:90,color:"#f2f1ee",build:i=>yu(i,Math.max(1,Math.round(i.W/.6)))},{id:"kitchen_wall",label:"H\xE4ngeschrank",category:"K\xFCche & Essen",w:120,d:35,h:70,z:145,color:"#f2f1ee",build:i=>_u(i,Math.max(1,Math.round(i.W/.6)),0,"h")},{id:"kitchen_sink",label:"Sp\xFCle",category:"K\xFCche & Essen",w:80,d:60,h:90,color:"#f2f1ee",build:i=>{yu(i,Math.max(1,Math.round(i.W/.6))),i.box(0,i.H,.04,i.W*.6,.004,i.D*.55,i.mat("metal")),i.cyl(0,i.H,-i.D/2+.08,.015,.015,.28,i.mat("metal")),i.box(0,i.H+.26,-i.D/2+.16,.025,.025,.18,i.mat("metal"))}},{id:"stove",label:"Herd",category:"K\xFCche & Essen",w:60,d:60,h:90,color:"#f2f1ee",build:i=>{let{W:t,D:e,H:n}=i;i.box(0,0,-.04,t,.1,e-.08,i.mat("dark")),i.box(0,.1,-.01,t,n-.13,e-.02),i.box(0,n-.03,0,t,.03,e,i.mat("screen"));for(let s of[-1,1])for(let r of[-1,1])i.cyl(s*t*.22,n,r*e*.22,.085,.085,.002,i.mat("hob"));i.box(0,.16,e/2-.005,t-.06,n-.36,.012,i.mat("tinted")),i.box(0,n-.17,e/2+.02,t-.14,.02,.02,i.mat("metal"))}},{id:"fridge",label:"K\xFChlschrank",category:"K\xFCche & Essen",w:60,d:65,h:185,color:"#f2f1ee",build:i=>{let{W:t,D:e,H:n}=i;i.box(0,0,-.01,t,n,e-.02);let s=n*.62;i.box(0,.02,e/2-.01,t-.01,s-.03,.02),i.box(0,s+.01,e/2-.01,t-.01,n-s-.02,.02),i.box(t/2-.05,s-.4,e/2+.015,.02,.35,.025,i.mat("metal")),i.box(t/2-.05,s+.06,e/2+.015,.02,.25,.025,i.mat("metal"))}},{id:"bed_double",label:"Doppelbett",category:"Schlafzimmer",w:180,d:210,h:90,color:"#8d7a66",build:i=>xu(i,2)},{id:"bed_single",label:"Einzelbett",category:"Schlafzimmer",w:90,d:200,h:90,color:"#8d7a66",build:i=>xu(i,1)},{id:"nightstand",label:"Nachttisch",category:"Schlafzimmer",w:45,d:40,h:50,color:"#e9e6df",build:i=>vu(i,2,.04)},{id:"wardrobe",label:"Kleiderschrank",category:"Schlafzimmer",w:150,d:60,h:220,color:"#e9e6df",build:i=>_u(i,Math.max(1,Math.round(i.W/.5)),.04)},{id:"dresser",label:"Kommode",category:"Schlafzimmer",w:100,d:45,h:85,color:"#e9e6df",build:i=>vu(i,3,.06)},{id:"bathtub",label:"Badewanne",category:"Bad",w:170,d:75,h:58,color:"#fbfbfb",build:i=>{let{W:t,D:e,H:n}=i,s=.07;for(let r of[-1,1])i.box(0,0,r*(e/2-s/2),t,n,s);for(let r of[-1,1])i.box(r*(t/2-s/2),0,0,s,n,e-2*s);i.box(0,0,0,t-2*s,n*.25,e-2*s),i.cyl(-t/2+.035,n,0,.015,.015,.12,i.mat("metal")),i.box(-t/2+.08,n+.1,0,.1,.02,.025,i.mat("metal"))}},{id:"shower",label:"Dusche",category:"Bad",w:90,d:90,h:200,color:"#fbfbfb",build:i=>{let{W:t,D:e,H:n}=i;i.box(0,0,0,t,.06,e),i.box(0,.06,e/2-.005,t,n-.06,.01,i.mat("glass")),i.box(t/2-.005,.06,0,.01,n-.06,e,i.mat("glass")),i.box(0,n-.02,e/2-.005,t,.02,.015,i.mat("metal")),i.box(t/2-.005,n-.02,0,.015,.02,e,i.mat("metal")),i.cyl(-t/2+.06,.9,-e/2+.04,.012,.012,n-1,i.mat("metal")),i.box(-t/2+.06,n-.12,-e/2+.1,.02,.02,.14,i.mat("metal")),i.cyl(-t/2+.06,n-.14,-e/2+.18,.1,.1,.015,i.mat("metal"))}},{id:"toilet",label:"WC",category:"Bad",w:40,d:65,h:80,color:"#fbfbfb",build:i=>{let{W:t,D:e,H:n}=i;i.box(0,.4,-e/2+.09,t,n-.4,.18),i.cyl(0,0,.05,t*.25,e*.28,.33,i.main,1.25),i.cyl(0,.33,e*.12,t*.5,e*.38,.07),i.cyl(0,.4,e*.12,t*.48,e*.36,.018,i.mat("white"))}},{id:"washbasin",label:"Waschtisch",category:"Bad",w:60,d:45,h:85,color:"#a47a52",build:i=>{let{W:t,D:e,H:n}=i;i.box(0,.3,-.01,t,n-.42,e-.02),i.box(0,n-.12,.005,t+.01,.12,e+.01,i.mat("ceramic")),i.box(0,n,.03,t*.68,.004,e*.55,i.mat("basin")),i.cyl(0,n,-e/2+.06,.014,.014,.18,i.mat("metal")),i.box(0,n+.16,-e/2+.11,.022,.022,.1,i.mat("metal"))}},{id:"washer",label:"Waschmaschine",category:"Bad",w:60,d:60,h:85,color:"#f6f6f4",build:i=>{let{W:t,D:e,H:n}=i;i.box(0,0,0,t,n,e);let s=Math.min(t,n)*.28,r=new ys(s,.025,12,40);i.add(r,i.mat("metal"),0,n*.42,e/2+.01);let o=new ti(s,s,.01,40);o.rotateX(Math.PI/2),i.add(o,i.mat("tinted"),0,n*.42,e/2+.006),i.box(0,n-.12,e/2,t-.02,.1,.004,i.mat("basin"))}},{id:"desk",label:"Schreibtisch",category:"B\xFCro",w:140,d:70,h:75,color:"#e9e6df",build:i=>{let{W:t,D:e,H:n}=i;i.box(0,n-.03,0,t,.03,e);for(let s of[-1,1])i.box(s*(t/2-.05),0,0,.04,.03,e-.06,i.mat("dark")),i.box(s*(t/2-.05),0,0,.04,n-.03,.04,i.mat("dark"));i.box(0,n*.45,-e/2+.04,t-.14,n*.45,.015,i.mat("dark"))}},{id:"office_chair",label:"B\xFCrostuhl",category:"B\xFCro",w:60,d:60,h:110,color:"#33373d",build:i=>{let{W:t,D:e,H:n}=i,s=Math.min(t,e)/2-.03;for(let r=0;r<5;r++){let o=r/5*Math.PI*2,a=new Ge(s,.03,.04);a.translate(s/2,0,0),a.rotateY(o),i.add(a,i.mat("dark"),0,.06,0),i.ball(Math.cos(o)*s,.03,-Math.sin(o)*s,.03,.03,.03,i.mat("rubber"))}i.cyl(0,.06,0,.025,.025,.36,i.mat("metal")),i.box(0,.42,.02,t*.82,.08,e*.78),i.box(0,.5,-e*.3,.05,.12,.04,i.mat("dark")),i.box(0,.58,-e*.36,t*.76,n-.6,.06)}},{id:"stairs",label:"Treppe",category:"Sonstiges",w:100,d:300,h:270,color:"#b48a60",build:i=>{let t=Math.max(2,Math.round(i.H/.18)),e=i.H/t,n=i.D/t;for(let s=0;s<t;s++)i.box(0,0,i.D/2-n*(s+.5),i.W,e*(s+1),n)}},{id:"radiator",label:"Heizk\xF6rper",category:"Sonstiges",w:100,d:10,h:60,z:15,color:"#f4f4f2",build:i=>{let t=Math.max(3,Math.round(i.W/.05)),e=i.W/t;for(let n=0;n<t;n++)i.box(-i.W/2+e*(n+.5),0,0,e*.6,i.H,i.D);i.box(0,.04,0,i.W,.03,i.D*.5),i.box(0,i.H-.07,0,i.W,.03,i.D*.5)}},{id:"car",label:"Auto",category:"Sonstiges",w:180,d:450,h:150,color:"#2f5d8a",build:i=>{let{W:t,D:e,H:n}=i,s=Math.min(.33,n*.22);i.box(0,s*.6,0,t,n*.45,e-.04),i.box(0,s*.6+n*.45,-e*.06,t*.86,n*.5-s*.6,e*.5,i.mat("tinted")),i.box(0,n-.04,-e*.06,t*.86,.04,e*.48);for(let r of[-1,1])for(let o of[-1,1]){let a=new ti(s,s,.22,24);a.rotateZ(Math.PI/2),i.add(a,i.mat("rubber"),r*(t/2-.12),s,o*(e/2-.75))}for(let r of[-1,1])i.box(r*(t/2-.2),s*.6+n*.3,e/2-.02,.25,.08,.02,i.mat("lamp_front")),i.box(r*(t/2-.2),s*.6+n*.3,-e/2+.02,.25,.08,.02,i.mat("lamp_rear"))}}],Wc=new Map(Us.map(i=>[i.id,i]));function In(i){return Wc.get(i)}function el(i,t,e,n,s){let r=Wc.get(i)??Wc.get("box"),o=new Gc(Math.max(t,1)/100,Math.max(e,1)/100,Math.max(n,.5)/100,s);return r.build(o),o.group}var qt=.01,Fi=[{key:"door-single",label:"Dreht\xFCr",type:"door",style:"single",w:90,h:210,sill:0},{key:"door-double",label:"Doppelt\xFCr",type:"door",style:"double",w:140,h:210,sill:0},{key:"door-glass",label:"Glast\xFCr",type:"door",style:"glass",w:90,h:210,sill:0},{key:"door-french",label:"Balkon- / Terrassent\xFCr",type:"door",style:"french",w:140,h:220,sill:0},{key:"door-sliding",label:"Schiebet\xFCr",type:"door",style:"sliding",w:100,h:210,sill:0},{key:"door-garage",label:"Garagentor",type:"door",style:"garage",w:250,h:220,sill:0},{key:"door-opening",label:"Durchgang",type:"door",style:"opening",w:90,h:210,sill:0},{key:"window-single",label:"Fenster einfl\xFCgelig",type:"window",style:"single",w:80,h:130,sill:90},{key:"window-double",label:"Fenster zweifl\xFCgelig",type:"window",style:"double",w:120,h:130,sill:90},{key:"window-triple",label:"Fenster dreifl\xFCgelig",type:"window",style:"triple",w:180,h:130,sill:90},{key:"window-fixed",label:"Festverglasung",type:"window",style:"fixed",w:100,h:130,sill:90},{key:"window-sliding",label:"Schiebefenster",type:"window",style:"sliding",w:160,h:130,sill:90},{key:"window-floor",label:"Bodentiefes Fenster",type:"window",style:"double",w:120,h:220,sill:0},{key:"window-round",label:"Rundfenster",type:"window",style:"round",w:70,h:70,sill:120}],Mu=[["single","Dreht\xFCr"],["double","Doppelt\xFCr"],["glass","Glast\xFCr"],["french","Balkon- / Terrassent\xFCr"],["sliding","Schiebet\xFCr"],["garage","Garagentor"],["opening","Durchgang (ohne T\xFCr)"]],Su=[["single","Einfl\xFCgelig"],["double","Zweifl\xFCgelig"],["triple","Dreifl\xFCgelig"],["fixed","Festverglasung"],["sliding","Schiebefenster"],["round","Rund / Oval"]];function wu(i,t,e){let n=new Ne,s=25,r=12,o=i.sill+i.h,a=o+s,l=(c,d,h,u)=>{if(d-c<.5||u-h<.5)return;let p=new fe(new Ge((d-c)*qt,(u-h)*qt,r*qt),t);p.position.set((c+d)/2*qt,(h+u)/2*qt,0),n.add(p)};return l(-s,0,0,a),l(i.w,i.w+s,0,a),l(0,i.w,o,a),l(0,i.w,Math.max(0,i.sill-s),i.sill),Xc(n,{id:"",wall:"",type:i.type,style:i.style,offset:i.w/2,width:i.w,height:i.h,sill:i.sill},0,i.w,i.sill,o,r,e,t),n}var o_=1.13;function Xc(i,t,e,n,s,r,o,a,l){let c=t.style??"single",d=t.type==="door",h=!d||c==="glass"||c==="french"?"#f2f2f0":c==="garage"?"#d4d6d8":"#8b5a2b",u=new Fe({color:t.color||h,roughness:.55}),p=new Fe({color:new kt(t.color||h).multiplyScalar(.6),roughness:.7}),x=new Fe({color:12172739,roughness:.3,metalness:.7}),m=(D,H,O,U,z,q,V,rt=i)=>{let[nt,ht]=D<H?[D,H]:[H,D],[yt,Bt]=z<q?[z,q]:[q,z];if(ht-nt<.05||U-O<.05||Bt-yt<.05)return;let Ut=new fe(new Ge((ht-nt)*qt,(U-O)*qt,(Bt-yt)*qt),V);Ut.position.set((nt+ht)/2*qt,(O+U)/2*qt,(yt+Bt)/2*qt),rt.add(Ut)},g=n-e,f=r-s,y=t.mirror?1:-1;if(d){if(c==="opening")return;if(c==="garage"){m(e,n,s,r,-2,2,u);let nt=Math.max(3,Math.round(f/50));for(let ht=1;ht<nt;ht++){let yt=s+f/nt*ht;m(e+1,n-1,yt-.6,yt+.6,-2.4,2.4,p)}m(e+g/2-10,e+g/2+10,s+8,s+10,-3.5,3.5,x);return}let D=Math.min(5,g*.08),H=o+2;m(e,e+D,s,r,-H/2,H/2,u),m(n-D,n,s,r,-H/2,H/2,u),m(e,n,r-D,r,-H/2,H/2,u);let O=g-2*D,U=f-D-1,z=Math.min(U-10,Math.max(10,105-s-1)),q=c==="glass"||c==="french",V=(nt,ht,yt,Bt=!0)=>{let Ut=Ot=>ht*Ot;if(q){let Ot=Math.min(9,nt*.15);m(Ut(0),Ut(Ot),0,U,-2,2,u,yt),m(Ut(nt-Ot),Ut(nt),0,U,-2,2,u,yt),m(Ut(Ot),Ut(nt-Ot),0,16,-2,2,u,yt),m(Ut(Ot),Ut(nt-Ot),U-Ot,U,-2,2,u,yt),m(Ut(Ot),Ut(nt-Ot),16,U-Ot,-.5,.5,a,yt)}else m(Ut(0),Ut(nt),0,U,-2,2,u,yt);Bt&&m(Ut(nt-13),Ut(nt-4),z,z+2,-4.5,4.5,x,yt)},rt=(nt,ht,yt)=>{let Bt=new Ne;Bt.position.set(nt*qt,(s+1)*qt,y*(o/2-3)*qt),Bt.rotation.y=-y*yt*o_,V(ht,yt,Bt),i.add(Bt)};if(c==="double"||c==="french")rt(e+D,O/2,1),rt(n-D,O/2,-1);else if(c==="sliding"){let nt=new Ne,ht=y*(o/2+3),yt=t.flip?e+D+O*.5-2:e+D-O*.5-2;nt.position.set(yt*qt,(s+1)*qt,ht*qt),V(O+4,1,nt,!1),m(t.flip?4:O-4,t.flip?6:O-2,U*.35,U*.65,-3,3,x,nt),i.add(nt),m(Math.min(yt,e)-2,Math.max(yt+O+4,n)+2,r+1,r+5,ht-2.5,ht+2.5,x)}else rt(t.flip?n-D:e+D,O,t.flip?-1:1);return}let b=Math.min(o,8),_=Math.max(2,Math.min(6,g*.08,f*.08));if(c==="round"){let D=(e+n)/2*qt,H=(s+r)/2*qt,O=g/2*qt,U=f/2*qt,z=new je([new K(e*qt,s*qt),new K(n*qt,s*qt),new K(n*qt,r*qt),new K(e*qt,r*qt)]);z.holes.push(new ei().absellipse(D,H,O*.98,U*.98,0,Math.PI*2,!0));let q=new zn(z,{depth:o*qt,bevelEnabled:!1,curveSegments:40});q.translate(0,0,-o/2*qt),i.add(new fe(q,l));let V=new je().absellipse(D,H,O*.98,U*.98,0,Math.PI*2,!1);V.holes.push(new ei().absellipse(D,H,O*.98-_*qt,U*.98-_*qt,0,Math.PI*2,!0));let rt=new zn(V,{depth:b*qt,bevelEnabled:!1,curveSegments:40});rt.translate(0,0,-b/2*qt),i.add(new fe(rt,u));let nt=new je().absellipse(D,H,O*.98-_*qt,U*.98-_*qt,0,Math.PI*2,!1),ht=new zn(nt,{depth:qt,bevelEnabled:!1,curveSegments:40});ht.translate(0,0,-.5*qt),i.add(new fe(ht,a));return}let E=b/2;m(e,e+_,s,r,-E,E,u),m(n-_,n,s,r,-E,E,u),m(e,n,s,s+_,-E,E,u),m(e,n,r-_,r,-E,E,u);let A=e+_,P=n-_,L=s+_,w=r-_,S=Math.max(1.5,Math.min(4.5,(P-A)*.08)),I=(D,H,O,U,z)=>{if(m(D,D+S,L,w,O-U/2,O+U/2,u),m(H-S,H,L,w,O-U/2,O+U/2,u),m(D,H,L,L+S,O-U/2,O+U/2,u),m(D,H,w-S,w,O-U/2,O+U/2,u),m(D+S,H-S,L+S,w-S,O-.5,O+.5,a),z!==void 0){let q=z?H-S/2:D+S/2,V=(L+w)/2;m(q-1,q+1,V-6,V+2,O+y*(U/2),O+y*(U/2+2.5),x)}};if(c==="fixed")m(A,P,L,w,-.5,.5,a);else if(c==="sliding"){let D=(P-A)/2;I(A,A+D+2,-1.6,3,!1),I(P-D-2,P,1.6,3,!0)}else{let D=c==="triple"?3:c==="double"?2:1,H=(P-A-(D-1)*_)/D;for(let O=0;O<D;O++){let U=A+O*(H+_);O>0&&m(U-_,U,L,w,-E,E,u);let z=D===1?!t.flip:O<D/2-.01?!0:O>D/2-1+.01?!1:void 0;I(U,U+H,0,Math.min(b,5),D===3&&O===1?void 0:z)}}}function li(i,t,e,n=1){let s=i.getImageData(0,0,t,t),r=n;for(let o=0;o<s.data.length;o+=4){r=r*16807%2147483647;let a=(r/2147483647-.5)*e;s.data[o]+=a,s.data[o+1]+=a,s.data[o+2]+=a}i.putImageData(s,0,0)}var Fs={wood:{label:"Parkett (Holz)",size:120,draw(i,t){let n=t/6,s=["#b98a5a","#a97a4c","#c39566","#b08050","#9f7045","#bd8d5d"];for(let r=0;r<6;r++){let o=r%2*(t/2);for(let a=-1;a<2;a++)i.fillStyle=s[(r*2+a+6)%s.length],i.fillRect(o+a*t,r*n,t,n),i.strokeStyle="rgba(60,35,15,.35)",i.lineWidth=2,i.strokeRect(o+a*t,r*n,t,n);i.strokeStyle="rgba(90,55,25,.18)",i.lineWidth=1;for(let a=0;a<4;a++){let l=r*n+(a+1)*(n/5);i.beginPath(),i.moveTo(0,l),i.bezierCurveTo(t*.3,l-2,t*.6,l+2,t,l),i.stroke()}}li(i,t,18,7)}},tiles:{label:"Fliesen hell",size:60,draw(i,t){i.fillStyle="#b8b6b0",i.fillRect(0,0,t,t),i.fillStyle="#e9e7e2";let e=t*.02;i.fillRect(e,e,t/2-2*e,t/2-2*e),i.fillRect(t/2+e,e,t/2-2*e,t/2-2*e),i.fillRect(e,t/2+e,t/2-2*e,t/2-2*e),i.fillRect(t/2+e,t/2+e,t/2-2*e,t/2-2*e),li(i,t,8,3)}},tiles_dark:{label:"Fliesen dunkel",size:60,draw(i,t){i.fillStyle="#2c2c2c",i.fillRect(0,0,t,t),i.fillStyle="#4a4a4c";let e=t*.015;i.fillRect(e,e,t-2*e,t/2-2*e),i.fillRect(e,t/2+e,t-2*e,t/2-2*e),li(i,t,14,5)}},carpet:{label:"Teppich",size:50,draw(i,t){i.fillStyle="#8c8f9a",i.fillRect(0,0,t,t),li(i,t,40,11)}},brick:{label:"Backstein",size:100,draw(i,t){i.fillStyle="#cfc6b8",i.fillRect(0,0,t,t);let e=8,n=t/e,s=t/4,r=["#a4553a","#9a4b33","#b0603f","#93462f"];for(let o=0;o<e;o++){let a=o%2*(s/2);for(let l=-1;l<5;l++)i.fillStyle=r[(o+l+8)%r.length],i.fillRect(a+l*s+2,o*n+2,s-4,n-4)}li(i,t,22,13)}},concrete:{label:"Beton",size:150,draw(i,t){i.fillStyle="#a9a8a4",i.fillRect(0,0,t,t),li(i,t,30,17)}},plaster:{label:"Rauputz",size:80,draw(i,t){i.fillStyle="#f0ede6",i.fillRect(0,0,t,t),li(i,t,16,19)}},wallpaper:{label:"Tapete gestreift",size:60,draw(i,t){i.fillStyle="#e8e1d3",i.fillRect(0,0,t,t),i.fillStyle="#d9cfbb";for(let e=0;e<4;e++)i.fillRect(e*(t/4),0,t/12,t);li(i,t,6,23)}}},cn="builtin:";function Eu(i){return i.startsWith(cn)?Fs[i.slice(cn.length)]?.label??i:i}function il(i){return i.startsWith(cn)?Fs[i.slice(cn.length)]?.size??100:100}var nl=class{constructor(t){this.onLoad=t;this.cache=new Map;this.loader=new Rr}get(t,e){let n=`${t}|${e}`,s=this.cache.get(n);if(s)return s;if(t.startsWith(cn)){let o=Fs[t.slice(cn.length)];if(!o)return;let a=document.createElement("canvas");a.width=a.height=256,o.draw(a.getContext("2d"),256),s=new Mi(a)}else s=this.loader.load(t,()=>this.onLoad(),void 0,()=>console.warn("floorplan-3d-card: Textur nicht ladbar:",t));s.colorSpace=be,s.wrapS=s.wrapT=as,s.anisotropy=4;let r=100/Math.max(e,1);return s.repeat.set(r,r),this.cache.set(n,s),s}dispose(){for(let t of this.cache.values())t.dispose();this.cache.clear()}};var xe=.01,qc=4171775,Tu=16761095,Os=class{constructor(){this.scene=new bi;this.camera=new Ee(45,1,.05,500);this.world=new Ne;this.hotspots=new Map;this.framePending=!1;this.raycaster=new Ir;this.hasView=!1;this.disposed=!1;this.textures=new nl(()=>this.requestRender());this.element=document.createElement("div"),this.element.className="fp3d-viewer",this.element.style.cssText="position:relative;width:100%;height:100%;overflow:hidden;touch-action:none;",this.renderer=new Is({antialias:!0,alpha:!0}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),this.renderer.outputColorSpace=be,this.renderer.domElement.style.cssText="display:block;width:100%;height:100%;",this.element.appendChild(this.renderer.domElement),this.labels=new tl,this.labels.domElement.style.cssText="position:absolute;inset:0;pointer-events:none;",this.element.appendChild(this.labels.domElement),this.controls=new Qa(this.camera,this.renderer.domElement),this.controls.maxPolarAngle=Math.PI/2-.02,this.controls.screenSpacePanning=!1,this.controls.addEventListener("change",()=>this.requestRender()),this.scene.add(new Ti(16777215,9076592,1.6));let t=new Ai(16777215,1.4);t.position.set(6,12,4),this.scene.add(t),this.scene.add(this.world),this.bindPointer(),this.resizeObserver=new ResizeObserver(()=>this.resize()),this.resizeObserver.observe(this.element)}setConfig(t){this.config=t,this.rebuild(),this.hasView||(t.camera?this.setCamera(t.camera):this.fit(),this.hasView=!0),this.requestRender()}setHass(t){let e=this.hass;this.hass=t;let n=!1;for(let s of this.hotspots.values()){let r=s.data.entity;r&&(e&&e.states[r]===t.states[r]||(this.applyState(s),n=!0))}n&&this.requestRender()}getCamera(){let t=s=>Math.round(s*100)/100,e=this.camera.position,n=this.controls.target;return{position:[t(e.x),t(e.y),t(e.z)],target:[t(n.x),t(n.y),t(n.z)]}}setCamera(t){this.camera.position.set(...t.position),this.controls.target.set(...t.target),this.controls.update(),this.requestRender()}fit(){let t=new on().setFromObject(this.world);t.isEmpty()&&t.set(new R(0,0,0),new R(8,2.5,6));let e=t.getCenter(new R),n=t.getSize(new R),s=Math.max(n.x,n.z,3);this.camera.position.set(e.x,e.y+s*1,e.z+s*.85),this.controls.target.copy(e).setY(0),this.controls.update(),this.requestRender()}resetView(){this.config?.camera?this.setCamera(this.config.camera):this.fit()}dispose(){this.disposed=!0,this.resizeObserver.disconnect(),this.controls.dispose(),this.clearWorld(),this.textures.dispose(),this.glowTexture?.dispose(),this.renderer.dispose(),this.renderer.forceContextLoss(),this.element.remove()}requestRender(){this.framePending||this.disposed||(this.framePending=!0,requestAnimationFrame(()=>{this.framePending=!1,!this.disposed&&(this.renderer.render(this.scene,this.camera),this.labels.render(this.scene,this.camera))}))}clearWorld(){this.world.traverse(t=>{let e=t;e.geometry?.dispose?.();let n=e.material;Array.isArray(n)?n.forEach(s=>s.dispose()):n?.dispose?.(),t instanceof Ns&&t.element.remove()}),this.world.clear(),this.hotspots.clear()}rebuild(){let t=this.config;this.clearWorld();let e=Dn(t.floorplan);for(let s of e.rooms){if(s.points.length<3)continue;let r=new je(s.points.map(([d,h])=>new K(d*xe,h*xe))),o=new Tr(r);o.rotateX(Math.PI/2);let a=new fe(o,this.surfaceMaterial(s.texture??t.floor_texture,s.texture_scale,s.color||t.floor_color||ve.floor_color,s.color,an));a.position.y=.002,this.world.add(a);let l=t.show_room_names!==!1&&!!s.name,c=t.show_area!==!1&&s.points.length>=3;if(l||c){let d=Yc(s.points),h=document.createElement("div");if(h.className="fp3d-room",l&&h.append(s.name),c){let p=document.createElement("span");p.className="area",p.textContent=zi(Hi(s.points)),h.append(p)}let u=new Ns(h);u.position.set(d[0]*xe,.05,d[1]*xe),this.world.add(u)}}let n=new Fe({color:10474495,transparent:!0,opacity:.3,roughness:.1,depthWrite:!1});for(let s of e.walls){let r=e.openings.filter(a=>a.wall===s.id),o=this.surfaceMaterial(s.texture??t.wall_texture,s.texture_scale,s.color||t.wall_color||ve.wall_color,s.color);this.buildWall(s,r,o,n)}for(let s of e.objects)this.buildObject(s);for(let s of e.hotspots)this.buildHotspot(s)}surfaceMaterial(t,e,n,s,r=gn){let o=t&&t!=="none"?this.textures.get(t,e||il(t)):void 0;return new Fe({color:o?s||"#ffffff":n,map:o??null,roughness:.85,side:r})}buildWall(t,e,n,s){let r=this.config,o=t.x2-t.x1,a=t.y2-t.y1,l=Math.hypot(o,a);if(l<1)return;let c=Math.atan2(a,o),d=t.thickness??r.wall_thickness??ve.wall_thickness,h=t.height??r.wall_height??ve.wall_height,u=t.height_end??h,p=y=>h+(u-h)*Math.max(0,Math.min(l,y))/l,x=new Ne;x.position.set(t.x1*xe,0,t.y1*xe),x.rotation.y=-c,this.world.add(x);let m=(y,b,_,E,A,P,L)=>{b-y<.5||(E=Math.max(E,_),A=Math.max(A,_),!(E-_<.5&&A-_<.5)&&x.add(new fe(a_(y,b,_,E,A,P),L)))},g=[...e].sort((y,b)=>y.offset-b.offset),f=-d/2;for(let y of g){let b=Math.max(0,y.offset-y.width/2),_=Math.min(l,y.offset+y.width/2);if(_<=b)continue;let E=y.sill??(y.type==="door"?0:90),A=Math.min(Math.min(p(b),p(_)),E+y.height);b>f&&m(f,b,0,p(f),p(b),d,n),m(b,_,0,E,E,d,n),m(b,_,A,p(b),p(_),d,n),Xc(x,y,b,_,E,A,d,s,n),f=Math.max(f,_)}m(f,l+d/2,0,p(f),p(l+d/2),d,n)}buildObject(t){let e=In(t.type),n=this.surfaceMaterial(t.texture,t.texture_scale,t.color||e?.color||"#9aa7b4",t.color);n.roughness=.7;let s=el(t.type,t.w,t.d,t.h,n);s.position.set(t.x*xe,(t.z??0)*xe,t.y*xe),s.rotation.y=-Pi.degToRad(t.rotation??0),this.world.add(s)}buildHotspot(t){let e=new Ge(Math.max(t.w,1)*xe,Math.max(t.h,1)*xe,Math.max(t.d,1)*xe),n=new yi({color:qc,transparent:!0,depthWrite:!1}),s=new fe(e,n);s.position.set(t.x*xe,((t.z??0)+t.h/2)*xe,t.y*xe),s.userData.hotspot=t.id,s.renderOrder=10;let r=new ur(new xr(e),new xs({color:qc,transparent:!0}));s.add(r),this.world.add(s);let o={data:t,mesh:s,edges:r,active:!1};if(t.entity&&tn(t.entity)==="light"){let l=new Cr(16766362,0,8,1.2);l.position.copy(s.position),this.world.add(l),o.light=l;let c=new dr(new ms({map:this.glow(),transparent:!0,depthWrite:!1,blending:Dr}));c.position.copy(s.position),c.visible=!1,c.renderOrder=11,this.world.add(c),o.glow=c}if(this.config.show_labels!==!1&&t.show_label!==!1&&(t.entity||t.label)){let l=document.createElement("div");l.className="fp3d-label",this.bindLabelGestures(l,t);let c=new Ns(l);c.position.set(0,t.h/2*xe+.12,0),s.add(c),o.label=c}this.hotspots.set(t.id,o),this.applyState(o)}bindLabelGestures(t,e){let n,s,r=!1,o=()=>{n&&window.clearTimeout(n),n=void 0};t.addEventListener("pointerdown",a=>{a.button===0&&(a.stopPropagation(),r=!1,s={x:a.clientX,y:a.clientY},o(),n=window.setTimeout(()=>{n=void 0,r=!0,this.onHotspot?.(e,"hold")},Au))}),t.addEventListener("pointermove",a=>{s&&Math.hypot(a.clientX-s.x,a.clientY-s.y)>6&&o()}),t.addEventListener("pointerup",o),t.addEventListener("pointercancel",o),t.addEventListener("pointerleave",o),t.addEventListener("click",a=>{if(a.stopPropagation(),r){r=!1;return}this.onHotspot?.(e,"tap")}),t.addEventListener("contextmenu",a=>{a.preventDefault(),r||this.onHotspot?.(e,"hold")})}applyState(t){let e=t.data,n=e.entity?this.hass?.states[e.entity]:void 0;t.active=di(n),this.styleHotspot(t);let s=t.light?this.lightLook(n):void 0;if(t.light&&s){let r=t.active?s.level:0;if(t.light.color.copy(s.color),t.light.intensity=t.active?1.5+10*r:0,t.light.distance=3+4*r,t.glow){let o=Math.max(.5,Math.max(e.w,e.d)*xe*1.6)*(.7+.6*r);t.glow.visible=t.active,t.glow.scale.set(o,o,1);let a=t.glow.material;a.color.copy(s.color),a.opacity=.35+.65*r}}if(t.label){let r=t.label.element;if(r.classList.toggle("active",t.active),s&&t.active){let l=s.color;r.classList.add("lit"),r.style.setProperty("--fp3d-lit",`rgba(${Math.round(l.r*255)}, ${Math.round(l.g*255)}, ${Math.round(l.b*255)}, ${.55+.4*s.level})`),r.style.color=l.r*.3+l.g*.59+l.b*.11>.55?"#1b1b1b":"#fff"}else r.classList.remove("lit"),r.style.removeProperty("--fp3d-lit"),r.style.color="";if(r.replaceChildren(),e.icon){let l=document.createElement("ha-icon");l.setAttribute("icon",e.icon),r.appendChild(l)}let o=document.createElement("span"),a=e.label||(e.entity?Bi(n,e.entity):"");if(e.entity&&this.hass){let l=document.createElement("span");l.className="name",l.textContent=a;let c=document.createElement("span");c.className="state",c.textContent=ki(this.hass,n),s&&t.active&&n?.attributes.brightness!=null&&(c.textContent+=` \xB7 ${Math.round(s.level*100)} %`),o.append(l,c)}else o.textContent=a;r.appendChild(o)}}lightLook(t){let[e,n,s]=Hs(t);return{color:new kt().setRGB(e/255,n/255,s/255,be),level:$r(t)}}glow(){if(this.glowTexture)return this.glowTexture;let t=document.createElement("canvas");t.width=t.height=128;let e=t.getContext("2d"),n=e.createRadialGradient(64,64,0,64,64,64);return n.addColorStop(0,"rgba(255,255,255,1)"),n.addColorStop(.25,"rgba(255,255,255,.6)"),n.addColorStop(.6,"rgba(255,255,255,.15)"),n.addColorStop(1,"rgba(255,255,255,0)"),e.fillStyle=n,e.fillRect(0,0,128,128),this.glowTexture=new Mi(t),this.glowTexture.colorSpace=be,this.glowTexture}styleHotspot(t){let e=this.config?.hitbox_mode??"visible",n=this.hovered===t.data.id,s=t.data.color?new kt(t.data.color):new kt(t.active?Tu:qc);if(t.data.color&&t.active&&s.lerp(new kt(Tu),.5),t.light&&t.active){let c=this.lightLook(t.data.entity?this.hass?.states[t.data.entity]:void 0);s.copy(c.color)}let r=t.active?.32:.1,o=t.active?.9:.55;(e==="hidden"||e==="hover"&&!n)&&(r=0,o=0),n&&(r+=.15,o=1);let a=t.mesh.material;a.color.copy(s),a.opacity=r;let l=t.edges.material;l.color.copy(s),l.opacity=o}bindPointer(){let t=this.renderer.domElement,e,n,s=!1,r=()=>{n&&window.clearTimeout(n),n=void 0};t.addEventListener("pointerdown",o=>{e={x:o.clientX,y:o.clientY,id:o.pointerId},s=!1,r();let a=this.pick(o);a&&(n=window.setTimeout(()=>{s=!0,this.onHotspot?.(a,"hold")},Au))}),t.addEventListener("pointermove",o=>{e&&Math.hypot(o.clientX-e.x,o.clientY-e.y)>6&&r(),!e&&o.pointerType==="mouse"&&this.setHover(this.pick(o)?.id)}),t.addEventListener("pointerup",o=>{r();let a=e;if(e=void 0,!a||s||Math.hypot(o.clientX-a.x,o.clientY-a.y)>6)return;let l=this.pick(o);l&&this.onHotspot?.(l,"tap")}),t.addEventListener("pointerleave",()=>{r(),this.setHover(void 0)}),t.addEventListener("contextmenu",o=>{let a=this.pick(o);a&&(o.preventDefault(),s||this.onHotspot?.(a,"hold"))})}pick(t){let e=this.renderer.domElement.getBoundingClientRect();if(!e.width||!e.height)return;let n=new K((t.clientX-e.left)/e.width*2-1,-((t.clientY-e.top)/e.height)*2+1);this.raycaster.setFromCamera(n,this.camera);let s=[...this.hotspots.values()].map(a=>a.mesh),o=this.raycaster.intersectObjects(s,!1)[0]?.object.userData.hotspot;return o?this.hotspots.get(o)?.data:void 0}setHover(t){if(this.hovered===t)return;let e=this.hovered;this.hovered=t,this.renderer.domElement.style.cursor=t?"pointer":"";for(let n of[e,t]){let s=n?this.hotspots.get(n):void 0;s&&this.styleHotspot(s)}this.requestRender()}resize(){let t=this.element.clientWidth,e=this.element.clientHeight;!t||!e||(this.renderer.setSize(t,e,!1),this.labels.setSize(t,e),this.camera.aspect=t/e,this.camera.updateProjectionMatrix(),this.requestRender())}};function a_(i,t,e,n,s,r){let o=i*xe,a=t*xe,l=e*xe,c=n*xe,d=s*xe,h=r/2*xe,u=[],p=[],x=(g,f)=>{for(let y of[0,1,2,0,2,3])u.push(...g[y]),p.push(...f[y])};x([[o,l,h],[a,l,h],[a,d,h],[o,c,h]],[[o,l],[a,l],[a,d],[o,c]]),x([[a,l,-h],[o,l,-h],[o,c,-h],[a,d,-h]],[[-a,l],[-o,l],[-o,c],[-a,d]]),x([[o,c,h],[a,d,h],[a,d,-h],[o,c,-h]],[[o,h],[a,h],[a,-h],[o,-h]]),x([[o,l,-h],[a,l,-h],[a,l,h],[o,l,h]],[[o,-h],[a,-h],[a,h],[o,h]]),x([[o,l,-h],[o,l,h],[o,c,h],[o,c,-h]],[[-h,l],[h,l],[h,c],[-h,c]]),x([[a,l,h],[a,l,-h],[a,d,-h],[a,d,h]],[[h,l],[-h,l],[-h,d],[h,d]]);let m=new Te;return m.setAttribute("position",new Kt(u,3)),m.setAttribute("uv",new Kt(p,2)),m.computeVertexNormals(),m}function Yc(i){let t=0,e=0,n=0;for(let s=0;s<i.length;s++){let[r,o]=i[s],[a,l]=i[(s+1)%i.length],c=r*l-a*o;t+=c,e+=(r+a)*c,n+=(o+l)*c}if(Math.abs(t)<1e-6){let s=i.length||1;return[i.reduce((r,o)=>r+o[0],0)/s,i.reduce((r,o)=>r+o[1],0)/s]}return t*=.5,[e/(6*t),n/(6*t)]}var Au=550,sl=`
.fp3d-label {
  pointer-events: auto;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 3px 8px;
  border-radius: 12px;
  background: rgba(20, 24, 31, 0.78);
  color: #fff;
  font: 500 12px/1.25 var(--paper-font-body1_-_font-family, system-ui, sans-serif);
  white-space: nowrap;
  box-shadow: 0 1px 4px rgba(0,0,0,.3);
  user-select: none;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
  touch-action: manipulation;
  transition: background .2s;
}
.fp3d-label.active { background: rgba(214, 150, 0, 0.92); }
.fp3d-label.lit { background: var(--fp3d-lit); box-shadow: 0 0 14px var(--fp3d-lit), 0 1px 4px rgba(0,0,0,.3); }
.fp3d-label ha-icon { --mdc-icon-size: 16px; }
.fp3d-label > span { display: flex; flex-direction: column; }
.fp3d-label .name { opacity: .8; font-size: 10px; }
.fp3d-label .state { font-weight: 600; }
.fp3d-room {
  pointer-events: none;
  color: var(--primary-text-color, #222);
  font: 600 12px var(--paper-font-body1_-_font-family, system-ui, sans-serif);
  opacity: .65;
  text-shadow: 0 0 3px var(--card-background-color, #fff);
  display: flex; flex-direction: column; align-items: center; text-align: center;
}
.fp3d-room .area { font-weight: 500; font-size: 11px; }
`;var Ru={walls:[{id:"w1",x1:0,y1:0,x2:800,y2:0},{id:"w2",x1:800,y1:0,x2:800,y2:600},{id:"w3",x1:800,y1:600,x2:0,y2:600},{id:"w4",x1:0,y1:600,x2:0,y2:0},{id:"w5",x1:480,y1:0,x2:480,y2:600}],openings:[{id:"o1",wall:"w1",type:"window",offset:220,width:160,height:130,sill:90},{id:"o2",wall:"w1",type:"window",offset:640,width:110,height:130,sill:90},{id:"o3",wall:"w5",type:"door",offset:420,width:90,height:210},{id:"o4",wall:"w3",type:"door",offset:560,width:100,height:210}],rooms:[{id:"r1",name:"Wohnzimmer",points:[[0,0],[480,0],[480,600],[0,600]],color:"#c9b79c"},{id:"r2",name:"Schlafzimmer",points:[[480,0],[800,0],[800,600],[480,600]],color:"#b8c4cf"}],hotspots:[{id:"h1",x:240,y:300,z:220,w:60,d:60,h:25,label:"Deckenlampe"},{id:"h2",x:640,y:80,z:0,w:120,d:40,h:60,label:"Sensor"}],objects:[{id:"b1",type:"sofa",x:390,y:330,w:220,d:95,h:85,rotation:90,color:"#6f7f8f"},{id:"b2",type:"coffee_table",x:240,y:330,w:110,d:60,h:42,rotation:90},{id:"b3",type:"tv_board",x:30,y:330,w:180,d:40,h:50,rotation:270},{id:"b4",type:"tv",x:30,y:330,z:50,w:120,d:8,h:72,rotation:270},{id:"b5",type:"plant",x:435,y:60,w:50,d:50,h:110},{id:"b6",type:"bed_double",x:640,y:300,w:180,d:210,h:90},{id:"b8",type:"ceiling_lamp",x:240,y:300,z:238,w:50,d:50,h:12},{id:"b7",type:"wardrobe",x:640,y:562,w:150,d:60,h:220,rotation:180}]};var Pe=i=>`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${i}"/></svg>`,Me={close:"M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z",more:"M12 16a2 2 0 1 1 0 4 2 2 0 0 1 0-4m0-6a2 2 0 1 1 0 4 2 2 0 0 1 0-4m0-6a2 2 0 1 1 0 4 2 2 0 0 1 0-4",power:"M16.56 5.44 15.11 6.89A5.97 5.97 0 0 1 18 12a6 6 0 0 1-12 0c0-2.17 1.16-4.06 2.88-5.12L7.44 5.44A7.96 7.96 0 0 0 4 12a8 8 0 0 0 16 0c0-2.72-1.36-5.12-3.44-6.56M13 3h-2v10h2z",up:"M7.41 15.41 12 10.83l4.59 4.58L18 14l-6-6-6 6z",down:"M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z",stop:"M7 7h10v10H7z",minus:"M19 13H5v-2h14z",plus:"M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z",play:"M8 5.14v14l11-7z",pause:"M14 19h4V5h-4M6 19h4V5H6z",prev:"M6 18V6h2v12zm3.5-6L18 6v12z",next:"M16 18h2V6h-2zM6 18l8.5-6L6 6z",refresh:"M17.65 6.35A7.96 7.96 0 0 0 12 4a8 8 0 1 0 7.73 10h-2.08A6 6 0 1 1 12 6c1.66 0 3.14.69 4.22 1.78L13 11h7V4z",live:"M17 10.5V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3.5l4 4v-11z",lock:"M12 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4m6-9a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2h1V6a5 5 0 0 1 10 0v2zm-6-5a3 3 0 0 0-3 3v2h6V6a3 3 0 0 0-3-3",unlock:"M18 8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2h9V6a3 3 0 0 0-6 0H7a5 5 0 0 1 10 0v2zm-6 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4",bulb:"M12 2a7 7 0 0 0-7 7c0 2.38 1.19 4.47 3 5.74V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 0 0-7-7M9 21a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-1H9z"},l_={light:"mdi:lightbulb",switch:"mdi:toggle-switch-variant",sensor:"mdi:eye",binary_sensor:"mdi:checkbox-blank-circle-outline",camera:"mdi:video",cover:"mdi:window-shutter",climate:"mdi:thermostat",media_player:"mdi:cast",lock:"mdi:lock",fan:"mdi:fan",scene:"mdi:palette",script:"mdi:script-text",button:"mdi:gesture-tap-button",input_boolean:"mdi:toggle-switch-outline",person:"mdi:account",vacuum:"mdi:robot-vacuum"},c_=["#ff3b30","#ff9500","#ffcc00","#34c759","#00c7be","#007aff","#5856d6","#af52de","#ff2d92"],h_=[[2200,"Kerze"],[2700,"Warm"],[3500,"Natur"],[4500,"Neutral"],[6e3,"Kalt"]],d_={off:"Aus",heat:"Heizen",cool:"K\xFChlen",auto:"Auto",heat_cool:"Heizen/K\xFChlen",dry:"Entfeuchten",fan_only:"L\xFCften"},u_=new Set(["switch","input_boolean","fan","automation","siren","humidifier","group"]),f_=new Set(["scene","script","button","input_button"]),p_=new Set(["camera","scene","script","button","input_button","event"]),m_=[[6,"6 Std."],[24,"24 Std."],[168,"7 Tage"]],he=i=>i.replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),rl=class{constructor(t,e){this.host=e;this.range=24;this.live=!1;this.busyUntil=0;this.dlg=document.createElement("dialog"),this.dlg.className="fp-pop",this.dlg.tabIndex=-1,t.appendChild(this.dlg),this.dlg.addEventListener("keydown",n=>n.stopPropagation()),this.dlg.addEventListener("click",n=>{n.target===this.dlg&&this.dlg.close()}),this.dlg.addEventListener("close",()=>this.onClosed())}open(t,e){this.hass=t,this.id=e,this.live=!1,this.history=void 0,this.historyFor=void 0;let n=t.states[e],s=tn(e);this.dlg.classList.toggle("wide",s==="camera"),this.dlg.innerHTML=`
      <div class="pop-head">
        <div class="pop-icon"></div>
        <div class="pop-title"><b></b><span class="pop-sub"></span></div>
        <button class="pop-btn" data-a="more" title="Home-Assistant-Dialog \xF6ffnen (Einstellungen, Verlauf)">${Pe(Me.more)}</button>
        <button class="pop-btn" data-a="close" title="Schlie\xDFen">${Pe(Me.close)}</button>
      </div>
      <div class="pop-body"></div>
      ${s==="camera"||p_.has(s)?"":`<div class="pop-hist"><div class="hist-head"><span>Verlauf</span><div class="chips">${m_.map(([r,o])=>`<button data-range="${r}" class="${r===this.range?"on":""}">${o}</button>`).join("")}</div></div><div class="chart"><div class="loading">Lade Verlauf \u2026</div></div></div>`}
      <details class="pop-attrs"><summary>Attribute</summary><div class="attr-list"></div></details>`,this.dlg.querySelector('[data-a="close"]').addEventListener("click",()=>this.dlg.close()),this.dlg.querySelector('[data-a="more"]').addEventListener("click",()=>{let r=this.id;this.dlg.close(),pl(this.host,r)}),this.dlg.querySelector(".chips")?.addEventListener("click",r=>{let o=r.target.closest("button[data-range]");o&&(this.range=Number(o.dataset.range),this.dlg.querySelectorAll(".chips button").forEach(a=>a.classList.toggle("on",a===o)),this.loadHistory())}),this.shown=n,this.render(),this.dlg.open||this.dlg.showModal(),this.dlg.focus(),this.loadHistory()}update(t){if(this.hass=t,!this.dlg.open||!this.id)return;let e=t.states[this.id];e!==this.shown&&(this.shown=e,!(Date.now()<this.busyUntil)&&this.render())}close(){this.dlg.open&&this.dlg.close()}onClosed(){this.dlg.open||(this.camTimer&&window.clearInterval(this.camTimer),this.camTimer=void 0,this.dlg.querySelectorAll("img").forEach(t=>t.removeAttribute("src")),this.id=void 0)}render(){let t=this.hass,e=this.id,n=t.states[e],s=tn(e),r=di(n),o=s==="light"&&r?Hs(n):void 0,a=this.dlg.querySelector(".pop-icon");a.classList.toggle("on",r),a.style.setProperty("--pop-icon-color",o?`rgb(${o.join(",")})`:""),a.replaceChildren(this.stateIcon(n,s)),this.dlg.querySelector(".pop-title b").textContent=Bi(n,e),this.dlg.querySelector(".pop-sub").textContent=n?[ki(t,n),this.since(n)].filter(Boolean).join(" \xB7 "):"Entit\xE4t nicht gefunden";let l=this.dlg.querySelector(".pop-body");l.replaceChildren(),n?s==="light"?this.renderLight(l,n):s==="cover"?this.renderCover(l,n):s==="climate"?this.renderClimate(l,n):s==="camera"?this.renderCamera(l,n):s==="media_player"?this.renderMedia(l,n):s==="lock"?this.renderLock(l,n):s==="number"||s==="input_number"?this.renderNumber(l,n):s==="select"||s==="input_select"?this.renderSelect(l,n):u_.has(s)?this.renderToggle(l,n):f_.has(s)?this.renderRun(l,n):this.renderValue(l,n):l.innerHTML='<div class="big-value">\u2014</div>';let c=this.dlg.querySelector(".attr-list"),d=new Set(["friendly_name","icon","entity_picture","supported_features","supported_color_modes","access_token"]),h=Object.entries(n?.attributes??{}).filter(([u,p])=>!d.has(u)&&p!==null&&typeof p!="object");c.innerHTML=h.length?h.map(([u,p])=>`<div><span>${he(u.replace(/_/g," "))}</span><b>${he(String(p))}</b></div>`).join(""):'<div class="none">Keine weiteren Attribute.</div>',this.dlg.querySelector(".pop-attrs").hidden=!h.length}stateIcon(t,e){if(t&&customElements.get("ha-state-icon")){let r=document.createElement("ha-state-icon");return r.hass=this.hass,r.stateObj=t,r}let n=t?.attributes.icon||l_[e];if(n&&customElements.get("ha-icon")){let r=document.createElement("ha-icon");return r.setAttribute("icon",n),r}let s=document.createElement("span");return s.innerHTML=e==="light"?Pe(Me.bulb):`<b>${he((Bi(t,this.id)[0]??"?").toUpperCase())}</b>`,s}since(t){let e=Date.parse(t.last_changed??"");if(!e)return"";let n=Math.round((e-Date.now())/1e3),s=new Intl.RelativeTimeFormat(this.hass?.language||"de",{numeric:"auto"}),r=Math.abs(n);return r<60?s.format(n,"second"):r<3600?s.format(Math.round(n/60),"minute"):r<86400?s.format(Math.round(n/3600),"hour"):s.format(Math.round(n/86400),"day")}call(t,e,n={}){this.hass?.callService(t,e,{entity_id:this.id,...n}).catch(s=>console.error("floorplan-3d-card:",s))}bigToggle(t,e,n="Ein / Aus"){let s=di(e),r=document.createElement("button");return r.className=`big-toggle ${s?"on":""}`,r.innerHTML=`${Pe(Me.power)}<span>${s?"Eingeschaltet":"Ausgeschaltet"}</span><small>${n}</small>`,r.addEventListener("click",()=>this.call("homeassistant","toggle")),t.appendChild(r),r}slider(t,e,n,s,r={}){let o=r.min??0,a=r.max??100,l=r.step??1,c=document.createElement("div");c.className=`pop-slider ${r.cls??""}`,c.tabIndex=0,c.setAttribute("role","slider"),c.innerHTML=`<div class="fill"></div>${r.iconPath?Pe(r.iconPath):""}<span></span>`,c.style.setProperty("--fill-color",e);let d=c.querySelector(".fill"),h=c.querySelector("span"),u=t,p=()=>{d.style.width=`${(u-o)/(a-o||1)*100}%`,h.textContent=n(u),c.setAttribute("aria-valuenow",String(u))},x=f=>{let y=c.getBoundingClientRect(),b=Math.max(0,Math.min(1,(f.clientX-y.left)/y.width));u=Math.round((o+b*(a-o))/l)*l,u=Math.max(o,Math.min(a,Number(u.toFixed(4)))),p()},m=!1;c.addEventListener("pointerdown",f=>{m=!0,this.busyUntil=Date.now()+6e4,c.setPointerCapture(f.pointerId),c.classList.add("drag"),x(f)}),c.addEventListener("pointermove",f=>m&&x(f));let g=()=>{m&&(m=!1,c.classList.remove("drag"),this.busyUntil=Date.now()+1500,s(u))};return c.addEventListener("pointerup",g),c.addEventListener("pointercancel",g),c.addEventListener("keydown",f=>{f.key!=="ArrowRight"&&f.key!=="ArrowLeft"||(f.preventDefault(),u=Math.max(o,Math.min(a,u+(f.key==="ArrowRight"?l:-l)*(l<5?5:1))),p(),s(u))}),p(),c}renderLight(t,e){let n=e.attributes.supported_color_modes??[],s=n.some(h=>h!=="onoff")||e.attributes.brightness!=null,r=e.state==="on",o=Hs(e);if(!s){this.bigToggle(t,e);return}let a=document.createElement("div");a.className="light-row";let l=Math.round($r(e)*100);a.appendChild(this.slider(r?l:0,`rgb(${o.join(",")})`,h=>h?`${h} %`:"Aus",h=>{h<=0?this.call("light","turn_off"):this.call("light","turn_on",{brightness_pct:h})},{cls:"tall",iconPath:Me.bulb,min:0,max:100}));let c=document.createElement("button");c.className=`round-btn ${r?"on":""}`,c.title=r?"Ausschalten":"Einschalten",c.style.setProperty("--btn-color",`rgb(${o.join(",")})`),c.innerHTML=Pe(Me.power),c.addEventListener("click",()=>this.call("light","toggle")),a.appendChild(c),t.appendChild(a);let d=["hs","xy","rgb","rgbw","rgbww"];if(n.some(h=>d.includes(h))){let h=document.createElement("div");h.className="swatches",h.innerHTML='<span class="sec-label">Farbe</span>'+c_.map(u=>`<button class="swatch" data-c="${u}" style="background:${u}" title="${u}"></button>`).join("")+`<label class="swatch custom" title="Eigene Farbe"><input type="color" value="#${o.map(u=>u.toString(16).padStart(2,"0")).join("")}"></label>`,h.addEventListener("click",u=>{let p=u.target.closest("[data-c]");p&&this.call("light","turn_on",{rgb_color:Cu(p.dataset.c)})}),h.querySelector("input").addEventListener("change",u=>this.call("light","turn_on",{rgb_color:Cu(u.target.value)})),t.appendChild(h)}if(n.includes("color_temp")){let h=e.attributes.min_color_temp_kelvin??2e3,u=e.attributes.max_color_temp_kelvin??6500,p=e.attributes.color_mode==="color_temp"?e.attributes.color_temp_kelvin:void 0,x=document.createElement("div");x.className="temps",x.innerHTML='<span class="sec-label">Wei\xDFton</span>'+h_.filter(([m])=>m>=h-200&&m<=u+200).map(([m,g])=>{let f=Math.max(h,Math.min(u,m)),y=p!=null&&Math.abs(p-f)<300;return`<button data-k="${f}" class="${y?"on":""}"><i style="background:${x_(f)}"></i>${g}</button>`}).join(""),x.addEventListener("click",m=>{let g=m.target.closest("[data-k]");g&&this.call("light","turn_on",{color_temp_kelvin:Number(g.dataset.k)})}),t.appendChild(x)}}renderToggle(t,e){this.bigToggle(t,e)}renderRun(t,e){let n=tn(e.entity_id),s=document.createElement("button");s.className="big-toggle run",s.innerHTML=`${Pe(Me.play)}<span>${n==="scene"?"Szene aktivieren":n==="script"?"Skript ausf\xFChren":"Dr\xFCcken"}</span>`,s.addEventListener("click",()=>{n==="button"||n==="input_button"?this.call(n,"press"):this.call(n,"turn_on"),s.classList.add("done"),setTimeout(()=>s.classList.remove("done"),900)}),t.appendChild(s)}renderValue(t,e){let n=e.attributes.unit_of_measurement,s=Number(e.state),r=document.createElement("div");r.className="big-value",n&&e.state!==""&&Number.isFinite(s)?r.innerHTML=`${he(s.toLocaleString(this.hass?.language||"de",{maximumFractionDigits:2}))}<small>${he(n)}</small>`:(r.textContent=ki(this.hass,e),r.classList.add("text"),r.classList.toggle("on",di(e))),t.appendChild(r)}renderCover(t,e){let n=e.attributes.current_position;n!=null?t.appendChild(this.slider(n,"var(--primary-color, #03a9f4)",r=>r>=100?"Offen":r<=0?"Geschlossen":`${r} % offen`,r=>this.call("cover","set_cover_position",{position:r}),{cls:"tall"})):this.renderValue(t,e);let s=document.createElement("div");s.className="btn-row",s.innerHTML=`<button data-s="open_cover">${Pe(Me.up)}<span>\xD6ffnen</span></button><button data-s="stop_cover">${Pe(Me.stop)}<span>Stopp</span></button><button data-s="close_cover">${Pe(Me.down)}<span>Schlie\xDFen</span></button>`,s.addEventListener("click",r=>{let o=r.target.closest("[data-s]");o&&this.call("cover",o.dataset.s)}),t.appendChild(s)}renderClimate(t,e){let n=e.attributes,s=this.hass?.language||"de",r=h=>h==null?"\u2014":h.toLocaleString(s,{minimumFractionDigits:1,maximumFractionDigits:1}),o=n.target_temp_step??.5,a=n.temperature,l=document.createElement("div");l.className="climate",l.innerHTML=`
      <div class="cur"><small>Aktuell</small><b>${r(n.current_temperature)}<i>\xB0</i></b>${n.hvac_action?`<small class="act">${he(String(n.hvac_action)==="heating"?"heizt":String(n.hvac_action)==="cooling"?"k\xFChlt":String(n.hvac_action)==="idle"?"inaktiv":String(n.hvac_action))}</small>`:""}</div>
      ${a!=null?`<div class="target"><button data-d="-1" title="K\xE4lter">${Pe(Me.minus)}</button><div><small>Ziel</small><b>${r(a)}<i>\xB0</i></b></div><button data-d="1" title="W\xE4rmer">${Pe(Me.plus)}</button></div>`:""}`;let c;l.querySelectorAll("[data-d]").forEach(h=>h.addEventListener("click",()=>{if(a==null)return;let u=n.min_temp??5,p=n.max_temp??35;a=Math.max(u,Math.min(p,Math.round((a+Number(h.dataset.d)*o)/o)*o)),l.querySelector(".target b").innerHTML=`${r(a)}<i>\xB0</i>`,this.busyUntil=Date.now()+2500,c&&window.clearTimeout(c),c=window.setTimeout(()=>this.call("climate","set_temperature",{temperature:a}),700)})),t.appendChild(l);let d=n.hvac_modes??[];if(d.length){let h=document.createElement("div");h.className="chips-row",h.innerHTML=d.map(u=>`<button data-m="${he(u)}" class="${e.state===u?"on":""}">${he(d_[u]??u)}</button>`).join(""),h.addEventListener("click",u=>{let p=u.target.closest("[data-m]");p&&this.call("climate","set_hvac_mode",{hvac_mode:p.dataset.m})}),t.appendChild(h)}}renderCamera(t,e){let n=e.attributes.entity_picture,s=document.createElement("div");if(s.className="cam",!n){s.innerHTML='<div class="cam-off">Kein Bild verf\xFCgbar</div>',t.appendChild(s);return}let r=c=>this.hass?.hassUrl?this.hass.hassUrl(c):c,o=document.createElement("img");o.alt=Bi(e,e.entity_id);let a=()=>{o.src=r(`${n}${n.includes("?")?"&":"?"}_t=${Date.now()}`)};this.live?o.src=r(n.replace("/api/camera_proxy/","/api/camera_proxy_stream/")):a(),o.addEventListener("error",()=>s.classList.add("err")),o.addEventListener("load",()=>s.classList.remove("err")),s.appendChild(o);let l=document.createElement("div");l.className="cam-bar",l.innerHTML=`<span class="badge ${this.live?"live":""}">${this.live?"\u25CF LIVE":"Standbild"}</span><span class="grow"></span>
      <button data-c="snap" title="Neues Standbild">${Pe(Me.refresh)}</button>
      <button data-c="live" class="${this.live?"on":""}" title="Live-Bild">${Pe(Me.live)}<span>${this.live?"Live an":"Live"}</span></button>`,l.addEventListener("click",c=>{let d=c.target.closest("[data-c]");d&&(d.dataset.c==="snap"?(this.live=!1,this.render()):(this.live=!this.live,this.render()))}),s.appendChild(l),t.appendChild(s),this.camTimer&&window.clearInterval(this.camTimer),this.camTimer=this.live?void 0:window.setInterval(()=>this.dlg.open?a():void 0,1e4)}renderMedia(t,e){let n=e.attributes,s=e.state!=="off"&&e.state!=="unavailable"&&e.state!=="standby",r=document.createElement("div");r.className="media";let o=n.entity_picture;r.innerHTML=`
      ${o?`<img src="${he(this.hass?.hassUrl?this.hass.hassUrl(o):o)}" alt="">`:""}
      <div class="media-info"><b>${he(String(n.media_title??(s?ki(this.hass,e):"Aus")))}</b><span>${he(String(n.media_artist??n.media_album_name??n.app_name??""))}</span></div>`,t.appendChild(r);let a=document.createElement("div");a.className="btn-row media-btns",a.innerHTML=`<button data-s="media_previous_track" title="Zur\xFCck">${Pe(Me.prev)}</button><button data-s="media_play_pause" class="main" title="Wiedergabe / Pause">${Pe(e.state==="playing"?Me.pause:Me.play)}</button><button data-s="media_next_track" title="Weiter">${Pe(Me.next)}</button><button data-s="toggle" title="Ein / Aus" class="${s?"on":""}">${Pe(Me.power)}</button>`,a.addEventListener("click",l=>{let c=l.target.closest("[data-s]");c&&this.call("media_player",c.dataset.s)}),t.appendChild(a),n.volume_level!=null&&t.appendChild(this.slider(Math.round(n.volume_level*100),"var(--primary-color, #03a9f4)",l=>`Lautst\xE4rke ${l} %`,l=>this.call("media_player","volume_set",{volume_level:l/100})))}renderLock(t,e){let n=e.state==="locked",s=document.createElement("button");s.className=`big-toggle ${n?"":"on"}`,s.innerHTML=`${Pe(n?Me.lock:Me.unlock)}<span>${n?"Verriegelt":"Entriegelt"}</span><small>${n?"Tippen zum Entriegeln":"Tippen zum Verriegeln"}</small>`,s.addEventListener("click",()=>this.call("lock",n?"unlock":"lock")),t.appendChild(s)}renderNumber(t,e){let n=e.attributes,s=n.unit_of_measurement??"";t.appendChild(this.slider(Number(e.state)||0,"var(--primary-color, #03a9f4)",r=>`${r.toLocaleString(this.hass?.language||"de")} ${s}`.trim(),r=>this.call(tn(e.entity_id),"set_value",{value:r}),{min:n.min??0,max:n.max??100,step:n.step??1,cls:"tall"}))}renderSelect(t,e){let n=document.createElement("div");n.className="chips-row",n.innerHTML=(e.attributes.options??[]).map(s=>`<button data-o="${he(s)}" class="${e.state===s?"on":""}">${he(s)}</button>`).join(""),n.addEventListener("click",s=>{let r=s.target.closest("[data-o]");r&&this.call(tn(e.entity_id),"select_option",{option:r.dataset.o})}),t.appendChild(n)}async loadHistory(){let t=this.dlg.querySelector(".pop-hist .chart"),e=this.id;if(!t||!e||!this.hass)return;if(!this.hass.callWS){t.innerHTML='<div class="loading">Verlauf nicht verf\xFCgbar.</div>';return}let n=`${e}|${this.range}`;this.historyFor=n,t.innerHTML='<div class="loading">Lade Verlauf \u2026</div>';let s=new Date(Date.now()-this.range*36e5);try{let r=await this.hass.callWS({type:"history/history_during_period",start_time:s.toISOString(),entity_ids:[e],minimal_response:!0,no_attributes:!0,significant_changes_only:!1});if(this.historyFor!==n||!this.dlg.open)return;let o=(r?.[e]??[]).map(a=>({t:a.lu!=null?a.lu*1e3:a.lc!=null?a.lc*1e3:Date.parse(a.last_changed??a.last_updated??""),s:String(a.s??a.state??"")})).filter(a=>Number.isFinite(a.t));this.history=o,this.drawHistory(t,o,s.getTime())}catch(r){this.historyFor===n&&(t.innerHTML='<div class="loading">Verlauf konnte nicht geladen werden.</div>'),console.warn("floorplan-3d-card: Verlauf",r)}}drawHistory(t,e,n){let r=this.hass?.states[this.id]?.attributes.unit_of_measurement,o=e.filter(l=>l.s!=="unavailable"&&l.s!=="unknown"&&l.s!==""),a=o.length>0&&o.every(l=>l.s.trim()!==""&&Number.isFinite(Number(l.s)))&&(!!r||tn(this.id)==="sensor");if(!e.length){t.innerHTML='<div class="loading">Keine Daten im Zeitraum.</div>';return}a?this.lineChart(t,o,n,r??""):this.timeline(t,e,n)}timeLabel(t){let e=this.hass?.language||"de",n=new Date(t);return this.range>24?n.toLocaleDateString(e,{weekday:"short",day:"numeric",month:"numeric"}):n.toLocaleTimeString(e,{hour:"2-digit",minute:"2-digit"})}lineChart(t,e,n,s){let r=this.hass?.language||"de",o=Math.max(260,t.clientWidth||420),a=170,l={l:40,r:10,t:12,b:24},c=Date.now(),d=e.map(U=>Number(U.s)),h=Math.min(...d),u=Math.max(...d);u-h<1e-9&&(h-=1,u+=1);let p=u-h;h-=p*.08,u+=p*.08;let x=U=>l.l+(Math.max(U,n)-n)/(c-n)*(o-l.l-l.r),m=U=>l.t+(1-(U-h)/(u-h))*(a-l.t-l.b),g=new Map;for(let U of e){let z=Math.round(x(U.t)),q=g.get(z)??{sum:0,n:0,t:U.t};q.sum+=Number(U.s),q.n++,g.set(z,q)}let f=[...g.entries()].sort((U,z)=>U[0]-z[0]).map(([U,z])=>({x:U,v:z.sum/z.n})),y=f[f.length-1];f.push({x:x(c),v:y.v});let b=f.map((U,z)=>`${z?"L":"M"}${U.x.toFixed(1)},${m(U.v).toFixed(1)}`).join(" "),_=`${b} L${x(c).toFixed(1)},${a-l.b} L${f[0].x.toFixed(1)},${a-l.b} Z`,E=U=>U.toLocaleString(r,{maximumFractionDigits:p<10?1:0}),A=[h+(u-h)*.1,(h+u)/2,u-(u-h)*.1].map(U=>`<line x1="${l.l}" x2="${o-l.r}" y1="${m(U)}" y2="${m(U)}" class="g"/><text x="${l.l-6}" y="${m(U)+4}" class="yl">${E(U)}</text>`).join(""),P=[n,(n+c)/2,c].map((U,z)=>`<text x="${x(U)}" y="${a-6}" class="xl" text-anchor="${z===0?"start":z===2?"end":"middle"}">${z===2?"Jetzt":he(this.timeLabel(U))}</text>`).join(""),L=Math.min(...d),w=Math.max(...d),S=d.reduce((U,z)=>U+z,0)/d.length;t.innerHTML=`
      <svg class="line" width="${o}" height="${a}" viewBox="0 0 ${o} ${a}">
        <defs><linearGradient id="fp-grad" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="var(--pop-accent)" stop-opacity=".35"/><stop offset="1" stop-color="var(--pop-accent)" stop-opacity="0"/></linearGradient></defs>
        ${A}${P}
        <path d="${_}" fill="url(#fp-grad)"/>
        <path d="${b}" class="ln"/>
        <line class="cross" y1="${l.t}" y2="${a-l.b}" x1="-10" x2="-10"/>
        <circle class="dot" r="4" cx="-10" cy="-10"/>
      </svg>
      <div class="tip" hidden></div>
      <div class="stats"><span>Min <b>${E(L)} ${he(s)}</b></span><span>\xD8 <b>${E(S)} ${he(s)}</b></span><span>Max <b>${E(w)} ${he(s)}</b></span></div>`;let I=t.querySelector("svg"),D=I.querySelector(".cross"),H=I.querySelector(".dot"),O=t.querySelector(".tip");I.addEventListener("pointermove",U=>{let z=I.getBoundingClientRect(),q=(U.clientX-z.left)/z.width*o;if(q<l.l||q>o-l.r)return;let V=n+(q-l.l)/(o-l.l-l.r)*(c-n),rt=e[0];for(let ht of e)if(ht.t<=V)rt=ht;else break;let nt=Number(rt.s);D.setAttribute("x1",String(q)),D.setAttribute("x2",String(q)),H.setAttribute("cx",String(q)),H.setAttribute("cy",String(m(nt))),O.hidden=!1,I.classList.add("hover"),O.innerHTML=`<b>${E(nt)} ${he(s)}</b><span>${he(new Date(V).toLocaleString(r,{weekday:"short",hour:"2-digit",minute:"2-digit"}))}</span>`,O.style.left=`${Math.min(Math.max(q/o*100,12),88)}%`}),I.addEventListener("pointerleave",()=>{O.hidden=!0,I.classList.remove("hover")})}timeline(t,e,n){let s=Date.now(),r=this.hass,o=r.states[this.id],a=f=>o&&r.formatEntityState?g_(()=>r.formatEntityState(o,f),f):f,l=["var(--pop-accent)","#8e8e93","#ff9500","#34c759","#af52de","#ff3b30"],c=new Map,d=f=>{if(f==="unavailable"||f==="unknown")return"transparent";if(!c.has(f)){let y=di({entity_id:this.id,state:f,attributes:{}});c.set(f,y?l[0]:f==="off"||f==="closed"||f==="locked"||f==="not_home"?l[1]:l[2+c.size%4])}return c.get(f)},h=e.map((f,y)=>{let b=Math.max(f.t,n),_=y+1<e.length?e[y+1].t:s;return{s:f.s,t0:b,t1:_}}),u=s-n,p=h.filter(f=>f.t1>f.t0).map(f=>`<i style="left:${(f.t0-n)/u*100}%;width:${(f.t1-f.t0)/u*100}%;background:${d(f.s)}" title="${he(a(f.s))} \xB7 ${he(this.timeLabel(f.t0))}"></i>`).join(""),x=[...c.entries()].map(([f,y])=>`<span><i style="background:${y}"></i>${he(a(f))}</span>`).join(""),m=r.language||"de",g=h.slice().reverse().filter(f=>f.s!=="unavailable"&&f.s!=="unknown").slice(0,5).map(f=>`<div><i style="background:${d(f.s)}"></i><b>${he(a(f.s))}</b><span>${he(new Date(f.t0).toLocaleString(m,{weekday:"short",hour:"2-digit",minute:"2-digit"}))}</span></div>`).join("");t.innerHTML=`
      <div class="timeline">${p}</div>
      <div class="tl-axis"><span>${he(this.timeLabel(n))}</span><span>${he(this.timeLabel((n+s)/2))}</span><span>Jetzt</span></div>
      <div class="legend">${x}</div>
      ${g?`<div class="recent"><small>Letzte \xC4nderungen</small>${g}</div>`:""}`}};function g_(i,t){try{return i()}catch{return t}}function Cu(i){let t=parseInt(i.replace("#",""),16);return[t>>16&255,t>>8&255,t&255]}function x_(i){let t=i/100,e=t<=66?255:329.7*Math.pow(t-60,-.1332),n=t<=66?99.47*Math.log(t)-161.12:288.12*Math.pow(t-60,-.0755),s=t>=66?255:t<=19?0:138.52*Math.log(t-10)-305.04,r=o=>Math.round(Math.max(0,Math.min(255,o)));return`rgb(${r(e)},${r(n)},${r(s)})`}var Pu=`
dialog.fp-pop {
  --pop-accent: var(--primary-color, #03a9f4);
  --pop-surface: var(--card-background-color, #fff);
  --pop-surface-2: var(--secondary-background-color, #f2f2f2);
  --pop-text: var(--primary-text-color, #1c1c1c);
  --pop-muted: var(--secondary-text-color, #6b6b6b);
  --pop-border: var(--divider-color, rgba(127,127,127,.22));
  width: min(440px, calc(100vw - 24px)); max-height: calc(100vh - 32px); overflow: auto; box-sizing: border-box;
  border: 1px solid var(--pop-border); border-radius: 28px; padding: 18px 18px 14px;
  background: var(--pop-surface); color: var(--pop-text);
  box-shadow: 0 24px 60px rgba(0,0,0,.35);
  font-family: var(--paper-font-body1_-_font-family, system-ui, sans-serif);
}
dialog.fp-pop.wide { width: min(760px, calc(100vw - 24px)); }
dialog.fp-pop[open] { animation: fp-pop-in .18s ease-out; }
@keyframes fp-pop-in { from { opacity: 0; transform: translateY(12px) scale(.98); } to { opacity: 1; transform: none; } }
dialog.fp-pop::backdrop { background: rgba(0,0,0,.42); backdrop-filter: blur(3px); }
dialog.fp-pop * { box-sizing: border-box; }
dialog.fp-pop svg { width: 22px; height: 22px; fill: currentColor; flex: none; }
dialog.fp-pop button { font: inherit; color: inherit; cursor: pointer; }

.pop-head { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
.pop-icon {
  --pop-icon-color: var(--pop-muted);
  width: 46px; height: 46px; border-radius: 50%; flex: none; display: grid; place-items: center;
  background: color-mix(in srgb, var(--pop-icon-color) 16%, transparent); color: var(--pop-icon-color);
  --mdc-icon-size: 26px; transition: background .2s, color .2s;
}
.pop-icon.on { --pop-icon-color: var(--state-active-color, #ffb300); }
.pop-icon b { font-size: 20px; }
.pop-icon svg { width: 26px !important; height: 26px !important; }
.pop-title { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
.pop-title b { font-size: 18px; font-weight: 600; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.pop-sub { font-size: 13px; color: var(--pop-muted); }
.pop-btn { width: 38px; height: 38px; border-radius: 50%; border: none; background: transparent; display: grid; place-items: center; color: var(--pop-muted); }
.pop-btn:hover { background: var(--pop-surface-2); color: var(--pop-text); }

.pop-body { display: flex; flex-direction: column; gap: 14px; }
.sec-label { font-size: 12px; font-weight: 600; color: var(--pop-muted); text-transform: uppercase; letter-spacing: .05em; width: 100%; }

.pop-slider {
  --fill-color: var(--pop-accent);
  position: relative; height: 52px; border-radius: 16px; overflow: hidden; cursor: pointer; touch-action: none; user-select: none;
  background: var(--pop-surface-2); display: flex; align-items: center; gap: 10px; padding: 0 16px; outline: none; flex: 1;
}
.pop-slider.tall { height: 68px; border-radius: 20px; }
.pop-slider:focus-visible { box-shadow: 0 0 0 2px var(--pop-accent); }
.pop-slider .fill { position: absolute; inset: 0 auto 0 0; background: var(--fill-color); transition: width .15s; }
.pop-slider.drag .fill { transition: none; }
.pop-slider span, .pop-slider svg { position: relative; font-size: 16px; font-weight: 600; mix-blend-mode: normal; color: var(--pop-text); text-shadow: 0 0 6px var(--pop-surface); }
.light-row { display: flex; gap: 10px; align-items: stretch; }
.round-btn {
  --btn-color: var(--state-active-color, #ffb300);
  flex: none; width: 68px; border-radius: 20px; border: none; display: grid; place-items: center;
  background: var(--pop-surface-2); color: var(--pop-muted); transition: background .2s, color .2s;
}
.round-btn.on { background: var(--btn-color); color: #fff; box-shadow: 0 6px 20px color-mix(in srgb, var(--btn-color) 45%, transparent); }
.round-btn svg { width: 28px !important; height: 28px !important; }

.swatches, .temps { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
.swatch { width: 34px; height: 34px; border-radius: 50%; border: 2px solid var(--pop-surface); box-shadow: 0 0 0 1px var(--pop-border); padding: 0; transition: transform .12s; }
.swatch:hover { transform: scale(1.12); }
.swatch.custom { position: relative; overflow: hidden; cursor: pointer; background: conic-gradient(red, yellow, lime, cyan, blue, magenta, red); }
.swatch.custom input { position: absolute; inset: -8px; width: 60px; height: 60px; opacity: 0; cursor: pointer; }
.temps button, .chips-row button, .chips button {
  border: 1px solid var(--pop-border); background: var(--pop-surface); border-radius: 999px; padding: 7px 12px; font-size: 13px;
  display: inline-flex; align-items: center; gap: 6px;
}
.temps button i { width: 14px; height: 14px; border-radius: 50%; box-shadow: inset 0 0 0 1px rgba(0,0,0,.15); }
.temps button.on, .chips-row button.on, .chips button.on { background: var(--pop-accent); border-color: transparent; color: var(--text-primary-color, #fff); }
.chips-row { display: flex; flex-wrap: wrap; gap: 8px; }

.big-toggle {
  border: none; border-radius: 22px; padding: 22px; display: flex; flex-direction: column; align-items: center; gap: 6px;
  background: var(--pop-surface-2); transition: background .2s, color .2s, transform .1s;
}
.big-toggle svg { width: 40px !important; height: 40px !important; color: var(--pop-muted); }
.big-toggle span { font-size: 17px; font-weight: 600; }
.big-toggle small { font-size: 12px; color: var(--pop-muted); }
.big-toggle.on { background: color-mix(in srgb, var(--state-active-color, #ffb300) 22%, var(--pop-surface)); }
.big-toggle.on svg { color: var(--state-active-color, #ffb300); }
.big-toggle:active { transform: scale(.98); }
.big-toggle.run svg { color: var(--pop-accent); }
.big-toggle.done { background: color-mix(in srgb, #34c759 25%, var(--pop-surface)); }

.big-value { font-size: 46px; font-weight: 300; text-align: center; padding: 8px 0 2px; letter-spacing: -.02em; }
.big-value small { font-size: 20px; color: var(--pop-muted); margin-left: 6px; font-weight: 400; }
.big-value.text { font-size: 30px; font-weight: 500; }
.big-value.text.on { color: var(--state-active-color, #ffb300); }

.btn-row { display: flex; gap: 8px; }
.btn-row button {
  flex: 1; border: none; border-radius: 16px; padding: 12px 8px; background: var(--pop-surface-2);
  display: flex; flex-direction: column; align-items: center; gap: 4px; font-size: 13px;
}
.btn-row button:hover { background: color-mix(in srgb, var(--pop-accent) 14%, var(--pop-surface-2)); }
.btn-row button.on { color: var(--state-active-color, #ffb300); }
.media-btns button.main { background: var(--pop-accent); color: var(--text-primary-color, #fff); }

.climate { display: flex; gap: 12px; }
.climate > div { flex: 1; border-radius: 20px; background: var(--pop-surface-2); padding: 14px; display: flex; align-items: center; justify-content: center; gap: 10px; }
.climate .cur { flex-direction: column; gap: 2px; }
.climate small { font-size: 12px; color: var(--pop-muted); }
.climate small.act { color: var(--state-climate-heat-color, #ff8100); font-weight: 600; }
.climate b { font-size: 34px; font-weight: 400; }
.climate b i { font-style: normal; font-size: 22px; vertical-align: top; color: var(--pop-muted); }
.climate .target > div { display: flex; flex-direction: column; align-items: center; }
.climate .target button { width: 42px; height: 42px; border-radius: 50%; border: none; background: var(--pop-surface); display: grid; place-items: center; }

.cam { position: relative; border-radius: 18px; overflow: hidden; background: #000; }
.cam img { display: block; width: 100%; max-height: 70vh; object-fit: contain; min-height: 180px; }
.cam.err img { visibility: hidden; }
.cam.err::after { content: "Bild nicht verf\xFCgbar"; position: absolute; inset: 0; display: grid; place-items: center; color: #bbb; }
.cam-off { padding: 60px 20px; text-align: center; color: #bbb; }
.cam-bar { position: absolute; left: 0; right: 0; bottom: 0; display: flex; align-items: center; gap: 8px; padding: 10px; background: linear-gradient(transparent, rgba(0,0,0,.65)); color: #fff; }
.cam-bar .grow { flex: 1; }
.cam-bar button { border: none; border-radius: 999px; padding: 7px 12px; background: rgba(255,255,255,.18); color: #fff; display: inline-flex; align-items: center; gap: 6px; font-size: 13px; backdrop-filter: blur(6px); }
.cam-bar button svg { width: 18px; height: 18px; }
.cam-bar button.on { background: #e53935; }
.badge { font-size: 12px; font-weight: 700; padding: 3px 8px; border-radius: 6px; background: rgba(0,0,0,.45); }
.badge.live { background: #e53935; }

.media { display: flex; gap: 12px; align-items: center; }
.media img { width: 72px; height: 72px; border-radius: 12px; object-fit: cover; }
.media-info { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
.media-info b { font-size: 16px; }
.media-info span { font-size: 13px; color: var(--pop-muted); }

.pop-hist { margin-top: 18px; }
.hist-head { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 8px; }
.hist-head > span { font-size: 12px; font-weight: 600; color: var(--pop-muted); text-transform: uppercase; letter-spacing: .05em; }
.chips { display: flex; gap: 4px; }
.chips button { padding: 4px 10px; font-size: 12px; }
.chart { position: relative; min-height: 80px; }
.chart .loading { padding: 28px 0; text-align: center; color: var(--pop-muted); font-size: 13px; }
.chart svg.line { display: block; width: 100%; height: auto; overflow: visible; touch-action: pan-y; }
.chart .g { stroke: var(--pop-border); stroke-width: 1; }
.chart .yl { font-size: 11px; fill: var(--pop-muted); text-anchor: end; }
.chart .xl { font-size: 11px; fill: var(--pop-muted); }
.chart .ln { fill: none; stroke: var(--pop-accent); stroke-width: 2.2; stroke-linejoin: round; stroke-linecap: round; }
.chart .cross { stroke: var(--pop-muted); stroke-dasharray: 3 3; visibility: hidden; }
.chart .dot { fill: var(--pop-accent); stroke: var(--pop-surface); stroke-width: 2; visibility: hidden; }
.chart svg.hover .cross, .chart svg.hover .dot { visibility: visible; }
dialog.fp-pop:focus { outline: none; }
.chart .tip { position: absolute; top: -6px; transform: translateX(-50%); background: var(--pop-text); color: var(--pop-surface); border-radius: 10px; padding: 5px 9px; font-size: 12px; display: flex; flex-direction: column; align-items: center; pointer-events: none; white-space: nowrap; }
.chart .tip span { opacity: .75; font-size: 11px; }
.chart .tip[hidden] { display: none; }
.chart .stats { display: flex; justify-content: space-around; margin-top: 8px; font-size: 12px; color: var(--pop-muted); }
.chart .stats b { color: var(--pop-text); font-weight: 600; }
.timeline { position: relative; height: 34px; border-radius: 10px; overflow: hidden; background: var(--pop-surface-2); }
.timeline i { position: absolute; top: 0; bottom: 0; }
.tl-axis { display: flex; justify-content: space-between; font-size: 11px; color: var(--pop-muted); margin-top: 4px; }
.legend { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 8px; font-size: 12px; }
.legend span, .recent div { display: inline-flex; align-items: center; gap: 6px; }
.legend i, .recent i { width: 10px; height: 10px; border-radius: 3px; flex: none; }
.recent { display: flex; flex-direction: column; gap: 6px; margin-top: 12px; font-size: 13px; }
.recent small { font-size: 12px; color: var(--pop-muted); }
.recent div span { margin-left: auto; color: var(--pop-muted); font-size: 12px; }

.pop-attrs { margin-top: 14px; border-top: 1px solid var(--pop-border); padding-top: 10px; }
.pop-attrs summary { cursor: pointer; font-size: 13px; color: var(--pop-muted); }
.attr-list { display: flex; flex-direction: column; gap: 4px; margin-top: 8px; font-size: 13px; }
.attr-list div { display: flex; justify-content: space-between; gap: 12px; }
.attr-list span { color: var(--pop-muted); text-transform: capitalize; }
.attr-list b { font-weight: 500; text-align: right; word-break: break-word; }

@media (max-width: 600px) {
  dialog.fp-pop, dialog.fp-pop.wide {
    width: 100vw; max-width: 100vw; margin: auto 0 0; border-radius: 26px 26px 0 0; border-bottom: none;
    max-height: 92vh; padding-bottom: max(14px, env(safe-area-inset-bottom));
  }
  dialog.fp-pop[open] { animation: fp-sheet-in .22s ease-out; }
  @keyframes fp-sheet-in { from { transform: translateY(40px); opacity: .4; } to { transform: none; opacity: 1; } }
}
`;var ol=class extends HTMLElement{constructor(){super();this.floors=[];this.floorIdx=0;this.onWindowResize=()=>this.updateHeight();this.root=this.attachShadow({mode:"open"}),this.root.innerHTML=`
      <style>
        :host { display: block; }
        ha-card { overflow: hidden; position: relative; }
        .title { padding: 12px 16px 0; font-size: 1.2em; font-weight: 500; color: var(--primary-text-color); }
        .title:empty { display: none; }
        .stage { position: relative; width: 100%; isolation: isolate; }
        :host(.full-page) ha-card { border-radius: 0; border: none; }
        ha-card:fullscreen { border-radius: 0; background: var(--primary-background-color, #111); }
        .controls { position: absolute; right: 8px; bottom: 8px; z-index: 2; display: flex; gap: 6px; }
        .controls button {
          border: none; border-radius: 50%; width: 32px; height: 32px; cursor: pointer; padding: 0;
          background: var(--secondary-background-color, #eee); color: var(--primary-text-color, #222);
          opacity: .75; display: flex; align-items: center; justify-content: center;
        }
        .controls button:hover { opacity: 1; }
        .controls svg { width: 18px; height: 18px; fill: currentColor; }
        .floors {
          position: absolute; left: 8px; top: 8px; z-index: 2; display: flex; flex-wrap: wrap; gap: 2px; padding: 3px;
          border-radius: 12px; background: color-mix(in srgb, var(--card-background-color, #fff) 80%, transparent);
          backdrop-filter: blur(6px); box-shadow: 0 1px 4px rgba(0,0,0,.18);
        }
        .floors[hidden] { display: none; }
        .floors button {
          font: inherit; font-size: 13px; border: none; border-radius: 9px; padding: 6px 12px; cursor: pointer;
          background: transparent; color: var(--primary-text-color, #222);
        }
        .floors button:hover { background: color-mix(in srgb, var(--primary-color, #03a9f4) 14%, transparent); }
        .floors button.on { background: var(--primary-color, #03a9f4); color: var(--text-primary-color, #fff); }
        ${sl}
        ${Pu}
      </style>
      <ha-card>
        <div class="title"></div>
        <div class="stage">
          <div class="floors" hidden></div>
          <div class="controls">
            <button class="reset" title="Ansicht zur\xFCcksetzen"><svg viewBox="0 0 24 24"><path d="M12 5V1L7 6l5 5V7a6 6 0 1 1-6 6H4a8 8 0 1 0 8-8z"/></svg></button>
            <button class="fullscreen" title="Vollbild"><svg viewBox="0 0 24 24"><path d="M5 5h5v2H7v3H5zm9 0h5v5h-2V7h-3zM5 14h2v3h3v2H5zm12 0h2v5h-5v-2h3z"/></svg></button>
          </div>
        </div>
      </ha-card>`,this.stage=this.root.querySelector(".stage"),this.titleEl=this.root.querySelector(".title"),this.floorsEl=this.root.querySelector(".floors"),this.floorsEl.addEventListener("click",e=>{let n=e.target.closest("button[data-floor]");n&&this.showFloor(Number(n.dataset.floor))}),this.root.querySelector(".reset").addEventListener("click",()=>this.viewer?.resetView()),this.root.querySelector(".fullscreen").addEventListener("click",()=>this.toggleFullscreen())}static getConfigElement(){return document.createElement("floorplan-3d-card-editor")}static getStubConfig(){return{title:"Wohnung",floorplan:Ru}}toggleFullscreen(){let e=this.root.querySelector("ha-card");document.fullscreenElement?document.exitFullscreen().catch(()=>{}):e.requestFullscreen?.().catch(n=>console.warn("floorplan-3d-card: Vollbild nicht m\xF6glich",n))}updateHeight(){let e=this._config;if(!e)return;let n=this.root.querySelector("ha-card"),s=this.titleEl.offsetHeight,r;if(document.fullscreenElement===n)r=window.innerHeight-s;else if(e.full_page){let o=this.getBoundingClientRect().top+(document.scrollingElement?.scrollTop??0);r=Math.max(300,window.innerHeight-Math.max(o,0)-s-8)}else r=e.height??ve.height;if(this.stage.style.height=`${Math.round(r)}px`,e.full_page&&document.fullscreenElement!==n){let a=(document.scrollingElement??document.documentElement).scrollHeight-window.innerHeight;a>0&&a<200&&(this.stage.style.height=`${Math.max(300,Math.round(r-a))}px`)}}setConfig(e){if(!e)throw new Error("Ung\xFCltige Konfiguration");this._config={...e},this.floors=Vs(e),this.floorIdx=Math.min(this.floorIdx,this.floors.length-1),this.titleEl.textContent=e.title??"",this.classList.toggle("full-page",!!e.full_page),this.renderFloors(),this.updateHeight(),this.viewer?.setConfig(this.viewConfig())}viewConfig(){if(this._config)return{...this._config,floorplan:this.floors[this.floorIdx]?.floorplan}}renderFloors(){this.floorsEl.hidden=this.floors.length<2,this.floorsEl.innerHTML=this.floors.map((e,n)=>`<button data-floor="${n}" class="${n===this.floorIdx?"on":""}">${e.name.replace(/[&<>"]/g,s=>`&#${s.charCodeAt(0)};`)}</button>`).join("")}showFloor(e){e===this.floorIdx||!this.floors[e]||(this.floorIdx=e,this.renderFloors(),this.viewer?.setConfig(this.viewConfig()))}set hass(e){this._hass=e,this.viewer?.setHass(e),this.popup?.update(e)}get hass(){return this._hass}getCardSize(){return Math.ceil((this._config?.height??ve.height)/50)+1}getGridOptions(){return this._config?.full_page?{columns:"full",rows:"auto"}:{columns:12,min_columns:6,rows:Math.ceil((this._config?.height??ve.height)/56)+1}}connectedCallback(){window.addEventListener("resize",this.onWindowResize),document.addEventListener("fullscreenchange",this.onWindowResize),requestAnimationFrame(()=>this.updateHeight()),setTimeout(()=>this.updateHeight(),300),!this.viewer&&(this.viewer=new Os,this.viewer.onHotspot=(e,n)=>this.handle(e,n),this.stage.prepend(this.viewer.element),this._config&&this.viewer.setConfig(this.viewConfig()),this._hass&&this.viewer.setHass(this._hass))}disconnectedCallback(){window.removeEventListener("resize",this.onWindowResize),document.removeEventListener("fullscreenchange",this.onWindowResize),this.popup?.close(),this.viewer?.dispose(),this.viewer=void 0}handle(e,n){if(!(!this._hass||!e.entity)){if(n==="tap"&&(e.double_tap_action??"none")!=="none"){let s=this.pendingTap;if(s&&window.clearTimeout(s.timer),this.pendingTap=void 0,s?.id===e.id)return this.run(e,"double_tap");let r=window.setTimeout(()=>{this.pendingTap=void 0,this.run(e,"tap")},260);this.pendingTap={id:e.id,timer:r};return}this.run(e,n)}}run(e,n){if(!this._hass)return;let s=this._config?.info_dialog!=="ha";sh(this._hass,this,e,n,s?r=>this.openInfo(r):void 0).catch(r=>console.error("floorplan-3d-card:",r))}openInfo(e){this._hass&&(this.popup??(this.popup=new rl(this.root,this)),this.popup.open(this._hass,e))}};var ks;function Iu(){if(ks)return ks;ks=new Map;let i;try{i=new Is({antialias:!0,alpha:!0,preserveDrawingBuffer:!0})}catch{return ks}let t=112;i.setPixelRatio(1),i.setSize(t,t,!1),i.outputColorSpace=be;let e=new bi;e.add(new Ti(16777215,9076592,2));let n=new Ai(16777215,1.6);n.position.set(3,6,4),e.add(n);let s=new Ee(30,1,.01,100),r=(o,a,l)=>{e.add(a);let c=new on().setFromObject(a).getBoundingSphere(new Hn),d=c.radius/Math.sin(Pi.degToRad(15))*1.02;s.position.copy(c.center).addScaledVector(l.normalize(),d),s.lookAt(c.center),i.render(e,s),ks.set(o,i.domElement.toDataURL("image/png")),e.remove(a),a.traverse(h=>{let u=h;u.geometry?.dispose(),u.material?.dispose?.()})};for(let o of Us){let a=new Fe({color:o.color,roughness:.7});r(o.id,el(o.id,o.w,o.d,o.h,a),new R(.75,.6,1))}for(let o of Fi){let a=new Fe({color:15262940,roughness:.85}),l=new Fe({color:10474495,transparent:!0,opacity:.45,roughness:.1,depthWrite:!1});r(o.key,wu(o,a,l),new R(.35,.15,-1))}return i.dispose(),i.forceContextLoss(),ks}var Zc=[{id:"select",label:"Ausw\xE4hlen",icon:"M7 2l12 11.2-5.8.5 3.3 7.3-2.2 1-3.2-7.4L7 18.5z",hint:"Element anklicken zum Bearbeiten, ziehen zum Verschieben. Leere Fl\xE4che oder rechte Maustaste ziehen = Ansicht verschieben, Mausrad = Zoom."},{id:"box",label:"Raum + W\xE4nde",icon:"M3 3h18v18H3zm2 2v14h14V5z",hint:"Rechteck aufziehen: erzeugt vier W\xE4nde und einen Raum. Rechte Maustaste gedr\xFCckt halten und ziehen = Ansicht verschieben."},{id:"wall",label:"Wand",icon:"M3 16h18v4H3zm0-6h8v4H3zm10 0h8v4h-8zM3 4h18v4H3z",hint:"Klicken setzt Wandpunkte. Doppelklick, Rechtsklick oder Esc beendet die Wand. Rechte Maustaste gedr\xFCckt halten und ziehen = Ansicht verschieben."},{id:"room",label:"Raum",icon:"M12 3 2 12h3v8h14v-8h3z",hint:"Rechteck aufziehen oder Eckpunkte klicken. Klick auf den ersten Punkt schlie\xDFt den Raum. Rechte Maustaste gedr\xFCckt halten und ziehen = Ansicht verschieben."},{id:"door",label:"T\xFCr",icon:"M8 3h10v18h-2V5H8v16H6V3zm2 8h2v2h-2z",hint:"Auf eine Wand klicken, um eine T\xFCr einzusetzen. Rechte Maustaste gedr\xFCckt halten und ziehen = Ansicht verschieben."},{id:"window",label:"Fenster",icon:"M4 4h16v16H4zm2 2v5h5V6zm7 0v5h5V6zm-7 7v5h5v-5zm7 0v5h5v-5z",hint:"Auf eine Wand klicken, um ein Fenster einzusetzen. Rechte Maustaste gedr\xFCckt halten und ziehen = Ansicht verschieben."},{id:"hotspot",label:"Hitbox",icon:"M12 2 3 7v10l9 5 9-5V7zm0 2.3L18.7 8 12 11.7 5.3 8zM5 9.7l6 3.3v6.6l-6-3.3zm8 9.9V13l6-3.3v6.6z",hint:"Rechteck aufziehen (oder klicken f\xFCr 50\xD750 cm), danach eine Entit\xE4t zuweisen. Rechte Maustaste gedr\xFCckt halten und ziehen = Ansicht verschieben."}],jc="T\xFCren & Fenster",Lu=[jc,...$c],Du="floorplan-3d-card-editor-lib",Kc=i=>i*Math.PI/180;function al(i,t,e){let n=Kc(i.rotation??0);return{x:i.x+t*Math.cos(n)-e*Math.sin(n),y:i.y+t*Math.sin(n)+e*Math.cos(n)}}var Qt=i=>i.replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),ye=i=>Math.round(i*10)/10,cl=class extends HTMLElement{constructor(){super();this.floors=[];this.floorIdx=0;this.fp=Dn(void 0);this.lastEmitted="";this.built=!1;this.tool="select";this.draft=[];this.history=[];this.future=[];this.vb={x:-100,y:-100,w:1100};this.snapEnabled=!0;this.tab="2d";this.entityIds=[];this.wide=!1;this.libCategory=jc;this.libQuery="";this.thumbsPending=!1;this.lastCanvasWidth=0;this.lastCanvasHeight=0;this.autoFit=!0;this.onWindowResize=()=>{this.wide&&this.fitHeight()};this.root=this.attachShadow({mode:"open"})}set lovelace(e){this._lovelace=e,this.built&&this.renderGeneral()}get lovelace(){return this._lovelace}isPanelView(){let e=this._lovelace?.views;if(!e?.length)return;let n="";try{n=decodeURIComponent(location.pathname.split("/")[2]??"")}catch{}let s=e.find(r=>r.path!==void 0&&r.path===n);return!s&&/^\d*$/.test(n)&&(s=e[n===""?0:Number(n)]),s?s.type==="panel":void 0}set hass(e){let n=!this._hass;this._hass=e,this.viewer?.setHass(e);let s=Object.keys(e.states);(n||s.length!==this.entityIds.length)&&(this.entityIds=s.sort())}setConfig(e){if(JSON.stringify(e)===this.lastEmitted&&this.built)return;let s=!this.config;this.config={...e},this.floors=structuredClone(Vs(e)),this.floorIdx=Math.min(this.floorIdx,this.floors.length-1),this.fp=this.floors[this.floorIdx].floorplan,this.built||this.build(),this.sel&&!this.find(this.sel)&&(this.sel=void 0),this.renderGeneral(),s&&this.fitView(),this.render()}disconnectedCallback(){this.viewer?.dispose(),this.viewer=void 0,this.tab="2d",this.built=!1,window.removeEventListener("resize",this.onWindowResize),this.injectBaseStyle(!1)}injectBaseStyle(e){e&&(this.dialogRoot=this.findAncestor("hui-dialog-edit-card")?.shadowRoot??void 0);let n=this.dialogRoot;if(!n)return;let s=n.getElementById(Uu);e&&!s?(s=document.createElement("style"),s.id=Uu,s.textContent=__,n.appendChild(s)):e||(s?.remove(),this.dialogRoot=void 0)}connectedCallback(){window.addEventListener("resize",this.onWindowResize),this.config&&!this.built&&(this.build(),this.renderGeneral(),this.render());let e=!1;try{e=localStorage.getItem(Nu)==="1"}catch{}setTimeout(()=>{this.isConnected&&(this.injectBaseStyle(!0),e&&this.toggleWide(!0))},50)}commit(){let e={...this.config},n=s=>{let r=structuredClone(s);return r.objects.length||delete r.objects,r};this.floors.length>1?(e.floors=this.floors.map(s=>({...s,floorplan:n(s.floorplan)})),delete e.floorplan):(e.floorplan=n(this.fp),delete e.floors),this.config=e,this.emit(),this.viewer?.setConfig(this.viewConfig())}viewConfig(){return{...this.config,floorplan:this.fp}}stateJson(){return JSON.stringify({floors:this.floors,idx:this.floorIdx})}restoreState(e){let n=JSON.parse(e);this.floors=n.floors,this.floorIdx=Math.min(n.idx,n.floors.length-1),this.fp=this.floors[this.floorIdx].floorplan}emit(){this.lastEmitted=JSON.stringify(this.config),this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this.config},bubbles:!0,composed:!0}))}snapshot(){this.history.push(this.stateJson()),this.history.length>100&&this.history.shift(),this.future=[]}undo(){let e=this.history.pop();e&&(this.future.push(this.stateJson()),this.restoreState(e),this.sel&&!this.find(this.sel)&&(this.sel=void 0),this.commit(),this.renderFloors(),this.render())}redo(){let e=this.future.pop();e&&(this.history.push(this.stateJson()),this.restoreState(e),this.sel&&!this.find(this.sel)&&(this.sel=void 0),this.commit(),this.renderFloors(),this.render())}find(e){return{wall:this.fp.walls,opening:this.fp.openings,room:this.fp.rooms,hotspot:this.fp.hotspots,object:this.fp.objects}[e.kind].find(s=>s.id===e.id)}deleteSelection(){if(!this.sel)return;this.snapshot();let{kind:e,id:n}=this.sel;e==="wall"?(this.fp.walls=this.fp.walls.filter(s=>s.id!==n),this.fp.openings=this.fp.openings.filter(s=>s.wall!==n)):e==="opening"?this.fp.openings=this.fp.openings.filter(s=>s.id!==n):e==="room"?this.fp.rooms=this.fp.rooms.filter(s=>s.id!==n):e==="object"?this.fp.objects=this.fp.objects.filter(s=>s.id!==n):this.fp.hotspots=this.fp.hotspots.filter(s=>s.id!==n),this.sel=void 0,this.commit(),this.render()}setTool(e,n){this.tool=e,this.draft=[],this.drag=void 0,e!=="object"&&(this.placing=void 0),this.openingPreset=e==="door"||e==="window"?n:void 0,this.root.querySelectorAll(".tool").forEach(s=>s.classList.toggle("on",s.dataset.tool===e)),this.hintEl.textContent=this.toolHint(),this.markLibrary(),this.render2d()}toolHint(){return this.tool==="object"?`In den Grundriss klicken, um \u201E${(this.placing?In(this.placing):void 0)?.label??"Objekt"}\u201C zu platzieren. Esc = abbrechen.`:this.openingPreset?`Auf eine Wand klicken, um \u201E${this.openingPreset.label}\u201C einzusetzen. Esc = abbrechen.`:Zc.find(e=>e.id===this.tool).hint}build(){this.built=!0,this.lastCanvasWidth=0,this.root.innerHTML=`
      <style>${b_}${sl}</style>
      <div class="layout">
        <aside class="side">
          <button data-act="wide" class="wide-btn" title="Editor als gro\xDFes Fenster anzeigen">
            <svg viewBox="0 0 24 24"><path d="M3 3h7v2H6.4l4.3 4.3-1.4 1.4L5 6.4V10H3zm11 0h7v7h-2V6.4l-4.3 4.3-1.4-1.4L17.6 5H14zM3 14h2v3.6l4.3-4.3 1.4 1.4L6.4 19H10v2H3zm16 0h2v7h-7v-2h3.6l-4.3-4.3 1.4-1.4 4.3 4.3z"/></svg>
            <span>Gro\xDFansicht</span>
          </button>
          <section class="sec floors-sec">
            <div class="props-head"><h3>Etagen</h3><button data-act="floor-add" title="Neue, leere Etage anlegen">+ Etage</button></div>
            <div class="seg floor-list"></div>
            <div class="floor-edit"></div>
          </section>
          <section class="sec props"></section>
          <section class="sec lib">
            <div class="props-head"><h3>Objekte</h3><span class="lib-note">Anklicken und im Grundriss platzieren oder hineinziehen</span></div>
            <input class="lib-search" type="search" placeholder="Suchen, z.B. Sofa, Kugel, Fenster \u2026" autocomplete="off">
            <div class="lib-cats"></div>
            <div class="lib-grid"></div>
            <details class="placed"><summary>Platzierte Objekte</summary><div class="placed-list"></div></details>
          </section>
          <section class="sec general-sec"><h3>Allgemein</h3><div class="general"></div></section>
          <details class="sec extra">
            <summary>Hintergrundbild (zum Nachzeichnen)</summary>
            <div class="bg grid2"></div>
          </details>
          <details class="sec extra">
            <summary>Import / Export (JSON)</summary>
            <textarea class="json" rows="8" spellcheck="false"></textarea>
            <div class="row"><button data-act="export">Aktuellen Grundriss anzeigen</button><button data-act="import">Importieren</button><button data-act="clear" class="danger">Alles l\xF6schen</button></div>
          </details>
        </aside>
        <div class="main">
          <div class="topbar">
            <div class="seg tabs">
              <button data-tab="2d" class="on">Grundriss (2D)</button>
              <button data-tab="3d">3D-Vorschau</button>
              <button data-tab="both">2D + 3D</button>
            </div>
          </div>
          <div class="tools2d">
            <div class="toolbar">
              <div class="seg tools">
                ${Zc.map(n=>`<button class="tool ${n.id===this.tool?"on":""}" data-tool="${n.id}" title="${n.hint}"><svg viewBox="0 0 24 24"><path d="${n.icon}"/></svg><span>${n.label}</span></button>`).join("")}
              </div>
              <span class="sep"></span>
              <div class="seg actions">
                <button data-act="undo" title="R\xFCckg\xE4ngig (Strg+Z)"><svg viewBox="0 0 24 24"><path d="M12.5 8c-2.65 0-5.05 1-6.9 2.6L2 7v9h9l-3.62-3.62A7.95 7.95 0 0 1 20.4 16l2.37-.78A10.5 10.5 0 0 0 12.5 8z"/></svg></button>
                <button data-act="redo" title="Wiederholen (Strg+Y)"><svg viewBox="0 0 24 24"><path d="M18.4 10.6A10.46 10.46 0 0 0 1.23 15.22L3.6 16a7.95 7.95 0 0 1 13.02-3.62L13 16h9V7z"/></svg></button>
                <button data-act="delete" title="Auswahl l\xF6schen (Entf)"><svg viewBox="0 0 24 24"><path d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z"/></svg></button>
                <button data-act="fit" title="Alles anzeigen"><svg viewBox="0 0 24 24"><path d="M5 5h5v2H7v3H5zm9 0h5v5h-2V7h-3zM5 14h2v3h3v2H5zm12 0h2v5h-5v-2h3z"/></svg></button>
              </div>
              <label class="snap"><input type="checkbox" data-act="snap" checked> Raster</label>
            </div>
            <div class="hint"></div>
          </div>
          <div class="panes">
            <div class="pane-2d">
              <div class="canvas" tabindex="0"><svg xmlns="http://www.w3.org/2000/svg"></svg></div>
            </div>
            <div class="pane-3d" hidden>
              <div class="viewer3d"></div>
            </div>
          </div>
          <div class="row cam" hidden>
            <button data-act="cam-save">Diese Ansicht als Startansicht speichern</button>
            <button data-act="cam-clear">Startansicht zur\xFCcksetzen</button>
          </div>
        </div>
      </div>`,this.svg=this.root.querySelector(".canvas svg"),this.propsEl=this.root.querySelector(".props"),this.hintEl=this.root.querySelector(".hint"),this.hintEl.textContent=Zc.find(n=>n.id===this.tool).hint,this.root.querySelectorAll(".tool").forEach(n=>n.addEventListener("click",()=>this.setTool(n.dataset.tool))),this.root.querySelectorAll("[data-act]").forEach(n=>{let s=n.dataset.act;s==="snap"?n.addEventListener("change",()=>this.snapEnabled=n.checked):n.addEventListener("click",()=>this.action(s))}),this.root.querySelectorAll(".tabs button").forEach(n=>n.addEventListener("click",()=>this.showTab(n.dataset.tab)));let e=this.root.querySelector(".canvas");e.addEventListener("pointerdown",n=>this.onDown(n)),e.addEventListener("pointermove",n=>this.onMove(n)),e.addEventListener("pointerup",n=>this.onUp(n)),e.addEventListener("pointerleave",()=>{this.cursor=void 0,this.tool!=="select"&&this.render2d()}),e.addEventListener("dblclick",()=>this.finishDraft()),e.addEventListener("contextmenu",n=>n.preventDefault()),e.addEventListener("wheel",n=>this.onWheel(n),{passive:!1}),e.addEventListener("keydown",n=>this.onKey(n)),new ResizeObserver(()=>this.onCanvasResize()).observe(e),this.root.querySelector(".floor-list").addEventListener("click",n=>{let s=n.target.closest("button[data-floor]");s&&this.switchFloor(Number(s.dataset.floor))}),this.renderFloors(),this.bindLibrary(e)}bindLibrary(e){try{let r=localStorage.getItem(Du);r&&Lu.includes(r)&&(this.libCategory=r)}catch{}let n=this.root.querySelector(".lib-search");n.addEventListener("input",()=>{this.libQuery=n.value.trim().toLowerCase(),this.renderLibrary()}),this.root.querySelector(".lib-cats").addEventListener("click",r=>{let o=r.target.closest("button[data-cat]");if(o){this.libCategory=o.dataset.cat;try{localStorage.setItem(Du,this.libCategory)}catch{}this.renderLibrary()}});let s=this.root.querySelector(".lib-grid");s.addEventListener("click",r=>{let o=r.target.closest(".tile");o&&this.pickLibrary(o.dataset.item)}),s.addEventListener("dragstart",r=>{let o=r.target.closest(".tile");!o||!r.dataTransfer||(r.dataTransfer.setData("text/x-fp3d-item",o.dataset.item),r.dataTransfer.effectAllowed="copy")}),e.addEventListener("dragover",r=>{r.dataTransfer?.types.includes("text/x-fp3d-item")&&(r.preventDefault(),r.dataTransfer.dropEffect="copy")}),e.addEventListener("drop",r=>{let o=r.dataTransfer?.getData("text/x-fp3d-item");if(!o)return;r.preventDefault();let a=this.toPlan(r),l=Fi.find(c=>c.key===o);l?this.placeOpening(a,l):this.placeObject(o,a)}),this.root.querySelector(".placed-list").addEventListener("click",r=>{let o=r.target.closest("[data-obj]");o&&(this.tool!=="select"&&this.setTool("select"),this.sel={kind:"object",id:o.dataset.obj},this.render())}),this.renderLibrary()}renderLibrary(){let e=this.root.querySelector(".lib-cats"),n=this.root.querySelector(".lib-grid");if(!e||!n)return;let s=this.libQuery;e.innerHTML=Lu.map(l=>`<button data-cat="${Qt(l)}" class="${!s&&l===this.libCategory?"on":""}">${Qt(l)}</button>`).join(""),e.classList.toggle("dim",!!s);let r=this.thumbs,o=[],a=(l,c)=>s?`${l} ${c}`.toLowerCase().includes(s):c===this.libCategory;for(let l of Fi)a(l.label,jc)&&o.push({key:l.key,label:l.label});for(let l of Us)a(l.label,l.category)&&o.push({key:l.id,label:l.label});n.innerHTML=o.length?o.map(l=>`<button class="tile" draggable="true" data-item="${l.key}" title="${Qt(l.label)}">${r?.get(l.key)?`<img src="${r.get(l.key)}" alt="" draggable="false">`:"<i></i>"}<span>${Qt(l.label)}</span></button>`).join(""):'<div class="empty">Nichts gefunden.</div>',this.markLibrary(),!r&&!this.thumbsPending&&(this.thumbsPending=!0,setTimeout(()=>{this.thumbs=Iu(),this.isConnected&&this.renderLibrary()},60))}markLibrary(){let e=this.placing??this.openingPreset?.key;this.root.querySelectorAll(".lib-grid .tile").forEach(n=>n.classList.toggle("on",n.dataset.item===e))}pickLibrary(e){let n=Fi.find(s=>s.key===e);if(n)return this.openingPreset?.key===e?this.setTool("select"):this.setTool(n.type,n);if(this.placing===e)return this.setTool("select");this.placing=e,this.setTool("object"),this.root.querySelector(".canvas")?.focus()}placeObject(e,n){let s=In(e);if(!s)return;let r=this.snap(n),o={id:hn("b"),type:e,x:r.x,y:r.y,w:s.w,d:s.d,h:s.h};s.z&&(o.z=s.z),this.snapshot(),this.fp.objects.push(o),this.sel={kind:"object",id:o.id},this.commit(),this.tool!=="select"&&this.setTool("select"),this.render()}renderPlaced(){let e=this.root.querySelector(".placed-list");if(!e)return;let n=this.root.querySelector(".placed summary");n.textContent=`Platzierte Objekte (${this.fp.objects.length})`,e.innerHTML=this.fp.objects.length?this.fp.objects.map(s=>{let r=this.sel?.kind==="object"&&this.sel.id===s.id,o=s.name||In(s.type)?.label||s.type;return`<div class="prow ${r?"on":""}" data-obj="${s.id}"><span class="dot" style="background:${Qt(s.color||In(s.type)?.color||"#9aa7b4")}"></span><b>${Qt(o)}</b><span>${Math.round(s.w)} \xD7 ${Math.round(s.d)} \xD7 ${Math.round(s.h)} cm</span></div>`}).join(""):'<div class="empty">Noch keine Objekte auf dieser Etage.</div>'}renderFloors(){let e=this.root.querySelector(".floor-list");if(!e)return;e.innerHTML=this.floors.map((r,o)=>`<button data-floor="${o}" class="${o===this.floorIdx?"on":""}">${Qt(r.name)}</button>`).join("");let n=this.root.querySelector(".floor-edit"),s=this.floors.length<2;n.innerHTML=`
      <div class="floor-row">
        <label>Name der Etage<input data-floor-name value="${Qt(this.floors[this.floorIdx].name)}"></label>
        <button data-floor-del class="danger" ${s?"disabled":""} title="Diese Etage l\xF6schen">L\xF6schen</button>
      </div>
      <div class="note">${s?"Mit \u201E+ Etage\u201C legst du weitere Stockwerke an. Auf der Karte kann man dann zwischen den Etagen umschalten.":"Die W\xE4nde der Etage darunter werden im Grundriss blass angezeigt, damit du sie nachzeichnen kannst."}</div>`,n.querySelector("[data-floor-name]").addEventListener("change",r=>{let o=r.target.value.trim();this.snapshot(),this.floors[this.floorIdx].name=o||zs(this.floorIdx),this.commit(),this.renderFloors()}),n.querySelector("[data-floor-del]").addEventListener("click",()=>void this.deleteFloor())}switchFloor(e){e===this.floorIdx||!this.floors[e]||(this.floorIdx=e,this.fp=this.floors[e].floorplan,this.sel=void 0,this.draft=[],this.drag=void 0,this.viewer?.setConfig(this.viewConfig()),this.renderFloors(),this.fitView(),this.render())}addFloor(){this.snapshot(),this.floors.push({id:hn("f"),name:zs(this.floors.length),floorplan:Dn(void 0)}),this.commit(),this.switchFloor(this.floors.length-1)}async deleteFloor(){if(this.floors.length<2)return;let e=this.floors[this.floorIdx];await this.ask("Etage l\xF6schen?",`\u201E${e.name}\u201C wird mit allem, was darauf gezeichnet ist, gel\xF6scht. Mit R\xFCckg\xE4ngig (Strg+Z) l\xE4sst sich das zur\xFCckholen.`,"L\xF6schen")&&(this.snapshot(),this.floors.splice(this.floorIdx,1),this.floorIdx=Math.max(0,this.floorIdx-1),this.fp=this.floors[this.floorIdx].floorplan,this.sel=void 0,this.commit(),this.renderFloors(),this.viewer?.setConfig(this.viewConfig()),this.fitView(),this.render())}onCanvasResize(){let e=this.svg.clientWidth,n=this.svg.clientHeight;if(!(!e||!n)){if(!this.lastCanvasWidth||this.autoFit)this.fitView();else if(e!==this.lastCanvasWidth){let s=this.vb.w*(this.lastCanvasHeight/this.lastCanvasWidth),r=this.vb.x+this.vb.w/2,o=this.vb.y+s/2,a=this.vb.w*(e/this.lastCanvasWidth);this.vb={x:r-a/2,y:o-a*n/e/2,w:a}}this.lastCanvasWidth=e,this.lastCanvasHeight=n,this.render2d()}}action(e){switch(e){case"undo":return this.undo();case"redo":return this.redo();case"delete":return this.deleteSelection();case"fit":return this.fitView(),this.render2d();case"wide":return this.toggleWide();case"floor-add":return this.addFloor();case"floor-del":this.deleteFloor();return;case"cam-save":return this.viewer?(this.config={...this.config,camera:this.viewer.getCamera()},this.emit()):void 0;case"cam-clear":{let{camera:n,...s}=this.config;this.config=s,this.emit(),this.viewer?.fit();return}case"export":{let n=this.root.querySelector(".json");n.value=JSON.stringify(this.floors.length>1?{floors:this.floors}:this.fp,null,2);return}case"import":{let n=this.root.querySelector(".json");try{let s=JSON.parse(n.value);this.snapshot(),Array.isArray(s.floors)&&s.floors.length?(this.floors=Vs({floors:s.floors}),this.floorIdx=0,this.fp=this.floors[0].floorplan):this.fp=this.floors[this.floorIdx].floorplan=Dn(s.floorplan??s),this.sel=void 0,this.commit(),this.renderFloors(),this.fitView(),this.render()}catch(s){this.ask("Import nicht m\xF6glich",`Ung\xFCltiges JSON: ${s.message}`)}return}case"clear":this.clearPlan();return}}async clearPlan(){let e=this.floors.length>1?`Alle W\xE4nde, R\xE4ume, T\xFCren, Fenster und Hitboxen von \u201E${this.floors[this.floorIdx].name}\u201C werden gel\xF6scht.`:"Alle W\xE4nde, R\xE4ume, T\xFCren, Fenster und Hitboxen werden gel\xF6scht.";await this.ask("Grundriss l\xF6schen?",e,"Alles l\xF6schen")&&(this.snapshot(),this.fp=this.floors[this.floorIdx].floorplan=Dn(void 0),this.sel=void 0,this.commit(),this.render())}ask(e,n,s){return new Promise(r=>{let o=document.createElement("dialog");o.className="ask",o.innerHTML=`
        <h4>${Qt(e)}</h4>
        <p>${Qt(n)}</p>
        <div class="ask-actions">
          ${s?`<button data-r="0">Abbrechen</button><button data-r="1" class="danger-fill">${Qt(s)}</button>`:'<button data-r="0" class="on">OK</button>'}
        </div>`;let a=!1;o.addEventListener("keydown",l=>l.stopPropagation()),o.addEventListener("click",l=>{let c=l.target.closest("button[data-r]");c?(a=c.dataset.r==="1",o.close()):l.target===o&&o.close()}),o.addEventListener("close",()=>{o.remove(),r(a)}),this.root.appendChild(o),o.showModal(),o.querySelector(s?'button[data-r="0"]':"button")?.focus()})}showTab(e){this.tab=e,this.root.querySelectorAll(".tabs button").forEach(n=>n.classList.toggle("on",n.dataset.tab===e)),this.root.querySelector(".pane-2d").hidden=e==="3d",this.root.querySelector(".tools2d").hidden=e==="3d",this.root.querySelector(".pane-3d").hidden=e==="2d",this.root.querySelector(".cam").hidden=e==="2d",this.root.querySelector(".main").classList.toggle("both",e==="both"),e!=="2d"&&!this.viewer?(this.viewer=new Os,this.root.querySelector(".viewer3d").appendChild(this.viewer.element),this.viewer.setConfig(this.viewConfig()),this._hass&&this.viewer.setHass(this._hass)):e==="2d"&&(this.viewer?.dispose(),this.viewer=void 0),this.render2d()}render(){this.render2d(),this.renderProps(),this.renderBackground(),this.renderPlaced()}renderGeneral(){let e=this.config,n=this.root.querySelector(".general");n.innerHTML=`
      <div class="grid2">
        <label>Titel<input data-k="title" value="${Qt(e.title??"")}"></label>
        <label>Kartenh\xF6he (px)<input type="number" data-k="height" value="${e.height??ve.height}"></label>
        <label>Wandh\xF6he (cm)<input type="number" data-k="wall_height" value="${e.wall_height??ve.wall_height}"></label>
        <label>Wandst\xE4rke (cm)<input type="number" data-k="wall_thickness" value="${e.wall_thickness??ve.wall_thickness}"></label>
        <label>Wandfarbe<input type="color" data-k="wall_color" value="${e.wall_color??ve.wall_color}"></label>
        <label>Standard-Wandtextur<select data-k="wall_texture">${this.builtinOptions(e.wall_texture)}</select></label>
        <label>Standard-Bodentextur<select data-k="floor_texture">${this.builtinOptions(e.floor_texture)}</select></label>
        <label>Hitboxen
          <select data-k="hitbox_mode">
            ${[["visible","immer sichtbar"],["hover","nur bei Mauszeiger"],["hidden","unsichtbar"]].map(([s,r])=>`<option value="${s}" ${(e.hitbox_mode??"visible")===s?"selected":""}>${r}</option>`).join("")}
          </select>
        </label>
        <label>Info-Fenster
          <select data-k="info_dialog">
            <option value="" ${e.info_dialog!=="ha"?"selected":""}>Eigenes (Licht, Verlauf, Kamera \u2026)</option>
            <option value="ha" ${e.info_dialog==="ha"?"selected":""}>Home Assistant Standard</option>
          </select>
        </label>
        <label class="check"><input type="checkbox" data-k="show_labels" ${e.show_labels!==!1?"checked":""}> Zustands-Labels anzeigen</label>
        <label class="check"><input type="checkbox" data-k="show_room_names" ${e.show_room_names!==!1?"checked":""}> Raumnamen anzeigen</label>
        <label class="check"><input type="checkbox" data-k="show_area" ${e.show_area!==!1?"checked":""}> Quadratmeter anzeigen</label>
        ${this.fullPageField()}
      </div>`,n.querySelectorAll("[data-k]").forEach(s=>s.addEventListener("change",()=>{let r=s.dataset.k,o;s instanceof HTMLInputElement&&s.type==="checkbox"?o=s.checked:s instanceof HTMLInputElement&&s.type==="number"?o=s.value===""?void 0:Number(s.value):o=s.value||void 0;let a={...this.config};o===void 0?delete a[r]:a[r]=o,this.config=a,this.emit(),this.viewer?.setConfig(this.viewConfig()),this.render2d()}))}fullPageField(){let e=this.config,n=this.isPanelView()===!1&&!e.full_page;return`<label class="check wide ${n?"disabled":""}" ${n?'title="Nur m\xF6glich, wenn die Ansicht den Typ \u201EPanel (einzelne Karte)\u201C hat."':""}>
        <input type="checkbox" data-k="full_page" ${e.full_page?"checked":""} ${n?"disabled":""}>
        <span>Ganze Dashboard-Seite ausf\xFCllen${n?"<small>Nur in Ansichtstyp \u201EPanel (einzelne Karte)\u201C. Ansicht bearbeiten \u2192 Ansichtstyp \xE4ndern.</small>":""}</span>
      </label>`}builtinOptions(e){let n=['<option value="">Keine</option>'];for(let[s,r]of Object.entries(Fs)){let o=cn+s;n.push(`<option value="${o}" ${e===o?"selected":""}>${r.label}</option>`)}return e&&!e.startsWith(cn)&&n.push(`<option value="${Qt(e)}" selected>${Qt(e)}</option>`),n.join("")}textureFields(e,n,s,r){let o=this.customTextureFor===e||!!n&&n!=="none"&&!n.startsWith(cn),a=[`<option value="" ${!n&&!o?"selected":""}>${r?`Standard (${Qt(Eu(r))})`:"Keine"}</option>`];r&&a.push(`<option value="none" ${n==="none"?"selected":""}>Keine</option>`);for(let[c,d]of Object.entries(Fs)){let h=cn+c;a.push(`<option value="${h}" ${n===h?"selected":""}>${d.label}</option>`)}a.push(`<option value="custom" ${o?"selected":""}>Eigenes Bild (URL) \u2026</option>`);let l=n&&n!=="none"?n:n?void 0:r;return`<label>Textur<select data-p="texture_sel">${a.join("")}</select></label>`+(o?`<label class="wide">Bild-URL (z.B. /local/texturen/holz.jpg)<input data-p="texture_url" value="${Qt(o&&n&&!n.startsWith(cn)?n:"")}" placeholder="/local/texturen/holz.jpg"></label>`:"")+(l?`<label>Kachelgr\xF6\xDFe (cm)<input type="number" data-p="texture_scale" value="${s??""}" placeholder="${il(l)}"></label>`:"")}toggleWide(e){this.wide=e??!this.wide;try{localStorage.setItem(Nu,this.wide?"1":"0")}catch{}this.classList.toggle("wide",this.wide);let n=this.root.querySelector(".wide-btn");n?.classList.toggle("on",this.wide);let s=n?.querySelector("span");s&&(s.textContent=this.wide?"Normale Gr\xF6\xDFe":"Gro\xDFansicht");let r=this.findAncestor("hui-dialog-edit-card");if(r){"large"in r&&(r.large=this.wide);let o=r.shadowRoot,a=o?.getElementById(ll);this.wide&&o&&!a?(a=document.createElement("style"),a.id=ll,a.textContent=v_,o.appendChild(a)):this.wide||a?.remove();let c=o?.querySelector("ha-dialog, ha-md-dialog, ha-wa-dialog, ha-adaptive-dialog")?.shadowRoot,d=c?.getElementById(ll);this.wide&&c&&!d?(d=document.createElement("style"),d.id=ll,d.textContent=y_,c.appendChild(d)):this.wide||d?.remove()}this.fitHeight(),setTimeout(()=>{this.fitHeight(),this.fitView(),this.render2d()},350)}fitHeight(){if(!this.wide||this.clientWidth<900){this.style.height="";return}let e=this.findScroller();if(!e)return;let n=getComputedStyle(e),s=e.getBoundingClientRect().bottom-parseFloat(n.paddingBottom||"0"),r=this.getBoundingClientRect().top+e.scrollTop,o=Math.max(420,Math.floor(s-r-2));this.style.height=`${o}px`;let a=e.scrollHeight-e.clientHeight;a>0&&(o=Math.max(420,o-a),this.style.height=`${o}px`),e.scrollTop=0}findScroller(){let e,n=this.assignedSlot??this.parentNode??null;for(;n;){if(n instanceof HTMLElement){if(n.localName==="hui-dialog-edit-card")break;let s=getComputedStyle(n).overflowY;(s==="auto"||s==="scroll")&&(e=n)}n=n.assignedSlot??n.parentNode??n.host??null}return e??document.scrollingElement}findAncestor(e){let n=this;for(;n;){if(n instanceof HTMLElement&&n.localName===e)return n;n=n.assignedSlot??n.parentNode??n.host??null}}renderBackground(){let e=this.root.querySelector(".bg"),n=this.config.background;e.innerHTML=`
      <label class="wide">Bild-URL (z.B. /local/grundriss.png)<input data-b="image" value="${Qt(n?.image??"")}"></label>
      <label>Breite im Grundriss (cm)<input type="number" data-b="width" value="${n?.width??1e3}"></label>
      <label>Deckkraft (0\u20131)<input type="number" step="0.1" min="0" max="1" data-b="opacity" value="${n?.opacity??.5}"></label>
      <label>Versatz X (cm)<input type="number" data-b="x" value="${n?.x??0}"></label>
      <label>Versatz Y (cm)<input type="number" data-b="y" value="${n?.y??0}"></label>`,e.querySelectorAll("[data-b]").forEach(s=>s.addEventListener("change",()=>{let r={...this.config.background??{image:"",width:1e3}},o=s.dataset.b;r[o]=s.type==="number"?Number(s.value):s.value.trim();let a={...this.config};r.image?a.background=r:delete a.background,this.config=a,this.emit(),this.render2d()}))}renderProps(){let e=this.propsEl,n=this.sel&&this.find(this.sel);if(!this.sel||!n){let h=this.fp;e.innerHTML=`<h3>Auswahl</h3><div class="empty">Klicke im Grundriss auf ein Element, um es hier zu bearbeiten.</div>
        <div class="stats"><span><b>${h.walls.length}</b> W\xE4nde</span><span><b>${h.rooms.length}</b> R\xE4ume</span><span><b>${h.openings.length}</b> T\xFCren/Fenster</span><span><b>${h.hotspots.length}</b> Hitboxen</span><span><b>${h.objects.length}</b> Objekte</span><span><b>${zi(h.rooms.reduce((u,p)=>u+(p.points.length>=3?Hi(p.points):0),0))}</b> gesamt</span></div>`;return}let s=(h,u,p,x="")=>`<label>${u}<input type="number" data-p="${h}" value="${p??""}" placeholder="${x}"></label>`,r=(h,u,p,x="")=>`<label>${u}<input data-p="${h}" value="${Qt(p??"")}" ${x}></label>`,o=(h,u,p,x)=>`<label>${u}<input type="color" data-p="${h}" value="${p??x}"></label>`,a=(h,u,p,x)=>`<label>${u}<select data-p="${h}">
        ${[...x?[["auto",x]]:[],["toggle","Umschalten"],["press","Ausl\xF6sen / Dr\xFCcken"],["more-info","Info-Dialog"],["none","Nichts"]].map(([m,g])=>`<option value="${m}" ${p===m?"selected":""}>${g}</option>`).join("")}
      </select></label>`,l="",c="";switch(this.sel.kind){case"wall":{let h=n;l="Wand",c=s("length","L\xE4nge (cm)",ye(Math.hypot(h.x2-h.x1,h.y2-h.y1)))+s("thickness","St\xE4rke (cm)",h.thickness,String(this.config.wall_thickness??ve.wall_thickness))+s("height","H\xF6he am Anfang A (cm)",h.height,String(this.config.wall_height??ve.wall_height))+s("height_end","H\xF6he am Ende E (cm)",h.height_end,String(h.height??this.config.wall_height??ve.wall_height))+o("color","Farbe",h.color,this.config.wall_color??ve.wall_color)+this.textureFields(h.id,h.texture,h.texture_scale,this.config.wall_texture)+'<div class="note wide">Unterschiedliche H\xF6hen an A und E ergeben eine Dachschr\xE4ge. Eine Farbe f\xE4rbt die Textur zus\xE4tzlich ein.</div>';break}case"opening":{let h=n,u=h.type==="door"?Mu:Su,p=h.style??"single",x=h.type==="door"?["single","glass","sliding"].includes(p):p==="single";l=h.type==="door"?"T\xFCr":"Fenster",c=`<label>Typ<select data-p="type"><option value="door" ${h.type==="door"?"selected":""}>T\xFCr</option><option value="window" ${h.type==="window"?"selected":""}>Fenster</option></select></label><label>Ausf\xFChrung<select data-p="style">${u.map(([m,g])=>`<option value="${m}" ${p===m?"selected":""}>${g}</option>`).join("")}</select></label>`+s("width","Breite (cm)",h.width)+s("height","H\xF6he (cm)",h.height)+s("sill","Br\xFCstung (cm)",h.sill??(h.type==="door"?0:90))+s("offset","Position auf Wand (cm)",ye(h.offset))+o("color","Farbe Rahmen / T\xFCrblatt",h.color,h.type==="door"&&!["glass","french"].includes(p)?p==="garage"?"#d4d6d8":"#8b5a2b":"#f2f2f0")+(x?`<label class="check"><input type="checkbox" data-p="flip" ${h.flip?"checked":""}> ${p==="sliding"?"Zur anderen Seite schieben":"Anschlag links/rechts tauschen"}</label>`:"")+(h.type==="door"&&p!=="opening"&&p!=="garage"?`<label class="check"><input type="checkbox" data-p="mirror" ${h.mirror?"checked":""}> Zur anderen Wandseite \xF6ffnen</label>`:"");break}case"object":{let h=n,u=In(h.type);l=u?.label??"Objekt";let p=$c.map(x=>`<optgroup label="${Qt(x)}">${Us.filter(m=>m.category===x).map(m=>`<option value="${m.id}" ${m.id===h.type?"selected":""}>${Qt(m.label)}</option>`).join("")}</optgroup>`).join("");c=r("name","Name",h.name,`placeholder="${Qt(u?.label??"")}"`)+`<label>Objekt<select data-p="type">${p}</select></label>`+s("w","Breite (cm)",ye(h.w))+s("d","Tiefe (cm)",ye(h.d))+s("h","H\xF6he (cm)",ye(h.h))+s("z","H\xF6he \xFCber Boden (cm)",h.z??0)+s("x","X (cm)",ye(h.x))+s("y","Y (cm)",ye(h.y))+s("rotation","Drehung (\xB0)",h.rotation??0)+o("color","Farbe",h.color,u?.color??"#9aa7b4")+this.textureFields(h.id,h.texture,h.texture_scale,void 0)+`<div class="row wide obj-acts">
            <button data-obj-act="rot">\u21BB 90\xB0 drehen</button>
            <button data-obj-act="dup">Duplizieren</button>
            <button data-obj-act="hitbox" title="Legt eine Hitbox in Gr\xF6\xDFe dieses Objekts an, z.B. f\xFCr eine Lampe">Hitbox darauf legen</button>
          </div>
          <div class="note wide">Ziehen verschiebt, der Punkt in der Ecke \xE4ndert die Gr\xF6\xDFe, der Punkt davor dreht. Taste R dreht um 90\xB0, Strg+D dupliziert.</div>`;break}case"room":{let h=n;l="Raum",c=r("name","Name",h.name)+`<label>Fl\xE4che<input value="${h.points.length>=3?zi(Hi(h.points)):"\u2013"}" readonly tabindex="-1"></label>`+o("color","Bodenfarbe",h.color,this.config.floor_color??ve.floor_color)+this.textureFields(h.id,h.texture,h.texture_scale,this.config.floor_texture);break}case"hotspot":{let h=n,u=fl({...h,action:"auto"}),p={toggle:"Umschalten",press:"Ausl\xF6sen","more-info":"Info-Dialog",none:"nichts"}[u];l="Hitbox",c=`<div class="combo wide"><label>Entit\xE4t<input data-p="entity" class="entity-input" autocomplete="off" spellcheck="false" value="${Qt(h.entity??"")}" placeholder="Suchen, z.B. Wohnzimmer oder light."></label><div class="combo-list" hidden></div></div>`+r("label","Beschriftung",h.label,'placeholder="Name der Entit\xE4t"')+r("icon","Icon",h.icon,'placeholder="mdi:lightbulb"')+a("action","Klick-Aktion",h.action??"auto",`Automatisch (${p})`)+a("hold_action","Halten-Aktion",h.hold_action??"more-info")+a("double_tap_action","Doppelklick-Aktion",h.double_tap_action??"none")+`<label class="check"><input type="checkbox" data-p="show_label" ${h.show_label!==!1?"checked":""}> Label anzeigen</label>`+s("x","X (cm)",ye(h.x))+s("y","Y (cm)",ye(h.y))+s("z","H\xF6he \xFCber Boden (cm)",h.z??0)+s("w","Breite (cm)",ye(h.w))+s("d","Tiefe (cm)",ye(h.d))+s("h","H\xF6he (cm)",ye(h.h))+o("color","Farbe (aus)",h.color,"#3fa7ff");break}}e.innerHTML=`<div class="props-head"><h3>${l}</h3><button data-act-del class="danger">L\xF6schen</button></div><div class="grid2">${c}</div>`,e.querySelector("[data-act-del]").addEventListener("click",()=>this.deleteSelection()),e.querySelectorAll("[data-p]").forEach(h=>h.addEventListener("change",()=>this.applyProp(h))),e.querySelectorAll("[data-obj-act]").forEach(h=>h.addEventListener("click",()=>{let u=h.dataset.objAct;u==="rot"?this.rotateObject(90):u==="dup"?this.duplicateObject():u==="hitbox"&&this.hitboxFromObject()}));let d=e.querySelector(".entity-input");d&&this.bindEntityCombo(d,e.querySelector(".combo-list"))}bindEntityCombo(e,n){let s=[],r=-1,o=c=>{e.value=c,n.hidden=!0,this.applyProp(e)},a=(c=!0)=>{let d=c?e.value.trim().toLowerCase():"",h=this._hass?.states??{},u=d.split(/\s+/).filter(Boolean);s=this.entityIds.filter(p=>{let x=`${p} ${h[p]?.attributes.friendly_name??""}`.toLowerCase();return u.every(m=>x.includes(m))}).slice(0,200),r=s.length?0:-1,n.innerHTML=s.length?s.map((p,x)=>{let m=h[p]?.attributes.friendly_name;return`<div class="opt ${x===r?"act":""}" data-id="${Qt(p)}"><b>${Qt(String(m??p))}</b><span>${Qt(p)}</span></div>`}).join(""):'<div class="none">Keine passende Entit\xE4t</div>',n.hidden=!1},l=()=>{n.querySelectorAll(".opt").forEach((c,d)=>c.classList.toggle("act",d===r)),n.querySelector(".opt.act")?.scrollIntoView({block:"nearest"})};e.addEventListener("focus",()=>{e.select(),a(!1)}),e.addEventListener("input",()=>a()),e.addEventListener("blur",()=>setTimeout(()=>n.hidden=!0,150)),e.addEventListener("keydown",c=>{if(!n.hidden)if(c.key==="ArrowDown"||c.key==="ArrowUp"){if(c.preventDefault(),!s.length)return;r=(r+(c.key==="ArrowDown"?1:-1)+s.length)%s.length,l()}else c.key==="Enter"&&r>=0?(c.preventDefault(),o(s[r])):c.key==="Escape"&&(n.hidden=!0)}),n.addEventListener("mousedown",c=>{let d=c.target.closest(".opt");d&&(c.preventDefault(),o(d.dataset.id))})}rotateObject(e){let n=this.sel?.kind==="object"?this.fp.objects.find(r=>r.id===this.sel.id):void 0;if(!n)return;this.snapshot();let s=(((n.rotation??0)+e)%360+360)%360;s?n.rotation=s:delete n.rotation,this.commit(),this.render()}duplicateObject(){let e=this.sel?.kind==="object"?this.fp.objects.find(s=>s.id===this.sel.id):void 0;if(!e)return;this.snapshot();let n={...structuredClone(e),id:hn("b"),x:e.x+20,y:e.y+20};this.fp.objects.push(n),this.sel={kind:"object",id:n.id},this.commit(),this.render()}hitboxFromObject(){let e=this.sel?.kind==="object"?this.fp.objects.find(a=>a.id===this.sel.id):void 0;if(!e)return;let n=Kc(e.rotation??0),s=Math.abs(e.w*Math.cos(n))+Math.abs(e.d*Math.sin(n)),r=Math.abs(e.w*Math.sin(n))+Math.abs(e.d*Math.cos(n));this.snapshot();let o={id:hn("h"),x:e.x,y:e.y,z:e.z??0,w:ye(s+4),d:ye(r+4),h:ye(e.h+4),label:e.name};o.label||delete o.label,this.fp.hotspots.push(o),this.sel={kind:"hotspot",id:o.id},this.commit(),this.render()}applyProp(e){if(!this.sel)return;let n=this.find(this.sel);if(!n||e.dataset.p==="entity"&&(n.entity??"")===e.value.trim())return;this.snapshot();let s=e.dataset.p,r;if(e instanceof HTMLInputElement&&e.type==="checkbox"?r=e.checked:e instanceof HTMLInputElement&&e.type==="number"?r=e.value===""?void 0:Number(e.value):r=e.value.trim()||void 0,this.sel.kind==="wall"&&s==="length"){let o=n,a=Math.hypot(o.x2-o.x1,o.y2-o.y1);r&&a>0&&(o.x2=ye(o.x1+(o.x2-o.x1)/a*r),o.y2=ye(o.y1+(o.y2-o.y1)/a*r))}else if(this.sel.kind==="opening"&&s==="type")n.type!==r&&(n.type=r,delete n.style,delete n.flip,delete n.mirror,n.sill=r==="door"?0:90);else if(this.sel.kind==="opening"&&s==="style")r==="single"?delete n.style:n.style=r;else if(this.sel.kind==="opening"&&(s==="flip"||s==="mirror"))r?n[s]=!0:delete n[s];else if(this.sel.kind==="object"&&(s==="rotation"||s==="z")){let o=s==="rotation"?((r??0)%360+360)%360:r??0;o?n[s]=o:delete n[s]}else if(this.sel.kind==="object"&&s==="type")n.type=r??n.type;else if(this.sel.kind==="hotspot"&&s==="show_label")r?delete n.show_label:n.show_label=!1;else if(this.sel.kind==="hotspot"&&s==="action"&&r==="auto")delete n.action;else if(this.sel.kind==="hotspot"&&(s==="hold_action"&&r==="more-info"||s==="double_tap_action"&&r==="none"))delete n[s];else if(s==="texture_sel"){if(r==="custom"){this.history.pop(),this.customTextureFor=n.id,this.renderProps();return}this.customTextureFor=void 0,r===void 0?delete n.texture:n.texture=r}else s==="texture_url"?r?n.texture=r:delete n.texture:r===void 0?delete n[s]:n[s]=r;this.commit(),this.render()}get scale(){return(this.svg.clientWidth||600)/this.vb.w}fitView(){this.autoFit=!0;let e=[];for(let h of this.fp.walls)e.push({x:h.x1,y:h.y1},{x:h.x2,y:h.y2});for(let h of this.fp.rooms)for(let[u,p]of h.points)e.push({x:u,y:p});for(let h of this.fp.hotspots)e.push({x:h.x,y:h.y});for(let h of this.fp.objects)e.push({x:h.x,y:h.y});if(!e.length){this.vb={x:-100,y:-100,w:1100};return}let n=e.map(h=>h.x),s=e.map(h=>h.y),r=Math.min(...n),o=Math.max(...n),a=Math.min(...s),l=Math.max(...s),c=(this.svg?.clientHeight||420)/(this.svg?.clientWidth||600),d=Math.max(o-r,(l-a)/c,300)*1.2;this.vb={x:(r+o)/2-d/2,y:(a+l)/2-d*c/2,w:d}}toPlan(e){let n=this.svg.getScreenCTM();if(!n)return{x:0,y:0};let s=new DOMPoint(e.clientX,e.clientY).matrixTransform(n.inverse());return{x:s.x,y:s.y}}snap(e,n){let s=12/this.scale,r,o=s;for(let l of this.fp.walls)for(let c of[1,2]){if(n?.(l,c))continue;let d=c===1?{x:l.x1,y:l.y1}:{x:l.x2,y:l.y2},h=Math.hypot(d.x-e.x,d.y-e.y);h<o&&(o=h,r=d)}if(r)return{...r};if(!this.snapEnabled)return{x:ye(e.x),y:ye(e.y)};let a=10;return{x:Math.round(e.x/a)*a,y:Math.round(e.y/a)*a}}gridSnap(e){return this.snapEnabled?Math.round(e/10)*10:ye(e)}nearestWall(e){let n;for(let r of this.fp.walls){let o=r.x2-r.x1,a=r.y2-r.y1,l=o*o+a*a;if(!l)continue;let c=Math.max(0,Math.min(1,((e.x-r.x1)*o+(e.y-r.y1)*a)/l)),d=Math.hypot(r.x1+o*c-e.x,r.y1+a*c-e.y);(!n||d<n.dist)&&(n={wall:r,offset:c*Math.sqrt(l),dist:d})}let s=(n?.wall.thickness??this.config.wall_thickness??ve.wall_thickness)/2;return n&&n.dist<=Math.max(s,15/this.scale)?n:void 0}onDown(e){e.currentTarget.focus();let n=this.toPlan(e),s=e.target.closest("[data-kind]"),r=()=>e.currentTarget.setPointerCapture(e.pointerId);if(e.button===1||e.button===2){this.drag={type:"pan",start:{x:e.clientX,y:e.clientY},vb:{x:this.vb.x,y:this.vb.y},moved:!1,right:e.button===2},r();return}switch(this.tool){case"select":{if(!s){this.drag={type:"pan",start:{x:e.clientX,y:e.clientY},vb:{x:this.vb.x,y:this.vb.y},moved:!1},r();return}let o=s.dataset.kind,a=s.dataset.id;if(o==="wall-end"){let l=this.fp.walls.find(h=>h.id===a),d=Number(s.dataset.end)===1?{x:l.x1,y:l.y1}:{x:l.x2,y:l.y2};this.snapshot(),this.drag={type:"endpoint",ends:this.connectedEnds(d),moved:!1}}else if(o==="room-vertex"){let l=this.fp.rooms.find(c=>c.id===a);this.snapshot(),this.drag={type:"vertex",room:l,idx:Number(s.dataset.idx),moved:!1}}else if(o==="hs-resize"){let l=this.fp.hotspots.find(c=>c.id===a);this.snapshot(),this.drag={type:"resize",hs:l,anchor:{x:l.x-l.w/2,y:l.y-l.d/2},moved:!1}}else if(o==="obj-resize"){let l=this.fp.objects.find(c=>c.id===a);this.snapshot(),this.drag={type:"oresize",obj:l,anchor:al(l,-l.w/2,-l.d/2),moved:!1}}else if(o==="obj-rotate"){let l=this.fp.objects.find(c=>c.id===a);this.snapshot(),this.drag={type:"orotate",obj:l,moved:!1}}else{let l={kind:o,id:a},c=this.sel?.id!==a;if(this.sel=l,o==="opening"){let d=this.fp.openings.find(u=>u.id===a),h=this.fp.walls.find(u=>u.id===d.wall);h&&(this.snapshot(),this.drag={type:"opening",op:d,wall:h,moved:!1})}else this.drag={type:"move",sel:l,start:n,orig:JSON.stringify(this.find(l)),moved:!1},o==="wall"&&(this.drag.links=[]);c&&this.renderProps(),this.render2d()}r();return}case"wall":{let o=this.snap(n);if(this.draft.length){let a=this.draft[this.draft.length-1];if(Math.hypot(o.x-a.x,o.y-a.y)>=1){this.snapshot();let l={id:hn("w"),x1:a.x,y1:a.y,x2:o.x,y2:o.y};this.fp.walls.push(l),this.commit(),this.draft.push(o)}}else this.draft=[o];this.render2d();return}case"room":{let o=this.snap(n);if(this.draft.length>=3){let a=this.draft[0];if(Math.hypot(o.x-a.x,o.y-a.y)<12/this.scale){this.closeRoom();return}}if(this.draft.length){this.draft.push(o),this.render2d();return}this.drag={type:"rect",tool:"room",start:o,end:o},r();return}case"box":case"hotspot":{let o=this.snap(n);this.drag={type:"rect",tool:this.tool,start:o,end:o},r();return}case"door":case"window":this.placeOpening(n,this.openingPreset??this.defaultPreset(this.tool));return;case"object":this.placing&&this.placeObject(this.placing,n);return}}defaultPreset(e){return Fi.find(n=>n.key===(e==="door"?"door-single":"window-double"))}placeOpening(e,n){let s=this.nearestWall(e);if(!s){this.hintEl.textContent="Bitte direkt auf eine Wand klicken.";return}let r=Math.hypot(s.wall.x2-s.wall.x1,s.wall.y2-s.wall.y1),o=Math.min(n.w,r),a={id:hn("o"),wall:s.wall.id,type:n.type,offset:Math.max(o/2,Math.min(r-o/2,this.gridSnap(s.offset))),width:o,height:n.h,sill:n.sill};n.style!=="single"&&(a.style=n.style),this.snapshot(),this.fp.openings.push(a),this.sel={kind:"opening",id:a.id},this.commit(),this.render()}connectedEnds(e){let n=[];for(let s of this.fp.walls)Math.hypot(s.x1-e.x,s.y1-e.y)<.5&&n.push({wall:s,end:1}),Math.hypot(s.x2-e.x,s.y2-e.y)<.5&&n.push({wall:s,end:2});return n}onMove(e){let n=this.toPlan(e),s=this.drag;if(!s){this.tool!=="select"&&(this.cursor=this.tool==="door"||this.tool==="window"||this.tool==="object"?n:this.snap(n),this.render2d());return}switch(s.type){case"pan":{if(!s.moved&&Math.hypot(e.clientX-s.start.x,e.clientY-s.start.y)<4)return;let r=this.scale;this.autoFit=!1,this.vb.x=s.vb.x-(e.clientX-s.start.x)/r,this.vb.y=s.vb.y-(e.clientY-s.start.y)/r,s.moved=!0;break}case"endpoint":{let r=new Set(s.ends.map(a=>a.wall.id+a.end)),o=this.snap(n,(a,l)=>r.has(a.id+l));for(let a of s.ends)a.end===1?(a.wall.x1=o.x,a.wall.y1=o.y):(a.wall.x2=o.x,a.wall.y2=o.y);s.moved=!0;break}case"vertex":{let r=this.snap(n);s.room.points[s.idx]=[r.x,r.y],s.moved=!0;break}case"opening":{let r=s.wall.x2-s.wall.x1,o=s.wall.y2-s.wall.y1,a=Math.hypot(r,o),l=((n.x-s.wall.x1)*r+(n.y-s.wall.y1)*o)/(a*a);s.op.offset=Math.max(s.op.width/2,Math.min(a-s.op.width/2,this.gridSnap(l*a))),s.moved=!0;break}case"resize":{let r=this.snap(n),o=Math.max(r.x,s.anchor.x+5),a=Math.max(r.y,s.anchor.y+5);s.hs.w=o-s.anchor.x,s.hs.d=a-s.anchor.y,s.hs.x=s.anchor.x+s.hs.w/2,s.hs.y=s.anchor.y+s.hs.d/2,s.moved=!0;break}case"orotate":{let r=Math.atan2(n.y-s.obj.y,n.x-s.obj.x)*180/Math.PI+90;this.snapEnabled&&!e.shiftKey&&(r=Math.round(r/15)*15),r=(Math.round(r*10)/10%360+360)%360,r?s.obj.rotation=r:delete s.obj.rotation,s.moved=!0;break}case"oresize":{let r=Kc(s.obj.rotation??0),o=n.x-s.anchor.x,a=n.y-s.anchor.y,l=Math.max(5,this.gridSnap(o*Math.cos(r)+a*Math.sin(r))),c=Math.max(5,this.gridSnap(-o*Math.sin(r)+a*Math.cos(r)));s.obj.w=l,s.obj.d=c,s.obj.x=ye(s.anchor.x+l/2*Math.cos(r)-c/2*Math.sin(r)),s.obj.y=ye(s.anchor.y+l/2*Math.sin(r)+c/2*Math.cos(r)),s.moved=!0;break}case"move":{let r=n.x-s.start.x,o=n.y-s.start.y;if(!s.moved&&Math.hypot(r,o)*this.scale<4)return;s.moved||this.snapshot(),s.moved=!0,r=this.gridSnap(r),o=this.gridSnap(o);let a=JSON.parse(s.orig),l=this.find(s.sel);if(s.sel.kind==="wall"){let c=s.links||(s.links=this.wallLinks(a));l.x1=a.x1+r,l.y1=a.y1+o,l.x2=a.x2+r,l.y2=a.y2+o;for(let d of c)d.end===1?(d.wall.x1=d.ox+r,d.wall.y1=d.oy+o):(d.wall.x2=d.ox+r,d.wall.y2=d.oy+o)}else s.sel.kind==="room"?l.points=a.points.map(([c,d])=>[c+r,d+o]):(s.sel.kind==="hotspot"||s.sel.kind==="object")&&(l.x=a.x+r,l.y=a.y+o);break}case"rect":{s.end=this.snap(n);break}}this.render2d()}wallLinks(e){let n=[];for(let s of[{x:e.x1,y:e.y1},{x:e.x2,y:e.y2}])for(let r of this.connectedEnds(s))r.wall.id!==e.id&&n.push({...r,ox:r.end===1?r.wall.x1:r.wall.x2,oy:r.end===1?r.wall.y1:r.wall.y2});return n}onUp(e){let n=this.drag;if(this.drag=void 0,!!n){if(n.type==="pan"){if(n.moved)return;n.right?this.finishDraft():this.sel&&(this.sel=void 0,this.renderProps(),this.render2d());return}if(n.type==="rect"){this.finishRect(n.tool,n.start,n.end);return}n.moved?(this.commit(),this.render()):n.type!=="move"&&this.history.pop()}}finishRect(e,n,s){let r=Math.min(n.x,s.x),o=Math.min(n.y,s.y),a=Math.max(n.x,s.x),l=Math.max(n.y,s.y),c=a-r>=20&&l-o>=20;if(e==="room"&&!c){this.draft=[n],this.render2d();return}if(this.snapshot(),e==="hotspot"){let d=c?a-r:50,h=c?l-o:50,u={id:hn("h"),x:c?r+d/2:n.x,y:c?o+h/2:n.y,z:0,w:d,d:h,h:80};this.fp.hotspots.push(u),this.sel={kind:"hotspot",id:u.id}}else if(c){let d=[[r,o],[a,o],[a,l],[r,l]],h={id:hn("r"),name:`Raum ${this.fp.rooms.length+1}`,points:d};if(this.fp.rooms.push(h),e==="box")for(let u=0;u<4;u++){let[p,x]=d[u],[m,g]=d[(u+1)%4];this.wallExists(p,x,m,g)||this.fp.walls.push({id:hn("w"),x1:p,y1:x,x2:m,y2:g})}this.sel={kind:"room",id:h.id}}else{this.history.pop();return}this.commit(),this.render()}wallExists(e,n,s,r){let o=(a,l,c,d)=>Math.abs(a-c)<.5&&Math.abs(l-d)<.5;return this.fp.walls.some(a=>o(a.x1,a.y1,e,n)&&o(a.x2,a.y2,s,r)||o(a.x1,a.y1,s,r)&&o(a.x2,a.y2,e,n))}closeRoom(){if(this.draft.length<3)return;this.snapshot();let e={id:hn("r"),name:`Raum ${this.fp.rooms.length+1}`,points:this.draft.map(n=>[n.x,n.y])};this.fp.rooms.push(e),this.draft=[],this.sel={kind:"room",id:e.id},this.commit(),this.render()}finishDraft(){if(this.tool==="room"&&this.draft.length>=3)return this.closeRoom();this.draft=[],this.render2d()}onWheel(e){e.preventDefault();let n=this.toPlan(e),s=Math.exp(e.deltaY*.0015);this.autoFit=!1;let r=Math.max(100,Math.min(2e4,this.vb.w*s)),o=r/this.vb.w;this.vb={x:n.x-(n.x-this.vb.x)*o,y:n.y-(n.y-this.vb.y)*o,w:r},this.render2d()}onKey(e){let n=e.composedPath()[0].tagName;n==="INPUT"||n==="TEXTAREA"||n==="SELECT"||(e.key==="Escape"?(e.stopPropagation(),this.draft.length?this.finishDraft():this.tool!=="select"?this.setTool("select"):(this.sel=void 0,this.render())):e.key==="Delete"||e.key==="Backspace"?(e.preventDefault(),this.deleteSelection()):(e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="z"?(e.preventDefault(),e.shiftKey?this.redo():this.undo()):(e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="y"?(e.preventDefault(),this.redo()):e.key==="Enter"?this.finishDraft():(e.key==="r"||e.key==="R")&&!e.ctrlKey&&!e.metaKey&&this.sel?.kind==="object"?this.rotateObject(e.shiftKey?-90:90):(e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="d"&&this.sel?.kind==="object"&&(e.preventDefault(),this.duplicateObject()))}render2d(){if(!this.svg||this.tab==="3d")return;let e=this.scale,n=(this.svg.clientHeight||420)/(this.svg.clientWidth||600),s={...this.vb,h:this.vb.w*n};this.svg.setAttribute("viewBox",`${s.x} ${s.y} ${s.w} ${s.h}`);let r=m=>m/e,o=this.config.wall_thickness??ve.wall_thickness,a=this.sel,l=(m,g)=>a?.kind===m&&a.id===g,c=[],d=s.w>4e3?100:10;c.push(`<defs>
      <pattern id="g1" width="${d}" height="${d}" patternUnits="userSpaceOnUse"><path d="M ${d} 0 L 0 0 0 ${d}" fill="none" class="grid-minor" stroke-width="${r(1)}"/></pattern>
      <pattern id="g2" width="100" height="100" patternUnits="userSpaceOnUse"><rect width="100" height="100" fill="url(#g1)"/><path d="M 100 0 L 0 0 0 100" fill="none" class="grid-major" stroke-width="${r(1)}"/></pattern>
    </defs>
    <rect x="${s.x}" y="${s.y}" width="${s.w}" height="${s.h}" fill="url(#${s.w>4e3?"g1":"g2"})"/>`);let h=this.config.background;h?.image&&c.push(`<image href="${Qt(h.image)}" x="${h.x??0}" y="${h.y??0}" width="${h.width}" height="${h.width*4}" preserveAspectRatio="xMinYMin meet" opacity="${h.opacity??.5}" style="pointer-events:none"/>`);let u=this.floors[this.floorIdx-1]?.floorplan;if(u)for(let m of u.walls)c.push(`<line x1="${m.x1}" y1="${m.y1}" x2="${m.x2}" y2="${m.y2}" class="ghost" stroke-width="${m.thickness??o}" stroke-linecap="square"/>`);for(let m of this.fp.rooms){if(m.points.length<2)continue;let g=m.points.map(y=>y.join(",")).join(" ");c.push(`<polygon data-kind="room" data-id="${m.id}" points="${g}" fill="${Qt(m.color??this.config.floor_color??ve.floor_color)}" fill-opacity="0.45" class="room ${l("room",m.id)?"sel":""}" stroke-width="${r(l("room",m.id)?2:0)}"/>`);let f=this.config.show_area!==!1&&m.points.length>=3;if(m.name||f){let[y,b]=Yc(m.points),_=m.name&&f?r(8):0;m.name&&c.push(`<text x="${y}" y="${b-_}" class="room-name" font-size="${r(13)}">${Qt(m.name)}</text>`),f&&c.push(`<text x="${y}" y="${b+_}" class="room-area" font-size="${r(11)}">${zi(Hi(m.points))}</text>`)}}for(let m of this.fp.objects){let g=In(m.type),f=l("object",m.id),b=`fill="${Qt(m.color||g?.color||"#9aa7b4")}" class="obj-shape ${f?"sel":""}" stroke-width="${r(f?2.5:1.2)}"`,_=g?.round?`<ellipse cx="0" cy="0" rx="${m.w/2}" ry="${m.d/2}" ${b}/>`:`<rect x="${-m.w/2}" y="${-m.d/2}" width="${m.w}" height="${m.d}" rx="${Math.min(r(3),m.w/4,m.d/4)}" ${b}/><line x1="${-m.w*.3}" y1="${m.d/2-Math.min(r(3),m.d/4)}" x2="${m.w*.3}" y2="${m.d/2-Math.min(r(3),m.d/4)}" class="obj-front" stroke-width="${r(2)}"/>`;c.push(`<g data-kind="object" data-id="${m.id}" class="obj" transform="translate(${m.x} ${m.y}) rotate(${m.rotation??0})">${_}</g>`),Math.min(m.w,m.d)*e>34&&c.push(`<text x="${m.x}" y="${m.y}" class="obj-name" font-size="${r(10)}">${Qt(m.name||g?.label||m.type)}</text>`)}for(let m of this.fp.walls){let g=m.thickness??o,f=l("wall",m.id);c.push(`<line x1="${m.x1}" y1="${m.y1}" x2="${m.x2}" y2="${m.y2}" class="wall ${f?"sel":""}" stroke-width="${g}" stroke-linecap="square"/>`,`<line data-kind="wall" data-id="${m.id}" x1="${m.x1}" y1="${m.y1}" x2="${m.x2}" y2="${m.y2}" class="hit" stroke-width="${Math.max(g,r(14))}"/>`)}for(let m of this.fp.openings){let g=this.fp.walls.find(L=>L.id===m.wall);if(!g)continue;let f=Math.hypot(g.x2-g.x1,g.y2-g.y1);if(!f)continue;let y=(g.x2-g.x1)/f,b=(g.y2-g.y1)/f,_=g.thickness??o,E={x:g.x1+y*(m.offset-m.width/2),y:g.y1+b*(m.offset-m.width/2)},A={x:g.x1+y*(m.offset+m.width/2),y:g.y1+b*(m.offset+m.width/2)},P=l("opening",m.id);c.push(`<line x1="${E.x}" y1="${E.y}" x2="${A.x}" y2="${A.y}" class="gap" stroke-width="${_+r(1)}"/>`),c.push(this.openingSymbol(m,E,A,y,b,_,P)),c.push(`<line data-kind="opening" data-id="${m.id}" x1="${E.x}" y1="${E.y}" x2="${A.x}" y2="${A.y}" class="hit" stroke-width="${Math.max(_,r(16))}"/>`)}for(let m of this.fp.hotspots){let g=l("hotspot",m.id),f=m.label||(m.entity?this._hass?.states[m.entity]?.attributes.friendly_name??m.entity:"Hitbox");c.push(`<rect data-kind="hotspot" data-id="${m.id}" x="${m.x-m.w/2}" y="${m.y-m.d/2}" width="${m.w}" height="${m.d}" class="hotspot ${g?"sel":""} ${m.entity?"":"unbound"}" stroke-width="${r(g?2.5:1.5)}" stroke-dasharray="${r(5)} ${r(3)}"/>`,`<text x="${m.x}" y="${m.y}" class="hs-name" font-size="${r(11)}">${Qt(String(f))}</text>`)}let p=(m,g,f)=>`<circle cx="${m}" cy="${g}" r="${r(6)}" class="handle" stroke-width="${r(1.5)}" ${f}/>`;if(a?.kind==="wall"){let m=this.fp.walls.find(g=>g.id===a.id);m&&(c.push(this.measure(m.x1,m.y1,m.x2,m.y2,m.thickness??o)),c.push(p(m.x1,m.y1,`data-kind="wall-end" data-id="${m.id}" data-end="1"`)),c.push(p(m.x2,m.y2,`data-kind="wall-end" data-id="${m.id}" data-end="2"`)),c.push(`<text x="${m.x1+r(12)}" y="${m.y1-r(12)}" class="end-label" font-size="${r(12)}">A</text>`),c.push(`<text x="${m.x2+r(12)}" y="${m.y2-r(12)}" class="end-label" font-size="${r(12)}">E</text>`))}else if(a?.kind==="room"){let m=this.fp.rooms.find(g=>g.id===a.id);m?.points.forEach(([g,f],y)=>c.push(p(g,f,`data-kind="room-vertex" data-id="${m.id}" data-idx="${y}"`)))}else if(a?.kind==="hotspot"){let m=this.fp.hotspots.find(g=>g.id===a.id);m&&c.push(p(m.x+m.w/2,m.y+m.d/2,`data-kind="hs-resize" data-id="${m.id}"`))}else if(a?.kind==="object"){let m=this.fp.objects.find(g=>g.id===a.id);if(m){let g=al(m,m.w/2,m.d/2),f=al(m,0,-m.d/2),y=al(m,0,-m.d/2-r(28));c.push(`<line x1="${f.x}" y1="${f.y}" x2="${y.x}" y2="${y.y}" class="rot-line" stroke-width="${r(1.5)}"/>`),c.push(p(y.x,y.y,`data-kind="obj-rotate" data-id="${m.id}" class="handle rot"`).replace('class="handle"',"")),c.push(p(g.x,g.y,`data-kind="obj-resize" data-id="${m.id}"`)),c.push(`<text x="${m.x}" y="${m.y+Math.max(m.d,m.w)/2+r(16)}" class="measure" font-size="${r(12)}">${Math.round(m.w)} \xD7 ${Math.round(m.d)} \xD7 ${Math.round(m.h)} cm${m.rotation?` \xB7 ${Math.round(m.rotation)}\xB0`:""}</text>`)}}let x=this.cursor;if(this.draft.length&&(this.tool==="wall"||this.tool==="room")){let m=[...this.draft,...x?[x]:[]];c.push(`<polyline points="${m.map(f=>`${f.x},${f.y}`).join(" ")}" class="draft" stroke-width="${this.tool==="wall"?o:r(2)}"/>`);let g=this.draft[this.draft.length-1];x&&c.push(this.measure(g.x,g.y,x.x,x.y,this.tool==="wall"?o:0));for(let f of this.draft)c.push(`<circle cx="${f.x}" cy="${f.y}" r="${r(4)}" class="draft-pt"/>`)}if(this.drag?.type==="rect"){let{start:m,end:g}=this.drag,f=Math.min(m.x,g.x),y=Math.min(m.y,g.y),b=Math.abs(g.x-m.x),_=Math.abs(g.y-m.y);c.push(`<rect x="${f}" y="${y}" width="${b}" height="${_}" class="draft-rect" stroke-width="${r(2)}"/>`),c.push(`<text x="${f+b/2}" y="${y-r(8)}" class="measure" font-size="${r(12)}">${Math.round(b)} \xD7 ${Math.round(_)} cm</text>`)}if(x&&this.tool!=="select"&&!this.drag)if(this.tool==="door"||this.tool==="window"){let m=this.nearestWall(x);if(m){let g=m.wall,f=Math.hypot(g.x2-g.x1,g.y2-g.y1),y=Math.min(f,(this.openingPreset??this.defaultPreset(this.tool)).w),b=Math.max(y/2,Math.min(f-y/2,m.offset)),_=(g.x2-g.x1)/f,E=(g.y2-g.y1)/f;c.push(`<line x1="${g.x1+_*(b-y/2)}" y1="${g.y1+E*(b-y/2)}" x2="${g.x1+_*(b+y/2)}" y2="${g.y1+E*(b+y/2)}" class="draft" stroke-width="${(g.thickness??o)+r(4)}"/>`)}}else if(this.tool==="object"){let m=this.placing?In(this.placing):void 0;if(m){let g=this.snap(x);c.push(m.round?`<ellipse cx="${g.x}" cy="${g.y}" rx="${m.w/2}" ry="${m.d/2}" class="draft-rect" stroke-width="${r(2)}"/>`:`<rect x="${g.x-m.w/2}" y="${g.y-m.d/2}" width="${m.w}" height="${m.d}" class="draft-rect" stroke-width="${r(2)}"/>`)}}else c.push(`<circle cx="${x.x}" cy="${x.y}" r="${r(4)}" class="cursor"/>`);this.svg.innerHTML=c.join(""),this.svg.classList.toggle("drawing",this.tool!=="select")}openingSymbol(e,n,s,r,o,a,l){let c=E=>E/this.scale,d=l?"sel":"",h=e.style??"single",u=(E,A,P,L,w="")=>`<line x1="${E.x}" y1="${E.y}" x2="${A.x}" y2="${A.y}" class="${P} ${d}" stroke-width="${c(l?L+1:L)}" ${w}/>`,p=(E,A,P,L,w)=>({x:E.x+r*A+L*P,y:E.y+o*A+w*P}),x=Math.hypot(s.x-n.x,s.y-n.y);if(e.type==="window"){let E=-o,A=r,P=[u(p(n,0,a*.3,E,A),p(s,0,a*.3,E,A),"win",1.2),u(p(n,0,-a*.3,E,A),p(s,0,-a*.3,E,A),"win",1.2)];if(h==="sliding")P.push(u(p(n,0,a*.08,E,A),p(n,x*.55,a*.08,E,A),"win",2)),P.push(u(p(n,x*.45,-a*.08,E,A),p(s,0,-a*.08,E,A),"win",2));else{P.push(u(n,s,"win",h==="fixed"?1:2));let L=h==="triple"?3:h==="double"?2:1;for(let w=1;w<L;w++)P.push(u(p(n,x*w/L,a*.3,E,A),p(n,x*w/L,-a*.3,E,A),"win",1.5));if(h==="round"){let w=p(n,x/2,0,E,A);P.push(`<circle cx="${w.x}" cy="${w.y}" r="${Math.min(x/2,a*.45)}" class="win ${d}" fill="none" stroke-width="${c(1.2)}"/>`)}}return P.join("")}let m=e.mirror?-1:1,g=o*m,f=-r*m,b=h==="glass"||h==="french"?"door glass":"door",_=(E,A,P,L)=>{let w={x:E.x+g*P,y:E.y+f*P},S=(L?1:0)^(e.mirror?1:0);return u(E,w,b,2)+`<path d="M ${w.x} ${w.y} A ${P} ${P} 0 0 ${S} ${A.x} ${A.y}" class="door-arc ${d}" stroke-width="${c(1)}"/>`};switch(h){case"opening":return u(p(n,0,a/2,-o,r),p(n,0,-a/2,-o,r),"door",1.5)+u(p(s,0,a/2,-o,r),p(s,0,-a/2,-o,r),"door",1.5);case"garage":return u(n,s,"door",2.5,`stroke-dasharray="${c(6)} ${c(4)}"`);case"sliding":{let E=a/2+3,A=e.flip?x*.5:-x*.5;return u(p(n,A-2,E,g,f),p(s,A+2,E,g,f),"door",3)+u(p(n,Math.min(0,A)-4,E+4,g,f),p(s,Math.max(0,A)+4,E+4,g,f),"door-arc",1)}case"double":case"french":{let E=p(n,x/2,0,g,f);return _(n,E,x/2,!0)+_(s,E,x/2,!1)}default:return e.flip?_(s,n,x,!1):_(n,s,x,!0)}}measure(e,n,s,r,o){let a=Math.hypot(s-e,r-n);if(a<1)return"";let l=m=>m/this.scale,c=Math.atan2(r-n,s-e)*180/Math.PI;(c>90||c<-90)&&(c+=180);let d=-(r-n)/a,h=(s-e)/a,u=o/2+l(10),p=(e+s)/2+d*u,x=(n+r)/2+h*u;return`<text x="${p}" y="${x}" class="measure" font-size="${l(12)}" transform="rotate(${c} ${p} ${x})">${Math.round(a)} cm</text>`}},Nu="floorplan-3d-card-editor-wide",Uu="fp3d-base",__=`
@media (max-width: 999px) { .element-preview { display: none !important; } }
`,ll="fp3d-wide",v_=`
ha-dialog, ha-md-dialog, ha-wa-dialog, ha-adaptive-dialog {
  --mdc-dialog-min-width: 98vw !important; --mdc-dialog-max-width: 98vw !important;
  --mdc-dialog-min-height: 96vh !important; --mdc-dialog-max-height: 96vh !important;
  --dialog-surface-position: fixed !important; --dialog-surface-top: 0px !important; --dialog-surface-margin-top: 2vh !important;
  --vertical-align-dialog: flex-start !important;
  --ha-dialog-width-full: 98vw !important; --ha-dialog-max-width: 98vw !important;
  --ha-dialog-width-md: 98vw !important; --ha-dialog-width-lg: 98vw !important;
  --ha-dialog-min-height: 96vh !important; --ha-dialog-max-height: 96vh !important;
  --md-dialog-container-min-inline-size: 98vw !important; --md-dialog-container-max-inline-size: 98vw !important;
  --md-dialog-container-min-block-size: 96vh !important; --md-dialog-container-max-block-size: 96vh !important;
}
.element-preview { display: none !important; }
.content { max-height: none !important; }
.element-editor { width: 100% !important; max-width: none !important; flex: 1 1 100% !important; overflow: visible !important; }
`,y_=`
.mdc-dialog__surface, [part~="dialog"], [part~="panel"] {
  height: 96vh !important; min-height: 96vh !important; max-height: 96vh !important;
}
wa-dialog::part(dialog) {
  height: 96vh !important; min-height: 96vh !important; max-height: 96vh !important;
  margin-top: 2vh !important; margin-bottom: 2vh !important;
}
`,b_=`
:host {
  display: block; container-type: inline-size;
  --fp-radius: 12px;
  --fp-border: var(--divider-color, rgba(127,127,127,.25));
  --fp-surface: var(--card-background-color, #fff);
  --fp-surface-2: var(--secondary-background-color, #f5f5f5);
  --fp-accent: var(--primary-color, #03a9f4);
  --fp-on-accent: var(--text-primary-color, #fff);
  --fp-text: var(--primary-text-color, #222);
  --fp-muted: var(--secondary-text-color, #666);
}
* { box-sizing: border-box; }
h3 { margin: 0 0 10px; font-size: 13px; font-weight: 600; letter-spacing: .04em; text-transform: uppercase; color: var(--fp-muted); }

button {
  font: inherit; font-size: 13px; border: 1px solid var(--fp-border); background: var(--fp-surface);
  color: var(--fp-text); border-radius: 8px; padding: 6px 10px; cursor: pointer;
  transition: background .15s, border-color .15s, color .15s;
}
button:hover { border-color: var(--fp-accent); }
button.on { background: var(--fp-accent); color: var(--fp-on-accent); border-color: transparent; }
button.danger:hover { border-color: var(--error-color, #db4437); color: var(--error-color, #db4437); }
input, select, textarea {
  font: inherit; font-size: 14px; width: 100%; padding: 7px 9px; border: 1px solid var(--fp-border); border-radius: 8px;
  background: var(--fp-surface); color: var(--fp-text); transition: border-color .15s, box-shadow .15s;
}
input:focus, select:focus, textarea:focus { outline: none; border-color: var(--fp-accent); box-shadow: 0 0 0 2px color-mix(in srgb, var(--fp-accent) 25%, transparent); }
input[type=color] { padding: 2px; height: 34px; cursor: pointer; }
label { display: flex; flex-direction: column; gap: 4px; font-size: 12px; color: var(--fp-muted); }
label.check { flex-direction: row; align-items: center; gap: 8px; font-size: 13px; color: var(--fp-text); cursor: pointer; }
/* Round checkboxes, drawn by us so they look the same on every device. */
input[type=checkbox] {
  -webkit-appearance: none; appearance: none; flex: none; width: 20px; height: 20px; margin: 0; padding: 0;
  border: 2px solid var(--fp-muted); border-radius: 50%; background: transparent; cursor: pointer;
  display: inline-grid; place-content: center; transition: background .15s, border-color .15s;
}
input[type=checkbox]::before {
  content: ""; width: 10px; height: 10px; background: var(--fp-on-accent); transform: scale(0); transition: transform .12s;
  clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
}
input[type=checkbox]:checked { background: var(--fp-accent); border-color: var(--fp-accent); }
input[type=checkbox]:checked::before { transform: scale(1); }
input[type=checkbox]:hover { border-color: var(--fp-accent); }
input[type=checkbox]:disabled { opacity: .4; cursor: not-allowed; }
label.check span small { display: block; font-size: 11px; color: var(--fp-muted); margin-top: 2px; }
label.check.disabled { cursor: not-allowed; color: var(--fp-muted); }
.grid2 { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 10px; }
.grid2 .wide { grid-column: 1 / -1; }
textarea { font-family: ui-monospace, monospace; font-size: 12px; }
.row { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 8px; }
.note { font-size: 12px; color: var(--fp-muted); line-height: 1.4; }

/* Layout: one column by default, two columns when there is room. */
.layout { display: flex; flex-direction: column; gap: 12px; }
.side { display: contents; }
.wide-btn { order: 0; }
.floors-sec { order: 1; }
.floor-list { margin-bottom: 10px; }
.floor-list:empty { display: none; }
.floor-row { display: flex; gap: 8px; align-items: flex-end; margin-bottom: 8px; }
.floor-row label { flex: 1; }
.floor-row button { height: 35px; }
button:disabled { opacity: .45; cursor: default; pointer-events: none; }
.main { order: 2; min-width: 0; display: flex; flex-direction: column; gap: 8px; }
.props, .lib { order: 3; }
.general-sec, .extra { order: 4; }

.sec { background: var(--fp-surface); border: 1px solid var(--fp-border); border-radius: var(--fp-radius); padding: 14px; }
details.sec { padding: 0; }
details.sec > summary { cursor: pointer; padding: 12px 14px; font-size: 14px; font-weight: 500; list-style: none; display: flex; align-items: center; gap: 8px; }
details.sec > summary::before { content: "\u203A"; display: inline-block; transition: transform .15s; font-size: 18px; line-height: 1; color: var(--fp-muted); }
details.sec[open] > summary::before { transform: rotate(90deg); }
details.sec > :not(summary) { margin: 0 14px 14px; }

.wide-btn {
  display: flex; align-items: center; justify-content: center; gap: 10px; width: 100%;
  padding: 12px 16px; font-weight: 600; font-size: 15px; border: none; border-radius: var(--fp-radius);
  background: linear-gradient(135deg, var(--fp-accent), color-mix(in srgb, var(--fp-accent) 70%, #000));
  color: var(--fp-on-accent); box-shadow: 0 4px 14px color-mix(in srgb, var(--fp-accent) 40%, transparent);
}
.wide-btn svg { width: 20px; height: 20px; fill: currentColor; }
.wide-btn:hover { filter: brightness(1.08); }
.wide-btn.on { background: var(--fp-surface-2); color: var(--fp-text); box-shadow: none; border: 1px solid var(--fp-border); }

.props-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
.props-head h3 { margin: 0; }
.props .empty { font-size: 13px; color: var(--fp-muted); }
.stats { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 10px; }
.stats span { font-size: 12px; padding: 3px 9px; border-radius: 999px; background: var(--fp-surface-2); color: var(--fp-muted); }
.stats b { color: var(--fp-text); }

dialog.ask {
  border: 1px solid var(--fp-border); border-radius: 16px; padding: 20px 22px 16px; width: min(420px, calc(100vw - 32px));
  background: var(--fp-surface); color: var(--fp-text); box-shadow: 0 12px 40px rgba(0,0,0,.35);
}
dialog.ask::backdrop { background: rgba(0,0,0,.45); }
dialog.ask h4 { margin: 0 0 8px; font-size: 17px; font-weight: 600; }
dialog.ask p { margin: 0 0 18px; font-size: 14px; line-height: 1.45; color: var(--fp-muted); }
.ask-actions { display: flex; justify-content: flex-end; gap: 8px; }
.ask-actions button { padding: 8px 14px; }
button.danger-fill { background: var(--error-color, #db4437); border-color: transparent; color: #fff; }
button.danger-fill:hover { filter: brightness(1.1); border-color: transparent; }

.lib-note { font-size: 11px; color: var(--fp-muted); text-align: right; }
.lib-search { margin-bottom: 8px; }
.lib-cats { display: flex; flex-wrap: wrap; gap: 4px; margin-bottom: 8px; }
.lib-cats button { padding: 4px 9px; font-size: 12px; border-radius: 999px; }
.lib-cats.dim button { opacity: .55; }
.lib-grid {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(84px, 1fr)); gap: 6px;
  max-height: 300px; overflow-y: auto; padding: 2px; margin: -2px;
}
.lib-grid .empty { grid-column: 1 / -1; font-size: 13px; color: var(--fp-muted); padding: 8px 2px; }
.tile {
  display: flex; flex-direction: column; align-items: center; gap: 4px; padding: 6px 4px 7px; border-radius: 10px;
  background: var(--fp-surface-2); cursor: grab; min-width: 0;
}
.tile img, .tile i { width: 64px; height: 64px; display: block; object-fit: contain; pointer-events: none; }
.tile i { border-radius: 8px; background: color-mix(in srgb, var(--fp-muted) 15%, transparent); }
.tile span { font-size: 11px; line-height: 1.2; text-align: center; color: var(--fp-text); overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; }
.tile:hover { border-color: var(--fp-accent); background: color-mix(in srgb, var(--fp-accent) 10%, var(--fp-surface-2)); }
.tile.on { border-color: var(--fp-accent); box-shadow: 0 0 0 2px var(--fp-accent); background: color-mix(in srgb, var(--fp-accent) 16%, var(--fp-surface-2)); }
.tile.on span { color: var(--fp-text); }
details.placed { margin-top: 10px; }
details.placed > summary { cursor: pointer; font-size: 13px; color: var(--fp-muted); padding: 4px 0; }
.placed-list { display: flex; flex-direction: column; gap: 2px; margin-top: 6px; max-height: 220px; overflow-y: auto; }
.placed-list .empty { font-size: 12px; color: var(--fp-muted); }
.prow { display: grid; grid-template-columns: 12px 1fr auto; align-items: center; gap: 8px; padding: 6px 8px; border-radius: 8px; cursor: pointer; font-size: 13px; }
.prow b { font-weight: 500; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.prow span:last-child { font-size: 11px; color: var(--fp-muted); }
.prow .dot { width: 12px; height: 12px; border-radius: 4px; border: 1px solid rgba(0,0,0,.2); }
.prow:hover { background: var(--fp-surface-2); }
.prow.on { background: color-mix(in srgb, var(--fp-accent) 16%, transparent); }
.obj-acts { margin-top: 0; }
.obj-acts button { flex: 1 1 auto; }

.combo { position: relative; }
.combo-list {
  position: absolute; left: 0; right: 0; top: calc(100% + 4px); z-index: 20; max-height: 280px; overflow-y: auto;
  background: var(--fp-surface); border: 1px solid var(--fp-border); border-radius: 10px; padding: 4px;
  box-shadow: 0 8px 24px rgba(0,0,0,.25);
}
.combo-list[hidden] { display: none; }
.combo-list .opt { display: flex; flex-direction: column; gap: 1px; padding: 7px 10px; border-radius: 7px; cursor: pointer; }
.combo-list .opt b { font-weight: 500; font-size: 13px; color: var(--fp-text); }
.combo-list .opt span { font-size: 11px; color: var(--fp-muted); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.combo-list .opt:hover, .combo-list .opt.act { background: color-mix(in srgb, var(--fp-accent) 14%, transparent); }
.combo-list .none { padding: 8px 10px; font-size: 13px; color: var(--fp-muted); }

.seg { display: inline-flex; flex-wrap: wrap; gap: 2px; padding: 3px; border-radius: 10px; background: var(--fp-surface-2); border: 1px solid var(--fp-border); }
.seg button { border: none; background: transparent; border-radius: 7px; display: inline-flex; align-items: center; gap: 6px; padding: 6px 10px; }
.seg button:hover { background: color-mix(in srgb, var(--fp-accent) 12%, transparent); }
.seg button.on { background: var(--fp-accent); color: var(--fp-on-accent); box-shadow: 0 1px 3px rgba(0,0,0,.2); }
.seg svg { width: 16px; height: 16px; fill: currentColor; }
.topbar { display: flex; align-items: center; gap: 8px; }
.toolbar { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
.toolbar .sep { flex: 1; }
.toolbar .actions button { padding: 6px 8px; }
.toolbar .snap { flex-direction: row; align-items: center; gap: 6px; font-size: 13px; color: var(--fp-text); }
.hint { font-size: 12px; color: var(--fp-muted); padding: 6px 10px; border-radius: 8px; background: var(--fp-surface-2); }

.canvas, .pane-3d .viewer3d {
  position: relative; height: clamp(420px, 62vh, 820px); border: 1px solid var(--fp-border); border-radius: var(--fp-radius);
  overflow: hidden; outline: none; background: var(--fp-surface-2); touch-action: none; isolation: isolate;
  box-shadow: inset 0 1px 3px rgba(0,0,0,.06);
}
.canvas:focus-visible { border-color: var(--fp-accent); }
.canvas svg { width: 100%; height: 100%; display: block; user-select: none; }
.canvas svg.drawing { cursor: crosshair; }
.tools2d { display: flex; flex-direction: column; gap: 8px; }
.panes { display: flex; flex-direction: column; gap: 8px; min-height: 0; }
.pane-2d, .pane-3d { display: flex; flex-direction: column; min-height: 0; min-width: 0; }
.tools2d[hidden], .pane-2d[hidden], .pane-3d[hidden], .cam[hidden] { display: none; }
.main .cam { margin-top: 0; }
.main.both .canvas, .main.both .pane-3d .viewer3d { height: clamp(260px, 32vh, 480px); }

.grid-minor { stroke: var(--divider-color, #ddd); opacity: .5; }
.grid-major { stroke: var(--divider-color, #bbb); }
.room { stroke: var(--fp-accent); cursor: pointer; }
.room-name { text-anchor: middle; dominant-baseline: middle; fill: var(--fp-text); opacity: .6; pointer-events: none; font-weight: 600; }
.room-area { text-anchor: middle; dominant-baseline: middle; fill: var(--fp-text); opacity: .55; pointer-events: none; }
.wall { stroke: var(--fp-text); pointer-events: none; }
.ghost { stroke: var(--fp-text); opacity: .13; pointer-events: none; }
.wall.sel { stroke: var(--fp-accent); }
.hit { stroke: transparent; cursor: pointer; }
.gap { stroke: var(--fp-surface-2); pointer-events: none; }
.win { stroke: #3b8fd9; pointer-events: none; }
.door, .door-arc { stroke: #8b5a2b; fill: none; pointer-events: none; }
.door.glass { stroke: #3b8fd9; }
.obj { cursor: move; }
.obj-shape { fill-opacity: .55; stroke: color-mix(in srgb, var(--fp-text) 55%, transparent); }
.obj-shape.sel { stroke: var(--fp-accent); fill-opacity: .7; }
.obj-front { stroke: color-mix(in srgb, var(--fp-text) 45%, transparent); pointer-events: none; }
.obj-name { text-anchor: middle; dominant-baseline: middle; fill: var(--fp-text); opacity: .75; pointer-events: none; paint-order: stroke; stroke: var(--fp-surface-2); stroke-width: 2px; }
.rot-line { stroke: var(--fp-accent); stroke-dasharray: 3 2; pointer-events: none; }
.handle.rot { fill: var(--fp-accent); stroke: #fff; cursor: grab; }
.win.sel, .door.sel, .door-arc.sel { stroke: var(--fp-accent); }
.hotspot { fill: rgba(63,167,255,.18); stroke: #3fa7ff; cursor: move; }
.hotspot.unbound { fill: rgba(255,152,0,.15); stroke: #ff9800; }
.hotspot.sel { stroke: var(--fp-accent); fill: rgba(63,167,255,.35); }
.hs-name { text-anchor: middle; dominant-baseline: middle; fill: var(--fp-text); pointer-events: none; }
.handle { fill: #fff; stroke: var(--fp-accent); cursor: grab; }
.draft { stroke: var(--fp-accent); stroke-opacity: .55; fill: none; pointer-events: none; stroke-linecap: square; stroke-linejoin: miter; }
.draft-pt, .cursor { fill: var(--fp-accent); pointer-events: none; }
.draft-rect { fill: rgba(3,169,244,.12); stroke: var(--fp-accent); pointer-events: none; }
.measure, .end-label { text-anchor: middle; dominant-baseline: middle; fill: var(--fp-accent); font-weight: 700; pointer-events: none; paint-order: stroke; stroke: var(--fp-surface-2); stroke-width: 3px; }

@container (min-width: 900px) {
  .layout { display: grid; grid-template-columns: minmax(300px, 380px) minmax(0, 1fr); gap: 16px; align-items: start; }
  .side { display: flex; flex-direction: column; gap: 12px; min-width: 0; }
  .main { position: sticky; top: 0; }
  .canvas, .pane-3d .viewer3d { height: max(460px, calc(100vh - 260px)); }
  /* 2D + 3D: side by side, 2D on the left. */
  .main.both .panes { flex-direction: row; }
  .main.both .pane-2d, .main.both .pane-3d { flex: 1 1 0; }
  .main.both .canvas, .main.both .pane-3d .viewer3d { height: max(460px, calc(100vh - 260px)); }
  .grid2 { grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); }

  /* Gro\xDFansicht: the editor exactly fills the dialog; only the left column scrolls. */
  :host(.wide) .layout { height: 100%; align-items: stretch; }
  :host(.wide) .side { overflow-y: auto; padding-right: 4px; min-height: 0; }
  :host(.wide) .main { position: static; min-height: 0; overflow-y: auto; }
  :host(.wide) .panes { flex: 1 1 0; }
  :host(.wide) .pane-2d, :host(.wide) .pane-3d { flex: 1 1 0; }
  :host(.wide) .canvas, :host(.wide) .pane-3d .viewer3d { flex: 1 1 0; height: auto; min-height: 150px; }
}
`;var M_="0.5.0";customElements.get("floorplan-3d-card")||customElements.define("floorplan-3d-card",ol);customElements.get("floorplan-3d-card-editor")||customElements.define("floorplan-3d-card-editor",cl);var hl=window;hl.customCards=hl.customCards||[];hl.customCards.some(i=>i.type==="floorplan-3d-card")||hl.customCards.push({type:"floorplan-3d-card",name:"3D Floorplan Card",description:"3D-Grundriss mit eingebautem Editor und klickbaren Hitboxen f\xFCr Entit\xE4ten.",preview:!0,documentationURL:"https://github.com/PytronX/ha-floorplan-3d"});console.info(`%c FLOORPLAN-3D-CARD %c v${M_} `,"color:#fff;background:#03a9f4;font-weight:700","color:#03a9f4");
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2025 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
