const app = require('./app').app;
const TodoDao = require('./dao/todoDao');
const TodoService = require('./service/todo.service');

let todoDao = new TodoDao();
let todoService = new TodoService(todoDao);

app(todoService).listen(3000, () => {
  console.log('Star server at port 3000');
});