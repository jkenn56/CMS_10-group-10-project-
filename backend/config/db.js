const mysql = require('mysql2/promise');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'CMS_10',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

db.getConnection().then(() => {
    console.log('Database connected');
}).catch(err => {
    console.log('Database connection failed: ' + err.message);
});

module.exports = db;