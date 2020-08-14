const { Category } = require('../models');

class CategoriesController {
  static async findAll(req, res, next) {
    try {
      const categories = await Category.findAll();
      res.status(200).json({ categories });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = CategoriesController;
