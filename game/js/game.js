class GameInstance {
    #availableWords = [];
    wordCount = 0;
    wordList = [];
    match = 0;
    inputText = "";
    startTime = undefined;
    isRunning = false;
    difficulty = 0;

    constructor(availableWords, wordCount, difficulty) {
        this.#availableWords = availableWords;
        this.wordCount = wordCount;
        this.difficulty = difficulty;
        const thisRef = this;

        window.addEventListener('keydown', function ({key, cancelable, preventDefault}) {
            thisRef.onKeyDown({key, cancelable, preventDefault: preventDefault.bind(arguments[0])});
        });
    }

    setup() {
        UI.difficultyDialog.style.display = 'none';
        UI.dialog.style.display = 'none';
        this.isRunning = true;
        this.wordList = [];
        this.match = 0;

        for (let i = 0; i < this.wordCount; i++) {
            this.wordList.push(this.#availableWords[Math.ceil(Math.random() * this.#availableWords.length)]);
        }

        window.updateWordDisplay(this.wordList);
    }

    finish() {
        const actualTime = (new Date().getTime() - this.startTime) / 1000;
        const medianTime = this.wordCount / (40 / 60);
        const wpm = this.match / (actualTime / 60);
        const points = Math.floor(this.match * (medianTime / actualTime) * (this.wordCount === this.match ? 2 : 1) * this.difficulty) * 100;

        if (location.hostname === 'localhost') {
            console.log("wordCount", this.wordCount);
            console.log("match", this.match);
            console.log("medianTime", medianTime);
            console.log("actualTime", actualTime);
            console.log("wpm", wpm);
            console.log("points", points);
        }

        UI.dialog.style.display = 'block';
        UI.score.innerText = `${points} (${getNameForDifficulty(this.difficulty)})`;
        UI.stars.innerText = points === 0 ? "-" : "⭐";
        UI.wpm.innerText = `${Math.floor(wpm)}`;

        if (this.wordCount === this.match) {
            UI.stars.innerText += " ⭐";

            if (actualTime <= medianTime) {
                UI.stars.innerText += " ⭐";
            } else {
                UI.stars.innerText += " -";
            }
        } else {
            UI.stars.innerText += " - -";
        }

        this.isRunning = false;
        this.startTime = undefined;
    }

    onKeyDown({key, cancelable, preventDefault}) {
        cancelable && preventDefault();

        if (key === 'Enter' && this.wordList.length !== 0) {
            const x = window.innerWidth / 2;
            const y = window.innerHeight / 2;
            const size = window.innerWidth > window.innerHeight ? window.innerHeight / 2 : window.innerWidth / 2;

            if (this.difficulty === difficultyEnum.easy && this.inputText !== this.wordList[0]) {
                createExplosion(x, y, size, size, "rgba(255,0,0,0.25)");
                return;
            }

            if (this.wordList.shift() === this.inputText) {
                this.match++;
                createExplosion(x, y, size, size, "rgba(0,255,0,0.25)");
            } else {
                createExplosion(x, y, size, size, "rgba(255,0,0,0.25)");
            }

            this.inputText = "";
            window.updateWordDisplay(this.wordList);
            window.renderCharacters(this.inputText, this.wordList[0] || []);

            if (this.wordList.length === 0) {
                this.finish();
            }
        }

        if (key === 'Backspace') {
            this.inputText = this.inputText.substring(0, this.inputText.length - 1);
            window.renderCharacters(this.inputText, this.wordList[0] || []);
        }

        if (/^[\w\W]{1}$/g.test(key)) {
            if (this.difficulty === difficultyEnum.easy && key !== this.wordList[0][this.inputText.length]) {
                window.applyTypingErrorAnimation();
                return;
            }

            if (this.isRunning && this.startTime === undefined) {
                this.startTime = new Date().getTime();
            }

            this.inputText += key;
            window.renderCharacters(this.inputText, this.wordList[0] || []);
        }
    }
}
