const express = require("express");
const { getAllTags, getPostsByTagName } = require("../db");

const tagsRouter = express.Router();

tagsRouter.use((req, res, next) => {
  console.log("A request is being made to /tags");

  next();
});

tagsRouter.get("/", async (req, res) => {
  const posts = await getAllTags();

  res.send({
    posts,
  });
});

tagsRouter.get("/:tagName/posts", async (req, res, next) => {
  const { tagName } = req.params;
  try {
    const posts = await getPostsByTagName(tagName);
    res.send({posts: posts})
  } catch ({name, message}) {
    next({name, message})
  }
});

module.exports = tagsRouter;
