const dealBtn = document.querySelector(".dealbtn");
const standBtn = document.querySelector(".standbtn");
const hitBtn = document.querySelector(".hitbtn");
const helpBtn = document.querySelector(".helpbtn");
const playBtn = document.querySelector(".playbtn");
const GAME = document.querySelector(".container");
let money = document.querySelector(".money");
const bet = document.querySelector(".bet");
let Stake = document.querySelector(".stake");
let message = document.querySelector(".message");
const stakeAmt = document.querySelectorAll(".stake-btn");
const backBtn = document.querySelector(".back");
const HELP = document.querySelector(".help");

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
let playerCanStand = false;
let playerCanHit = false;

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
		if (playerCanPlay === true) {
			stake = parseInt(stakeAmt[i].getAttribute("stake"));
			Stake.textContent = stake;
		} else {
			alert("You can't stake now");
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
						playerCanHit = true;
						playerCanStand = true;
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
	if (playerCanHit === true) {
		dealPlayer();
		if (playerCardsSum >= 21) {
			validate();
		}
	}
}

// ! STAND
function stand() {
	if (playerCanStand === true) {
		dealDealer();
		if (dealerCardsSum < 16) {
			dealDealer();
		}
		validate();
		playerCanHit = false;
		playerCanStand = false;
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

// ! HELP

function hidden() {
	let displayHelp = GAME.classList.contains("hidden");
	let displayGame = HELP.classList.contains("hidden");

	if (displayHelp) {
		GAME.classList.remove("hidden");
		HELP.classList.add("hidden");
	}

	if (displayGame) {
		GAME.classList.add("hidden");
		HELP.classList.remove("hidden");
	}
}

dealBtn.addEventListener("click", dealCards);
hitBtn.addEventListener("click", hit);
standBtn.addEventListener("click", stand);
playBtn.addEventListener("click", playGame);
helpBtn.addEventListener("click", hidden);
backBtn.addEventListener("click", hidden);
