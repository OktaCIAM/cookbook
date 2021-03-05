---
id: alternative-username
title: Alternative Username
sidebar_label: Alternative Username
slug: /alternative-username
---

## Problem
In every authentication transaction, we submit a request to the [`/authn` endpoint](https://developer.okta.com/docs/reference/api/authn/) to start primary authentication. This step requires a username and password to evaluate against the Password Policy, MFA policy, and Sign-On Policy configured on your Okta tenant.

But, what if you want to allow the user to login with an alternative id such as a "rewards number", "loyalty number", etc?

## Solution
This requires a "pre-step" before starting the authentication. In other words, a way to change the username with the correct username prior to validating against the `authn` endpoint.

### Sign In Widget
For the [Sign In Widget (SIW)](https://developer.okta.com/code/javascript/okta_sign-in_widget/), leverage the [`transformUsername` method](https://github.com/okta/okta-signin-widget#username-and-password) to map the correct Okta username.

**Example:**
```js
transformUsername: async (username, operation) => {
    // Perform only for Primary Auth
    // Assuming that anything without the "@" is not an email
    if (operation === 'PRIMARY_AUTH' && !username.includes("@")) {
        const searchparams = {
            'login': username,
            'email': username,
            'memberNumber': username
        };
        const operator = 'or';
        const data = {
            'searchparams': searchparams,
            'operator': operator
        };

        try {
            // Request to a look up service
            const response = await fetch('/finduserbysearch', {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            const matches = await response.json();
            // Map username with correct profile
            const username = matches[0].profile.login;
            reeturn username;
        } catch (err) {
            // Do something, notify user
            console.error(err);
        }
        return username;
    }
}
```

## Discussion
Note that in the sign-in-widget example, we are using simple checks to illustrate (i.e., email format) the point.