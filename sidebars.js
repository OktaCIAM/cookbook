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
        {
          type: 'category',
          label: 'reCAPTCHA',
          items: [
            'sign-in/recaptcha-v2',
            'sign-in/recaptcha-v3'
          ]
        }
      ]
    }
  ]
};
