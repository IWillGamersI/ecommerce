const mongoose = require('mongoose');
const UsuarioController = require('../UsuarioController');

const usuario = mongoose.model('Usuario');
const loja = mongoose.model('Loja');

module.exports = (req, res, next)=>{
    if(!req.payload.id){
        return res.sendStatus(401);
    }
    const { loja } = req.query;
    if(!loja){
        return res.sendStatus(401);
    }
    Usuario.findBuid(req.payload.id).then(usuario=>{
        if(!usuario) return res.sendStatus(401);
        if(!usuario.loja) return res.sendStatus(401);
        if(!usuario.permissao.includes('admin')) return res.sendStatus(401);
        if(usuario.permissao !== loja) return res.sendStatus(401);

    }).catch(next)
}