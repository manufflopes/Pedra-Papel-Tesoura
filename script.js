let pontosJogador = 0
let pontosRobo = 0

let historicoPartidas = []

function updateScore() {
    let placarJogador = document.querySelector('#score_player')
    let placarRobo = document.querySelector('#score_computer')
    placarJogador.textContent = pontosJogador
    placarRobo.textContent = pontosRobo
}

updateScore()
// capturar o click do jogador
const gameOptions = document.querySelectorAll('.gameControls button')
for (let posicao = 0; posicao < gameOptions.length; posicao++) {
    gameOptions[posicao].addEventListener('click', handlePlay)
}

function handlePlay() {
    // depois da captura, salvar o valor em uma variavel
    let jogadaPlayer = this.id
    let jogadaRobo = roboChoice()

    let vencedor = checkWinner(jogadaPlayer, jogadaRobo)
    let partida = historicoPartidas.push(vencedor)
    updateMatchHistory(partida, vencedor)

    if (vencedor == 'jogador') {
        pontosJogador++
    } else if (vencedor == 'robo') {
        pontosRobo++
    }
    updateScore()
    updateChoice(jogadaPlayer, jogadaRobo)
    checkEndGame()
}

function checkEndGame() {
    let vencedor = document.querySelector('#finalScore .winner')
    let vitoriasJogador = 0
    let vitoriasRobo = 0
    let empate = 0
    for (let partida = 0; partida < historicoPartidas.length; partida++) {
        const matchWinner = historicoPartidas[partida]
        if (matchWinner == 'jogador') {
            vitoriasJogador++
        } else if (matchWinner == 'robo') {
            vitoriasRobo++
        } else {
            empate++
        }
    }

    if (vitoriasJogador > 4) {
        vencedor.classList.add('jogador')
        blockButtons()
    }
    if (vitoriasRobo > 4) {
        vencedor.classList.add('robo')
        blockButtons()
    }

    if (historicoPartidas.length == 9) {
        if (vitoriasJogador > vitoriasRobo) {
            vencedor.classList.add('jogador')
        } else if (vitoriasRobo > vitoriasJogador) {
            vencedor.classList.add('robo')
        } else {
            vencedor.classList.add('draw')
        }
        blockButtons()
    }
}

function blockButtons() {
    gameOptions.forEach(button => (button.disabled = true))
    let gameSection = document.querySelector('.gameControls')
    let resetGameButton = document.createElement('button')
    resetGameButton.innerHTML = 'Reiniciar Jogo'
    resetGameButton.addEventListener('click', function () {
        document.location.reload()
    })
    gameSection.innerHTML = ""
    gameSection.append (resetGameButton)
}

function updateMatchHistory(match, vencedor) {
    let winner = document.querySelector(`#partida_${match} .winner`)
    winner.classList.add(vencedor)
}

function updateChoice(playerOption, roboOption) {
    let playerChoiceImg = document.querySelector('#option_player img')
    let roboChoiceImg = document.querySelector('#option_computer img')
    playerChoiceImg.src = './imagens/' + playerOption + '.png'
    roboChoiceImg.src = './imagens/' + roboOption + '.png'
}

// fazer a jogada do robo
function roboChoice() {
    let roboOptions = ['não serve', 'rock', 'paper', 'scissor']
    let roboChoice = Math.floor(Math.random() * 3 + 1)
    return roboOptions[roboChoice]
}

//comparar quem ganhou

function checkWinner(playerOption, roboOption) {
    console.log(`jogador: ${playerOption} | robo: ${roboOption}`)

    if (playerOption == roboOption) {
        console.log('Empate')
        return 'draw'
    }

    if (playerOption == 'scissor') {
        if (roboOption == 'paper') {
            console.log('Jogador Ganhou')
            return 'jogador'
        }
        console.log('Robô Ganhou')
        return 'robo'
    }

    if (playerOption == 'rock') {
        if (roboOption == 'paper') {
            console.log('Robô Ganhou')
            return 'robo'
        }
        console.log('Jogador Ganhou')
        return 'jogador'
    }

    if (playerOption == 'paper') {
        if (roboOption == 'rock') {
            console.log('Jogador Ganhou')
            return 'jogador'
        }
        console.log('Robô Ganhou')
        return 'robo'
    }
}
