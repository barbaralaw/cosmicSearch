// try assiging tokens in DOM to a token list



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



/*###########################################
#                                           #
########      HELPER FUNCTIONS       ########
#                                           #
###########################################*/

function getRandomIndex(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  let randomIndex = Math.floor(Math.random() * (max - min) + min);
  return randomIndex; //The maximum is exclusive and the minimum is inclusive
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

let numOfPlayers = 0;
let allPlayers = [];
let badGuy;
let drawDeck;
let currentPlayer;
let curToken;
let tokenList = [];

const playerSelection = document.getElementById("playerSelection");
const addPlayersMenu = document.getElementById('addPlayersMenu');
const helperButtons = document.getElementById('helperButtons');
const gameControls = document.getElementById('gameControls');
const turnControls = document.getElementById('turnControls');
const rollDiceButton = document.getElementById('rollDice');
const startButton = document.getElementById('startButton');
const curPlay = document.getElementById('curPlay');
const roll = document.getElementById('roll');
tokenList[0] = document.querySelector(".token1");  //token 1
tokenList[1] = document.querySelector(".token2");  //token 2
tokenList[2] = document.querySelector(".token3");  //token 3
tokenList[3] = document.querySelector(".token4");  //token 4
tokenList[4] = document.querySelector(".token5");  //token 5

document.getElementById("startButton").addEventListener('click', startGame);
document.getElementById("addNewPlayer").addEventListener('click', addNewPlayer);
document.getElementById("savePlayer").addEventListener('click', savePlayer);
document.getElementById("playersAdded").addEventListener('click', playersAdded);
document.getElementById("rollDice").addEventListener('click', beginTurn);
document.querySelector(".token1").addEventListener('click', function() {toggle(tokenList[0])});
document.querySelector(".token2").addEventListener('click', function() {toggle(tokenList[1])});
document.querySelector(".token3").addEventListener('click', function() {toggle(tokenList[2])});
document.querySelector(".token4").addEventListener('click', function() {toggle(tokenList[3])});
document.querySelector(".token5").addEventListener('click', function() {toggle(tokenList[4])});



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

function selectToken() {
  let tokensToggled = 0;
  let returnInfo = [];
  if (tokenList[0].classList.contains("selected")) {
    chosenTokenNum = 1;
    tokensToggled++;
  }
  if (tokenList[1].classList.contains("selected")) {
    chosenTokenNum = 2;
    tokensToggled++;
  }
  if (tokenList[2].classList.contains("selected")) {
    chosenTokenNum = 3;
    tokensToggled++;
  }
  if (tokenList[3].classList.contains("selected")) {
    chosenTokenNum = 4;
    tokensToggled++;
  }
  if (tokenList[4].classList.contains("selected")) {
    chosenTokenNum = 5;
    tokensToggled++;
  }
  if (tokensToggled === 0) {
    alert('You must select a token')
  } else if (tokensToggled > 1) {
    alert('You may only select 1 token')
  } else {
    tokenList[0].style.display = "none";
    tokenList[1].style.display = "none";
    tokenList[2].style.display = "none";
    tokenList[3].style.display = "none";
    tokenList[4].style.display = "none";
    numOfPlayers++;
    returnInfo.push(chosenTokenNum);
    returnInfo.push(`images/token${chosenTokenNum}.jpg`);
    tokenList[chosenTokenNum-1].classList.remove("selected");
    tokenList[chosenTokenNum-1].classList.add("taken");
    return returnInfo;
  }
}

function setStartLocation() {
  return getRandomIndex(0, allLocations.length);
}

function MakeCharacter(playerName, token, location, tickets, movesLeft) {  //miniMap
  this.playerName = playerName
  this.token = token
  this.location = location
  this.tickets = tickets
  this.movesLeft = movesLeft
  // this.miniMap = miniMap
}

// Players choose tokens & starting points
function savePlayer() {
  let tokenInfo = selectToken();
  allPlayers.push(new MakeCharacter(`player${numOfPlayers}`, tokenInfo[1], setStartLocation(), [], 0)) ;
  if (allPlayers.length < 4) {
    document.getElementById("addNewPlayer").style.display = "block";
  }
}

function addNewPlayer() {
  if (allPlayers.length >= 4) {
    alert('You have 4 players already, please Start Game')
  } else {
    tokenList[0].style.display = "block";
    tokenList[1].style.display = "block";
    tokenList[2].style.display = "block";
    tokenList[3].style.display = "block";
    tokenList[4].style.display = "block";
    document.getElementById("addNewPlayer").style.display = "none";
  }
}



/*###########################################
#                                           #
#######   THIRD THING THAT HAPPENS   ########
#                                           #
#     Players hit 'Start Game' button       #
#                                           #
###########################################*/

function playersAdded() {
  if (allPlayers.length < 2) {
    alert('You need at least 2 players')
  } else {
    addPlayersMenu.style.display = "none";
    playerSelection.style.display = "none";
    helperButtons.style.display = "block";
    gameControls.style.display = "block";
    turnControls.style.display = "none";
    for (let i=0; i<allPlayers.length; i++) {
      let startingPlace = allPlayers[i].location;
      let mapToken = document.createElement("img");
      let imageFileStr = allPlayers[i].token;
      mapToken.setAttribute("src", imageFileStr);
      mapToken.setAttribute("alt", `Player ${i+1} Token`)
      document.querySelector(`.loc${allPlayers[i].location}`).appendChild(mapToken);
    }
    currentPlayer = allPlayers[0];
    curPlay.innerText = `It is player 1's turn`;
  }
}



/*###########################################
#                                           #
#######   FOURTH THING THAT HAPPENS  ########
#                                           #
#             Players be Playin'            #
#                                           #
###########################################*/

// add available class to locations where players can move

function rollDice() {
  return diceValues[getRandomIndex(0, diceValues.length)];
}

function beginTurn() {
  let diceRollResult = rollDice();
  roll.innerText = `Rolled ${diceRollResult[0]} moves & ${diceRollResult[1]} tickets.}`;
  let movesLeft = diceRollResult[0];
  for (let i=0; i<diceRollResult[1]; i++) {
    currentPlayer.tickets.push(drawDeck.shift());
    console.log(currentPlayer.tickets);
  }
  //Available moves appear on board
  let neighbors = allLocations[currentPlayer.location];
  console.log(neighbors);
  for (let j=0; j<neighbors.length; j++) {
    document.querySelector(`.loc${neighbors[j]}`).classList.add("available");
  }
  turnControls.style.display = "block";
}

function makeAMove() {
  // called when user clicks on a location

  // check that location has class available
  // if so, move the token to that location
  // lower move count by 1
  // shift available moves => turn that into a function that is called here and in beginTurn
  // if movesLeft === 0, remove available from all locations
}

function miniMap() {
  // called when user clicks on view/edit minimap

  // warning screen appears - hit ok to view OR 3 seconds?
  // when user clicks on an element in minimap (how to distinguish minimap from regular?)
  // options to add X or something good appears
  // whichever they click on is toggled on that location
  // user clicks 'x' to exit minimap view
}

function viewTickets() {
  // player can see their current hand of tickets whenever
  // called when user clicks on see tickets button OR within useTicket function

  // warning screen appears - hit ok to view OR 3 seconds?
  // tickets available appear
  // users can click 'x' to exit ticket view  => is clicking 'x' another function? think so
}

function useTicket() {
  // used by player on current location, ends their turn once successful
  // called when user clicks on use ticket Button

  // warning screen appears - hit ok to view OR 3 seconds?
  // tickets available appear
  // user selects ticket they want to use
  // hits ok/submit
  // if ticket info matches either color or type, show if right or wrong
  // then current player changes
  // else alert pick another card
  // users can change mind and click 'x' to exit ticket view
}



/*

        5. Try to catch ghoul clicked
          6. when clicked, confirmation popup appears
            7. if sure, result dramatically shows
              8. if wrong, current player removed from game
                9. current player changes
              9. if right, game ends and current player congratulated
            7. if no, close window


        5. End turn appears
          6. current player changes
      4. Button to open hand appears
        5. When clicked, 3 second delay and then hand shows
        6. Players click off hand to close or hit 'x'
      7. Players click on space they want to move to, moves left count down
    8. screen shows roll dice button again, hides other commands

/*console.table(badGuy);
console.table(diceRollResult);
console.table(ticketValues);
console.table(drawDeck);*/
