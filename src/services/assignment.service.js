const pool = require('../config/db');
const { v4: uuidv4 } = require('uuid');

async function createAssignment(assetId, employeeCode) {
    const id = uuidv4();

    await pool.query(
        `INSERT INTO asset_assignments
     (id, asset_id, employee_code, assigned_at)
     VALUES ($1, $2, $3, NOW())`,
        [id, assetId, employeeCode]
    );

    return id;
}

async function findByEmployee(employeeCode) {
    const res = await pool.query(
        'SELECT * FROM asset_assignments WHERE employee_code=$1',
        [employeeCode]
    );
    return res.rows;
}

async function findByAsset(assetId) {
    const res = await pool.query(
        'SELECT * FROM asset_assignments WHERE asset_id=$1',
        [assetId]
    );
    return res.rows;
}

async function returnAsset(id) {
    await pool.query(
        'UPDATE asset_assignments SET returned_at=NOW() WHERE id=$1',
        [id]
    );
}

async function findAll() {
    const res = await pool.query('SELECT * FROM asset_assignments');
    return res.rows;
}

module.exports = {
    createAssignment,
    findByEmployee,
    findByAsset,
    returnAsset,
    findAll
};
