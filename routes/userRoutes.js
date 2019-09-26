const express = require('express');
const apUSer = express.Router();
const userController = require('../controllers/userController');
const jwtProteger = require('../middleware/jwtMiddleware');

apUSer.get('/list', jwtProteger.protegerRutas, userController.listar);

apUSer.post('/login', userController.login);

apUSer.use(jwtProteger.protegerRutas);

apUSer.get('/', (req, res) => {
    res.send('Hello!');
});

apUSer.post('/create', userController.crear);

apUSer.put('/update', userController.actualizar);

apUSer.put('/updatePassword', userController.actualizarPassword);

apUSer.delete('/delete', userController.borrar);

module.exports = apUSer;