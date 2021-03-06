/* eslint-disable no-console */
/*
Name: Constructor Word Guess (Valentine's Day Theme)
Developer: Sarah Kinneer
Date: February, 2019
*/

//play.js: The file containing the logic for the course of the game, which depends on word.js

var Word = require('./word.js');
var inquirer = require('inquirer');

//Welcomes the user to the game (first round only)
console.log("\nWelcome to the Word Guess Game!  Here is your first word:");

function playGame() {
    var wordArray = ['box of chocolates', "cupid's bow and arrow", 'february fourteenth', 'saint valentine', 'unrequited love', 'secret admirer', 'conversation hearts', 'bouquet of flowers', 'sweetheart', 'be my valentine', 'hopeless romantic', 'love at first sight', 'forget-me-nots', "can't help falling in love with you"];
    var guessesLeft = 10;

    //Randomly chooses word for the user to guess
    var chosenWord = wordArray[Math.floor(Math.random() * wordArray.length)];
    var gameWord = new Word(chosenWord); //Passes chosen word to the Word constructor
    gameWord.makeWord(); //Calls the makeWord function from word.js

    var letterCheck = /^[a-z]$/; //Regex to test for valid letter input

    //Sets status "guessed" to true to any special characters (spaces, apostrophes, etc.) in the game word
    for (var x = 0; x < gameWord.letters.length; x++) {
        if (!letterCheck.test(gameWord.letters[x].letter)) {
            gameWord.letters[x].guessed = true;
        }
    }

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
            //Assigns user input to variable and converts to lowercase (if not already)
            var character = res.newGuess.toLowerCase()
            //Validates user input
            if (letterCheck.test(character)) {
                //Code to run if guesses remain
                if (guessesLeft >= 1) {
                    gameWord.makeGuess(character);
                    //Boolean for if the guessed character is in the word
                    var inWord = false;
                    //Loop through the letter array and determine if the guess was correct or incorrect- console log result and decrement guesses if incorrect
                    for (var i = 0; i < gameWord.letters.length; i++) {
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
                    //Checks if any letters have yet to be guessed
                    for (var j = 0; j < gameWord.letters.length; j++) {
                        if (gameWord.letters[j].guessed === false) {
                            keepGoing = true;
                        }
                    }
                    //Code to run if all letters have been guessed
                    if (keepGoing === false) {
                        gameWord.display();
                        console.log("You win!!!  :)\n");
                        playAgain();
                    } else {
                        //Display updated word
                        gameWord.display();
                        //If there are no guesses left, alert user and prompt to play again or exit
                        if (guessesLeft === 0) {
                            console.log("\nYou ran out of guesses!\n");
                            playAgain();
                        } else {
                        //If there are guesses remaining, prompt user to continue
                            promptUser();
                        }
                    }
                } 
                //If user has run out of guesses it should be handled within above code- if not, an error will be logged and the user will be instructed to exit the program
                else {
                    console.log("Error.  Press Control-C or Command-C to exit.");
                }
            } else {
                //Code to run if user input is not valid
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