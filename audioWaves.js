
const dropZone = document.getElementById("drop-zone");

dropZone.addEventListener("drop", (event) => {
  event.preventDefault();
  const file = event.dataTransfer.files[0];
  const url = URL.createObjectURL(file);
  playAudio(url);
});

document.addEventListener("dragover", (event) => {
  event.preventDefault();
});

document.addEventListener("drop", (event) => {
  event.preventDefault();
});

var audio; //  = new Audio('./house.mp3');

function playAudio(url, audio) {
  audio = new Audio(url);
  audio.play();
}


// Setup Paper.js
var canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.background = 'rgba(0, 0, 0, 0.9)';
// The amount of segment points we want to create:
var amount = 110;
var count = 20;
// The maximum height of the wave:
var maxHeight = 20;

paper.setup(canvas);

// Define the base hue of blue you want to use
var baseHue = 200; // or any value between 0 and 360

// Create an array to store the paths
var paths = new Array(count);
var rad = Math.min(paper.view.size.width, paper.view.size.height) * 0.4
// Create a big yellow circle
var circle = new paper.Path.Circle({
  center: paper.view.center, // Set the center of the circle to the center of the canvas
  radius: Math.min(paper.view.size.width, paper.view.size.height) * 0.4, // Set the radius to be 40% of the canvas size
  fillColor: { hue: 60, saturation: 1, brightness: 0.7 }
});


// Calculate the dimensions of the rectangle
var rectangleWidth = rad * 3;
var rectangleHeight = rad;

// Calculate the position of the rectangle
var rectangleX = paper.view.center.x - rad;
var rectangleY = paper.view.center.y + rad / 7;

// Draw the view to display the rectangle
paper.view.draw();
// Create a rectangle
var rectangle = new paper.Path.Rectangle({
  // point: [rectangleX, rectangleY],
  // size: [rectangleWidth, rectangleHeight],
  from: [0, paper.view.center.y+2],
  to: [paper.view.size.width, paper.view.size.height],
  fillColor: 'rgba(0, 0, 0, 0.9)',
  fillColor: 'rgba(0, 0, 0, 0.9)',
  strokeColor: null,
  strokeWidth: 0
});


// Loop through the paths and create a new path for each one
for (var i = 0; i < count; i++) {
  // Calculate the hue for this path
  var hue = (baseHue + i * (360 / count)) % 360;

  // Calculate the shade of gray based on the loop index
  var grayShade = 200 - i * (200 / count);

  // Create a new path and style it with the gray shade
  var path = new paper.Path({
    strokeColor: { hue: 0, saturation: 0, brightness: grayShade / 255 }, // Set the stroke color with the calculated gray shade
    strokeWidth: 2,
    strokeCap: 'round'
  });

  // Add the path to the array
  paths[i] = path;

  // Add segment points to the path spread out over the width of the view:
  for (var j = 0; j <= amount; j++) {
    var currSizeX = j / amount * paper.view.size.width;
    var currSizeY = paper.view.size.height; // Set the Y coordinate to the height of the canvas
    path.add(new paper.Point(currSizeX, currSizeY));
  }
}



// Select the path, so we can see how it is constructed:
// path.selected = true;

// Create a Web Audio API context and an analyser node:
var audioCtx = new AudioContext();
var analyser = audioCtx.createAnalyser();
analyser.fftSize = 256;
var bufferLength = analyser.frequencyBinCount;
var dataArray = new Uint8Array(bufferLength);

// Load the audio file and play it:
var audio = new Audio('./house.mp3');
audio.crossOrigin = 'anonymous';
audio.addEventListener('canplaythrough', function() {
  audio.play();
})

// Connect the audio element to the analyser node:
var source = audioCtx.createMediaElementSource(audio);
source.connect(analyser);
analyser.connect(audioCtx.destination);

// Draw the view:
paper.view.draw();

// Animate each path with a different sin wave
paper.view.onFrame = function onFrame(event) {
  // Get the amplitude values of the sound:
  analyser.getByteFrequencyData(dataArray);

  for (var i = 0; i < count; i++) {
    var path = paths[i];

    // Loop through the segments of the path:
    for (var j = 0; j <= amount; j++) {
      var segment = path.segments[j];

      // Calculate the amplitude value for this segment:
      var amplitudeIndex = Math.floor(j / amount * bufferLength);
      var amplitude = dataArray[amplitudeIndex] / 255;
      var height = maxHeight * amplitude;
      var sinus = Math.sin(event.time * 3 + i * 10 + j);
      segment.point.y = sinus * height + i * maxHeight / 2 + paper.view.size.height / 2;
      // console.log(segment.point.y)
    }

    // Smooth the path to make it look nicer:
    path.smooth();
  }
}