/*Letter.js: Contains a constructor, Letter. This constructor displays an underlying character or an underscore, depending on whether or not the user has guessed the letter.*/

function Letter(letter) {
    //String storing letter
    this.letter = letter;
    //Boolean value that stores whether the letter has been guessed yet
    this.guessed = false;
    //Function that returns the underlying character if the letter has been guessed, or an underscore if the letter has not been guessed
    this.showLetter = function() {
        if (this.guessed) {
            return(this.letter.toUpperCase());
        } else {
            return('_');
        }
    }
    //Function that takes a character as an argument and checks it against the underlying character, updating the stored boolean value to true if it was guessed correctly
    this.letterGuessed = function(character) {
        if (character === this.letter) {
            this.guessed = true;
        }
    }
}

module.exports = Letter;