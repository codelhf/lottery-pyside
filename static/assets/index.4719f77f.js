import{a as q,d as z,b as E,c as M,e as j,u as K}from"./index.c5c20fa5.js";import{T as N,a as R}from"./layout.4cd61cc3.js";import{K as $,h as i,r as p,o as O,p as P,w as a,b as e,a as g,t as _,e as m,N as Q,E as A}from"./index.d764b3ff.js";const G=m("\u67E5\u8BE2"),H=m("\u91CD\u7F6E"),J=m("\u65B0\u589E\u7528\u6237\u7EA7\u522B"),W=m("\u6279\u91CF\u5220\u9664"),X={class:"dialog-footer"},Y=m("\u53D6\u6D88"),Z=m("\u786E\u5B9A"),ee={name:"UserLevel",components:{TableList:N,TableLayout:R}},oe=Object.assign(ee,{setup(le){$(()=>{d()});const u=i({pageNum:1,pageSize:10,sort:"",levelid:"",leveldescribe:""});function S(){u.value.pageNum=1,d()}function B(){u.value={pageNum:1,pageSize:10,sort:"",levelid:"",leveldescribe:""}}const V=i(null),b=i(!1),y=i([]),h=i(0);function d(){b.value=!0,q(u.value).then(n=>{y.value=n.data.list,h.value=n.data.total,setTimeout(()=>{b.value=!1},1.5*1e3)})}function L(n){Q.confirm("\u786E\u5B9A\u8981\u5220\u9664\u5417\uFF1F","\u5220\u9664\u63D0\u793A",{cancelButtonText:"\u53D6\u6D88",confirmButtonText:"\u786E\u5B9A",type:"warning"}).then(()=>{if(n&&n.uid)z(n.uid).then(t=>{d()});else{const t=V.value.getSelectedRowKeys();z(t.join(",")).then(v=>{d()})}})}const r=i(!1),o=i({uid:"",levelid:"",leveldescribe:"",levelranking:"",livemonitoringlevel:""}),T=i({levelid:[{required:!0,message:"\u7EA7\u522B\u6807\u8BC6\u4E0D\u80FD\u4E3A\u7A7A",trigger:"blur"}],leveldescribe:[{required:!0,message:"\u7EA7\u522B\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A",trigger:"blur"}],levelranking:[{required:!0,message:"\u4EFB\u52A1\u4F18\u5148\u7EA7\u4E0D\u80FD\u4E3A\u7A7A",trigger:"blur"}]});function C(n){o.value={},r.value=!0,n&&n.uid&&E(n.uid).then(t=>{o.value=t.data})}function x(){o.value.levelid&&o.value.leveldescribe&&M(o.value).then(n=>{n.data&&A.error("\u7528\u6237\u7EA7\u522B\u5DF2\u5B58\u5728")})}const k=i(null);function U(){k.value.resetFields(),r.value=!1,o.value={}}function F(){k.value.validate(n=>{n&&(o.value.uid?K(o.value).then(t=>{r.value=!1,d()}):j(o.value).then(t=>{r.value=!1,d()}))})}return(n,t)=>{const v=p("el-input"),c=p("el-form-item"),s=p("el-button"),w=p("el-form"),f=p("el-table-column"),I=p("el-dialog");return O(),P(R,{title:"\u7528\u6237\u7EA7\u522B\u5217\u8868"},{form:a(()=>[e(w,{model:u.value,inline:!0,"label-width":"120px","label-suffix":":"},{default:a(()=>[e(c,{label:"\u7EA7\u522B\u540D\u79F0"},{default:a(()=>[e(v,{modelValue:u.value.leveldescribe,"onUpdate:modelValue":t[0]||(t[0]=l=>u.value.leveldescribe=l),placeholder:"\u8BF7\u8F93\u5165\u7EA7\u522B\u540D\u79F0"},null,8,["modelValue"])]),_:1}),e(c,{label:"\u7EA7\u522B\u6807\u8BC6"},{default:a(()=>[e(v,{modelValue:u.value.levelid,"onUpdate:modelValue":t[1]||(t[1]=l=>u.value.levelid=l),placeholder:"\u8BF7\u8F93\u5165\u7EA7\u522B\u6807\u8BC6"},null,8,["modelValue"])]),_:1}),e(c,null,{default:a(()=>[e(s,{type:"primary",icon:n.useRenderIcon("search"),onClick:S},{default:a(()=>[G]),_:1},8,["icon"]),e(s,{type:"primary",icon:n.useRenderIcon("refresh-left"),onClick:B},{default:a(()=>[H]),_:1},8,["icon"])]),_:1})]),_:1},8,["model"])]),button:a(()=>[e(s,{type:"primary",icon:n.useRenderIcon("plus"),onClick:C},{default:a(()=>[J]),_:1},8,["icon"]),e(s,{type:"warning",icon:n.useRenderIcon("delete"),onClick:L},{default:a(()=>[W]),_:1},8,["icon"])]),table:a(()=>[e(N,{ref_key:"tableListDom",ref:V,data:y.value,loading:b.value,"show-selection":!0,"show-page":h.value>0,"page-total":h.value,"page-num":u.value.pageNum,"onUpdate:page-num":t[2]||(t[2]=l=>u.value.pageNum=l),"page-size":u.value.pageSize,"onUpdate:page-size":t[3]||(t[3]=l=>u.value.pageSize=l),onPagination:d},{default:a(()=>[e(f,{label:"\u5E8F\u53F7",align:"center"},{default:a(l=>[g("span",null,_(l.row.uid),1)]),_:1}),e(f,{label:"\u7EA7\u522B\u6807\u8BC6",align:"center"},{default:a(l=>[g("span",null,_(l.row.levelid),1)]),_:1}),e(f,{label:"\u7EA7\u522B\u540D\u79F0",align:"center"},{default:a(l=>[g("span",null,_(l.row.leveldescribe),1)]),_:1}),e(f,{label:"\u4EFB\u52A1\u4F18\u5148\u7EA7",align:"center"},{default:a(l=>[g("span",null,_(l.row.levelranking),1)]),_:1}),e(f,{label:"\u64CD\u4F5C",align:"center",width:"160",fixed:"right"},{default:a(l=>[e(s,{type:"primary",size:"small",circle:"",icon:n.useRenderIcon("edit"),onClick:D=>C(l.row),title:"\u7F16\u8F91"},null,8,["icon","onClick"]),e(s,{type:"warning",size:"small",circle:"",icon:n.useRenderIcon("delete"),onClick:D=>L(l.row),title:"\u5220\u9664"},null,8,["icon","onClick"])]),_:1})]),_:1},8,["data","loading","show-page","page-total","page-num","page-size"]),e(I,{title:o.value.uid?"\u4FEE\u6539\u7528\u6237\u7EA7\u522B":"\u65B0\u589E\u7528\u6237\u7EA7\u522B",modelValue:r.value,"onUpdate:modelValue":t[7]||(t[7]=l=>r.value=l),onClose:U},{footer:a(()=>[g("span",X,[e(s,{onClick:U},{default:a(()=>[Y]),_:1}),e(s,{type:"primary",onClick:F},{default:a(()=>[Z]),_:1})])]),default:a(()=>[e(w,{ref_key:"dialogForm",ref:k,model:o.value,rules:T.value,"label-width":"120px","label-suffix":":"},{default:a(()=>[e(c,{label:"\u7EA7\u522B\u6807\u8BC6",prop:"levelid"},{default:a(()=>[e(v,{modelValue:o.value.levelid,"onUpdate:modelValue":t[4]||(t[4]=l=>o.value.levelid=l),placeholder:"\u8BF7\u8F93\u5165\u7EA7\u522B\u6807\u8BC6"},null,8,["modelValue"])]),_:1}),e(c,{label:"\u7EA7\u522B\u540D\u79F0",prop:"leveldescribe",onBlur:x},{default:a(()=>[e(v,{modelValue:o.value.leveldescribe,"onUpdate:modelValue":t[5]||(t[5]=l=>o.value.leveldescribe=l),placeholder:"\u8BF7\u8F93\u5165\u7EA7\u522B\u540D\u79F0"},null,8,["modelValue"])]),_:1}),e(c,{label:"\u4EFB\u52A1\u4F18\u5148\u7EA7",prop:"levelranking"},{default:a(()=>[e(v,{modelValue:o.value.levelranking,"onUpdate:modelValue":t[6]||(t[6]=l=>o.value.levelranking=l),placeholder:"\u8BF7\u8F93\u5165\u4EFB\u52A1\u4F18\u5148\u7EA7"},null,8,["modelValue"])]),_:1})]),_:1},8,["model","rules"])]),_:1},8,["title","modelValue"])]),_:1})}}});export{oe as default};
