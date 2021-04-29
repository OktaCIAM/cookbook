---
id: get-current-monthly-active-users
title: Get Current MAUs (Monthly Active Users)
sidebar_label: Get Current MAUs
slug: /get-current-monthly-active-users
description: This recipe is a simple and effective to determine the existing MAU (monthly active user) consumption for the month.
keywords:
- Okta CIAM
- Okta CIAM MAUs
- Okta System Log API
- Okta Get Monthly Active Users
---

## Problem
The system log API can be utilized to create virtually any report, however, it can be complicated to get started. A common problem is determining your existing MAUs (monthly active users).

> Note: on a One App or Enterprise plan, you can get this report from your Okta contact

## Solution
To get the current month active users, make a request to the `system log` API with a filter (`eventType eq "user.session.start"`) to only display events of when users have successfully created a session. In addition, set the parameters `since` and `until` to the first and end of the month in the UTC timezone.

Afterwards, track which users have logged in for the month and calculate the total.

The solution can be seen in the reference scripts listed below.

### Node.js v10.0.0 or higher
Make sure to install the `@okta/okta-sdk-nodejs` package: `npm install @okta/okta-sdk-nodejs`

```javascript
const okta = require('@okta/okta-sdk-nodejs');

// Configure this
const API_KEY = 'YOUR_API_TOKEN';
const OKTA_ORG_URL = 'https://your-okta-domain.okta.com';

const date = new Date();
// Configure the dates to be set to first and end of month in UTC 
const since = new Date(Date.UTC(date.getFullYear(), date.getMonth(), 1, 0, 0, 0, 0)).toISOString();
const until = new Date(Date.UTC(date.getFullYear(), date.getMonth() + 1, 0, 0, 0, 0, 0)).toISOString();

// Retry Mechanism
const defaultRequestExecutor = new okta.DefaultRequestExecutor({
    maxRetries: 10,
    requestTimeout: 0 
});

const client = new okta.Client({
    orgUrl: OKTA_ORG_URL,
    token: API_KEY,
    requestExecutor: defaultRequestExecutor
});

const activeUsers = [];

client.getLogs({
  filter: 'eventType eq "user.session.start"',
  since,
  until
}).each(log => {
    const user = log.actor.id;
    if (activeUsers.indexOf(user) < 0) {
        activeUsers.push(user)
    }
}).then(() => {
    console.log(`Monthly Active Users: ${activeUsers.length}`);
})
.catch(console.error);
```

#### Try it Yourself
You can run the sample script below to test the code for your own instances, simply update the secrets `API_TOKEN` and `ORG_URL` with your values.

<iframe height="400px" width="100%" src="https://replit.com/@brh55/get-mau-nodejs?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>


### Python 3.6.0 or higher
Install the Okta SDK: `pip install okta`

```python
from okta.client import Client as OktaClient
from datetime import datetime
import asyncio

config = {
    'orgUrl': 'https://your-okta-domain.okta.com',
    'token': 'YOUR_API_TOKEN',
}
okta_client = OktaClient(config)

async def main():
    active_users = []
    today = datetime.now()
    since = today.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
    until = today.replace(month=today.month+1, day=1, hour=0, minute=0, second=0, microsecond=0)

    logs, resp, err = await okta_client.get_logs({
        'filter': 'eventType eq "user.session.start"',
        'since': since.strftime('%Y-%m-%dT%H:%M:%SZ'),
        'until': until.strftime('%Y-%m-%dT%H:%M:%SZ'),
    })

    while True:
        for log in logs:
           # Add more properties here.
           user_id = log.actor.id;
           if user_id not in active_users:
             active_users.append(user_id)
        if resp.has_next():
            users, err = await resp.next()
        else:
            print('Monthly Active Users: {}'.format(len(active_users)))
            break

loop = asyncio.get_event_loop()
loop.run_until_complete(main())
```

#### Try it Yourself
You can run the sample script below to test the code for your own instances, simply update the secrets `API_TOKEN` and `ORG_URL` with your values.

<iframe height="400px" width="100%" src="https://replit.com/@brh55/OKTA-MAU-SAMPLE?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

## Discussion
It's possible to recreate these solution using the native HTTP module, but the recipes provided utilize the Okta SDKs to simplify the nuances of handling rate-limits and pagination with the API.

In addition, these solutions can be extend to derive other meaningful things such as the most active user, least active user, etc.

## Credits
Credits to Jay Venkatraj for proposing this problem to the CIAM community and [Brandon Him](https://github.com/brh55) for the initial recipe.

Feel free to contribute support for other languages by [submitting a PR](https://github.com/OktaCIAM/cookbook/pulls).