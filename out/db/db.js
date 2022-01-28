"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'postgres',
    password: 'postgre',
    database: 'food_delivery_microservices_home',
    host: 'localhost',
    port: '5433'
});
exports.default = pool;
