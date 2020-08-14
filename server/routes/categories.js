const express = require('express');
const router = express.Router();

const CategoriesController = require('../controllers/categoriesController');

router.get('/', CategoriesController.findAll);
// router.post('/register', CategoriesController.register);

module.exports = router;
