const UI = Object.freeze({
    actualInput: document.getElementById("actual-input"),
    wordDisplay: document.getElementById("word-display"),
    timer: document.getElementById("timer"),
    customInput: document.getElementById("custom-input"),
    dialog: document.getElementById("dialog"),
    score: document.getElementById("score"),
    stars: document.getElementById("stars"),
    wpm: document.getElementById("wpm"),
});

window.renderCharacters = function (input = "", expectedInput = "") {
    [...UI.customInput.children].forEach(el => el.remove());

    const characters = [...input];

    for (let i = 0; i < characters.length; i++) {
        const shouldAnimate = i !== 0 && i === characters.length - 1;
        const isWrong = expectedInput[i] !== characters[i];
        const newEl = document.createElement("div");

        newEl.setAttribute("class", `char${isWrong ? " wrong" : ""}${shouldAnimate ? " pop-in" : ""}`);
        newEl.innerText = characters[i];

        if (characters[i] === " ") {
            newEl.innerText = '-';
            newEl.style.color = "transparent";
        }

        UI.customInput.appendChild(newEl);
    }

    if (input.length === 0) {
        const newEl = document.createElement("div");
        newEl.setAttribute("class", "char");
        newEl.innerHTML = `<span class="blink">|</span>`;

        UI.customInput.appendChild(newEl);
    }
}