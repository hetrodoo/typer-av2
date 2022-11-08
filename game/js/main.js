let game;

window.startGame = (difficulty = undefined) => {
    if (!!difficulty) {
        game = new GameInstance(getWordListForDifficulty(difficulty), 15, difficulty);
        UI.difficultyDialog.style.display = "none";
    }

    if (location.hostname === 'localhost')
        console.log("Game started with difficulty", game.difficulty);

    game.setup();
}

setInterval(() => {
    if (game && game.isRunning && game.startTime !== undefined) {
        UI.timer.innerText = `${Math.floor((new Date().getTime() - game.startTime) / 1000)} segundos`
    } else {
        UI.timer.innerText = '';
    }
}, 500);
