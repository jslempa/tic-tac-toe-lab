/*-------------------------------- Constants --------------------------------*/

const winningCombos = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
]


/*---------------------------- Variables (state) ----------------------------*/

board = ['','','','','','','','','']
turn = 'X'
winner = false
tie = false

/*------------------------ Cached Element References ------------------------*/

const squareEls = document.querySelectorAll('.sqr')
const messageEl = document.querySelector('#message')
const resetBtnEl = document.querySelector('#reset')

/*-------------------------------- Functions --------------------------------*/

const init = () => {
    board = ['','','','','','','','','']
    turn = 'X'
    winner = false
    tie = false
    render()
}

const render = () => {
    updateBoard()
    updateMessage()
}

const updateBoard = () => {
    board.forEach((turn, index) => {
        squareEls[index].innerText = turn
    })
}

const updateMessage = () => {
    if (winner === false && tie === false) {
        messageEl.innerText = `Player ${turn}'s turn`
    } else if (winner === false && tie === true) {
        messageEl.innerText = `Tie! Try again`
    } else if (winner === true) {
        messageEl.innerText = `Congratulations player ${turn}! You won!`
    }
}

const handleClick = (event) => {
    const squareIndex = event.target.id
    if (winner === true) {
        return
    }    
    if (board[squareIndex] === 'X' || board[squareIndex] === '0') {
        messageEl.innerText = 'Please select another square'
        return
    } else {
        placePiece(squareIndex) 
        checkForWinner()
        checkForTie()
        switchPlayerTurn()
        updateMessage()
    }    
}
        
const placePiece = (index) => {
    board[index] = turn 
    squareEls[index].innerText = turn
}

const checkForWinner = () => {
    winningCombos.forEach((combo) => {
        combo.forEach((comboSquare) => {
            if (board[combo[0]] === '') {
                return
            } else if (board[combo[0]] === board[combo[1]] && board[combo[1]] === board[combo[2]]) {
                winner = true
            } else {
                return
            }   
        })            
    })
}  
       
const checkForTie = () => {
    if (winner === true) {
        return
    } else {
        if (board.includes('')) {
            return
        } else {
            tie = true
        }
    }
}    

const switchPlayerTurn = () => {
    if (winner === true) {
        return
    } else {
        switch (turn) {
            case 'X':
                turn = 'O'
                messageEl.innerText = `Player O's turn`
                break
            case 'O':  
                turn = 'X' 
                messageEl.innerText = `Player X's turn`
                break   
        }
    }
}


/*----------------------------- Event Listeners -----------------------------*/

squareEls.forEach(square => {
    square.addEventListener('click', handleClick)
}) 

resetBtnEl.addEventListener('click', init)

init()



 