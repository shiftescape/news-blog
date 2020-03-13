const model = require("../models");

async function getUser(req, res) {
  const params = req.params;
  if (!params.id) {
    res.status(422).json({
      error: true,
      data: "Missing required parameter: 'id'"
    });
    return;
  }
  try {
    const result = await model.getUser(params.id);
    res.json({ success: true, data: result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, error: "Unknown error." });
  }
}

async function createUser(req, res) {
  const body = req.body;
  if (!body.username || !body.password) {
    res.status(422).json({
      error: true,
      data: "Missing required parameter: 'username' or 'password'"
    });
    return;
  }
  try {
    const result = await model.createUser(body.username, body.password);
    res.status(201).json({
      success: true,
      message: 'User successfully created!'
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, error: "Unknown error." });
  }
}

async function getNews(req, res) {
  try {
    const result = await model.getNews(req.query);
    res.json({ success: true, data: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Unknown error." });
  }
}

async function createNews(req, res) {
  const body = req.body;
  if (!body.title || !body.content || !body.created_by) {
    res.status(422).json({
      error: true,
      data: "Missing required parameter(s): 'title' or 'content' or 'created_by'"
    });
    return;
  }
  try {
    const result = await model.createNews(body.title, body.content, body.created_by);
    res.status(201).json({
      success: true,
      data: {
        id: result.body._id,
        title: body.title,
        content: body.content,
        created_by: body.created_by,
        created_at: result.body.created_at
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Unknown error." });
  }
}
module.exports = {
  getUser,
  createUser,
  getNews,
  createNews
};