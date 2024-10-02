(self.webpackChunk_nextcloud_text=self.webpackChunk_nextcloud_text||[]).push([["highlight/swift-js-js","highlight/swift"],{77690:e=>{function n(e){return e?"string"==typeof e?e:e.source:null}function t(e){return a("(?=",e,")")}function a(...e){return e.map((e=>n(e))).join("")}function i(...e){const t=function(e){const n=e[e.length-1];return"object"==typeof n&&n.constructor===Object?(e.splice(e.length-1,1),n):{}}(e);return"("+(t.capture?"":"?:")+e.map((e=>n(e))).join("|")+")"}const s=e=>a(/\b/,e,/\w$/.test(e)?/\b/:/\B/),c=["Protocol","Type"].map(s),o=["init","self"].map(s),u=["Any","Self"],r=["actor","any","associatedtype","async","await",/as\?/,/as!/,"as","borrowing","break","case","catch","class","consume","consuming","continue","convenience","copy","default","defer","deinit","didSet","distributed","do","dynamic","each","else","enum","extension","fallthrough",/fileprivate\(set\)/,"fileprivate","final","for","func","get","guard","if","import","indirect","infix",/init\?/,/init!/,"inout",/internal\(set\)/,"internal","in","is","isolated","nonisolated","lazy","let","macro","mutating","nonmutating",/open\(set\)/,"open","operator","optional","override","package","postfix","precedencegroup","prefix",/private\(set\)/,"private","protocol",/public\(set\)/,"public","repeat","required","rethrows","return","set","some","static","struct","subscript","super","switch","throws","throw",/try\?/,/try!/,"try","typealias",/unowned\(safe\)/,/unowned\(unsafe\)/,"unowned","var","weak","where","while","willSet"],l=["false","nil","true"],p=["assignment","associativity","higherThan","left","lowerThan","none","right"],d=["#colorLiteral","#column","#dsohandle","#else","#elseif","#endif","#error","#file","#fileID","#fileLiteral","#filePath","#function","#if","#imageLiteral","#keyPath","#line","#selector","#sourceLocation","#warning"],m=["abs","all","any","assert","assertionFailure","debugPrint","dump","fatalError","getVaList","isKnownUniquelyReferenced","max","min","numericCast","pointwiseMax","pointwiseMin","precondition","preconditionFailure","print","readLine","repeatElement","sequence","stride","swap","swift_unboxFromSwiftValueWithType","transcode","type","unsafeBitCast","unsafeDowncast","withExtendedLifetime","withUnsafeMutablePointer","withUnsafePointer","withVaList","withoutActuallyEscaping","zip"],h=i(/[/=\-+!*%<>&|^~?]/,/[\u00A1-\u00A7]/,/[\u00A9\u00AB]/,/[\u00AC\u00AE]/,/[\u00B0\u00B1]/,/[\u00B6\u00BB\u00BF\u00D7\u00F7]/,/[\u2016-\u2017]/,/[\u2020-\u2027]/,/[\u2030-\u203E]/,/[\u2041-\u2053]/,/[\u2055-\u205E]/,/[\u2190-\u23FF]/,/[\u2500-\u2775]/,/[\u2794-\u2BFF]/,/[\u2E00-\u2E7F]/,/[\u3001-\u3003]/,/[\u3008-\u3020]/,/[\u3030]/),F=i(h,/[\u0300-\u036F]/,/[\u1DC0-\u1DFF]/,/[\u20D0-\u20FF]/,/[\uFE00-\uFE0F]/,/[\uFE20-\uFE2F]/),b=a(h,F,"*"),f=i(/[a-zA-Z_]/,/[\u00A8\u00AA\u00AD\u00AF\u00B2-\u00B5\u00B7-\u00BA]/,/[\u00BC-\u00BE\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u00FF]/,/[\u0100-\u02FF\u0370-\u167F\u1681-\u180D\u180F-\u1DBF]/,/[\u1E00-\u1FFF]/,/[\u200B-\u200D\u202A-\u202E\u203F-\u2040\u2054\u2060-\u206F]/,/[\u2070-\u20CF\u2100-\u218F\u2460-\u24FF\u2776-\u2793]/,/[\u2C00-\u2DFF\u2E80-\u2FFF]/,/[\u3004-\u3007\u3021-\u302F\u3031-\u303F\u3040-\uD7FF]/,/[\uF900-\uFD3D\uFD40-\uFDCF\uFDF0-\uFE1F\uFE30-\uFE44]/,/[\uFE47-\uFEFE\uFF00-\uFFFD]/),w=i(f,/\d/,/[\u0300-\u036F\u1DC0-\u1DFF\u20D0-\u20FF\uFE20-\uFE2F]/),g=a(f,w,"*"),y=a(/[A-Z]/,w,"*"),E=["attached","autoclosure",a(/convention\(/,i("swift","block","c"),/\)/),"discardableResult","dynamicCallable","dynamicMemberLookup","escaping","freestanding","frozen","GKInspectable","IBAction","IBDesignable","IBInspectable","IBOutlet","IBSegueAction","inlinable","main","nonobjc","NSApplicationMain","NSCopying","NSManaged",a(/objc\(/,g,/\)/),"objc","objcMembers","propertyWrapper","requires_stored_property_inits","resultBuilder","Sendable","testable","UIApplicationMain","unchecked","unknown","usableFromInline","warn_unqualified_access"],v=["iOS","iOSApplicationExtension","macOS","macOSApplicationExtension","macCatalyst","macCatalystApplicationExtension","watchOS","watchOSApplicationExtension","tvOS","tvOSApplicationExtension","swift"];e.exports=function(e){const n={match:/\s+/,relevance:0},h=e.COMMENT("/\\*","\\*/",{contains:["self"]}),f=[e.C_LINE_COMMENT_MODE,h],A={match:[/\./,i(...c,...o)],className:{2:"keyword"}},k={match:a(/\./,i(...r)),relevance:0},C=r.filter((e=>"string"==typeof e)).concat(["_|0"]),N={variants:[{className:"keyword",match:i(...r.filter((e=>"string"!=typeof e)).concat(u).map(s),...o)}]},S={$pattern:i(/\b\w+/,/#\w+/),keyword:C.concat(d),literal:l},B=[A,k,N],D=[{match:a(/\./,i(...m)),relevance:0},{className:"built_in",match:a(/\b/,i(...m),/(?=\()/)}],_={match:/->/,relevance:0},x=[_,{className:"operator",relevance:0,variants:[{match:b},{match:`\\.(\\.|${F})+`}]}],M="([0-9]_*)+",$="([0-9a-fA-F]_*)+",L={className:"number",relevance:0,variants:[{match:`\\b(${M})(\\.(${M}))?([eE][+-]?(${M}))?\\b`},{match:`\\b0x(${$})(\\.(${$}))?([pP][+-]?(${M}))?\\b`},{match:/\b0o([0-7]_*)+\b/},{match:/\b0b([01]_*)+\b/}]},j=(e="")=>({className:"subst",variants:[{match:a(/\\/,e,/[0\\tnr"']/)},{match:a(/\\/,e,/u\{[0-9a-fA-F]{1,8}\}/)}]}),I=(e="")=>({className:"subst",match:a(/\\/,e,/[\t ]*(?:[\r\n]|\r\n)/)}),O=(e="")=>({className:"subst",label:"interpol",begin:a(/\\/,e,/\(/),end:/\)/}),P=(e="")=>({begin:a(e,/"""/),end:a(/"""/,e),contains:[j(e),I(e),O(e)]}),K=(e="")=>({begin:a(e,/"/),end:a(/"/,e),contains:[j(e),O(e)]}),T={className:"string",variants:[P(),P("#"),P("##"),P("###"),K(),K("#"),K("##"),K("###")]},U=[e.BACKSLASH_ESCAPE,{begin:/\[/,end:/\]/,relevance:0,contains:[e.BACKSLASH_ESCAPE]}],q={begin:/\/[^\s](?=[^/\n]*\/)/,end:/\//,contains:U},z=e=>{const n=a(e,/\//),t=a(/\//,e);return{begin:n,end:t,contains:[...U,{scope:"comment",begin:`#(?!.*${t})`,end:/$/}]}},V={scope:"regexp",variants:[z("###"),z("##"),z("#"),q]},W={match:a(/`/,g,/`/)},Z=[W,{className:"variable",match:/\$\d+/},{className:"variable",match:`\\$${w}+`}],G=[{match:/(@|#(un)?)available/,scope:"keyword",starts:{contains:[{begin:/\(/,end:/\)/,keywords:v,contains:[...x,L,T]}]}},{scope:"keyword",match:a(/@/,i(...E),t(i(/\(/,/\s+/)))},{scope:"meta",match:a(/@/,g)}],H={match:t(/\b[A-Z]/),relevance:0,contains:[{className:"type",match:a(/(AV|CA|CF|CG|CI|CL|CM|CN|CT|MK|MP|MTK|MTL|NS|SCN|SK|UI|WK|XC)/,w,"+")},{className:"type",match:y,relevance:0},{match:/[?!]+/,relevance:0},{match:/\.\.\./,relevance:0},{match:a(/\s+&\s+/,t(y)),relevance:0}]},R={begin:/</,end:/>/,keywords:S,contains:[...f,...B,...G,_,H]};H.contains.push(R);const X={begin:/\(/,end:/\)/,relevance:0,keywords:S,contains:["self",{match:a(g,/\s*:/),keywords:"_|0",relevance:0},...f,V,...B,...D,...x,L,T,...Z,...G,H]},J={begin:/</,end:/>/,keywords:"repeat each",contains:[...f,H]},Q={begin:/\(/,end:/\)/,keywords:S,contains:[{begin:i(t(a(g,/\s*:/)),t(a(g,/\s+/,g,/\s*:/))),end:/:/,relevance:0,contains:[{className:"keyword",match:/\b_\b/},{className:"params",match:g}]},...f,...B,...x,L,T,...G,H,X],endsParent:!0,illegal:/["']/},Y={match:[/(func|macro)/,/\s+/,i(W.match,g,b)],className:{1:"keyword",3:"title.function"},contains:[J,Q,n],illegal:[/\[/,/%/]},ee={match:[/\b(?:subscript|init[?!]?)/,/\s*(?=[<(])/],className:{1:"keyword"},contains:[J,Q,n],illegal:/\[|%/},ne={match:[/operator/,/\s+/,b],className:{1:"keyword",3:"title"}},te={begin:[/precedencegroup/,/\s+/,y],className:{1:"keyword",3:"title"},contains:[H],keywords:[...p,...l],end:/}/},ae={begin:[/(struct|protocol|class|extension|enum|actor)/,/\s+/,g,/\s*/],beginScope:{1:"keyword",3:"title.class"},keywords:S,contains:[J,...B,{begin:/:/,end:/\{/,keywords:S,contains:[{scope:"title.class.inherited",match:y},...B],relevance:0}]};for(const e of T.variants){const n=e.contains.find((e=>"interpol"===e.label));n.keywords=S;const t=[...B,...D,...x,L,T,...Z];n.contains=[...t,{begin:/\(/,end:/\)/,contains:["self",...t]}]}return{name:"Swift",keywords:S,contains:[...f,Y,ee,ae,ne,te,{beginKeywords:"import",end:/$/,contains:[...f],relevance:0},V,...B,...D,...x,L,T,...Z,...G,H,X]}}},82974:(e,n,t)=>{!function e(){e.warned||(e.warned=!0,console.log('Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/swift" instead of "highlight.js/lib/languages/swift.js"'))}(),e.exports=t(77690)}}]);
//# sourceMappingURL=swift-js-js.js.map?v=a914667515dc035ac26b