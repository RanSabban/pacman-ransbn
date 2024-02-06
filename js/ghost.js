'use strict'

const GHOST = '👻'
var gGhosts = []

var gIntervalGhosts

function createGhosts(board) {
    // DONE: 3 ghosts and an interval
    gGhosts = []
    for (var i = 0; i < 3; i++) {
        createGhost(board)
    }
    for (var i = 0; i < 3; i++) {
        const ghostEl = document.getElementById(gGhosts[i].id)
        // ghostEl.style.backgroundColor = gGhosts[i].color

    }
    if (gIntervalGhosts) clearInterval(gIntervalGhosts)
    gIntervalGhosts = setInterval(moveGhosts, 1000)
    console.log(gGhosts)
}

function createGhost(board) {
    // DONE
    const ghost = {
        location: {
            i: 2,
            j: 6
        },
        currCellContent: FOOD,
        color: getRandomColor(),
        id: makeId(),
        isEaten: false
    }

    gGhosts.push(ghost)
    board[ghost.location.i][ghost.location.j] = GHOST

}

function moveGhosts() {
    // DONE: loop through ghosts
    for (var i = 0; i < gGhosts.length; i++) {
        if (gGhosts[i].isEaten === false) {
            const ghost = gGhosts[i]
            moveGhost(ghost)
        }
    }
}

function moveGhost(ghost) {
    // DONE: figure out moveDiff, nextLocation, nextCell
    const moveDiff = getMoveDiff()
    const nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j
    }
    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    // DONE: return if cannot move
    if (nextCell === WALL) return
    if (nextCell === GHOST) return

    // DONE: hitting a pacman? call gameOver
    if (nextCell === PACMAN && ghost.color === 'blue') {
        return
    } else if (nextCell === PACMAN && ghost.color !== 'blue') {
        gameOver()
        return
    }


    // DONE: moving from current location:
    // DONE: update the model 
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
    // DONE: update the DOM
    renderCell(ghost.location, ghost.currCellContent)


    // DONE: Move the ghost to new location:
    // DONE: update the model 
    ghost.location = nextLocation
    ghost.currCellContent = nextCell
    gBoard[nextLocation.i][nextLocation.j] = GHOST
    // DONE: update the DOM
    renderCell(ghost.location, getGhostHTML(ghost))
    const ghostEl = document.getElementById(ghost.id)
    ghostEl.style.backgroundColor = ghost.color

}

function getMoveDiff() {
    const randNum = getRandomIntInclusive(1, 4)

    switch (randNum) {
        case 1: return { i: 0, j: 1 }
        case 2: return { i: 1, j: 0 }
        case 3: return { i: 0, j: -1 }
        case 4: return { i: -1, j: 0 }
    }
}

// add all color logic  through ghost html

function getGhostHTML(ghost) {
    return `<span id = "${ghost.id}">${GHOST}</span>`
}

function getGhostByLocation(sentLocation) {
    for (var i = 0; i < gGhosts.length; i++) {
        if (sentLocation.i === gGhosts[i].location.i && sentLocation.j === gGhosts[i].location.j) {
            return i
        }
    }
}

function eatGhost(ghostIdx) {
    gGhosts[ghostIdx].isEaten = true
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function startSuperTimer() {
    setTimeout(releaseGhosts, 5000)
}

function releaseGhosts() {
    for (var i = 0; i < gGhosts.length; i++) {
        gGhosts[i].isEaten = false
        gGhosts[i].color = getRandomColor()
    }
    gPacman.isSuper = false
}



