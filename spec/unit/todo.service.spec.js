const TodoDao = require('./../../dao/todoDao');
const TodoService = require('./../../service/todo.service');
const moment = require('moment');

describe('Todo Service', () => {
  describe('createTodo', () => {
    afterEach(() => {
      jasmine.clock().uninstall();
    });

    it('should call TodoDao.createTodo', async (done) => {
      let todoStub = getTodoStub();

      let todoDao = new TodoDao();
      spyOn(todoDao, 'createTodo').and.returnValue(Promise.resolve());
      let todoService = new TodoService(todoDao);
      try {
        await todoService.createTodo(todoStub);
        expect(todoDao.createTodo).toHaveBeenCalledWith(todoStub);
        done();
      } catch (error) {
        fail(error);
        done();
      }
      
    });

    it('should throw error when createTOdo before 8:00AM', async (done) => {
      let freezedTime = moment().hour(8).minute(0).second(0).millisecond(0);
      jasmine.clock().mockDate(freezedTime.toDate());

      let todoStub = getTodoStub();
      let todoDao = new TodoDao();
      let todoService = new TodoService(todoDao);

      spyOn(todoDao, 'createTodo').and.returnValue(Promise.resolve());

      try {
        await todoService.createTodo(todoStub);
        fail('expect createTodo to be failed');
        done();
      } catch (error) {
        expect(error).toEqual('Please create todo after 8:00AM');
        expect(todoDao.createTodo).not.toHaveBeenCalled();
        done();
      }
    });
  });

  function getTodoStub() {
    return {
      "name": "test todo",
      "done": false
    };
  }
});