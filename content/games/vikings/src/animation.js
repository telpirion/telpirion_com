/*
    Animation and screen updater for Vikings!!!
    Version 6.0
    Eric Schmidt
    Published: 2012-12-08
    Updated: 2017-01-23
*/
var animation = (function () {

	var canvas,
		ctx,
		tock, // The game timer
		time, // The internal game clock
        clock, // The game clock display
		isWon, // The  game's win condition.
		character, // The game character.
		inputX, // The user input, x and y.
		inputY,
		xCoords, // The external display of the game coordinates.
		yCoords,
		ground;

	// Start the game clock and initialize the level.
	function beginClock() {

		// Reset game settings.
	    time = 0;
	    inputX = moveTypes.none;
	    inputY = moveTypes.none;
	    isWon = false;

	    // Initialize the game character.
	    character = new Sprite(10, 200, 50, 78);

	    // Draw the game screen.
	    draw();

	    // Start the game clock.
	    setTimeout(tick, 1000 / 30);
	}

	// Update the game character's position on the screen
	// based upon player input.
	function move(axis, direction) {

		// Determine which axis to update.
		switch (axis) {
			case "x":
				inputX = direction;
				break;
			case "y":
				inputY = direction;
				break;
		}
	}

	// Draw the game game.characters and level.
	function draw() {

		// Check to see if we have the canvas
		// and drawing context.
		if ((!canvas) ||
			(!ctx)) {
			canvas = $("#canvas")[0];
			ctx = canvas.getContext("2d");
		}

		// Clear the canvas.
		canvas.width = canvas.width;

		// Create a scrolling display.
		var offsetX,
			xLimit = ground.width - 300,
			visibleRange = 0;

		// Adjust the viewport.
		if ((character.x > 300) &&
			(character.x <= xLimit)) {
			offsetX = (character.x - 300) * -1;
			visibleRange = character.x - 300;
		}
		else if (character.x > xLimit) {
			offsetX = (xLimit - 300) * -1;
			visibleRange = ground.width - 600;
		}
		else {
			offsetX = 0;
		}

		// Adjust the view of the canvas.
		ctx.translate(offsetX, 0);

		// Flip the game.character facing left
		// if he's moving left. First,
		// save the drawing context.
		ctx.save();
		if (character.moveXStatus == moveTypes.left) {
			ctx.translate((character.x * 2) + character.width, 0);
			ctx.scale(-1, 1);
		}

		// Draw the game game.character.
		// TODO: This will fail until images are pre-loaded.
		ctx.drawImage(images[1], 
			character.x,
			character.y);

		// Restore the drawing context.
		ctx.restore();

		// Draw the ground of the level.
		ctx.fillStyle = ground.color;
		ctx.fillRect(ground.x,
			ground.y, ground.width, ground.height);

		drawBlocks(visibleRange);
	}

	// Draw the level blocks
	function drawBlocks(visibleRange) {
		// Draw the level blocks.
		var block;

		for (var i = 0; i < blocks.length; i++) {
			block = blocks[i];

			// Check to see if the block is visible.
			if ((block.x < (visibleRange + 600)) &&
				((block.x + block.width) > visibleRange)) {

				// If the block has an image, draw the image.
				if (block.url) {
					ctx.drawImage(images[0],
						block.x,
						block.y);
				}
				// Draw the blocks to the canvas.
				else {
					ctx.fillStyle = block.color;
					ctx.fillRect(block.x,
						block.y, block.width, block.height);
				}
			}
		}
	}

	// Execute the main game sequence.
	// Fire 30 times per second.
	function tick() {

		// Update the game.character's horizontal movement
		// status based upon user input.
		character.moveXStatus = inputX;
		character.moveXStatus = inputX;

		// Update the game.character's vertical movement status based upon user input.
		// Do not change the input if the character is jumping or falling.
	    if ((inputY != moveTypes.none) &&
            (character.moveYStatus == moveTypes.none)) {

	        // Change the game character's moving status.
	        character.moveYStatus = inputY;
	        character.airTime = 0;

	        // Clear the jump command after changing.
	        inputY = moveTypes.none;
	    }

	    // Update the location of the game character.
	    character.update();

	    // Redraw the game screen if the user has input commands
	    // or the character is jumping/falling.
	    if ((inputX != moveTypes.none) ||
            (inputY != moveTypes.none) ||
            (character.moveYStatus != moveTypes.none)) {
	        draw();
	    }

	    // Check to see if the player has
	    // completed the level.
	    if ((character.x + character.width) >=
            (ground.width - 10)) {
	        isWon = true;
	        win();
	    }

	    // Update the game clock.
	    updateClock();

	    // Update the displayed coordinates.
	    updateCoords();

	    // Restart the game sequence.
	    if (!isWon) {
	        tock = setTimeout(tick, 1000 / 30);
	    }
	}

	// Update the game clock.
	function updateClock() {

		var newTime = time;

		if (!clock) {
		    clock = $("#clock")[0];
		}

		// Increase the time variable once every second.
		newTime = newTime + (1000 / 30);
		time = newTime;

		// Display the new time in seconds.
		clock.innerText = (newTime / 1000).toFixed();
	}

	// Update the displayed location of game character.
	function updateCoords() {

	    if ((!xCoords) ||
            (!yCoords)) {
	        xCoords = $("#x-coord")[0];
	        yCoords = $("#y-coord")[0];
	    }

		xCoords.innerText = character.x;
		yCoords.innerText = character.y.toFixed(2);
	}

    // Cancel the main game sequence if the player has
    // finished the level and load next level.
	function win() {
		console.log("win");

		// Clear the game timer and character data.
		clearTimeout(tock);

        // Reload the game display.
		page.changeLevel(time);
	}

    // Set the object for the ground variable.
	function setGround(_ground) {
		ground = _ground;
	}

	function getGround() {
		return ground;
	}

	return {
        beginClock: beginClock,
        draw: draw,
        ground: getGround,
        move: move,
        setGround: setGround,
		win: win
	};

})();