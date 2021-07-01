(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{74:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return i})),n.d(t,"metadata",(function(){return c})),n.d(t,"toc",(function(){return s})),n.d(t,"default",(function(){return u}));var r=n(3),o=n(7),a=(n(0),n(88)),i={id:"external-idp-tokens",title:"Intercept External IdP Tokens",sidebar_label:"External IdP Tokens",slug:"/intercept-external-idp-tokens",description:"Intercept external IdP tokens during okta inbound federation / social authentication",keywords:["Okta CIAM","External IdP Tokens","External IdP refresh tokens","Social authentication","Okta external IdP","Okta inbound federation"]},c={unversionedId:"tokens/external-idp-tokens",id:"tokens/external-idp-tokens",isDocsHomePage:!1,title:"Intercept External IdP Tokens",description:"Intercept external IdP tokens during okta inbound federation / social authentication",source:"@site/docs/tokens/external-idp-tokens.md",slug:"/intercept-external-idp-tokens",permalink:"/docs/intercept-external-idp-tokens",editUrl:"https://github.com/facebook/docusaurus/edit/master/website/docs/tokens/external-idp-tokens.md",version:"current",sidebar_label:"External IdP Tokens",sidebar:"docs",previous:{title:"Get Current MAUs (Monthly Active Users)",permalink:"/docs/get-current-monthly-active-users"},next:{title:"Get Current MAUs (Monthly Active Users)",permalink:"/docs/get-current-monthly-active-users"}},s=[{value:"Problem",id:"problem",children:[]},{value:"Solution",id:"solution",children:[]},{value:"Discussion",id:"discussion",children:[]}],l={toc:s};function u(e){var t=e.components,n=Object(o.a)(e,["components"]);return Object(a.b)("wrapper",Object(r.a)({},l,n,{components:t,mdxType:"MDXLayout"}),Object(a.b)("blockquote",null,Object(a.b)("p",{parentName:"blockquote"},Object(a.b)("strong",{parentName:"p"},"Disclaimer"),"\nPlease note, this is ",Object(a.b)("strong",{parentName:"p"},"NOT")," officially supported by Okta and only serves as a high-level guidance for a creating a workaround. At any time, this workaround can change or stop functioning.")),Object(a.b)("h2",{id:"problem"},"Problem"),Object(a.b)("blockquote",null,Object(a.b)("p",{parentName:"blockquote"},Object(a.b)("strong",{parentName:"p"},"Note:")," If an access token is sufficient enough, you may use this ",Object(a.b)("a",{parentName:"p",href:"https://developer.okta.com/docs/reference/api/idps/#social-authentication-token-operation"},"API"),"s")),Object(a.b)("p",null,"In unique circumstances (B2B), an application may need to intercept the ",Object(a.b)("inlineCode",{parentName:"p"},"ID Token")," or ",Object(a.b)("inlineCode",{parentName:"p"},"Refresh Token")," from the external or social authenticated IdP."),Object(a.b)("p",null,"Typical scenarios include:"),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},"Proof of access against the parent identity provider where re-authentication is not sufficient enough"),Object(a.b)("li",{parentName:"ul"},"Utilizing the ID token for custom inline hooks logic"),Object(a.b)("li",{parentName:"ul"},"Uncertain security practices around external refresh tokens (lack of rotations or indefinite lifetimes)")),Object(a.b)("p",null,"Alternatively, a trusted application can perform multiple oauth flows with differently scoped integrations within the client-side."),Object(a.b)("h2",{id:"solution"},"Solution"),Object(a.b)("p",null,"This requires a proxy in-between the ",Object(a.b)("inlineCode",{parentName:"p"},"token")," endpoint to intercept the tokens."),Object(a.b)("p",null,Object(a.b)("img",{parentName:"p",src:"https://user-images.githubusercontent.com/6020066/123849790-3600d000-d8e7-11eb-9023-44a17aba60ff.png",alt:"Dashboard Location"})),Object(a.b)("p",null,"This proxy will serve as a token interceptor where Okta will send the authorization code in exchange for a token. Within the transaction, the proxy will relay the request to the actual external IdP token endpoint and store the tokens while sending them back to Okta. Afterwards, internal services can utilize the data store for additional token operations. Refer to ",Object(a.b)("em",{parentName:"p"},"figure 1")," below for a high-level diagram."),Object(a.b)("p",null,Object(a.b)("strong",{parentName:"p"},"Figure 1: High-Level Diagram"),"\n",Object(a.b)("img",{parentName:"p",src:"https://user-images.githubusercontent.com/6020066/123849258-96434200-d8e6-11eb-9134-fd0ffd8ad62c.jpeg",alt:"External IdP Tokens Diagram"})),Object(a.b)("h2",{id:"discussion"},"Discussion"),Object(a.b)("p",null,"In practice, it you'll come across some nuances to properly relay and hand-off the tokens. Feel free to add some issues you may come across onto this document."))}u.isMDXComponent=!0},88:function(e,t,n){"use strict";n.d(t,"a",(function(){return p})),n.d(t,"b",(function(){return f}));var r=n(0),o=n.n(r);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var l=o.a.createContext({}),u=function(e){var t=o.a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},p=function(e){var t=u(e.components);return o.a.createElement(l.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return o.a.createElement(o.a.Fragment,{},t)}},b=o.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,i=e.parentName,l=s(e,["components","mdxType","originalType","parentName"]),p=u(n),b=r,f=p["".concat(i,".").concat(b)]||p[b]||d[b]||a;return n?o.a.createElement(f,c(c({ref:t},l),{},{components:n})):o.a.createElement(f,c({ref:t},l))}));function f(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,i=new Array(a);i[0]=b;var c={};for(var s in t)hasOwnProperty.call(t,s)&&(c[s]=t[s]);c.originalType=e,c.mdxType="string"==typeof e?e:r,i[1]=c;for(var l=2;l<a;l++)i[l]=n[l];return o.a.createElement.apply(null,i)}return o.a.createElement.apply(null,n)}b.displayName="MDXCreateElement"}}]);