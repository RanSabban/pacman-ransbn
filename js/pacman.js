'use strict'

const PACMAN = '🤯'
var gPacman


function createPacman(board) {
    // DONE: initialize gPacman...
    gPacman = {
        location: {
            i: 2,
            j: 2
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}

function onMovePacman(ev) {
    if (!gGame.isOn) return
    // DONE: use getNextLocation(), nextCell
    const nextLocation = getNextLocation(ev.key)
    // console.log(nextLocation)
    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    // DONE: return if cannot move
    if (nextCell === WALL) return

    // DONE: hitting a ghost? call gameOver
    if (nextCell === GHOST) {
        var ghostIndex = getGhostByLocation(nextLocation)
        // console.log(ghostIndex)
        if(gGhosts[ghostIndex].color === 'blue'){
            eatGhost(ghostIndex)
        } else {
            gameOver()
            return
        }  
    }
    if (nextCell === SUPERFOOD && gPacman.isSuper === false){
        for(var i = 0 ; i < 3 ; i ++){
            gGhosts[i].color = 'blue'
        }
        startSuperTimer()
        gPacman.isSuper = true
    } else if(nextCell === SUPERFOOD && gPacman.isSuper === true){
        return
    }
    if (nextCell === FOOD) {
        updateScore(1)
        gFoodEatenCounter++
        if(gFoodCounter === gFoodEatenCounter){
            showVictory()
        }
    }

    if (nextCell === CHERRY){
        updateScore(15)
    }

    // DONE: moving from current location:
    // DONE: update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    // DONE: update the DOM
    renderCell(gPacman.location, EMPTY)

    // DONE: Move the pacman to new location:
    // DONE: update the model
    gPacman.location = nextLocation
    gBoard[nextLocation.i][nextLocation.j] = PACMAN
    // DONE: update the DOM
    renderCell(nextLocation, PACMAN)
}

function getNextLocation(eventKeyboard) {
    const nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    switch (eventKeyboard) {
        case 'ArrowUp':
            nextLocation.i--
            break;
        case 'ArrowRight':
            nextLocation.j++
            break;
        case 'ArrowDown':
            nextLocation.i++
            break;
        case 'ArrowLeft':
            nextLocation.j--
            break;
    }
    return nextLocation
}