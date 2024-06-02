//Variável
let questaoAtual = 0;
let score = 0;

showQuestion();

//Evento
document.querySelector('.scoreArea button').addEventListener('click', resetEvent);

//Funções
function showQuestion() {
    if (questions[questaoAtual]) {
        let q = questions[questaoAtual];

        // let pct = Math.floor((questaoAtual / questions.length) * 100);
        // document.querySelector('.progress--bar').style.width = `${pct}%`;
        // document.querySelector('.scoreArea').style.display = 'none';
        
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
        // document.getElementById('scoreHTML').textContent = score;
    }
    questaoAtual++;
    scoreHTML.innerHTML = score;
    showQuestion();
    console.log(score)
}

function finishQuiz() {
    document.querySelector('.Text').innerHTML = `<h1> Quiz Finalizado!</h1> 
        <h3> Sua Pontuação Final: ${score} pontos! </h3>`;


    document.querySelector('.scoreArea').style.display = 'block';
    document.querySelector('.questionArea').style.display = 'none';
    // document.querySelector('.progress--bar').style.width = '100%';
}

function sair(){
    window.location = '../quiz.html'
}

// Coletar nome do usuário
// b_usuario.innerHTML = sessionStorage.NOME_USUARIO;


// Automatizando sidebar
// const body = document.querySelector("body"),
//     sidebar = body.querySelector("nav");
// sidebarToggle = body.querySelector(".sidebar-toggle");

// let getStatus = localStorage.getItem("status");
// if (getStatus && getStatus === "close") {
//     sidebar.classList.toggle("close");
// }

// sidebarToggle.addEventListener("click", () => {
//     sidebar.classList.toggle("close");
//     if (sidebar.classList.contains("close")) {
//         localStorage.setItem("status", "close");
//     } else {
//         localStorage.setItem("status", "open");
//     }
// })