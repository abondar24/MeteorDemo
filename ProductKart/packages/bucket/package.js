Package.describe({
  name: 'bucket',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');
  api.use(["templating","mongo"]);
  api.addFiles('bucket.js')
  api.addFiles('./collections/bucket.js',['client','server']);
  api.addFiles('./templates/bucket.html',["client"]);
  api.addFiles('./helpers/bucketHelper.js',["client"]);
  api.addFiles('./stylesheets/styles.css', ["client"]);
  api.export('Bucket',["client","server"]);
  api.export('BucketCollection',["client","server"])

});

Package.onTest(function(api) {
  api.use('sanjo:jasmine@1.0.1')
  api.use('bucket');

  api.addFiles('./tests/server/server.js', ['server']);
  api.addFiles('./tests/client/client.js', ['client']);

});
