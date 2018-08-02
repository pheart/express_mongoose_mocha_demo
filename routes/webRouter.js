const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user');
const IndexController = require('../controllers');
const AuthMiddlewares = require('../middlewares/auth');


router.get('/user/login', UserController.loginPage);
router.get('/user/register', UserController.registerPage);
router.get('/user/logout', UserController.logout);
router.get('/', AuthMiddlewares, IndexController.index);
router.post('/user/register', UserController.register);
router.post('/user/login', UserController.login);


module.exports = router;




// router.all
// router.METHOD
// router.param()
// router.router().all().put