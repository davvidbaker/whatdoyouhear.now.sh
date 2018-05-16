import React, { Component } from 'react';
import './App.css';
import yanny from './yanny3.mp3';
import ForkMe from './ForkMe';

const $ = selector => document.querySelector(selector);

class App extends Component {
  state = {
    speed: 1,
    bandpassCenter: 1000,
    q: 10,
  };

  componentDidMount() {
    this.tryToInitializeStuff();
  }

  tryToInitializeStuff() {
    const yannyElement = $('audio');
    yannyElement.crossOrigin = 'anonymous';

    this.audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();

    this.source = this.audioContext.createMediaElementSource(this.audio);

    this.peakingFilter = this.audioContext.createBiquadFilter({
      type: 'peaking',
    });
    this.peakingFilter.frequency.value = this.state.bandpassCenter;
    this.peakingFilter.Q.value = this.state.q;

    this.source.connect(this.peakingFilter);

    this.analyser = this.audioContext.createAnalyser();
    this.analyser.fftSize = 1024;

    this.peakingFilter.connect(this.analyser);
    this.analyser.connect(this.audioContext.destination);
    this.audioContext.resume();

    this.ctx = this.canvas.getContext('2d');

    this.draw();
  }

  draw() {
    requestAnimationFrame(() => {
      this.draw();
    });

    this.bufferLength = this.analyser.frequencyBinCount;
    this.dataArray = new Uint8Array(this.bufferLength);
    this.analyser.getByteFrequencyData(this.dataArray);

    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = 'mediumseagreen';

    this.ctx.beginPath();

    var sliceWidth = this.canvas.width * 1.0 / this.bufferLength;
    // magic
    var x = 0;
    this.ctx.moveTo(x, this.canvas.height);
    x = this.canvas.width / 4;
    this.ctx.lineTo(x, this.canvas.height);

    for (var i = 0; i < this.bufferLength; i++) {
      var v = this.dataArray[i] / 128.0;
      var y = this.canvas.height - v * this.canvas.height / 2;
      this.ctx.lineTo(x, y);

      // hacky
      x += sliceWidth * 2;
    }

    this.ctx.lineTo(this.canvas.width, this.canvas.height / 2);
    this.ctx.stroke();
  }

  changePlaybackRate = e => {
    this.audio.playbackRate = Math.log(e.target.value / 100);
  };

  changePeakingFrequency = e => {
    this.peakingFilter.frequency.value = e.target.value;
  };

  changepeakingQ = e => {
    this.peakingFilter.Q.value = e.target.value;
  };

  render() {
    return (
      <div className="App">
        <div
          style={{
            position: 'relative',
            background: 'white',
            paddingBottom: '25px',
          }}
        >
          <h1>YANNY</h1>
          <h1 className="laurel">LAUREL</h1>
          <ForkMe />
          <div>
            <p>Speed</p>
            <input
              defaultValue={Math.E * 100}
              type="range"
              onChange={this.changePlaybackRate}
              min={110}
              max={500}
            />
          </div>
          <div>
            <p>Bandpass center</p>
            <input
              defaultValue={1000}
              type="range"
              onChange={this.changePeakingFrequency}
              min={10}
              max={5000}
            />
          </div>
          <div>
            <p>Q-factor</p>
            <input
              defaultValue={10}
              type="range"
              onChange={this.changepeakingQ}
              min={0}
              max={100}
            />
          </div>

          <div>
            <br />
            <audio
              ref={a => (this.audio = a)}
              autoPlay
              controls
              loop
              onPlay={() => {
                this.audioContext.resume();
              }}
              src={yanny}
            />
          </div>
          <canvas width="1000" ref={c => (this.canvas = c)} />
        </div>
        <div
          style={{
            padding: '25px 0',
            background: '#dadada',
          }}
        >
          <p>Listen to the original</p>
          <audio controls src={yanny} />
        </div>
      </div>
    );
  }
}

export default App;
