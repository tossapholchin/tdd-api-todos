const TodoDao = require('./../../dao/todoDao');
const TodoService = require('./../../service/todo.service');
const supertest = require('supertest');
const app = require('../../app').app;

describe('todo route', () => {
  describe('create todo', () => {
    it('should call todoService.createTodo', (done) => {
      let todoResult = {
        "name": "test todo"
      };

      let todoStub = {
        "name": "test todo",
        "done": false
      }
      let todoDao = new TodoDao();
      let todoService = new TodoService(todoDao);
      spyOn(todoService, 'createTodo').and.returnValue(Promise.resolve(todoResult));

      supertest(app(todoService)).post('/todos')
        .send(todoStub).end((err, res) => {
          expect(res.status).toEqual(200);
          expect(res.body).toEqual(todoResult);
          expect(todoService.createTodo).toHaveBeenCalledWith(todoStub);
          done();
        });
    });
  });
});
