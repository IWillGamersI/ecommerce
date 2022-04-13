const router = require('express').Router();

//manter as rotas na versão 1
router.use('/v1/api', require('./api/v1'));
//confirmação de conexão
router.get('/', (req, res, next)=> res.send({ok: true}));

//pegando erro para saber qual o erro e qual esta faltando
router.use(function(err,req,res){
    if(err.name === 'ValidationError'){
        return res.status(422).json({
            errors: Object.keys(err.errors).reduce(function(errors,key){
                errors[key] = err.errors[key.message];
                return errors
            }, {})
        })
    }

    return next(err);
})

module.exports = router;