const locationData = require('../data/locationData');

// @desc    Get all cities (districts of Gujarat)
// @route   GET /api/locations/cities
exports.getCities = (req, res) => {
    const cities = Object.keys(locationData).sort();
    res.status(200).json({ success: true, cities });
};

// @desc    Get talukas for a city
// @route   GET /api/locations/talukas?city=X
exports.getTalukas = (req, res) => {
    const { city } = req.query;
    if (!city || !locationData[city]) {
        return res.status(200).json({ success: true, talukas: [] });
    }
    const talukas = Object.keys(locationData[city]).sort();
    res.status(200).json({ success: true, talukas });
};

// @desc    Get villages for a city and taluka
// @route   GET /api/locations/villages?city=X&taluka=Y
exports.getVillages = (req, res) => {
    const { city, taluka } = req.query;
    if (!city || !taluka || !locationData[city]?.[taluka]) {
        return res.status(200).json({ success: true, villages: [] });
    }
    const villages = [...locationData[city][taluka]].sort();
    res.status(200).json({ success: true, villages });
};
