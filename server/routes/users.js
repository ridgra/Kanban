const express = require('express');
const router = express.Router();

const UsersController = require('../controllers/usersController');

router.post('/login', UsersController.login);
router.post('/register', UsersController.register);
router.post('/googleSignIn', UsersController.googleSignIn);

module.exports = router;
