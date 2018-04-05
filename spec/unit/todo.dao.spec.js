const sequelize = require('../../config').sequelize;
const Todo = sequelize.import('../../model/todo');
const TodoDao = require('../../dao/todoDao');

describe('Todo DAO', () => {
  describe('createTodo', () => {
    it('should createTodo', (done) => {
      spyOn(sequelize, 'transaction').and.callFake((option, callback) => {
        return callback('t');
      });

      spyOn(Todo, 'create').and.returnValue(Promise.resolve());

      let stubTodo = {
        "name": "test todo",
        "done": false
      };

      let todoDao = new TodoDao();
      todoDao.createTodo(stubTodo).then(() => {
        expect(Todo.create).toHaveBeenCalledWith(stubTodo, {
          transaction: 't'
        });
        done();
      }).catch((err) => {
        fail(err);
        done();
      });
      
    });
  });
});