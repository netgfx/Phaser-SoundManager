// Copyright © 2015 Michael Dobekidis
// Licensed under the terms of the MIT License
var reg = {};
var GameState = function (_game) {};
var slider;
// Load images and sounds
GameState.prototype.preload = function () {
    // #soundmanager //
    reg.soundManager = new Soundmanager(_game);

    // SOUND MANAGER OBJECT
    // #soundmanager //
    _game.load.onPackComplete.add(reg.soundManager.setupSounds, this);
    _game.load.pack("sounds", "files.json", null, this);

    _game.load.image("menu-sound", "../assets/menuSoundOn.png");
    _game.load.image("menu-sound-off", "../assets/menuSoundOff.png");
};

GameState.prototype.boot = function () {

};

// Setup the example
GameState.prototype.create = function () {
    // #soundmanager //
    reg.soundManager.setupSounds();
  // Set stage background to something sky colored
  _game.stage.backgroundColor = 0x1e1e1e;

  var winButton = this.add.button(_game.width / 2 - 242 / 2, _game.height/2 - 50, 'menu-sound', playSound, this);
  // add sound to a button //
  winButton.setDownSound(reg.soundManager.getSound("click"));

};

function playSound() {
    // play sound as a function //
    //reg.soundManager.playSound("win");
    reg.soundManager.win();
}

var _game = new Phaser.Game(1024, 600, Phaser.CANVAS, 'game');
_game.state.add('game', GameState, true);
