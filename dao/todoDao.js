const sequelize = require('../config').sequelize;
const TransactionOptions = require('../config').transactionOptions;
const Todo = sequelize.import('../model/todo');

class TodoDao {
  createTodo(todo) {
    return sequelize.transaction(TransactionOptions, (t) => {
      return Todo.create(todo, {
        transaction: t
      });
    })
  }
}

module.exports = TodoDao;