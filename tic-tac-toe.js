let game = {
    board: ["", "", "", "", "", "", "", "", ""],
    turn : 0,
    player1: "X",
    player2: "O",
    isOn: false

}
let menu = {
    isOn: false,
    selection: 0,
    menu : document.getElementById("menu"),
    StartGame: function(){
        let body = document.querySelector("body");
        body.style.height = "100vh";


        this.menu.style.transition = 'opacity 0.5s ease, transform 0.5s ease'; 
        this.menu.style.opacity = 0; 
        this.menu.style.transform = 'scale(0.9)'; 

        this.turnOn();
        this.setCurrentSelection();
    },
    turnOn(){
        setTimeout(() => { 
            this.menu.style.opacity = 1; // Fade in
            this.menu.style.transform = 'scale(1)'; // Zoom in
        }, 10); 

        this.menu.style.display = 'flex';
        this.isOn = true;
    },
    setCurrentSelection: function(){
        let playButtons = document.querySelectorAll('#menu button');
        playButtons[this.selection].style.backgroundColor 
    }
}

menu.StartGame();