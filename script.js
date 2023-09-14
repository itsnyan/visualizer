let mic;
let fft;
let particles = [];
let img;
let audioContextStarted = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  imageMode(CENTER);
  rectMode(CENTER);
  //fft = new p5.FFT(0.8, 512);
  bg = loadImage("assets/background.jpg");
  //bg = loadImage("assets/nathan.jpg");
  // noLoop();

  let startButton = createButton("Start Audio");
  startButton.position(10, 10);
  startButton.mousePressed(startAudio);
}

function startAudio() {
  if (!audioContextStarted) {
    mic = new p5.AudioIn();
    fft = new p5.FFT(0.8, 512);
    mic.start(() => {
      mic.connect(fft); // Connect the microphone to the FFT
      fft.setInput(mic);
      audioContextStarted = true;

      // Explicitly resume the audio context
      getAudioContext()
        .resume()
        .then(() => {
          console.log("Audio context resumed successfully.");
        });
    });
    audioContextStarted = true;
  }
}

function getFreqSpectrum() {
  let frequencies = fft.analyze();
  console.log(frequencies);
}

function draw() {
  background(0);

  if (!audioContextStarted) {
    fill(255);
    textSize(24);
    textAlign(CENTER, CENTER);
    text("Click 'Start Audio' to begin", width / 2, height / 2);
    return;
  }

  translate(width / 2, height / 2);

  setTimeout(fft.analyze(), 1000);
  fft.analyze();
  amp = fft.getEnergy(20, 200);

  push();
  if (amp > 150) {
    let scaleFactor = map(amp, 150, 500, 1.0, 1.5); // Adjust the range and scale factor as needed
    scale(scaleFactor);
  }
  image(bg, -50, -50, width + 100, height + 100);
  pop();

  let alpha = map(amp, 0, 255, 100, 150);
  fill(20, alpha);
  noStroke();
  rect(0, 0, width, height);

  stroke(random(100, 255), random(200, 255), random(100, 255));
  stroke(255);
  strokeWeight(3);
  noFill();

  console.log(mic.getLevel());
  console.log(mic);

  let wave = fft.waveform();

  for (let t = -1; t <= 1; t += 2) {
    beginShape();
    for (let i = 0; i <= 180; i += 0.5) {
      let index = floor(map(i, 0, 180, 0, wave.length - 1));
      let r = map(wave[index], -1, 1, 90, 350);
      let x = r * sin(i) * t;
      let y = r * cos(i);
      vertex(x, y);
    }
    endShape();
  }

  let p = new Particle();
  particles.push(p);

  for (let i = particles.length - 1; i >= 0; i--) {
    if (!particles[i].edges()) {
      particles[i].update(amp > 230);
      particles[i].show();
    } else {
      particles.splice(i, 1);
    }
  }
}

class Particle {
  constructor() {
    this.pos = p5.Vector.random2D().mult(250);
    this.vel = createVector(0, 0);
    this.acc = this.pos.copy().mult(random(0.0001, 0.00001));

    this.w = random(3, 5);
    //this.color = [random(100, 255), random(200, 255), random(100, 255)];
    this.color = "255, 255, 255, 0.3";
  }
  update(cond) {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    if (cond) {
      this.pos.add(this.vel);
      this.pos.add(this.vel);
      this.pos.add(this.vel);
    }
  }
  edges() {
    if (
      this.pos.x < -width / 2 ||
      this.pos.x > width / 2 ||
      this.pos.y < -height / 2 ||
      this.pos.y > height / 2
    ) {
      return true;
    } else {
      return false;
    }
  }
  show() {
    noStroke();
    fill(this.color);
    ellipse(this.pos.x, this.pos.y, this.w);
  }
}
