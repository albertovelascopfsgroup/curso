const mongoose = require('mongoose');
const schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const Roles = {
    values: ['Admin', 'User'],
    message: '{VALUE} role no permitido'
}

const userSchema = schema({
    nombre: {
        type: String,
        required: [true, 'Es necesario el nombre']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Es necesario el email']
    },
    password: {
        type: String,
        required: [true, 'Es necesario el password']
    },
    role: {
        type: String,
        default: 'User',
        required: [true, 'Es necesario el role'],
        enum: Roles
    }
});

userSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });
module.exports = mongoose.model('user', userSchema);