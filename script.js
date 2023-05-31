// Setup Paper.js
var canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


// The amount of segment points we want to create:
var amount = 5;

// The maximum height of the wave:
var height = 60;

paper.setup(canvas);


// Create a new path and style it:
var path = new paper.Path({
  // 80% black:
  strokeColor: [0.8],
  strokeWidth: 30,
  strokeCap: 'square'
});

// Add 5 segment points to the path spread out
// over the width of the view:
for (var i = 0; i <= amount; i++) {
  var currSizeX = i/amount * paper.view.size._width // may need to reverse this! KAI
  var currSizeY = 1 * paper.view.size._height
  // path.add(new paper.Point(i / amount, 1) * paper.view.size);
  path.add(new paper.Point(currSizeX, currSizeY));
  
  // console.log("i is path", paper.view.size)

}

// Select the path, so we can see how it is constructed:
path.selected = true;

// Draw the view:
paper.view.draw();

paper.view.onFrame = function(event) {
  // Loop through the segments of the path:
  for (var i = 0; i <= amount; i++) {
    var segment = path.segments[i];

    // A cylic value between -1 and 1
    var sinus = Math.sin(event.time * 3 + i);

    // Change the y position of the segment point:
    segment.point.y = sinus * height + 100;
  }
  // Uncomment the following line and run the script again
  // to smooth the path:
  // path.smooth();
}
