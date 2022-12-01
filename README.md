# Final Project - CCI36

## Contributors

| [<img src="https://avatars.githubusercontent.com/u/47227182?v=4" width="115"><br><sub>@hentt30</sub>](https://github.com/hentt30) | [<img src="https://avatars.githubusercontent.com/u/78799492?v=4" width="115"><br><sub>@samuelv8</sub>](https://github.com/samuelv8) | [<img src="https://avatars.githubusercontent.com/u/54087165?v=4" width="115"><br><sub>@caio-ggomes</sub>](https://github.com/caio-ggomes) |
|:-:|:-:|:-:|

## Setup
Download [Node.js](https://nodejs.org/en/download/).
Run this followed commands:

``` bash
# Install dependencies (only the first time)
npm install

# Run the local server at localhost:8080
npm run dev

# Build for production in the dist/ directory
npm run build
```

## Implementation

### Function pointInPolygon

Given a point `p` and a `polygon` (ordered list of points), do the ray test:
For each edge of the polygon (`polygon[i]` -> `polygon[(i+1) % polygon.length)]`) evaluate the intersection point with the y coordinate of `p`, if its x coordinate is greater than `p`'s x coordinate and it doensn't lie outside the edge, then increments intersection count. In the end, `p` is inside the polygon if the total number of intersections is odd, otherwise, it is outside. 

### Function weilerAtherton (to evaluate intersection of two polygons, `p1` and `p2`, returns a polygon)

Using the function `pointInPolygon`, evaluate all points of `p1` inside of `p2` and all points of `p2` inside `p1`. Also, iterating over all edges, find all intersection points of `p1` and `p2`, indexing by the edges of each one. 

Try starting the path with a vertex of `p1` inside `p2`, if there is at least one, pick it. If there isn't, then pick a point of `p2` inside of `p1` to begin with. If there still isn't one, then pick an intersection point to begin with. If there still isn't, then the polygons have no intersection.

Now follow the following algorithm: If you are currently in a vertex of `p1`, try going to the next vertex of `p1`. If it is not inside `p2`, pick first intersection point defined by current edge and start going over the edge of `p2`. Else if you are currently in a vertex of `p2`, try going to the next vertex of `p2`. Likewise, if it's not inside `p1`, pick first intersection point defined by current edge and start going over the edge of `p1`. If you are currently at an intersection point, try finding the next intersection point over the edge, if there isn't, go to the edge's destination vertex. 

Do this algorithm until you come back to starting point.

### Function area

Iterating over all the edges of a polygon, sum all the signed areas defined by the triangle composed by the edge and the origin (0, 0). The absolute value of this sum will give the polygon's area.

To compute the signed area of a triangle, use the determinant formula.

### Event handlers

Whenever user moves the mouse (`pointermove` event) updates tracking pointer values (used for raycasting). 

Drag controls used for picking the Tangram objects where implemented with THREE.js class `DragControls`. 

Simple responsivity was implemented with `resize` event (updates the camera for scene fitting). 

On `wheel` event there's two cases: if the pointer is inside a object, it's rotated according to the wheel move (around it's own geometric center); otherwise, the camera zooms in/out.

Whenever user drops a polygon (`mouseup` event), it's computed the intersection area of all the polygons with the house and subtract the intersection area of all the polygons with themselves (two by two). When the user is close to the solution, this will approximately result in the area of the house.

Therefore, if this computation is greater then 97% of house's area, it is considered that the user acomplished the desired result and the game is won.

A text "Win!!" is shown on the screen for a few seconds and then the game is restarted.
