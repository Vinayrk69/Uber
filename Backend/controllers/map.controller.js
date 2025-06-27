const mapService = require('../services/maps.service');
const { validationResult } = require('express-validator');

// GET coordinates
module.exports.getCoordinates = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { address } = req.query;

    try {
        const coordinates = await mapService.getAddressCoordinate(address);
        res.status(200).json(coordinates);
    } catch (error) {
        console.error("Error fetching coordinates:", error.message);
        res.status(404).json({ message: 'Coordinates not found' });
    }
};

// GET distance & time
module.exports.getDistanceTime = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { origin, destination } = req.query;

        const distanceTime = await mapService.getDistanceTime(origin, destination);
        res.status(200).json(distanceTime);
    } catch (err) {
        console.error("Error getting distance/time:", err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// GET autocomplete suggestions
module.exports.getAutoCompleteSuggestions = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { input } = req.query;

        if (!input || input.trim() === '') {
            return res.status(400).json({ message: "Input is required for suggestions" });
        }

        const suggestions = await mapService.getAutoCompleteSuggestions(input);

        res.status(200).json(suggestions);
    } catch (err) {
        console.error("Error in getAutoCompleteSuggestions:", err.message);
        res.status(500).json({ message: err.message });
    }
};
