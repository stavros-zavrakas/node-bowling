'use strict';

// Should we use DI to inject the Frame and constants?
const logger = require('../utils/logger');
let C = require('../utils/constants');

let Frame = require('./Frame');

class Game {
  constructor (input, name) {
    this.name = name || 'Bowling';
    this.input = input;
    this.score = 0;
    this.frames = [];

    this.history = {
      oneFrameBack: null,
      twoFramesBack: null
    };
    
    this.bonus = null;
  }

  start () {
    let self = this;

    let gameArr = this.input.split('||');

    let frames = gameArr[0].split('|');
    self.bonus = gameArr[1];

    frames.forEach(function (fr) {
      let frame = new Frame(fr);
      frame.init();

      self.frames.push(frame);

      // first add the obvious points and then calculate the pending points
      // of the previous frames (in case the player had a strike or a spare)
      self.addToScore(frame.getScore());
      self.calculateHistoryPoints(frame);
    });

    self.calculateBonus();
  }

  calculateHistoryPoints (frame) {
    let pendingPoints = 0;

    logger.debug('frame:', frame.getFrame());
    logger.debug('state:', frame.getState());
    logger.debug('prev state:', this.history.oneFrameBack);
    logger.debug('two prev state:', this.history.twoFramesBack);

    // Check if there was a strike two frames ago
    if (this.history.twoFramesBack === C.STRIKE_STATE) {
      pendingPoints += frame.getScore();
      this.history.twoFramesBack = null;
    }

    // Check if there was a strike or spare a frame ago
    if (this.history.oneFrameBack === C.STRIKE_STATE) {
      // Give the total score of the current turn because there was a strike
      pendingPoints += frame.getScore();
      
      // Handle the case when we have multiple strikes in row
      if (frame.getState() === C.STRIKE_STATE) {
        this.history.twoFramesBack = this.history.oneFrameBack;
      }
    } else if (this.history.oneFrameBack === C.SPARE_STATE) {
      // Keep the points of the first try because it was a spare
      pendingPoints += frame.getFirstTry();
    }

    // Keep the history of the frame and add the pending points to the total score
    this.history.oneFrameBack = frame.getState();
    this.addToScore(pendingPoints);
  }

  calculateBonus () {
    let pendingPoints = 0;

    if (this.bonus) {
      let frame = new Frame(this.bonus);
      frame.init();

      // Calculate the bonus of the last frame in case there was a strike or a spare
      if (this.history.oneFrameBack === C.STRIKE_STATE) {
        pendingPoints += frame.getScore();
      } else if (this.history.oneFrameBack === C.SPARE_STATE) {
        pendingPoints += frame.getFirstTry();
      }

      // Calculate the bonus of penultimate frame in case there was a strike
      if (this.history.twoFramesBack === C.STRIKE_STATE) {
        pendingPoints += frame.getFirstTry();
      }
    }

    this.addToScore(pendingPoints);
  }

  addToScore (frameScore) {
    this.score += frameScore;
  }

  getScore () {
    return this.score;
  }
}

module.exports = Game;
