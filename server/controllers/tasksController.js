const { Task, User } = require('../models');

class TasksController {
  static async findAll(req, res, next) {
    try {
      // const  UserId  = req.userData.id;
      const tasks = await Task.findAll({
        include: {
          model: User,
          attributes: ['email'],
        },
        order: [['updatedAt', 'desc']],
      });
      res.status(200).json({ tasks });
    } catch (err) {
      next(err);
    }
  }
  static async findOne(req, res, next) {
    try {
      // const { UserId } = req.userData.id;
      const { id } = req.params;
      const task = await Task.findByPk(id);
      res.status(200).json({ task });
    } catch (err) {
      next(err);
    }
  }
  static async create(req, res, next) {
    try {
      const { title, CategoryId } = req.body;
      const UserId = req.userData.id;
      const task = await Task.create({ title, CategoryId, UserId });
      res.status(201).json({ task });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  static async update(req, res, next) {
    try {
      const { title } = req.body;
      const { id } = req.params;
      const task = await Task.update(
        { title },
        {
          where: {
            id,
          },
          returning: true,
        }
      );
      res.status(200).json({ task });
    } catch (err) {
      next(err);
    }
  }

  static async updateCategory(req, res, next) {
    try {
      const { CategoryId } = req.body;
      const { id } = req.params;
      console.log(CategoryId, id, '<<<<');
      const task = await Task.update(
        { CategoryId },
        {
          where: {
            id,
          },
          returning: true,
        }
      );
      res.status(200).json({ task });
    } catch (err) {
      next(err);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const task = await Task.destroy(
        {
          where: {
            id,
          },
        },
        { returning: true }
      );
      res.status(200).json({ task });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = TasksController;
