module.exports = {
  title: 'Koel Documentation',
  description: 'The official documentation for Koel music streaming application',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: '3rd-Party Integrations', link: '/3rd-party' },
      { text: 'Watch Media Folder', link: '/watch' },
      { text: 'Host Media on S3', link: '/aws-s3' },
      { text: 'Troubleshooting', link: '/troubleshooting' }
    ],
    logo: '/logo.svg',
    repo: 'koel/koel',
    repoLabel: 'GitHub',
    docsRepo: 'koel/docs',
    docsDir: 'src',
    editLinks: true,
  },
  dest: 'dist'
}
