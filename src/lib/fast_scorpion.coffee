# Author: Thinh Pham
# Email: nhim175@gmail.com

Scorpion = require './scorpion.coffee'

class FastScorpion extends Scorpion

  runFrames: Phaser.Animation.generateFrameNames('x', 1, 5, '.png', 0)

  dieFrames: ['x6.png']

  speed: 5

module.exports = FastScorpion