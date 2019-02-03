/*index.js: The file containing the logic for the course of the game, which depends on Word.js and:

Randomly selects a word and uses the Word constructor to store it
Prompts the user for each guess and keeps track of the user's remaining guesses*/

var Word = require('./word.js');
var inquirer = require('inquirer');


function playGame() {
    var wordArray = ['cat', 'dog', 'fish', 'chicken', 'pig'];
    var guessesLeft = 10;

    //Randomly chooses word for the user to guess
    var chosenWord = wordArray[Math.floor(Math.random() * wordArray.length)];
    var gameWord = new Word(chosenWord); //Passes chosen word to the Word constructor
    gameWord.makeWord(); //Calls the makeWord function from word.js

    var letterCheck = /^[a-z]$/ //Regex to test for valid letter input

//FOR TESTING- REMOVE BEFORE FINAL PUSH
    console.log(gameWord);

    //Displays the number of characters in the chosen word with underscores at the start of the game
    gameWord.display();

    //Function to prompt user to guess a letter
    function promptUser() {
        inquirer.prompt([
            {
                type: 'input',
                message: 'Choose a Letter',
                name: 'letter'
            }
        ]).then(function(res) {
            character = res.letter.toLowerCase()
            if (letterCheck.test(character)) {
                if (guessesLeft > 0) {
                    console.log('\nWorking');
                    gameWord.makeGuess(character);
                    //loop through the letter array and determine if the guess was correct or incorrect- console log it and increment guesses if needed
                    gameWord.display();
                    promptUser();
                } 
                else if (guessesLeft === 0) {
                    console.log("You ran out of guesses!");
                    playAgain();
                } 
                else {
                    console.log("Error");
                }
            } else {
                console.log("This is not a valid letter");
                promptUser();
            }
        });
    }

promptUser();

function playAgain() {
    inquirer.prompt([
        {
            type: 'list',
            message: 'Would you like to play again?',
            choices: ['Play Again', 'Exit'],
            name: 'again'
        }
    ]).then(function(res) {
        if (res.again === 'Play Again') {
            playGame();
        } else {
            console.log("That was fun!  See you next time!");
        }
    });

}
}

playGame();