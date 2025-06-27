const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const mapController = require('../controllers/map.controller');
const { query } = require('express-validator');

// Route to get coordinates for an address
router.get('/get-coordinates',
    query('address')
        .isString()
        .isLength({ min: 3 })
        .withMessage('Address must be at least 3 characters long'),
    authMiddleware.authUser,
    mapController.getCoordinates
);

// Route to get distance and time between two locations
router.get('/get-distance-time',
    query('origin')
        .isString()
        .isLength({ min: 3 })
        .withMessage('Origin must be at least 3 characters long'),
    query('destination')
        .isString()
        .isLength({ min: 3 })
        .withMessage('Destination must be at least 3 characters long'),
    authMiddleware.authUser,
    mapController.getDistanceTime
);

// Route to get autocomplete suggestions
// Changed validation to allow 1+ characters instead of 3+
router.get('/get-suggestions',
    query('input')
        .isString()
        .isLength({ min: 1 })
        .withMessage('Input must be at least 1 character long')
        .trim(), // Remove extra whitespace
    authMiddleware.authUser, // Remove this line temporarily if testing without auth
    mapController.getAutoCompleteSuggestions
);

// Alternative route for testing without authentication (uncomment if needed)
/*
router.get('/get-suggestions-test',
    query('input')
        .isString()
        .isLength({ min: 1 })
        .withMessage('Input must be at least 1 character long')
        .trim(),
    mapController.getAutoCompleteSuggestions
);
*/

module.exports = router;