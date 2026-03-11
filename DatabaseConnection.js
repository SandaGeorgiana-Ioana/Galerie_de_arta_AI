const mysql = require('mysql2');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'art_gallery',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

/*
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err.stack);
        return;
    }
    console.log('Connected to MySQL as ID', db.threadId);
});

const net = require('net');
net.createConnection(3306, '192.168.10.130')
    .on('connect', () => console.log('MySQL port open'))
    .on('error', () => console.error('Cannot connect to MySQL server'));
*/
module.exports = db;
