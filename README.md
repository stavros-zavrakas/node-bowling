# Bowling game!

## Description
This is a very very simple bowling game. It reads a stream of characters like those:
X|X|X|X|X|X|X|X|X|X||XX
9-|9-|9-|9-|9-|9-|9-|9-|9-|9-||
5/|5/|5/|5/|5/|5/|5/|5/|5/|5/||5
X|7/|9-|X|-8|8/|-6|X|X|X||81

and at the end will calculate the total of the points.

The approach is this:
- Read the stream
- Split the string to the double pipe characters || to find the bonus
- Split the string to the single pipe character | to find the frames
- Iterate over the splitted elements and keep reference to the two previous frames
- Every time that we move to the next frame we check the previous frames as well so that we can add the bonus if there was a strike or a spare
- @todo: for the time being there is no string validation, so the program will accept any string

## Build and run
```
npm install
node bowling.js
```

Break the execution by pressing CTRL + C

## tests & linter
npm test
npm run eslint
