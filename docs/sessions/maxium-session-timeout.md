---
id: max-session-timeout
title: Max Session Timeout
sidebar_label: Max Session Timeout
slug: /max-session-timeout
description: For an application developer who want to force a sign out or terminate a session after a set number of hours regardless of activity within Okta.
keywords:
- Okta CIAM
- Maximum Session Timeout
- Okta Sessions Management
- Okta Timeouts
- Session Timeouts
- Session Management
---

## Problem
An application developer may want to force a sign out or terminate a session after `N` hours regardless of activity. This is known as **Maximum Session Timeout** and is common for applications with particular session rules. However, the Okta dashboard only provides a configuration for **Maximum Idle Session Timeout** as shown below.

![Session Expire After](https://user-images.githubusercontent.com/6020066/124000085-39f12880-d9a1-11eb-9d11-ac4205f44d5a.png)

## Solution
While Okta does not support this setting within the admin dashboard, this can be configured through the [Policy APIs](https://developer.okta.com/docs/reference/api/policy/). The documentation for this setting can be found on the [Sign On Session Object](https://developer.okta.com/docs/reference/api/policy/#signon-session-object).

### Overview
With the APIs create a policy to contain a rule with an `actions.signon.session.maxSessionLifetimeMinutes` configured.

![Dashboard Example](https://user-images.githubusercontent.com/6020066/124000488-9fddb000-d9a1-11eb-9221-9912f666ed87.png)

The API sequence is as followed:
> **Create Policy** > **Create Rule** > **Update Rule with maxSessionLifeTime**

**Create Policy**
```bash
curl -v -X PUT \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS {api_token}" \
-d '{
    "type": "OKTA_SIGN_ON",
    "name": "Session Policy",
}' "https://${yourOktaDomain}/api/v1/policies"
```

**Create Rule for Policy with Max Session Timeout**
```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "type": "SIGN_ON",
  "name": "Max Session Lifetime",
  "actions": {
    "signon": {
      "access": "ALLOW",
       "session": {
          "maxSessionLifetimeMinutes": 240, # Set desired Max Session Lifetime
          "usePersistentCookie": false,
          "maxSessionIdleMinutes": 120
       }
    }
  }
}' "https://${yourOktaDomain}/api/v1/policies/{policyId}/rules"
```

---

In addition, it's worth noting that the admin dashboard can be used to create the policy and rule followed with a `PUT` request to update the rule with the `maxSessionLifetimeMinutes`.

This approach requires a few additional steps to get the associated IDs:
> **Get Policy ID with ["Get all Policies by type"](https://developer.okta.com/docs/reference/api/policy/#get-all-policies-by-type)** > **Get Rule Id with ["Get Policy Rules"](https://developer.okta.com/docs/reference/api/policy/#get-policy-rules)**


**Update Existing Rule with Max Session Lifetime**
```bash
curl -v -X PUT \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS {api_token}" \
-d '{
    "type": "SIGN_ON",
    "name": "Max Session Lifetime",
    "actions": {
        "signon": {
            "access": "ALLOW",
            "session": {
                "maxSessionLifetimeMinutes": 240, # Desired Life Time
                "usePersistentCookie": false,
                "maxSessionIdleMinutes": 120
            }
        }
    }
}' "https://${yourOktaDomain}/api/v1/policies/${policyId}/rules/${ruleId}"
```

### Node.js Script
The  working code sample below can be used for reference or as a script.

```js
const okta = require('@okta/okta-sdk-nodejs');

// Configure
const API_KEY = 'API_KEY_HERE';
const OKTA_ORG_URL = 'https://your-okta-org.okta.com';

// Configure Policy / Rule Settings
const MAX_LIFETIME_MINUTES = 240;

const USE_PERSISTENT_COOKIE = false;
const MAX_SESSION_IDLE_MINUTES = 120;
const POLICY_NAME = 'Max Session Timeout';
const POLICY_DESCRIPTION = 'Policy for Session Management';
const RULE_NAME = 'Max Session Timeout'

const client = new okta.Client({
  orgUrl: OKTA_ORG_URL,
  token: API_KEY
});

const createMaxSessionTimeoutPolicy = async () => {
  try {
      const policy = await client.createPolicy({
        type: "OKTA_SIGN_ON",
        name: POLICY_NAME,
        description: POLICY_DESCRIPTION
      });

      const rule = await policy.createRule({
        "type": "SIGN_ON",
        "name": RULE_NAME,
        "actions": {
          "signon": {
            "access": "ALLOW",
            "session": {
              "maxSessionLifetimeMinutes": MAX_LIFETIME_MINUTES,
              "usePersistentCookie": USE_PERSISTENT_COOKIE,
              "maxSessionIdleMinutes": MAX_SESSION_IDLE_MINUTES
            }
          }
        }
      });

      if (rule) {
        console.log(`
-- Script Successful --
Policy: ${POLICY_NAME} (${policy.id})
Rule: ${rule.name} (${rule.id})
Max Session Lifetime: ${rule.actions.signon.session.maxSessionLifetimeMinutes} Minutes`)
      }
  } catch (err) {
    console.log(`
-- Script failed --
Reason: ${err}`)
  }
}

createMaxSessionTimeoutPolicy();
```

#### Try it yourself
You can use the REPL below to execute the script without the need of setting up any additional environments or tools, simply update the environment variables and configure the settings.

<iframe frameborder="0" width="100%" height="500px" src="https://repl.it/@brh55/max-session-timeout-okta?lite=true"></iframe>

## Discussion
When setting the rule the `maxSessionLifetimeMinutes`, Okta expects the `maxSessionIdleMinutes` to be set to equal or lesser than the sessionlifetime minutes.

## Credits
Credit to Sudipto Desmukh for providing this solution, his original write up can be found on his [blog](http://ptotech.blogspot.com/2018/03/sudipto-desmukh-set-maximum-session-timeout.html?m=1) and [Brandon Him](https://github.com/brh55) for the write-up and sample script.