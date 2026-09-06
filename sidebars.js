/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  guide: [
    {
      type: 'category',
      label: '入门',
      items: ['quick-start', 'install', 'dev-channel'],
    },
    {
      type: 'category',
      label: '面板使用',
      items: [
        'panel-config',
        'nat-port',
        'listeners',
        'users-traffic',
        'subscription',
        'core',
        'share',
      ],
    },
  ],
  ops: [
    {
      type: 'category',
      label: '运维',
      items: [
        'cluster',
        'telegram-bot',
        'ssl-cert',
        'system-settings',
        'backup-restore',
        'security',
        'verify-release-signature',
        'troubleshoot',
      ],
    },
  ],
  api: ['api-auth'],
};

module.exports = sidebars;
