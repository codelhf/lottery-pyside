import{D as k,_ as E,o as u,c as d,a as m,f as Q,K as C,t as $,h as l,L as re,M as R,N as H,p as b,O as ie,u as oe,r as U,b as i,w as n,P as G,Q as J,q as j,e as S,E as W,R as ce}from"./index.318969c3.js";import{n as X}from"./null.829e72b2.js";function de(){return k({url:"/lottery/prize",method:"get"})}function pe(){return k({url:"/lottery/user",method:"get"})}function Y(p){return k({url:"/lottery/startCheck",method:"get",params:{prizeId:p}})}function ve(p){return k({url:"/lottery/startOne",method:"get",params:{prizeId:p}})}function _e(p){return k({url:"/lottery/startAll",method:"get",params:{prizeId:p}})}function fe(p){return k({url:"/lottery/resetStock",method:"post",params:{prizeId:p}})}var he="./assets/action.dcc60ea6.mp3",me="./assets/jump.4215991e.mp3";const ge={class:"user-item-left"},ye=["src"],ze={key:1,class:"user-item-div"},xe={class:"user-item-right"},we=["src"],Ue={key:1,class:"user-item-div"},ke={name:"UserItem"},Se=Object.assign(ke,{props:{user:{type:Object,required:!0},index:{type:Number,required:!0},userItemStyle:{type:String,required:!0},usernameStyle:{type:String,required:!0},descriptionStyle:{type:String,required:!0}},setup(p){const e=p;return(s,r)=>(u(),d("div",{class:"user-item",style:C(e.userItemStyle)},[m("div",ge,[e.index%2===0?(u(),d("img",{key:0,class:"user-item-img",src:e.user.avatar?e.user.avatar:Q(X),alt:""},null,8,ye)):(u(),d("div",ze,[m("span",{class:"username",style:C(e.usernameStyle)},$(e.user.name),5),m("span",{class:"description",style:C(e.descriptionStyle)},$(e.user.desc),5)]))]),m("div",xe,[e.index%2!==0?(u(),d("img",{key:0,class:"user-item-img",src:e.user.avatar?e.user.avatar:Q(X),alt:""},null,8,we)):(u(),d("div",Ue,[m("span",{class:"username",style:C(e.usernameStyle)},$(e.user.name),5),m("span",{class:"description",style:C(e.descriptionStyle)},$(e.user.desc),5)]))])],4))}});var Z=E(Se,[["__scopeId","data-v-b60201e4"]]);const Ie={class:"multi-user"},Ce={name:"MultiUser",components:{UserItem:Z}},$e=Object.assign(Ce,{props:{prizeUser:{type:Array,required:!0},userIndex:{type:Number,default:0}},setup(p){const e=p,s=l("width: 100%; height: 100%;"),r=l("font-size: 36px;"),o=l("font-size: 18px;");return re(()=>{e.prizeUser.length===1?(s.value="width: 100%; height: 100%",r.value="font-size: 36px;",o.value="font-size: 18px;"):e.prizeUser.length===2?(s.value="width: 50%; height: 50%",r.value="font-size: 18px;",o.value="font-size: 9px;"):e.prizeUser.length===3?(s.value="width: 33.33%; height: 33.33%",r.value="font-size: 12px;",o.value="font-size: 6px;"):e.prizeUser.length===4?(s.value="width: 50%; height: 50%",r.value="font-size: 18px;",o.value="font-size: 9px;"):e.prizeUser.length===5||e.prizeUser.length===6?(s.value="width: 33.33%; height: 33.33%",r.value="font-size: 12px;",o.value="font-size: 6px;"):e.prizeUser.length===7||e.prizeUser.length===8?(s.value="width: 25%; height: 25%",r.value="font-size: 9px;",o.value="font-size: 6px;"):e.prizeUser.length===9?(s.value="width: 33.33%; height: 33.33%",r.value="font-size: 12px;",o.value="font-size: 6px;"):e.prizeUser.length>=10&&(s.value="width: 25%; height: 25%",r.value="font-size: 9px;",o.value="font-size: 6px;")}),(L,f)=>(u(),d("div",Ie,[(u(!0),d(R,null,H(e.prizeUser,P=>(u(),b(Z,{key:P.id,user:P,index:e.userIndex,"user-item-style":s.value,"username-style":r.value,"description-style":o.value},null,8,["user","index","user-item-style","username-style","description-style"]))),128))]))}});var A=E($e,[["__scopeId","data-v-5c9e4994"]]);const be={class:"home-container"},Pe=["src"],Oe={key:1,class:"prize-name"},Be=["src"],Ne={style:{"margin-top":"10px"}},qe=S("\u5F00\u59CB"),Me=S("\u505C\u6B62"),Te={style:{"margin-top":"10px"}},Ve=S("\u5355\u62BD"),je=S("\u5168\u62BD"),Re=S("\u91CD\u7F6E"),He=S("\u7BA1\u7406"),Ae={name:"Home",components:{MultiUser:A}},Ee=Object.assign(Ae,{setup(p){ie(()=>{o(),P(),window.onresize=()=>{this.screenHeight=window.innerHeight}});const e=l([]),s=l([]),r=l([]);async function o(){const t=[];await de().then(a=>{e.value=a.data,s.value=e.value[0],e.value.map(c=>{c.image&&t.push(c.image)})}),await pe().then(a=>{r.value=a.data,r.value.map(c=>{c.avatar&&t.push(c.avatar)})}),console.log(t)}function L(t){s.value=e.value[t],console.log(t,s.value.name)}const f=l([]);function P(){const t=s.value.id;!t||Y(t).then(a=>{f.value=a.data})}const g=l(null),v=l(null),O=l(!1),I=l(!1),h=l(1e3),N=l(!1),q=l(null),y=l(!1),B=l(!0);function ee(){const t=s.value.id;!t||Y(t).then(a=>{if(f.value=a.data,f.value.length<5){W.error("\u4EBA\u5458\u6570\u91CF\u4E0D\u80FD\u5C11\u4E8E5\u4EBA");return}g.value=null,v.value=null,O.value=!1,I.value=!0,h.value=300,N.value=!0,q.value=he,y.value=!0,setTimeout(()=>{B.value=!1,y.value=!1},1.5*1e3)})}const z=l(!0),M=l([]);function te(){const t=s.value.id;!t||(z.value?ve(t).then(a=>{const c=a.data;y.value=!0,M.value=[c],v.value=f.value.map(x=>x.id).indexOf(c.id),v.value>5?g.value=v.value-5:g.value=f.value.length-5+v.value}):_e(t).then(a=>{const c=a.data[0];y.value=!0,M.value=a.data,v.value=f.value.map(x=>x.id).indexOf(c.id),v.value>5?g.value=v.value-5:g.value=f.value.length-5+v.value}))}function D(){h.value<=1e3&&(I.value=!1,h.value=h.value+200,setTimeout(()=>{I.value=!0,setTimeout(D,h.value+100)},100))}function se(t){console.log(t,v.value,g.value,h.value),t===g.value&&(D(),q.value=me),t===v.value&&h.value>1e3&&(I.value=!1,O.value=!0,N.value=!1,setTimeout(()=>{B.value=!0,y.value=!1},1.5*1e3))}function ae(){const t=s.value.id;!t||ce.confirm("\u786E\u5B9A\u8981\u91CD\u7F6E\u8BE5\u5956\u54C1\u5417\uFF1F","\u8B66\u544A",{cancelButtonText:"\u53D6\u6D88",confirmButtonText:"\u786E\u5B9A",type:"warning"}).then(()=>{fe(t).then(()=>{W.success("\u91CD\u7F6E\u6210\u529F")})})}const le=oe();function ue(){le.push("/prize")}const F=l(window.innerHeight);return(t,a)=>{const c=U("el-carousel-item"),x=U("el-carousel"),T=U("el-col"),V=U("el-row"),w=U("el-button"),ne=U("el-button-group");return u(),d("div",be,[i(V,{style:{"text-align":"center","padding-top":"30px"}},{default:n(()=>[i(T,{span:8,offset:8},{default:n(()=>[i(x,{class:"carousel-prize",arrow:"always",trigger:"click","indicator-position":"none",height:F.value*.1+"px",autoplay:!1,onChange:L},{default:n(()=>[(u(!0),d(R,null,H(e.value,_=>(u(),b(c,{key:_.id},{default:n(()=>[_.image?(u(),d("img",{key:0,class:"prize-image",src:_.image,alt:""},null,8,Pe)):(u(),d("div",Oe,$(_.name),1))]),_:2},1024))),128))]),_:1},8,["height"])]),_:1})]),_:1}),i(V,{style:{"text-align":"center","padding-top":"30px"}},{default:n(()=>[i(T,{span:12,offset:6},{default:n(()=>[i(x,{class:"carousel-user",direction:"vertical","indicator-position":"none",height:F.value*.6+"px",autoplay:I.value,interval:h.value,onChange:se},{default:n(()=>[(u(!0),d(R,null,H(f.value,(_,K)=>(u(),b(c,{key:K},{default:n(()=>[G(i(A,{"prize-user":M.value},null,8,["prize-user"]),[[J,O.value]]),G(i(A,{"prize-user":[_],"user-index":K},null,8,["prize-user","user-index"]),[[J,!O.value]])]),_:2},1024))),128))]),_:1},8,["height","autoplay","interval"])]),_:1}),N.value?(u(),d("audio",{key:0,src:q.value,autoplay:"autoplay",loop:"loop"},null,8,Be)):j("",!0)]),_:1}),i(V,{style:{"text-align":"center","padding-top":"30px"}},{default:n(()=>[i(T,{span:4,offset:10},{default:n(()=>[m("div",Ne,[B.value?(u(),b(w,{key:0,type:"primary",round:"",style:{width:"100%"},loading:y.value,onClick:ee},{default:n(()=>[qe]),_:1},8,["loading"])):j("",!0),B.value?j("",!0):(u(),b(w,{key:1,type:"primary",round:"",style:{width:"100%"},loading:y.value,onClick:te},{default:n(()=>[Me]),_:1},8,["loading"]))]),m("div",Te,[i(ne,{modelValue:z.value,"onUpdate:modelValue":a[2]||(a[2]=_=>z.value=_),size:"small"},{default:n(()=>[i(w,{type:z.value?"primary":"default",onClick:a[0]||(a[0]=_=>z.value=!0)},{default:n(()=>[Ve]),_:1},8,["type"]),i(w,{type:z.value?"default":"primary",onClick:a[1]||(a[1]=_=>z.value=!1)},{default:n(()=>[je]),_:1},8,["type"]),i(w,{type:"default",onClick:ae},{default:n(()=>[Re]),_:1}),i(w,{type:"default",onClick:ue},{default:n(()=>[He]),_:1})]),_:1},8,["modelValue"])])]),_:1})]),_:1})])}}});var Fe=E(Ee,[["__scopeId","data-v-68979dea"]]);export{Fe as default};
