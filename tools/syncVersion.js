const fs = require('fs');

const packageJson = require('../package.json');
const manifestJson = require('../dist/manifest.json');

manifestJson.meta.version = packageJson.version;
const newManifestJson = Object.assign({}, manifestJson, { version: packageJson.version });

// This path is relative to node caller path
fs.writeFileSync('./dist/manifest.json', JSON.stringify(newManifestJson, null, 2));
