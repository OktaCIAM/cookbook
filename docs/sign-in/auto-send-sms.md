---
id: auto-send-sms
title: Auto Send SMS Code Workaround
sidebar_label: Auto Send SMS Code
slug: /auto-send-sms-code
description: Configure the Okta Signin Widget to auto send SMS code upon MFA verification
keywords:
- Okta CIAM
- MFA SMS Factor
- Auto Send SMS Code
- Okta Signin Widget
---

## Problem
While the Sign In Widget gives you tremendous speed in enabling login to your applications, it's user-experience is constrained what's provided. For example, SMS factor requires a consent from the user to send the code to their device. This may not be intuitive to the user and result in a disrupted user flow, we can code a simple workaround to alleviate this issue.

## Solution
Leverage the "afterRender" event to that occurs when the widget is transitioning to different pages, and include a simple query DOM check to determine if the "send code" button is available.

**Example:**
```js
oktaSignIn.on('afterRender', function (context) {
    if (context.controller === 'mfa-verify') {
        // Alternative you can use document.getElementsByClassName 
        const requestCodeButton = document.querySelector('a.sms-request-button');
        if (requestCodeButton) {
            requestCodeButton.click();
        }
    }
});
```

## Discussion
With all workarounds, we encourage you to remain diligent on your coding practices. Thus, if you cannot compromise from the provided UX of the widget, we encourage you to explore developing a custom experience with [Auth.js](https://github.com/okta/okta-auth-js) to accommodate for additional changes your business requires.