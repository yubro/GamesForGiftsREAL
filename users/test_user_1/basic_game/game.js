if( typeof(assets_path) == 'undefined') {
  alert("ERROR: missing assets path");
}
var game;
var ship;
var text;

// socket connection
const socket = io();

//  Note that this html file is set to pull down Phaser 2.5.0 from the JS Delivr CDN.
//  Although it will work fine with this tutorial, it's almost certainly not the most current version.
//  Be sure to replace it with an updated version before you start experimenting with adding your own code.

game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser_container', { preload: preload, create: create });

function preload () {

  // load images
  game.load.image('logo', assets_path + 'phaser.png');
  game.load.image('mc', assets_path + 'mc.png');

}

function create () {

  ship = game.add.sprite(game.world.centerX, game.world.centerY, 'mc');
  ship.anchor.setTo(0.5, 0.5);
  ship.scale.setTo(0.5, 0.5);

  //	Progress report
  text = game.add.text(32, 32, 'Click to start load', { fill: '#FFFFFF' });

  //	You can listen for each of these events from Phaser.Loader
  game.load.onLoadStart.add(loadStart, this);
  game.load.onLoadComplete.add(loadComplete, this);

}

function loadStart() {

}

function loadComplete() {
      ship.loadTexture('mc',0,true);
}

swapShipTexture = function() {
  game.load.image('mc', assets_path + 'red_hat.png');
  game.load.start();
}

myFunction = function() {
  // change mc.png file with other file
  swapShipTexture();
}
