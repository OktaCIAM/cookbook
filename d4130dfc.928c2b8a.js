(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{80:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return o})),n.d(t,"metadata",(function(){return c})),n.d(t,"toc",(function(){return s})),n.d(t,"default",(function(){return b}));var a=n(3),r=n(7),i=(n(0),n(88)),o={id:"recaptcha-v3",title:"reCAPTCHA v3",sidebar_label:"reCAPTCHA v3",slug:"/repcaptcha-v3"},c={unversionedId:"sign-in/recaptcha-v3",id:"sign-in/recaptcha-v3",isDocsHomePage:!1,title:"reCAPTCHA v3",description:"Problem",source:"@site/docs/sign-in/recaptcha-v3.md",slug:"/repcaptcha-v3",permalink:"/docs/repcaptcha-v3",editUrl:"https://github.com/facebook/docusaurus/edit/master/website/docs/sign-in/recaptcha-v3.md",version:"current",sidebar_label:"reCAPTCHA v3",sidebar:"docs",previous:{title:"reCAPTCHA v2",permalink:"/docs/repcaptcha-v2"},next:{title:"Configure a Logo Based on App Context",permalink:"/docs/logo-per-app-context"}},s=[{value:"Problem",id:"problem",children:[]},{value:"Solution",id:"solution",children:[{value:"Sign In Widget",id:"sign-in-widget",children:[]}]},{value:"Discussion",id:"discussion",children:[]}],l={toc:s};function b(e){var t=e.components,n=Object(r.a)(e,["components"]);return Object(i.b)("wrapper",Object(a.a)({},l,n,{components:t,mdxType:"MDXLayout"}),Object(i.b)("h2",{id:"problem"},"Problem"),Object(i.b)("p",null,"Google's ",Object(i.b)("a",{parentName:"p",href:"https://developers.google.com/recaptcha/docs/v3"},"reCAPTCHA v3")," is quite different from v2 as it's designed to requires no user interaction. In addition, you can perform a server-side validation to receive a score on how likely the user is a bot or not (1.0 is very likely a good interaction, 0.0 is very likely a bot). Therefore, you can take more adaptive approaches instead of immediately denying traffic such as requesting a MFA factor for a low score."),Object(i.b)("h2",{id:"solution"},"Solution"),Object(i.b)("blockquote",null,Object(i.b)("p",{parentName:"blockquote"},"Ensure your site key is registered to the correct type of reCAPTCHA version")),Object(i.b)("p",null,"How you respond to a potential bot is going to vary depending on your requirements, but the implementations are going to be fairly consistent. The examples below demonstrate a few common reCAPTCHA v3 use cases."),Object(i.b)("p",null,"Ensure you import reCAPTCHA script with the site key"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-html"},'<script src="https://www.google.com/recaptcha/api.js?render=reCAPTCHA_site_key"><\/script>\n')),Object(i.b)("h3",{id:"sign-in-widget"},"Sign In Widget"),Object(i.b)("h4",{id:"preventing-sign-in"},"Preventing Sign In"),Object(i.b)("p",null,"Include a verification check on on the ",Object(i.b)("inlineCode",{parentName:"p"},"processCreds")," configs."),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-js"},"// ... previous configs omitted\nprocessCreds: (credentials, callback) => {\n    // Wrap in a try/catch statement for error handling\n    // Can define your own actions here for monitoring\n    grecaptcha.ready(async () => {\n        // Wrap in a try/catch statement for error handling\n        const captchaToken = await grecaptcha.execute('reCAPTCHA_site_key', {action: 'submit'});\n\n        if (captchaToken) {\n            // Proceed with server side validation for a scoring\n            // If only client side, then run callback\n            callback();\n        }\n    });\n}\n")),Object(i.b)("h4",{id:"preventing-registration"},"Preventing Registration"),Object(i.b)("p",null,"Include a verification check on the ",Object(i.b)("inlineCode",{parentName:"p"},"registration.preSubmit")," configs."),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-js"},"// ...previous configs omitted\nregistration: {\n    preSubmit: function (postData, onSuccess, onFailure) {\n        grecaptcha.ready(async () => {\n            const captchaToken = await grecaptcha.execute('reCAPTCHA_site_key', {action: 'register'})\n\n            if (captchaToken) {\n                // Can proceed with server-side validation for scoring\n               return onSuccess(postData);\n            }\n\n            // If no token\n            onFailure({\n                errorSummary: \"Not a human!\"\n            });\n        });\n    }\n},\nfeatures: {\n    registration: true\n}\n")),Object(i.b)("h2",{id:"discussion"},"Discussion"),Object(i.b)("p",null,"As mentioned before these are client-side validations, thus you may decide to extend the application logic with a back-end server to include scoring. This goes beyond the scope of this book, but Google provides some examples on where you may want to take action."),Object(i.b)("table",null,Object(i.b)("thead",{parentName:"table"},Object(i.b)("tr",{parentName:"thead"},Object(i.b)("th",{parentName:"tr",align:null},"Use case"),Object(i.b)("th",{parentName:"tr",align:null},"Recommendation"))),Object(i.b)("tbody",{parentName:"table"},Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",{parentName:"tr",align:null},"homepage"),Object(i.b)("td",{parentName:"tr",align:null},"See a cohesive view of your traffic on the admin console while filtering scrapers.")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",{parentName:"tr",align:null},"login"),Object(i.b)("td",{parentName:"tr",align:null},"With low scores, require 2-factor-authentication or email verification to prevent credential stuffing attacks.")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",{parentName:"tr",align:null},"social"),Object(i.b)("td",{parentName:"tr",align:null},"Limit unanswered friend requests from abusive users and send risky comments to moderation.")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",{parentName:"tr",align:null},"e-commerce"),Object(i.b)("td",{parentName:"tr",align:null},"Put your real sales ahead of bots and identify risky transactions.")))))}b.isMDXComponent=!0}}]);