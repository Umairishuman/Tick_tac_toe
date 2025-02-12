let game = {
    board: ["", "", "", "", "", "", "", "", ""],
    turn : 0,
    player1: "X",
    player2: "O",
    isOn: false,
    game: document.getElementById("game"),

    score: {
        player1: 0,
        player2: 0,
        ties: 0,
        displayScore(){
            let player1Score = document.querySelector('#player1-score .score-num');
            let player2Score = document.querySelector('#player2-score .score-num');
            let ties = document.querySelector('#draws .score-num');
            player1Score.textContent = this.player1;
            player2Score.textContent = this.player2;
            ties.textContent = this.ties;
        }
    },

    turnOn(){
        this.isOn = true;
        let body = document.querySelector("body");
        body.style.height = 'auto';

        this.game.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        this.game.style.opacity = 0;
        this.game.style.transform = 'scale(0.9)';

        setTimeout(() => {
            this.game.style.opacity = 1;
            this.game.style.transform = 'scale(1)';
        }
        , 10);
        this.game.style.display = 'flex';
    },
    turnOff(){
        this.game.style.display = 'none';
        this.isOn = false;
        menu.turnOn();
    },
    handleInput(event){
        if(event.type === 'keydown'){
            if(event.key === 'Escape'){
                this.turnOff();
            }
            else if(event.key === 'Enter'){
                this.resetGame();
            }
        }
        else if(event.type === 'click'){
            let squares = document.querySelectorAll('.square');
            squares.forEach((square, index)=>{
                let rect = square.getBoundingClientRect();
                let isClicked = event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
                if(isClicked){
                    this.makeMove(index);
                }
            })
        }
    },
    makeMove(index){
        if(this.board[index] === ""){
            this.board[index] = this.turn % 2 === 0 ? this.player1 : this.player2;
            this.turn++;
            this.updateBoard();
            let result = this.checkWinner();
            if(result){
                this.gameOver(result);
            }
            else if(this.turn === 9){
                this.gameOver(null);
            }
        }
    },
    updateBoard(){
        let squares = document.querySelectorAll('.square img');
        squares.forEach((square, index)=>{
            square.src = this.board[index] === "" ? "" : `Assets/${this.board[index]}.png`;
        })
        if(this.turn %2 == 0){
            document.getElementById('current-turn').textContent = "Player 1's Turn";
        }
        else{
            document.getElementById('current-turn').textContent = "Player 2's Turn";
        }
    },
    checkWinner(){
        let winningCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];
        for(let combo of winningCombos){
            let [a, b, c] = combo;
            if(this.board[a] !== "" && this.board[a] === this.board[b] && this.board[a] === this.board[c]){
                return this.board[a];
            }
        }
        return false;
    },
    gameOver(winner){
        if(winner === null){
            this.score.ties++;
            setTimeout(() => {
                alert("It's a Tie!");
            }, 100);
            return;
        }
        if(winner === "X"){
            this.score.player1++;
            // alert("Player 1 Wins!");
            setTimeout(() => {
                alert("Player 1 Wins!");
            }, 100);
        }
        else if(winner === "O"){
            this.score.player2++;
            // alert("Player 2 Wins!");
            setTimeout(() => {
                alert("Player 2 Wins!");
            }, 100);
        }
        this.score.displayScore();
        setTimeout(() => {
            this.resetGame();
        }, 1000);

    },
    resetGame(){
        this.board = ["", "", "", "", "", "", "", "", ""];
        console.log(board);
        this.turn = 0;
        this.updateBoard();
    }




}
let menu = {
    isOn: false,
    selection: 0,
    menu : document.getElementById("menu"),
    color1: '#af9898',
    color2: '#240808',    
    StartGame: function(){
        let body = document.querySelector("body");
        body.style.height = "100vh";


        this.menu.style.transition = 'opacity 0.5s ease, transform 0.5s ease'; 
        this.menu.style.opacity = 0; 
        this.menu.style.transform = 'scale(0.9)'; 

        this.turnOn();
        this.setCurrentSelection(0);
    },
    turnOn(){
        setTimeout(() => { 
            this.menu.style.opacity = 1; // Fade in
            this.menu.style.transform = 'scale(1)'; // Zoom in
        }, 10); 

        this.menu.style.display = 'flex';
        this.isOn = true;
    },
    setCurrentSelection: function(selectionDirection){
        this.selection += selectionDirection;
        this.selection = (this.selection + 2) % 2;
        let playButtons = document.querySelectorAll('#menu button');
        playButtons.forEach(button => {
            button.style.backgroundColor = this.color1;
            button.style.color = this.color2;
            button.style.border = '2px solid rgb(255, 255, 255)';
        });

        let selectedButton = playButtons[this.selection];
        selectedButton.style.backgroundColor = this.color2;
        selectedButton.style.color = this.color1;        selectedButton.style.border = '2px solid #000000';

    },
    handleInput(event){
        if(event.type === 'keydown'){
            switch(event.key){
                case 'ArrowUp':
                    this.setCurrentSelection(-1);
                    break;
                case 'ArrowDown':
                    this.setCurrentSelection(1);
                    break;
                case 'Enter':
                    this.turnOff();
                    break;
            }
        }
        else if(event.type === 'mousemove'){
            let buttons = document.querySelectorAll('#menu button');
            buttons.forEach((button, index)=>{
                let rect = button.getBoundingClientRect();
                let isHovered = event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
                if(isHovered){
                    this.selection = index; 
                    this.setCurrentSelection(0);
                }
            })
        }
        else if (event.type === 'click'){
            let buttons = document.querySelectorAll('#menu button');
            buttons.forEach((button, index)=>{
                let rect = button.getBoundingClientRect();
                let isClicked = event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
                if(isClicked){
                    this.selection = index; 
                    this.setCurrentSelection(0);
                    this.turnOff();
                }
            })
        }
            
    },
    turnOff(){
        this.menu.style.display = 'none';
        this.isOn = false;
        game.turnOn();
    }
}
function handleInput(event){
    if(menu.isOn){
        menu.handleInput(event);
    }
    else if(game.isOn){
        game.handleInput(event);
    }
}
menu.StartGame();

document.addEventListener('mousemove', handleInput);

document.addEventListener('keydown', handleInput);
document.addEventListener('click', handleInput);