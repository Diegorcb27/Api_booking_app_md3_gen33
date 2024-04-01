const { getAll, create, getOne, remove, update } = require('../controllers/hotel.controllers');
const express = require('express');

const hotelRouter = express.Router();
const verifyJWT=require("../utils/verifyJWT")

hotelRouter.route('/hotels')
    .get(getAll)
    .post(verifyJWT, create);

hotelRouter.route('/hotels/:id')
    .get(getOne)
    .delete(verifyJWT, remove)
    .put(verifyJWT, update);

module.exports = hotelRouter;