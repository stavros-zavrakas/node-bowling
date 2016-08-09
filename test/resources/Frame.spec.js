'use strict';

const expect = require('chai').expect;

let Frame = require('../../resources/Frame');


// We have to remember that a frame will be created properly 
// if both the _initFirstTry and _initSecondTry will be called
// Otherwise, the frame will be 'partially' created and that' s
// why some of the expects below seem a bit odd.
describe('Frame', () => {
  
  describe('_initFirstTry()', () => {

    it('strike initialization', () => {
      let frame = new Frame('X');
      frame._initFirstTry();

      expect(frame.getFirstTry()).to.equal(10);
      expect(frame.getSecondTry()).to.equal(0);
      expect(frame.getState()).to.equal('STRIKE');
    });

    it('miss initialization', () => {
      let frame = new Frame('-/');
      frame._initFirstTry();

      expect(frame.getFirstTry()).to.equal(0);
      expect(frame.getSecondTry()).to.equal(0);
      expect(frame.getState()).to.equal('NORMAL');
    });

    it('number initialization', () => {
      let frame = new Frame('2/');
      frame._initFirstTry();

      expect(frame.getFirstTry()).to.equal(2);
      expect(frame.getSecondTry()).to.equal(0);
      expect(frame.getState()).to.equal('NORMAL');
    });

  });

  describe('_initSecondTry()', () => {

    it('strike initialization', () => {
      let frame = new Frame('X');
      frame._initSecondTry();

      expect(frame.getFirstTry()).to.equal(0);
      expect(frame.getSecondTry()).to.equal(0);
      expect(frame.getState()).to.equal('NORMAL');
    });

    it('spare initialization', () => {
      let frame = new Frame('-/');
      frame._initSecondTry();

      expect(frame.getFirstTry()).to.equal(0);
      expect(frame.getSecondTry()).to.equal(10);
      expect(frame.getState()).to.equal('SPARE');
    });

    it('number initialization', () => {
      let frame = new Frame('23');
      frame._initSecondTry();

      expect(frame.getFirstTry()).to.equal(0);
      expect(frame.getSecondTry()).to.equal(3);
      expect(frame.getState()).to.equal('NORMAL');
    });

  });

  describe('init()', () => {

    it('strike initialization', () => {
      let frame = new Frame('X');
      frame.init();

      expect(frame.getFirstTry()).to.equal(10);
      expect(frame.getSecondTry()).to.equal(0);
      expect(frame.getScore()).to.equal(10);
      expect(frame.getState()).to.equal('STRIKE');
    });

    it('miss and spare initialization', () => {
      let frame = new Frame('-/');
      frame.init();

      expect(frame.getFirstTry()).to.equal(0);
      expect(frame.getSecondTry()).to.equal(10);
      expect(frame.getScore()).to.equal(10);
      expect(frame.getState()).to.equal('SPARE');
    });

    it('number and spare initialization', () => {
      let frame = new Frame('3/');
      frame.init();

      expect(frame.getFirstTry()).to.equal(3);
      expect(frame.getSecondTry()).to.equal(7);
      expect(frame.getScore()).to.equal(10);
      expect(frame.getState()).to.equal('SPARE');
    });

    it('number initialization', () => {
      let frame = new Frame('23');
      frame.init();

      expect(frame.getFirstTry()).to.equal(2);
      expect(frame.getSecondTry()).to.equal(3);
      expect(frame.getScore()).to.equal(5);
      expect(frame.getState()).to.equal('NORMAL');
    });

  });

});