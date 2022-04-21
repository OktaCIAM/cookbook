---
id: hide-connecting-to-banner
title: Hide Connecting To Banner
sidebar_label: Hide Connect Banner
slug: /hide-connect-banner
description: Use simple JS to hide the "Connecting To" Banner within Okta Hosted Sign In pages.
keywords:
- Okta CIAM
- Okta OIE
- Connecting To Banner
- Okta Hosted Login
- Okta Signin Widget
- SP Initiated Login
---

## Problem
With OIE, by default you'll notice a "Connecting To" banner when using a Okta Hosted Login. This can be a unintended design element that may not fit with your brand requirements, especially for standalone CIAM implementations.

## Solution
This requires a simple JavaScript snippet after the Signin Widget is rendered to hide or remove the element from being render.

### Sign In Widget
For the [Sign In Widget (SIW)](https://developer.okta.com/code/javascript/okta_sign-in_widget/), leverage the [`afterRender` event listener](https://github.com/okta/okta-signin-widget#afterrender) to locate the banner element, and remove it from the view.

**Example:**
```js
oktaSignIn.on('afterRender', context => {
  const banner = document.querySelector('.applogin-banner');     
  if (banner) {
    banner.style.display = "none";
    // You can also use, 
    // banner.style.visibility = "hidden"
    // If you would like to retain the spacing on the page
  }
});
```
