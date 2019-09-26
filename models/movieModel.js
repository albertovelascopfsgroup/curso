const mongoose = require('mongoose');
const schema = mongoose.Schema;

const movieSchema = schema({
    titulo: {
        type: String,
        required: [true, 'Es necesario el titulo']
    },
    descripcion: {
        type: String,
        required: [true, 'Es necesario el descripcion']
    },
    imagen: String,
    user: {
        type: schema.ObjectId, 
        ref: 'user'
    }
});

module.exports = mongoose.model('Movie', movieSchema);