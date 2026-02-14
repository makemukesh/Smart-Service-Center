const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
    getMyVehicles, getVehicle, addVehicle, updateVehicle, deleteVehicle
} = require('../controllers/vehicleController');

router.use(protect);

router.route('/')
    .get(getMyVehicles)
    .post(addVehicle);

router.route('/:id')
    .get(getVehicle)
    .put(updateVehicle)
    .delete(deleteVehicle);

module.exports = router;
