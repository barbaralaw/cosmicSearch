/*
function = CreateMysteryCards(ghoulName, locationColor, locationType, locationName) {
  this.ghoulName = ghoulName
  this.locationColor = locationColor
  this.locationType = locationType
  this.locationName = locationName
}
*/


/*###########################################
#                                           #
########             DATA            ########
#                                           #
###########################################*/

const mysteryCards = [
  { ghoulName: "Mummy",     locationColor: "yellow",  locationType: "planet",         locationName: "ferrisWheel" },
  { ghoulName: "Mummy",     locationColor: "purple",  locationType: "moon",           locationName: "pinballHall" },
  { ghoulName: "Mummy",     locationColor: "green",   locationType: "comet",          locationName: "costumeShop" },
  { ghoulName: "Mummy",     locationColor: "red",     locationType: "planet",         locationName: "logLagoon" },
  { ghoulName: "Mummy",     locationColor: "blue",    locationType: "comet",          locationName: "ticketBooth" },
  { ghoulName: "Sorceress", locationColor: "yellow",  locationType: "moon",           locationName: "waterGunGame" },
  { ghoulName: "Sorceress", locationColor: "purple",  locationType: "nebula",         locationName: "oldWestStuntShow" },
  { ghoulName: "Sorceress", locationColor: "green",   locationType: "planet",         locationName: "rollerCoaster" },
  { ghoulName: "Sorceress", locationColor: "red",     locationType: "constellation",  locationName: "cottonCandyStand" },
  { ghoulName: "Sorceress", locationColor: "blue",    locationType: "constellation",  locationName: "iceCreamStand" },
  { ghoulName: "Werewolf",  locationColor: "yellow",  locationType: "constellation",  locationName: "popcornWagon" },
  { ghoulName: "Werewolf",  locationColor: "purple",  locationType: "planet",         locationName: "carousel" },
  { ghoulName: "Werewolf",  locationColor: "green",   locationType: "moon",           locationName: "ballTossGame" },
  { ghoulName: "Werewolf",  locationColor: "red",     locationType: "comet",          locationName: "tshirtShop" },
  { ghoulName: "Werewolf",  locationColor: "blue",    locationType: "moon",           locationName: "balloonPopGame" },
  { ghoulName: "VoodooGuy", locationColor: "purple",  locationType: "constellation",  locationName: "hotDogHut" },
  { ghoulName: "VoodooGuy", locationColor: "green",   locationType: "constellation",  locationName: "pretzelShack" },
  { ghoulName: "VoodooGuy", locationColor: "red",     locationType: "moon",           locationName: "ringToss" },
  { ghoulName: "VoodooGuy", locationColor: "red",     locationType: "nebula",         locationName: "puppetTheater" },
  { ghoulName: "VoodooGuy", locationColor: "blue",    locationType: "planet",         locationName: "flipperRide" },
];

const ticketValues = [
  writeTicket('purple'), writeTicket('purple'), writeTicket('purple'),
  writeTicket('yellow'), writeTicket('yellow'), writeTicket('yellow'),
  writeTicket('red'), writeTicket('red'), writeTicket('red'),
  writeTicket('green'), writeTicket('green'), writeTicket('green'),
  writeTicket('blue'), writeTicket('blue'), writeTicket('blue'),
  writeTicket('nebula'), writeTicket('nebula'), writeTicket('nebula'),
  writeTicket('planet'), writeTicket('planet'), writeTicket('planet'),
  writeTicket('moon'), writeTicket('moon'), writeTicket('moon'),
  writeTicket('comet'), writeTicket('comet'), writeTicket('comet'),
  writeTicket('constellation'), writeTicket('constellation'), writeTicket('constellation'),
  /*`TRAP! Choose another player. That player may not move on their next turn.`,
  `TRAP! Choose another player. That player may not move on their next turn.`,
  `STEAL! Take one card from another player.`,
  `STEAL! Take one card from another player.`,
  `NEW CARDS! Discard all of your Ticket Cards and draw 3 new ones.`,
  `NEW CARDS! Discard all of your Ticket Cards and draw 3 new ones.`*/
];

const diceValues = [
// [# spaces to move, # tickets to collect]
  [1, 3],
  [3, 2],
  [4, 0],
  [2, 2],
  [3, 1],
  [2, 1]
];

const allLocations = [
  [1,5],            // toyShop
  [0,2],            // pretzelShack
  [1,3,6],          // waterGunGame
  [2,4,7],          // oldWestStuntShow
  [3,8],            // ringToss
  [0,9],            // balloonPopGame
  [2,12],           // flipperRide
  [3,8,13],         // costumeShop
  [4,7,14],         // iceCreamStand
  [5, 10],          // puppetTheater
  [9, 11, 15],      // hotDogHut
  [10, 12],         // tshirtShop
  [6, 11, 13],      // magicShow
  [7, 12, 18],      // carousel
  [8, 20],          // bigStage
  [10, 16],         // ferrisWheel
  [15, 17],         // ticketBooth
  [10, 16, 18, 21], // ballTossGame
  [13, 17, 23],     // cottonCandyStand
  [20, 23],         // rollerCoaster
  [14, 19],         // balloonCart
  [17, 22],         // popcornWagon
  [21, 24],         // logLagoon
  [18, 19, 24],     // animalShow
  [22, 23]          // pinballHall
];


function writeTicket(value) {
  return `See if the ghoul is at a ${value} location.`
}

