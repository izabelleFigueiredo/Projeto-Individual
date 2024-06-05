var database = require("../database/config");

// essa função é utilizada para exibir o gráfico do index de usuários com maior pontuação
function buscarUltimasMedidas(idUsuario) {

    var instrucaoSql = `select ifnull(nickname, 'Nenhum Registro') as nickname,  ifnull(sum(pontos), 0) as qtdPontos
    from pontuacao
    join usuario on idUsuario = fkUsuario 
    group by idUsuario
    limit 3;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// essa funcao será utilizada pra fazer o gráfico de usuários com mais curtidas em posts!
function buscarMedidasEmTempoReal(idUsuario) {

    var instrucaoSql = `select nickname, sum(pontos) from pontuacao join usuario on idUsuario = ${idUsuario} group by idUsuario;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// essa função vai obter o total de pontos obtidos pelo usuário
function obterDadosUserPontuacao(idUsuario) {

    var instrucaoSql = `select sum(pontos) as totalPontos from pontuacao where fkUsuario = ${idUsuario};`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// essa função vai obter o total de quizzes realizados pelo usuário
function obterDadosUserQuizzes(idUsuario) {

    var instrucaoSql = `select count(fkUsuario) as qtdQuizRealizado from pontuacao where fkUsuario = ${idUsuario};    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// essa função vai obter o total de posts realizados pelo usuário
function obterDadosUserPosts(idUsuario) {

    var instrucaoSql = `select count(fkUsuario) as qtdPostsRealizados from postagem where fkUsuario = ${idUsuario};`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal,
    obterDadosUserPontuacao,
    obterDadosUserQuizzes,
    obterDadosUserPosts
}
