"use strict";(self.webpackChunk_nextcloud_text=self.webpackChunk_nextcloud_text||[]).push([["files-modal","data_image_svg_xml_3c_21--_20-_20SPDX-FileCopyrightText_202020_20Google_20Inc_20-_20SPDX-Lice-cc29b1"],{21698:(e,t,n)=>{n.r(t),n.d(t,{default:()=>o});const i={name:"PublicFilesEditor",components:{NcModal:n(10834).Jc,Editor:()=>Promise.all([n.e("mermaid"),n.e("vendors-node_modules_nextcloud_vue_dist_index_mjs"),n.e("vendors-node_modules_braintree_sanitize-url_dist_index_js-node_modules_quartzy_markdown-it-me-60d959"),n.e("vendors-node_modules_nextcloud_dialogs_dist_chunks__plugin-vue2_normalizer-Ds4SJl6Q_mjs-node_-0c1d7b"),n.e("vendors-node_modules_nextcloud_logger_dist_index_js"),n.e("vendors-node_modules_path-normalize_lib_index_js-node_modules_proxy-polyfill_src_index_js-nod-8db19f"),n.e("src_extensions_index_js-src_components_Editor_EditorOutline_vue-data_image_svg_xml_3c_21--_20-ee52b2"),n.e("editor")]).then(n.bind(n,87294))},props:{fileId:{type:Number,default:null},relativePath:{type:String,default:null},active:{type:Boolean,default:!1},shareToken:{type:String,default:null},mimeType:{type:String,default:null}},computed:{fileName(){return this.relativePath.substring(this.relativePath.lastIndexOf("/")+1)}},methods:{close(){this.$emit("close")}}};const o=(0,n(51900).Z)(i,(function(){var e=this,t=e._self._c;return e.active?t("NcModal",{attrs:{name:e.fileName},on:{close:e.close}},[t("Editor",{attrs:{"file-id":e.fileId,"relative-path":e.relativePath,active:e.active,"share-token":e.shareToken,mime:e.mimeType}})],1):e._e()}),[],!1,null,null,null).exports},51900:(e,t,n)=>{function i(e,t,n,i,o,s,l,r){var a,d="function"==typeof e?e.options:e;if(t&&(d.render=t,d.staticRenderFns=n,d._compiled=!0),i&&(d.functional=!0),s&&(d._scopeId="data-v-"+s),l?(a=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),o&&o.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(l)},d._ssrRegister=a):o&&(a=r?function(){o.call(this,(d.functional?this.parent:this).$root.$options.shadowRoot)}:o),a)if(d.functional){d._injectStyles=a;var c=d.render;d.render=function(e,t){return a.call(t),c(e,t)}}else{var _=d.beforeCreate;d.beforeCreate=_?[].concat(_,a):[a]}return{exports:e,options:d}}n.d(t,{Z:()=>i})},17704:e=>{e.exports="data:image/svg+xml,%3c%21--%20-%20SPDX-FileCopyrightText:%202020%20Google%20Inc.%20-%20SPDX-License-Identifier:%20Apache-2.0%20--%3e%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20width=%2724%27%20height=%2724%27%20fill=%27%23222%27%3e%3cpath%20d=%27M15.4%2016.6L10.8%2012l4.6-4.6L14%206l-6%206%206%206%201.4-1.4z%27/%3e%3c/svg%3e"},21568:e=>{e.exports="data:image/svg+xml,%3c%21--%20-%20SPDX-FileCopyrightText:%202020%20Google%20Inc.%20-%20SPDX-License-Identifier:%20Apache-2.0%20--%3e%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20width=%2724%27%20height=%2724%27%20fill=%27%23222%27%3e%3cpath%20d=%27M18.4%207.4L17%206l-6%206%206%206%201.4-1.4-4.6-4.6%204.6-4.6m-6%200L11%206l-6%206%206%206%201.4-1.4L7.8%2012l4.6-4.6z%27/%3e%3c/svg%3e"},43413:e=>{e.exports="data:image/svg+xml,%3c%21--%20-%20SPDX-FileCopyrightText:%202020%20Google%20Inc.%20-%20SPDX-License-Identifier:%20Apache-2.0%20--%3e%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20width=%2724%27%20height=%2724%27%20fill=%27%23222%27%3e%3cpath%20d=%27M5.6%207.4L7%206l6%206-6%206-1.4-1.4%204.6-4.6-4.6-4.6m6%200L13%206l6%206-6%206-1.4-1.4%204.6-4.6-4.6-4.6z%27/%3e%3c/svg%3e"},79193:e=>{e.exports="data:image/svg+xml,%3c%21--%20-%20SPDX-FileCopyrightText:%202020%20Google%20Inc.%20-%20SPDX-License-Identifier:%20Apache-2.0%20--%3e%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20width=%2724%27%20height=%2724%27%20fill=%27%23222%27%3e%3cpath%20d=%27M8.6%2016.6l4.6-4.6-4.6-4.6L10%206l6%206-6%206-1.4-1.4z%27/%3e%3c/svg%3e"},67594:(e,t,n)=>{n.d(t,{a:()=>d,e:()=>a,g:()=>c,s:()=>_});var i=n(62556),o=n(59673),s=n(32859);const l=(0,i.Kc)("nextcloud-vue").persist(!0).build();let r;function a(e,t=10){r||(r=new o.EmojiIndex(s));const n=c();let i;return e?(i=r.search(":".concat(e),t),i.length<t&&(i=i.concat(r.search(e,t-i.length)))):i=o.frequently.get(t).map((e=>r.emoji(e)))||[],i.map((e=>e.getSkin(n)))}function d(e){o.frequently.add(e)}function c(){var e;const t=Number.parseInt(null!=(e=l.getItem("NcEmojiPicker::currentSkinTone"))?e:"1");return Math.min(Math.max(t,1),6)}function _(e){e=Math.min(Math.max(e,1),6),l.setItem("NcEmojiPicker::currentSkinTone",e.toString())}}}]);
//# sourceMappingURL=files-modal.js.map?v=785a8ded57e9fbc56a5f