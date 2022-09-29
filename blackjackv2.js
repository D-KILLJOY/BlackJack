const dealBtn = document.querySelector(".deal");
const standBtn = document.querySelector(".stand");
const hitBtn = document.querySelector(".hit");
const helpBtn = document.querySelector(".help");
const playBtn = document.querySelector(".play");
const GAME = document.querySelector(".container");
let money = document.querySelector(".money");
const bet = document.querySelector(".bet");
let Stake = document.querySelector(".stake");
let message = document.querySelector(".message");
const stakeAmt = document.querySelectorAll(".stake-btn");

const msg = [
	"Draw",
	"You Win",
	"You Win, Dealer Busts",
	"You Lose, You Busted",
	"You Lose",
	"You Win, BLACKJACK",
];

let gameStart = false;

let playerCanPlay = false;

const dealerCards = document.querySelector(".dealer-cards");
const dealerTotal = document.querySelector(".dealer-card-total");
const playerCards = document.querySelector(".player-cards");
const playerTotal = document.querySelector(".player-total");

let Money = 0;
let stake;

let playerCardsArray = [];
let playerCardsSum = 0;
let dealerCardsArray = [];
let dealerCardsSum = 0;

// ! STAKE

for (let i = 0; i < stakeAmt.length; i++) {
	stakeAmt[i].addEventListener("click", addStake);

	function addStake() {
		stake = parseInt(stakeAmt[i].getAttribute("stake"));
		if (playerCanPlay === true) {
			Stake.textContent = stake;
		}
	}
}

// stakeAmt.forEach((i) => {
// 	i.addEventListener("click", () => {
// 		stake = stakeAmt.i.getAttributte("stake");

// 		console.log(stake);
// 	});
// });

// ! PLAY
function playGame() {
	console.log("play");
	if (Money === 0) {
		Money = Math.floor(Math.random() * 500 + 300);
		display();
		playBtn.textContent = "Restart";
	} else if (Money > 10) {
		let popUp = confirm(
			`Would you want to restart the game this will erase your progress \n Your balance is $${Money}`
		);
		if (popUp) {
			Money = Math.floor(Math.random() * 500 + 300);
			display();
			clearCards();
			stake = 0;
			Stake.textContent = stake;
		}
	}
	gameStart = true;
	playerCanPlay = true;
}
// ! HELP

function help() {
	console.log("help");
	//! display help over game
	// ! INCLUDE A BUTTON THAT GOES BACK TO GAME WITHOUT REFRESHING
}

// ! DISPLAY INITIAL VALUES

function display() {
	money.textContent = Money;
}

// ! DEAL PLAYER CARDS

function clearCards() {
	playerCardsArray.splice(0);
	dealerCardsArray.splice(0);
	message.textContent = "";
	playerCards.textContent = playerCardsArray;
	playerTotal.textContent = playerCardsArray;
	dealerCards.textContent = dealerCardsArray;
	dealerTotal.textContent = dealerCardsArray;
}

function dealPlayer() {
	playerCardsArray.push(Math.ceil(Math.random() * 10 + 1));
	playerCards.textContent = playerCardsArray;

	playerCardsSum = 0;

	for (let i = 0; i < playerCardsArray.length; i++) {
		playerCardsSum += playerCardsArray[i];
	}
	playerTotal.textContent = playerCardsSum;
}

function redraw() {
	playerCardsArray.push(Math.ceil(Math.random() * 8 + 1));
	playerCards.textContent = playerCardsArray;

	playerCardsSum = 0;

	for (let i = 0; i < playerCardsArray.length; i++) {
		playerCardsSum += playerCardsArray[i];
	}
	playerTotal.textContent = playerCardsSum;
}

// ! DEAL DEALER CARDS

function dealDealer() {
	dealerCardsArray.push(Math.ceil(Math.random() * 10 + 1));
	dealerCards.textContent = dealerCardsArray;

	dealerCardsSum = 0;

	for (let i = 0; i < dealerCardsArray.length; i++) {
		dealerCardsSum += dealerCardsArray[i];
	}
	dealerTotal.textContent = dealerCardsSum;
}
// ! DEAL
function dealCards() {
	if (gameStart === true) {
		if (Money > 10) {
			if (playerCanPlay === true) {
				if (stake > 9) {
					if (stake < Money) {
						Stake = Stake;
						playerCanPlay = false;

						clearCards();
						dealPlayer();
						dealPlayer();
						dealDealer();
						if (playerCardsSum > 21) {
							playerCardsArray.pop();
							redraw();
						}

						if (playerCardsSum === 21) {
							validate();
						}
					} else {
						alert(
							`You cant stake higher than your Money \n You have $${Money} left`
						);
					}
				} else {
					alert(
						"You have not entered a valid Stake. \n Please stake a minimum of $10"
					);
				}
			}
		} else {
			alert("Sorry You have no Cash");
		}
	} else {
		alert(`You haven't started the game \n Press play to Start game`);
	}
}

// ! HIT
function hit() {
	if (playerCanPlay === false) {
		dealPlayer();
		if (playerCardsSum >= 21) {
			validate();
		}
	}
}

// ! STAND
function stand() {
	if (playerCanPlay === false) {
		dealDealer();
		if (dealerCardsSum < 16) {
			dealDealer();
		}
		validate();
	}
}

// ! VALIDATE RESULT AND SHOW MESSAGE
function validate() {
	playerCanPlay = true;

	if (dealerCardsSum === playerCardsSum) {
		message.textContent = msg[0];
		message.style.color = "gray";
	} else if (playerCardsSum === 21) {
		message.textContent = msg[5];
		message.style.color = "Green";

		Money = Money + stake;
	} else if (playerCardsSum > 21) {
		message.textContent = msg[3];
		Money = Money - stake;
		message.style.color = "red";
	} else if (dealerCardsSum > 21) {
		message.textContent = msg[2];
		message.style.color = "Green";

		Money = Money + stake;
	} else if (dealerCardsSum > playerCardsSum) {
		message.textContent = msg[4];
		Money = Money - stake;
		message.style.color = "red";
	} else if (playerCardsSum > dealerCardsSum) {
		message.textContent = msg[1];

		Money = Money + stake;
		message.style.color = "Green";
	}
	display();
	if (Money < 10) {
		alert("GAME OVER You ran out of cash");
	}
}

dealBtn.addEventListener("click", dealCards);
hitBtn.addEventListener("click", hit);
standBtn.addEventListener("click", stand);
playBtn.addEventListener("click", playGame);
helpBtn.addEventListener("click", help);
