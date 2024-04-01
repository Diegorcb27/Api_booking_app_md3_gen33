const request = require('supertest');
const app = require('../app.js');


let id;
let token;

beforeAll(async()=>{
    const res=await request(app).post("/users/login").send({
        email: "test@gmail.com",
        password: "test1234"
    })
    token=res.body.token
})


test('GET /bookings', async () => {
    const res=await request(app)
        .get("/bookings")
        .set("Authorization", `Bearer ${token}`)
       

    expect(res.status).toBe(200)
    expect(res.body).toBeInstanceOf(Array)
});

test('POST /bookings', async () => {
    const body={
        checkIn: "2024-5-15",
        checkOut: "2024-5-16"
    }
    const res=await request(app)
        .post("/bookings")
        .send(body)
        .set("Authorization", `Bearer ${token}`)

    id=res.body.id
    expect(res.status).toBe(201)
    expect(res.body.name).toBe(body.name)
    expect(res.body.id).toBeDefined()

});

test('PUT/ bookings/:id debe retornar el elemento modificado por su id', async () => {
    const body = {
        checkIn: "2020-06-01"
    }
    const res = await request(app).put(`/bookings/${id}`).send(body).set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200);
})

test('DELETE /bookings/:id debe eliminar una ciudad ', async () => {
   
    const res = await request(app)
        .delete(`/bookings/${id}`)
        .set("Authorization", `Bearer ${token}`)
        expect(res.status).toBe(204);
});
