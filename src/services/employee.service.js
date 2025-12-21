const axios = require('axios');

const BASE_URL = process.env.EMPLOYEE_SERVICE_BASE_URL;

if (!BASE_URL) {
    throw new Error('EMPLOYEE_SERVICE_BASE_URL not set');
}

async function validateEmployee(employeeCode) {
    const res = await axios.get(`${BASE_URL}/employees/${employeeCode}`);
    return res.data;
}

module.exports = { validateEmployee };
