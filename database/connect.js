"use strict";
const mariadb = require('mariadb');
const pool = mariadb.createPool({
     host: process.env.DB_HOST || 'localhost',
     port: process.env.DB_PORT || 3306,
     user: process.env.DB_USER, 
     password: process.env.DB_PASS,
     connectionLimit: process.env.DB_CON_LIMIT || 5
});
checkConncetion()
async function checkConncetion() {
    let conn
    try {
        conn = await pool.getConnection()
    } catch (error) {
        throw error
    }finally{
        if (conn){
            conn.end();
        }
    }
}
module.exports = pool;