var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

//ROTAS DE GRÁFICOS - index.html

// rota utilizada pra gerar o gráfico de top 3 usuários com mais pontos
router.get("/ultimas/:idUsuario", function (req, res) {
    medidaController.buscarUltimasMedidas(req, res);
});

router.get("/tempo-real/:idAquario", function (req, res) {
    medidaController.buscarMedidasEmTempoReal(req, res);
})

//ROTAS DE DADOS DO USUÁRIO - user.html

// rota utilizada pra obter o total de pontos obtidos pelo usuário
router.get("/userPontuacao/:idUsuario", function (req, res) {
    medidaController.obterDadosUserPontuacao(req, res);
})

// rota utilizada pra obter o total de quizzes realizados pelo usuário
router.get("/userQuiz/:idUsuario", function (req, res) {
    medidaController.obterDadosUserQuizzes(req, res);
})

// rota utilizada pra obter o total de postagens realizadas pelo usuário
router.get("/userPost/:idUsuario", function (req, res) {
    medidaController.obterDadosUserPosts(req, res);
})


module.exports = router;