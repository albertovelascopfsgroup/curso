const user = require('../models/userModel');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwtToken = require('../helpers/jwtHelper');

function listar(req, res) {

    user.find({}, (error, respUser) => {
        if (error) return res.status(400).json({ 'error': error });
        if (respUser) return res.status(200).json({ 'message': 'lista de usuarios ', usuarios: respUser });
    });

}

function crear(req, res) {

    const usuario = req.body.user;
    let newUser = new user(usuario);

    bcrypt.hash(newUser.password, saltRounds, function (err, hash) {
        if (err) {
            return res.status(400).json({ 'error': ' no se ha podido encriptar' });
        }
        if (hash) {
            newUser.password = hash;

            newUser.save()
                .then(newUser => {
                    console.log('usuario creado');
                    res.status(200).json({ newUser });
                }
                )
                .catch(error => {
                    console.log("error inesperado", error);
                    res.status(400).json({ 'error': error });
                });
        }
    });

}

function actualizar(req, res) {

    let id = req.query.id;
    const usuario = req.body.user;

    const protectedUser = {
        nombre: usuario.nombre, email: usuario.email, role: usuario.role
    }

    user.updateOne({ _id: id }, { $set: protectedUser }, { new: true }, (error, updatedOne) => {
        if (error) return res.status(400).json({ 'error': error });
        if (updatedOne) {
            return res.status(200).json({ 'message': 'Usuario actualizado', updatedOne })
        }
    });

}

function actualizarPassword(req, res) {

    let id = req.query.id;
    const password1 = req.body.user.password;

    bcrypt.hash(password1, saltRounds, function (err, hash) {
        if (err) return res.status(400).json({ 'error': err });
        if (hash) {
            user.updateOne({ _id: id }, { $set: { password: hash } }, (error, actualizado) => {
                if (error) return res.status(400).json({ 'error': error });
                if (actualizado) {
                    return res.status(200).json({ 'message': 'Contraseña actualizada', actualizado })
                }
            });
        }
    });

}

function borrar(req, res) {
    let id = req.query.id;

    user.find({ _id: id }, (error, resp) => {
        if (error) return res.status(400).json({ 'error': error });
        if (resp) {
            if (resp.length < 1) return res.status(400).json({ 'error': 'id no existe' });
            user.deleteOne({ _id: id }, (error, userdeleted) => {
                if (error) return res.status(400).json({ 'error': error });
                if (userdeleted) return res.status(200).json({ 'message': 'Usuario eliminado', userdeleted })
            });
        }

    });

}

function login(req, res) {

    let usuario1 = req.body.user;
    user.findOne({ email: usuario1.email }, (error, resp) => {
        if (error) {
            return res.status(400).json({ 'error': error });
        }
        if (resp) {
            bcrypt.compare(usuario1.password, resp.password, function (err, respuesta) {
                if (err) return res.status(400).json({ 'error': err });

                if (respuesta) {
                    let token = jwtToken.encode(resp);
                    return res.status(200).json({ 'message': 'usuario logueado', 'usuario': resp.nombre, 'token': token });
                }

                else return res.status(400).json({ 'error': 'Credenciales incorrectas' });

            });
        }
    });

}

module.exports = {
    listar,
    crear,
    actualizar,
    borrar,
    login,
    actualizarPassword
}