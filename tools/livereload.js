const livereload = require('livereload');
const server = livereload.createServer();
console.log('livereload');
server.watch('../dist');
