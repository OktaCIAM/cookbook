---
id: init-idp-discovery
title: Initialize IdP Discovery
sidebar_label: Initialize IdP Discovery
slug: /initialize-idp-discovery
description: Streamline the IdP Discovery user experience for users initiating login from an external application.
keywords:
  - IdP Discovery
  - IdP Routing Rules
  - Okta Sign In Widget
  - Customer Identity and Access Management
---

> Requires Sign In Widget version 2.5.0 or above

## Problem
In order for Okta's IdP Discovery policies to initialize for the SIW (Sign in Widget), a user must enter their existing credentials and trigger a login request. This can be a "chunky" user experience if the user is arriving from a link or external portal. To streamline this experience, a developer may want to auto populate the email upon loading and trigger the routing rules immediately.

## Solution
> 🔅  **Preview [Glitch example](https://spot-sable-quesadilla.glitch.me/?username=foobar%40foo.com)**

Pass along the context of the user's email in a query string, and leverage the sign in widget's context state and event handlers to populate the username field to trigger the login.

Append a url encoded query string with the user's email to the link of your sign in page: `https://your_app.com/login/page?username=USERNAME_HERE`

> Note: the query parameter doesn't need to be limited to username, you can name the parameter anything you please

**Example:**
```js
const signIn = new OktaSignIn({
    // ... ensure to add other required configurations
    features: {
        idpDiscovery: true
    },
    idpDiscovery : {
        // Ensure your redirect is set for application context
        requestContext: window.location.href
    }
}

signIn.on('ready', context => {
  // You might need to change the controller
  if (context.controller === "idp-discovery") {
  	const params = new URL(document.location).searchParams;
    let username = params.get("username");
    // Replace username with any parameter if you are using something else
	if (username) {
        username = decodeURIComponent(username);
        const usernameInput = document.getElementById("idp-discovery-username");
        usernameInput.value = username;
        usernameInput.dispatchEvent(new Event("change", { "bubbles": true }));

        const usernameSubmit = document.getElementById("idp-discovery-submit");
        usernameSubmit.click();
    } 
  }
});
```

## Discussion
It's important to mention that query strings are exposed in the user's browsers history and on server logs. Therefore, make an appropriate decision in regards to security and user-experience.


## Credits
Kudos to the EMEA CIAM Specialists team for the origins of this use case and solution and [Brandon Him (@brh55)](https://github.com/brh55) for writing and finalizing the recipe.