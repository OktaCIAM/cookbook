---
id: external-idp-tokens
title: Intercept External IdP Tokens
sidebar_label: External IdP Tokens
slug: /intercept-external-idp-tokens
description: Intercept external IdP tokens during okta inbound federation / social authentication
keywords:
- Okta CIAM
- External IdP Tokens
- External IdP refresh tokens
- Social authentication
- Okta external IdP
- Okta inbound federation
---

> **Disclaimer**
> Please note, this is **NOT** officially supported by Okta and only serves as a high-level guidance for a creating a workaround. At any time, this workaround can change or stop functioning.

## Problem
> **Note:** If an access token is sufficient enough, you may use this [API](https://developer.okta.com/docs/reference/api/idps/#social-authentication-token-operation)s

In unique circumstances (B2B), an application may need to intercept the `ID Token` or `Refresh Token` from the external or social authenticated IdP.

Typical scenarios include:
- Proof of access against the parent identity provider where re-authentication is not sufficient enough
- Utilizing the ID token for custom inline hooks logic
- Uncertain security practices around external refresh tokens (lack of rotations or indefinite lifetimes)

Alternatively, a trusted application can perform multiple oauth flows with differently scoped integrations within the client-side.

## Solution
This requires a proxy in-between the `token` endpoint to intercept the tokens.

![Dashboard Location](https://user-images.githubusercontent.com/6020066/123849790-3600d000-d8e7-11eb-9023-44a17aba60ff.png)

This proxy will serve as a token interceptor where Okta will send the authorization code in exchange for a token. Within the transaction, the proxy will relay the request to the actual external IdP token endpoint and store the tokens while sending them back to Okta. Afterwards, internal services can utilize the data store for additional token operations. Refer to *figure 1* below for a high-level diagram.

**Figure 1: High-Level Diagram**
![External IdP Tokens Diagram](https://user-images.githubusercontent.com/6020066/123849258-96434200-d8e6-11eb-9134-fd0ffd8ad62c.jpeg)

## Discussion
In practice, it you'll come across some nuances to properly relay and hand-off the tokens. Feel free to add some issues you may come across onto this document.