const app = require('./app')

const sequelize = require('./config/db')

sequelize
    .sync()
    .then(()=>{
        console.log("Database postgreSQL connected!!!");
        const port = process.env.port || 3000
        app.listen(port, () => console.log('Server running 3000'))
    })

