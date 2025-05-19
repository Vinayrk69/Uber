const dotenv = require('dotenv');
dotenv.config(); 

const express = require('express');

const cors = require('cors');
const app = express(); 
const cookieParser=require('cookie-parser');
const connectToDb=require('./database/db');
const userRoutes = require('./routes/user.routes'); // Import the user routes
const captainRoutes = require('./routes/captain.router'); // Import the captain routes
connectToDb();
app.use(cors()); 
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.send('hello world');
});
app.use('/users', userRoutes);// Use the user routes for any requests to /user
app.use('/captains', captainRoutes); // Use the captain routes for any requests to /captains
module.exports = app;


