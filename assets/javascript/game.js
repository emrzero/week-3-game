//Hangman
//By Eliot Reyes
//July 2016

// Create an array that lists out all of the options
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

// var gameTrackers = {
//   numGuesses : 0,
//   arrUsedLetters : [],
//   bolGameDone : false,
//   numCountdown : 9,
//   numLosses : 0,
//   numWins: 0,
//   computerGuess: "",
//   arrDashes: [],
//   strOutput: ""

// };


var music = new Audio('assets/audio/jazzyfrenchy.mp3');
var sadMusic = new Audio('assets/audio/sadday.mp3')

////// Functions ///////

var gameActions = {

  setupGame: function() {
                numGuesses = 0;
                arrUsedLetters = [];
                bolGameDone = false;
                numCountdown = 8;
                //Computer selects word
                computerGuess = options[Math.floor(Math.random()*options.length)];

                //Create masked word and output to DOM
                arrDashes = [];

                for (var i = 0; i < computerGuess.length; i++) {
                  arrDashes.push("-");
                }

                strOutput = "";
                gameActions.redoStrHTML();

                document.getElementById("output").innerHTML = (strOutput);
                document.getElementById("numeros").innerHTML = numCountdown;
                document.getElementById("wins").innerHTML = numWins;
                document.getElementById("losses").innerHTML = numLosses;
              },


  redoStrHTML: function () {
                  strOutput = "";
                  for (var i = 0; i < arrDashes.length; i++){
                    strOutput += arrDashes[i];
                  }
                },


  hideBanner: function (el) {
                  document.getElementById(el).style.display = "none";
                },


  playAgain: function () {
                gameActions.setupGame();

                document.getElementById("letters").innerHTML = arrUsedLetters;
                document.getElementById("numeros").innerHTML = numCountdown;

                gameActions.hideBanner("successBanner");
                gameActions.hideBanner("failBanner");

                music.pause();
                sadMusic.pause();
              }

}

//Initiate game
gameActions.setupGame();


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

            gameActions.redoStrHTML();
             
            console.log("Your guess is in position " + position);
            document.getElementById("output").innerHTML = strOutput;
        } else {
          numCountdown -= 1;
          
        }
      }

    }

    ////Print letters to the DOM
    document.getElementById("letters").innerHTML = arrUsedLetters;
    document.getElementById("numeros").innerHTML = numCountdown;
    

    if (arrDashes.indexOf("-") == -1 && bolGameDone == false) {
      bolGameDone = true;
      numWins += 1;
      document.getElementById("successBanner").style.display = "block";
      music.play();
     } else if (numCountdown == 0 && bolGameDone == false) {
        bolGameDone = true;
        numLosses += 1;
        document.getElementById("failBanner").style.display = "block";
        sadMusic.play();
     }

      document.getElementById("wins").innerHTML = numWins;
      document.getElementById("losses").innerHTML = numLosses;


}/////END Capture Key Clicks


