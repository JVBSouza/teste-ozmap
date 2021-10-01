//Voce deve rodar os testes usando:  npm test
//Para testar a aplicação, rode: npm run dev

//mais infos
//https://github.com/ZijianHe/koa-router

// todas as configuraçoes devem ser passadas via environment variables
const PORT = process.env.PORT || 3000;

const Koa = require('koa');
const Router = require('koa-router');
const cors = require("@koa/cors");
const sequelize = require("./database/database");
const bodyParser = require("koa-bodyparser");
const router = require("./routes/routes.js")

sequelize.sync().then(() => console.log("db is ready"));

const koa = new Koa();
koa
  .use(bodyParser())
  .use(cors())
  .use(router.routes())
  .use(router.allowedMethods());

const server = koa.listen(PORT);
module.exports = server;