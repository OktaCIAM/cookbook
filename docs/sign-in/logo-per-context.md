---
id: logo-per-context
title: Configure a Logo Based on App Context
sidebar_label: Logo Based on App Context
slug: /logo-per-app-context
description: Dynamically render different logos for the Okta Signin Widget per application context.
keywords:
- Okta CIAM
- Logo based on Application Context
- Multiple Applications with Okta
- Okta Signin Widget
---

## Problem
For multi-brand companies trying to consolidate their brands through a white label application, you may want to dynamically change the logo per application or context id.

## Solution
The Okta-hosted sign-in page is [application-aware](https://developer.okta.com/docs/guides/style-the-widget/customization-examples/#per-application-customization) as stated in the developer docs. Simply leverage the `OktaUtils` to pull the context and apply simple logic to configure a logo per client id.

**Example:**
```js
// Helper function described in developer docs
const getClientId = () => {
    if (!OktaUtil) return;

    const requestContext = OktaUtil.getRequestContext();
    if (requestContext && requestContext.target && requestContext.target.clientId) {
        return requestContext.target.clientId;
    }
}

const clientId = getClientId();
const config = OktaUtil.getSignInWidgetConfig();

// Dynamic Map or you can use a switch statement
const LOGO_IMG_URL = {
    CLIENT_ID_1: URL_1,
    CLIENT_ID_2: URL_2,
    CLIENT_ID_3: URL_3,
    CLIENT_ID_4: URL_4
}[clientId];

config.logo = LOGO_IMG_URL;
```

## Discussion
This can easily be extended based on domain url as well.