
/* ===== CONFIGURAÇÃO DO QUIZ ===== */

const perguntas = [
    {
        pergunta: "Qual destas coisas deixa um momento ainda mais especial?",
        opcoes: [
            "Uma conversa que faz o tempo passar voando",
            "Te presentear com algo que você queria muito",
            "Realizar uma surpresa",
            "os pequenos detalhes como um sorriso, um gesto de amor e etc."
        ],
        correta: 0,
        mensagens: [
            "É isso! Às vezes, uma boa conversa vale mais do que qualquer presente. ❤️",
            "Presentes são legais, mas o carinho está nas pequenas coisas. 💗",
            "Quem não gosta de uma surpresa não é?!",
            "São esses pequenos detalhes que fazem toda a diferença"
        ]
    },
    {
        pergunta: "Escolha um plano para um dia perfeito a dois.",
        opcoes: [
            "Aprender a fazer algo juntos",
            "Café da manhã, almoço e jantar fora kkkkkk",
            "Cozinhar algo gostoso juntos",
            "Pintar telas ou fazer um desenho juntos"
        ],
        correta: 1,
        mensagens: [
            "Aprender a fazer algo juntos é muito bom, o que importa mesmo é estarmos juntos. 💕",
            "Essa é uma das coisas mais bonitas: aproveitar a companhia um do outro. ❤️",
            "Hahaha, temos dois masterchefs por aqui😂",
            "Experiências como estas são essenciais. 💗"
        ]
    },
    {
        pergunta: "O que você acha que faz uma relação ficar mais forte?",
        opcoes: [
            "Ceder as suas vontades de vez em quando",
            "Escutar o que o seu parceiro(a) tem para dizer",
            "Respeito, diálogo, carinho e confiança",
            "Lealdade e Honestidade"
        ],
        correta: 2,
        mensagens: [
            "As vezes é necessário para fortalcer o amor. ❤️",
            "É importante poder falar sobre os sentimentos com sinceridade. 💌",
            "Estas são umas das coisas mais essenciais em um relacionamento. 💗",
            "Muito importante também"
        ]
    },
    {
        pergunta: "Qual destas lembranças você gostaria de construir?",
        opcoes: [
            "Uma viagem que fique marcada na nossa memória",
            "Conquistar todos os nossos patrimônios um do lado do outro",
            "construirmos a nossa família",
            "Todas essas opções!"
        ],
        correta: 3,
        mensagens: [
            "Uma viagem pode render histórias maravilhosas! 🗺️",
            "Nada melhor do que poder conquistar tudo com o amor da sua vida❤️",
            "Isso é a coisa mais linda. 💗",
            "É muito amor envolvido! 🥹💖"
        ]
    },
    {
        pergunta: "E se eu preparasse uma surpresa para você?",
        opcoes: [
            "Eu ficaria curiosa!",
            "Eu ia perguntar o tempo todo o que é.",
            "Eu ia sorrir antes mesmo de saber o que é!",
            "Eu aceitaria com muito carinho."
        ],
        correta: 2,
        mensagens: [
            "A curiosidade faz parte da surpresa! 👀",
            "Essa é a graça 😂.",
            "Espero que este site consiga arrancar um sorriso gostoso seu.❤️",
            "Foi feito com muito carinho, pode ter certeza. 💗"
        ]
    }
];

let perguntaAtual = 0;
let respostasEscolhidas = [];
let quizRespondido = false;

/* ===== NAVEGAÇÃO ===== */

