module.exports = {
  docs: [
    {
      type: 'doc',
      id: 'intro'
    },
    {
      type: 'category',
      label: 'Account Management',
      items: [
        'account/redirect-post-account-operations'
      ]
    },
    {
      type: 'category',
      label: 'Sign In',
      items: [
        'sign-in/alternative-username',
        'sign-in/auto-send-sms',
        'sign-in/init-idp-discovery',
        'sign-in/logo-per-context',
        {
          type: 'category',
          label: 'reCAPTCHA',
          items: [
            'sign-in/recaptcha-v2',
            'sign-in/recaptcha-v3'
          ]
        }
      ]
    },
    {
      type: 'category',
      label: 'Reporting',
      items: [
        'reporting/get-current-monthly-active-users'
      ]
    },
    {
      type: 'category',
      label: 'Sessions',
      items: [
        'sessions/max-session-timeout'
      ]
    },
    {
      type: 'category',
      label: 'Tokens',
      items: [
        'tokens/external-idp-tokens',
        'tokens/get-token-with-existing-session'
      ]
    }
  ]
};
