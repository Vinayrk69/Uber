const userModel = require("../models/user.model");

module.exports.createUser = async ({
    firstname, lastname, email,password
}) =>{
    if(!firstname || !email || !password){
        throw new Error('Please provide all required fields');
    }
    const user=userModel.create({
        fullnmae:{
            firstname,
            lastname
        },
        email,
        password:password,
    })
    return user;

}