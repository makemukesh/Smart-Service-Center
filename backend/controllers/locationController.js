const locationData = require('../data/locationData');

// @desc    Get all states
// @route   GET /api/locations/states
exports.getStates = (req, res) => {
    const states = Object.keys(locationData).sort();
    res.status(200).json({ success: true, states });
};

// @desc    Get cities for a state
// @route   GET /api/locations/cities?state=X
exports.getCities = (req, res) => {
    const { state } = req.query;
    if (!state || !locationData[state]) {
        return res.status(200).json({ success: true, cities: [] });
    }
    const cities = Object.keys(locationData[state]).sort();
    res.status(200).json({ success: true, cities });
};

// @desc    Get talukas for a state and city
// @route   GET /api/locations/talukas?state=X&city=Y
exports.getTalukas = (req, res) => {
    const { state, city } = req.query;
    if (!state || !city || !locationData[state]?.[city]) {
        return res.status(200).json({ success: true, talukas: [] });
    }
    const talukas = Object.keys(locationData[state][city]).sort();
    res.status(200).json({ success: true, talukas });
};

// @desc    Get villages for a state, city, and taluka
// @route   GET /api/locations/villages?state=X&city=Y&taluka=Z
exports.getVillages = (req, res) => {
    const { state, city, taluka } = req.query;
    if (!state || !city || !taluka || !locationData[state]?.[city]?.[taluka]) {
        return res.status(200).json({ success: true, villages: [] });
    }
    const villages = [...locationData[state][city][taluka]].sort();
    res.status(200).json({ success: true, villages });
};
