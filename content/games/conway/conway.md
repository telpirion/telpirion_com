Build a colony of microbes that survives from one generation to the next.

<a href="/games/game-conway" class="button">Play the game</a>

## About

This version of [Conway's Game of Life][conway] came to being as part of an
advanced JavaScript course I took at Google. The goal was to provide a
simple, in-browser version of Conway's life simulation.

The simulation is written in JavaScript and uses the Canvas API. No other
libraries are used in the simulation.

If you are unfamiliar with Conway's Life simulation, the rules are simple:

+ A "colony of cells" is represented as a series of blocks on the canvas.
+ Each cell on the canvas is either "alive" or "dead".
+ Any live cell with fewer than two live neighbors dies, as if by
  under-population.
+ Any live cell with two or three live neighbors lives on to the next
  generation.
+ Any live cell with more than three live neighbors dies, as if by
  overpopulation.
+ Any dead cell with exactly three live neighbors becomes a live cell, as if
  by reproduction.

## How to play

1. The grey canvas represents the colony of cells.
1. Click on a blank spot on the canvas to add a "live cell" to the colony.
1. Click on a "live cell" to remove it from the colony.
1. Click the **Run** button to start the simulation.
1. Click the **Pause** button to stop the simulation.
1. Click the **Clear** button to clear the canvas.

## Known issues

+ The simulation doesn't seem to handle simple gliders correctly.

[conway]: https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life