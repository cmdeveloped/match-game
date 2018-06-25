# Udacity Matching Game - Front End Development
Udacity Matching Game built using HTML, Sass, and Javascript ( ES6 &amp; jQuery )

## Dependencies
If you would like to run the application in your own environment:
`node -v && npm -v`

1. `npm init -y && npm install gulp && npm install --save-dev gulp-sass gulp-autoprefixer browser-sync gulp-eslint gulp-concat gulp-uglify gulp-babel babel-core babel-preset-env gulp-rename`
2. `gulp`

### Description
This game is my take on a classic matching/memory game. After 12 moves, correct or incorrect, the rating drops to 2 stars. If it takes more than 18 moves, you'll receive a 1 star rating! (womp womp)

Some pairs are a bit trickier than other due to similarities, so pay close attention.

### Development
This game was set up using HTML, Sass, and Javascript.

I ran gulp to concat, compress, and compile my css and js, check for any errors in my js, and used babel to allow for ES6 syntax.
