'use strict';

const readline = require('readline');

const logger = require('./utils/logger');
let Game = require('./resources/Game');

const rl = readline.createInterface({
  input: process.stdin
});

// Input examples:
// let input = 'X|X|X|X|X|X|X|X|X|X||XX';
// let input = '9-|9-|9-|9-|9-|9-|9-|9-|9-|9-||';
// let input = '5/|5/|5/|5/|5/|5/|5/|5/|5/|5/||5';
// let input = 'X|7/|9-|X|-8|8/|-6|X|X|X||81';
// let game = new Game(input);

rl.on('line', (input) => {
  logger.info(`Received: ${input}`);

  let game = new Game(input);

  game.start();

  logger.debug(game);
  logger.info('Score: ' + game.getScore());
});
