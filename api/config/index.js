module.exports = {
    secret: process.env.NODE_ENV === 'production'? process.env.SECRET : 'S41DLSEDLR24JFHSD5JFHSDKJFSM12NHJHISD543545DSD25F4',
    api: process.env.NODE_ENV === 'production' ? 'https://api.loja.imperiumaquarios.com.br' : 'https://localhost:3000',
    loja:process.env.NODE_ENV === 'production' ? 'https://loja.imperiumaquarios.com.br' : 'https://localhost:8000',
};