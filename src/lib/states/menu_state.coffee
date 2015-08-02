# Copyright © 2013 All rights reserved
# Author: nhim175@gmail.com

config = require '../config.coffee'
RedDuck = require '../red_duck.coffee'
Platform = require '../platform.coffee'
Logger = require '../../mixins/logger.coffee'
Module = require '../module.coffee'
Button = require '../button.coffee'

LOGO_WIDTH = 368
LOGO_HEIGHT = 144
START_BTN_WIDTH = 212

class MenuState extends Module
  @include Logger

  logPrefix: 'MenuState'

  constructor: (game)->

  preload: ->

  create: ->

    @game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT
    @game.scale.setScreenSize true

    # set background
    @game.add.sprite 0, 0, 'background'

    @GUI = @game.add.group()

    @logo = @game.add.sprite @game.world.centerX, @game.world.centerY - 100, 'logo'
    @logo.anchor.setTo 0.5, 0.5
    @game.add.tween(@logo).to {y: @game.world.centerY - 150}, 1000, Phaser.Easing.Cubic.InOut, true, 0, Number.MAX_VALUE, true 

    @startBtn = new Button @game, @game.world.centerX, @game.world.centerY, 'start_btn', @onStartBtnClickListener
    @startBtn.anchor.setTo 0.5, 0.5

    @GUI.add @logo
    @GUI.add @startBtn

    @debug @startBtn
    
  onStartBtnClickListener: =>
    @debug 'start btn click listener'
    @game.state.start 'play'

  update: ->

module.exports = MenuState
