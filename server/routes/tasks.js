const express = require('express');
const router = express.Router();

const TasksController = require('../controllers/tasksController');
const authorization = require('../middlewares/authorization');

router.get('/', TasksController.findAll);
router.get('/:id', TasksController.findOne);
router.post('/', TasksController.create);
router.put('/:id', authorization, TasksController.update);
router.put('/:id/cat', authorization, TasksController.updateCategory);
router.delete('/:id', authorization, TasksController.delete);

module.exports = router;
