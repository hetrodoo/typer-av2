const UI = Object.freeze({
    actualInput: document.getElementById("actual-input"),
    wordDisplay: document.getElementById("word-display"),
    timer: document.getElementById("timer"),
    customInput: document.getElementById("custom-input"),
    dialog: document.getElementById("dialog"),
    score: document.getElementById("score"),
    stars: document.getElementById("stars"),
    wpm: document.getElementById("wpm"),
    difficultyDialog: document.getElementById("difficulty-dialog"),
});

const difficultyEnum = Object.freeze({
    "easy": 0.5,
    "medium": 1,
    "hard": 5
});

const getNameForDifficulty = (difficulty) => {
    switch (difficulty) {
        case difficultyEnum.easy:
            return "Fácil";
        case difficultyEnum.medium:
            return "Normal";
        case difficultyEnum.hard:
            return "Difícil";
        default:
            return "?";
    }
}

const getWordListForDifficulty = (difficulty) => {
    switch (difficulty) {
        case difficultyEnum.easy:
            return data.words.filter(word => !(/\W/g.test(word)));
        case difficultyEnum.medium:
            return data.words;
        case difficultyEnum.hard:
            return data.words.filter(word => /\W/g.test(word));
        default:
            return [];
    }
}
