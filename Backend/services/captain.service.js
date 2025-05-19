const captainModel = require('../models/captain.model');

module.exports.createCaptain = async ({
    firstname, lastname, email, password, // <-- fixed spelling here
    color, plate, capacity, vehicleType,lat,lng
}) => {
    if (!firstname || !email || !password || !color || !plate || !capacity || !vehicleType) {
        throw new Error('Please provide all required fields');
    }

    const captain = await captainModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password, // <-- now it matches the input
        vehicle: {
            color,
            plate,
            capacity,
            vehicleType
        },
        location: {
            lat,
            lng
        }
    });

    return captain;
}
