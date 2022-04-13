Criado o projeto com npx create-react-app 'aqui nome do projeto'
Instalado dependencias
Ajustando as pastas da API

    1. Criando Arquivos 
        1.1 - .jshintrc
                colocando a versão do javascript {"esversion":6}
        1.2 - .gitignore
                node_modules, package-log.json
    
    2. Criando Pastas 
        2.1 - CONFIG - ficara os arquivos de configurações JSON 
                     - Exemplo: nome do bando de dados, endereço ip, 
                       dominio de acesso, nossas integrações com token pagseguro, 
                       dados sensiveis

        2.2 - CONTROLLERS - todas as funções do sistema
                          - Exemplo: categoria controllers,
                            cliente controller, email, variação

                2.2.1 - integracoes - todas integrações como pagseguro e frete
                2.2.2 - validacoes - validaçoes de entrada do sistema
                                   - Exemplo: validações des egurança,
                                     o que precisa de vir em um POST

        2.3 - HELPERS - codigos que facilita o sistema
                      - Exemplo: calculos matematicos,
                        replace e string, 
        
        2.4 - MODELS - todos od modelos de base,

        2.5 - PUBLIC - arquivos para ter acesso para qualquer cliente que 
                       tenha acesso ao servidor                
                2.5.1 - CSS - onde vai ficar o estilos 
                2.5.2 - IMAGE - onde fica todas as imagens 
        
        2.6 - ROUTES - arquivo de configuração de rotas
                       arquivo de autenticação de rotas
                2.6.1 - API - onde realmente ficaram as rotas das api
        
        2.7 - TEST - onde ficara os arquivos de testes

        2.8 - VIEWS - as visualizações direto do servidor, quando ele não retorna
                      um JSON ou um string - mais sim um HTML pronto, recuperação de senha
                      tela de login, 

************************************************************************************
                         
   Configurando arquivo de entrada - arquivo: server.js

            1 - chamando os pacotes 
                    compression
                    express
                    ejs
                    body-parser
                    mongoose
                    morgan
                    cors
            
                Inicializando
                    express - como função criando um instancia
                Ambiente
                    isProduction - verificando se o sistema esta sendo executado em
                    servidor em produção ou servidor local
                    PORT - porta do servidor por variavel ou a comum 3000
                
                Arquivos estaticos
                    pela pasta public
                    pela pasta images

                Banco de dados
                    cria a const dbs
                        arquivo na pasta config database.json
                        "dbTest": "mongodb:localhost:27017/nome da pasta teste api",
                        "dbProduction": "mongo://localhost:27017/nome da pasta api"

                    verificando se esta sendo chamado do banco de dado ou local
                    chama diretamente o conexão com mongoose 
                
                EJS
                app.set('view engine', 'ejs')

                AJUDA
                usando o morgan para usar em modo desenvolvedor na tela
                usando o cors para react
                desabilitando x-powered-by no express
                deixando a aplicação mais leve com compression

                BODY PARSER
                separando dados para controller

                MODELS
                chamando tudo que tiver na pasta models
            
                ROTAS
                chamando as rotas pelo index

                ROTAS 404 - ERRO
                se não encontrar um rota do sistema cai nessa rota
                
                ROTAS 422 - 500 - 401
                tratar todas as outras rotas de erro

                INICIO DO SERVIDOR COM LISTEN
                Iniciando o servidor na porta setada no inicio

*********************************************************************************

    Configurando nosso arquivo index.js na pasta CONFIG
        
        secret para configurar o local da loja tanto no servidor como local
        multer para fazer upload de arquivos, qulquer arquivo image, documento, pdf
        email usando nodemailer PELO GMAIL - acessar o gmail e alterar a conta para acesso de aplicatos de terceiros 
        
    Configuração basicas das rotas
                iniciando com configuração de 2 rotas
                1 pra api e outra so de teste
                midware validação
                criando a versão 1 das rotas
                criando a pasta V1 dentro da api router
                criando o arquivo v1.js na pasta

    configurando o nodemon e package json
    "test": "mocha --timeout --exit",
    "dev": "NODE_ENV=development nodemon server.js",
    "build": "NODE_ENV=production pm2 start server.js --name=\"ecommerce-api\""
    
    CONCLUIDO AS CONFIGURAÇÕES INICIAIS DO SISTEMA

    **************************************************************************
    Criar autenticação de acesso atravez da pasta Cruando Usuarios
    
    router o arquivo auth.js
    
    Iniciando a crianção do modelo de usuario
        Pasta MODELS
            Modelo de usuario
            usuario.js - CONFIGURAÇÕES DE VALIDAÇÕES, SENHA, TOKEN
        Pasta ROUTES
             usuarios
    VIEWS
        partials
        recovery
               
    ***************************************************************************
    Criando a parte de Lojas

    MODELS
     loja.js
    ROUTER V1
     lojas.js
    CONTROLLERS
        VALIDACOES
         lojaValidation
     LojaController .js
        index
        show
        store
        update
        remove
        

