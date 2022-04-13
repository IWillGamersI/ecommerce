const trasnporter = require('nodemailer').createTransport(require('../config/email'));
const {api: link} = require('../config/index')

module.exports = ({ usuario, recovery}, cb)=>{
    const message = `
    <h1 style="text-align: center;"> Recuperação de Senha </h1>
    <br />
    <p>
        Aqui está o link para redefinir a sua senha. Acesse ele e digite sua nova senha: 
    </p>
    <a href="${link}/v1/api/usuarios/senha-recuperada?token=${recovery.token}"> 
        ${link}/v1/api/usuarios/senha-recuperada?token=${recovery.token}
    </a>
    <br /><br /><br /><br /><hr />

    <p>
        obs.: Se você não solicitou a redefinição, apenas ignore esse email.
    </p>
    <br />
    <p> Atenciosamente, Nome da loja</p>
    `;

    const opcoesEmail = {
        from:'nãorespoder@emaildaloja.com',
        to: usuario.email,
        subject: 'Redefinição de senha - nome da loja',
        html: message
    }

    if(process.env.NODE_ENV === 'production'){
        trasnporter.sendMail(opcoesEmail, (error, info)=>{
            if(error){
                console.log(error);
                return cb('Aconteceu um erro no envio do email, tente novamente');
            }else{
                return cb(null, 'Link para definição se senha enviado com sucesso para se email')
            }
        });
    }else{
        console.log(opcoesEmail)
        return cb(null, 'Link para definição se senha enviado com sucesso para se email')
    }


}