let diceRollResult = diceValues[getRandomIndex(0, diceValues.length)];





/*###########################################
#                                           #
########      HELPER FUNCTIONS       ########
#                                           #
###########################################*/

function getRandomIndex(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

// Create shuffled array of ticket cards
function shuffleArray(array) {
  let m = array.length
  let t;
  let i;
  //while there are remaining elements to shuffle
  while (m) {
    // Pick a remaining element
    i = Math.floor(Math.random() * m--);
    // And swap it with the current element
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
}

function toggle(item) {
  item.classList.toggle('selected');
}


/*###########################################
#                                           #
##   INITIAL VARIABLES & EVENT LISTENERS   ##
#                                           #
###########################################*/

const playerSelection = document.getElementById("playerSelection");
const addPlayersMenu = document.getElementById('addPlayersMenu');
const helperButtons = document.getElementById('helperButtons');
const startButton = document.getElementById('startButton');
const token1 = document.querySelector(".token1");
const token2 = document.querySelector(".token2");
const token3 = document.querySelector(".token3");
const token4 = document.querySelector(".token4");
const token5 = document.querySelector(".token5");

document.getElementById("startButton").addEventListener('click', startGame);
document.getElementById("addNewPlayer").addEventListener('click', addNewPlayer);
document.getElementById("savePlayer").addEventListener('click', savePlayer);
document.getElementById("playersAdded").addEventListener('click', playersAdded);
//document.getElementById("selectToken").addEventListener('click', selectToken);
document.querySelector(".token1").addEventListener('click', function() {toggle(token1)});
document.querySelector(".token2").addEventListener('click', function() {toggle(token2)});
document.querySelector(".token3").addEventListener('click', function() {toggle(token3)});
document.querySelector(".token4").addEventListener('click', function() {toggle(token4)});
document.querySelector(".token5").addEventListener('click', function() {toggle(token5)});

let numOfPlayers = 0;
let allPlayers = [];
let badGuy;
let drawDeck;
let currentPlayer;



/*###########################################
#                                           #
#######   FIRST THING THAT HAPPENS   ########
#                                           #
#        Player hit 'Start' button          #
#                                           #
###########################################*/

function setBadGuy() {
  return mysteryCards[getRandomIndex(0, mysteryCards.length)];
}

function startGame() {
  startButton.style.display = "none";
  playerSelection.style.display = "grid";
  badGuy = setBadGuy();
  drawDeck = shuffleArray(ticketValues);
};



/*###########################################
#                                           #
#######  SECOND THING THAT HAPPENS   ########
#                                           #
#       Player selection screen appears     #
#                                           #
###########################################*/
/* Add toggle for clicked tokens
.token1:active {
  border: 4px solid green;
} */


function selectToken() {
  let tokensToggled = 0;
  if (token1.classList.contains("selected")) {
    chosenToken = token1;
    tokensToggled++;
  }
  if (token2.classList.contains("selected")) {
    chosenToken = token2;
    tokensToggled++;
  }
  if (token3.classList.contains("selected")) {
    chosenToken = token3;
    tokensToggled++;
  }
  if (token4.classList.contains("selected")) {
    chosenToken = token4;
    tokensToggled++;
  }
  if (token5.classList.contains("selected")) {
    chosenToken = token5;
    tokensToggled++;
  }
  if (tokensToggled === 0) {
    alert('You must select a token')
  } else if (tokensToggled > 1) {
    alert('You may only select 1 token')
  } else {
    token1.style.display = "none";
    token2.style.display = "none";
    token3.style.display = "none";
    token4.style.display = "none";
    token5.style.display = "none";
    numOfPlayers++;
    return chosenToken;
  }
}

function setStartLocation() {
  return allLocations[getRandomIndex(0, allLocations.length)];
}

function MakeCharacter(playerName, token, location, tickets, movesLeft, miniMap) {
  // this.playerName = playerName
  this.token = token
  this.location = location
  this.tickets = tickets
  this.movesLeft = movesLeft
  // this.miniMap = miniMap
}

// Players choose tokens & starting points
function savePlayer() {
  //playerSelection.style.display = "block";
  allPlayers.push(new MakeCharacter(`player${numOfPlayers}`, selectToken(), setStartLocation(), 0, 0)) ;
  allPlayers[allPlayers.length-1].token.classList.remove("selected");
  allPlayers[allPlayers.length-1].token.classList.add("taken");
  if (allPlayers.length < 4) {
    document.getElementById("addNewPlayer").style.display = "block";
  }
}

function addNewPlayer() {
  if (allPlayers.length >= 4) {
    alert('You have 4 players already, please Start Game')
  } else {
    token1.style.display = "block";
    token2.style.display = "block";
    token3.style.display = "block";
    token4.style.display = "block";
    token5.style.display = "block";
    document.getElementById("addNewPlayer").style.display = "none";
  }
}


/*###########################################
#                                           #
#######   THIRD THING THAT HAPPENS   ########
#                                           #
#  Players hit 'All Players Added' button   #
#                                           #
###########################################*/
function playersAdded() {
  if (allPlayers.length < 2) {
    alert('You need at least 2 players')
  } else {
    addPlayersMenu.style.display = "none";
    playerSelection.style.display = "none";
    helperButtons.style.display = "block";
    currentPlayer = allPlayers[0];
  }
}

console.table(badGuy);
console.table(diceRollResult);
console.table(ticketValues);
console.table(drawDeck);
