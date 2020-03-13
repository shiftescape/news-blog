const { esclient, FIELDS } = require('../elastic');

async function getUser(username, password) {
  const query = {
    query: {
      bool: {
        must: {
          term: { username, password }
        }
      }
    }
  };

  const { body: { hits } } = await esclient.search({
    size: 1,
    index: FIELDS.index,
    type: FIELDS.userType,
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
  const query = {
    query: {
      multi_match: {
        query: req.text,
        fields: ['title', 'content']
      }
    }
  };

  const { body: { hits } } = await esclient.search({
    from: req.page || 0,
    size: req.limit || 100,
    index: FIELDS.index,
    type: FIELDS.newsType,
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

async function insertNews(title, content, created_by) {
  return esclient.index({
    index: FIELDS.index,
    type: FIELDS.newsType,
    body: {
      title,
      content,
      created_by,
      created_at: new Date()
    }
  })
}

module.exports = {
  getUser,
  getNews,
  insertNews
}