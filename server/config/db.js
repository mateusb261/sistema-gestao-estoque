// /config/db.js
const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',         // substitua pelo seu usuário
  password: '<<senha>>', // substitua pela sua senha
  database: 'sistemage'
});

module.exports = pool.promise(); // Usando promise para evitar callbacks
