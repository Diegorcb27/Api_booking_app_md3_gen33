const { getAll, create, getOne, remove, update } = require('../controllers/review.controllers');
const express = require('express');

const reviewRouter = express.Router();
const verifyJWT=require("../utils/verifyJWT")

reviewRouter.route('/reviews')
    .get(getAll)
    .post(verifyJWT, create);

reviewRouter.route('/reviews/:id')
    .get(getOne)
    .delete(verifyJWT, remove)
    .put(verifyJWT, update);

module.exports = reviewRouter;