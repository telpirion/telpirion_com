/*
    Entry point for Vikings!!!
    Version 6.1
    Eric Schmidt
    Published: 2012-12-08
    Updated: 2018-12-26
*/
let images = [];

// Start the Vikings!!! game sequence.
window.onload = function () {
  // Create a list of the images to load.
  var imageNames = ["/images/block.png", "/images/vK_50x78.png"];

  console.log("start game load");

  $.when(
    $.Deferred(function (deferred) {
      var img1 = new Image();
      img1.onload = function () {
        images[0] = img1;
        deferred.resolve();
      };
      img1.src = imageNames[0];
    }),
    $.Deferred(function (deferred) {
      var img2 = new Image();
      img2.onload = function () {
        images[1] = img2;
        deferred.resolve();
      };
      img2.src = imageNames[1];
    }),
    $.Deferred(function (deferred) {
      $(deferred.resolve);
    })
  ).done(function () {
    // Tell the user that the game has loaded.
    // Create buttons for the user to select game experience.
    var message = $("#message")[0];
    message.innerHTML = "Loading complete!<br/><br/>";

    // Define a handler for the start game button.
    var launch = function (target) {
      // Set up the game screen.
      page.startGame(target.id);
    };

    // Detect support for gestures on device.
    message.setAttribute("touchstart", function () {});
    console.log(typeof message.ontouchstart);

    $(message).append(
      "<button id='start' class='button primary'>Start Game</button>"
    );

    // Add event listeners.
    $("#start").click(function (e) {
      launch(e.target);
    });
  });
};
