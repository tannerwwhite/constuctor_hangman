// Link in the Inquirer Package
var inquirer = require('inquirer');

// Link game.js
var guessWordList = require('./game.js');

// Link word.js
var checkForLetter = require('./word.js');

// Link letter.js
var lettersToDisplay = require('./letter.js');

//  Global Variables 
var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var lettersAlreadyGuessed = [];
var lettersCorrectlyGuessed = [];
var displayHangman;

//Object
var game = {
    wordBank: guessWordList,
    guessesRemaining: 10,
    currentWrd: null,

    startGame: function() {
        this.guessesRemaining = 6;
        var j = Math.floor(Math.random() * this.wordBank.length);
        this.currentWrd = this.wordBank[j];

        console.log('Guess which Programming Language is?');

        displayHangman = new lettersToDisplay(this.currentWrd);
        displayHangman.parseDisplay();
        console.log('Guesses Left: ' + game.guessesRemaining);

        keepPrompting();
    }
};

function keepPrompting() {
    console.log('');
    if (game.guessesRemaining > 0) {
        inquirer.prompt([{
            type: "value",
            name: "letter",
            message: "Guess a Letter: "
        }]).then(function(userInput) {

            var inputLetter = userInput.letter.toLowerCase();
            if (alphabet.indexOf(inputLetter) == -1) {

                console.log(inputLetter + '" is not a letter. Try again!');
                console.log('Guesses Left: ' + game.guessesRemaining);
                console.log('Letters already guessed: ' + lettersAlreadyGuessed);
                keepPrompting();
            } else if (alphabet.indexOf(inputLetter) != -1 && lettersAlreadyGuessed.indexOf(inputLetter) != -1) {
                console.log('You already guessed "' + inputLetter + '". Try again!');
                console.log('Guesses Left: ' + game.guessesRemaining);
                console.log('Letters already guessed: ' + lettersAlreadyGuessed);
                keepPrompting();
            } else {
                lettersAlreadyGuessed.push(inputLetter);
                var letterInWord = checkForLetter(inputLetter, game.currentWrd);

                if (letterInWord) {
                    lettersCorrectlyGuessed.push(inputLetter);
                    displayHangman = new lettersToDisplay(game.currentWrd, lettersCorrectlyGuessed);
                    displayHangman.parseDisplay();

                    if (displayHangman.winner) {
                        console.log('You win!');
                        return;
                    } else {
                        console.log('Guesses Left: ' + game.guessesRemaining);
                        console.log('Letters already guessed: ' + lettersAlreadyGuessed);
                        keepPrompting();
                    }
                } else {
                    game.guessesRemaining--;
                    displayHangman.parseDisplay();
                    console.log('Guesses Left: ' + game.guessesRemaining);
                    console.log('Letters already guessed: ' + lettersAlreadyGuessed);
                    keepPrompting();
                }
            }
        });
    } else {
        console.log('Try again!');
        console.log('The word was "' + game.currentWrd + '".');
    }
}

game.startGame();