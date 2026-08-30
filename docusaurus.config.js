// @ts-check
const {themes} = require('prism-react-renderer');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '3M-UI 文档',
  tagline: 'Mihomo Web 管理面板',
  url: 'https://docs.3m-ui.com',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.svg',
  organizationName: 'kazeyukiro',
  projectName: '3m-ui-docs',
  trailingSlash: false,
  presets: [
    [
      'classic',
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/kazeyukiro/3m-ui-docs/edit/main/',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],
  themeConfig:
    ({
      navbar: {
        title: '3M-UI',
        logo: { alt: '3M-UI Logo', src: 'img/logo.svg' },
        items: [
          { type: 'docSidebar', sidebarId: 'guide', label: '使用指南' },
          { type: 'docSidebar', sidebarId: 'ops', label: '运维手册' },
          { type: 'docSidebar', sidebarId: 'api', label: 'API 参考' },
          { href: 'https://github.com/kazeyukiro/3m-ui', label: 'GitHub', position: 'right' },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: '文档',
            items: [
              { label: '快速开始', to: '/quick-start' },
              { label: '安装与升级', to: '/install' },
              { label: '安全建议', to: '/security' },
            ],
          },
          {
            title: '社区',
            items: [
              { label: 'GitHub', href: 'https://github.com/kazeyukiro/3m-ui' },
              { label: '问题反馈', href: 'https://github.com/kazeyukiro/3m-ui/issues' },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} 3M-UI. Built with Docusaurus.`,
      },
      prism: {
        theme: themes.github,
        darkTheme: themes.dracula,
        additionalLanguages: ['yaml', 'bash', 'json', 'nginx', 'docker'],
      },
      colorMode: {
        defaultMode: 'light',
        respectPrefersColorScheme: true,
      },
    }),
};

module.exports = config;
