/********************************************************************************************
 * Objetivo: Arquivo responsável pela padronização de variáveis globais utilizadas no projeto
 * Data: 29/02
 * Autor: Gabriel de Barros
 * Versão: 1.0 
 * *****************************************************************************************/

/*************** Mensagens de Erro ************** */
const ERROR_INVALID_ID = {status: false, status_code: 400, message: 'O ID encaminhado na requisição não é válido!!'}
const ERROR_REQUIRED_FIELDS = {status: false, status_code: 400, message: 'Existem campos requeridos que não foram preenchidos, ou não atendem aos critérios de digitação!!'}
const ERROR_NOT_FOUND = {status: false, status_code: 404, message: 'Não foram encontrados itens na requisição!!'}
const ERROR_INTERNAL_SERVER_DB = {status: false, status_code: 500, message: 'Não foi possível processar a requisição devido à um problema na comunicação com o Banco de Dados. Contate o Administrador da API!!'}
const ERROR_INTERNAL_SERVER = {status: false, status_code: 500, message: 'Não foi possível processar a requisição devido à um problema na de negócio/controle do Projeto. Contate o Administrador da API!!'}
const ERROR_CONTENT_TYPE = {status: false, status_code: 415, message: 'O Content-Type encaminhado na requisição, não permitido pelo servidor da API. Deve-se utilizar somente aplication/json!!'}


/*********************************MENSAGENS DE SUCESSO*************************************** */
const SUCCESS_CREATED_ITEM = {status: true, status_code: 201, message: 'Item criado com sucesso!!'};
const SUCESS_DELETE_ITEM = {status: true, status_code: 202, message: 'Item deletado com sucesso!!'};
const SUCESS_UPDATE_ITEM = {status: true, status_code: 202, message: 'Item deletado com sucesso!!'}

module.exports = {
    ERROR_INVALID_ID,
    ERROR_NOT_FOUND,
    ERROR_INTERNAL_SERVER_DB,
    ERROR_INTERNAL_SERVER,
    ERROR_REQUIRED_FIELDS,
    ERROR_CONTENT_TYPE,
    SUCCESS_CREATED_ITEM,
    SUCESS_DELETE_ITEM,
    SUCESS_UPDATE_ITEM


}