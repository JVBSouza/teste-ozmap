const Router = require('koa-router');
const userCRUD = require('../controllers/userController')

const router = new Router();

router.get('/', async (ctx) => {
    // ctx.body = `Seu servidor esta rodando em http://localhost:${PORT}`; //http://localhost:3000/
    ctx.body = `Seu servidor esta rodando!`; //http://localhost:3000/
});

router.get("/users", userCRUD.getAllUsers);
router.get("/users/:name", userCRUD.getUser);
// router.get("/users/:name", userCRUD.getUserByName);
router.post("/users", userCRUD.createUser);
router.put("/users/:id", userCRUD.updateUser);
router.delete("/users/:id", userCRUD.deleteUser);

module.exports = router;