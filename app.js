const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

app.use((request, response, next) => {
        response.header('Access-Control-Allow-Origin', '*')

        response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

        app.use(cors())

        next()
});

/*******************Import do arquivos da controller do projeto**********************/
const controller = require('./controller/controller_filme.js')


/**********************************************************************************/

//Criando um objeto para controlar a chegada dos dados da requisição em formato JSON
const bodyParserJSON = bodyParser.json();


// Versão 1.0 - retorna todos os filmes do arquivo filmes.js
app.get('/v1/acmeFilmes/ListarFilmes', cors(), async function (request, response, next) {

        let controleFilmes = require('./controller/funcoes.js')
        let listarFilmes = 
        controleFilmes.getListarFilmes()

        if (listarFilmes) {
                response.status(200)
                response.json(listarFilmes)
        }
        else {
                response.status(404)
                response.json('{erro: item não encontrado}')
        }

})

// Versão 1.0 - Retorna o filme através do ID
app.get('/v1/acmeFilmes/filme/:id', cors(), async function (request, response, next) {
        let id = request.params.id

        let controleFilmes = require('./controller/funcoes.js')
        let mostrarFilme = controleFilmes.getMostrarFilme(id)

        if (mostrarFilme) {
                response.status(200)
                response.json(mostrarFilme)
        }
        else {
                response.status(404)
                response.json('{erro: item não encontrado}')
        }

})

//Versão 2.0 - retorna todos os arquivos do Banco de Dados
app.get('/v2/acmeFilmes/Listarfilmes', cors(), async function (request, response) {
       
        
        //Chama a função da controller para retornar os filmes
        let dadosFilmes = await controller.getListarFilmes();

        //Validação para retornar o JSON dos filmes ou retornar 404
        if (dadosFilmes) {
                response.json(dadosFilmes);
                response.status(200);
        } else {
                response.json({ Message: 'Nenhum registro foi encontrado' })
                response.status(404)
        }

})

//Criação do endpoint que retorna um filme no banco de dados filtrando pelo id 
app.get('/v2/acmeFilmes/filme/:id', cors(), async function(request, response){
        let idFilme = request.params.id
    
        let dadosFilme = await controller.getBuscarFilme(idFilme)
    
        response.status(dadosFilme.status_code)
        response.json(dadosFilme)
    })

//Criação do endpoint que retorna dados de um filme filtrando pelo nome
app.get('/v2/acmeFilmes/nomefilme', cors(), async function(request, response){
        let nomeFilme = request.query.nome
    
        let dadosFilme = await controllerFilmes.getBuscarFilmeNome(nomeFilme)
    
        response.status(dadosFilme.status_code)
        response.json(dadosFilme)
    })
//Criando um endpoint que cadastra um filme no banco de dados
app.post('/v2/acmeFilmes/filme', cors(), bodyParserJSON, async function(request,response){

//Recebe o content-type com o tipo de dados encaminhado na requisição
const contentType = request.header('content-type');
console.log(contentType);

// Recebe todos os dados encaminhados na requisição pelo body        
let dadosBody = request.body

//Encaminha os dados para o controller enviar para o DAO
let resultDadosNovoFilme = await controller.setInserirNovoFilme(dadosBody, contentType);

console.log(resultDadosNovoFilme)
response.status(resultDadosNovoFilme.status_code);
response.json(resultDadosNovoFilme);
})    
//Criando um endpoint que deleta um filme pelo id
app.delete('/v2/acmeFilmes/deleteFilme/:id', cors(), async function(request, response){

let idFilme = request.params.id

let dadosFilme = await controller.setExcluirFilme(idFilme)

response.status(dadosFilme.status_code)
response.json(dadosFilme)

})

app.put('/v2/acmeFilmes/putFilme/:id', cors(), bodyParserJSON, async function(request,response){
        const contentType = request.header('content-type');
console.log(contentType);

let idFilme = request.params.id

// Recebe todos os dados encaminhados na requisição pelo body        
let dadosBody = request.body

//Encaminha os dados para o controller enviar para o DAO
let resultDadosNovoFilme = await controller.setAtualizarFilme(dadosBody, contentType, idFilme);

console.log(resultDadosNovoFilme)
response.status(resultDadosNovoFilme.status_code);
response.json(resultDadosNovoFilme);
})

//Endpoint criado para ligar a API
app.listen('8080', function () {
        console.log('API funcionando e aguardando requisições!!!!')
})