import stitch from 'mongodb-stitch';

let db;
let client;

stitch.StitchClientFactory.create('raccoonminer-dktlv').then(client => {
  db = client.service('mongodb', 'mongodb-atlas').db('raccoon-miner');
  client.login();
});

export { db, client };
