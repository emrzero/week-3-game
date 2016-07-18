//Hangman
//By Eliot Reyes
//July 2016

// Create an array that lists out all of the options
// var options = ['r','p','s'];
var options = [
  'mercury',
  'venus',
  'earth',
  'mars',
  'jupiter',
  'saturn',
  'uranus',
  'neptune'
  ];

var dwarfPlanets = [ 
  //dwarf planets
  'ceres',
  'pluto',
  'haumae',
  'makemake',
  'eris'
  ];

var moons = [
  //moons
  'phobos',
  'deimos',
  'io',
  'europa',
  'ganymede',
  'callisto',
  'titan',
  'triton',
  'charon',
  'nix',
  'hydra',
  'kerberos',
  'styx'
  ];

var constellations =[
  'andromeda',
  'aries',
  'cancer',
  'cassiopeia',
  'capricornus',
  'gemini',
  'leo',
  'libra',
  'pisces',
  'pheonix',
  'perseus',
  'orion',
  'pleiades',
  'hercules',
  'hydra'
];

///Counters and Trackers
var numGuesses = 0;
var arrUsedLetters = [];
var bolGameDone = false;
var numCountdown = 9;
var numWins = 0;
var numLosses = 0;
var computerGuess = "";
var arrDashes = [];
var strOutput = "";

function setupGame () {
  numGuesses = 0;
  arrUsedLetters = [];
  bolGameDone = false;
  numCountdown = 8;
  //Computer selects word
  computerGuess = options[Math.floor(Math.random()*options.length)];
  // console.log(computerGuess);
  // console.log(computerGuess.length);

  //Create masked word and output to DOM
  arrDashes = [];

  for (var i = 0; i < computerGuess.length; i++) {
    arrDashes.push("-");
  }

  strOutput = "";
  redoStrHTML();
  document.getElementById("output").innerHTML = (strOutput);
  document.getElementById("numeros").innerHTML = numCountdown;
  document.getElementById("wins").innerHTML = numWins;
  document.getElementById("losses").innerHTML = numLosses;
}

function redoStrHTML () {
  strOutput = "";
  for (var i = 0; i < arrDashes.length; i++){
    strOutput += arrDashes[i];
  }
}

setupGame();




//document.getElementById("output").innerHTML = (strOutput);

////////// Captures Key Clicks ////////////
document.onkeyup = function(event) {


  // Assigns user input to var and makes it lowercase
  var userGuess = String.fromCharCode(event.keyCode).toLowerCase();
  console.log(userGuess);
 


  //Validate user input (letters only) 
    if (((userGuess.charCodeAt(0) > 96 && userGuess.charCodeAt(0) < 123)
      ||(userGuess.charCodeAt(0) > 64 && userGuess.charCodeAt(0) < 90)) && bolGameDone == false) {

      //Check if user has already entered the letter
      if (arrUsedLetters.indexOf(userGuess) == -1){
        arrUsedLetters.push(userGuess);
        numGuesses++;
        //Check if letter is part of the chosen word
        if (computerGuess.indexOf(userGuess)> -1) {
            var position = []; //keeps track of all occurences of letter
            for (i=0 ; i < computerGuess.length; i++) {
              if (computerGuess[i]== userGuess) {
                position.push(i);
              }
            }

            //replace dashes with guessed letters
            for (var i=0; i < position.length; i++){
              arrDashes[position[i]] = userGuess;
            }

            redoStrHTML();
             
            console.log("Your guess is in position " + position);
            document.getElementById("output").innerHTML = strOutput;
        } else {
          numCountdown -= 1;
          console.log("You have " + numCountdown + " guesses remaining");
        }
      }
      
      // console.log("Number of guesses " + numGuesses);
      // console.log("Letters used: " + arrUsedLetters);
    }

    ////Print letters to the DOM
    document.getElementById("letters").innerHTML = arrUsedLetters;
    document.getElementById("numeros").innerHTML = numCountdown;
    

    if (arrDashes.indexOf("-") == -1 && bolGameDone == false) {
      // alert("Congratulations! You guessed the word. Refresh the page to play again");
      bolGameDone = true;
      numWins += 1;
      document.getElementById("successBanner").style.display = "block";
     } else if (numCountdown == 0 && bolGameDone == false) {
        bolGameDone = true;
        numLosses += 1;
        document.getElementById("failBanner").style.display = "block";
     }

      document.getElementById("wins").innerHTML = numWins;
      document.getElementById("losses").innerHTML = numLosses;


}/////END Capture Key Clicks

function hideBanner(el) {
  document.getElementById(el).style.display = "none";
}

function playAgain() {
  setupGame();
  console.log(strOutput);
  document.getElementById("letters").innerHTML = arrUsedLetters;
  document.getElementById("numeros").innerHTML = numCountdown;
  hideBanner("successBanner");
  hideBanner("failBanner");
}
