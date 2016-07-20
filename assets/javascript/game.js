//Hangman
//By Eliot Reyes
//July 2016

// Create an array that lists out all of the options
var options = [
  "gsw",
  "sa",
  "okc",
  "lac",
  "por",
  "dal",
  "mem",
  "hou"
]


var nbawc = {
  "gsw" : {
    name : "Golden State Warriors",
    conference: "western",
    w : 73,
    l : 9,
    song: "e-40-choices.mp3"
  },

  "sa" : {
    name : "San Antonio Spurs",
    conference : "western",
    w : 67,
    l : 15,
    song: "turn-down-for-what.mp3"
  },

  "okc" : {
    name : "Oklahoma City Thunder",
    conference: "western",
    w : 55,
    l : 27,
    song: "seven-nation-army.mp3"
  },

  "lac" : {
    name : "Los Angeles Clippers",
    conference: "western",
    w: 53,
    l: 29,
    song: "lob-city.mp3"
  },

  "por" : {
    name: "Portland Trail Blazers",
    conference: "western",
    w: 44,
    l: 38,
    song: "we-are-rip-city.mp3"
  },

  "dal" : {
    name: "Dallas Mavericks",
    conference: "western",
    w: 42,
    l: 40,
    song: "jgonzo-dallas-mavs.mp3"
  },

  "mem" : {
    name: "Memphis Grizzlies",
    conference: "western",
    w: 42,
    l: 40,
    song: "we-dont-bluff-mg.mp3"
  },

  "hou" : {
    name: "Houston Rockets",
    conference: "western",
    w: 41,
    l: 41,
    song: "king-houston-rockets.mp3"
  }
};
  

///Counters and Trackers
var numGuesses = 0;
var arrUsedLetters = [];
var bolGameDone = false;
var numCountdown = 9;
var numWins = 0;
var numLosses = 0;
var team = "";
var computerGuess = "";
var arrDashes = [];
var strOutput = "";
var music;
var pathToMusic = "assets/audio/";
var sadMusic = new Audio('assets/audio/sadday.mp3');

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


// var music = new Audio('assets/audio/jazzyfrenchy.mp3');


////// Functions ///////

var gameActions = {

  setupGame: function() {
                numGuesses = 0;
                arrUsedLetters = [];
                bolGameDone = false;
                numCountdown = 8;
                //Computer selects word
                team = options[Math.floor(Math.random()*options.length)];
                computerGuess = nbawc[team].name.toLowerCase();

                //Create masked word and output to DOM
                arrDashes = [];

                for (var i = 0; i < computerGuess.length; i++) {
                  if (computerGuess[i] == " "){
                    arrDashes.push(" ");
                  } else {
                    arrDashes.push("-");
                  }
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
                  music.pause();
                  sadMusic.pause();
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
      music = new Audio(pathToMusic + nbawc[team].song);
      music.play();
     } else if (numCountdown == 0 && bolGameDone == false) {
        bolGameDone = true;
        numLosses += 1;
        //document.getElementById("failBanner").style.display = "block";
        sadMusic.play();
        document.getElementById("output").innerHTML = computerGuess
     }

      document.getElementById("wins").innerHTML = numWins;
      document.getElementById("losses").innerHTML = numLosses;


}/////END Capture Key Clicks


