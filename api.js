const express = require('express');
const api = express();
const userRoutes = require('./routes/userRoutes')
const moviesRoutes = require('./routes/movieRoutes')

api.use('/users', userRoutes);
api.use('/movies', moviesRoutes);


module.exports = api;