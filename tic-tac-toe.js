let game = {
    board: ["", "", "", "", "", "", "", "", ""],
    turn : 0,
    player1: "X",
    player2: "O",
    isOn: false,
    game: document.getElementById("game"),
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