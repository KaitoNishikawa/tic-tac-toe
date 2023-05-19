document.addEventListener('DOMContentLoaded', ()=>{    
    makeMove.startGame()
})

const gameBoard = (() => {
    let board = ['', '', '', '', '', '', '', '', '']
    const resetButton = document.getElementById('bottom')

    resetButton.addEventListener('click', () => {
        render()
        makeMove.startGame()
    })

    const render = () => {
        for(let i = 0; i < board.length; i++){
            board[i] = ''
        }
    };

    const updateBoard = (index, sign) => {
        board[index] = sign;
    };

    return {updateBoard, board, render}
})();

const makeMove = (() => {   

    const startGame = () => {
        const overlay = document.getElementById('overlay')
        const cellElements = document.querySelectorAll('[data-cell]')   
        changeSignIndicator('x')
        overlay.classList.remove('active')
        overlay.addEventListener('click', ()=>{
            gameBoard.render()
            startGame()
        })
        let round = 0;

        cellElements.forEach(cell => {
            cell.textContent = ''
            cell.addEventListener('click', (e)=>{
                if(round % 2 == 0){
                    e.target.textContent = 'x';
                    e.target.style.color = '#545454';
                    gameBoard.updateBoard(e.target.dataset.number, 'x')
                    if(checkForWin('x')){
                        overlay.textContent = 'x wins'
                        overlay.classList.add('active')
                    }
                    else{
                        if(checkForDraw()){
                            overlay.textContent = 'draw'
                            overlay.classList.add('active')
                        }
                        else{
                            changeSignIndicator('o')
                        }
                    }
                }
                else{
                    e.target.textContent = 'o';
                    e.target.style.color = '#f1ebd3';
                    gameBoard.updateBoard(e.target.dataset.number, 'o')
                    if(checkForWin('o')){
                        overlay.textContent = "o wins"
                        overlay.classList.add('active')
                    }
                    else{
                        if(checkForDraw()){
                            overlay.textContent = 'draw'
                            overlay.classList.add('active')
                        }
                        else{
                            changeSignIndicator('x')
                        }
                    }
                }
                round++;
            }, {once: true})
        })
    }    

    const checkForWin = (sign) => {
        const winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]      
        let signPositions = []
        for(let i = 0; i < gameBoard.board.length; i++){
            if(gameBoard.board[i] == sign){
                signPositions.push(i)
            }
        }

        for(let i = 0; i < winConditions.length; i++){
            let counter = 0;
            for(let j = 0; j < winConditions[i].length; j++){
                for(let k = 0; k < signPositions.length; k++){
                    if(signPositions[k] == winConditions[i][j]){
                        counter++;
                    }
                }
            }
            if(counter == 3){                    
                return true;
            }
        }
        return false;
    }

    const checkForDraw = () => {
        let counter = 0;

        for(let i = 0; i < gameBoard.board.length; i++){
            if(gameBoard.board[i] != '') counter++
        }
        if(counter == 9) return true

        return false
    }

    const changeSignIndicator = (sign) =>{
        const xIndicator = document.getElementById('x-indicator')
        const oIndicator = document.getElementById('o-indicator')

        if(sign == 'x'){
            oIndicator.style.border = null
            oIndicator.style.boxShadow = null

            xIndicator.style.border = '2px solid black'
            xIndicator.style.boxShadow = '0px 3px 7px 0px #A0A0A0'
        }

        else{
            xIndicator.style.border = null
            xIndicator.style.boxShadow = null

            oIndicator.style.border = '2px solid black'
            oIndicator.style.boxShadow = '0px 3px 7px 0px #A0A0A0'
        }
    }

    return {startGame, changeSignIndicator}
})();