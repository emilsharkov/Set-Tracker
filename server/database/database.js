const Pool = require('pg').Pool
const ckey = require('ckey')

const pool = new Pool({
    user: ckey.DB_USER || 'docker',
    password: ckey.DB_PASSWORD || 'docker',
    host: ckey.DB_HOST || "database",
    port: ckey.DB_PORT || 4000,
    database: ckey.DB_DATABASE || "docker"
})

module.exports = pool;