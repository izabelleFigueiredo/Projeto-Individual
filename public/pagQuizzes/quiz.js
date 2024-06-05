//Variável
let questaoAtual = 0;
let score = 0;
let quizNum = 1; 

showQuestion();

//Evento
document.querySelector('.scoreArea button').addEventListener('click');

//Funções
function showQuestion() {
    if (questions[questaoAtual]) {
        let q = questions[questaoAtual];

        document.querySelector('.questionArea').style.display = 'block';
        document.querySelector('.question').innerHTML = `${questaoAtual+1}.  ${q.question}`;

        let opcoesNaTela = '';
        for (let i in q.options) {
            opcoesNaTela += `<div data-op="${i}" class="option">${q.options[i]}</div>`;
        }
        document.querySelector('.options').innerHTML = opcoesNaTela;
        document.querySelectorAll('.options .option').forEach(item => {
            item.addEventListener('click', optionClickEvent);
        });

    } else {
        finishQuiz();
    }
}

function optionClickEvent(event) {
    let selectedOption = parseInt(event.target.getAttribute('data-op'));
    if (selectedOption === questions[questaoAtual].answer) {
        score += 2;
    }
    questaoAtual++;
    scoreHTML.innerHTML = score;
    showQuestion();
    console.log(score)
}

function finishQuiz() {
    document.querySelector('.Text').innerHTML = `<h1> Quiz Finalizado!</h1> 
        <h3> Sua Pontuação Final: ${score} pontos! </h3>`;

        // chamando a função que irá inserir a pontuação no banco de dados
        cadastrar();

        

        // usuarioModel.inserirPontos(idUsuario, idQuiz, score)
        //     .then(
        //         function (resultado) {
        //             res.json(resultado);
        //         }
        //     ).catch(
        //         function (erro) {
        //             console.log(erro);
        //             console.log(
        //                 "\nHouve um erro ao realizar o insert! Erro: ",
        //                 erro.sqlMessage
        //             );
        //             res.status(500).json(erro.sqlMessage);
        //         }
        //     );

    document.querySelector('.scoreArea').style.display = 'block';
    document.querySelector('.questionArea').style.display = 'none';
}
function sair(){
    window.location = '../quiz.html'
}

function cadastrar() {
        var idUsuario = sessionStorage.ID_USUARIO;
        var pontuacao = score;
        var idQuiz = quizNum;
// ${pontuacao}/${idUsuario}/${idQuiz}
        fetch(`/aquarios/cadastrar`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                idUsuario: idUsuario,
                pontuacao: pontuacao,
                idQuiz: idQuiz
            })
        }).then(function (resposta) {
            console.log("ESTOU NO THEN DO cadastrar pontos()!")

            if (resposta.ok) {
            console.log(resposta);
            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));
                
                
            });
        } else {

            console.log("Houve um erro ao tentar cadastrar os pontos!");
            alert("Houve um erro ao tentar cadastrar os pontos!");

            resposta.text().then(texto => {
                console.error(texto);
            });
        }

    }).catch(function (erro) {
        console.log(erro);
    })
    return false;
}