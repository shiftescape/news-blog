require('dotenv').config();
const { Client } = require('@elastic/elasticsearch');
const elasticUrl = process.env.ELASTIC_URL || 'http://localhost:9200';
const esclient = new Client({ node: elasticUrl });
const FIELDS = { index: 'newsblog' };

/**
 * @function createIndex
 * @returns {void}
 * @description Creates an index in ElasticSearch.
 */
async function createIndex(index) {
  try {
    await esclient.indices.create({ index });
    console.log(`Created index ${index}`);
  } catch (err) {
    console.error(`An error occurred while creating the index: ${index}`);
  }
}

/**
 * @function setUsersMapping
 * @returns {void}
 * @description Sets the users mapping to the database.
 */
async function setUsersMapping() {
  try {
    const schema = {
      username: {
        type: 'text'
      },
      password: {
        type: 'text'
      },
      created_at: {
        type: 'date',
        format: 'epoch_millis'
      }
    };

    await esclient.indices.putMapping({ index: FIELDS.index, body: { properties: schema }});
    console.log('Users mapping created successfully');

  } catch (err) {
    console.error('An error occurred while setting the users mapping: ');
    console.error(err);
  }
}

/**
 * @function setNewsMapping
 * @returns {void}
 * @description Sets the news mapping to the database.
 */
async function setNewsMapping() {
  try {
    const schema = {
      title: {
        type: 'text'
      },
      content: {
        type: 'text'
      },
      created_by: {
        type: 'text'
      },
      created_at: {
        type: 'date',
        format: 'epoch_millis'
      }
    };
    await esclient.indices.putMapping({ index: FIELDS.index, body: { properties: schema }});
    console.log('News mapping created successfully');

  } catch (err) {
    console.error(`An error occurred while setting the news mapping: ${err}`);
  }
}

/**
 * @function checkConnection
 * @returns {Promise<Boolean>}
 * @description Checks if the client is connected to ElasticSearch
 */
function checkConnection() {
  return new Promise(async (resolve) => {
    console.log('Checking connection to ES...');
    let isConnected = false;
    while (!isConnected) {
      try {
        await esclient.cluster.health({});
        console.log('Successfully connected to ES!');
        isConnected = true;
        // eslint-disable-next-line no-empty
      } catch (_) {
      }
    }
    resolve(true);
  });
}

module.exports = {
  esclient,
  FIELDS,
  setUsersMapping,
  setNewsMapping,
  checkConnection,
  createIndex
};