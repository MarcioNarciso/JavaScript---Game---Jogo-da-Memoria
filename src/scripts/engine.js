/**
 * Figuras que serão sorteadas para o jogador escolher.
 */
const emojis = ["🐱","🐱","🐼","🐼","🦊","🦊","🐶","🐶","🐵","🐵","🦁","🦁","🐯","🐯","🐮","🐮"];

const state = {
    view : {
        gameBoard : document.querySelector(".game"),
        modalResult : document.querySelector(".modal-bg"),
        resultGameMessage : document.querySelector(".modal .content div p"),
        openCard1 : null,
        openCard2 : null
    },
    values : {
        shuffledEmojis : emojis.sort(() => (Math.random() > 0.5) ? 2 : -1),
        emojisMatchCounter : 0
    }
}

/**
 * Constrói o quadro com os cartões do jogo.
 */
function buildBoard() {
    let box = null;

    // Cria um cartão para cada figura no array
    for(let i=0; i < emojis.length; i++) {
        // Cria o cartão
        box = document.createElement("div");

        box.className = "item";
        box.innerHTML = state.values.shuffledEmojis[i];
        box.onclick = handleClick;

        // Adiciona o cartão ao quadro
        state.view.gameBoard.appendChild(box);
    }
}


function handleClick() {

    if (! state.view.openCard1) {
        state.view.openCard1 = this;
        this.classList.add("boxOpen");
    } else if (! state.view.openCard2) {
        state.view.openCard2 = this;
        this.classList.add("boxOpen");
    }

    if (state.view.openCard1 && state.view.openCard2) {
        checkMatch();
    }
}

function checkMatch() {
    const openCard1 = state.view.openCard1;
    const openCard2 = state.view.openCard2;
    const isMatch = openCard1.innerHTML === openCard2.innerHTML;
    
    // Bloqueia o clique em todos os cartões
    blockItemsClick();

    // Reseta os cartões selecionados pelo jogador
    state.view.openCard1 = null;
    state.view.openCard2 = null;

    if (isMatch) {
        openCard1.classList.add("boxMatch");
        openCard2.classList.add("boxMatch");
        state.values.emojisMatchCounter++;
    } 

    // Coloca um delay para dar tempo do jogador ver os cards selecionados
    setTimeout(() => {
        openCard1.classList.remove("boxOpen");
        openCard2.classList.remove("boxOpen");

        const isGameOver = state.values.emojisMatchCounter === emojis.length / 2;

        if (isGameOver) {
            showModalResult("");
            return;
        }

        // Desbloqueia o clique em todos os cartões
        blockItemsClick(false);
    }, 500);

}

/**
 * Bloqueia ou desbloqueia os cartões para o jogador poder ou não clicar neles.
 * @param {boolean} isBlockItems 
 */
function blockItemsClick(isBlockItems = true) {
    state.view.gameBoard.querySelectorAll(".item").forEach(item => {
        if (isBlockItems) {
            item.classList.add("block-element");
        } else {
            item.classList.remove("block-element");
        }
    });
}

function showModalResult(msg) {
    state.view.resultGameMessage.textContent = msg;
    state.view.modalResult.style.display = "flex";
}


function init() {
    buildBoard();
}

init();