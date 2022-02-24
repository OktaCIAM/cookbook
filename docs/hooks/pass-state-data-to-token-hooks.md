---
id: pass-state-data-to-token-hooks
title: Pass State Data to Token Inline Hooks 
sidebar_label: Passing State Data to Token Hooks
slug: /pass-state-data-to-token-hooks
description: This recipe is a simple way to pass along data that may only co-exist on the application side, but is needed for additional context in the inline hook.
keywords:
- Okta CIAM
- Okta Webhooks
- Okta Token Inline Hooks
---

## Problem
The token inline hook sends a request that is defined by context that exists around the end-user and the client. However, there are few cases where the application holds state data that may need to be passed to the hook service.

## Solution

### Authorization Code Flow
When making an authorization request with a `authorization code` flow, you can pass along a `state` query parameter in the `/authorize` url. This state will be available in `data.context.protocol.request.state`.

```js
    "protocol": {
        "type": "OAUTH2.0",
        "request": {
            "state": "foobareere",
        }
    }
```

More Information: https://developer.okta.com/docs/reference/api/oidc/#request-parameters

### Client Credential Flow
With a client credential flow, there is not state parameter available. However, the `/token` url that triggered the hook will be passed along in the request payload. Thus, by appending additional query parameters to the token request, these parameters will be available in the webhook to be parsed.

```js
{
    // ... omitted
    "data": {
        "context": {
        "request": {
            "id": "reqv66CbCaCStGEFc8AdfS0ng",
            "method": "GET",
            "url": {
                "value": "https://${yourOktaDomain}/oauth2/default/v1/token?scope=openid+profile+email&response_type=token&myStateParameter=hello+world"
            },
            "ipAddress": "127.0.0.1"
        },
    // ... omitted
```

In this instance, we can reference the url through `data.context.request.url.value` and use code to parse the `myStateParameter` in the url and derive the value (hello+world).

A simple example to parse the `myStateParameter` in Javascript would look like such:
```js
const url = "https://foo.okta.com/oauth2/default/v1/token?scope=openid+profile+email&response_type=token&myStateParameter=hello+world";
const regex = /(?<=myStateParameter=).+(?=&|$)/i
const stateParamValue = url.match(regex)[0]; // hello+world

if (stateParamValue) {
  // Do Something with State Param Value
}
```

## Discussion
It's important to avoid passing along sensitive data through the request parameters, despite being encrypted through HTTPS, these url are logged in the Okta system log. Thus, if you need to pass along sensitive data, it's best to query behind your service / back channel.

## Credits
Credits to [Brandon Him](https://github.com/brh55) for the initial recipe.

Feel free to contribute support for other languages by [submitting a PR](https://github.com/OktaCIAM/cookbook/pulls).