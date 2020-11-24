const Router = require('koa-router');
const { UserController } = require('../controller');

const user = UserController();
const router = new Router();

router.post('/', user.create);
router.post('/login', user.login);

module.exports = router;
