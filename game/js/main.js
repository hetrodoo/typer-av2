const game = new GameInstance(data.words, 15);

game.setup();

window.startGame = () => {
    game.setup();
};

window.mobileFocusOnActualInput = () => {
    document.getElementById("actual-input").focus();
}
