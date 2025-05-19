const mongoose=require('mongoose');
const bcrypt =require('bcrypt');
const jwt = require('jsonwebtoken');



const FullnameSchema = new mongoose.Schema({
    firstname: {
      type: String,
      required: true,
      minlength: [3, 'First name must be at least 3 characters long'],
    },
    lastname: {
      type: String,
      minlength: [3, 'Last name must be at least 3 characters long'],
    }
  }, { _id: false }); // Prevent Mongoose from adding an _id field for nested object
  
const userSchema=new mongoose.Schema({
    fullname: FullnameSchema,
    // fullname:{
    //     firstname:{
    //         type:String,
    //         required:true,
    //         minlength:[3,'first name must be atleast 3 characters long'],
    //     },
    //     lastname:{
    //         type:String,
    //         minlength:[3,'last name must be atleast 3 characters long'],
    //     },

    // },
    email:{
        type:String,
        required:true,
        unique:true,
        match:[/^\S+@\S+\.\S+$/,'please enter a valid email'],
        minlength:[5,'email must be entered']
    },
    password:{
        type:String,
        required:true,
        select:false,
        
    },
    socketId:{
        type :String,
    },
})

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign(
        { _id: this._id },
        process.env.JWT_SECRET,
        { expiresIn: '24h' } // Set token to expire in 24 hours
    );
    return token;
}
userSchema.methods.comparePassword=async function(password){
    return await bcrypt.compare(password,this.password);
}
userSchema.statics.hashPassword=async function(password){
    return await bcrypt.hash(password,10);
}
const userModel=mongoose.model('user',userSchema);
module.exports=userModel;
