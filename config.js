self.$config = {
  title: 'Koel',
  repo: 'phanan/koel',
  twitter: 'notphanan',
  'edit-link': 'https://github.com/koel/docs/blob/master',
  home: 'home.md',
  plugins: [
    docsearch({
      apiKey: 'b9aa1e87a0d8c33cbab16d200875ae42',
      indexName: 'koel'
    })
  ],
  url: 'https://koel.phanan.net/docs',
  nav: [
    { title: 'Home', path: '/' },
    { title: '3rd-Party Integrations', path: '/3rd-party' },
    { title: 'Watch Media Folder', path: '/watch' },
    { title: 'Use with Amazon S3', path: '/aws-s3' },
    { title: 'Troubleshooting', path: '/troubleshooting' }
  ]
}
