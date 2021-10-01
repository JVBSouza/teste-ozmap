const Router = require('koa-router');
const userCRUD = require('../controllers/userController')

const router = new Router();

router.get("/users", userCRUD.getAllUsers);
router.get("/users/:id", userCRUD.getUser);
router.post("/users", userCRUD.createUser);
router.put("/users/:id", userCRUD.updateUser);
router.delete("/users/:id", userCRUD.deleteUser);

module.exports = router;