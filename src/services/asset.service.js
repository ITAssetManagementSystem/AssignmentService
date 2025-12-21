const axios = require('axios');

const BASE_URL = process.env.ASSET_SERVICE_BASE_URL;

if (!BASE_URL) {
    throw new Error('ASSET_SERVICE_BASE_URL not set');
}

async function validateAsset(assetId) {
    const res = await axios.get(`${BASE_URL}/assets/${assetId}`);
    return res.data;
}

async function markAssetAssigned(assetId) {
    await axios.put(`${BASE_URL}/assets/${assetId}/assign`);
}

async function markAssetReturned(assetId) {
    await axios.put(`${BASE_URL}/assets/${assetId}/return`);
}

module.exports = {
    validateAsset,
    markAssetAssigned,
    markAssetReturned
};
