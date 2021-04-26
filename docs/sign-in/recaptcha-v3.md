---
id: recaptcha-v3
title:  reCAPTCHA v3
sidebar_label: reCAPTCHA v3
slug: /repcaptcha-v3
description: How to configure Google reCAPTCHA v3 with Okta Signin Widget.
keywords:
- Okta CIAM
- Google reCAPTCHA v3
- Okta with Google reCAPTCHA
- Okta with CAPTCHA 
---

## Problem
Google's [reCAPTCHA v3](https://developers.google.com/recaptcha/docs/v3) is quite different from v2 as it's designed to requires no user interaction. In addition, you can perform a server-side validation to receive a score on how likely the user is a bot or not (1.0 is very likely a good interaction, 0.0 is very likely a bot). Therefore, you can take more adaptive approaches instead of immediately denying traffic such as requesting a MFA factor for a low score.

## Solution
> Ensure your site key is registered to the correct type of reCAPTCHA version

How you respond to a potential bot is going to vary depending on your requirements, but the implementations are going to be fairly consistent. The examples below demonstrate a few common reCAPTCHA v3 use cases.

Ensure you import reCAPTCHA script with the site key
```html
<script src="https://www.google.com/recaptcha/api.js?render=reCAPTCHA_site_key"></script>
```

### Sign In Widget
#### Preventing Sign In
Include a verification check on on the `processCreds` configs.
```js
// ... previous configs omitted
processCreds: (credentials, callback) => {
    // Wrap in a try/catch statement for error handling
    // Can define your own actions here for monitoring
    grecaptcha.ready(async () => {
        // Wrap in a try/catch statement for error handling
        const captchaToken = await grecaptcha.execute('reCAPTCHA_site_key', {action: 'submit'});

        if (captchaToken) {
            // Proceed with server side validation for a scoring
            // If only client side, then run callback
            callback();
        }
    });
}
```

#### Preventing Registration
Include a verification check on the `registration.preSubmit` configs.
```js
// ...previous configs omitted
registration: {
    preSubmit: function (postData, onSuccess, onFailure) {
        grecaptcha.ready(async () => {
            const captchaToken = await grecaptcha.execute('reCAPTCHA_site_key', {action: 'register'})

            if (captchaToken) {
                // Can proceed with server-side validation for scoring
               return onSuccess(postData);
            }

            // If no token
            onFailure({
                errorSummary: "Not a human!"
            });
        });
    }
},
features: {
    registration: true
}
```

## Discussion
As mentioned before these are client-side validations, thus you may decide to extend the application logic with a back-end server to include scoring. This goes beyond the scope of this book, but Google provides some examples on where you may want to take action.

| Use case   | Recommendation                                               |
| ---------- | ------------------------------------------------------------ |
| homepage   | See a cohesive view of your traffic on the admin console while filtering scrapers. |
| login      | With low scores, require 2-factor-authentication or email verification to prevent credential stuffing attacks. |
| social     | Limit unanswered friend requests from abusive users and send risky comments to moderation. |
| e-commerce | Put your real sales ahead of bots and identify risky transactions. |

