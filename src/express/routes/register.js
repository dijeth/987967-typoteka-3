'use strict';

const {Router} = require(`express`);
const multer = require(`multer`);
const {validateBodySchema} = require(`../middlewares`);
const {UserFormType} = require(`../const`);
const {DataServer} = require(`../data-server`);
const {userRegisterSchema} = require(`../joi-schemas`);
const {extractPicture} = require(`../utils`);

const registerRouter = new Router();
const upload = multer({dest: `src/express/public/img/avatars`});
const dataServer = new DataServer();

registerRouter.get(`/`, (req, res) => {
  res.render(`login`, {
    activeForm: UserFormType.REGISTER,
  });
});

registerRouter.post(`/`, [upload.single(`avatarFile`), validateBodySchema(userRegisterSchema, `login`, {activeForm: UserFormType.REGISTER})], async (req, res, next) => {
  const {firstname, lastname, email, password} = req.body;
  const avatar = extractPicture(req);

  try {
    await dataServer.createUser({
      firstname,
      lastname,
      email,
      password,
      avatar,
    });

    res.redirect(`/login`);
  } catch (err) {
    if (err.isDBServer) {
      res.render(`login`, {
        activeForm: UserFormType.REGISTER,
        allErrors: err.errors,
        firstname,
        lastname,
        email,
        fileName: avatar.name,
        originalName: avatar.originalName,
      });
    } else {
      next(err);
    }
  }
});

module.exports = {
  registerRouter,
};
