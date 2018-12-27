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
		
	var loadLevel =  function () {
	    debug.writeLine("Loading next level.");
		startLevel2();
	}
	
	function startGame(inputType) {
		debug.showCallstack("startGame");
		
		// Capture reference to elements.
		left = document.getElementById("left");
		right = document.getElementById("right");
		jumpButton = document.getElementById("jump");
		
		// Define the inputs for the platform.    
		if (inputType == "touch") {
			wireUpIPad();
		}
		else {
			wireUpDesktop();
		}
		
		// Start the first level.
		levelCount = 0;
		startLevel2()
	}
	
	// Shows or hides screens in the game.
	function toggleDisplay(screen){
		debug.showCallstack("toggleDisplay");
		
		// Hide all the screens.
		for (var i = 0; i < gameScreens.length; i++) {
			dom.addClass(dom.getNode(gameScreens[i]), "hidden");
		}

		// Display the screen that we need.
		dom.removeClass(dom.getNode(screen), "hidden");
	}
	
    // Load the scripts for the level.
	function startLevel2(){
		debug.showCallstack("startLevel2");
		
		var levelScript;

	    // Remove the previous level's script from the page.
		loader.removeScript("Vikings/level" + levelCount);
		levelCount++;
	
		var levelFile = "Vikings/level" + levelCount + ".js";

		var callback = function () {
		    debug.writeLine(levelFile + " load complete.");

			toggleDisplay("game-screen");
	        
            // Update the background for the level.
			dom.getNode("game-display").style.backgroundImage = background;
		    //debug.writeLine(typeof background);

		    // Start the game sequence.
			game.beginClock();
		}
			
		loader.loadScripts([levelFile], callback);
	}
	
    // Wire up event listeners for touch devices.
    // Only seems to work on iOS ...
	function wireUpIPad() {
		debug.showCallstack("wireUpIPad");
		
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
		dom.addClass(dom.getNode("keys"), "hidden");
	}

    // Wire up event listeners for a keyboard.
	function wireUpDesktop() {
		debug.showCallstack("wireUpDesktop");

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
		dom.addClass(dom.getNode("buttons"), "hidden");
	}
	
	// Change to the end level screen and
	// enable next level buttons.
	function changeLevel(gameTime) {
		debug.showCallstack("changeLevel");
		
		var nextLevel = dom.getNode("nextlevel"),
			timeCount = dom.getNode("time");
			
		// Remove existing event listener and 
		// update time clock.
		nextLevel.removeEventListener("click", loadLevel);
		timeCount.innerText = 
			"Finish time: " + (gameTime / 1000).toFixed() + " seconds";
		
		// Disable the button if the player has reached the final level.
		if (levelCount == 2) {
			nextLevel.disabled = true;
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
		debug.showCallstack("moveRight");
		
		try {
			// Pass in the movement to the game.  
		    game.move("x", moveTypes.right);
		}
		catch (err) {
			debug.writeLine(err);
		}
	}
	
	// Move sprite to the left.
	function moveLeft() {
		debug.showCallstack("moveLeft");
	
		try {
		    // Pass in the movement to the game.  
		    game.move("x", moveTypes.left);
		}
		catch (err) {
			debug.writeLine(err);
		}
	}
	
	// Make the sprite jump up and down.
	function jump() {
		debug.showCallstack("jump");
	
		try {   
		    // Pass in the movement to the game.  
		    game.move("y", moveTypes.jumping);
		}
		catch (err) {
			debug.writeLine(err);
		}
	}
	
	// Stop movement along the x-axis.
	function stop() {
		debug.showCallstack("stop");
		
		try {
		    // Pass in the movement to the game.  
		    game.move("x", moveTypes.none);
		}
		catch (err) {
			debug.writeLine(err);
		}
	}
	
	return {
		changeLevel: changeLevel,
		levelCount: levelCount,
		startGame: startGame,
		startLevel2: startLevel2,
		toggleDisplay: toggleDisplay
	};
})();