const Pool = require('pg').Pool

const pool = new Pool({
    user: 'docker',
    password: 'docker',
    host: "database",
    port: 4000,
    database: "docker"
})

module.exports = pool;