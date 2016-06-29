var images = [];

// Start the Vikings!!! game sequence.
(function () {
	
	// Create a list of the images to load.
	var imageNames = [
		"images/block.png",
		"images/vK_50x78.png"
	];
	
	$.when(
		
		$.getScript( "scripts/vikings/game-logic.js"),
		$.getScript( "scripts/vikings/animation.js" ),
		$.getScript( "scripts/vikings/user-interface.js" ),
		$.Deferred(function(deferred){
			var img1 = new Image();
			img1.onload = function () {
				images[0] = img1;
				deferred.resolve();
			}
			img1.src = imageNames[0];
		}),
		$.Deferred(function(deferred){
			var img2 = new Image();
			img2.onload = function () {
				images[1] = img2;
				deferred.resolve();
			}
			img2.src = imageNames[1];
		}),
		$.Deferred(function( deferred ){
			$( deferred.resolve );
		})
	)
	.done(function(){
		console.log("done called");
		
		// Tell the user that the game has loaded.
		// Create buttons for the user to select game experience.
		var message = $("#message")[0];	
		message.innerHTML = "Loading complete!<br/><br/>";
			
	    // Define a handler for the start game button.
		var launch = function (target) {
			// Set up the game screen.
			page.startGame(target.id);
		}
		
		// Detect support for gestures on device.
		message.setAttribute('touchstart', function () {});
		console.log(typeof message.ontouchstart);

		$(message).append("<input id='start' type='button' value='Start game' />");
		
	    // Add event listeners.
	    $("#start").click(function (e) {
	        launch(e.target);
	    });

	});

})();
