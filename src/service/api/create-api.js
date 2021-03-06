'use strict';

const {Router} = require(`express`);
const {createCategoryRouter} = require(`./create-category-router`);
const {createSearchRouter} = require(`./create-search-router`);
const {createPostRouter} = require(`./create-post-router`);
const {createCommentRouter} = require(`./create-comment-router`);
const {createUserRouter} = require(`./create-user-router`);

const createAPI = (db) => {
  const router = new Router();

  router.use(`/articles`, createPostRouter(db));
  router.use(`/categories`, createCategoryRouter(db));
  router.use(`/search`, createSearchRouter(db));
  router.use(`/comments`, createCommentRouter(db));
  router.use(`/user`, createUserRouter(db));

  return router;
};

module.exports = {
  createAPI
};
