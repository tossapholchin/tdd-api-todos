module.exports = (sequelize, DataTypes) => {
  let Todo = sequelize.define('todo',  {
    name: {
      type: DataTypes.STRING,
      field: 'name'
    },
    done: {
      type: DataTypes.BOOLEAN,
      field: 'done',
      default: false
    }
  },{
    tableName: 'todo'
  });

  return Todo;
};