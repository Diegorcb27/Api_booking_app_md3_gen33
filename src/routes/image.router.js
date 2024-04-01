const { getAll, create, getOne, remove, update } = require('../controllers/image.controllers');
const express = require('express');

const imageRouter = express.Router();
const verifyJWT=require("../utils/verifyJWT");
const upload = require('../utils/multer');

imageRouter.route('/images')
    .get(verifyJWT, getAll)
    .post(upload.single("image"), verifyJWT, create);  //el nombre del image es lo que pasaremos en el body en params, en form data

imageRouter.route('/images/:id')
    .delete(verifyJWT, remove)
    

module.exports = imageRouter;