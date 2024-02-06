'use strict'

const WALL = '#'
const FOOD = '.'
const EMPTY = ' '
const SUPERFOOD = '*'
const CHERRY = '🍒'
var gCherryIntervalID
// Model
const gGame = {
    score: 0,
    isOn: false
}
var gBoard
var gFoodCounter = -1
var gFoodEatenCounter = 0

// add counter to the array of gGame

function onInit() {
    updateScore(0)
    gFoodCounter = -1
    gFoodEatenCounter = 0
    if (gCherryIntervalID) clearInterval(gCherryIntervalID)
    gCherryIntervalID = setInterval(randomCherry, 15000)
    gBoard = buildBoard()
    createGhosts(gBoard)
    createPacman(gBoard)
    renderBoard(gBoard)
    gGame.isOn = true
    hidePopup()
    // moveGhosts()
}

function buildBoard() {
    const size = 10
    const board = []

    for (var i = 0; i < size; i++) {
        board.push([])

        for (var j = 0; j < size; j++) {
            board[i][j] = FOOD


            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2)) {
                board[i][j] = WALL
            } else if ((i === 1 && j === 1) || (i === 1 && j === size - 2) || (i === size - 2 && j === 1) || (i === size - 2 && j === size - 2)) {
                board[i][j] = SUPERFOOD
            }
            else {
                gFoodCounter++
            }
        }
    }
    // console.log(gFoodCounter)
    gFoodCounter-- // one le
    return board
}

function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {

            const cell = board[i][j]
            const className = `cell cell-${i}-${j}`

            strHTML += `<td class="${className}">${cell}</td>`
        }
        strHTML += '</tr>'
    }
    const elContainer = document.querySelector('.board')
    elContainer.innerHTML = strHTML
}

// location is an object like this - { i: 2, j: 7 }
function renderCell(location, value) {
    // Select the elCell and set the value
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value
}


function randomCherry() {
    var emptyCells = []
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            if (gBoard[i][j] === EMPTY) {
                emptyCells.push({ i: i, j: j })
            }
        }
    }
    var randomLocation = getRandomIntInclusive(0, emptyCells.length - 1)
    var cherryLocation = emptyCells[randomLocation]
    gBoard[cherryLocation.i][cherryLocation.j] = CHERRY
    renderCell(cherryLocation, CHERRY)
}


function updateScore(diff) {
    // DONE: update model and dom
    if (!diff) {
        gGame.score = 0
    } else {
        gGame.score += diff
    }
    document.querySelector('span.score').innerText = gGame.score
}

function gameOver() {
    console.log('Game Over')
    clearInterval(gIntervalGhosts)
    clearInterval(gCherryIntervalID)
    renderCell(gPacman.location, '🪦')
    gGame.isOn = false
    showPopup()
}
// try with one function toggle work with classes instead of inline
function showPopup() {
    const elPopup = document.querySelector(".popup")
    elPopup.style.display = 'block'
}

function hidePopup() {
    const elPopup = document.querySelector(".popup")
    elPopup.style.display = 'none'
}


function showVictory() {
    const elPopup = document.querySelector(".popup .popup-txt")
    console.log(elPopup)
    elPopup.innerText = "VICTORY!!!"
    gGame.isOn = false
    if (gIntervalGhosts) clearInterval(gIntervalGhosts)
    showPopup()
}