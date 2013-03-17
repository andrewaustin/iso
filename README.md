iso
====

An html5 staggered isometric map.

Some images and ideas from from the book JavaScript: Making Isometric Social Real-Time Games with HTML5, CSS3 and
Javascript (ISBN #978-1-4493-0475-1).

Some code from random people on stack overflow:
http://stackoverflow.com/questions/892811/drawing-isometric-game-worlds
http://gamedev.stackexchange.com/questions/38320/is-it-possible-to-map-mouse-coordinates-to-isometric-tiles-with-this-coordinate
http://gamedev.stackexchange.com/questions/45103/staggered-isometric-map-calculate-map-coordinates-for-point-on-screen

Ideas
----
* Canvas should only draw viewable area or use two canvas for blitting.
* FPS counter
* Rewrite code to be more engine like.
  * Preload image resources
* Minimap
  * Scaled background canvas (inefficient?)
  * Render map array into small canvas
* Trees
* Unit Movement
* A*
* Impassable tiles (e.g. water)
* Animated Unit movement
* Multi unit select (rubberbands) & movement
* Castle Walls
* Melee Unit combat
* Ranged Unit combat
* Destroy castle walls
* Units can dig in moats
* TMX file support
* Think about how things will work on mobile.

Done
----
* Draw the staggered map
* Tile Picking
* Scrollable map with arrow keys on keyboard
  * Map should not scroll beyond bounds
  * Tile Picking should work when scrolled