/***************************************
*Objetivo: Listar os filmes
*Nome:Gabiel de Barros Gomes
*Versão:1.0
*Data:25/01/2024
****************************************/

var sobreFilmes = require("../modulo/filmes.js");

const getListarFilmes = () => {

const filmes = sobreFilmes.filmes.filmes

return filmes

}

//console.log(getListarFilmes())

const getMostrarFilme = (filmeB) => {

const filme = filmeB    
const jsonFilme = {}


sobreFilmes.filmes.filmes.forEach(filmeGa => {

if(filme == filmeGa.id) {

jsonFilme.nome = filmeGa.nome
jsonFilme.sinopse = filmeGa.sinopse
jsonFilme.lancamento = filmeGa.data_lancamento
jsonFilme.foto = filmeGa.foto_capa

};


});

console.log(jsonFilme)

}
//getMostrarFilme(1)
