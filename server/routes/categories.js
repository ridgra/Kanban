const express = require('express');
const router = express.Router();

const CategoriesController = require('../controllers/categoriesController');

router.get('/', CategoriesController.findAll);
router.post('/', CategoriesController.create);
router.put('/:id', CategoriesController.update);
router.delete('/:id', CategoriesController.delete);


module.exports = router;
