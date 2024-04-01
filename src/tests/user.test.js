const request = require('supertest');
const app = require('../app.js');


let id;
let token;


test('POST/users debe crear un usuarios', async () => {
    const body={
        firstName: "Luis",
        lastName: "Catalan",
        email: "luis@gmail.com",
        password: "luis1234",
        gender: "MALE"
    }
    const res=await request(app)
        .post("/users")
        .send(body)
    id=res.body.id;
    expect(res.status).toBe(201)
    expect(res.body.name).toBe(body.name)
    expect(res.body.id).toBeDefined()
});

test('POST /users/login debe ingresar el usuario logueado', async () => {
    const body={
        email: "luis@gmail.com",
        password: "luis1234"
    }
        const res= await request(app)
            .post("/users/login")
            .send(body)
         token=res.body.token
    expect(res.status).toBe(200)
    expect(res.body.token).toBeDefined()
    expect(res.body.user.email).toBe(body.email)

});

test('GET/users debe traer todos los usuarios', async () => {
    const res=await request(app)
        .get("/users")
        .set("Authorization", `Bearer ${token}`)

        console.log(res.body);
    expect(res.status).toBe(200)
    expect(res.body).toBeInstanceOf(Array)
});



test('PUT /users/:id debe actualizar un usuario', async () => {
    const body={
        firstName: "Luis update"
    }
    const res= await request(app)
        .put(`/users/${id}`)
        .send(body)
        .set("Authorization", `Bearer ${token}`)
        expect(res.status).toBe(200)
        expect(res.body.firstName).toBe(body.firstName)
});



test('POST /users/login con credenciales invalidas debe enviar error', async () => {

    const body={
        email: "incorrecto@gmail.com",
        password: "incorrecto1234"
    }

    const res=await request(app)
        .post("/users/login")
        .send(body)

    expect(res.status).toBe(401)
});

test('DELETE /users/:id debe eliminar un usuario ', async () => {
   
    const res = await request(app)
        .delete(`/users/${id}`)
        .set("Authorization", `Bearer ${token}`)
        expect(res.status).toBe(204);
});