const app = require('../server');
const supertest = require('supertest');

const assert = require('assert');

describe("GET /admin", ()  => {
  it("it should has 'teste admin' message", (done)  => {
    supertest(app)
      .get("/admin")
      .expect("teste admin")
      .end((err, res) => {
        if (err) done(err);
        done();
      });
  });
});

describe("POST /admin/signup", () => {
  it("it should return 'User validate'", (done) => {
    supertest(app)
      .post("/admin/signup")
      .send({username: "asd", password: "asd", fullname: "Asd", email: "asd@asd.com"})
      .expect("User validate")
      .end((err, res) => {
        if (err) done(err);
        done();
      });
  });
});

describe("POST /admin/login", () => {
  it("it should return 'User validate'", (done) => {
    supertest(app)
      .post("/admin/signup")
      .send({username: "asd", password: "asd", fullname: "Asd", email: "asd@asd.com"})
      .expect("User validate")
      .end((err, res) => {
        if (err) done(err);
        done();
      });
  });
});