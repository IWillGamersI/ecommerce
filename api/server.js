//PACOTES
const compression = require('compression');
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');

//START INICIAL

//express
const app = express();

//AMBIENTE

//vendo se o sistema esta sendo executado diretamente do servidor
const isProduction = process.env.NODE_ENV === 'production';

//porta que será usado no servidor tanto pelas variaveis como pela porta comum 3000
const PORT = process.env.PORT || 3000

//ARQUIVO STATICOS
app.use('/public', express.static(__dirname + '/public'));
app.use('/public/images', express.static(__dirname + '/public/images'));

//SETUP MONGO DB
const dbs = require('./config/database');
const dbURI = isProduction ? dbs.dbProduction : dbs.dbTest;
mongoose.connect(dbURI, {useNewUrlParser: true});

//SETUP EJS
app.set('view engine', 'ejs');

//CONFIGURAÇÕES DE AJUDA
if(!isProduction){
    app.use(morgan('dev'));
}
app.use(cors());
app.disable('x-powered-by');
app.use(compression());

// SETUP BODY PARSER
app.use(bodyParser.urlencoded({extend: false, limit:1.5*1024*1024}));
app.use(bodyParser.json({limit: 1.5*1024*1024}));

//MODELS
require('./models');

//ROTAS
app.use('/', require('./routes/index'));

// ROTAS ERROS 404
app.use((req,res,next)=>{
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
})

//ROTAS - 422 - 500 - 401
app.use((err,req,res,next)=>{
    res.status(err.static || 500);
    if(err.status !== 404) console.warn('Erro: ', err.message, new Date());
    res.json({errors:{
        message: err.message,
        status: err.status
    }})
})

//ESCUTAR O SERVIDOR
app.listen(PORT, (err)=>{
    if(err) throw err;
    console.log(`Servidor iniciado na //localhost:${PORT}`)
})
