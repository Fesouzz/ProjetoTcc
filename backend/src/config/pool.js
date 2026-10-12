const mysql = require("mysql2/promise");

const pool = mysql.createPool({
    host: process.env.DB_HOST || "localhost", 
    user: process.env.DB_USER || "root", 
    password: process.env.DB_PASSWORD || "SQl-1860@#", 
    database: process.env.DB_NAME || "comuna",
    dateStrings: true,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;
