const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config').sequelize;
const Todo = sequelize.import('./model/todo');

function init(service) {
  const app = express();
  app.use(bodyParser.json());

  app.get('/todos', (req, res) => {
    return sequelize.transaction(TransactionOptions, (t) => {
      return Todo.findAll({
        transaction: t
      });
    }).then((todos) => {
      res.send(todos);
    });
  });

  app.post('/todos', (req, res) => {
    let todo = req.body;
    return service.createTodo(todo).then((todo) => {
      res.send(todo);
    });
  });

  app.put('/todos/:id', (req, res) => {
    let todoId = parseInt(req.params.id);
    let newTodo = req.body
    return sequelize.transaction(TransactionOptions, (t) => {
      return Todo.findOne({
        where: {
          id: todoId
        },
        transaction: t
      }).then((oldTodo) => {
        if (oldTodo) {
          //let todo = todo.get({ plain: true });
          oldTodo = JSON.parse(JSON.stringify(oldTodo));
          oldTodo.name = newTodo.name;
          oldTodo.done = newTodo.done;
          return Todo.update(oldTodo, {
            where: {
              id: todoId
            },
            transaction: t
          });
        } else {
          return Promise.reject('Not found');
        }
      });
    }).then(() => {
      res.sendStatus(200);
    }).catch(() => {
      res.sendStatus(404);
    });
  });

  app.delete('/todos/:id', (req, res) => {
    let todoId = parseInt(req.params.id);
    return sequelize.transaction(TransactionOptions, (t) => {
      return Todo.destroy({
        where: {
          id: todoId
        },
        transaction: t
      });

    }).then(() => {
      res.sendStatus(200);
    }).catch(() => {
      res.sendStatus(404);
    });
  });

  return app;
}

module.exports = {
  app: init
}