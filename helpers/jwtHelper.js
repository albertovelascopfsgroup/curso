const jwt = require('jsonwebtoken');
const clave = "mi_clave_secreta";

exports.encode = (user) => {
    let payload = {
        nombre: user.nombre,
        email: user.email,
        role: user.role,
        iat: Date.now(),
        exp: (Date.now() + (1000 * 60 * 60))
    }

    var token =jwt.sign(payload, clave);
    
    return token;
}

exports.decode = (token) => {
    let respuesta = jwt.decode(token, clave);

    return respuesta;
}