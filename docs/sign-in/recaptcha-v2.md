---
id: recaptcha-v2
title:  reCAPTCHA v2
sidebar_label: reCAPTCHA v2
slug: /repcaptcha-v2
description: How to configure Google reCAPTCHA v2 with Okta Signin Widget
keywords:
- Okta CIAM
- Google reCAPTCHA v2
- Okta with Google reCAPTCHA
- Okta with CAPTCHA 
- Embed reCAPTCHA with Okta Signin Widget
---

## Problem
Google's [reCAPTCHA v2](https://developers.google.com/recaptcha/intro) can be an additional layer of security for your applications to protect against spam or abuse from potential "non-humans". However, due to the nature of widgets and the asynchronous nature of JavaScript, it can be difficult to coordinate both widgets to interact together.

## Solution
> Ensure your site key is registered to the correct type of reCAPTCHA version

This sample below provides details around the client-side verification. Though it's worth noting that Okta does have it's own threat detection engine ([ThreatInsights](https://help.okta.com/en/prod/Content/Topics/Security/threat-insight/ti-index.htm)) to prevent malicious attacks and spam on authentication evaluations.

### Sign In Widget (Self-Hosted)
#### Simple User Flow
We recommend this user flow as it's the simplest to implement and also prevents unwanted registration in the process.

1. Lands on Sign In Page
2. Display reCaptcha, Hide Sign In Widget
3. Validate reCaptcha
4. Display reCaptcha

[Preview of Flow](https://user-images.githubusercontent.com/6020066/109988046-22e14900-7cd5-11eb-8802-521ae4fc5e35.gif)

#### HTML
Ensure a reCAPTCHA widget is available on the same page as the SIW container.

> Make sure to import script with the correct parameters and `async` and `defer` attribute!
```html
<script src="https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit" async defer>
```

```html
<!-- omitted boilerplate HTML -->
<div id="grecaptcha-widget"></div>
<div id="okta-login-container"></div>
```

#### JavaScript
```js
// This is the callback for when the user verifies themselves
const reCaptchaCallback = captchaToken => {
    // captchaToken returns null if c
    const isHuman = captchaToken;
    if (isHuman) {
        // Do something with the reCAPTCHA, hide, fade, etc.
        // Show the sign in widget
        oktaSignIn.showSignInToGetTokens();
    }
};

// If you want include some logic for when reCAPTCAH is expired or errors
// const expiredCallback = () => {};
// const errorCallback = () => {};

// This is the explicit reCAPTCHA render callback
var onloadCallback = () => {
    let grecaptchaWidget = grecaptcha.render('grecaptcha-widget', {
        sitekey: 'YOUR_SITE_KEY',
        callback: reCaptchaCallback
        // Optional Params
        // 'expired-callback': expiredCallback,
        // 'error-callback': errorCallback,
        // size: compact || normal,
        // theme: dark || light
    });
}
```

#### Embedded reCAPTCHA Flow
While the simple flow is the preferred implementation, there are circumstances where you want to embed reCAPTCHA into the sign in widget. Note, this does require a more complex implementation and requires a bit of DOM manipulation.

```js
let grecaptchaWidget;

var onloadCallback = () => {
    grecaptchaWidget = grecaptcha.render('captchaWidget', {
        'sitekey' : 'YOUR_SITE_KEY',
        'theme' : 'light'
    });
}

const oktaSignIn = new OktaSignIn({
    // ... omitted other params
    processCreds: (creds, authCallback) => {
        // Check our widget 
        const isHuman = grecaptcha.getResponse(grecaptchaWidget);
        if (isHuman) {
            authCallback();
        } else {
            // Do something to notify potential users
        }
    }
});

oktaSignIn
    .showSignInToGetTokens()
    .then(tokens => {
        // store/use tokens
    });

oktaSignIn
    .on('ready', context => {
        if (context.controller === 'primary-auth') {
            // Get the widget container element
            const container = document
                .getElementById('okta-login-container');

            // Get a reference to the submit button
            const submitButton = container
                .querySelector('input[type="submit"]');
            
            // Get the parentNode in order to insert before the submit button
            const submitContainer = submitButton.parentNode;

            // Create a captcha widget element
            const captchaEl = document.createElement('div')
            captchaEl.setAttribute('id', 'captchaWidget');

            // Insert the captcha element
            submitContainer.insertBefore(captchaEl, submitButton);

            // You may also want to add a disable attribute and visually
            // change how the submit button appears for a better UX
        }
    });
```

## Discussion
It's important to mention that the embedded flow can be rather difficult when combining it with a modern front-end framework especially with a virtual DOM. Thus, you'll want to make sure to perform your logic within your encapsulated / wrapper over the widget.