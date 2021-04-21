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
        {
          type: 'category',
          label: 'reCAPTCHA',
          items: [
            'sign-in/recaptcha-v2',
            'sign-in/recaptcha-v3'
          ]
        },
        'sign-in/logo-per-context'
      ]
    }
  ]
};
