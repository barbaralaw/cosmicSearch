/*
Original game mechanics from "Scooby-Doo Fright at the Fun Park Game" by Buffalo Games.

Thank you for checking out my project!
If you liked it, let me know! Twitter: @blawblawLaw
*/




/*###########################################
#                                           #
########             DATA            ########
#                                           #
###########################################*/

const mysteryCards = [
  /*       FUTURE PROPERTIES TO ADD:   prizeName & locationName */
  { locationColor: "yellow",  locationType: "planet",},
  { locationColor: "purple",  locationType: "moon",},
  { locationColor: "green",   locationType: "comet",},
  { locationColor: "red",     locationType: "planet",},
  { locationColor: "blue",    locationType: "comet",},
  { locationColor: "yellow",  locationType: "moon",},
  { locationColor: "purple",  locationType: "nebula",},
  { locationColor: "green",   locationType: "planet",},
  { locationColor: "red",     locationType: "constellation",},
  { locationColor: "blue",    locationType: "constellation",},
  { locationColor: "yellow",  locationType: "constellation",},
  { locationColor: "purple",  locationType: "planet",},
  { locationColor: "green",   locationType: "moon",},
  { locationColor: "red",     locationType: "comet",},
  { locationColor: "blue",    locationType: "moon",},
  { locationColor: "purple",  locationType: "constellation",},
  { locationColor: "green",   locationType: "constellation",},
  { locationColor: "red",     locationType: "moon",},
  { locationColor: "red",     locationType: "nebula",},
  { locationColor: "blue",    locationType: "planet",},
  { locationColor: "blue",    locationType: "nebula",},
  { locationColor: "green",   locationType: "nebula",},
  { locationColor: "yellow",  locationType: "comet",},
  { locationColor: "purple",  locationType: "comet",},
  { locationColor: "yellow",  locationType: "nebula"}
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
  writeTicket('constellation'), writeTicket('constellation'), writeTicket('constellation')
  /*      FUTURE TICKET CARDS TO ADD INTEREST TO GAME
  `TRAP! Choose another player. That player may not move on their next turn.`,
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
// [indexes of immediate neighbors],[location attributes]
  [[1,5],["yellow", "comet"]],
  [[0,2],["green", "constellation"]],
  [[1,3,6],["yellow", "moon"]],
  [[2,4,7],["purple", "nebula"]],
  [[3,8],["red", "moon"]],
  [[0,9],["blue", "moon"]],
  [[2,12],["blue", "planet"]],
  [[3,8,13],["green", "comet"]],
  [[4,7,14],["blue", "constellation"]],
  [[5, 10],["red", "nebula"]],
  [[9, 11, 15],["purple", "constellation"]],
  [[10, 12],["red", "comet"]],
  [[6, 11, 13],["green", "nebula"]],
  [[7, 12, 18],["purple", "planet"]],
  [[8, 20],["yellow", "nebula"]],
  [[10, 16],["yellow", "planet"]],
  [[15, 17],["blue", "comet"]],
  [[10, 16, 18, 21],["green", "moon"]],
  [[13, 17, 23],["red", "constellation"]],
  [[20, 23],["green", "planet"]],
  [[14, 19],["purple", "comet"]],
  [[17, 22],["yellow", "constellation"]],
  [[21, 24],["red", "planet"]],
  [[18, 19, 24],["blue", "nebula"]],
  [[22, 23],["purple", "moon"]]
];



/*###########################################
#                                           #
########      HELPER FUNCTIONS       ########
#                                           #
###########################################*/

function writeTicket(value) {
  return [`See if the prize is at a ${value} location.`, value];
}

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

//Places player's token image on desired location
function placeToken(locToPlace, currentPlayer) {
  let mapToken = document.createElement("img");
  let imageFileStr = currentPlayer.token;
  mapToken.setAttribute("src", imageFileStr);
  mapToken.setAttribute("data-p", currentPlayer.playerNum)
  mapToken.setAttribute("alt", `Player ${currentPlayer}'s Token`)
  document.querySelector(`.loc${currentPlayer.location}`).appendChild(mapToken);
}

function removeToken(locToRemove) {
  let top = document.querySelector(`.loc${locToRemove}`);
  let playNumStr = currentPlayer.playerNum.toString()
  let nested = top.querySelector(`img[data-p="${playNumStr}"]`);
  top.removeChild(nested);
}

function neighborsAvail() {
  let neighbors = allLocations[currentPlayer.location][0];
  for (let j=0; j<neighbors.length; j++) {
    document.querySelector(`.loc${neighbors[j]}`).classList.add("available");
  }
  rollDiceButton.style.display = "none";
  turnControls.style.display = "grid";
}

function resetNeighbors() {
  for (let i=0; i<allLocations.length; i++) {
    let curClass = document.querySelector(`.loc${i}`);
    if (curClass.classList.contains("available")) {
      document.querySelector(`.loc${i}`).classList.remove("available");
    }
  }
}

function closeWindow() {
  // change display of parent element to none
  let parent = this.parentElement;
  parent.style.display = "none";
}

function closeRules() {
  rules.style.display = "none";
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
let movesLeft = 0;
let tokenList = [];
let hasRolled = false;

const actionsMini = document.getElementById("actionsMini");
const playerSelection = document.getElementById("playerSelection");
const selectionPrompt = document.getElementById("selectionPrompt");
const gameControls = document.getElementById('gameControls');
const turnControls = document.getElementById('turnControls');
const rollDiceButton = document.getElementById('rollDice');
const startButton = document.getElementById('startButton');
const curPlay = document.getElementById('curPlay');
const roll = document.getElementById('roll');
const prizeAttemptWindow = document.getElementById('winAttempt');
const doubleCheck = document.getElementById('doubleCheck');
const wentForIt = document.getElementById('wentForIt');
const rules = document.querySelector('.rules');
tokenList[0] = document.querySelector(".token1");  //token 1
tokenList[1] = document.querySelector(".token2");  //token 2
tokenList[2] = document.querySelector(".token3");  //token 3
tokenList[3] = document.querySelector(".token4");  //token 4
tokenList[4] = document.querySelector(".token5");  //token 5


document.getElementById("startButton").addEventListener('click', startGame);
document.getElementById("openingRules").addEventListener('click', viewRules);
document.getElementById("savePlayer").addEventListener('click', savePlayer);
document.getElementById("playersAdded").addEventListener('click', playersAdded);
document.getElementById("rollDice").addEventListener('click', beginTurn);
document.getElementById("endTurn").addEventListener('click', endTurn);
document.getElementById("useTicket").addEventListener('click', useTicket);
document.getElementById("claimPrize").addEventListener('click', tryToClaimPrize);
document.getElementById("rulesButton").addEventListener('click', viewRules);
document.getElementById("restart").addEventListener('click', restart);

document.querySelector(".doubleCheck").addEventListener('click', claimPrize);
document.querySelector(".closeWindow").addEventListener('click', closeWindow);
document.querySelector(".closeRules").addEventListener('click', closeRules);
document.querySelector(".loc0").addEventListener('click', function() {makeAMove(0)});
document.querySelector(".loc1").addEventListener('click', function() {makeAMove(1)});
document.querySelector(".loc2").addEventListener('click', function() {makeAMove(2)});
document.querySelector(".loc3").addEventListener('click', function() {makeAMove(3)});
document.querySelector(".loc4").addEventListener('click', function() {makeAMove(4)});
document.querySelector(".loc5").addEventListener('click', function() {makeAMove(5)});
document.querySelector(".loc6").addEventListener('click', function() {makeAMove(6)});
document.querySelector(".loc7").addEventListener('click', function() {makeAMove(7)});
document.querySelector(".loc8").addEventListener('click', function() {makeAMove(8)});
document.querySelector(".loc9").addEventListener('click', function() {makeAMove(9)});
document.querySelector(".loc10").addEventListener('click', function() {makeAMove(10)});
document.querySelector(".loc11").addEventListener('click', function() {makeAMove(11)});
document.querySelector(".loc12").addEventListener('click', function() {makeAMove(12)});
document.querySelector(".loc13").addEventListener('click', function() {makeAMove(13)});
document.querySelector(".loc14").addEventListener('click', function() {makeAMove(14)});
document.querySelector(".loc15").addEventListener('click', function() {makeAMove(15)});
document.querySelector(".loc16").addEventListener('click', function() {makeAMove(16)});
document.querySelector(".loc17").addEventListener('click', function() {makeAMove(17)});
document.querySelector(".loc18").addEventListener('click', function() {makeAMove(18)});
document.querySelector(".loc19").addEventListener('click', function() {makeAMove(19)});
document.querySelector(".loc20").addEventListener('click', function() {makeAMove(20)});
document.querySelector(".loc21").addEventListener('click', function() {makeAMove(21)});
document.querySelector(".loc22").addEventListener('click', function() {makeAMove(22)});
document.querySelector(".loc23").addEventListener('click', function() {makeAMove(23)});
document.querySelector(".loc24").addEventListener('click', function() {makeAMove(24)});
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
  openingRules.style.display = "none"
  playerSelection.style.display = "grid";
  badGuy = setBadGuy();
  drawDeck = shuffleArray(ticketValues);
  selectionPrompt.innerText = `Please select a character token for Player${allPlayers.length+1}`;
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
    numOfPlayers++;
    returnInfo.push(chosenTokenNum);
    returnInfo.push(`images/token${chosenTokenNum}.png`);
    tokenList[chosenTokenNum-1].classList.remove("selected");
    tokenList[chosenTokenNum-1].classList.add("taken");
    return returnInfo;
  }
}

