const Router = require("koa-router");
const userCRUD = require("../controllers/userController");

const router = new Router();

router.get("/", async (ctx) => {
  // ctx.body = `Seu servidor esta rodando em http://localhost:${PORT}`; //http://localhost:3000/
  ctx.body = `Seu servidor esta rodando!`; //http://localhost:3000/
});

router.get("/users", userCRUD.getAllUsers);
router.get("/users/:name", userCRUD.getUser);
router.post("/users", userCRUD.createUser);
router.put("/users/:name", userCRUD.updateUser);
router.delete("/users/:name", userCRUD.deleteUser);

module.exports = router;
