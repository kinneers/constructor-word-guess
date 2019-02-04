/*Word.js: Contains a constructor, Word, that depends on the Letter constructor. This is used to create an object representing the current word the user is attempting to guess.*/

var Letter = require('./letter');

function Word(word) {
    this.word = word;
    // Array of new Letter objects representing the letters of the underlying word
    this.letters = [];
    // Function that returns a string representing the word (pushes to this.letters' array)
    this.makeWord = function() {
        var letterArray = this.word.split('');
        for (var i = 0; i < letterArray.length; i++) {
            this.letters.push(new Letter(letterArray[i]));
        }
    }
    // Function to display either the letter (if it has been guessed) or '_' (if it has not been guessed)- depends on the showLetter function from letter.js
    this.display = function() {
        var displayArray = [];
        for (var i = 0; i < this.letters.length; i++) {
            displayArray.push(this.letters[i].showLetter());
        }
        console.log('\n' + displayArray.join(' ') + '\n');
    }
    // Function that takes a character as an argument and calls the guess function on each letter object (the second function defined in letter.js)
    this.makeGuess = function(guess) {
        for (var i = 0; i < this.letters.length; i++) {
            this.letters[i].letterGuessed(guess);
        }
    }
}

module.exports = Word;