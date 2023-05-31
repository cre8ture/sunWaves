
// // Setup Paper.js
// var canvas = document.getElementById('canvas');
// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;
// canvas.style.background = 'rgba(0, 0, 0, 0.9)';
// // The amount of segment points we want to create:
// var amount = 110;
// var count = 20;
// // The maximum height of the wave:
// var maxHeight = 20;

// paper.setup(canvas);

// // Define the base hue of blue you want to use
// var baseHue = 200; // or any value between 0 and 360

// // Create an array to store the paths
// var paths = new Array(count);
// var rad = Math.min(paper.view.size.width, paper.view.size.height) * 0.4;
// // Create a big yellow circle
// var circle = new paper.Path.Circle({
//   center: paper.view.center, // Set the center of the circle to the center of the canvas
//   radius: Math.min(paper.view.size.width, paper.view.size.height) * 0.4, // Set the radius to be 40% of the canvas size
//   fillColor: { hue: 60, saturation: 1, brightness: 0.7 }
// });

// // Calculate the dimensions of the rectangle
// var rectangleWidth = rad * 3;
// var rectangleHeight = rad;

// // Calculate the position of the rectangle
// var rectangleX = paper.view.center.x - rad;
// var rectangleY = paper.view.center.y + rad / 7;

// // Draw the view to display the rectangle
// paper.view.draw();
// // Create a rectangle
// var rectangle = new paper.Path.Rectangle({
//   from: [0, paper.view.center.y + 2],
//   to: [paper.view.size.width, paper.view.size.height],
//   fillColor: 'rgba(0, 0, 0, 0.9)',
//   strokeColor: null,
//   strokeWidth: 0
// });

// // Loop through the paths and create a new path for each one
// for (var i = 0; i < count; i++) {
//   // Calculate the hue for this path
//   var hue = (baseHue + i * (360 / count)) % 360;

//   // Calculate the shade of gray based on the loop index
//   var grayShade = 200 - i * (200 / count);

//   // Create a new path and style it with the gray shade
//   var path = new paper.Path({
//     strokeColor: { hue: 0, saturation: 0, brightness: grayShade / 255 },
//     strokeWidth: 2,
//     strokeCap: 'round'
//   });

//   // Add the path to the array
//   paths[i] = path;

//   // Add segment points to the path spread out over the width of the view:
//   for (var j = 0; j <= amount; j++) {
//     var currSizeX = j / amount * paper.view.size.width;
//     var currSizeY = paper.view.size.height;
//     path.add(new paper.Point(currSizeX, currSizeY));
//   }
// }

// // Create a Web Audio API context and an analyser node:
// var audioCtx = new AudioContext();
// var analyser = audioCtx.createAnalyser();
// analyser.fftSize = 256;
// var bufferLength = analyser.frequencyBinCount;
// var dataArray = new Uint8Array(bufferLength);

// // Create an Audio element and load the audio file:
// var audio = new Audio('./house.mp3');
// audio.crossOrigin = 'anonymous';

// // Variable to track if the music is currently playing
// var isPlaying = false;

// // Function to start or stop the music and animation
// function toggleMusic() {
//   if (isPlaying) {
//     // Stop the music
//     audio.pause();
//     isPlaying = false;
//     startButton.innerHTML = 'Start &#9658;';

//     // Stop the animation
//     paper.view.onFrame = null;
//   } else {
//     // Start the music and animation
//     audio.play();
//     isPlaying = true;
//     startButton.innerHTML = 'Stop ◼️';

//     // Connect the audio element to the analyser node:
//     var source = audioCtx.createMediaElementSource(audio);
//     source.connect(analyser);
//     analyser.connect(audioCtx.destination);

//     // Start the animation
//     var startY = circle.position.y; // Get the initial y position of the circle
//     var newY = startY;

//     paper.view.onFrame = function onFrame(event) {
//       newY = newY + .05;
//       circle.position.y = newY;

//       // Get the amplitude values of the sound:
//       analyser.getByteFrequencyData(dataArray);

//       for (var i = 0; i < count; i++) {
//         var path = paths[i];

//         // Loop through the segments of the path:
//         for (var j = 0; j <= amount; j++) {
//           var segment = path.segments[j];

//           // Calculate the amplitude value for this segment:
//           var amplitudeIndex = Math.floor(j / amount * bufferLength);
//           var amplitude = dataArray[amplitudeIndex] / 255;
//           var height = maxHeight * amplitude;
//           var sinus = Math.sin(event.time * 3 + i * 10 + j);
//           segment.point.y = sinus * height + i * maxHeight / 2 + paper.view.size.height / 2;
//         }

//         // Smooth the path to make it look nicer:
//         path.smooth();
//       }
//     };
//   }
// }

// // Get the Start button element and add a click event listener
// var startButton = document.getElementById('startButton');
// startButton.addEventListener('click', toggleMusic);


// // Setup Paper.js
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
var rad = Math.min(paper.view.size.width, paper.view.size.height) * 0.4;
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
  from: [0, paper.view.center.y + 2],
  to: [paper.view.size.width, paper.view.size.height],
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
    strokeColor: { hue: 0, saturation: 0, brightness: grayShade / 255 },
    strokeWidth: 2,
    strokeCap: 'round'
  });

  // Add the path to the array
  paths[i] = path;

  // Add segment points to the path spread out over the width of the view:
  for (var j = 0; j <= amount; j++) {
    var currSizeX = j / amount * paper.view.size.width;
    var currSizeY = paper.view.size.height;
    path.add(new paper.Point(currSizeX, currSizeY));
  }
}

// Create a Web Audio API context and an analyser node:
var audioCtx; //= new AudioContext();
var analyser; //= audioCtx.createAnalyser();
// analyser.fftSize;// = 256;
var bufferLength; //= analyser.frequencyBinCount;
var dataArray; // = new Uint8Array(bufferLength);

// Create an Audio element and load the audio file:
var audio;// = new Audio('./house.mp3');
// audio.crossOrigin = 'anonymous';

// Variable to track if the music is currently playing
var isPlaying = false;

// Function to start or stop the music and animation
function toggleMusic() {
  if (isPlaying) {
    // Stop the music
    audio.pause();
    isPlaying = false;
    startButton.innerHTML = 'Start &#9658;';

    // Stop the animation
    paper.view.onFrame = null;
  } else {
    // Start the music and animation
    audioCtx = new AudioContext();
    analyser = audioCtx.createAnalyser();
    analyser.fftSize = 256;
    bufferLength = analyser.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);
    audio = new Audio('./house.mp3');
    audio.crossOrigin = 'anonymous';

    audio.play();
    isPlaying = true;
    startButton.innerHTML = 'Stop ◼️';

    // Connect the audio element to the analyser node:
    var source = audioCtx.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(audioCtx.destination);

    // Start the animation
    var startY = circle.position.y; // Get the initial y position of the circle
    var newY = startY;

    paper.view.onFrame = function onFrame(event) {
      newY = newY + .05;
      circle.position.y = newY;

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
        }

        // Smooth the path to make it look nicer:
        path.smooth();
      }
    };
  }
}

// Get the Start button element and add a click event listener
var startButton = document.getElementById('startButton');
startButton.addEventListener('click', toggleMusic);
