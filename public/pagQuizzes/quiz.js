//Variável
let currentQuestion = 0;

showQuestion();

//Evento
document.querySelector('.scoreArea button').addEventListener('click', resetEvent);

//Funções
function showQuestion() {
    if (questions[currentQuestion]) {
        let q = questions[currentQuestion];
        let pct = Math.floor((currentQuestion / questions.length) * 100);

        document.querySelector('.progress--bar').style.width = `${pct}%`;
        document.querySelector('.scoreArea').style.display = 'none';
        document.querySelector('.questionArea').style.display = 'block';
        document.querySelector('.question').innerHTML = q.question;

        let optionsHtml = '';
        for (let i in q.options) {
            optionsHtml += `<div data-op="${i}" class="option"><span>${parseInt(i) + 1}</span>${q.options[i]}</div>`;
        }
        document.querySelector('.options').innerHTML = optionsHtml;
        document.querySelectorAll('.options .option').forEach(item => {
            item.addEventListener('click', optionClickEvent);
        });

    } else {
        finishQuiz();
    }
}

function optionClickEvent(e) {
    currentQuestion++;
    showQuestion();
}

function finishQuiz() {
    document.querySelector('.Text').innerHTML = `VOCÊ RESPONDEU TODAS AS QUESTÕES`;
    document.querySelector('.scoreArea').style.display = 'block';
    document.querySelector('.questionArea').style.display = 'none';
    document.querySelector('.progress--bar').style.width = '100%';
}

function resetEvent() {
    window.location = "../dashboard/dashboardtlgd.html";
}

// Coletar nome do usuário
b_usuario.innerHTML = sessionStorage.NOME_USUARIO;
// Automatizando sidebar
const body = document.querySelector("body"),
    sidebar = body.querySelector("nav");
sidebarToggle = body.querySelector(".sidebar-toggle");

let getStatus = localStorage.getItem("status");
if (getStatus && getStatus === "close") {
    sidebar.classList.toggle("close");
}

sidebarToggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");
    if (sidebar.classList.contains("close")) {
        localStorage.setItem("status", "close");
    } else {
        localStorage.setItem("status", "open");
    }
})