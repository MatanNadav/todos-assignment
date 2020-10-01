const { createPool } = require('mysql2/promise') 
const { dbKeys } = require('../config/config') 

module.exports = {connect}

let CONNECTION
async function connect() {
    if (CONNECTION) return CONNECTION
    console.log('creating connection')
    CONNECTION = await createPool({
        host: dbKeys.host,
        user: dbKeys.user,
        password: dbKeys.password,
        database: dbKeys.database,
        connectionLimit: 10
    });
    return CONNECTION;
}