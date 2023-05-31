// Setup Paper.js
var canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// The amount of segment points we want to create:
var amount = 5;

// The maximum height of the wave:
var maxHeight = 100;

paper.setup(canvas);

// Create a new path and style it:
var path = new paper.Path({
  strokeColor: 'blue', // Set the stroke color to blue
  strokeWidth: 30,
  strokeCap: 'round'
});

// Add segment points to the path spread out over the width of the view:
for (var i = 0; i <= amount; i++) {
  var currSizeX = i / amount * paper.view.size.width;
  var currSizeY = paper.view.size.height; // Set the Y coordinate to the height of the canvas
  path.add(new paper.Point(currSizeX, currSizeY));
}


// Select the path, so we can see how it is constructed:
path.selected = true;

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
});

// Connect the audio element to the analyser node:
var source = audioCtx.createMediaElementSource(audio);
source.connect(analyser);
analyser.connect(audioCtx.destination);

// Draw the view:
paper.view.draw();

// Animate the wave based on the sound amplitude:
paper.view.onFrame = function(event) {
  // Get the amplitude values of the sound:
  analyser.getByteFrequencyData(dataArray);

  // Loop through the segments of the path:
  for (var i = 0; i <= amount; i++) {
    var segment = path.segments[i];

    // Calculate the amplitude value for this segment:
    var amplitudeIndex = Math.floor(i / amount * bufferLength);
    var amplitude = dataArray[amplitudeIndex] / 255;

    // Adjust the y position of the segment point based on the amplitude:
    var height = maxHeight * amplitude;
    var sinus = Math.sin(event.time * 3 + i);
    segment.point.y = sinus * height + 300;
  }

  // Smooth the path to make it look nicer:
  path.smooth();
};