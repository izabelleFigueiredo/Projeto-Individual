var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        SELECT idUsuario, nome, nickname, email, fkPersonagem
        FROM usuario WHERE email = '${email}' AND senha = MD5('${senha}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(nome, nickname, email, senha, personagem) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO usuario (nome, nickname, email, senha, fkPersonagem) VALUES ('${nome}','${nickname}', '${email}', md5('${senha}'), '${personagem}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
// // add: qtdCurtidas, qtdPontuacao, qtdQuiz
// function consultar(idUsuario) {
//     var instrucaoSql = `select count(idPostagem) from postagem where fkUsuario = ${idUsuario};`;
//     return database.executar(instrucaoSql);
  
//   }

//   function inserirPontos(idUsuario, idQuiz, score) {
//     var instrucaoSql = `insert into pontuacao (fkUsuario, fkQuiz, pontos)values
//     (${idUsuario}, ${idQuiz}, ${score}),`;
//     return database.executar(instrucaoSql);
  
//   }

module.exports = {
    autenticar,
    cadastrar,
    // consultar,
    // inserirPontos
};