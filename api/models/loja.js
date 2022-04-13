const mongoose = require('mongoose');
//validador do BD
const uniqueValidator = require('mongoose-unique-validator');

const LojaSchema = mongoose.Schema({
    nome: {type: String, required: true},
    cnpj: {type: String, required: true, unique: true},
    email: {type: String,},
    telefones:{
        type: [{type: String}]
    },
    endereco:{
        type:{
            local: {type: String, required: true},
            numero: {type: String, required: true},
            complemento: {type: String},
            CEP: {type: String, required: true},
            bairro: {type: String, required: true},
            cidade: {type: String, required: true},
            Estado: {type: String, required: true},

        }, required:true
    }

}, {timestamps: true});

//informando que email já utilizado
LojaSchema.plugin(uniqueValidator, {message: 'já está sendo utilizado'});

module.exports = mongoose.model('Loja', LojaSchema);