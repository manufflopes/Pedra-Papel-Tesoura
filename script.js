let pontosJogador = 0
let pontosRobo = 0

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
    gameOptions[posicao].addEventListener('click', function () {
        // depois da captura, salvar o valor em uma variavel
        let jogadaPlayer = this.id
        let jogadaRobo = roboChoice()
        checkWinner(jogadaPlayer, jogadaRobo)
    })
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
        return
    }

    if (playerOption == 'scissor') {
        if (roboOption == 'paper') {
            console.log('Jogador Ganhou')
            return
        }
        console.log('Robô Ganhou')
        return
    }

    if (playerOption == 'rock') {
        if (roboOption == 'paper') {
            console.log('Robô Ganhou')
            return
        }
        console.log('Jogador Ganhou')
        return
    }

    if (playerOption == 'paper') {
        if (roboOption == 'rock') {
            console.log('Jogador Ganhou')
            return
        }
        console.log('Robô Ganhou')
        return
    }
}
