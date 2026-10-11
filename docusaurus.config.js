// @ts-check
const {themes: prismThemes} = require('prism-react-renderer');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Caroline Maguire',
  tagline: 'Technical Writing Portfolio',

  url: 'https://carolinemaymaguirecmm.github.io',
  baseUrl: '/carolinemaymaguirecmm/',
  organizationName: 'carolinemaymaguirecmm',
  projectName: 'carolinemaymaguirecmm',
  // Keep the trailing-slash URLs the old MkDocs site used, so existing links still work.
  trailingSlash: true,

  // Fail the build on any broken link or anchor, so CI catches them before deploy.
  onBrokenLinks: 'throw',
  onBrokenAnchors: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'throw',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.js',
          editUrl:
            'https://github.com/carolinemaymaguirecmm/carolinemaymaguirecmm/edit/main/',
          showLastUpdateTime: true,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  plugins: [
    [
      './plugins/llms-txt',
      {
        sidebarId: 'portfolio',
        summary:
          'Portfolio of Caroline Maguire, a senior technical writer in Cork, Ireland, specialising in developer tools, APIs, docs-as-code, and AI documentation automation.',
        extraLinks: [
          {
            section: 'CV',
            title: 'CV (PDF)',
            path: 'cv/caroline-maguire-cv.pdf',
            description: 'Current CV as a PDF.',
          },
          {
            section: 'CV',
            title: 'CV (web page)',
            path: 'cv/caroline-maguire-cv.html',
            description: 'Current CV as HTML.',
          },
        ],
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'Caroline Maguire',
        items: [
          {type: 'doc', docId: 'cv/index', label: 'CV', position: 'left'},
          {type: 'doc', docId: 'projects/index', label: 'Projects', position: 'left'},
          {
            href: 'pathname:///cv/caroline-maguire-cv.pdf',
            label: 'Download CV (PDF)',
            position: 'right',
          },
          {
            href: 'https://github.com/carolinemaymaguirecmm/carolinemaymaguirecmm',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Contact',
            items: [
              {label: 'LinkedIn', href: 'https://www.linkedin.com/in/caroline-maguire/'},
              {label: 'GitHub', href: 'https://github.com/carolinemaymaguirecmm'},
              {label: 'Email', href: 'mailto:carolinemaymaguire@gmail.com'},
            ],
          },
          {
            title: 'For AI assistants',
            items: [
              {label: 'llms.txt', href: 'pathname:///llms.txt'},
              {label: 'llms-full.txt', href: 'pathname:///llms-full.txt'},
            ],
          },
        ],
        copyright: `© ${new Date().getFullYear()} Caroline Maguire. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['bash', 'python', 'json'],
      },
    }),
};

module.exports = config;
