module.exports = {
  docs: [
    {
      type: 'doc',
      id: 'intro'
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
      label: 'Account Management',
      items: [
        'account/redirect-post-account-operations'
      ]
    }
  ]
};
