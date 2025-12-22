const pool = require('../config/db');
const assignmentService = require('../services/assignment.service');
const assetService = require('../services/asset.service');
const employeeService = require('../services/employee.service');

async function initDb(req, res) {
    await pool.query(`
    CREATE TABLE IF NOT EXISTS asset_assignments (
      id UUID PRIMARY KEY,
      asset_id INTEGER NOT NULL,
      employee_code VARCHAR(50) NOT NULL,
      assigned_at TIMESTAMP NOT NULL,
      returned_at TIMESTAMP
    )
  `);

    res.send('Assignment DB initialized');
}

async function assignAsset(req, res) {
    const { assetId, employeeCode } = req.body;

    await assetService.validateAsset(assetId);
    await employeeService.validateEmployee(employeeCode);

    const id = await assignmentService.createAssignment(assetId, employeeCode);

    try {
        await assetService.markAssetAssigned(assetId);
    } catch (err) {
        // Log and return success for the assignment creation — asset status can be fixed later
        console.error('Failed to mark asset assigned:', err && err.message ? err.message : err);
        return res.status(201).json({ assignmentId: id, warning: 'Failed to mark asset assigned' });
    }

    res.status(201).json({ assignmentId: id });
}

async function getByEmployee(req, res) {
    const rows = await assignmentService.findByEmployee(req.params.employeeCode);
    res.json(rows);
}

async function getByAsset(req, res) {
    const rows = await assignmentService.findByAsset(req.params.assetId);
    res.json(rows);
}

async function returnAsset(req, res) {
    await assignmentService.returnAsset(req.params.id);
    res.send('Asset returned');
}

async function getAll(req, res) {
    const rows = await assignmentService.findAll();
    res.json(rows);
}

module.exports = {
    initDb,
    assignAsset,
    getByEmployee,
    getByAsset,
    returnAsset,
    getAll
};
