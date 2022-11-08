class GameInstance {
    #availableWords = [];
    wordCount = 0;
    wordList = [];
    match = 0;
    inputText = "";
    startTime = undefined;
    isRunning = false;

    constructor(availableWords, wordCount) {
        this.#availableWords = availableWords;
        this.wordCount = wordCount;

        setInterval(() => {
            if (this.isRunning && this.startTime !== undefined) {
                UI.timer.innerText = `${Math.floor((new Date().getTime() - this.startTime) / 1000)} segundos`
            } else {
                UI.timer.innerText = '';
            }
        }, 500);

        const thisRef = this;

        window.addEventListener('keydown', function ({key, cancelable, preventDefault}) {
            thisRef.onKeyDown({key, cancelable, preventDefault: preventDefault.bind(arguments[0])});
        });
    }

    setup() {
        UI.dialog.style.display = 'none';
        this.isRunning = true;
        this.wordList = [];
        this.match = 0;

        for (let i = 0; i < this.wordCount; i++) {
            this.wordList.push(this.#availableWords[Math.ceil(Math.random() * this.#availableWords.length)]);
        }

        this.updateWordDisplay();
    }

    finish() {
        const actualTime = (new Date().getTime() - this.startTime) / 1000;
        const medianTime = this.wordCount / (40 / 60);
        const wpm = this.match / (actualTime / 60);
        const points = Math.floor(this.match * (medianTime / actualTime)) * (this.wordCount === this.match ? 2 : 1) * 100;

        console.log("wordCount", this.wordCount);
        console.log("match", this.match);
        console.log("medianTime", medianTime);
        console.log("actualTime", actualTime);
        console.log("wpm", wpm);
        console.log("points", points);

        UI.wordDisplay.innerText = '';
        UI.dialog.style.display = 'block';
        UI.score.innerText = points;
        UI.stars.innerText = points === 0 ? "-" : "⭐";
        UI.wpm.innerText = Math.floor(wpm);

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

    updateWordDisplay() {
        let html = '';

        for (let i = 0; i < Math.min(4, this.wordList.length); i++) {
            if (i === 0)
                html += `${this.wordList[i]}`
            else
                html += `<span class="word-display-sub-${i}">${this.wordList[i]}</span>`;
        }

        UI.wordDisplay.innerHTML = html;
    }

    onKeyDown({key, cancelable, preventDefault}) {
        cancelable && preventDefault();

        if (key === 'Enter' && this.wordList.length !== 0) {
            const word = this.wordList.shift();
            const x = window.innerWidth / 2;
            const y = window.innerHeight / 2;

            const size = window.innerWidth > window.innerHeight ? window.innerHeight / 2 : window.innerWidth / 2;

            if (word === this.inputText) {
                this.match++;
                createExplosion(x, y, size, size, "rgba(0,255,0,0.25)");
            } else {
                createExplosion(x, y, size, size, "rgba(255,0,0,0.25)");
            }

            this.inputText = "";
            this.updateWordDisplay();
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
            if (this.isRunning && this.startTime === undefined) {
                this.startTime = new Date().getTime();
            }

            this.inputText += key;
            window.renderCharacters(this.inputText, this.wordList[0] || []);
        }
    }
}
