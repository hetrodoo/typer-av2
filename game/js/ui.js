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

window.updateWordDisplay = function (wordList) {
    let html = '';

    for (let i = 0; i < Math.min(4, wordList.length); i++) {
        if (i === 0)
            html += `${wordList[i]}`
        else
            html += `<span class="word-display-sub-${i}">${wordList[i]}</span>`;
    }

    UI.wordDisplay.innerHTML = html;
}

window.createExplosion = function (x, y, sizeX, sizeY, color) {
    const explosion = document.createElement('div');
    document.body.appendChild(explosion);
    explosion.setAttribute("class", "explosion");

    explosion.style.left = `${Math.ceil(x - (sizeX / 2))}px`;
    explosion.style.top = `${Math.ceil(y - (sizeY / 2))}px`;
    explosion.style.width = `${sizeX}px`;
    explosion.style.height = `${sizeY}px`;
    explosion.style.backgroundColor = color;

    setTimeout(() => explosion.remove(), 550);
}

window.mobileFocusOnActualInput = () => {
    document.getElementById("actual-input").focus();
}

window.applyTypingErrorAnimation = () => {
    if(UI.customInput.classList.contains("typing-error"))
        return;

    UI.customInput.classList.add("typing-error");
    setTimeout(() => UI.customInput.classList.remove("typing-error"), 500);
}
