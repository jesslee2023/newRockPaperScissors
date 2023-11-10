"use strict"; // Enables strict mode for better error checking

// ----------------
// State variables
// ----------------
let userScore = 0; // Tracks user score
let computerScore = 0; // Tracks computer score
let roundsPlayed = 0; // Tracks number of rounds played

// ----------------
// Element variables
// ----------------
let formEl = document.querySelector("#guessForm"); // Form element
let messageEl = document.querySelector("#message"); // Message display element
let userScoreEl = document.querySelector("#user-score"); // User score display element
let computerScoreEl = document.querySelector("#computer-score"); // Computer score display element
let guessInputEl = document.querySelector("#guess"); // User input element

// ----------------
// Logic
// ----------------
function getComputerChoice() {
  const choices = ['rock', 'paper', 'scissors']; // Valid choices
  const randomIndex = Math.floor(Math.random() * choices.length); // Random index for computer choice
  return choices[randomIndex]; // Returns computer choice
}

function determineWinner(userChoice, computerChoice) {
  // Determines the winner of the round
  if (userChoice === computerChoice) {
    return "draw"; // It's a draw if choices are the same
  }
  
  // Winning conditions for the user
  if ((userChoice === 'rock' && computerChoice === 'scissors') ||
      (userChoice === 'scissors' && computerChoice === 'paper') ||
      (userChoice === 'paper' && computerChoice === 'rock')) {
    return "user"; // User wins
  } else {
    return "computer"; // Computer wins
  }
}

function updateScoreBoard() {
  // Updates the scoreboard with the current scores
  userScoreEl.textContent = userScore;
  computerScoreEl.textContent = computerScore;
}

function checkGameEnd() {
  // Checks if the game has reached the end condition
  if (userScore === 2 || computerScore === 2) {
    const winner = userScore === 2 ? 'You' : 'Computer'; // Determines the overall winner
    renderEndGame(`${winner} won the match!`); // Calls function to render end game message
  }
}

// Prevents the form from being submitted and the page from refreshing
function handleGuess(e) {
    e.preventDefault();
  
    // Retrieves and converts the user's choice to lowercase for consistency
    const userChoice = guessInputEl.value.toLowerCase();
    // Defines the valid choices for the game
    const validChoices = ['rock', 'paper', 'scissors'];
  
    // Removes any previous animation classes from emojis
    validChoices.forEach(choice => {
      const emoji = document.getElementById(choice);
      emoji.classList.remove('bounce');
    });
  
    // Checks if the user's input is one of the valid choices
    if (!validChoices.includes(userChoice)) {
      renderMessage("Please enter rock, paper, or scissors."); // If not, displays an error message
      guessInputEl.value = ""; // Clears the input field
      return; // Exits the function early
    }
  
    // Adds a bounce animation to the chosen emoji
    const emoji = document.getElementById(userChoice);
    emoji.classList.add('bounce');
    setTimeout(() => {
        emoji.classList.remove('bounce');
      }, 1000);
  
    // Gets the computer's choice
    const computerChoice = getComputerChoice();
    // Determines the winner of the round
    const winner = determineWinner(userChoice, computerChoice);
    // Increments the number of rounds played
    roundsPlayed++;
  
    // Updates the game state based on the winner
    if (winner === "user") {
      userScore++; // Increments user score if the user wins
      renderMessage(`Round ${roundsPlayed}: You win! ${userChoice} beats ${computerChoice}.`);
    } else if (winner === "computer") {
      computerScore++; // Increments computer score if the computer wins
      renderMessage(`Round ${roundsPlayed}: You lose! ${computerChoice} beats ${userChoice}.`);
    } else {
      renderMessage(`Round ${roundsPlayed}: It's a draw!`);
    }
  
    // Updates the scoreboard with the new scores
    updateScoreBoard();
    // Checks if the game has ended based on the scores
    checkGameEnd();
  
    // Clears the input field for the next guess
    guessInputEl.value = "";
  }
  
  // Resets the game to its initial state
  function handlePlayAgain() {
    // Resets scores and round count
    userScore = 0;
    computerScore = 0;
    roundsPlayed = 0;
  
    // Resets the message display
    messageEl.innerHTML = "";
    messageEl.hidden = true;
    // Makes sure the form is visible
    formEl.hidden = false;
    // Updates the scoreboard to reflect the reset
    updateScoreBoard();
  }
  
  // Displays a message to the user
  function renderMessage(message) {
    messageEl.hidden = false; // Makes sure the message element is visible
    messageEl.textContent = message; // Sets the message text
  }
  
  // Handles the end of the game
  function renderEndGame(message) {
    renderMessage(message); // Displays the end game message
    formEl.hidden = true; // Hides the form
  
    // Checks if the "Play again" button already exists, if not, creates it
    if (!document.querySelector('.play-again-button')) {
      renderPlayAgain();
    }
  }
  
  // Creates a "Play again" button
  function renderPlayAgain() {
    // Creates a new button element
    let buttonEl = document.createElement("button");
    buttonEl.textContent = "Play again"; // Sets the button text
    buttonEl.className = "button play-again-button"; // Sets the button class for styling
  
    // Adds an event listener to the button for the play again functionality
    buttonEl.addEventListener("click", handlePlayAgain);
  
    // Appends the button to the message element
    messageEl.append(buttonEl);
  }
  
  // Adds an event listener to the form for when the user submits their guess
  formEl.addEventListener("submit", handleGuess);
  
  // Listen for keydown event on the entire document
  document.addEventListener('keydown', function(e) {
    // Check if the Enter key is pressed
    if (e.key === 'Enter') {
      // Check if the play again button is present and the form is hidden
      const playAgainButton = document.querySelector('.play-again-button');
      if (playAgainButton && formEl.hidden) {
        handlePlayAgain();
      }
    }
  });

//   This JavaScript code listens for a form submission, 
//   validates the user's input, plays a round of Rock, Paper, Scissors,
//   updates the score, and handles the end of the game. 
//   The handlePlayAgain function resets the game state,
//   and the renderPlayAgain function creates a "Play again" button 
//   that allows users to start a new game after the current one ends. 
//   The renderMessage function is used to display messages to the user throughout the game.