const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'postgres',
    password: 'postgre',
    database: 'food_delivery_microservices_home',
    host: 'localhost',
    port: '5433'
})

export default pool;