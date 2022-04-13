/*Todas as dependencias para crianção do modelos de usuario */
//chamada para o Schema para BD
const mongoose = require('mongoose'),
        Schema = mongoose.Schema;
//validador do BD
const uniqueValidator = require('mongoose-unique-validator');

//criptografar usuario e senha do bando de dados
const crypto = require('crypto');

//gerador de token para validação de acesso
const jwt = require('jsonwebtoken');

//secret que criamos no arquivo de configuração
const secret = require('../config').secret
/*Fim das dependecias*/

const UsuarioSchema = new mongoose.Schema({
    nome:{
        type: String,
        required: [true, 'este campo não pode ficar vazio!!!']
    },
    email:{
        type: String,
        lowercase: true,
        unique: true,
        required: [true, 'este campo não pode ficar vazio!!!'],
        index:true,
        match:[/\S+@\S+\.\S+/,'email inválido!!!']
    },
    loja:{
        type: Schema.Types.ObjectId,
        ref: 'loja',
        required: [true, 'loja não pode ser vazia!!!']
    },
    permissao:{
        type: Array,
        default: ['cliente']
    },
    hash: String, 
    salt: String,
    recovery:{
        type:{
            token:String,
            date:Date
        },
        default:{}
    }

},{timestamps:true});

//informando que email já utilizado
UsuarioSchema.plugin(uniqueValidator, {message: 'já está sendo utilizado'});

//recuperação de senha
UsuarioSchema.methods.setSenha = function(password){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password,this.salt, 10000, 512, 'sha512').toString('hex');
}
//verificando se a senha é valida
UsuarioSchema.methods.validarSenha = function(password){
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return hash === this.hash;
}

//geração de token
UsuarioSchema.methods.gerarToken = function(){

    const hoje = new Date();
    const exp = new Date(hoje);
    exp.setDate(hoje.getDate() + 15);

    return jwt.sign({
        id: this._id,
        email: this.email,
        nome: this.nome,
        exp: parseFloat(exp.getTime() / 1000, 10)
    }, secret);
};

//envia o token para usuario
UsuarioSchema.methods.enviarAuthJSON = function(){
    return{
        _id: this._id,
        nome: this.nome,
        email: this.email,
        loja: this.loja,
        role: this.permissao,
        token: this.gerarToken()
    };
};

//RECUPERAÇÃO DE SENHA
UsuarioSchema.methods.criarTokenRecuperacaoSenha = function(){
    this.recovery = {};
    this.recovery.token = crypto.randomBytes(16).toString('hex');
    this.recovery.date = new Date(new Date().getTime() + 24*60*60*1000);
    return this.recovery;
};

//Apos recuperação de senha metodo para finalizar token de recuperação
UsuarioSchema.methods.finalizarTokenRecuperacaoSenha = function(){
    this.recovery = {token: null, date: null};
    return this.recovery;
}

module.exports = mongoose.model('Usuario', UsuarioSchema);

