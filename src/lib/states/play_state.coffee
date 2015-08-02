config = require '../config.coffee'
Logger = require '../../mixins/logger.coffee'
Scorpion = require '../scorpion.coffee'
FastScorpion = require '../fast_scorpion.coffee'
Boss = require '../boss.coffee'
Axe = require '../axe.coffee'
Module = require '../module.coffee'
Button = require '../button.coffee'
Util = require '../util/util.coffee'

GUIAxes = require '../gui/axes.coffee'
GUIClock = require '../gui/clock.coffee'
GUIPauseButton = require '../gui/pause_btn.coffee'

class PlayState extends Module
  @include Logger

  logPrefix: 'PlayState'

  constructor: (game) ->

  preload: ->

  create: ->

    # set background
    @game.add.sprite 0, 0, 'background'

    # set game characters
    @enemiesLayer = @game.add.group()
    @enemiesLayer.z = 5

    @enemies = []

    @axe = new Axe @game

    @scorpionTimer = @game.time.create(false)
    @scorpionTimer.loop 1000, (=> @addScorpion()), @
    @scorpionTimer.start()

    @fastScorpionTimer = @game.time.create(false)
    @fastScorpionTimer.loop 2000, (=> @addScorpion('fast')), @
    @fastScorpionTimer.start()

    @bossTimer = @game.time.create(false)
    @bossTimer.loop 3000, (=> @addScorpion('boss')), @
    @bossTimer.start()

    @addScorpion()

    # set GUI
    @GUIAxes = new GUIAxes @game
    @GUIClock = new GUIClock @game
    @GUIGameOver = @game.add.group()

    @gameOverText = new Phaser.Sprite @game, @game.world.centerX, -400, 'game_over'
    @gameOverText.anchor.setTo 0.5, 0.5
    @gameOverTextInTween = @game.tweens.create(@gameOverText).to {y: 120 }, 1000, Phaser.Easing.Cubic.Out 
    @gameOverTextOutTween = @game.tweens.create(@gameOverText).to {y: -120 }, 1000, Phaser.Easing.Cubic.Out 

    @scoreBoard = new Phaser.Sprite @game, @game.world.centerX, -500, 'score_board'
    @scoreBoard.anchor.setTo 0.5, 0.5
    @scoreBoardInTween = @game.tweens.create(@scoreBoard).to {y: 300 }, 1000, Phaser.Easing.Cubic.Out 
    @scoreBoardOutTween = @game.tweens.create(@scoreBoard).to {y: -200 }, 1000, Phaser.Easing.Cubic.Out 

    @result = new Phaser.BitmapText @game, @game.world.centerX, -100, '8bit_wonder', '', 60
    @resultInTween = @game.tweens.create(@result).to {y: @game.world.centerY - 300 }, 1000, Phaser.Easing.Cubic.Out
    @resultOutTween = @game.tweens.create(@result).to {y: -100}, 1000, Phaser.Easing.Cubic.Out

    @startBtn = new Button @game, -200, 450, 'start_btn', @onStartBtnClickListener
    @startBtn.anchor.setTo 1, 0
    @startBtnInTween = @game.tweens.create(@startBtn).to {x: @game.world.centerX - 20}, 1000, Phaser.Easing.Cubic.Out 

    @shareBtn = new Button @game, @game.width + 200, 450, 'exit_btn', @onShareBtnClickListener
    @shareBtnInTween = @game.tweens.create(@shareBtn).to {x: @game.world.centerX + 20}, 1000, Phaser.Easing.Cubic.Out 

    @GUIGameOver.z = 100
    @GUIGameOver.y = 200
    @GUIGameOver.add @gameOverText
    @GUIGameOver.add @scoreBoard
    @GUIGameOver.add @startBtn
    @GUIGameOver.add @shareBtn
    @GUIGameOver.add @result

    @dblKillSound = new Phaser.Sound @game, 'double_kill', 1
    @tripleKillSound = new Phaser.Sound @game, 'triple_kill', 1

    pause_btn = new GUIPauseButton @game

    $('.resume-btn').on 'click', @onResumeBtnClicked
    $(@game).on 'PausedEvent', @pause_game
    $(@GUIClock).on 'Time.Out', @onTimeOut
    document.addEventListener 'pause', @pause_game, false

  onResumeBtnClicked: =>
    @game.paused = false
    $('body').removeClass 'paused'

  reset: ->
    @GUIClock.reset()
    @game.isOver = false

  onStartBtnClickListener: =>
    @reset()
    @game.state.restart 'play'

  onShareBtnClickListener: =>
    @share_result()

  addScorpion: (type = 'normal')->
    return if @game.paused
    
    scorpion = switch type
      when 'normal' then new Scorpion @game
      when 'fast' then new FastScorpion @game
      when 'boss' then new Boss @game
    scorpion.me.inputEnabled = true
    @enemiesLayer.add scorpion.me
    scorpion.me.events.onInputDown.add =>
      @handleScorpionClickEvent scorpion
    @enemies.push scorpion

  handleScorpionClickEvent: (scorpion) ->
    return if @game.isOver
    x = @game.input.position.x
    y = @game.input.position.y

    # kill ducks
    i = @enemies.length
    killed = 0
    bonus = 0
    while i--
      scorpion = @enemies[i]
      if Phaser.Rectangle.contains(scorpion.me.getBounds(), x, y) and not scorpion.isKilled()
        if scorpion.health is 1
          killed += 1
          scorpion.kill()
          bonus += scorpion.bonus
          scorpion.me.events.onInputDown.removeAll()
          @enemies.splice @enemies.indexOf(scorpion), 1
        else if scorpion.health > 1
          scorpion.health -= 1

    @GUIAxes.addAxe(bonus)
    # Sound
    if killed is 2
      setTimeout =>
        if window.plugins?.NativeAudio
          window.plugins.NativeAudio.play('double_kill')
        else
          @dblKillSound.play()
      , 100
    else if killed is 3
      setTimeout =>
        if window.plugins?.NativeAudio
          window.plugins.NativeAudio.play('triple_kill')
        else
          @tripleKillSound.play()
      , 100

  onTimeOut: =>
    @gameOver()

  gameOver: ->
    @result.text = @GUIAxes.getScore()
    @gameOverTextInTween.start()
    @scoreBoardInTween.start()
    @startBtnInTween.start()
    @shareBtnInTween.start()
    @resultInTween.start()
    @scorpionTimer.destroy()
    @fastScorpionTimer.destroy()
    @bossTimer.destroy()
    @game.isOver = true
    $(@game).trigger 'GameOverEvent'

  share_result: ->
    facebookConnectPlugin.getLoginStatus (response) =>
      @debug 'login status', response
      if response.status is 'connected'
        @debug 'logged in'
        facebookConnectPlugin.api 'me', [], (response) =>
          @debug 'me', response

          name = response.name

          Util.resize @game.canvas.toDataURL(), 320, 568, (resizedDataURL) =>
            $.post 'http://larvafun.com/upload.php', {data: resizedDataURL}, (data) =>
              @debug data
              url = 'http://larvafun.com/' + data.url

              dialogOptions =
                method: 'feed'
                link: 'http://scorpion-smasher.larvafun.com'
                picture: url
                name: name + ' has killed ' + @GUIAxes.getScore() + ' scorpions.' #'Test Post'
                caption: 'Posted from the ScorpionSmasher.'
                description: 'Visit http://scorpion-smasher.larvafun.com for more information.'

              try 
                facebookConnectPlugin.showDialog dialogOptions
              catch error
                FB.ui dialogOptions


      else
        facebookConnectPlugin.login ["public_profile"], (response) =>
          @debug response
        , (response) =>
          @debug 'failed', response

  update: ->
    @GUIAxes.update()
    @GUIClock.update()
    for scorpion in @enemies
      scorpion.update()

  pause_game: =>
    return if @game.isOver or @game.paused
    @game.paused = !@game.paused
    $('body').addClass('paused')

module.exports = PlayState
