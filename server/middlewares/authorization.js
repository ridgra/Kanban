const { Task } = require('../models');

async function authorization(req, res, next) {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id);
    if (!task) throw { msg: 'Task is not found' };
    if (task.UserId == req.userData.id) next();
    else throw { msg: 'Sorry, access denied' };
  } catch (err) {
    next(err)
  }
}

module.exports = authorization;
