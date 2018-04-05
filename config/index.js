const Sequelize = require('sequelize');

module.exports = {
  sequelize: new Sequelize('mysql://root:password@127.0.0.1:3306/todo', {
    timezone: '+07:00',
    pool: {
      max: 100,
      min: 10,
      idle: 10000
    }
  }),
  transactionOptions: {
    isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED,
    autocommit: false
  }
}