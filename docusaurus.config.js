module.exports = {
  title: 'CIAM Cookbook',
  tagline: 'Recipes ranging from simple snippets and examples around real-world CIAM use cases',
  url: 'https://ciam.solutions/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'OktaCIAM',
  projectName: 'cookbook',
  themeConfig: {
    navbar: {
      title: 'CIAM Cookbook',
      logo: {
        alt: 'CIAM Image',
        src: 'img/cookbook-logo.png',
      },
      items: [
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        {
          href: 'https://github.com/OktaCIAM/cookbook',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      links: [
        {
          title: 'Related',
          items: [
            {
              label: 'Okta Developer',
              to: 'https://developer.okta.com/',
            },
            {
              label: 'Okta Multi Tenant Admin',
              to: 'https://docs.idp.rocks/',
            }
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'CIAM Community',
              href: 'https://github.com/OktaCIAM',
            }
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Okta',
              to: 'https://okta.com',
            }
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Okta CIAM Community. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
