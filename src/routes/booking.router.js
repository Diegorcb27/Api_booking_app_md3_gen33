const { getAll, create, getOne, remove, update } = require('../controllers/booking.controllers');
const express = require('express');

const bookingRouter = express.Router();
const verifyJWT=require("../utils/verifyJWT")

bookingRouter.route('/bookings')
    .get(verifyJWT, getAll)
    .post(verifyJWT, create);

bookingRouter.route('/bookings/:id')
    .get(verifyJWT, getOne)
    .delete(verifyJWT, remove)
    .put(verifyJWT, update)

module.exports = bookingRouter;