const { esclient, FIELDS } = require('../elastic');

/**
 * @function getUser
 * @returns { results<Object>, values<Object> }
 * @description Get user data based on _id
 */
async function getUser(id) {
  const query = {
    query: {
      bool: {
        must: {
          term: { _id: id }
        }
      }
    }
  };

  const { body: { hits } } = await esclient.search({
    size: 1,
    index: FIELDS.index,
    body: query
  });

  const results = hits.total.value;

  const values = hits.hits.map((hit) => {
    return {
      id: hit._id,
      username: hit._source.username,
      password: hit._source.password,
      score: hit._score
    }
  });

  return { results, values }
}

/**
 * @function getNews
 * @returns { results<Object>, values<Object> }
 * @description Get all news or filtered one
 */
async function getNews(req) {

  let query = {
    query: {
      multi_match: {
        query: req.text || '',
        fields: ['title', 'content', 'created_by']
      }
    }
  };

  if (!req.text) {
    query = {
      query: {
        match_all: {},
      },
      sort: {
        created_at: { 'order': 'desc' }
      }
    };
  }

  const { body: { hits } } = await esclient.search({
    from: req.page || 0,
    size: req.limit || 100,
    index: FIELDS.index,
    body: query
  });

  const results = hits.total.value;

  const values = hits.hits.map((hit) => {
    return {
      id: hit._id,
      title: hit._source.title,
      content: hit._source.content,
      created_by: hit._source.created_by,
      created_at: hit._source.created_at,
      score: hit._score
    }
  });

  return { results, values }
}

/**
 * @function createUser
 * @returns { esclient<ESObject> }
 * @description Create user data by username and password
 */
async function createUser(username, password) {
  return esclient.index({
    index: FIELDS.index,
    body: {
      username,
      password,
      created_at: (new Date()).getTime()
    }
  })
}

/**
 * @function createNews
 * @returns { esclient<ESObject> }
 * @description Create news data by title and content
 */
async function createNews(title, content, created_by) {
  return esclient.index({
    index: FIELDS.index,
    body: {
      title,
      content,
      created_by,
      created_at: (new Date()).getTime()
    }
  })
}

module.exports = {
  getUser,
  createUser,
  getNews,
  createNews
}