var wrapper = document.getElementsByClassName('wrapper')[0],
	gameStart = document.getElementsByClassName('gameStart')[0],
	jixu = document.getElementsByClassName('continue')[0],
	pause = document.getElementsByClassName('pause')[0],
	score = document.getElementsByTagName('input')[0],
	snake = [[3, 1], [2, 1], [1, 1]],
	content = document.getElementsByClassName('content')[0],
	food = document.createElement('div'),
	unit = 25,
	direction = 'right',
	snakebody,
	key = 1,
	loser = document.getElementsByClassName('loser')[0],
	replay = document.getElementsByClassName('replay')[0],
	head;
food.className = 'food';
var timer;

function snakeMove() {
	clearInterval(timer);
	timer = setInterval(moveStart, 300);
}

function start() {
	gameStart.style.display = 'none';
	cFood();
	snakeMove();
}

function cFood() {
	food.style.left = parseInt(Math.random() * 20) * unit + 'px';
	food.style.top = parseInt(Math.random() * 20) * unit + 'px';
	content.appendChild(food);
}

document.onkeydown = function (e) {
	if (key == 1 && e.keyCode == 40) {
		direction = 'down';
	} else if (key == 1 && e.keyCode == 38) {
		direction = 'up';
	} else if (key == 2 && e.keyCode == 37) {
		direction = 'left';
	} else if (key == 2 && e.keyCode == 39) {
		direction = 'right';
	}
}



var n = 1;
function moveStart() {

	if (n > 1) {
		remove();
	}
	for (var i = 0; i < snake.length; i++) {
		head = document.getElementsByClassName('snake')[0];
		snakebody = document.createElement('div');
		snakebody.className = 'snake';
		snakebody.style.left = snake[i][0] * unit + 'px';
		snakebody.style.top = snake[i][1] * unit + 'px';
		content.appendChild(snakebody);

	}

	for (var j = snake.length - 1; j > 0; j--) {
		head = document.getElementsByClassName('snake')[0];
		if (head.style.left == food.style.left && head.style.top == food.style.top) {
			snake.push([snake[j][0], snake[j][1]]);
			food.remove();
			cFood();
			score.value++;
		}

		snake[j][0] = snake[j - 1][0];
		snake[j][1] = snake[j - 1][1];

	}

	if (direction == 'left') {
		snake[0][0]--;
		key = 1;
	} else if (direction == 'right') {
		snake[0][0]++;
		key = 1;
	} else if (direction == 'down') {
		snake[0][1]++;
		key = 2;
	} else if (direction == 'up') {
		snake[0][1]--;
		key = 2;
	}
	head = document.getElementsByClassName('snake')[0];
	if (head.style.left == 500 + 'px') {
		lose();
	} else if (head.style.left == -25 + 'px') {
		lose();
	} else if (head.style.top == -25 + 'px') {
		lose();
	} else if (head.style.top == 500 + 'px') {
		lose();
	}
	for (var i = 1; i < snake.length; i++) {
		if (snake[0][0] == snake[i][0] && snake[0][1] == snake[i][1]) {
			lose();
		}

	}
	n++;
}

function lose() {
	clearInterval(timer);
	loser.style.display = 'inline';
	replay.style.display = 'inline';


}

function remove() {
	var elem = document.getElementsByClassName('snake');
	var len = elem.length;
	for (var i = 0; i < len; i++) {
		var ele = document.getElementsByClassName('snake')[0];
		content.removeChild(ele);
	}
}

gameStart.addEventListener('click', start, false)

pause.addEventListener('click', function () {
	clearInterval(timer);
}, false);
jixu.addEventListener('click', function () {
	snakeMove();
}, false)
replay.addEventListener('click', function () {
	snake = [[3, 1], [2, 1], [1, 1]];
	direction = 'right';
	start();
	loser.style.display = 'none';
	replay.style.display = 'none';
	score.value = 0;
})
