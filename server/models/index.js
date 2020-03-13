const { esclient, FIELDS } = require('../elastic');

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

async function getNews(req) {

  let query = {
    query: {
      multi_match: {
        query: req.text || '',
        fields: ['title', 'content']
      }
    }
  };

  if (!req.text) {
    query = {
      query: {
        match_all: {}
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