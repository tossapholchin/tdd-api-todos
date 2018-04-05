const sequelize = require('../config').sequelize;
const TransactionOptions = require('../config').transactionOptions;
const TodoDao = require('../dao/todoDao');
const moment = require('moment');

class TodoService {
  constructor(todoDao) {
    this.dao = todoDao
  }

  createTodo(todo) {
    let cutOffTime = moment().hour(8).minute(0).second(0).millisecond(0);
    if (moment().isAfter(cutOffTime)) {
      return this.dao.createTodo(todo);
    } else {
      return Promise.reject('Please create todo after 8:00AM');
    }
    
  }
}

module.exports = TodoService;