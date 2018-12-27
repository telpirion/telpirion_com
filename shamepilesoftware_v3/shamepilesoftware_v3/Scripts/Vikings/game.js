var images;

// When the game loads, load the scripts and images.
window.onload = function() {
	debug.writeLine("start loading game");
	
	// Create a list of the images to load.
	var imageNames = [
		"Content/Images/block.png",
		"Content/Images/vK_50x78.png"
	];
	//debug.writeLine(imageNames.toString());
	
	// Create a list of the scripts to load.
	var scripts = [
		"Vikings/game-logic.js",
		"Vikings/animation.js",
		"Vikings/user-interface.js"
	];
	//debug.writeLine(scripts.toString());
	
	var callback = function () {
	
		// Tell the user that the game has loaded.
		// Create buttons for the user to select game experience.
		var message = dom.getNode("message");	
		message.innerHTML = "<br/><br/>";
		
        // Define a handler for the start game button.
		var launch = function (target) {
		    // Set up the game screen.
		    page.startGame(target.id);
		}
		
		// Detect support for gestures on device.
		message.setAttribute('touchstart', function () {});
		
		debug.writeLine(typeof message.ontouchstart);
		if (typeof message.ontouchstart == "object") {

		    // Create a button for tablet users to start the game.
		    var ipadStart = dom.createNode("input",
		    	[["id", "touch"],
		    	["type", "button"],
		    	["value", "Touch to start game"]]);
		    message.appendChild(ipadStart);

		    // Add event listeners.
		    ipadStart.addEventListener("click", function (e) {
		        launch(e.target);
		    });

		} else {

		    // Create a button for desktop users to start the game.
		    var desktopStart = dom.createNode("input",
		    	[["id", "desktop"],
		    	["type", "button"],
		    	["value", "Click to start game"]]);
		    message.appendChild(desktopStart);

		    desktopStart.addEventListener("mousedown", function (e) {
		        launch(e.target);
		    });
	    }   
	}
	
	loader.loadImages(imageNames, function (result) {
		images = result.images;
		loader.loadScripts(scripts, callback);
	});
}