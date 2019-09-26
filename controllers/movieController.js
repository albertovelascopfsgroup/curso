const Movie = require('../models/movieModel');


function listar(req, res) {

    Movie.find({}).populate('user').exec((error, movies) => {
        if (error) return res.status(400).json({ 'error': error });
        if (movies) return res.status(200).json({ 'message': 'lista de movies ', 'movies': movies });
        else return res.status(400).json({ 'error': 'no hay peliculas que mostrar' });;
    });
}

function crear(req, res) {
    if (!req.body.movie) return res.status(400).json({ 'error': 'error' });
    else {
        let body = req.body.movie;

        new Movie(body).save()
            .then((movieCreated) => {
                return res.status(200).json({ 'message': 'movie bien creada', 'movie': movieCreated });
            })
            .catch(error => {
                
                return res.status(400).json({ 'error': 'No se ha podido crear la pelicula', error });
            });
    }
}

function actualizar(req, res) {
    if (!req.query.id) return res.status(400).json({ 'error': 'error' });
    else {
        let id = req.query.id;
        let body = req.body.movie;

        Movie.updateOne({ _id: id }, { $set: body }, (error, movieUpdate) => {
            if (error) return res.status(400).json({ 'error': 'No se ha podido actualizar la pelicula', error });
            if (movieUpdate) {
                return res.status(200).json({ 'message': 'pelicula actualizada', 'movie': movieUpdate });
            }
        });
    }
}

function borrar(req, res) {
    if (!req.query.id) return res.status(400).json({ 'error': 'Faltan parametros para borrar movie' });
    else {
        let id = req.query.id;

        Movie.deleteOne({ _id: id }, (error, movieDelete) => {
            if (error) return res.status(400).json({ 'error': 'No se ha podido borrar la pelicula', error });
            if (movieDelete) {
                return res.status(200).json({ 'message': 'pelicula borrada', 'movie': movieDelete });
            }
        });
    }
}


module.exports = { listar, crear, actualizar, borrar };