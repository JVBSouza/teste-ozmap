const app = require("../src/index.js");
const assert = require("assert");
const chai = require("chai");
const chaiHttp = require("chai-http");
const chaiJson = require("chai-json-schema");

chai.use(chaiHttp);
chai.use(chaiJson);
const expect = chai.expect;

const userSchema = require("./schemas/user.json");

describe("Testes da aplicaçao", () => {
  it("o servidor esta online", function (done) {
    chai
      .request(app)
      .get("/")
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        done();
      });
  });

  it("deveria ser uma lista vazia de usuarios", function (done) {
    chai
      .request(app)
      .get("/users")
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.eql([]);
        done();
      });
  });

  it("deveria negar um usuario menor de idade", function (done) {
    chai
      .request(app)
      .post("/users")
      .send({ name: "user", email: "jusr@email.com", age: 17 })
      .end(function (err, res) {
        expect(res.text).to.be.equal("Underage user not allowed");
        expect(res).to.have.status(400);
        expect(res.body).to.be.jsonSchema({});
        done();
      });
  });

  it("deveria criar o usuario raupp", function (done) {
    chai
      .request(app)
      .post("/users")
      .send({ name: "raupp", email: "jose.raupp@devoz.com.br", age: 35 })
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(201);
        done();
      });
  });

  it("o usuario naoExiste não existe no sistema", function (done) {
    chai
      .request(app)
      .get("/users/naoExiste")
      .end(function (err, res) {
        console.log(res.body);
        expect(res.text).to.be.equal("User not found");
        expect(res).to.have.status(404);
        expect(res.body).to.be.jsonSchema({});
        done();
      });
  });

  it("o usuario raupp existe e é valido", function (done) {
    chai
      .request(app)
      .get("/users/raupp")
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.jsonSchema(userSchema);
        done();
      });
  });

  it("o usuario raupp é modificado", function (done) {
    chai
      .request(app)
      .put("/users/raupp")
      .send({ name: "raupp", email: "email@devoz.com.br", age: 35 })
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.text).to.be.eql("User updated");
        done();
      });
  });

  it("deveria excluir o usuario raupp", function (done) {
    chai
      .request(app)
      .delete("/users/raupp")
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(204);
        expect(res.body).to.eql({});
        done();
      });
  });

  it("o usuario raupp não deve existir mais no sistema", function (done) {
    chai
      .request(app)
      .get("/users/raupp")
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(404);
        expect(res.body).to.be.jsonSchema({});
        done();
      });
  });

  it("deveria ser uma lista com pelomenos 5 usuarios", function (done) {
    for (let i = 0; i < 5; i++) {
      chai
        .request(app)
        .post("/users")
        .send({ name: "user", email: "user@email.com", age: 20 })
        .end(function (err, res) {});
    }
    chai
      .request(app)
      .get("/users")
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.length).to.be.at.least(5);
        done();
      });
  });
});
