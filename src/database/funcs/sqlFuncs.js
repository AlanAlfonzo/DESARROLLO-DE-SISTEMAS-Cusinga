const sequelize = require('./config/mySql.js')

async function initSqlDB(){
    await sequelize.authenticate()
    //await sequelize.sync({ alter: true })
}
