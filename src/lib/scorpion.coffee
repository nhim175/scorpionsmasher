# Copyright © 2013 All rights reserved
# Author: nhim175@gmail.com

Module = require './module.coffee'
Logger = require '../mixins/logger.coffee'
Util = require './util/util.coffee'

WIDTH = 96
HEIGHT = 108

class Scorpion extends Module
  @include Logger

  logPrefix: 'Scorpion'

  sprite: 'scorpion'

  health: 1

  points:
    x: []
    y: []

  pi: 0

  speed: 2

  bonus: 1

  runFrames: Phaser.Animation.generateFrameNames('v', 1, 5, '.png', 0)

  dieFrames: ['v6.png']

  constructor: (game) ->
    @game = game
    @me = @game.add.sprite Util.getRandomInt(0, game.width), 0, @sprite
    @me.animations.add 'run', @runFrames, 24, yes
    @me.animations.add 'die', @dieFrames, 0, no
    @me.animations.play 'run'
    @me.anchor.set(0.5)
    @sound = new Phaser.Sound @game, 'cockroach', 1
    @dieSound = new Phaser.Sound @game, 'die', 1

    for i in [0..4]
      @points.x[i] = game.rnd.between(0, game.width)
      @points.y[i] = game.height/4*i

    @plotPath()
    @sound.play()

    $(game).on 'GameOverEvent', =>
      @sound.stop()
      window.plugins?.NativeAudio?.stop 'cockroach'

  plotPath: ->
    @path = []
    ix = 0
    x = @speed/@game.height
    i = 0
    until i > 1
      px = @game.math.catmullRomInterpolation @points.x, i
      py = @game.math.catmullRomInterpolation @points.y, i
      node = x: px, y: py, angle: 0
      node.angle = @game.math.angleBetweenPoints(@path[ix - 1], node) if ix > 0
      node.angle += 90
      @path.push node
      ix++
      i += x

  kill: ->
    if window.plugins?.NativeAudio
      window.plugins.NativeAudio.play 'die'
      window.plugins.NativeAudio.stop 'cockroach'
    else
      @sound.stop()
      @dieSound.play()
    @me.animations.play 'die'
    @died = true
    setTimeout =>
      @me.destroy()
    , 2000
    @bonus

  isKilled: -> @died is true

  update: ->
    if @died then return
    @me.y = @path[@pi].y
    @me.x = @path[@pi].x
    @me.rotation = @path[@pi].angle

    @pi++

    if @pi >= @path.length
      @me.destroy() 
      @died = true 

module.exports = Scorpion