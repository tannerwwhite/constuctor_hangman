var lettersToDisplay = function(word, goodGuesses) {

    this.gameWord = word;
    this.goodLetters = goodGuesses;
    this.displayText = '';
    this.winner = false;
    this.parseDisplay = function() {
        var shown = '';

        if (this.goodLetters == undefined) {
            for (var i = 0; i < this.gameWord.length; i++) {
                shown += ' _ ';
            }
        } else {
            for (var i = 0; i < this.gameWord.length; i++) {
                var letterWasFound = false;
                for (var j = 0; j < this.goodLetters.length; j++) {
                    if (this.gameWord[i] == this.goodLetters[j]) {
                        shown += this.goodLetters[j];
                        letterWasFound = true;
                    }
                }
                if (!letterWasFound) {
                    shown += ' _ ';
                }
            }
        }
        this.displayText = shown.trim();
        console.log(this.displayText);
        if (this.displayText == this.gameWord) {
            this.winner = true;
        }
    }
};


module.exports = lettersToDisplay;