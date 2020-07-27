'use strict';

const {createPostFinder} = require(`./create-post-finder`);
const {validatePost} = require(`./validate-post`);
const {validateComment} = require(`./validate-comment`);
const {createCommentFinder} = require(`./create-comment-finder`);
const {createCategoryFinder} = require(`./create-category-finder`);

module.exports = {
  createPostFinder,
  validatePost,
  validateComment,
  createCommentFinder,
  createCategoryFinder,
};
