(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Axe, Logger, Module, config,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

config = require('./config.coffee');

Module = require('./module.coffee');

Logger = require('../mixins/logger.coffee');

Axe = (function(_super) {
  __extends(Axe, _super);

  Axe.include(Logger);

  Axe.prototype.logPrefix = 'Axe';

  Axe.prototype.lifeTime = 4000;

  function Axe(game) {
    this.game = game;
    this.me = this.game.add.sprite(-100, -100, 'axe');
    this.pickupSound = new Phaser.Sound(this.game, 'pickup', 1);
  }

  Axe.prototype.dropFrom = function(x, y) {
    this.game.physics.enable(this.me, Phaser.Physics.ARCADE);
    this.me.x = x;
    this.me.y = y;
    this.me.body.velocity.setTo(0, -350);
    return this.me.body.gravity.set(0, 480);
  };

  Axe.prototype.flyTo = function(x, y, callback) {
    var _ref;
    if ((_ref = window.plugins) != null ? _ref.NativeAudio : void 0) {
      window.plugins.NativeAudio.play('pickup');
    } else {
      this.pickupSound.play();
    }
    this.me.body.gravity.set(0, 0);
    this.flyTween = this.game.tweens.create(this.me).to({
      x: x,
      y: y
    }, 1000, Phaser.Easing.Cubic.Out);
    this.flyTween.start();
    return this.flyTween.onComplete.add(callback);
  };

  Axe.prototype.isTweening = function() {
    var _ref;
    return (_ref = this.flyTween) != null ? _ref.isRunning : void 0;
  };

  Axe.prototype.disappear = function() {
    return this.me.visible = false;
  };

  Axe.prototype.isVisible = function() {
    return this.me.visible;
  };

  return Axe;

})(Module);

module.exports = Axe;


},{"../mixins/logger.coffee":20,"./config.coffee":4,"./module.coffee":10}],2:[function(require,module,exports){
var Boss, Scorpion,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Scorpion = require('./scorpion.coffee');

Boss = (function(_super) {
  __extends(Boss, _super);

  function Boss() {
    return Boss.__super__.constructor.apply(this, arguments);
  }

  Boss.prototype.runFrames = Phaser.Animation.generateFrameNames('b', 1, 5, '.png', 0);

  Boss.prototype.dieFrames = ['b6.png'];

  Boss.prototype.speed = 5;

  Boss.prototype.bonus = 5;

  Boss.prototype.health = 3;

  return Boss;

})(Scorpion);

module.exports = Boss;


},{"./scorpion.coffee":13}],3:[function(require,module,exports){
var Button, config,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

config = require('./config.coffee');

Button = (function(_super) {
  __extends(Button, _super);

  function Button(game, x, y, key, callback) {
    this.onInputUpListener = __bind(this.onInputUpListener, this);
    Button.__super__.constructor.call(this, game, x, y, key, callback);
    this.clickSound = new Phaser.Sound(game, 'click', 1);
    this.onInputUp.add(this.onInputUpListener);
  }

  Button.prototype.onInputUpListener = function() {
    var _ref;
    if ((_ref = window.plugins) != null ? _ref.NativeAudio : void 0) {
      return window.plugins.NativeAudio.play('click');
    } else {
      return this.clickSound.play();
    }
  };

  return Button;

})(Phaser.Button);

module.exports = Button;


},{"./config.coffee":4}],4:[function(require,module,exports){
var API_URL, MEDIA_URL;

API_URL = 'http://putainmedia.ngrok.com';

MEDIA_URL = 'https://putainstatic.ngrok.com';

module.exports = {
  upload_url: API_URL + '/file/public_upload',
  media_url: MEDIA_URL,
  width: 640,
  height: 1136,
  stage: {
    backgroundColor: 0x000000
  },
  boot: {
    images: {
      loading: {
        src: 'assets/img/loading.png'
      }
    }
  },
  images: {
    background: {
      src: 'assets/img/bg.png'
    },
    ground: {
      src: 'assets/img/ground.png'
    },
    logo: {
      src: 'assets/img/logo2.png'
    },
    start_btn: {
      src: 'assets/img/start_btn.png'
    },
    exit_btn: {
      src: 'assets/img/share_btn.png'
    },
    score_board: {
      src: 'assets/img/score_board.png'
    },
    game_over: {
      src: 'assets/img/game_over2.png'
    },
    axe: {
      src: 'assets/img/axe.png'
    },
    pause_btn: {
      src: 'assets/img/pause_button.png'
    }
  },
  sprites: {
    red_duck: {
      src: 'assets/img/enemy1.png',
      width: 79,
      height: 96,
      frames: 5
    },
    green_duck: {
      src: 'assets/img/enemy2.png',
      width: 79,
      height: 96,
      frames: 5
    },
    cloud: {
      src: 'assets/img/cloud2.png',
      width: 64,
      height: 96,
      frames: 2
    }
  },
  atlasXML: {
    scorpion: {
      src: 'assets/atlasXML/scorpion.png',
      xml: 'assets/atlasXML/scorpion.xml'
    }
  },
  bitmap_fonts: {
    '8bit_wonder': {
      src: 'assets/font/8bit_wonder/font.png',
      map: 'assets/font/8bit_wonder/font.xml'
    }
  },
  sounds: {
    intro: {
      src: 'assets/sound/intro.ogg',
      src_mp3: 'assets/sound/intro.mp3'
    },
    click: {
      src: 'assets/sound/click.ogg',
      src_mp3: 'assets/sound/click.mp3'
    },
    pickup: {
      src: 'assets/sound/pickup.ogg',
      src_mp3: 'assets/sound/pickup.mp3'
    },
    die: {
      src: 'assets/sound/die.mp3'
    },
    double_kill: {
      src: 'assets/sound/double_kill.ogg',
      src_mp3: 'assets/sound/double_kill.mp3'
    },
    triple_kill: {
      src: 'assets/sound/triple_kill.ogg',
      src_mp3: 'assets/sound/triple_kill.mp3'
    },
    cockroach: {
      src: 'assets/sound/cockroach.mp3'
    }
  }
};


},{}],5:[function(require,module,exports){
var GreenDuck, HEIGHT, JUMP_HEIGHT, LEFT_DIRECTION, Logger, Module, RIGHT_DIRECTION, WIDTH,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Module = require('./module.coffee');

Logger = require('../mixins/logger.coffee');

WIDTH = 79;

HEIGHT = 96;

LEFT_DIRECTION = 0;

RIGHT_DIRECTION = 1;

JUMP_HEIGHT = 320;

GreenDuck = (function(_super) {
  __extends(GreenDuck, _super);

  GreenDuck.include(Logger);

  GreenDuck.prototype.logPrefix = 'Duck';

  GreenDuck.prototype.sprite = 'green_duck';

  function GreenDuck(game) {
    this.game = game;
    this.me = this.game.add.sprite(0, game.world.height - HEIGHT - Math.random() * JUMP_HEIGHT, this.sprite);
    this.me.animations.add('leftfly', [2, 3], 6, true);
    this.me.animations.add('rightfly', [0, 1], 6, true);
    this.me.animations.add('die', [4], 6, false);
    this.me.animations.play('rightfly');
    this.game.physics.enable(this.me, Phaser.Physics.ARCADE);
    this.me.body.velocity.setTo(100, -350);
    this.me.body.collideWorldBounds = true;
    this.me.body.bounce.set(1);
    this.me.body.gravity.set(0, 280);
    this.dieSound = new Phaser.Sound(this.game, 'chicken_die', 1);
  }

  GreenDuck.prototype.kill = function() {
    var _ref;
    if ((_ref = window.plugins) != null ? _ref.NativeAudio : void 0) {
      window.plugins.NativeAudio.play('chicken_die');
    } else {
      this.dieSound.play();
    }
    this.me.animations.play('die');
    this.me.body.collideWorldBounds = false;
    this.me.body.velocity.setTo(0, 350);
    this.me.body.bounce.set(0);
    this.died = true;
    return setTimeout((function(_this) {
      return function() {
        return _this.me.destroy();
      };
    })(this), 2000);
  };

  GreenDuck.prototype.update = function() {
    if (this.died) {
      return;
    }
    if (this.me.deltaX > 0) {
      this.me.animations.play('rightfly');
    } else {
      this.me.animations.play('leftfly');
    }
    if (this.me.body.bottom === this.game.world.height) {
      return this.me.body.velocity.setTo(this.me.body.velocity.x, -350);
    }
  };

  return GreenDuck;

})(Module);

module.exports = GreenDuck;


},{"../mixins/logger.coffee":20,"./module.coffee":10}],6:[function(require,module,exports){
var FastScorpion, Scorpion,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Scorpion = require('./scorpion.coffee');

FastScorpion = (function(_super) {
  __extends(FastScorpion, _super);

  function FastScorpion() {
    return FastScorpion.__super__.constructor.apply(this, arguments);
  }

  FastScorpion.prototype.runFrames = Phaser.Animation.generateFrameNames('x', 1, 5, '.png', 0);

  FastScorpion.prototype.dieFrames = ['x6.png'];

  FastScorpion.prototype.speed = 5;

  return FastScorpion;

})(Scorpion);

module.exports = FastScorpion;


},{"./scorpion.coffee":13}],7:[function(require,module,exports){
var Axe, GUIAxes, Logger, Module,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Module = require('../module.coffee');

Logger = require('../../mixins/logger.coffee');

Axe = require('../axe.coffee');

GUIAxes = (function(_super) {
  __extends(GUIAxes, _super);

  GUIAxes.include(Logger);

  GUIAxes.prototype.logPrefix = 'GUIAxes';

  GUIAxes.prototype.axes = 0;

  function GUIAxes(game) {
    this.onGameOver = __bind(this.onGameOver, this);
    this.game = game;
    this.me = this.game.add.group();
    this.score = new Phaser.BitmapText(this.game, 120, 10, '8bit_wonder', '' + this.axes, 40);
    this.score.updateText();
    this.score.x = 123 - this.score.textWidth;
    this.axe = new Phaser.Image(this.game, 128, 0, 'axe');
    this.me.add(this.score);
    this.me.add(this.axe);
    this.me.x = this.game.width - 64 * 3 - 50;
    this.me.y = 50;
    $(this.game).on('GameOverEvent', this.onGameOver);
  }

  GUIAxes.prototype.onGameOver = function() {
    return this.game.isUsingAxes = false;
  };

  GUIAxes.prototype.getScore = function() {
    return this.axes;
  };

  GUIAxes.prototype.addAxe = function(num) {
    return this.axes += num;
  };

  GUIAxes.prototype.update = function() {
    this.score.text = '' + this.axes;
    return this.score.x = 123 - this.score.width;
  };

  GUIAxes.prototype.reset = function() {
    return this.axes = 0;
  };

  return GUIAxes;

})(Module);

module.exports = GUIAxes;


},{"../../mixins/logger.coffee":20,"../axe.coffee":1,"../module.coffee":10}],8:[function(require,module,exports){
var GUIClock, Logger, Module,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Module = require('../module.coffee');

Logger = require('../../mixins/logger.coffee');

GUIClock = (function(_super) {
  __extends(GUIClock, _super);

  GUIClock.include(Logger);

  GUIClock.prototype.logPrefix = 'GUIClock';

  GUIClock.prototype.seconds = 5;

  function GUIClock(game) {
    this.updateTime = __bind(this.updateTime, this);
    this.game = game;
    this.me = this.game.add.group();
    this.time = new Phaser.BitmapText(this.game, 0, 10, '8bit_wonder', '' + this.getTime(), 40);
    this.me.add(this.time);
    this.me.x = this.game.world.centerX;
    this.me.y = 50;
    this.timer = this.game.time.create(false);
    this.timer.loop(1000, this.updateTime, this);
    this.timer.start();
  }

  GUIClock.prototype.updateTime = function() {
    if (!this.game.isOver) {
      this.seconds--;
      if (this.seconds < 0) {
        return $(this).trigger('Time.Out');
      }
    }
  };

  GUIClock.prototype.getTime = function() {
    var minutes, seconds;
    minutes = Math.floor(this.seconds / 60);
    seconds = this.seconds % 60;
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    if (seconds < 10) {
      seconds = '0' + seconds;
    }
    return minutes + ':' + seconds;
  };

  GUIClock.prototype.getSeconds = function() {
    return this.seconds;
  };

  GUIClock.prototype.reset = function() {
    return this.seconds = 30;
  };

  GUIClock.prototype.update = function() {
    if (!this.game.isOver) {
      this.time.text = this.getTime();
      return this.me.x = this.game.world.centerX - this.time.width / 2;
    } else {
      return this.me.visible = false;
    }
  };

  return GUIClock;

})(Module);

module.exports = GUIClock;


},{"../../mixins/logger.coffee":20,"../module.coffee":10}],9:[function(require,module,exports){
var Button, GUIPauseButton,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Button = require('../button.coffee');

GUIPauseButton = (function(_super) {
  __extends(GUIPauseButton, _super);

  function GUIPauseButton(game) {
    this.onClick = __bind(this.onClick, this);
    GUIPauseButton.__super__.constructor.call(this, game, 51, 56, 'pause_btn', this.onClick);
    this.game.add.group().add(this);
  }

  GUIPauseButton.prototype.onClick = function() {
    console.log('pause btn clicked');
    if (this.game.isOver) {
      return;
    }
    return $(this.game).trigger('PausedEvent');
  };

  return GUIPauseButton;

})(Button);

module.exports = GUIPauseButton;


},{"../button.coffee":3}],10:[function(require,module,exports){
var Module, moduleKeywords,
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

moduleKeywords = ['extended', 'included'];

Module = (function() {
  function Module() {}

  Module.extend = function(obj) {
    var key, value, _ref;
    for (key in obj) {
      value = obj[key];
      if (__indexOf.call(moduleKeywords, key) < 0) {
        this[key] = value;
      }
    }
    if ((_ref = obj.extended) != null) {
      _ref.apply(this);
    }
    return this;
  };

  Module.include = function(obj) {
    var key, value, _ref;
    for (key in obj) {
      value = obj[key];
      if (__indexOf.call(moduleKeywords, key) < 0) {
        this.prototype[key] = value;
      }
    }
    if ((_ref = obj.included) != null) {
      _ref.apply(this);
    }
    return this;
  };

  return Module;

})();

module.exports = Module;


},{}],11:[function(require,module,exports){
var HEIGHT, Logger, Module, Platform, WIDTH,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Module = require('./module.coffee');

Logger = require('../mixins/logger.coffee');

WIDTH = 1136;

HEIGHT = 71;

Platform = (function(_super) {
  __extends(Platform, _super);

  Platform.include(Logger);

  Platform.prototype.logPrefix = 'Platform';

  function Platform(game) {
    this.game = game;
    this.me = this.game.add.sprite(0, this.game.height - HEIGHT, 'ground');
    this.game.physics.enable(this.me, Phaser.Physics.ARCADE);
    this.me.enableBody = true;
    this.me.body.immovable = true;
  }

  return Platform;

})(Module);

module.exports = Platform;


},{"../mixins/logger.coffee":20,"./module.coffee":10}],12:[function(require,module,exports){
var Duck, Logger, RedDuck,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Duck = require('./duck.coffee');

Logger = require('../mixins/logger.coffee');

RedDuck = (function(_super) {
  __extends(RedDuck, _super);

  function RedDuck() {
    return RedDuck.__super__.constructor.apply(this, arguments);
  }

  RedDuck.prototype.logPrefix = 'RedDuck';

  RedDuck.prototype.sprite = 'red_duck';

  return RedDuck;

})(Duck);

module.exports = RedDuck;


},{"../mixins/logger.coffee":20,"./duck.coffee":5}],13:[function(require,module,exports){
var HEIGHT, Logger, Module, Scorpion, Util, WIDTH,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Module = require('./module.coffee');

Logger = require('../mixins/logger.coffee');

Util = require('./util/util.coffee');

WIDTH = 96;

HEIGHT = 108;

Scorpion = (function(_super) {
  __extends(Scorpion, _super);

  Scorpion.include(Logger);

  Scorpion.prototype.logPrefix = 'Scorpion';

  Scorpion.prototype.sprite = 'scorpion';

  Scorpion.prototype.health = 1;

  Scorpion.prototype.points = {
    x: [],
    y: []
  };

  Scorpion.prototype.pi = 0;

  Scorpion.prototype.speed = 2;

  Scorpion.prototype.bonus = 1;

  Scorpion.prototype.runFrames = Phaser.Animation.generateFrameNames('v', 1, 5, '.png', 0);

  Scorpion.prototype.dieFrames = ['v6.png'];

  function Scorpion(game) {
    var i, _i;
    this.game = game;
    this.me = this.game.add.sprite(Util.getRandomInt(0, game.width), 0, this.sprite);
    this.me.animations.add('run', this.runFrames, 24, true);
    this.me.animations.add('die', this.dieFrames, 0, false);
    this.me.animations.play('run');
    this.me.anchor.set(0.5);
    this.sound = new Phaser.Sound(this.game, 'cockroach', 1);
    this.dieSound = new Phaser.Sound(this.game, 'die', 1);
    for (i = _i = 0; _i <= 4; i = ++_i) {
      this.points.x[i] = game.rnd.between(0, game.width);
      this.points.y[i] = game.height / 4 * i;
    }
    this.plotPath();
    this.sound.play();
  }

  Scorpion.prototype.plotPath = function() {
    var i, ix, node, px, py, x, _results;
    this.path = [];
    ix = 0;
    x = this.speed / this.game.height;
    i = 0;
    _results = [];
    while (!(i > 1)) {
      px = this.game.math.catmullRomInterpolation(this.points.x, i);
      py = this.game.math.catmullRomInterpolation(this.points.y, i);
      node = {
        x: px,
        y: py,
        angle: 0
      };
      if (ix > 0) {
        node.angle = this.game.math.angleBetweenPoints(this.path[ix - 1], node);
      }
      node.angle += 90;
      this.path.push(node);
      ix++;
      _results.push(i += x);
    }
    return _results;
  };

  Scorpion.prototype.kill = function() {
    var _ref;
    if ((_ref = window.plugins) != null ? _ref.NativeAudio : void 0) {
      window.plugins.NativeAudio.play('die');
    } else {
      this.sound.stop();
      this.dieSound.play();
    }
    this.me.animations.play('die');
    this.died = true;
    setTimeout((function(_this) {
      return function() {
        return _this.me.destroy();
      };
    })(this), 2000);
    return this.bonus;
  };

  Scorpion.prototype.isKilled = function() {
    return this.died === true;
  };

  Scorpion.prototype.update = function() {
    if (this.died) {
      return;
    }
    this.me.y = this.path[this.pi].y;
    this.me.x = this.path[this.pi].x;
    this.me.rotation = this.path[this.pi].angle;
    this.pi++;
    if (this.pi >= this.path.length) {
      this.me.destroy();
      return this.died = true;
    }
  };

  return Scorpion;

})(Module);

module.exports = Scorpion;


},{"../mixins/logger.coffee":20,"./module.coffee":10,"./util/util.coffee":18}],14:[function(require,module,exports){
var BootState, Logger, Module, config,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

config = require('../config.coffee');

Logger = require('../../mixins/logger.coffee');

Module = require('../module.coffee');

BootState = (function(_super) {
  __extends(BootState, _super);

  BootState.include(Logger);

  BootState.prototype.logPrefix = 'BootState';

  function BootState(game) {}

  BootState.prototype.preload = function() {
    var image, imageName, _ref, _results;
    this.game.stage = $.extend(this.game.stage, config.stage);
    _ref = config.boot.images;
    _results = [];
    for (imageName in _ref) {
      image = _ref[imageName];
      _results.push(this.game.load.image(imageName, image.src));
    }
    return _results;
  };

  BootState.prototype.create = function() {
    return this.game.state.start('load');
  };

  return BootState;

})(Module);

module.exports = BootState;


},{"../../mixins/logger.coffee":20,"../config.coffee":4,"../module.coffee":10}],15:[function(require,module,exports){
var LoadState, Logger, Module, config,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

config = require('../config.coffee');

Logger = require('../../mixins/logger.coffee');

Module = require('../module.coffee');

LoadState = (function(_super) {
  __extends(LoadState, _super);

  LoadState.include(Logger);

  LoadState.prototype.logPrefix = 'LoadState';

  function LoadState(game) {}

  LoadState.prototype.preload = function() {
    var atlas, atlasName, font, fontName, image, imageName, sound, soundName, sprite, spriteName, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _results;
    this.loading_sprite = this.game.add.sprite(142, this.game.height / 2, 'loading');
    this.game.load.setPreloadSprite(this.loading_sprite);
    _ref = config.images;
    for (imageName in _ref) {
      image = _ref[imageName];
      this.game.load.image(imageName, image.src);
    }
    _ref1 = config.sprites;
    for (spriteName in _ref1) {
      sprite = _ref1[spriteName];
      this.game.load.spritesheet(spriteName, sprite.src, sprite.width, sprite.height, sprite.frames);
    }
    _ref2 = config.bitmap_fonts;
    for (fontName in _ref2) {
      font = _ref2[fontName];
      this.game.load.bitmapFont(fontName, font.src, font.map);
    }
    _ref3 = config.atlasXML;
    for (atlasName in _ref3) {
      atlas = _ref3[atlasName];
      this.game.load.atlasXML(atlasName, atlas.src, atlas.xml);
    }
    _ref4 = config.sounds;
    _results = [];
    for (soundName in _ref4) {
      sound = _ref4[soundName];
      this.game.load.audio(soundName, sound.src);
      if ((_ref5 = window.plugins) != null ? _ref5.NativeAudio : void 0) {
        if (soundName === 'intro') {
          _results.push(window.plugins.NativeAudio.preloadComplex(soundName, sound.src_mp3, 0.2, 1, 0, function(msg) {
            return console.log("Finish loading " + soundName);
          }, function(msg) {
            return console.log(msg);
          }));
        } else {
          _results.push(window.plugins.NativeAudio.preloadSimple(soundName, sound.src_mp3, function(msg) {
            return console.log(msg);
          }, function(error) {
            return console.log(error);
          }));
        }
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  LoadState.prototype.create = function() {
    return this.game.state.start('menu');
  };

  return LoadState;

})(Module);

module.exports = LoadState;


},{"../../mixins/logger.coffee":20,"../config.coffee":4,"../module.coffee":10}],16:[function(require,module,exports){
var Button, LOGO_HEIGHT, LOGO_WIDTH, Logger, MenuState, Module, Platform, RedDuck, START_BTN_WIDTH, config,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

config = require('../config.coffee');

RedDuck = require('../red_duck.coffee');

Platform = require('../platform.coffee');

Logger = require('../../mixins/logger.coffee');

Module = require('../module.coffee');

Button = require('../button.coffee');

LOGO_WIDTH = 368;

LOGO_HEIGHT = 144;

START_BTN_WIDTH = 212;

MenuState = (function(_super) {
  __extends(MenuState, _super);

  MenuState.include(Logger);

  MenuState.prototype.logPrefix = 'MenuState';

  function MenuState(game) {
    this.onStartBtnClickListener = __bind(this.onStartBtnClickListener, this);
    this.onMediaStatusChange = __bind(this.onMediaStatusChange, this);
  }

  MenuState.prototype.preload = function() {};

  MenuState.prototype.create = function() {
    this.game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
    this.game.scale.setScreenSize(true);
    this.game.add.sprite(0, 0, 'background');
    this.GUI = this.game.add.group();
    this.logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY - 100, 'logo');
    this.logo.anchor.setTo(0.5, 0.5);
    this.game.add.tween(this.logo).to({
      y: this.game.world.centerY - 150
    }, 1000, Phaser.Easing.Cubic.InOut, true, 0, Number.MAX_VALUE, true);
    this.startBtn = new Button(this.game, this.game.world.centerX, this.game.world.centerY, 'start_btn', this.onStartBtnClickListener);
    this.startBtn.anchor.setTo(0.5, 0.5);
    this.GUI.add(this.logo);
    this.GUI.add(this.startBtn);
    return this.debug(this.startBtn);
  };

  MenuState.prototype.onMediaStatusChange = function(status) {
    if (status === Media.MEDIA_STOPPED) {
      return this._introAudio.play();
    }
  };

  MenuState.prototype.onStartBtnClickListener = function() {
    this.debug('start btn click listener');
    return this.game.state.start('play');
  };

  MenuState.prototype.update = function() {};

  return MenuState;

})(Module);

module.exports = MenuState;


},{"../../mixins/logger.coffee":20,"../button.coffee":3,"../config.coffee":4,"../module.coffee":10,"../platform.coffee":11,"../red_duck.coffee":12}],17:[function(require,module,exports){
var Axe, Boss, Button, FastScorpion, GUIAxes, GUIClock, GUIPauseButton, Logger, Module, PlayState, Scorpion, Util, config,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

config = require('../config.coffee');

Logger = require('../../mixins/logger.coffee');

Scorpion = require('../scorpion.coffee');

FastScorpion = require('../fast_scorpion.coffee');

Boss = require('../boss.coffee');

Axe = require('../axe.coffee');

Module = require('../module.coffee');

Button = require('../button.coffee');

Util = require('../util/util.coffee');

GUIAxes = require('../gui/axes.coffee');

GUIClock = require('../gui/clock.coffee');

GUIPauseButton = require('../gui/pause_btn.coffee');

PlayState = (function(_super) {
  __extends(PlayState, _super);

  PlayState.include(Logger);

  PlayState.prototype.logPrefix = 'PlayState';

  function PlayState(game) {
    this.pause_game = __bind(this.pause_game, this);
    this.onTimeOut = __bind(this.onTimeOut, this);
    this.onShareBtnClickListener = __bind(this.onShareBtnClickListener, this);
    this.onStartBtnClickListener = __bind(this.onStartBtnClickListener, this);
    this.onResumeBtnClicked = __bind(this.onResumeBtnClicked, this);
  }

  PlayState.prototype.preload = function() {};

  PlayState.prototype.create = function() {
    var pause_btn;
    this.game.add.sprite(0, 0, 'background');
    this.enemiesLayer = this.game.add.group();
    this.enemiesLayer.z = 5;
    this.enemies = [];
    this.axe = new Axe(this.game);
    this.scorpionTimer = this.game.time.create(false);
    this.scorpionTimer.loop(1000, ((function(_this) {
      return function() {
        return _this.addScorpion();
      };
    })(this)), this);
    this.scorpionTimer.start();
    this.fastScorpionTimer = this.game.time.create(false);
    this.fastScorpionTimer.loop(2000, ((function(_this) {
      return function() {
        return _this.addScorpion('fast');
      };
    })(this)), this);
    this.fastScorpionTimer.start();
    this.bossTimer = this.game.time.create(false);
    this.bossTimer.loop(3000, ((function(_this) {
      return function() {
        return _this.addScorpion('boss');
      };
    })(this)), this);
    this.bossTimer.start();
    this.addScorpion();
    this.GUIAxes = new GUIAxes(this.game);
    this.GUIClock = new GUIClock(this.game);
    this.GUIGameOver = this.game.add.group();
    this.gameOverText = new Phaser.Sprite(this.game, this.game.world.centerX, -400, 'game_over');
    this.gameOverText.anchor.setTo(0.5, 0.5);
    this.gameOverTextInTween = this.game.tweens.create(this.gameOverText).to({
      y: 120
    }, 1000, Phaser.Easing.Cubic.Out);
    this.gameOverTextOutTween = this.game.tweens.create(this.gameOverText).to({
      y: -120
    }, 1000, Phaser.Easing.Cubic.Out);
    this.scoreBoard = new Phaser.Sprite(this.game, this.game.world.centerX, -500, 'score_board');
    this.scoreBoard.anchor.setTo(0.5, 0.5);
    this.scoreBoardInTween = this.game.tweens.create(this.scoreBoard).to({
      y: 300
    }, 1000, Phaser.Easing.Cubic.Out);
    this.scoreBoardOutTween = this.game.tweens.create(this.scoreBoard).to({
      y: -200
    }, 1000, Phaser.Easing.Cubic.Out);
    this.result = new Phaser.BitmapText(this.game, this.game.world.centerX, -100, '8bit_wonder', '', 60);
    this.resultInTween = this.game.tweens.create(this.result).to({
      y: this.game.world.centerY - 300
    }, 1000, Phaser.Easing.Cubic.Out);
    this.resultOutTween = this.game.tweens.create(this.result).to({
      y: -100
    }, 1000, Phaser.Easing.Cubic.Out);
    this.startBtn = new Button(this.game, -200, 450, 'start_btn', this.onStartBtnClickListener);
    this.startBtn.anchor.setTo(1, 0);
    this.startBtnInTween = this.game.tweens.create(this.startBtn).to({
      x: this.game.world.centerX - 20
    }, 1000, Phaser.Easing.Cubic.Out);
    this.shareBtn = new Button(this.game, this.game.width + 200, 450, 'exit_btn', this.onShareBtnClickListener);
    this.shareBtnInTween = this.game.tweens.create(this.shareBtn).to({
      x: this.game.world.centerX + 20
    }, 1000, Phaser.Easing.Cubic.Out);
    this.GUIGameOver.z = 100;
    this.GUIGameOver.y = 200;
    this.GUIGameOver.add(this.gameOverText);
    this.GUIGameOver.add(this.scoreBoard);
    this.GUIGameOver.add(this.startBtn);
    this.GUIGameOver.add(this.shareBtn);
    this.GUIGameOver.add(this.result);
    this.dblKillSound = new Phaser.Sound(this.game, 'double_kill', 1);
    this.tripleKillSound = new Phaser.Sound(this.game, 'triple_kill', 1);
    pause_btn = new GUIPauseButton(this.game);
    $('.resume-btn').on('click', this.onResumeBtnClicked);
    $(this.game).on('PausedEvent', this.pause_game);
    $(this.GUIClock).on('Time.Out', this.onTimeOut);
    return document.addEventListener('pause', this.pause_game, false);
  };

  PlayState.prototype.onResumeBtnClicked = function() {
    this.game.paused = false;
    return $('body').removeClass('paused');
  };

  PlayState.prototype.reset = function() {
    this.GUIClock.reset();
    return this.game.isOver = false;
  };

  PlayState.prototype.onStartBtnClickListener = function() {
    this.reset();
    return this.game.state.restart('play');
  };

  PlayState.prototype.onShareBtnClickListener = function() {
    return this.share_result();
  };

  PlayState.prototype.addScorpion = function(type) {
    var scorpion;
    if (type == null) {
      type = 'normal';
    }
    if (this.game.paused) {
      return;
    }
    scorpion = (function() {
      switch (type) {
        case 'normal':
          return new Scorpion(this.game);
        case 'fast':
          return new FastScorpion(this.game);
        case 'boss':
          return new Boss(this.game);
      }
    }).call(this);
    scorpion.me.inputEnabled = true;
    this.enemiesLayer.add(scorpion.me);
    scorpion.me.events.onInputDown.add((function(_this) {
      return function() {
        return _this.handleScorpionClickEvent(scorpion);
      };
    })(this));
    return this.enemies.push(scorpion);
  };

  PlayState.prototype.handleScorpionClickEvent = function(scorpion) {
    var bonus, i, killed, x, y;
    if (this.game.isOver) {
      return;
    }
    x = this.game.input.position.x;
    y = this.game.input.position.y;
    i = this.enemies.length;
    killed = 0;
    bonus = 0;
    while (i--) {
      scorpion = this.enemies[i];
      if (Phaser.Rectangle.contains(scorpion.me.getBounds(), x, y) && !scorpion.isKilled()) {
        if (scorpion.health === 1) {
          killed += 1;
          scorpion.kill();
          bonus += scorpion.bonus;
          scorpion.me.events.onInputDown.removeAll();
          this.enemies.splice(this.enemies.indexOf(scorpion), 1);
        } else if (scorpion.health > 1) {
          scorpion.health -= 1;
        }
      }
    }
    this.GUIAxes.addAxe(bonus);
    if (killed === 2) {
      return setTimeout((function(_this) {
        return function() {
          var _ref;
          if ((_ref = window.plugins) != null ? _ref.NativeAudio : void 0) {
            return window.plugins.NativeAudio.play('double_kill');
          } else {
            return _this.dblKillSound.play();
          }
        };
      })(this), 100);
    } else if (killed === 3) {
      return setTimeout((function(_this) {
        return function() {
          var _ref;
          if ((_ref = window.plugins) != null ? _ref.NativeAudio : void 0) {
            return window.plugins.NativeAudio.play('triple_kill');
          } else {
            return _this.tripleKillSound.play();
          }
        };
      })(this), 100);
    }
  };

  PlayState.prototype.onTimeOut = function() {
    return this.gameOver();
  };

  PlayState.prototype.gameOver = function() {
    this.result.text = this.GUIAxes.getScore();
    this.gameOverTextInTween.start();
    this.scoreBoardInTween.start();
    this.startBtnInTween.start();
    this.shareBtnInTween.start();
    this.resultInTween.start();
    this.scorpionTimer.destroy();
    this.game.isOver = true;
    return $(this.game).trigger('GameOverEvent');
  };

  PlayState.prototype.share_result = function() {
    return facebookConnectPlugin.getLoginStatus((function(_this) {
      return function(response) {
        _this.debug('login status', response);
        if (response.status === 'connected') {
          _this.debug('logged in');
          return facebookConnectPlugin.api('me', [], function(response) {
            var name;
            _this.debug('me', response);
            name = response.name;
            return Util.resize(_this.game.canvas.toDataURL(), 568, 320, function(resizedDataURL) {
              return $.post('http://larvafun.com/upload.php', {
                data: resizedDataURL
              }, function(data) {
                var dialogOptions, error, url;
                _this.debug(data);
                url = 'http://larvafun.com/' + data.url;
                dialogOptions = {
                  method: 'feed',
                  link: 'http://larvafun.com',
                  picture: url,
                  name: name + ' survived for ' + _this.GUIClock.getSeconds() + ' seconds.',
                  caption: 'Posted from the LarvaGame.',
                  description: 'Visit http://larvafun.com for more information.'
                };
                try {
                  return facebookConnectPlugin.showDialog(dialogOptions);
                } catch (_error) {
                  error = _error;
                  return FB.ui(dialogOptions);
                }
              });
            });
          });
        } else {
          return facebookConnectPlugin.login(["public_profile"], function(response) {
            return _this.debug(response);
          }, function(response) {
            return _this.debug('failed', response);
          });
        }
      };
    })(this));
  };

  PlayState.prototype.update = function() {
    var scorpion, _i, _len, _ref, _results;
    this.GUIAxes.update();
    this.GUIClock.update();
    _ref = this.enemies;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      scorpion = _ref[_i];
      _results.push(scorpion.update());
    }
    return _results;
  };

  PlayState.prototype.pause_game = function() {
    if (this.game.isOver || this.game.paused) {
      return;
    }
    this.game.paused = !this.game.paused;
    return $('body').addClass('paused');
  };

  return PlayState;

})(Module);

module.exports = PlayState;


},{"../../mixins/logger.coffee":20,"../axe.coffee":1,"../boss.coffee":2,"../button.coffee":3,"../config.coffee":4,"../fast_scorpion.coffee":6,"../gui/axes.coffee":7,"../gui/clock.coffee":8,"../gui/pause_btn.coffee":9,"../module.coffee":10,"../scorpion.coffee":13,"../util/util.coffee":18}],18:[function(require,module,exports){
var Util;

Util = {
  resize: function(input, w, h, callback) {
    var canvas, sourceImage;
    canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    if (typeof input === "string") {
      sourceImage = new Image();
      sourceImage.onload = function() {
        canvas.getContext('2d').drawImage(sourceImage, 0, 0, w, h);
        return callback(canvas.toDataURL());
      };
      return sourceImage.src = input;
    }
  },
  getRandomInt: function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
};

module.exports = Util;


},{}],19:[function(require,module,exports){
var APP_VERSION, BootState, LoadState, MenuState, PlayState, config, init;

PlayState = require('./lib/states/play_state.coffee');

MenuState = require('./lib/states/menu_state.coffee');

LoadState = require('./lib/states/load_state.coffee');

BootState = require('./lib/states/boot_state.coffee');

config = require('./lib/config.coffee');

APP_VERSION = '1.0';

init = function() {
  var adHeight, admobid, makeGame, updateCallback, _ref, _ref1;
  makeGame = function() {
    var game;
    game = new Phaser.Game(config.width, config.height, Phaser.CANVAS);
    game.state.add('boot', BootState, true);
    game.state.add('load', LoadState);
    game.state.add('menu', MenuState);
    return game.state.add('play', PlayState);
  };
  adHeight = 30;
  if (/(android)/i.test(navigator.userAgent)) {
    admobid = {
      banner: 'ca-app-pub-1445461785188374/4195071643',
      interstitial: 'ca-app-pub-1445461785188374/5671804847'
    };
  } else if (/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
    admobid = {
      banner: 'ca-app-pub-1445461785188374/7140681643',
      interstitial: 'ca-app-pub-1445461785188374/4334672441'
    };
    if (screen.width / screen.height === 1.5) {
      adHeight = 100;
    }
  }
  if (typeof AdMob !== "undefined" && AdMob !== null) {
    AdMob.createBanner({
      adId: admobid.banner,
      adSize: 'SMART_BANNER',
      position: AdMob.AD_POSITION.BOTTOM_CENTER,
      overlap: true,
      autoShow: true
    });
  }
  updateCallback = function(data) {
    if (/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
      return typeof cordova !== "undefined" && cordova !== null ? cordova.exec(null, null, 'Browser', 'open', [data.ios_url]) : void 0;
    }
  };
  $.post('http://larvafun.com/info.php', function(data) {
    var _ref;
    if (data.version !== APP_VERSION) {
      return (_ref = navigator.notification) != null ? _ref.alert("Thank you for playing LarvaGame. There's an update available.", (function() {
        return updateCallback(data);
      }), "Update available", "Update now") : void 0;
    }
  });
  window.fbAsyncInit = function() {
    FB.init({
      appId: '798481556936996',
      xfbml: true,
      version: 'v2.0'
    });
    if (typeof cordova === "undefined" || cordova === null) {
      window.facebookConnectPlugin = FB;
    }
    if (!/android/i.test(navigator.userAgent)) {
      return makeGame();
    } else {
      if (typeof admob !== "undefined" && admob !== null) {
        admob.createBannerView({
          publisherId: admobid.banner
        });
        return document.addEventListener(admob.events.onAdLoaded, function() {
          return makeGame();
        });
      }
    }
  };
  if (((_ref = navigator.connection) != null ? _ref.type : void 0) === 'none' || ((_ref1 = navigator.connection) != null ? _ref1.type : void 0) === 'unknown') {
    return makeGame();
  } else {
    return (function(d, s, id) {
      var fjs, js;
      fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      return fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  }
};

if (typeof cordova !== "undefined" && cordova !== null) {
  $(document).on('deviceready', init);
} else {
  $(document).ready(init);
}


},{"./lib/config.coffee":4,"./lib/states/boot_state.coffee":14,"./lib/states/load_state.coffee":15,"./lib/states/menu_state.coffee":16,"./lib/states/play_state.coffee":17}],20:[function(require,module,exports){
var ClassLogger;

ClassLogger = {
  debug: function() {
    return console.debug.apply(console, this._build_msg(arguments));
  },
  info: function() {
    return console.info.apply(console, this._build_msg(arguments));
  },
  warn: function() {
    return console.warn.apply(console, this._build_msg(arguments));
  },
  error: function() {
    return console.error.apply(console, this._build_msg(arguments));
  },
  _build_msg: function(txt) {
    txt = Array.prototype.slice.call(txt, 0);
    if (this.logPrefix != null) {
      txt.splice(0, 0, "[" + this.logPrefix + "]");
    }
    return txt;
  }
};

module.exports = ClassLogger;


},{}]},{},[19]);