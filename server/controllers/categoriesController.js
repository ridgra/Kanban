const { Category } = require('../models');

class CategoriesController {
  static async findAll(req, res, next) {
    try {
      const categories = await Category.findAll({
        order: [['id']],
      });
      res.status(200).json({ categories });
    } catch (err) {
      next(err);
    }
  }

  static async create(req, res, next) {
    try {
      const { name } = req.body;
      const categories = await Category.create({ name });
      res.status(201).json({ categories });
    } catch (err) {
      next(err);
    }
  }
  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      console.log(id, name, '<<');
      const categories = await Category.update(
        { name },
        {
          where: {
            id,
          },
          returning: true,
        }
      );
      res.status(200).json({ categories });
      next(categories);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const categories = await Category.destroy({ where: { id } });
      res.status(200).json({ categories });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = CategoriesController;
