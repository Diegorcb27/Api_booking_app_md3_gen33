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

test('POST/reviews debe crear un reviews', async () => {
    const body={
        rating: 3,
        comment: "test review hotel"
       
    }
const res=await request(app)
    .post("/reviews")
    .send(body)
    .set("Authorization", `Bearer ${token}`)
id=res.body.id;
console.log(res.body);
expect(res.status).toBe(201)
expect(res.body.comment).toBe(body.comment)
expect(res.body.id).toBeDefined()
});


// test('POST/ reviews debe retornar el elemento creado', async () => {
//     const body = {
//         rating: 5,
//         comment: "hola soy un test"
//     }
//     const res = await request(app).post('/reviews').send(body).set('Authorization', `Bearer ${token}`)
//     id = res.body.id
//     expect(res.status).toBe(201);
//     expect(res.body.id).toBeDefined();
//     expect(res.body.comment).toBe(body.comment);
// });

test('GET /reviews debe traer todos las reviews', async () => {
    const res= await request(app)
        .get("/reviews")

    expect(res.status).toBe(200);
    expect(res.body.results).toBeInstanceOf(Array)
});

test('PUT/reviews/:id debe modificar el elemento por id', async () => {
    const body={
        rating: 5
    }
    const res = await request(app).put(`/reviews/${id}`).send(body).set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200);
    expect(res.body.rating).toBe(body.rating)
});

test('DELETE/ reviews/:id eliminara los elemnetos segun su id', async () => {
    const res = await request(app).delete(`/reviews/${id}`).set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(204);
})
