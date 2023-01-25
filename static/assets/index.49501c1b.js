import{u as ee,l as le,h as s,o as ae,y as ne,w as n,b as e,a as c,v as b,e as d,Q as te,E as oe,r as f}from"./index.3030a0be.js";import{f as ue,T as D,a as F,U as E,b as q,c as j,d as N,e as ie,g as se,h as de,u as re,w as B,i as me,j as pe}from"./index.0f1eddef.js";import"./null.584599c2.js";const ce=d("\u641C\u7D22"),fe=d("\u91CD\u7F6E"),ve=d("\u65B0\u589E\u5956\u54C1"),ge=d("\u6279\u91CF\u5220\u9664"),_e=d("\u8868\u683C\u6A21\u677F"),be=d("\u4E0A\u4F20\u8868\u683C"),he=d("\u4E0B\u8F7D\u8868\u683C"),ke={class:"dialog-footer"},ye=d("\u53D6\u6D88"),Ve=d("\u786E\u5B9A"),ze={class:"dialog-footer"},Ce=d("\u53D6\u6D88"),we=d("\u786E\u5B9A"),Ue={name:"Prize",components:{TableList:F,TableLayout:j,TableImage:D,UploadImage:E,UploadExcel:q}},Te=Object.assign(Ue,{setup(Ie){const x=ee();le(()=>{r()});const i=s({pageNum:1,pageSize:10,sort:"",username:"",prizeId:""});function M(){i.value.pageNum=1,r()}function O(){i.value={pageNum:1,pageSize:10,sort:"",username:"",prizeId:""}}const V=s(null),h=s(!1),z=s([]),k=s(0);function r(){h.value=!0,ue(i.value).then(t=>{z.value=t.data.list,k.value=t.data.total,setTimeout(()=>{h.value=!1},1.5*1e3)})}function C(t){te.confirm("\u786E\u5B9A\u8981\u5220\u9664\u5417\uFF1F","\u5220\u9664\u63D0\u793A",{cancelButtonText:"\u53D6\u6D88",confirmButtonText:"\u786E\u5B9A",type:"warning"}).then(()=>{if(t&&t.id)N(t.id).then(a=>{r()});else{const a=V.value.getSelectedRowKeys();N(a.join(",")).then(_=>{r()})}})}const v=s(!1),o=s({id:"",image:"",name:"",desc:"",stock:"",number:"",operateTime:""}),Q=s({name:[{required:!0,message:"\u5956\u54C1\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A",trigger:"blur"}],desc:[{required:!0,message:"\u5956\u54C1\u63CF\u8FF0\u4E0D\u80FD\u4E3A\u7A7A",trigger:"blur"}],stock:[{required:!0,message:"\u5956\u54C1\u6570\u91CF\u4E0D\u80FD\u4E3A\u7A7A",trigger:"blur"}],number:[{required:!0,message:"\u5956\u54C1\u987A\u5E8F\u4E0D\u80FD\u4E3A\u7A7A",trigger:"blur"}]});function w(t){o.value={},v.value=!0,t&&t.id&&ie(t.id).then(a=>{o.value=a.data})}function A(){o.value.name&&o.value.desc&&se(o.value).then(t=>{t.data&&oe.error("\u5956\u54C1\u5DF2\u5B58\u5728")})}function K(t){x.push(`/user?prizeId=${t.id}`)}function G(t){o.value.image=t}const y=s(null);function U(){y.value.resetFields(),v.value=!1,o.value={}}function H(){y.value.validate(t=>{t&&(o.value.id?re(o.value).then(a=>{v.value=!1,r()}):de(o.value).then(a=>{v.value=!1,r()}))})}const I=s([{field:"name",name:"\u5956\u54C1\u540D\u79F0"},{field:"desc",name:"\u5956\u54C1\u63CF\u8FF0"},{field:"stock",name:"\u5956\u54C1\u6570\u91CF",type:"number"},{field:"number",name:"\u5956\u54C1\u987A\u5E8F",type:"number"}]);function J(){B({header:I.value,filename:"\u5956\u54C1\u7BA1\u7406"})}function W(){me().then(t=>{const a=t.data;B({data:a,header:I.value,filename:"\u5956\u54C1\u7BA1\u7406"})})}const g=s(!1);function X(){g.value=!0}function R(){g.value=!1}const P=s([]);function Y(t){P.value=t}function Z(){pe(P.value).then(()=>{g.value=!1,r()}).catch(()=>{r()})}return(t,a)=>{const _=f("el-input"),m=f("el-form-item"),u=f("el-button"),S=f("el-form"),p=f("el-table-column"),T=f("el-input-number"),$=f("el-dialog");return ae(),ne(j,{title:"\u5956\u54C1\u5217\u8868"},{form:n(()=>[e(S,{model:i.value,inline:!0,"label-width":"120px","label-suffix":":"},{default:n(()=>[e(m,{label:"\u5956\u54C1\u540D\u79F0"},{default:n(()=>[e(_,{modelValue:i.value.name,"onUpdate:modelValue":a[0]||(a[0]=l=>i.value.name=l),placeholder:"\u8BF7\u8F93\u5165\u5956\u54C1\u540D\u79F0"},null,8,["modelValue"])]),_:1}),e(m,{label:"\u5956\u54C1\u63CF\u8FF0"},{default:n(()=>[e(_,{modelValue:i.value.description,"onUpdate:modelValue":a[1]||(a[1]=l=>i.value.description=l),placeholder:"\u8BF7\u8F93\u5165\u5956\u54C1\u63CF\u8FF0"},null,8,["modelValue"])]),_:1}),e(m,null,{default:n(()=>[e(u,{type:"primary",icon:t.useRenderIcon("search"),onClick:M},{default:n(()=>[ce]),_:1},8,["icon"]),e(u,{type:"primary",icon:t.useRenderIcon("refresh-left"),onClick:O},{default:n(()=>[fe]),_:1},8,["icon"])]),_:1})]),_:1},8,["model"])]),button:n(()=>[e(u,{type:"primary",icon:t.useRenderIcon("plus"),onClick:a[2]||(a[2]=l=>w())},{default:n(()=>[ve]),_:1},8,["icon"]),e(u,{type:"warning",icon:t.useRenderIcon("delete"),onClick:a[3]||(a[3]=l=>C())},{default:n(()=>[ge]),_:1},8,["icon"]),e(u,{type:"",icon:t.useRenderIcon("document"),onClick:a[4]||(a[4]=l=>J())},{default:n(()=>[_e]),_:1},8,["icon"]),e(u,{type:"",icon:t.useRenderIcon("upload2"),onClick:a[5]||(a[5]=l=>X())},{default:n(()=>[be]),_:1},8,["icon"]),e(u,{type:"",icon:t.useRenderIcon("download"),onClick:a[6]||(a[6]=l=>W())},{default:n(()=>[he]),_:1},8,["icon"])]),table:n(()=>[e(F,{ref_key:"tableListDom",ref:V,data:z.value,loading:h.value,"show-selection":!0,"show-page":k.value>0,"page-total":k.value,"page-num":i.value.pageNum,"onUpdate:page-num":a[7]||(a[7]=l=>i.value.pageNum=l),"page-size":i.value.pageSize,"onUpdate:page-size":a[8]||(a[8]=l=>i.value.pageSize=l),onPagination:r},{default:n(()=>[e(p,{label:"\u5956\u54C1\u56FE\u7247",align:"center"},{default:n(l=>[e(D,{src:l.row.image},null,8,["src"])]),_:1}),e(p,{label:"\u5956\u54C1\u540D\u79F0",align:"center"},{default:n(l=>[c("span",null,b(l.row.name),1)]),_:1}),e(p,{label:"\u5956\u54C1\u63CF\u8FF0",align:"center"},{default:n(l=>[c("span",null,b(l.row.desc),1)]),_:1}),e(p,{label:"\u5956\u54C1\u6570\u91CF",align:"center"},{default:n(l=>[c("span",null,b(l.row.stock),1)]),_:1}),e(p,{label:"\u5956\u54C1\u987A\u5E8F",align:"center"},{default:n(l=>[c("span",null,b(l.row.number),1)]),_:1}),e(p,{label:"\u64CD\u4F5C\u65F6\u95F4",align:"center"},{default:n(l=>[c("span",null,b(l.row.operateTime),1)]),_:1}),e(p,{label:"\u64CD\u4F5C",align:"center",width:"160"},{default:n(l=>[e(u,{type:"primary",size:"small",circle:"",icon:t.useRenderIcon("user"),onClick:L=>K(l.row),title:"\u4E2D\u5956\u4EBA\u5458"},null,8,["icon","onClick"]),e(u,{type:"primary",size:"small",circle:"",icon:t.useRenderIcon("edit"),onClick:L=>w(l.row),title:"\u7F16\u8F91"},null,8,["icon","onClick"]),e(u,{type:"danger",size:"small",circle:"",icon:t.useRenderIcon("delete"),onClick:L=>C(l.row),title:"\u5220\u9664"},null,8,["icon","onClick"])]),_:1})]),_:1},8,["data","loading","show-page","page-total","page-num","page-size"]),e($,{title:o.value.id?"\u4FEE\u6539\u5956\u54C1":"\u65B0\u589E\u5956\u54C1",modelValue:v.value,"onUpdate:modelValue":a[13]||(a[13]=l=>v.value=l),onClose:U},{footer:n(()=>[c("span",ke,[e(u,{onClick:U},{default:n(()=>[ye]),_:1}),e(u,{type:"primary",onClick:H},{default:n(()=>[Ve]),_:1})])]),default:n(()=>[e(S,{ref_key:"dialogForm",ref:y,model:o.value,rules:Q.value,"label-width":"120px","label-suffix":":"},{default:n(()=>[e(m,{label:"\u5956\u54C1\u56FE\u7247",prop:"image"},{default:n(()=>[e(E,{"image-url":o.value.image,onUploadPath:G},null,8,["image-url"])]),_:1}),e(m,{label:"\u5956\u54C1\u540D\u79F0",prop:"name"},{default:n(()=>[e(_,{modelValue:o.value.name,"onUpdate:modelValue":a[9]||(a[9]=l=>o.value.name=l),placeholder:"\u8BF7\u8F93\u5165\u5956\u54C1\u540D\u79F0",onBlur:A},null,8,["modelValue"])]),_:1}),e(m,{label:"\u5956\u54C1\u63CF\u8FF0",prop:"desc"},{default:n(()=>[e(_,{modelValue:o.value.desc,"onUpdate:modelValue":a[10]||(a[10]=l=>o.value.desc=l),placeholder:"\u8BF7\u8F93\u5165\u5956\u54C1\u63CF\u8FF0"},null,8,["modelValue"])]),_:1}),e(m,{label:"\u5956\u54C1\u6570\u91CF",prop:"stock"},{default:n(()=>[e(T,{modelValue:o.value.stock,"onUpdate:modelValue":a[11]||(a[11]=l=>o.value.stock=l),min:1,placeholder:"\u8BF7\u8F93\u5165\u5956\u54C1\u6570\u91CF"},null,8,["modelValue"])]),_:1}),e(m,{label:"\u5956\u54C1\u987A\u5E8F",prop:"number"},{default:n(()=>[e(T,{modelValue:o.value.number,"onUpdate:modelValue":a[12]||(a[12]=l=>o.value.number=l),min:1,placeholder:"\u8BF7\u8F93\u5165\u5956\u54C1\u987A\u5E8F"},null,8,["modelValue"])]),_:1})]),_:1},8,["model","rules"])]),_:1},8,["title","modelValue"]),e($,{title:"\u5BFC\u5165Excel",modelValue:g.value,"onUpdate:modelValue":a[14]||(a[14]=l=>g.value=l),onClose:R},{footer:n(()=>[c("span",ze,[e(u,{onClick:R},{default:n(()=>[Ce]),_:1}),e(u,{type:"primary",onClick:Z},{default:n(()=>[we]),_:1})])]),default:n(()=>[e(q,{header:t.header,onOnSuccess:Y},null,8,["header"])]),_:1},8,["modelValue"])]),_:1})}}});export{Te as default};
