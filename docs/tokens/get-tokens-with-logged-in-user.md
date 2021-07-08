---
id: get-token-with-existing-session
title: Get Tokens for Logged in User
sidebar_label: Get Tokens for Logged In User
slug: /get-tokens-for-logged-in-user-with-okta
description: How to get tokens with an already logged in user through Okta.
keywords:
- Okta CIAM
- Okta Access Tokens
- Okta Session Management
- Okta Token Management
- Session Token Exchange
- Session Already Exists
- SSO Okta
---

## Problem
The user may already have an existing session with Okta (through another application or dashboard), however, your application may not have references to the oAuth/OIDC tokens OR the [token's claim do not reflect recently updated attributes](https://devforum.okta.com/t/getting-a-fresh-jwt-on-demand/14686).

## Solution
Okta provides the ability to [silently authenticate an existing user](https://developer.okta.com/docs/reference/api/oidc/#parameter-details) during a browser-based OpenID Connect flow with the `prompt` parameter set to `none`.

The steps are as followed:
1. *Recommended (Same Domains): [Validate Existing Session](https://developer.okta.com/docs/reference/api/sessions/#get-current-session)*
2. Perform PKCE OAuth flow by redirecting user to your tenant's [`/authorize` endpoint](https://developer.okta.com/docs/reference/api/oidc/#authorize) with `prompt=none` with a `response_mode=query`
3. Parse code from the `callback` redirect and exchange code for tokens
5. Store new tokens in the application

Note, the redirect can create a jaggered user experience, but this can be improved upon with the use of an hidden iFrame. However, there is an important caveat one must consider prior to going with this approach:

> ⚠️  Cross-site origin iFrames are loaded in a third-party context. As a result, some browsers -- and eventually all -- block third-party cookies by default, therefore, this solution will not work for some environments. For more details, please refer to the [support page](https://support.okta.com/help/s/article/FAQ-How-Blocking-Third-Party-Cookies-Can-Potentially-Impact-Your-Okta-Environment?language=en_US).

If this caveat doesn't apply to your environment, the `okta-auth-js` SDK provides a method, `token.getWithoutPrompt(options)`, all within a hidden iFrame.

```js
authClient.token.getWithoutPrompt({
  responseType: ['id_token', 'access_token'], // or array of types
})
.then({tokens} => authClient.tokenManager.storeTokens(tokens))
.catch(err => console.err);
```

## Discussion
In practice, this approach will generally be used for applications with an SSO requirements. For some applications that just need updated JWTs, they can most likely leverage a short-lived, continually [rotated `refresh token`](https://developer.okta.com/docs/guides/refresh-tokens/refresh-token-rotation/).

### Related Links
- [FAQ: How Blocked Third Party Cookies Can Potentially Impact Your Okta Environment](https://support.okta.com/help/s/article/FAQ-How-Blocking-Third-Party-Cookies-Can-Potentially-Impact-Your-Okta-Environment?language=en_US)
- [Dev Forum: By what date should we implement refresh token rotation](https://devforum.okta.com/t/by-what-date-should-we-implement-refresh-token-rotation/15035/7)
- [Dev Forum: Getting a fresh JWT token](https://devforum.okta.com/t/getting-a-fresh-jwt-on-demand/14686)