const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

app.use((request, response, next) => {
        response.header('Access-Control-Allow-Origin', '*')

        response.header('Access-Control-Allow-Methods', 'GET')

        app.use(cors())

        next()
});

app.get('/v1/AcmeFilmes/ListarFilmes', cors(), async function (request, response, next) {

        let controleFilmes = require('./controller/funcoes.js')
        let listarFilmes = controleFilmes.getListarFilmes()

        if (listarFilmes) {
                response.status(200)
                response.json(listarFilmes)
        }
        else {
                response.status(404)
                response.json('{erro: item não encontrado}')
        }

})

app.get('/v1/AcmeFilmes/filme/:id', cors(), async function (request, response, next) {
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

app.listen('8080', function () {
        console.log('API funcionando!!!!')
})