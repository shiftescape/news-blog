const model = require("../models");

async function getUser(req, res) {
  const body = req.body;
  if (!body.username || !body.password) {
    res.status(422).json({
      error: true,
      data: "Missing required parameter: 'username' or 'password'"
    });
    return;
  }
  try {
    const result = await model.getNews(req.body);
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ success: false, error: "Unknown error." });
  }
}

async function getNews(req, res) {
  const query = req.query;
  if (!query.text) {
    res.status(422).json({
      error: true,
      data: "Missing required parameter: text"
    });
    return;
  }
  try {
    const result = await model.getNews(req.query);
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ success: false, error: "Unknown error." });
  }
}

async function addNews(req, res) {
  const body = req.body;
  if (!body.title || !body.content || !body.created_by) {
    res.status(422).json({
      error: true,
      data: "Missing required parameter(s): 'title' or 'content' or 'created_by'"
    });
    return;
  }
  try {
    const result = await model.insertNews(body.title, body.content, body.created_by);
    res.json({
      success: true,
      data: {
        id: result.body._id,
        title: body.title,
        content: body.content,
        created_by: body.created_by
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: "Unknown error." });
  }
}
module.exports = {
  getUser,
  getNews,
  addNews
};