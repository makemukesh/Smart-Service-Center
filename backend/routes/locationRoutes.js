const express = require('express');
const router = express.Router();
const {
    getCities,
    getTalukas,
    getVillages
} = require('../controllers/locationController');

// All routes are public (no auth required)
router.get('/cities', getCities);
router.get('/talukas', getTalukas);
router.get('/villages', getVillages);

module.exports = router;
