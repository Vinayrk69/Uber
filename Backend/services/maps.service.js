const axios = require('axios');
const captainModel = require('../models/captain.model');

// Get coordinates from address
module.exports.getAddressCoordinate = async (address) => {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY; // Correct key
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            const location = response.data.results[0].geometry.location;
            return {
                ltd: location.lat,
                lng: location.lng
            };
        } else {
            console.error("Google Geocode Error:", response.data.status, response.data.error_message);
            throw new Error('Unable to fetch coordinates');
        }
    } catch (error) {
        console.error("Axios Error in getAddressCoordinate:", error.message);
        throw error;
    }
};

// Get distance and time between origin and destination
module.exports.getDistanceTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error('Origin and destination are required');
    }

    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            const element = response.data.rows[0].elements[0];
            if (element.status === 'ZERO_RESULTS') {
                console.error("Google Distance Matrix ZERO_RESULTS:", JSON.stringify(response.data, null, 2));
                throw new Error('No routes found between the given locations. Google returned ZERO_RESULTS.');
            }
            return element;
        } else {
            console.error("Google Distance Matrix Error: status not OK", {
                status: response.data.status,
                error_message: response.data.error_message,
                url,
                full_response: response.data
            });
            throw new Error(`Unable to fetch distance and time. Google status: ${response.data.status}. Error: ${response.data.error_message || 'No error message'}`);
        }
    } catch (err) {
        if (err.response) {
            // Axios error with response from Google
            console.error("Axios Error in getDistanceTime (Google API responded):", {
                url,
                status: err.response.status,
                data: err.response.data
            });
        } else {
            // Other errors
            console.error("Axios Error in getDistanceTime:", err.message, { url });
        }
        throw err;
    }
};

// Get autocomplete suggestions from Google Places API
module.exports.getAutoCompleteSuggestions = async (input) => {
    if (!input) {
        throw new Error('Input query is required');
    }

    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
        throw new Error('Google Maps API key is missing in backend environment. Please set GOOGLE_MAPS_API_KEY in your .env file.');
    }

    const url = `https://places.googleapis.com/v1/places:autocomplete?key=${apiKey}`;
    const data = {
        input: input,
        languageCode: "en"
    };

    try {
        const response = await axios.post(url, data, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (response.data && response.data.suggestions) {
            return response.data.suggestions
                .map(suggestion => {
                    const pred = suggestion.placePrediction;
                    // Try to get the most relevant text for display
                    return (
                        pred.structuredFormat?.mainText?.text ||
                        pred.text?.text ||
                        pred.text
                    );
                })
                .filter(Boolean);
        } else {
            console.error("Google Places Error: Full response:", JSON.stringify(response.data, null, 2));
            throw new Error('Unable to fetch suggestions');
        }
    } catch (err) {
        console.error("Axios Error in getAutoCompleteSuggestions:", err.message);
        throw err;
    }
};

// Get captains near a point within radius
module.exports.getCaptainsInTheRadius = async (lat, lng, radius) => {
    // Radius in kilometers
    try {
        const captains = await captainModel.find({
            location: {
                $geoWithin: {
                    $centerSphere: [[lat, lng], radius / 6371] // Earth radius ≈ 6371 km
                }
            }
        });
        return captains;
    } catch (err) {
        console.error("MongoDB Error in getCaptainsInTheRadius:", err.message);
        throw err;
    }
};
