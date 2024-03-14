/***************************************************************************
 * Objetivo: Arquivo Responsavel pela validação, consistencia de dados das requisições da API de Filme
 * Data: 01/02/2024
 * Autor: Gabriel de Barros
 * Versão: 1.0
 **************************************************************************/
/*
*Para realizar o acesso a Banco de Dados prcisamos instalar algumas bibliotecas:
*    -SEQUELIZE - É uma biblioteca mais antiga
*    -PRISMA ORM - É a biblioteca mais atual (será utilizado)
*    -FASTFY ORM - É a biblioteca mais atual
*
*     Para instalar o PRISMA:
   - npm install prisma --save (Irá realizar a conexão com o BD)
   - npm install @prisma/client --save (Irá executar os scripts SQL no BD)
 */

// Import do arquivo de configuração do projeto
const message = require('../module/config.js')

//Import do arquivo DAO que fará a comunicação com o Banco de Dados   
const filmeDAO = require('../model/DAO/filme.js');

//Função para validar e inserir novo filme
const setInserirNovoFilme = async function (dadosFilme) {

    //Cria o objeto JSON para devolver 
    let novoFilmeJSON = {}

    //Validação de campos obrigatórios ou com digitação inválida 
    if (dadosFilme.nome == ''            || dadosFilme.nome == undefined            || dadosFilme.nome == null|| dadosFilme.nome.length > 80            ||
        dadosFilme.sinopse == ''         || dadosFilme.sinopse == undefined         || dadosFilme.nome == null|| dadosFilme.sinopse.length > 65000      ||
        dadosFilme.duracao == ''         || dadosFilme.duracao == undefined         || dadosFilme.nome == null|| dadosFilme.duracao.length > 8          ||
        dadosFilme.data_lancamento == '' || dadosFilme.data_lancamento == undefined || dadosFilme.nome == null|| dadosFilme.data_lancamento.length > 10 ||
        dadosFilme.foto_capa == ''       || dadosFilme.foto_capa == undefined       || dadosFilme.nome == null|| dadosFilme.foto_capa.length > 200      ||
        dadosFilme.valor_unitario.length > 6
    ) {

        return message.ERROR_REQUIRED_FIELDS; //400

    }
    else {

        let validateStatus = false;


        //Validação da data de relancamento, já que ela não obrigatória np BD
        if (dadosFilme.data_relancamento != null &&
             dadosFilme.data_relancamento != ''  &&
             dadosFilme.data_relancamento != undefined){
             
            //Validação para verificar se a data esta com a qtde de digitos correto    
            if (dadosFilme.data_lancamento.length != 10){
                return message.ERROR_REQUIRED_FIELDS; //400

            } else {
                validateStatus = true;
            }
        }else{
            validateStatus = true;
        }    
  
//Validação para verificar se podemos encaminhar os dados para o DAO
    if(validateStatus) {
        //encaminha os dados do gilme para o DAo inserir no BD
        let novoFilme = await filmeDAO.insertFilme(dadosFilme)
        let filmeId = await filmeDAO.lastInsertId()

        //Validação para verificar se o DAO inseriu os dados do BD
        if (novoFilme && filmeId) {
            //Cria o JSON de retorno dos dados(201)
            novoFilmeJSON.filme = dadosFilme
            novoFilmeJSON.filme.id = Number(filmeId[0].id)
            novoFilmeJSON.status = message.SUCCESS_CREATED_ITEM.status;
            novoFilmeJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code;
            novoFilmeJSON.message = message.SUCCESS_CREATED_ITEM.message;

            return novoFilmeJSON; //201
        }else {
            return message.ERROR_INTERNAL_SERVER_DB //500
        }

    }

}
}
    

    //Função para atualizar os filmes
    const setAtualizarFilme = async function () {



    }

    //Função para excluir os filmes
    const setExcluirFilme = async function () {



    }

    //Função para Listar todos os Filmes
    const setListarFilmes = async function () {

        //Cria o objeto JSON    
        let filmesJson = {};

        //Chama a função do DAO para retornar os dados da tabela de Filme
        let dadosFilmes = await filmeDAO.selectAllFilmes();

        //Validação para verificar se existem dados
        if (dadosFilmes) {
            //Cria o JSON para devolver para o APP 
            filmesJson.filmes = dadosFilmes;
            filmesJson.quantidade = dadosFilmes.length;
            filmesJson.status_code = 200;
            return filmesJson
        } else {
            return false;
        }

    }

    //Função para buscar um filme pelo ID
    const setBuscarFilme = async function () {

    }
    const getListarFilmes = async function () {
        const filmesJSON = {}

        let dadosFilmes = await filmeDAO.selectAllFilmes()

        if (dadosFilmes) {
            if (dadosFilmes.length > 0) {
                filmesJSON.file = dadosFilmes
                filmesJSON.quantidade = dadosFilmes.length
                filmesJSON.status_code = 200

                return filmesJSON
            } else {
                return message.ERROR_NOT_FOUND //404
            }
        } else
            return message.ERROR_INTERNAL_SERVER_DB //500
    }

    //Função para buscar um filme pelo id
    const getBuscarFilme = async function (id) {
        //Recebe o ID do filme
        let idFilme = id
        //Cria o objeto JSON
        let filmesJSON = {}

        //Validação para verificar se o ID é válido
        //(vazio, indefinido, ou não numérico)
        if (idFilme == '' || idFilme == undefined || isNaN(idFilme)) {
            return message.ERROR_INVALID_ID //400    
        } else {
            //Encaminha o ID para o DAO buscar no banco de dados
            let dadosFilme = await filmesDAO.selectByIdFilme(idFilme)

            //Verifica se o DAO retornou dados
            if (dadosFilme) {
                //Validação para verificar a quantidade de itens retornados
                if (dadosFilme.length > 0) {
                    //Cria o JSON para retorno
                    filmesJSON.file = dadosFilme;
                    filmesJSON.status_code = 200;

                    return filmesJSON
                } else {
                    return message.ERROR_NOT_FOUND //404
                }
            } else {
                return message.ERROR_INTERNAL_SERVER_DB //500
            }
        }

    }

    //Função para buscar um filme filtrando pelo nome
    const getBuscarFilmeNome = async function (nome) {
        //variável local para facilitar a validação
        const nomeFilme = nome
        //objeto JSON de filmes
        const filmesJSON = {}

        //validação do conteúdo da variável nome
        if (nomeFilme == '' || nomeFilme == undefined) {
            return message.ERROR_REQUIRED_FIELDS //400
        } else {
            //encaminha o nome ao DAO para fazer a pesquisa no banco de dados 
            let dadosFilme = await filmesDAO.selectByNomeFilme(nomeFilme)
            //verifica se o DAO retornou dados
            if (dadosFilme) {
                //validação para ver a quantidade de itens retornados
                if (dadosFilme.length > 0) {
                    //criação do json para retorno dos dados
                    filmesJSON.file = dadosFilme
                    filmesJSON.status_code = 200

                    return filmesJSON
                } else {
                    return message.ERROR_NOT_FOUND //404
                }
            } else {
                return message.ERROR_INTERNAL_SERVER_DB //500
            }
        }

    }

    module.exports = {

        setInserirNovoFilme,
        setAtualizarFilme,
        setBuscarFilme,
        setListarFilmes,
        setExcluirFilme,
        getListarFilmes,
        getBuscarFilme,
        getBuscarFilmeNome
    }
