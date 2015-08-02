# Copyright © 2013 All rights reserved
# Author: nhim175@gmail.com

Module = require '../module.coffee'
Logger = require '../../mixins/logger.coffee'
Axe = require '../axe.coffee'

class GUIAxes extends Module
  @include Logger

  logPrefix: 'GUIAxes'

  axes: 0

  constructor: (game) ->
    @game = game
    @me = @game.add.group()
    @score = new Phaser.BitmapText @game, 120, 10, '8bit_wonder', '' + @axes, 40
    @score.updateText()
    @score.x = 123 - @score.textWidth

    @axe = new Phaser.Image @game, 128, 0, 'axe'

    @me.add @score
    @me.add @axe
    @me.x = @game.width - 64*3 - 50
    @me.y = 50

    $(@game).on 'GameOverEvent', @onGameOver

  onGameOver: =>
    @game.isUsingAxes = false

  getScore: -> @axes

  addAxe: (num)->
    @axes += num

  update: ->
    @score.text = '' + @axes
    @score.x = 123 - @score.width

  reset: ->
    @axes = 0

module.exports = GUIAxes
