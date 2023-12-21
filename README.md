# Audio Visualizer with p5.js and Tone.js
This simple audio visualizer application uses the p5.js and Tone.js libraries to create visual effects based on microphone input. The visualizer displays dynamic shapes and particles that respond to the audio frequencies detected by the microphone.

⚠️ Although this application requires microphone access, its sole purpose is to serve as an input for the FFT, enabling the analysis and retrieval of the waveform. ([code source](https://github.com/itsnyan/visualizer/blob/main/script.js#L25))

## Getting Started

Demo: https://itsnyan.github.io/visualizer/

<img src="https://github.com/itsnyan/visualizer/assets/93353532/5f796dab-9ef6-4058-bf8c-202c7eaaa173" width="800" />


## Usage
- Upon opening the application, you will see a "Start Audio" button. Click on it to initiate the microphone input.
- Once the audio is started, the visualizer will respond to the detected audio frequencies.
- The visualizer incorporates an image as the background. You can replace the default image by modifying the bg variable in the setup function.
- Adjust the visual effects by modifying parameters such as the scale factor and color within the draw function. Experiment with these values to customize the visual experience.

## Important Notes
- The application uses the p5.js library for graphics and user interface, as well as the Tone.js library for audio analyzation.
- The Particle class is responsible for creating and managing the behavior of particles on the screen.
- Ensure that your browser allows microphone access for the application to function properly.

## Credits
- p5.js: Library for creative coding with a focus on drawing and animation.
- Tone.js: A Web Audio framework for creating interactive music in the browser.










