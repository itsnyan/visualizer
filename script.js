let mic, fft;
let audioContextStarted = false;

console.log("test");

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Create an FFT object to analyze audio frequency
  fft = new Tone.FFT(256);

  // Create a microphone input
  mic = new Tone.UserMedia();

  // Setup a button to start the audio context
  let startButton = createButton("Start Audio");
  startButton.position(10, 10);
  startButton.mousePressed(startAudio);

  // Create an event listener for user gesture
  console.log("setup");
  window.addEventListener("click", handleUserGesture);
}

function startAudio() {
  if (!audioContextStarted) {
    Tone.start(); // Start the audio context
    mic.open().then(() => {
      // Connect the microphone to the FFT
      mic.connect(fft);
    });
    audioContextStarted = true;
  }
}

function handleUserGesture() {
  // Handle user gesture, e.g., by starting audio
  console.log("clicked");
  startAudio();
}

function draw() {
  background(0);

  // Get the frequency data from the FFT
  let spectrum = fft.getValue();

  // Draw the visualizer bars
  noStroke();

  fill(255);
  for (let i = 0; i < spectrum.length; i++) {
    let x = map(i, 0, spectrum.length, 0, width);
    let h = map(spectrum[i], -100, -30, 0, height);
    rect(x, height, width / spectrum.length, h * -1);
  }
}
