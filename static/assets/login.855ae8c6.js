import{_ as N,d as E,g as G,u as A,k as j,h as _,l as M,s as H,m as J,r as p,o as r,c as I,a as t,t as L,n as U,b as a,p as g,w as s,q as P,v as y,x as $,y as O,E as f,z as Q,e as S,A as W,B as X,C as Y}from"./index.e7cb72d6.js";import{i as Z,a as x,b as ee}from"./validate.32e385d1.js";import{s as se}from"./valid-code.9c0a10ca.js";var oe="./assets/left.167ce885.jpg",ne="./assets/wel_tips.e07b65d4.png",ae="./assets/weixin.98c36a14.png",te="./assets/qq.e9c35b93.png",le="./assets/weibo.b24d06fa.png";const re=E({name:"Login",setup(){const e=G(),o=A(),q=j(),C=_("password"),R=i=>{C.value=i},n=M({loginType:C,loading:!1,username:"",password:"",phone:"",validSmsCode:""}),u=_("password"),h=()=>{u.value===""?u.value="password":u.value=""},m=()=>n.username?!0:(f.warning({message:"\u8BF7\u8F93\u5165\u7528\u6237\u540D",type:"warning"}),!1),d=()=>n.password?Z(n.password)?!0:(f.warning({message:"\u5BC6\u7801\u683C\u5F0F\u4E0D\u6B63\u786E",type:"warning"}),!1):(f.warning({message:"\u8BF7\u8F93\u5165\u5BC6\u7801",type:"warning"}),!1),w=_(!1),v=_(!1),c=_(300),k=()=>n.phone?x(n.phone)?!0:(f.warning({message:"\u624B\u673A\u53F7\u683C\u5F0F\u4E0D\u6B63\u786E",type:"warning"}),!1):(f.warning({message:"\u8BF7\u5148\u8F93\u5165\u624B\u673A\u53F7",type:"warning"}),!1),l=()=>!n.validSmsCode||!ee(n.validSmsCode)?(f.warning({message:"\u8BF7\u8F93\u51656\u4F4D\u6570\u5B57\u9A8C\u8BC1\u7801",type:"warning"}),!1):!0;let b=null;const B=()=>{!k()||se(n).then(i=>{v.value=!0,b&&clearInterval(b),b=setInterval(()=>{c.value=c.value-1,c.value===0&&(clearInterval(b),v.value=!1,c.value=300)},1e3)})},z=()=>{w.value=!0},D=()=>{if(!m()||!d())return;const i={username:n.username,password:n.password};O(i).then(V=>{n.phone=V.data,n.showPhone=V.data.replace(/^(\d{3})\d{4}(\d{4})$/,"$1****$2"),w.value=!0})},F=()=>{if(!m()||!d()||!k()||!l())return;const i={username:n.username,password:n.password,phone:n.phone,validCode:n.validSmsCode};K("user/login",i)},K=(i,V)=>{e.dispatch(i,V).then(()=>{f.success({message:"\u767B\u5F55\u6210\u529F",type:"success",showClose:!0,duration:1e3}),Q(),o.push(q.query.redirect||"/")})};return{systemTitle:H,systemSubTitle:J,loginType:C,onLoginTypeClick:R,form:n,passwordType:u,passwordTypeChange:h,dialogFormVisible:w,showCountDown:v,countDown:c,handleFormClose:z,onValidSmsCodeClick:B,onLoginGetPhone:D,onLoginByPasswordPhone:F,onUpdatePassword:()=>{o.push("/update_password")},onResetPassword:()=>{o.push("/reset_password")}}}}),T=e=>(X("data-v-6e82fa4b"),e=e(),Y(),e),de={class:"passport-container"},ie={class:"passport-container-inner"},pe={class:"passport-notes"},ue=T(()=>t("img",{src:oe,alt:""},null,-1)),me={class:"notes"},ce={class:"passport-main"},ge=T(()=>t("div",{class:"welcome-tips"},[t("span",null,"\u7EC8\u4E8E\u7B49\u5230\u4F60~"),t("img",{src:ne,alt:""})],-1)),fe={class:"login-box"},we={class:"login-box-tabs"},he={class:"login-box-form"},ve=T(()=>t("div",{id:"qr-code",class:"qr-code"},null,-1)),_e=T(()=>t("span",{class:"title"},"\u6253\u5F00\u9489\u9489\u626B\u4E00\u626B\uFF0C\u5FEB\u901F\u767B\u5F55/\u6CE8\u518C",-1)),ye=S("\u767B\u5F55"),Ce=S("\u4FEE\u6539\u5BC6\u7801"),ke={class:"login-box-bottom"},be=S("\u5176\u4ED6\u767B\u5F55\u65B9\u5F0F"),Ve=W('<div class="third-icon" data-v-6e82fa4b><a class="icon weixin" href="/#/auth/wechat" data-v-6e82fa4b><img src="'+ae+'" alt="" data-v-6e82fa4b></a><a class="icon qq" href="/#/auth/qq" data-v-6e82fa4b><img src="'+te+'" alt="" data-v-6e82fa4b></a><a class="icon weibo" href="/#/auth/weibo" data-v-6e82fa4b><img src="'+le+'" alt="" data-v-6e82fa4b></a></div>',1),Pe={key:1,class:"valid-code count-down"},Se=S("\u786E\u8BA4");function Te(e,o,q,C,R,n){const u=p("el-divider"),h=p("el-form"),m=p("el-input"),d=p("el-form-item"),w=p("el-button"),v=p("el-link"),c=p("el-col"),k=p("el-dialog");return r(),I("div",de,[t("div",ie,[t("div",pe,[ue,t("div",me,[t("div",null,L(e.systemTitle),1),t("div",null,L(e.systemSubTitle),1)])]),t("div",ce,[ge,t("div",fe,[t("div",we,[t("h3",{class:U(["tab",e.loginType==="dingding"?"active":""]),onClick:o[0]||(o[0]=l=>e.onLoginTypeClick("dingding"))},"\u9489\u9489\u767B\u5F55",2),a(u,{direction:"vertical"}),t("h3",{class:U(["tab",e.loginType==="password"?"active":""]),onClick:o[1]||(o[1]=l=>e.onLoginTypeClick("password"))},"\u5BC6\u7801\u767B\u5F55",2)]),t("div",he,[e.loginType==="dingding"?(r(),g(h,{key:0,class:"form dingding"},{default:s(()=>[ve,_e]),_:1})):P("",!0),e.loginType==="password"?(r(),g(h,{key:1,class:"form password",onKeydown:$(e.onLoginGetPhone,["enter"])},{default:s(()=>[a(d,null,{default:s(()=>[a(m,{ref:"username",type:"text",modelValue:e.form.username,"onUpdate:modelValue":o[2]||(o[2]=l=>e.form.username=l),placeholder:"\u7528\u6237\u540D/\u624B\u673A\u53F7/\u90AE\u7BB1",size:"large",maxlength:"50"},{prepend:s(()=>[(r(),g(y(e.useRenderIcon("user","svg"))))]),_:1},8,["modelValue"])]),_:1}),a(d,null,{default:s(()=>[a(m,{ref:"password",type:e.passwordType,modelValue:e.form.password,"onUpdate:modelValue":o[3]||(o[3]=l=>e.form.password=l),placeholder:"\u5BC6\u7801",size:"large",maxlength:"50"},{prepend:s(()=>[(r(),g(y(e.useRenderIcon("lock","svg"))))]),append:s(()=>[(r(),g(y(e.useRenderIcon(e.passwordType?"eye-close":"eye-open","svg")),{onClick:e.passwordTypeChange},null,8,["onClick"]))]),_:1},8,["type","modelValue"])]),_:1}),a(d,null,{default:s(()=>[a(w,{type:"primary",loading:e.form.loading,onClick:e.onLoginGetPhone,style:{width:"100%"}},{default:s(()=>[ye]),_:1},8,["loading","onClick"]),a(c,{class:"link"},{default:s(()=>[a(v,{class:"link-text",underline:!1,onClick:e.onUpdatePassword},{default:s(()=>[Ce]),_:1},8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onKeydown"])):P("",!0)]),t("div",ke,[a(u,{direction:"horizontal"},{default:s(()=>[be]),_:1}),Ve])])])]),a(k,{top:"30vh",title:"\u77ED\u4FE1\u9A8C\u8BC1",width:"30%",modelValue:e.dialogFormVisible,"onUpdate:modelValue":o[7]||(o[7]=l=>e.dialogFormVisible=l),onClose:e.handleFormClose},{default:s(()=>[a(h,{class:"dialog-phone-form",onKeydown:$(e.onLoginByPasswordPhone,["enter"])},{default:s(()=>[a(d,null,{default:s(()=>[a(m,{ref:"phone",type:"text",modelValue:e.form.showPhone,"onUpdate:modelValue":o[4]||(o[4]=l=>e.form.showPhone=l),placeholder:"\u624B\u673A\u53F7",size:"large",maxlength:"50"},{prepend:s(()=>[(r(),g(y(e.useRenderIcon("phone","svg"))))]),_:1},8,["modelValue"])]),_:1}),a(d,null,{default:s(()=>[a(m,{ref:"validCode",type:"text",modelValue:e.form.validSmsCode,"onUpdate:modelValue":o[6]||(o[6]=l=>e.form.validSmsCode=l),placeholder:"6\u4F4D\u6570\u5B57\u9A8C\u8BC1\u7801",size:"large",maxlength:"50"},{prepend:s(()=>[(r(),g(y(e.useRenderIcon("message","svg"))))]),append:s(()=>[e.showCountDown?P("",!0):(r(),I("span",{key:0,class:"valid-code send",onClick:o[5]||(o[5]=(...l)=>e.onValidSmsCodeClick&&e.onValidSmsCodeClick(...l))},"\u53D1\u9001\u9A8C\u8BC1\u7801")),e.showCountDown?(r(),I("span",Pe,L(e.countDown)+"s\u540E\u91CD\u65B0\u83B7\u53D6",1)):P("",!0)]),_:1},8,["modelValue"])]),_:1}),a(d,null,{default:s(()=>[a(w,{type:"primary",loading:e.form.loading,onClick:e.onLoginByPasswordPhone,style:{width:"100%"}},{default:s(()=>[Se]),_:1},8,["loading","onClick"])]),_:1})]),_:1},8,["onKeydown"])]),_:1},8,["modelValue","onClose"])])}var $e=N(re,[["render",Te],["__scopeId","data-v-6e82fa4b"]]);export{$e as default};
