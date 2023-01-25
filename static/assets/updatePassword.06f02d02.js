import{_ as I,d as b,u as R,h,p as N,o as l,c as z,a as i,y as t,w as o,b as a,A as w,B as T,z as V,E as p,H as K,I as $,e as U,r as y,D as F,F as E}from"./index.3030a0be.js";import{i as k}from"./index.c998d848.js";const S=b({name:"UpdatePassword",setup(){const e=R(),n=h(1),s=N({loading:!1,username:"",password:"",newPassword:"",confirmPassword:""}),m=h("password"),_=()=>{m.value===""?m.value="password":m.value=""},c=h("password"),u=()=>{c.value===""?c.value="password":c.value=""},r=h("password"),P=()=>{r.value===""?r.value="password":r.value=""},f=()=>s.username?!0:(p.warning({message:"\u8BF7\u8F93\u5165\u7528\u6237\u540D",type:"warning"}),!1),g=()=>s.password?k(s.password)?!0:(p.warning({message:"\u5BC6\u7801\u683C\u5F0F\u4E0D\u6B63\u786E",type:"warning"}),!1):(p.warning({message:"\u8BF7\u8F93\u5165\u5BC6\u7801",type:"warning"}),!1),d=()=>s.newPassword?k(s.newPassword)?s.newPassword===s.password?(p.warning({message:"\u65B0\u5BC6\u7801\u548C\u539F\u5BC6\u7801\u4E0D\u80FD\u76F8\u540C",type:"warning"}),!1):!0:(p.warning({message:"\u65B0\u5BC6\u7801\u683C\u5F0F\u4E0D\u6B63\u786E",type:"warning"}),!1):(p.warning({message:"\u8BF7\u8F93\u5165\u65B0\u5BC6\u7801",type:"warning"}),!1),C=()=>s.confirmPassword?k(s.confirmPassword)?s.confirmPassword!==s.newPassword?(p.warning({message:"\u4E24\u6B21\u8F93\u5165\u5BC6\u7801\u4E0D\u4E00\u81F4",type:"warning"}),!1):!0:(p.warning({message:"\u786E\u8BA4\u5BC6\u7801\u683C\u5F0F\u4E0D\u6B63\u786E",type:"warning"}),!1):(p.warning({message:"\u8BF7\u8F93\u5165\u786E\u8BA4\u5BC6\u7801",type:"warning"}),!1);return{stepForm:n,form:s,passwordType:m,passwordTypeChange:_,newPasswordType:c,newPasswordTypeChange:u,confirmPasswordType:r,confirmPasswordTypeChange:P,checkUsername:f,checkPassword:g,checkNewPassword:d,checkConfirmPassword:C,onUpdatePasswordCheck:()=>{if(!f()||!g())return;const v={username:s.username,password:s.password,validCode:s.validImgCode};K(v).then(B=>{n.value=2})},onUpdatePassword:()=>{if(!d()||!C())return;const v={username:s.username,password:s.password,newPassword:s.newPassword};$(v).then(B=>{e.push("/login")})},onResetPassword:()=>{e.push("/reset_password")}}}}),D=e=>(F("data-v-dab37c8c"),e=e(),E(),e),A={class:"passport-container"},H={class:"passport-container-inner"},M={class:"passport-main"},j={class:"login-box"},q=D(()=>i("div",{class:"login-box-tabs"},[i("h3",{class:"tab active"},"\u4FEE\u6539\u5BC6\u7801")],-1)),G={class:"login-box-form"},J=U("\u4E0B\u4E00\u6B65"),L=U("\u63D0\u4EA4");function O(e,n,s,m,_,c){const u=y("el-input"),r=y("el-form-item"),P=y("el-button"),f=y("el-col"),g=y("el-form");return l(),z("div",A,[i("div",H,[i("div",M,[i("div",j,[q,i("div",G,[e.stepForm===1?(l(),t(g,{key:0,class:"form update",onKeydown:T(e.onUpdatePasswordCheck,["enter"])},{default:o(()=>[a(r,null,{default:o(()=>[a(u,{ref:"username",type:"text",modelValue:e.form.username,"onUpdate:modelValue":n[0]||(n[0]=d=>e.form.username=d),placeholder:"\u7528\u6237\u540D/\u624B\u673A\u53F7/\u90AE\u7BB1",size:"large",maxlength:"50",onBlur:e.checkUsername},{prepend:o(()=>[(l(),t(w(e.useRenderIcon("user","svg"))))]),_:1},8,["modelValue","onBlur"])]),_:1}),a(r,null,{default:o(()=>[a(u,{ref:"password",type:e.passwordType,modelValue:e.form.password,"onUpdate:modelValue":n[1]||(n[1]=d=>e.form.password=d),placeholder:"\u5BC6\u7801",size:"large",maxlength:"50",onBlur:e.checkPassword},{prepend:o(()=>[(l(),t(w(e.useRenderIcon("lock","svg"))))]),append:o(()=>[(l(),t(w(e.useRenderIcon(e.passwordType?"eye-close":"eye-open","svg")),{onClick:e.passwordTypeChange},null,8,["onClick"]))]),_:1},8,["type","modelValue","onBlur"])]),_:1}),a(r,null,{default:o(()=>[a(P,{type:"primary",loading:e.form.loading,onClick:e.onUpdatePasswordCheck,style:{width:"100%"}},{default:o(()=>[J]),_:1},8,["loading","onClick"]),a(f,{class:"link"})]),_:1})]),_:1},8,["onKeydown"])):V("",!0),e.stepForm===2?(l(),t(g,{key:1,class:"form password",onKeydown:T(e.onUpdatePassword,["enter"])},{default:o(()=>[a(r,null,{default:o(()=>[a(u,{ref:"password",type:e.newPasswordType,modelValue:e.form.newPassword,"onUpdate:modelValue":n[2]||(n[2]=d=>e.form.newPassword=d),placeholder:"\u8BF7\u8F93\u5165\u65B0\u5BC6\u7801",size:"large",maxlength:"50",onBlur:e.checkNewPassword},{prepend:o(()=>[(l(),t(w(e.useRenderIcon("lock","svg"))))]),append:o(()=>[(l(),t(w(e.useRenderIcon(e.newPasswordType?"eye-close":"eye-open","svg")),{onClick:e.newPasswordTypeChange},null,8,["onClick"]))]),_:1},8,["type","modelValue","onBlur"])]),_:1}),a(r,null,{default:o(()=>[a(u,{ref:"password",type:e.confirmPasswordType,modelValue:e.form.confirmPassword,"onUpdate:modelValue":n[3]||(n[3]=d=>e.form.confirmPassword=d),placeholder:"\u8BF7\u518D\u6B21\u8F93\u5165\u65B0\u5BC6\u7801",size:"large",maxlength:"50",onBlur:e.checkConfirmPassword},{prepend:o(()=>[(l(),t(w(e.useRenderIcon("lock","svg"))))]),append:o(()=>[(l(),t(w(e.useRenderIcon(e.confirmPasswordType?"eye-close":"eye-open","svg")),{onClick:e.confirmPasswordTypeChange},null,8,["onClick"]))]),_:1},8,["type","modelValue","onBlur"])]),_:1}),a(r,null,{default:o(()=>[a(P,{type:"primary",loading:e.form.loading,onClick:e.onUpdatePassword,style:{width:"100%"}},{default:o(()=>[L]),_:1},8,["loading","onClick"]),a(f,{class:"link"})]),_:1})]),_:1},8,["onKeydown"])):V("",!0)])])])])])}var x=I(S,[["render",O],["__scopeId","data-v-dab37c8c"]]);export{x as default};