/*! For license information please see AuthorizeSection.a258220313a2635421d7.js.LICENSE.txt */
(self.webpackChunkncpasswords=self.webpackChunkncpasswords||[]).push([[7749],{90636:(t,e,s)=>{"use strict";s.r(e),s.d(e,{default:()=>a});const a={}},20996:(t,e,s)=>{"use strict";s.d(e,{A:()=>i});var a=function(){var t=this;return(0,t._self._c)(t.tag,{ref:"field",tag:"component",attrs:{type:t.type,value:t.userInput,placeholder:t.getPlaceholder,title:t.getTitle},on:{input:function(e){return t.inputEvent()},keyup:function(e){return t.fireEvent(e)},keydown:function(e){return t.fireEvent(e)},keypress:function(e){return t.fireEvent(e)}}})};a._withStripped=!0;var r=s(80444);const n={props:{variables:{type:Object,default:()=>({})},title:{type:String,default:null},value:{type:String,default:""},placeholder:{type:String,default:null},type:{type:String,default:"text"},tag:{type:String,default:"input"}},data(){return{userInput:this.value}},computed:{getPlaceholder(){return!!this.placeholder&&r.A.translate(this.placeholder,this.variables)},getTitle(){return!!this.title&&r.A.translate(this.title,this.variables)}},methods:{inputEvent(){this.$emit("input",this.$refs.field.value)},fireEvent(t){this.$emit(t.type,t)}},watch:{value(t){this.$refs.field.value=t,this.userInput=t}}},i=(0,s(14486).A)(n,a,[],!1,null,"c2781be6",null).exports},11620:(t,e,s)=>{"use strict";s.r(e),s.d(e,{default:()=>b});var a=function(){var t=this,e=t._self._c;return e("div",{attrs:{id:"app-content"}},[e("form",{class:t.getClasses,attrs:{id:"authorize-window"},on:{submit:function(e){return t.submitLogin(e)}}},[t.impersonating?e("translate",{staticClass:"login-message",attrs:{tag:"div",icon:"user",say:"You are logging in as {user}",variables:t.loginVars}}):t._e(),t._v(" "),e("div",{staticClass:"login-container"},[t.retryVisible?e("translate",{attrs:{icon:"repeat",title:"Request token again",iconClass:t.retryClass},on:{click:function(e){return t.requestToken()}}}):t._e(),t._v(" "),e("div",[t.hasPassword?e("field",{ref:"passwordField",attrs:{type:"password",placeholder:"Password",disabled:t.loggingIn,required:""},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}}):t._e(),t._v(" "),t.hasToken&&t.providers.length>0?e("select",{directives:[{name:"model",rawName:"v-model",value:t.providerId,expression:"providerId"}],attrs:{disabled:t.loggingIn},on:{change:function(e){var s=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){return"_value"in t?t._value:t.value}));t.providerId=e.target.multiple?s:s[0]}}},t._l(t.providers,(function(s,a){return e("option",{attrs:{title:s.description},domProps:{value:a}},[t._v("\n                        "+t._s(s.label)+"\n                    ")])})),0):t._e(),t._v(" "),t.showTokenField?e("field",{attrs:{placeholder:"Token",title:t.provider.description,required:"",disabled:t.loggingIn},model:{value:t.token,callback:function(e){t.token=e},expression:"token"}}):t._e()],1)],1),t._v(" "),t.hasToken||t.hasPassword||t.hasError?e("div",{staticClass:"login-confirm"},[e("translate",{class:{"no-icon":t.loggingIn},attrs:{tag:"input",type:"submit","localized-value":"Login"}}),t._v(" "),t.loggingIn?e("div",{staticClass:"login-icon fa fa-circle-o-notch fa-spin"},[t._v(" ")]):t._e(),t._v(" "),t.hasError?e("translate",{staticClass:"login-error",attrs:{say:t.errorMessage,tag:"div"}}):t._e()],1):t._e()],1),t._v(" "),e("nc-button",{staticClass:"authorize-help-button",attrs:{type:"primary",to:{name:"Help"}},scopedSlots:t._u([{key:"icon",fn:function(){return[e("help-circle",{attrs:{size:20}})]},proxy:!0}])})],1)};a._withStripped=!0;var r=s(20996),n=s(56423),i=s(53024),o=s(59828),l=s(5460),d=s(61338),u=s(89843),c=s(69159),h=s(21777);class p{static hasBeenAttempted=!1;isAvailable(){return!p.hasBeenAttempted&&!!window.PasswordCredential&&u.A.get("client.encryption.webauthn.enabled")}async run(){if(!this.isAvailable()||p.hasBeenAttempted)return null;p.hasBeenAttempted=!0;try{let t=`${(0,h.HW)().uid}.passwordsapp@${location.host}`,e=await navigator.credentials.get(new PasswordCredential({password:!0,id:t}));if(e&&e.password)return e.password}catch(t){c.A.error(t)}return null}}var g=s(45173),w=s(34413),y=s(33277),v=s(98498);class f{async run(t){await this._isSecure(t)||this._forcePassphraseChange().catch(c.A.catch).then((()=>{u.A.set("client.encryption.passphrase.check",Date.now()/1e3)}))}async _isSecure(t){if(t.length<12)return!1;if(u.A.get("client.encryption.passphrase.check")>Date.now()/1e3-2419200)return!0;let e=await w.A.getClient().getInstance("service.hash"),s=await e.getHash(t);return-1===(await e.getBreachedHashes(s.substring(0,5))).indexOf(s)}async _forcePassphraseChange(){let t=!1;do{await y.A.alert("CSEPassphraseInsecureText","CSEPassphraseInsecureTitle"),t=await v.A.updateGui()}while(!1===t)}}const A={components:{Field:r.A,Translate:i.A,"help-circle":()=>Promise.resolve().then(s.bind(s,23659)),"nc-button":()=>Promise.resolve().then(s.bind(s,74095))},data(){let t=document.querySelector("meta[name=pw-impersonate]"),e=!1;return t&&(e="true"===t.getAttribute("content")),{password:"",token:"",salts:[],providerId:-1,provider:null,providers:[],hasPassword:!1,hasToken:!1,hasError:!1,errorMessage:"",loggingIn:!1,retryClass:"",webAuthnAction:new p,impersonating:e}},beforeCreate(){(0,d.Ic)("toggle-navigation",{open:!1}),document.body.classList.remove("pw-auth-skipped","pw-auth-passed"),document.body.classList.add("pw-auth-visible")},created(){document.body.classList.remove("pw-auth-skipped","pw-auth-passed"),document.body.classList.add("pw-auth-visible"),n.A.requestSession().then((t=>{if((0,d.Ic)("toggle-navigation",{open:!1}),t.hasOwnProperty("challenge")&&(this.hasPassword=!0,this.salts=t.challenge.salts),t.hasOwnProperty("token")){this.hasToken=!0,this.provider=null,this.providerId=-1,this.providers=[];for(let e=0;e<t.token.length;e++)"twofactor_nextcloud_notification"===t.token[e].id&&1!==t.token.length||(this.providers.push(t.token[e]),null!==this.provider||t.token[e].request||(this.providerId=this.providers.length-1,this.provider=t.token[e]));null===this.provider&&(this.providerId=0,this.provider=this.providers[0])}this.hasPassword||this.hasToken?(document.body.classList.remove("pw-auth-skipped","pw-auth-passed"),document.body.classList.add("pw-auth-visible"),this.webAuthnAction.isAvailable()&&this.webAuthnAction.run().then((t=>{t&&(this.password=t,this.hasToken||this.submitLogin(null,!0))})),this.$nextTick((()=>{this.$refs.passwordField.$el.focus()}))):n.A.openSession([]).then((()=>{this.goToTarget()})).catch((t=>{this.loginError(t)}))})).catch((t=>{this.hasError=!0,this.errorMessage=t.message}))},computed:{retryVisible(){return null!==this.provider&&this.provider.request},loginVars:()=>({user:document.head.getAttribute("data-user-displayname")}),getClasses(){return(this.hasPassword?" has-password":"")+(this.hasToken?" has-token":"")},showTokenField(){return this.hasToken&&"user-token"===this.provider.type}},methods:{submitLogin(t,e=!1){if(t&&t.preventDefault(),this.loggingIn)return;this.loggingIn=!0;let s={};this.hasPassword&&(s.password=this.password,s.salts=this.salts),this.hasToken&&(s.token={},s.token[this.provider.id]=this.token),this.hasError=!1,this.$nextTick((()=>{n.A.openSession(s).then((()=>{(new f).run(s.password).catch(c.A.catch),this.goToTarget()})).catch((t=>{this.loginError(t,e)}))}))},loginError(t,e=!1){if(this.password="",this.hasToken&&"user-token"!==this.provider.type&&(this.token=""),this.hasError=!0,t.response&&403===t.response.status)return this.errorMessage="Password invalid. Session revoked for too many failed login attempts.",void setTimeout("location.reload()",2500);t.message?this.errorMessage=t.message:this.errorMessage="Unknown Error",e&&(new g.A).run(),this.loggingIn=!1},goToTarget(){let t=this.$route.params.target,e={path:"/"};t&&(e=JSON.parse(atob(t))),document.body.classList.add("pw-auth-passed"),setTimeout((()=>{this.$router.push(e),l.A.isMobile||(0,d.Ic)("toggle-navigation",{open:!0})}),250),setTimeout((()=>{document.body.classList.remove("pw-auth-visible"),o.A.runAutomatically()}),500)},requestToken(){this.retryClass="fa-spin",n.A.requestToken(this.provider.id).then((t=>{"request-token"===this.provider.type&&(this.token=t.data.token),setTimeout((()=>{this.retryClass=""}),1500)})).catch((()=>{y.A.alert("You may have requested too many tokens. Please try again later.","Token request failed"),this.retryClass=""}))}},watch:{providerId(t){this.provider=this.providers[t],this.token="",this.provider.request&&this.requestToken()}}};s(52671);const b=(0,s(14486).A)(A,a,[],!1,null,null,null).exports},52671:(t,e,s)=>{var a=s(90636);a.__esModule&&(a=a.default),"string"==typeof a&&(a=[[t.id,a,""]]),a.locals&&(t.exports=a.locals),(0,s(70534).A)("dd57f50c",a,!1,{})},45173:(t,e,s)=>{"use strict";s.d(e,{A:()=>n});var a=s(89843),r=s(18221);class n{run(){a.A.set("client.encryption.webauthn.enabled",!1),r.A.info("WebAuthnLoginDisabled")}}},62319:(t,e,s)=>{"use strict";s.d(e,{A:()=>d});var a=s(33277),r=s(80444),n=s(89843),i=s(18221),o=s(21777),l=s(69159);class d{static isWebauthnPasswordAvailable(){return!!window.PasswordCredential}async run(t=null){if(d.isWebauthnPasswordAvailable()){null===t&&(t=(await this._showSetupDialog()).password);try{await this._storeEncryptionPassphrase(t),n.A.set("client.encryption.webauthn.enabled",!0),i.A.success("WebauthnLoginSetupSuccess")}catch(t){l.A.error(t)}}}async _storeEncryptionPassphrase(t){let e=r.A.translate("Passwords App Encryption Passphrase"),s=`${(0,o.HW)().uid}.passwordsapp@${location.host}`,a=n.A.get("server.theme.app.icon");const i=new PasswordCredential({id:s,password:t,name:e,iconURL:a});await navigator.credentials.store(i)}_showSetupDialog(){return a.A.form({password:{label:"WebauthnEncryptionPassphrase",type:"password",button:"toggle",minlength:12,required:!0,validator:(t,e)=>t!==e.oldPassword&&t.length>=12},repeatPassword:{label:"WebauthnEncryptionPassphraseRepeat",type:"password",button:"toggle",required:!0,validator:(t,e)=>t===e.password}},"WebauthnEncryptionSetupTitle","WebauthnEncryptionPassphraseText")}}},98498:(t,e,s)=>{"use strict";s.d(e,{A:()=>w});var a=s(56423),r=s(5460),n=s(41603),i=s(34413),o=s(90512),l=s(33277),d=s(69159),u=s(89843),c=s(80444),h=s(32981),p=s(61338),g=s(62319);const w=new class{constructor(){this._statusFunc=null,this.status=null}async install(t,e=!1,s=!1,a=null){if(await this.isPassphraseSecure(t)){if(this._resetStatus(a),await this._updateKeychain(t),!1!==s){let t={},e={};await Promise.all([this._encryptTags(t),this._encryptFolders(e)]),await this._encryptPasswords(e,t),await this._cleanDatabase(t,e)}e&&await this._saveMasterPassword(t),r.A.loginRequired=!0,(0,p.Ic)("passwords:encryption:installed",{})}}async update(t,e){try{if(!await this.isPassphraseSecure(t))return;await a.A.setAccountChallenge(t,e),await this._updateWebAuthn(t)}catch(t){throw t}}async updateGui(){let t;try{t=await l.A.form({password:{label:"New password",type:"password",button:"toggle",minlength:12,required:!0,title:"Your password must be longer than 12 characters and not the old password",validator:(t,e)=>t!==e.oldPassword&&t.length>=12},repeatPassword:{label:"Repeat password",type:"password",button:"toggle",required:!0,title:"Please confirm your new password",validator:(t,e)=>t===e.password},oldPassword:{label:"Old password",type:"password",button:"toggle",title:"You must enter your old password",required:!0,validator:t=>t.length>=12}},"Change Password","You can use this dialog to change your master password.")}catch(t){return!1}try{o.A.lockApp(),await this.update(t.password,t.oldPassword),o.A.unlockApp(),l.A.alert("Your password has been changed successfully.","Password changed")}catch(t){return o.A.unlockApp(),d.A.error(t),l.A.alert(t.message,"Changing password failed"),!1}return!0}async isPassphraseSecure(t){let e=!0;if(t.length<12)e=!1;else{let s=await i.A.getClient().getInstance("service.hash"),a=await s.getHash(t);e=-1===(await s.getBreachedHashes(a.substring(0,5))).indexOf(a)}return e||l.A.alert("CSENewPassphraseInsecureText","CSEPassphraseInsecureTitle").catch(d.A.catch),e}async _updateKeychain(t){this._sendStatus("keychain","processing",1);try{await a.A.setAccountChallenge(t),await Promise.all([await u.A.reset("user.encryption.cse"),await u.A.reset("user.encryption.sse")]),this._sendStatus("keychain","done")}catch(t){throw this._sendStatus("keychain","error",t),t}}async _encryptPasswords(t,e){this._sendStatus("passwords","loading");let s=await a.A.listPasswords("model+tags"),r=[];this._sendStatus("passwords","processing",Object.keys(s).length);for(let a in s){if(!s.hasOwnProperty(a))continue;let n=s[a];r.push(this._encryptPassword(n,t,e))}0!==r.length&&await Promise.all(r),this._sendStatus("passwords","done")}async _encryptPassword(t,e,s,r,n){t.folder=e[t.folder];let i=[];for(let e in t.tags)t.tags.hasOwnProperty(e)&&i.push(s[e]);if(t.tags=i,t.shared||null!==t.share)try{await a.A.updatePassword(t),d.A.success(`Updated password ${t.id}`),this._sendStatus("passwords")}catch(t){throw this._sendStatus("passwords","error",t),t}else{await this._deleteObject(t.id,"password"),t.cseType="CSEv1r1";try{await a.A.createPassword(t),d.A.success(`Encrypted password ${t.id}`),this._sendStatus("passwords")}catch(t){throw this._sendStatus("passwords","error",t),t}}}async _encryptTags(t){this._sendStatus("tags","loading");let e=await a.A.listTags(),s=[];this._sendStatus("tags","processing",Object.keys(e).length);for(let a in e)e.hasOwnProperty(a)&&(s.push(this._encryptTag(e[a],t)),s.length>10&&(await Promise.all(s),s=[]));return 0!==s.length&&await Promise.all(s),this._sendStatus("tags","done"),t}async _encryptTag(t,e){try{t.cseType="CSEv1r1";let s=await a.A.createTag(t);e[t.id]=s.id,this._sendStatus("tags"),d.A.success(`Encrypted tag ${t.id}`)}catch(t){throw this._sendStatus("tags","error",t),t}}async _encryptFolders(t){this._sendStatus("folders","loading");let e=await a.A.listFolders(),s=[];t["00000000-0000-0000-0000-000000000000"]="00000000-0000-0000-0000-000000000000",e=this._sortFoldersForUpgrade(e),this._sendStatus("folders","processing",Object.keys(e).length);for(let a of e)"00000000-0000-0000-0000-000000000000"!==a.id&&((!t.hasOwnProperty(a.parent)||s.length>10)&&(await Promise.all(s),s=[]),s.push(this._encryptFolder(a,t)));return await Promise.all(s),this._sendStatus("folders","done"),t}async _encryptFolder(t,e){try{t.parent=e[t.parent],t.cseType="CSEv1r1";let s=await a.A.createFolder(t);e[t.id]=s.id,this._sendStatus("folders"),d.A.success(`Encrypted folder ${t.id}`)}catch(t){throw this._sendStatus("folders","error",t),t}}_sortFoldersForUpgrade(t){let e=[],s=["00000000-0000-0000-0000-000000000000"];for(t=o.A.objectToArray(t);0!==t.length;)for(let a=0;a<t.length;a++){let r=t[a];-1!==s.indexOf(r.parent)&&(s.push(r.id),e.push(r),t.splice(a,1),a--)}return e}async _cleanDatabase(t,e){let s=Object.keys(t).length+Object.keys(e).length;this._sendStatus("cleanup","processing",s),n.A.ignoreApiErrors=!0,await Promise.all([this._deleteObjects(t,"tag"),this._deleteObjects(e,"folder")]),n.A.ignoreApiErrors=!1,this._sendStatus("cleanup","done")}async _deleteObjects(t,e){let s=[];for(let a in t)t.hasOwnProperty(a)&&"00000000-0000-0000-0000-000000000000"!==a&&(s.push(this._deleteObject(a,e)),s.length>10&&(await Promise.all(s),s=[]));0!==s.length&&await Promise.all(s)}async _deleteObject(t,e){let s="delete"+e.capitalize();try{await a.A[s](t),await a.A[s](t)}catch(t){t.hasOwnProperty("id")&&404===t.id||this._sendStatus("cleanup","error",t)}"password"!==e&&this._sendStatus("cleanup","processing")}async _saveMasterPassword(t){this._sendStatus("password","processing",1);let e=(0,h.C)("passwords","api-user",null),s=c.A.translate("Passwords App Encryption Passphrase"),r=c.A.translate("This is a copy of the passphrase you chose for encryption. Changing or deleting this entry does not affect the encryption. The passphrase can only be changed in the settings. More information can be found in the handbook."),n=location.href;try{await a.A.createPassword({username:e,password:t,label:s,url:n,notes:r}),this._sendStatus("password","done")}catch(t){this._sendStatus("password","error",t)}}_resetStatus(t){this._statusFunc=t,this.status={passwords:{status:"waiting",total:0,current:0,errors:[]},keychain:{status:"waiting",total:0,current:0,errors:[]},folders:{status:"waiting",total:0,current:0,errors:[]},cleanup:{status:"waiting",total:0,current:0,errors:[]},tags:{status:"waiting",total:0,current:0,errors:[]},save:{status:"waiting",total:0,current:0,errors:[]}}}_sendStatus(t,e="processing",s=null){if(null===this._statusFunc||!this.status.hasOwnProperty(t))return;let a=this.status[t];"processing"===e?(a.status="processing",null!==s?(a.total=s,a.current=0):a.current++):"loading"===e?a.status="loading":"done"===e?(a.status=0===a.errors.length?"success":"failed","success"===a.status&&(a.current=a.total)):"error"===e&&(d.A.error(s),a.errors.push(s),"cleanup"!==t&&(a.status="failed")),this._statusFunc(this.status)}async _updateWebAuthn(t){if(u.A.get("client.encryption.webauthn.enabled"))try{await g.A.run(t)}catch(t){d.A.error(t)}}}},21777:(t,e,s)=>{"use strict";s.d(e,{HW:()=>u,do:()=>i,zo:()=>o});var a=s(61338);let r;const n=[];function i(){if(void 0===r){const t=document?.getElementsByTagName("head")[0];r=t?t.getAttribute("data-requesttoken"):null}return r}function o(t){n.push(t)}let l;(0,a.B1)("csrf-token-update",(t=>{r=t.token,n.forEach((t=>{try{t(r)}catch(t){console.error("error updating CSRF token observer",t)}}))}));const d=(t,e)=>t?t.getAttribute(e):null;function u(){if(void 0!==l)return l;const t=document?.getElementsByTagName("head")[0];if(!t)return null;const e=d(t,"data-user");return null===e?(l=null,l):(l={uid:e,displayName:d(t,"data-user-displayname"),isAdmin:!!window._oc_isadmin},l)}}}]);