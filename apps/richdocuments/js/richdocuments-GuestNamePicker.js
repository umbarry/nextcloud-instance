/*! For license information please see richdocuments-GuestNamePicker.js.LICENSE.txt */
"use strict";(self.webpackChunkrichdocuments=self.webpackChunkrichdocuments||[]).push([["GuestNamePicker","data_image_svg_xml_3csvg_20xmlns_27http_www_w3_org_2000_svg_27_20width_2724_27_20height_2724_-b2e651"],{5707:(t,e,a)=>{a.d(e,{Z:()=>o});var n=a(7537),s=a.n(n),l=a(3645),i=a.n(l)()(s());i.push([t.id,".modal__content[data-v-4d5a9940]{padding:calc(var(--default-grid-baseline)*4)}.modal__content .modal__form[data-v-4d5a9940]{padding:15px 0}.modal__buttons[data-v-4d5a9940]{display:flex;justify-content:center;padding:0 calc(var(--default-grid-baseline)*4) calc(var(--default-grid-baseline)*4) calc(var(--default-grid-baseline)*4)}","",{version:3,sources:["webpack://./src/components/GuestNamePicker.vue"],names:[],mappings:"AAGA,iCACC,4CAHe,CAKf,8CACC,cAAA,CAIF,iCACC,YAAA,CACA,sBAAA,CACA,wHAAA",sourcesContent:["\n$modal-padding: calc(var(--default-grid-baseline) * 4);\n\n.modal__content {\n\tpadding: $modal-padding;\n\n\t.modal__form {\n\t\tpadding: 15px 0;\n\t}\n}\n\n.modal__buttons {\n\tdisplay: flex;\n\tjustify-content: center;\n\tpadding: 0 $modal-padding $modal-padding $modal-padding;\n}\n"],sourceRoot:""}]);const o=i},71:(t,e,a)=>{a.d(e,{default:()=>A});var n=a(4882),s=a(1352),l=a(7845),i=a(3782);const o={name:"GuestNamePicker",components:{NcModal:n.Jc,NcButton:n.P2,NcTextField:n.h3,NcIconSvgWrapper:n.FK},props:{onSubmit:{type:Function,default:()=>{}},fileName:{type:String,default:""}},data(){return{guestName:"",show:!0,file:{name:this.fileName,icon:null}}},async mounted(){const t=document.getElementById("filename").value;this.file={name:""===this.file.name?t:this.file.name,icon:await(async()=>{const t=document.getElementById("mimetypeIcon").value;let e;try{e=await l.Z.get(t)}catch(t){console.error(t)}return 200===e.status?e.data:null})()}},methods:{t:s.Iu,setGuestName(t){this.guestName=t},async submit(){(0,i.Y)(this.guestName),this.show=!1,await this.onSubmit(this.guestName)}}};var d=a(3379),c=a.n(d),m=a(7795),u=a.n(m),r=a(569),N=a.n(r),g=a(3565),h=a.n(g),p=a(9216),v=a.n(p),_=a(4589),w=a.n(_),f=a(5707),Z={};Z.styleTagTransform=w(),Z.setAttributes=h(),Z.insert=N().bind(null,"head"),Z.domAPI=u(),Z.insertStyleElement=v();c()(f.Z,Z);f.Z&&f.Z.locals&&f.Z.locals;const A=(0,a(1900).Z)(o,(function(){var t=this,e=t._self._c;return e("NcModal",{attrs:{"can-close":!1,"out-transition":!0,size:"small",show:t.show},on:{"update:show":function(e){t.show=e}}},[e("div",{staticClass:"modal__content",attrs:{"data-cy":"guestNameModal"}},[e("h3",[null!==t.file.icon?e("NcIconSvgWrapper",{attrs:{inline:!0,svg:t.file.icon,size:35}}):t._e(),t._v("\n\t\t\t\t"+t._s(t.file.name)+"\n\t\t\t")],1),t._v(" "),e("p",[t._v("\n\t\t\t\t"+t._s(t.t("richdocuments","Please enter the guest name you wish to use before proceeding to the document.\n                               If you don't provide one, the default will be used."))+"\n\t\t\t")]),t._v(" "),e("div",{staticClass:"modal__form"},[e("NcTextField",{attrs:{value:t.guestName,"data-cy":"guestNameInput",label:t.t("richdocuments","Guest name"),placeholder:t.t("richdocuments","Anonymous guest"),type:"text"},on:{"update:value":t.setGuestName}})],1)]),t._v(" "),e("div",{staticClass:"modal__buttons"},[e("NcButton",{attrs:{"data-cy":"guestNameSubmit","aria-label":t.t("richdocuments","Submit name"),type:"primary"},on:{click:t.submit}},[t._v("\n\t\t\t\t"+t._s(t.t("richdocuments","Submit name"))+"\n\t\t\t")])],1)])}),[],!1,null,"4d5a9940",null).exports},1488:t=>{t.exports="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20width=%2724%27%20height=%2724%27%20fill=%27%23222%27%3e%3cpath%20d=%27M15.4%2016.6L10.8%2012l4.6-4.6L14%206l-6%206%206%206%201.4-1.4z%27/%3e%3c/svg%3e"},4868:t=>{t.exports="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20width=%2724%27%20height=%2724%27%20fill=%27%23222%27%3e%3cpath%20d=%27M18.4%207.4L17%206l-6%206%206%206%201.4-1.4-4.6-4.6%204.6-4.6m-6%200L11%206l-6%206%206%206%201.4-1.4L7.8%2012l4.6-4.6z%27/%3e%3c/svg%3e"},7059:t=>{t.exports="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20width=%2724%27%20height=%2724%27%20fill=%27%23222%27%3e%3cpath%20d=%27M5.6%207.4L7%206l6%206-6%206-1.4-1.4%204.6-4.6-4.6-4.6m6%200L13%206l6%206-6%206-1.4-1.4%204.6-4.6-4.6-4.6z%27/%3e%3c/svg%3e"},5701:t=>{t.exports="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20width=%2724%27%20height=%2724%27%20fill=%27%23222%27%3e%3cpath%20d=%27M8.6%2016.6l4.6-4.6-4.6-4.6L10%206l6%206-6%206-1.4-1.4z%27/%3e%3c/svg%3e"},4882:(t,e,a)=>{a.d(e,{$U:()=>M.N,FK:()=>q.N,Iw:()=>o.N,Jc:()=>et.Z,Jh:()=>K.N,O3:()=>u.N,P2:()=>z.Z,QG:()=>mt.N,SL:()=>O.Z,a0:()=>W.N,fg:()=>P.N,h3:()=>ut.N,rw:()=>F.N});a(2369);var n=a(1915),s=a(6250),l=a(9760),i=a(9037),o=a(2145),d=a(9339),c=a(1843),m=a(495),u=a(566),r=a(1084),N=a(2248),g=a(1918),h=a(2891),p=a(7657),v=a(2047),_=a(4771),w=a(5825),f=a(6639),Z=a(6829),A=a(1885),b=a(1729),y=a(4098),x=a(4637),C=a(7064),S=a(5299),I=a(4957),k=a(3751),L=a(6109),G=a(3444),M=a(260),P=a(606),z=a(2652),F=a(8829),T=a(1088),$=a(2478),B=a(701),E=a(945),J=a(9421),K=a(472),j=a(3436),H=a(975),W=a(6776),X=a(4070),Y=a(2211),O=a(346),Q=a(3458),R=a(5431),U=a(7925),q=a(5834),D=a(2468),V=a(9848),tt=a(9759),et=a(9029),at=a(3969),nt=a(4069),st=a(5356),lt=a(4509),it=a(4829),ot=a(2984),dt=a(5612),ct=a(992),mt=(a(1445),a(9154),a(7845),a(5203)),ut=a(9816),rt=(a(3042),a(6156)),Nt=a(3284),gt=a(2373),ht=a(6781),pt=a(952),vt=a(8994),_t=a(5584),wt=a(3257),ft=a(5310),Zt=(a(2299),a(279),a(6183),a(4739),a(318)),At=a(8505),bt=(a(249),a(4722),a(6692),a(946),a(7444));n.Z,s.N,l.Z,i.Z,o.N,d.Z,c.Z,m.Z,r.Z,N.Z,g.Z,u.N,h.N,p.Z,v.Z,_.N,w.N,f.Z,Z.N,A.Z,b.Z,y.N,x.N,C.Z,S.N,I.Z,k.N,L.Z,dt.N,G.N,M.N,P.N,z.Z,F.N,T.N,$.N,B.Z,E.N,J.N,K.N,j.Z,H.Z,W.N,X.N,Y.N,O.Z,Q.Z,R.N,U.N,q.N,D.N,V.N,tt.Z,ot.N,et.Z,at.Z,nt.N,st.N,lt.N,it.N,dt.a,ct.N,rt.N,mt.N,Nt.N,gt.N,ht.N,pt.N,ft.Z,ut.N,vt.N,_t.N,wt.N,Symbol.toStringTag,Zt.X,At.X,bt.NS,Symbol.toStringTag}}]);
//# sourceMappingURL=richdocuments-GuestNamePicker.js.map?v=5aea0fb4d58bc5be252e