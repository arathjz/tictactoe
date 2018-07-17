let game = {
		user: '',
		computer: '',
		currentPlayer: '',
		moves: 1,
};

const $grids = document.getElementsByClassName('box');
const $buttons = document.getElementsByClassName('swal-button');
const $b1 = document.getElementById('b1');
const $b2 = document.getElementById('b2');
const $b3 = document.getElementById('b3');
const $b4 = document.getElementById('b4');
const $b5 = document.getElementById('b5');
const $b6 = document.getElementById('b6');
const $b7 = document.getElementById('b7');
const $b8 = document.getElementById('b8');
const $b9 = document.getElementById('b9');
let gameWon = false;
const $winners = document.getElementsByClassName('win');

function welcome(){
	swal({
		title: "Welcome!",
		text: "Select an option to play Tic Tac Toe",
	  buttons: {
	    circle: {
	      text: "O",
	      value: "O",
				className: 'circle'
	    },
			symbolX: {
	      text: "X",
	      value: "X",
				className: 'strike'
	    }
	  },
		closeOnClickOutside: false,
		closeOnEsc: false,
		icon: "success"
	})
		.then((value) => {
			swal({
				text: 'Computer goes first...',
				timer: 1000,
				buttons: false
			})
		})

	$buttons[0].addEventListener('click', () => setFig('O'));
	$buttons[1].addEventListener('click', () => setFig('X'));
}

function setFig(content) {
	if (content === 'X') {
		game.user = 'X';
		game.computer = 'O';
	} else if (content === 'O') {
		game.user = 'O';
		game.computer = 'X';
	}
	firstMove();
	setCurrPl('user');
}

function firstMove() {
	setTimeout(() => document.getElementById('b5').textContent = game.computer, 1100);
}

function setCurrPl(curr) {
	game.currentPlayer = curr;
}

function icon(id) {
	if(game.currentPlayer == 'user') {
		document.getElementById(id).textContent = game.user;
		status();
		setCurrPl('computer');
	} else if(game.currentPlayer == 'computer') {
		document.getElementById(id).textContent = game.computer;
		status();
		setCurrPl('user');
	}
	game.moves++;
	status();
	if (game.currentPlayer == 'computer') {
    setTimeout(() => comp(), 350);
  }
}

function comp() {
	switch(true) {
		case $b1.textContent === "":
			icon('b1');
			break;
		case $b2.textContent === "":
			icon('b2');
			break;
		case $b3.textContent === "":
			icon('b3');
			break;
		case $b4.textContent === "":
			icon('b4');
			break;
		case $b5.textContent === "":
			icon('b5');
			break;
		case $b6.textContent === "":
			icon('b6');
			break;
		case $b7.textContent === "":
			icon('b7');
			break;
		case $b8.textContent === "":
			icon('b8');
			break;
		case $b9.textContent === "":
			icon('b9');
			break;
	}
}

function status() {
	let currentPlayer;

	if(game.currentPlayer == 'user') {
		currentPlayer = game.user;
	} else if (game.currentPlayer == 'computer') {
		currentPlayer = game.computer;
	}

	switch (true) {
		case $b1.textContent === currentPlayer && $b2.textContent === currentPlayer && $b3.textContent === currentPlayer:
			winner($b1, $b2, $b3);
			gameWon = true;
			isWon();
			break;
		case $b4.textContent === currentPlayer && $b5.textContent === currentPlayer && $b6.textContent === currentPlayer:
			winner($b4, $b5, $b6);
			gameWon = true;
			isWon();
			break;
		case $b7.textContent === currentPlayer && $b8.textContent === currentPlayer && $b9.textContent === currentPlayer:
			winner($b7, $b8, $b9);
			gameWon = true;
			isWon();
			break;
		case $b1.textContent === currentPlayer && $b4.textContent === currentPlayer && $b7.textContent === currentPlayer:
			winner($b1, $b4, $b7);
			gameWon = true;
			isWon();
			break;
		case $b2.textContent === currentPlayer && $b5.textContent === currentPlayer && $b8.textContent === currentPlayer:
			winner($b2, $b5, $b8);
			gameWon = true;
			isWon();
			break;
		case $b3.textContent === currentPlayer && $b6.textContent === currentPlayer && $b9.textContent === currentPlayer:
			winner($b3, $b6, $b9);
			gameWon = true;
			isWon();
			break;
		case $b1.textContent === currentPlayer && $b5.textContent === currentPlayer && $b9.textContent === currentPlayer:
			winner($b1, $b5, $b9);
			gameWon = true;
			isWon();
			break;
		case $b7.textContent === currentPlayer && $b5.textContent === currentPlayer && $b3.textContent === currentPlayer:
			winner($b7, $b5, $b3);
			gameWon = true;
			isWon();
			break;
		default:
			console.log(`checking, moves ${game.moves} and gameWon is ${gameWon}`);
			isDraw();
	}
}

function winner(el1, el2, el3) {
	el1.classList.add("win");
	el2.classList.add("win");
	el3.classList.add("win");
}

function isDraw() {
	if (game.moves == 9 && gameWon == false) {
		swal("Its a draw");
		setTimeout(playAgain, 500);
	}
}

function isWon() {
	if(gameWon) {
		if(game.currentPlayer == 'user') {
			swal('You Won!!!');
			setTimeout(playAgain, 500);
		} else {
			swal('Computer Won :C');
			setTimeout(playAgain, 500);
		}
	}
}

function playAgain() {
	for(let i = 0; i < $grids.length; i++){
		$grids[i].textContent= "";
		$grids[i].classList.remove('win');
	}
	game.moves = 1;
	gameWon = false;
	setTimeout(firstMove, 100);
}

function user(i){
	if($grids[i].textContent !== game.computer) {
		icon($grids[i].id);
	}
}

function playGame() {
	for (let i = 0; i < $grids.length; i++) {
		$grids[i].addEventListener('click',() => user(i));
	}
}


welcome();
playGame();
