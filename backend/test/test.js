const app = require('../server');
const supertest = require('supertest');

const agent = supertest.agent(app);

let cookies = [];

describe("Test All Admin Routes", () => {
  it("it should test GET /admin", (done)  => {
    supertest(app)
      .get("/admin")
      .expect("teste admin")
      .end((err, res) => {
        if (err) done(err);
        done();
      });
  });

  it("it should test POST /admin/signup", (done) => {
    supertest(app)
      .post("/admin/signup")
      .send({username: "asd", password: "asd", fullname: "Asd", email: "asd@asd.com"})
      .expect("User validate")
      .end((err, res) => {
        if (err) done(err);
        console.log("----------------------------------------------------------------");
        const cookies = res.headers['set-cookie'][0].split(',').map(item => item.split(';')[0]);
        console.log(cookies);
        console.log("----------------------------------------------------------------");
        done();
      });
  });

  it("it should test POST /admin/login", (done) => {
    supertest(app)
      .post("/admin/login")
      .send({username: "asd", password: "asd", email: "asd@asd.com"})
      .expect(200)
      .end((err, res) => {
        if (err) done(err);
        console.log("----------------------------------------------------------------");
        cookies = res.headers['set-cookie'][0].split(',').map(item => item.split(';')[0]);
        console.log(cookies);
        console.log("----------------------------------------------------------------");
        done();
      });
  });

  it ("it should test POST /admin/register-event", (done) => {
    supertest(app)
      .post("/admin/register-event")
      .set("Cookie", cookies)
      .send({ title: "Stream - Harry Potter", description: "teste de cadastro de evento", date: "2021-11-13", time: "10h", units: "50"})
      .expect(200)
      .end((err, res) => {
        if (err) done(err);
        console.log("----------------------------------------------------------------");
        console.log(agent);
        console.log("----------------------------------------------------------------");
        done();
      });
  });
});
