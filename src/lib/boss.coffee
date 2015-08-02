# Author: Thinh Pham
# Email: nhim175@gmail.com

Scorpion = require './scorpion.coffee'

class Boss extends Scorpion

  runFrames: Phaser.Animation.generateFrameNames('b', 1, 5, '.png', 0)

  dieFrames: ['b6.png']

  speed: 5

  bonus: 5

  health: 3

module.exports = Boss