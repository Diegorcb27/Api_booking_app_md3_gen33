const request = require('supertest');
const app = require('../app.js');



let token;
let id;

beforeAll(async()=>{
    const res = await request(app).post("/users/login").send({
        email: "test@gmail.com",
        password: "test1234"
    })
    token=res.body.token
})

test('GET /hotels', async () => {
    const res= await request(app)
        .get("/hotels")

    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array)
});

test('POST/ hotels', async () => {
    const body={
        name: "hotel quesadilla",
        decription: "blab bla",
        price: 24 ,
        address: "por ahi",
        lat: 23.44,
        lon: 45.99
    }
    const  res=await request(app)
    .post("/hotels")
    .send(body)
    .set("Authorization", `Bearer ${token}`)

    id=res.body.id

    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(body.name)


});

test('PUT/ hotels/:id debe retornar el elemento modificado por su id', async () => {
    const body = {
        address: "test"
    }
    const res = await request(app).put(`/hotels/${id}`).send(body).set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200);
    expect(res.body.address).toBe(body.address);
})

test('DELETE /hotels/:id debe eliminar un hotel', async () => {
   
    const res = await request(app)
        .delete(`/hotels/${id}`)
        .set("Authorization", `Bearer ${token}`)
        expect(res.status).toBe(204);
});

