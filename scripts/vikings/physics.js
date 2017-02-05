/*
    Basic physics engine
    Version 6.0
    Eric Schmidt
    Published: 2012-12-08
    Updated: 2017-01-23
*/
var physics = {

    blocks: undefined,

    // Test to see if the sprite
    // has collided with an object.
    adjustMove: function (startX, startY, width, height, deltaX, deltaY, moveXDir, moveYDir){

        var result = {},
            x = startX + deltaX,
            y = startY + deltaY,
            newX = deltaX,
            newY = deltaY,
            verticalHit,
            horizontalHit,
            moveYStatus = null,
            xLimit = animation.ground().width;

        // Test for a vertical and horizontal hit.
        verticalHit = this.testHit(startX, y, width, height, {startY : startY, moveDir : moveXDir});
        horizontalHit = this.testHit(x, startY, width, height);

        // The sprite is moving to the right.
        if (moveXDir  == moveTypes.right) {

            // Sprite hit the right edge.
            if (x > (xLimit - width)) {
                newX = (xLimit - width) - startX;
            }

            // Check for a hit and adjust
            // the x-value if so.
            else if (horizontalHit) {
                newX = horizontalHit.x - (startX + width);
            }
        }
        // The sprite is moving to the left.
        else if (moveXDir == moveTypes.left) {

            // Sprite hit the left edge.
            if (x < 0) {
                newX = 0 - startX;
            }

                // Check for a hit and adjust
                // x-value if so.
            else if (horizontalHit) {
                newX = (horizontalHit.x + horizontalHit.width) - startX;
            }
        }

        // The sprite is jumping.
        if (moveYDir == moveTypes.jumping) {
            if (verticalHit) {
               newY = (verticalHit.y + verticalHit.height) - startY;
               moveYStatus = moveTypes.falling;
           }
        }

        // The sprite is falling.
        if (deltaY > 0) {

            // Sprite hit the ground.
            if (y > (280 - height)) {
                newY = (280 - height) - startY;
                moveYStatus = moveTypes.none;
            }

            // Check if the sprite hit a block.
            else if (verticalHit) {
                newY = verticalHit.y - (startY + height);
                moveYStatus = moveTypes.none;
            }
        }

        // Return the new x and y values.
        result.x = newX;
        result.y = newY;
        result.moveYStatus = moveYStatus;
        return result;
    },

    // Test each block in the level for a hit.
    testHit: function (x, y, width, height, options) {

        // Test to see if the sprite
        // has run into a block in the level.
        var block;
        var hTest1, hTest2, vTest1, vTest2, vTest3, vTest4;
        for (var i = 0; i < blocks.length; i++) {
            block = blocks[i];

            hTest1 = (x + width) > block.x;
            hTest2 = x < (block.x + block.width);
            vTest1 = (y + height) > block.y;
            vTest2 = y < (block.y + block.height);

            // Test for exact hit inside of obstacle.
            if (hTest1 &&
                hTest2 &&
                vTest1 &&
                vTest2) {

                // Hit a block; return the block to
                // the calling code.
                return block;
            }

            // Test for vertical passage through blocked space.
            if (options != null) {

                if (options.moveDir == moveTypes.falling) {
                    vTest3 = options.startY <= (block.y + 5);
                    vTest4 = (y + height + 5) >= block.y;
                }
                // Test for a vertical hit.
                if (hTest1 &&
                    hTest2 &&
                    vTest3 &&
                    vTest4) {
                    return block;
                }

            }
        }

        return null;
    },

    // Determine whether the sprite can
    // fall further to the ground.
    testFall: function (x, y) {

        var isFalling = false;

        // Test for collision 1 pixel below
        // passed in coordinates.
        if (!this.testHit(x, y + 1)) {
            isFalling = true;
        }

        return isFalling;
    },

    // Determine sprite position during jump.
    jump: function (t) {

        // y = -t2 + 4t - 4
        //return (Math.pow(t, 2) * -1) + (t * 4) - 4;

        // Calculate the sprite's position
        // on the x-axis using the formula:
        // y = 2t - 4
        var result = {},
            y = (t * 2) - 4,
            status = moveTypes.jumping,
            time = t;

        // Change the sprite status if it is
        // approaching a delta of 0.
        if (y > -0.5) {
            status = moveTypes.falling;
            time = 0;
        }
        else {
            y = y * 10;
        }

        // Return the new values.
        result.y = y;
        result.status = status;
        result.time = time;
        return result;
    },

    // Determine sprite position during a fall.
    fall: function (t) {
        // y = t2
        var result = {},
            y = Math.pow(t, 2) * 10,
            status = moveTypes.falling,
            time = t;

        // Return the new values.
        result.y = y;
        result.status = status;
        result.time = time;
        return result;
    },

    setBlocks: function(_blocks) {
        blocks = _blocks;
    }
};

// An enum for storing expressing movement status.
var moveTypes = {
    none: "none",
    right: "right",
    left: "left",
    jumping: "jumping",
    falling: "falling"
};

// Define a base class for game characters.
function Sprite(x, y, width, height) {
	this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = "rgba(0,0,0,1)";
    this.airTime = 0;
    this.moveXStatus = moveTypes.none;
    this.moveYStatus = moveTypes.none;
    this.move = 10;
}

// Update the sprite's position in the game level.
Sprite.prototype.update = function() {

	var deltaX = 0,
        deltaY = 0,
	    gravityResults = null;

    // Change the sprite's x value.
    switch (this.moveXStatus) {
        case moveTypes.right:
            deltaX = this.move;
            break;

        case moveTypes.left:
            deltaX = 0 - this.move;
       	    break;
    }

    // Change the sprite's y value.
    switch (this.moveYStatus) {
        case moveTypes.jumping:
            gravityResults = physics.jump(this.airTime);
            break;

        case moveTypes.falling:
            gravityResults = physics.fall(this.airTime);
            break;

        default:
             var isFalling = physics.testFall(this.x, this.y);
             if (isFalling) { this.moveYStatus = moveTypes.falling }
    }

    // If there has been any change due to gravity,
    // update the data for the y-axis.
    if (gravityResults) {

        // Update the jumping values.
        this.airTime = gravityResults.time + (1 / 3);
        this.moveYStatus = gravityResults.status;
        deltaY = gravityResults.y;
    }

    // Test the new coordinates for a hit,
    // and return the new coordinates.
    var results = physics.adjustMove(this.x, this.y,
        this.width, this.height, deltaX, deltaY, this.moveXStatus,
        this.moveYStatus);

    // Check to see if the object has hit ground yet or not.
    if (results.moveYStatus) {
        this.moveYStatus = results.moveYStatus;
        this.airTime = 0;
    }

    this.x = this.x + results.x;
    this.y = this.y + results.y;
}