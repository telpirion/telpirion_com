/*
    UI handlers for Vikings!!!
    Version 5.2
    Eric Schmidt
    Published: 2012-12-08
    Updated: 2017-01-23
*/
var page = (function () {

    // Define global variables.
	var left,
		right,
		jumpButton,
		levelCount,
		gameScreens = [
			"load-screen",
			"game-screen",
			"level-complete"
		];

	function loadLevel() {
		startLevel();
	}

	function startGame(inputType) {

		// Capture reference to elements.
		left = $("#left")[0];
		right = $("#right");
		jumpButton = $("#jump");

		// Define the inputs for the platform.
		if (inputType == "touch") {
			wireUpIPad();
		}
		else {
			wireUpDesktop();
		}

		// Start the first level.
		levelCount = 0;
		startLevel();
	}

	// Shows or hides screens in the game.
	function toggleDisplay(screen){

		// Hide all the screens.
		for (var i = 0; i < gameScreens.length; i++) {
			$("#" + gameScreens[i]).addClass("hidden");
		}

		// Display the screen that we need.
		$("#" + screen).toggleClass("hidden");
	}

    // Load the scripts for the level.
	function startLevel(){

		var levelScript;
		levelCount++;

		var levelFile = "scripts/vikings/level" + levelCount + ".json";

		//$.getScript(levelFile, callback);
		var xhr = new XMLHttpRequest();
		var callback = function () {
		    console.log(levelFile + " load complete.");
		    var levelData = xhr.response;

		    // Set the parameters for the level.
		    animation.setGround(levelData.ground);
		    physics.setBlocks(levelData.blocks);

			toggleDisplay("game-screen");

            // Update the background for the level.
			$("#game-display").css("background-image", levelData.background);

		    // Start the game sequence.
			animation.beginClock();
		}

		xhr.addEventListener("load", callback);
		xhr.responseType = "json";
		xhr.open("GET", levelFile);
		xhr.send();
	}

    // Wire up event listeners for touch devices.
    // Only seems to work on iOS ...
	function wireUpIPad() {

		var actionDown, actionUp;

		// Add touch events for browsers with
		// touch support.
		if ((typeof TouchEvent) == "object") {
			actionDown = "touchstart";
			actionUp = "touchend";
		}
		else {
			actionDown = "mousedown";
			actionUp = "mouseup";
		}

		// Wire up touch listeners.
		left.addEventListener(actionDown, function (e) {
			e.preventDefault();
			moveLeft();
		});
		left.addEventListener(actionUp, function (e) {
			e.preventDefault();
			stop();
		});
		right.addEventListener(actionDown, function (e) {
			e.preventDefault();
			moveRight();
		});
		right.addEventListener(actionUp, function (e) {
			e.preventDefault();
			stop();
		});
		jumpButton.addEventListener(actionDown , function (e) {
			e.preventDefault();
			jump();
		});

		// Hide the instructions to desktop users.
		$("#keys").addClass("hidden");
	}

    // Wire up event listeners for a keyboard.
	function wireUpDesktop() {

		// Wire up key press listeners.
		// 37 : left arrow - move left.
		// 39 : right arrow - move right.
		// 32 : space bar - jumping
		// 38 : up arrow - jumping
		// 40 : down arrow - FOR TESTING.
		addEventListener("keydown", function (e) {

			e.preventDefault();

			var key = e.keyCode;
			switch (key) {
				case 37:
					moveLeft();
					break;
				case 39:
					moveRight();
					break;
				case 32:
				case 38:
					jump();
					break;
			}
		});
		addEventListener("keyup", function (e) {

			e.preventDefault();

			var key = e.keyCode;
			switch (key) {
				case 37:
				case 39:
					stop();
					break;
			}
		});

		// Hide the instructions for iPad users.
		$("#buttons").addClass("hidden");
	}

	// Change to the end level screen and
	// enable next level buttons.
	function changeLevel(gameTime) {

		var nextLevel = $("#nextlevel")[0],
			timeCount = $("#time")[0];

		// Remove existing event listener and
		// update time clock.
		nextLevel.removeEventListener("click", loadLevel);
		timeCount.innerText =
			"Finish time: " + (gameTime / 1000).toFixed() + " seconds";

		// Disable the button if the player has reached the final level.
		if (levelCount == 2) {
			nextLevel.disabled = true;
			nextLevel.style.display = "none";
			timeCount.innerHTML += "<br/>Game over! You win!";
		}
		else {
			nextLevel.addEventListener("click", loadLevel);
		}

		// Show the level complete screen.
		toggleDisplay("level-complete");
	}

	// Move sprite to the right.
	function moveRight() {

		try {
			// Pass in the movement to the game.
		    animation.move("x", moveTypes.right);
		}
		catch (err) {
			console.log(err);
		}
	}

	// Move sprite to the left.
	function moveLeft() {

		try {
		    // Pass in the movement to the game.
		    animation.move("x", moveTypes.left);
		}
		catch (err) {
			console.log(err);
		}
	}

	// Make the sprite jump up and down.
	function jump() {

		try {
		    // Pass in the movement to the game.
		    animation.move("y", moveTypes.jumping);
		}
		catch (err) {
			console.log(err);
		}
	}

	// Stop movement along the x-axis.
	function stop() {

		try {
		    // Pass in the movement to the game.
		    animation.move("x", moveTypes.none);
		}
		catch (err) {
			console.log(err);
		}
	}

	return {
		changeLevel: changeLevel,
		levelCount: levelCount,
		startGame: startGame,
		toggleDisplay: toggleDisplay
	};
})();