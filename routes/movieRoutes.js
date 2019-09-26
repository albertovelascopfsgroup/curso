const moviecontroller = require('../controllers/movieController');
const express = require('express');
const appMovie = express.Router();

appMovie.get('/list', moviecontroller.listar);

appMovie.post('/create', moviecontroller.crear);

appMovie.put('/update', moviecontroller.actualizar);

appMovie.delete('/delete', moviecontroller.borrar);

module.exports = appMovie;