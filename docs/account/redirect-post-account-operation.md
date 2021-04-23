---
id: redirect-post-account-operations
title: Redirect to Application Post Account Operations (Unlock, Activation, Forgot Password)
sidebar_label: Redirect Post Account Operations
slug: /redirect-post-account-operations
description: Ensure a user is redirected back to an application after a user has successfully performed an account operation such as unlock, activation, or password reset.
keywords:
- Okta CIAM
- Redirect After Forgot Password
- Redirect After Account Unlock
- Okta Email Templates
- Email Templates for Multiple Applications
---

## Problem
By default, Okta will redirect the user to the Okta dashboard upon unlocking their account or resetting their password.

This is an undesirable experience for CIAM applications as users are expect to be redirected to the application.

## Solution
Okta supports a query string called `fromURI` to determine where to redirect the user. Simply append the URI in an url safe encoding to the account operation links. Feel free to use this [URL encoding tool](https://meyerweb.com/eric/tools/dencoder/) to encode the URI before appending it.

In addition to appending the query string, you'll need to add this URI as a trusted origin within the admin dashboard (Security > API > Trusted Origin > Add Origin).

Below are some examples based on our default templates using a encoded URI of "https://YOUR_APP_URI_HERE.com" as `https%3A%2F%2FYOUR_APP_URI_HERE.com`

**Example: Forgot Password**
```html
<td align="center">
  <a id="reset-password-link" href="${resetPasswordLink}?fromURI=https%3A%2F%2FYOUR_APP_URI_HERE.com"
    style="text-decoration:none">
    <span
      style="padding:9px 32px 7px 31px;border:1px solid;text-align:center;cursor:pointer;color:#fff;border-radius:3px;background-color:#44bc98;border-color:#328c71 #328c71 #2f856b;box-shadow:0 1px 0 #d8d8d8">
      Reset Password
    </span>
  </a>
</td>
```

**Example: User Activation**
```html
<td align="center" style="display:inline-block;padding:10px;border:1px solid;text-align:center;cursor:pointer;color:#fff;border-radius:3px;background-color:#44bc98;border-color:#328c71 #328c71 #2f856b;box-shadow:#d8d8d8 0 1px 0">
  <a id="reset-password-link" href="${activationLink}?fromURI=https%3A%2F%2FYOUR_APP_URI_HERE.com" style="text-decoration:none">
  <span style="font-size:13.5px;color:#fff">
    Activate Okta Account 
  </span>
  </a>
</td>
```

**Example: Unlock Account**
```html
<td align="center" style="height:32px;padding-top:24px;padding-bottom:8px">
  <a id="unlock-account-link" href="${unlockAccountLink}?fromURI=https%3A%2F%2FYOUR_APP_URI_HERE.com" style="text-decoration:none">
    <span style="padding:9px 32px 7px 31px;border:1px solid;text-align:center;cursor:pointer;color:#fff;border-radius:3px;background-color:#44bc98;border-color:#328c71 #328c71 #2f856b;box-shadow:0 1px 0 #d8d8d8">
      Unlock Account
    </span>
  </a>
</td>
```

## Discussion
If your tenant requires more than one email template due to multiple applications, Okta does not support this out of the box. However, you can leverage the user's locale property to serve different emails per application. More information can be found [here](https://support.okta.com/help/s/article/How-to-leverage-different-activation-email-templates-based-on-a-user-profile-attribute-value?language=en_US).