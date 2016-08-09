'use strict';

// Should we use DI to inject the constants?
let C = require('../utils/constants');

class Frame {
  constructor (frame) {
    this.frame = frame;
    this.firstTry = 0;
    this.secondTry = 0;
    this.score = 0;
    this.state = C.NORMAL_STATE;
  }

  init () {
    this._initFirstTry();
    this._initSecondTry();
    this._calculateScore();
  }

  _initFirstTry () {
    // If it is a special case like STRIKE or MISS
    if(isNaN(this.frame[0])) {
      if (this.frame[0] === C.STRIKE) {
        this.firstTry = C.MAX_POINTS;
        this.state = C.STRIKE_STATE;
      }
    } else {
      this.firstTry = parseInt(this.frame[0], 10);
    }    
  }

  _initSecondTry () {
    // If it is a special case like SPARE or MISS
    if(isNaN(this.frame[1])) {
      // specific case for the bonus frame
      if (this.frame[1] === C.STRIKE) {
        this.secondTry = C.MAX_POINTS;  
      } else if (this.frame[1] === C.SPARE) {
        this.secondTry = C.MAX_POINTS - this.firstTry;
        this.state = C.SPARE_STATE;
      }
    } else {
      this.secondTry = parseInt(this.frame[1], 10);
    }
  }

  _calculateScore () {
    this.score = this.firstTry + this.secondTry;    
  }

  getFrame () {
    return this.frame;
  }

  getFirstTry () {
    return this.firstTry;
  }

  getSecondTry () {
    return this.secondTry;
  }

  getScore () {
    return this.score;
  }

  getState () {
    return this.state;
  }
}

module.exports = Frame;