function irPara(id) {
    const telas = document.querySelectorAll(".tela");

    telas.forEach(function(tela) {
        tela.classList.remove("ativa");
    });

    const destino = document.getElementById(id);

    if (!destino) return;

    destino.classList.add("ativa");

    const ordem = [
        "inicio", "historia", "quiz", "fotos", "carta", "pedido"
    ];

    const indice = ordem.indexOf(id);
    const progresso = document.getElementById("barraProgresso");

    if (progresso && indice >= 0) {
        progresso.style.width = (indice / (ordem.length - 1) * 100) + "%";
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    if (id === "quiz") {
        mostrarPergunta();
    }
}

/* ===== EXIBIR PERGUNTA ===== */

function mostrarPergunta() {
    const dados = perguntas[perguntaAtual];

    quizRespondido = false;

    document.getElementById("numeroPergunta").textContent =
        "PERGUNTA " + (perguntaAtual + 1) + " DE " + perguntas.length;

    document.getElementById("perguntaQuiz").textContent =
        dados.pergunta;

    document.getElementById("instrucaoQuiz").textContent =
        "Escolha a resposta que mais combina com você! 💗";

    document.getElementById("feedbackQuiz").textContent = "";

    document.getElementById("proximaPergunta").classList.add("escondido");

    document.getElementById("progressoQuiz").style.width =
        ((perguntaAtual + 1) / perguntas.length * 100) + "%";

    document.getElementById("pontuacao").textContent =
        "♥".repeat(respostasEscolhidas.length) +
        "♡".repeat(perguntas.length - respostasEscolhidas.length);

    const opcoes = document.getElementById("opcoesQuiz");
    opcoes.innerHTML = "";

    dados.opcoes.forEach(function(texto, indice) {
        const botao = document.createElement("button");

        botao.className = "opcao";
        botao.textContent = texto;

        botao.addEventListener("click", function() {
            selecionarResposta(indice);
        });

        opcoes.appendChild(botao);
    });
}

/* ===== PROCESSAR RESPOSTA ===== */

function selecionarResposta(indice) {
    if (quizRespondido) return;

    quizRespondido = true;

    const dados = perguntas[perguntaAtual];
    const botoes = document.querySelectorAll("#opcoesQuiz .opcao");

    respostasEscolhidas[perguntaAtual] = indice;

    botoes.forEach(function(botao, i) {
        botao.disabled = true;

        if (i === indice) {
            botao.classList.add("selecionada");
        }
    });

    const feedback = document.getElementById("feedbackQuiz");

    feedback.textContent = dados.mensagens[indice];

    document.getElementById("pontuacao").textContent =
        "♥".repeat(respostasEscolhidas.length) +
        "♡".repeat(perguntas.length - respostasEscolhidas.length);

    const continuar = document.getElementById("proximaPergunta");
    continuar.classList.remove("escondido");

    continuar.textContent =
        perguntaAtual === perguntas.length - 1
            ? "Ver minha surpresa ❤️"
            : "Próxima pergunta →";
}

/* ===== AVANÇAR NO QUIZ ===== */

function avancarQuiz() {
    if (!quizRespondido) return;

    if (perguntaAtual < perguntas.length - 1) {
        perguntaAtual++;
        mostrarPergunta();
    } else {
        document.getElementById("instrucaoQuiz").textContent =
            "Você completou todas as perguntas! 🥹";

        irPara("fotos");
    }
}

/* ===== PEDIDO DE NAMORO ===== */

function aceitou() {
    const mensagem = document.getElementById("mensagemFinal");

    mensagem.textContent =
        "Este é só co começo de uma história que jamais haverá fim " +
        "uma história cheia de amor, carinho, experiências, respeito, parceria e momentos inesquecíveis, eu te amo além da vida minha pequena. " +
        " 💍💕";

    document.getElementById("recomecar").classList.remove("escondido");

    chuvaDeCoracoes();
}

function respostaCarinhosa() {
    document.getElementById("mensagemFinal").textContent =
        "Claro, meu bem. ❤️ Quero que você se sinta à vontade para " +
        "conversar comigo e dizer o que sente. Sua sinceridade é importante para mim.";

    document.getElementById("recomecar").classList.remove("escondido");
}

/* ===== CHUVA DE CORAÇÕES ===== */

function chuvaDeCoracoes() {
    for (let i = 0; i < 55; i++) {
        const coracao = document.createElement("span");

        coracao.textContent = Math.random() > 0.5 ? "❤️" : "💕";
        coracao.style.position = "fixed";
        coracao.style.left = Math.random() * 100 + "vw";
        coracao.style.bottom = "-45px";
        coracao.style.fontSize = (18 + Math.random() * 25) + "px";
        coracao.style.pointerEvents = "none";
        coracao.style.zIndex = "100";
        document.body.appendChild(coracao);

        const duracao = 2500 + Math.random() * 3000;

        coracao.animate(
            [
                { transform: "translateY(0) rotate(0deg)", opacity: 1 },
                { transform: "translateY(-110vh) rotate(360deg)", opacity: 0 }
            ],
            {
                duration: duracao,
                easing: "ease-out",
                fill: "forwards"
            }
        );

        setTimeout(function() {
            coracao.remove();
        }, duracao + 100);
    }
}

/* ===== FUNDO ANIMADO ===== */

function iniciarFundo() {
    const fundo = document.getElementById("fundoCoracoes");

    if (!fundo) return;

    for (let i = 0; i < 18; i++) {
        const coracao = document.createElement("span");

        coracao.className = "coracao-flutuante";
        coracao.textContent = Math.random() > 0.5 ? "♡" : "♥";
        coracao.style.left = Math.random() * 100 + "%";
        coracao.style.fontSize = (14 + Math.random() * 22) + "px";
        coracao.style.animationDuration = (10 + Math.random() * 15) + "s";
        coracao.style.animationDelay = (-Math.random() * 20) + "s";

        fundo.appendChild(coracao);
    }
}

/* ===== RECOMEÇAR ===== */

function reiniciar() {
    perguntaAtual = 0;
    respostasEscolhidas = [];
    quizRespondido = false;

    document.getElementById("mensagemFinal").textContent = "";
    document.getElementById("recomecar").classList.add("escondido");

    irPara("inicio");
}

/* ===== INICIALIZAR ===== */

iniciarFundo();





function fugirBotao() {
const botao = document.getElementById("botaoNao");

if (!botao) return;

const margem = 20;

// Calcula uma posição dentro da tela
const largura = botao.offsetWidth;
const altura = botao.offsetHeight;

const maxX = Math.max(margem, window.innerWidth - largura - margem);
const maxY = Math.max(margem, window.innerHeight - altura - margem);

const x = margem + Math.random() * (maxX - margem);
const y = margem + Math.random() * (maxY - margem);

// Faz o botão fugir pela tela
botao.style.position = "fixed";
botao.style.left = x + "px";
botao.style.top = y + "px";
}