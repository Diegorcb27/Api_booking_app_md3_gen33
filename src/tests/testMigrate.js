const sequelize = require('../utils/connection');
const request = require('supertest');
const app = require('../app.js');
const User = require('../models/User');

const main = async() => {
    try{
        // Acciones a ejecutar antes de los tests
        sequelize.sync();
        const user={           //se crea un uuario ante de todos los test para poder usar lo tokens
            firstName: "test",
            lastName: "test",
            email: "test@gmail.com",
            password: "test1234",
            gender: "OTHER"
        }

        const userTest=await User.findOne({where: {email: "test@gmail.com"}})
        if(!userTest){
            await request(app).post("/users").send(user)   //i el usuario no exite envia esto
        }

        await request(app).post("/users").send(user)
        
        process.exit();
    } catch(error){
        console.log(error);
    }
}

main();
