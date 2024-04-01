const { getAll, create, getOne, remove, update, loggedUser, login } = require('../controllers/user.controllers');
const express = require('express');

const userRouter = express.Router();
const verifyJWT=require("../utils/verifyJWT")

userRouter.route('/users')
    .get(verifyJWT, getAll)
    .post(create);

userRouter.route('/users/:id')
    .get(verifyJWT, getOne)
    .delete(verifyJWT, remove)
    .put(verifyJWT, update);

userRouter.route("/users/login")
    .post(login)

module.exports = userRouter;