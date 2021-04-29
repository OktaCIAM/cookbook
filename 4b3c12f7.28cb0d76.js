(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{76:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return a})),n.d(t,"metadata",(function(){return s})),n.d(t,"toc",(function(){return c})),n.d(t,"default",(function(){return u}));var r=n(3),o=n(7),i=(n(0),n(88)),a={id:"get-current-monthly-active-users",title:"Get Current MAUs (Monthly Active Users)",sidebar_label:"Get Current MAUs",slug:"/get-current-monthly-active-users",description:"This recipe is a simple and effective to determine the existing MAU (monthly active user) consumption for the month.",keywords:["Okta CIAM","Okta CIAM MAUs","Okta System Log API","Okta Get Monthly Active Users"]},s={unversionedId:"reporting/get-current-monthly-active-users",id:"reporting/get-current-monthly-active-users",isDocsHomePage:!1,title:"Get Current MAUs (Monthly Active Users)",description:"This recipe is a simple and effective to determine the existing MAU (monthly active user) consumption for the month.",source:"@site/docs/reporting/get-monthly-active-users.md",slug:"/get-current-monthly-active-users",permalink:"/docs/get-current-monthly-active-users",editUrl:"https://github.com/facebook/docusaurus/edit/master/website/docs/reporting/get-monthly-active-users.md",version:"current",sidebar_label:"Get Current MAUs",sidebar:"docs",previous:{title:"Redirect to Application Post Account Operations (Unlock, Activation, Forgot Password)",permalink:"/docs/redirect-post-account-operations"}},c=[{value:"Problem",id:"problem",children:[]},{value:"Solution",id:"solution",children:[{value:"Node.js v10.0.0 or higher",id:"nodejs-v1000-or-higher",children:[]},{value:"Python 3.6.0 or higher",id:"python-360-or-higher",children:[]}]},{value:"Discussion",id:"discussion",children:[]},{value:"Credits",id:"credits",children:[]}],l={toc:c};function u(e){var t=e.components,n=Object(o.a)(e,["components"]);return Object(i.b)("wrapper",Object(r.a)({},l,n,{components:t,mdxType:"MDXLayout"}),Object(i.b)("h2",{id:"problem"},"Problem"),Object(i.b)("p",null,"The system log API can be utilized to create virtually any report, however, it can be complicated to get started. A common problem is determining your existing MAUs (monthly active users)."),Object(i.b)("blockquote",null,Object(i.b)("p",{parentName:"blockquote"},"Note: on a One App or Enterprise plan, you can get this report from your Okta contact")),Object(i.b)("h2",{id:"solution"},"Solution"),Object(i.b)("p",null,"To get the current month active users, make a request to the ",Object(i.b)("inlineCode",{parentName:"p"},"system log")," API with a filter (",Object(i.b)("inlineCode",{parentName:"p"},'eventType eq "user.session.start"'),") to only display events of when users have successfully created a session. In addition, set the parameters ",Object(i.b)("inlineCode",{parentName:"p"},"since")," and ",Object(i.b)("inlineCode",{parentName:"p"},"until")," to the first and end of the month in the UTC timezone."),Object(i.b)("p",null,"Afterwards, track which users have logged in for the month and calculate the total."),Object(i.b)("p",null,"The solution can be seen in the reference scripts listed below."),Object(i.b)("h3",{id:"nodejs-v1000-or-higher"},"Node.js v10.0.0 or higher"),Object(i.b)("p",null,"Make sure to install the ",Object(i.b)("inlineCode",{parentName:"p"},"@okta/okta-sdk-nodejs")," package: ",Object(i.b)("inlineCode",{parentName:"p"},"npm install @okta/okta-sdk-nodejs")),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-javascript"},"const okta = require('@okta/okta-sdk-nodejs');\n\n// Configure this\nconst API_KEY = 'YOUR_API_TOKEN';\nconst OKTA_ORG_URL = 'https://your-okta-domain.okta.com';\n\nconst date = new Date();\n// Configure the dates to be set to first and end of month in UTC\nconst since = new Date(Date.UTC(date.getFullYear(), date.getMonth(), 1, 0, 0, 0, 0)).toISOString();\nconst until = new Date(Date.UTC(date.getFullYear(), date.getMonth() + 1, 0, 0, 0, 0, 0)).toISOString();\n\n// Retry Mechanism\nconst defaultRequestExecutor = new okta.DefaultRequestExecutor({\n    maxRetries: 10,\n    requestTimeout: 0\n});\n\nconst client = new okta.Client({\n    orgUrl: OKTA_ORG_URL,\n    token: API_KEY,\n    requestExecutor: defaultRequestExecutor\n});\n\nconst activeUsers = [];\n\nclient.getLogs({\n  filter: 'eventType eq \"user.session.start\"',\n  since,\n  until\n}).each(log => {\n    const user = log.actor.id;\n    if (activeUsers.indexOf(user) < 0) {\n        activeUsers.push(user)\n    }\n}).then(() => {\n    console.log(`Monthly Active Users: ${activeUsers.length}`);\n})\n.catch(console.error);\n")),Object(i.b)("h4",{id:"try-it-yourself"},"Try it Yourself"),Object(i.b)("p",null,"You can run the sample script below to test the code for your own instances, simply update the secrets ",Object(i.b)("inlineCode",{parentName:"p"},"API_TOKEN")," and ",Object(i.b)("inlineCode",{parentName:"p"},"ORG_URL")," with your values."),Object(i.b)("iframe",{height:"400px",width:"100%",src:"https://replit.com/@brh55/get-mau-nodejs?lite=true",scrolling:"no",frameborder:"no",allowtransparency:"true",allowfullscreen:"true",sandbox:"allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"}),Object(i.b)("h3",{id:"python-360-or-higher"},"Python 3.6.0 or higher"),Object(i.b)("p",null,"Install the Okta SDK: ",Object(i.b)("inlineCode",{parentName:"p"},"pip install okta")),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-python"},"from okta.client import Client as OktaClient\nfrom datetime import datetime\nimport asyncio\n\nconfig = {\n    'orgUrl': 'https://your-okta-domain.okta.com',\n    'token': 'YOUR_API_TOKEN',\n}\nokta_client = OktaClient(config)\n\nasync def main():\n    active_users = []\n    today = datetime.now()\n    since = today.replace(day=1, hour=0, minute=0, second=0, microsecond=0)\n    until = today.replace(month=today.month+1, day=1, hour=0, minute=0, second=0, microsecond=0)\n\n    logs, resp, err = await okta_client.get_logs({\n        'filter': 'eventType eq \"user.session.start\"',\n        'since': since.strftime('%Y-%m-%dT%H:%M:%SZ'),\n        'until': until.strftime('%Y-%m-%dT%H:%M:%SZ'),\n    })\n\n    while True:\n        for log in logs:\n           # Add more properties here.\n           user_id = log.actor.id;\n           if user_id not in active_users:\n             active_users.append(user_id)\n        if resp.has_next():\n            users, err = await resp.next()\n        else:\n            print('Monthly Active Users: {}'.format(len(active_users)))\n            break\n\nloop = asyncio.get_event_loop()\nloop.run_until_complete(main())\n")),Object(i.b)("h4",{id:"try-it-yourself-1"},"Try it Yourself"),Object(i.b)("p",null,"You can run the sample script below to test the code for your own instances, simply update the secrets ",Object(i.b)("inlineCode",{parentName:"p"},"API_TOKEN")," and ",Object(i.b)("inlineCode",{parentName:"p"},"ORG_URL")," with your values."),Object(i.b)("iframe",{height:"400px",width:"100%",src:"https://replit.com/@brh55/OKTA-MAU-SAMPLE?lite=true",scrolling:"no",frameborder:"no",allowtransparency:"true",allowfullscreen:"true",sandbox:"allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"}),Object(i.b)("h2",{id:"discussion"},"Discussion"),Object(i.b)("p",null,"It's possible to recreate these solution using the native HTTP module, but the recipes provided utilize the Okta SDKs to simplify the nuances of handling rate-limits and pagination with the API."),Object(i.b)("p",null,"In addition, these solutions can be extend to derive other meaningful things such as the most active user, least active user, etc."),Object(i.b)("h2",{id:"credits"},"Credits"),Object(i.b)("p",null,"Credits to ",Object(i.b)("a",{parentName:"p",href:"https://www.linkedin.com/in/jayanthv/"},"Jay Venkatraj")," for proposing this problem to the CIAM community and ",Object(i.b)("a",{parentName:"p",href:"https://github.com/brh55"},"Brandon Him")," for the initial recipe."),Object(i.b)("p",null,"Feel free to contribute support for other languages by ",Object(i.b)("a",{parentName:"p",href:"https://github.com/OktaCIAM/cookbook/pulls"},"submitting a PR"),"."))}u.isMDXComponent=!0},88:function(e,t,n){"use strict";n.d(t,"a",(function(){return p})),n.d(t,"b",(function(){return m}));var r=n(0),o=n.n(r);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var l=o.a.createContext({}),u=function(e){var t=o.a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},p=function(e){var t=u(e.components);return o.a.createElement(l.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return o.a.createElement(o.a.Fragment,{},t)}},h=o.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,a=e.parentName,l=c(e,["components","mdxType","originalType","parentName"]),p=u(n),h=r,m=p["".concat(a,".").concat(h)]||p[h]||d[h]||i;return n?o.a.createElement(m,s(s({ref:t},l),{},{components:n})):o.a.createElement(m,s({ref:t},l))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,a=new Array(i);a[0]=h;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s.mdxType="string"==typeof e?e:r,a[1]=s;for(var l=2;l<i;l++)a[l]=n[l];return o.a.createElement.apply(null,a)}return o.a.createElement.apply(null,n)}h.displayName="MDXCreateElement"}}]);