function setStartLocation() {
  return getRandomIndex(0, allLocations.length);
}

function MakeCharacter(playerName, playerNum, token, location, tickets, movesLeft) {  //miniMap
  this.playerName = playerName  // string "player1", etc.
  this.playerNum = playerNum
  this.token = token            // string "/images/tokenX.png", etc.
  this.location = location      // number 0-24
  this.tickets = tickets        // array of strings
  this.movesLeft = movesLeft    // number
  // this.miniMap = miniMap
}

// Players choose tokens & starting points
function savePlayer() {
  if (allPlayers.length >= 3) {
    selectionPrompt.innerText = "You have 4 players already, please Start Game.";
  } else {
    selectionPrompt.innerText = `Please select a character token for Player${allPlayers.length+2}`;
    let tokenInfo = selectToken();
    allPlayers.push(new MakeCharacter(`player${numOfPlayers}`, allPlayers.length+1, tokenInfo[1], setStartLocation(), [], 0));
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
    turnControls.style.display = "grid";
    tokenList[0].style.display = "none";
    tokenList[1].style.display = "none";
    tokenList[2].style.display = "none";
    tokenList[3].style.display = "none";
    tokenList[4].style.display = "none";
    rollDiceButton.style.display = "block";
    playerSelection.style.display = "none"
    //miniMapView1.style.display = "block";
    //useTicket1.style.display = "block";
    //endTurn1.style.display = "block";
    //claimPrize1.style.display = "block";

    for (let i=0; i<allPlayers.length; i++) {
      let startingPlace = allPlayers[i].location;
      placeToken(startingPlace, allPlayers[i]);
      /*let mapToken = document.createElement("img");
      let imageFileStr = allPlayers[i].token;
      mapToken.setAttribute("src", imageFileStr);
      mapToken.setAttribute("alt", `Player ${i+1} Token`)
      document.querySelector(`.loc${allPlayers[i].location}`).appendChild(mapToken);*/
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

function rollDice() {
  return diceValues[getRandomIndex(0, diceValues.length)];
}

function beginTurn() {
  let diceRollResult = rollDice();
  hasRolled = true;
  roll.innerText = `Rolled ${diceRollResult[0]} moves & ${diceRollResult[1]} tickets.}`;
  movesLeft = diceRollResult[0];
  document.getElementById("moves").innerText = `${movesLeft} moves left`
  for (let i=0; i<diceRollResult[1]; i++) {
    currentPlayer.tickets.push(drawDeck.shift());
  }
  neighborsAvail()
  turnControls.style.display = "grid";
}

function moveHere(loc) {
  if (hasRolled && movesLeft > 0 && document.querySelector(`.loc${loc}`).classList.contains("available")) {
    movesLeft--;
    document.getElementById("moves").innerText = `${movesLeft} moves left`
    removeToken(currentPlayer.location);
    currentPlayer.location = loc;
    placeToken(loc, currentPlayer);
    resetNeighbors()
    return(loc)
  } else {
    document.getElementById("moves").innerText = `${movesLeft} moves left`;
  }
}

function makeAMove(loc) {
  // called when user clicks on a location
  if (movesLeft > 0) {
    let newSpot = moveHere(loc);
    neighborsAvail()
  } else {
    document.getElementById("moves").innerText = `${movesLeft} moves left`
    resetNeighbors()
  }
}

function changeCurrentPlayer() {
  resetNeighbors()
  document.getElementById("moves").innerText = ``;
  if (currentPlayer.playerNum < allPlayers.length) {
    currentPlayer = allPlayers[currentPlayer.playerNum];
  } else {
    currentPlayer = allPlayers[0];
  }
  return currentPlayer.playerNum;
}

function clickTicket(i) {
  if (currentPlayer.tickets[i][1] === allLocations[currentPlayer.location][1][0] ||
  currentPlayer.tickets[i][1] === allLocations[currentPlayer.location][1][1]) {
    if (currentPlayer.tickets[i][1] === badGuy.locationColor || currentPlayer.tickets[i][1] === badGuy.locationType) {
      alert(`YES the prize is at a ${currentPlayer.tickets[i][1]} location`);
    } else {
      alert(`NO the prize isn't at a ${currentPlayer.tickets[i][1]} location`);
    }
    currentPlayer.tickets.splice(i, 1);
    document.getElementById("ticketView").style.display = "none";
    endTurn()
  } else {
    alert(`Your ticket doesn't match your location.`);
  }
}

function updateTicketsHeld() {
  let children = document.getElementById("ticketView").childNodes;
  for (let i=children.length-1; i>1; i--) {
    document.getElementById("ticketView").removeChild(children[i]);
  }
  for (let i=0; i<currentPlayer.tickets.length; i++) {
    let curTicket = document.createElement("div");
    curTicket.innerText = `${currentPlayer.tickets[i][0]}`;
    curTicket.addEventListener('click', function() {
      clickTicket(i)
    })
    document.getElementById("ticketView").appendChild(curTicket);
  }
}

function useTicket() {
  updateTicketsHeld()
  document.getElementById("ticketView").style.display = "grid";
}

function endTurn() {
  changeCurrentPlayer()
  rollDiceButton.style.display = "block";
}

function tryToClaimPrize() {
  turnControls.style.display = "none";
  winAttempt.style.display = "block";
}

function claimPrize() {
  doubleCheck.style.display = "none";
  wentForIt.style.display = "block";
  if (allLocations[currentPlayer.location][1][0] == badGuy.locationColor && allLocations[currentPlayer.location][1][1] == badGuy.locationType) {
    verdict.innerText = "CONGRATULATIONS! YOU FOUND THE PRIZE!";
    sentence.innerText = `Player ${currentPlayer.playerNum} has won the game! Thank you for playing, and please play again soon.`;
  } else {
    verdict.innerText = "UH-OH! Sorry, the prize isn't here!";
    sentence.innerText = `Player ${currentPlayer.playerNum} shot their shot and missed! They have been removed from the game.`;
    turnControls.style.display = "grid";
  }
}

function viewRules() {
  rules.style.display = "block";
}

function restart() {
  location.reload()
  return false
}
