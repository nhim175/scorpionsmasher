# Copyright © 2013 All rights reserved
# Author: nhim175@gmail.com

Module = require '../module.coffee'
Logger = require '../../mixins/logger.coffee'

class GUIClock extends Module
  @include Logger

  logPrefix: 'GUIClock'

  seconds: 5

  constructor: (game) ->
    @game = game
    @me = @game.add.group()
    @time = new Phaser.BitmapText @game, 0, 10, '8bit_wonder', '' + @getTime(), 40
    @me.add @time
    @me.x = @game.world.centerX
    @me.y = 50
    @timer = @game.time.create(false)
    @timer.loop 1000, @updateTime, @
    @timer.start()

  updateTime: =>
    unless @game.isOver
      @seconds--
      $(@).trigger 'Time.Out' if @seconds < 0

  getTime: ->
    minutes = Math.floor @seconds/60
    seconds = @seconds%60
    if minutes < 10 then minutes = '0' + minutes
    if seconds < 10 then seconds = '0' + seconds
    minutes + ':' + seconds

  getSeconds: -> @seconds

  reset: ->
    @seconds = 30

  update: ->
    if not @game.isOver
      @time.text = @getTime()
      @me.x = @game.world.centerX - @time.width/2
    else
      @me.visible = false


module.exports = GUIClock