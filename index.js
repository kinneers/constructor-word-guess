/*index.js: The file containing the logic for the course of the game, which depends on Word.js and:

Randomly selects a word and uses the Word constructor to store it
Prompts the user for each guess and keeps track of the user's remaining guesses*/

var Word = require('./word.js');
var Letter = require('./letter.js');
var inquirer = require('inquirer');

//Welcomes the user to the game (first round only)
console.log("\nWelcome to the Word Guess Game!  Here is your first word:");

function playGame() {
    var wordArray = ['cat', 'dog', 'fish', 'chicken', 'pig'];
    var guessesLeft = 10;

    //Randomly chooses word for the user to guess
    var chosenWord = wordArray[Math.floor(Math.random() * wordArray.length)];
    var gameWord = new Word(chosenWord); //Passes chosen word to the Word constructor
    gameWord.makeWord(); //Calls the makeWord function from word.js

    var letterCheck = /^[a-z]$/ //Regex to test for valid letter input

    
    //Displays the number of characters in the chosen word with underscores at the start of the game
    gameWord.display();

    //Function to prompt user to guess a letter
    function promptUser() {
        inquirer.prompt([
            {
                type: 'input',
                message: 'Choose a Letter',
                name: 'newGuess'
            }
        ]).then(function(res) {
            character = res.newGuess.toLowerCase()
            if (letterCheck.test(character)) {
                if (guessesLeft >= 1) {
                    gameWord.makeGuess(character);
                    //Boolean for if the guessed character is in the word
                    var inWord = false;
                    //Loop through the letter array and determine if the guess was correct or incorrect- console log result and decrement guesses if incorrect
                    for (i = 0; i < gameWord.letters.length; i++) {
                        if (character === gameWord.letters[i].letter) {
                            inWord = true;
                        }
                    }
                    if (inWord) {
                        console.log('\nCORRECT!  :)');
                    } else {
                        guessesLeft--;
                        //Proper grammar is essential:
                        if (guessesLeft > 1 || guessesLeft === 0) {
                            console.log('\nINCORRECT!  :(\n\nYou have ' + guessesLeft + ' guesses remaining.');
                        }
                        else {
                            console.log('\nINCORRECT!  :(\n\nYou have ' + guessesLeft + ' guess remaining.');
                        }
                    }
                    //Boolean to determine whether or not all letters have been guessed
                    var keepGoing = false;
                    for (j = 0; j < gameWord.letters.length; j++) {
                        if (gameWord.letters[j].guessed === false) {
                            var keepGoing = true;
                        }
                    }
                    if (keepGoing === false) {
                        gameWord.display();
                        console.log("You win!!!  :)\n");
                        playAgain();
                    } else {
                        gameWord.display();
                        if (guessesLeft === 0) {
                            console.log("\nYou ran out of guesses!\n");
                            playAgain();
                        } else {
                            promptUser();
                        }
                    }
                } 
                else {
                    console.log("Error");
                }
            } else {
                console.log("\nThis is not a valid letter\n");
                promptUser();
            }
        });
    }
//Prompts user for first guess at the beginning of the game
promptUser();
}

//Prompts user to play again or exit after a win or a loss
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
            console.log("\nGreat! Here is your next word:")
            playGame();
        } else {
            console.log("\nThat was fun!  See you next time!\n");
        }
    });
}

playGame();