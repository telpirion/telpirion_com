Roll five dice and try to make three-of-a-kind, a full house, or even a Yahtzy!

<a href="/games/game-yahtzy" class="button">Play the game</a>

## About

Yahtzy, which is very similar to [poker dice][poker-dice], is a classic dice
game played with five
dice. The goal is to score points by rolling five dice to make certain
combinations. Each player takes turns rolling the dice, and after each roll, the
player can choose which dice to keep and which to re-roll. The dice can be
re-rolled up to three times per turn. After the third roll, the player must
choose a category to score in.

Originally, I built the Yahtzy game as an assignment for a university course.
The true "v1" of this game was built in [VB.NET][vbnet] with
[Winforms][Winforms] (true story!).
After submitting the assignment, I decided to rebuild it using JavaScript.

## How to Play

* Roll the dice by clicking the **Roll** button.
* Select the dice you want to keep by clicking on them. The borders of the
  dice turn red when you have a hold on them.
* Roll the dice up to three times per turn.
* After the third roll, you must choose a category to score in.
  +  The available categories are displayed above the dice. Click on a category
     to select a category. The border of the category you've selected turns
     yellow.

  + Click **Enter** to confirm your choice and score the points.
* After choosing a category, the turn is over and it's the next player's turn.
* The game ends when all categories have been scored.
* Click **Reset** to start the game over.

## Known issues

+ The "AI opponents" will always score in a set pattern. They don't really
  "think".

[poker-dice]: https://www.britannica.com/topic/poker-dice
[vbnet]: https://en.wikipedia.org/wiki/Visual_Basic_(.NET)
[Winforms]: https://en.wikipedia.org/wiki/Windows_Forms
