const catchError = require('../utils/catchError');
const Review = require('../models/Review');
const User = require('../models/User');
const Hotel = require('../models/Hotel');

const getAll = catchError(async(req, res) => {
    const{hotelId, userId, offset, perPage}=req.query //filtrado de los parametros
    const where={}
    if(hotelId) where.hotelId=hotelId
    if(userId) where.userId=userId
    
    const results = await Review.findAll({include:[{
        model: User,
        attributes: {
            exclude:["password"] //esto sirve para excluir la contraseña del modelo User
        }
    }, Hotel], where, offset: offset, limit: perPage});  //el offset es desde donde va a empezar y  el limit es cuanto mostrara
    const total=await Review.count({where: where})  //me muestra la cantidad de reviews que hay
    return res.json({total, results});
});

const create = catchError(async(req, res) => {
    const userLog=req.user.id;
    console.log(userLog);
    if(userLog){
        const result = await Review.create({...req.body, userId: userLog});
        return res.status(201).json(result);
    }
    
   
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Review.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await Review.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const {rating, comment}=req.body
    const result = await Review.update(
        {rating, comment},
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update
}