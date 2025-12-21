const { Pool } = require('pg');

if (!process.env.ASSIGNMENT_DB_URL) {
    throw new Error('ASSIGNMENT_DB_URL is not set');
}

const pool = new Pool({
    connectionString: process.env.ASSIGNMENT_DB_URL
});

module.exports = pool;
