const elastic = require('./elastic');
const server = require('./index.js');
require('dotenv').config();

(async function main() {
  const isElasticReady = await elastic.checkConnection();

  if (isElasticReady) {
    const elasticIndex = await elastic.esclient.indices.exists({ index: elastic.FIELDS.index });

    if (!elasticIndex.body) {
      await elastic.createIndex(elastic.FIELDS.index);
      await elastic.setNewsMapping();
      await elastic.setUsersMapping();
    }

    server.start();
  }
})();