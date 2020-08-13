const express = require('express');
const router = express.Router()

const users = require('./users');
const tasks = require('./tasks');
const authentication = require('../middlewares/authentication');

router.use('/', users);

router.use(authentication)

router.use('/tasks', tasks)

module.exports = router