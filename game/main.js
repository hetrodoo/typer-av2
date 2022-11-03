const wordCount = 20;
const inputEl = document.getElementById('input');
let wordList = [];
let correct = [];
let wrong = [];
let gameStart = undefined;
let gameRunning = false;

window.addEventListener("click", () => {
    inputEl.focus();
});

inputEl.addEventListener('input', ({ target, data }) => {
    if(gameRunning && gameStart === undefined) {
        gameStart = new Date().getTime();
    }

    const charList = document.getElementById("char-list");
    [...charList.children].forEach(el => el.remove());

    const characters = [...target.value];

    for (let i = 0; i < characters.length; i++) {
        const shouldSlideIn = i !== 0 && i === characters.length - 1 && data;
        const isWrong = wordList[0][i] !== characters[i];
        const newEl = document.createElement("div");

        newEl.setAttribute("class", `char${isWrong ? " wrong" : ""}${shouldSlideIn ? " slide-in" : ""}`);
        newEl.innerText = characters[i];

        if (characters[i] === " ") {
            newEl.innerText = '-';
            newEl.style.color = "transparent";
        }

        charList.appendChild(newEl);
    }

    if (target.value.length === 0) {
        const newEl = document.createElement("div");
        newEl.setAttribute("class", "char");
        newEl.innerHTML = `<span class="blink">|</span>`;

        charList.appendChild(newEl);
    }
});

window.addEventListener('keydown', ({ key }) => {
    if (key !== 'Enter' || wordList.length === 0) return;

    const word = wordList.shift();

    if (word === inputEl.value) {
        correct.push(word);
    } else {
        wrong.push(word);
    }

    updateWordDisplay();

    inputEl.value = "";
    inputEl.dispatchEvent(new Event('input', { bubbles: true }));

    if (wordList.length === 0) {
        const actualTime = (new Date().getTime() - gameStart) / 1000;
        const medianTime = wordCount / (40 / 60);
        const wpm = wordCount / (actualTime / 60);
        const points = Math.floor(correct.length * (medianTime / actualTime)) * (wordCount == correct.length ? 2 : 1) * 100;

        console.log("wordCount", wordCount);
        console.log("correct", correct.length);
        console.log("medianTime", medianTime);
        console.log("actualTime", actualTime);
        console.log("wpm", wpm);
        console.log("points", points);

        document.getElementById('word-display').innerText = '';
        document.getElementById('dialog').style.display = 'block';
        document.getElementById('score').innerText = points;
        document.getElementById('stars').innerText = points === 0 ? "-" : "⭐";
        document.getElementById('wpm').innerText = Math.floor(wpm);

        if (wordCount == correct.length) {
            document.getElementById('stars').innerText += " ⭐";

            if (actualTime <= medianTime) {
                document.getElementById('stars').innerText += " ⭐";
            } else {
                document.getElementById('stars').innerText += " -";
            }
        } else {
            document.getElementById('stars').innerText += " - -";
        }

        gameRunning = false;
        gameStart = undefined;
    }
});

function updateWordDisplay() {
    let html = '';

    for (let i = 0; i < Math.min(4, wordList.length); i++) {
        if (i === 0)
            html += `${wordList[i]}`
        else
            html += `<span class="word-display-sub-${i}">${wordList[i]}</span>`;
    }

    document.getElementById('word-display').innerHTML = html;
}

function startGame() {
    gameRunning = true;
    wordList = [];
    correct = [];
    wrong = [];

    document.getElementById('dialog').style.display = 'none';

    for (let i = 0; i < wordCount; i++) {
        wordList.push(data.words[Math.ceil(Math.random() * data.words.length)]);
    }

    updateWordDisplay();
    window.dispatchEvent(new Event('click', { bubbles: true }));
}

startGame();

setInterval(() => {
    if(gameRunning && gameStart !== undefined) {
        document.getElementById("timer").innerText = `${Math.floor((new Date().getTime() - gameStart) / 1000)} segundos`
    } else {
        document.getElementById("timer").innerText = '';
    }
}, 500);
