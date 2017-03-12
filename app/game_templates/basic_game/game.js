if( typeof(assets_path) == 'undefined') { alert("ERROR: missing assets path");}
if( typeof(socket) !== 'undefined') { console.log('no socket, local version'); }

// update
var assets = {}; // list of all assets
var tree = {};   // tree of all updatable game objects

var game;

//  Note that this html file is set to pull down Phaser 2.5.0 from the JS Delivr CDN.
//  Although it will work fine with this tutorial, it's almost certainly not the most current version.
//  Be sure to replace it with an updated version before you start experimenting with adding your own code.

game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser_container', { preload: preload, create: create });

function preload () {

  // load images
  game.load.image('coin', assets_path + 'phaser.png');
  game.load.image('mc', assets_path + 'mc.png');

  // init assets map
  assets['coin'] = 'phaser.png';
  assets['mc'] = 'mc.png';

  // init tree of objects
  tree['coin'] = [];
  tree['mc'] = [];

}

function create () {

  let ship;
  let coin;
  let text;

  ship = game.add.sprite(game.world.centerX, game.world.centerY, 'mc');
  ship.anchor.setTo(0.5, 0.5);
  ship.scale.setTo(0.5, 0.5);
  tree['mc'].push(ship);

  coin = game.add.sprite(game.world.centerX + 150, game.world.centerY, 'coin');
  coin.anchor.setTo(0.5, 0.5);
  coin.scale.setTo(0.1, 0.1);
  tree['coin'].push(coin);

  coin = game.add.sprite(game.world.centerX + 200, game.world.centerY, 'coin');
  coin.anchor.setTo(0.5, 0.5);
  coin.scale.setTo(0.1, 0.1);
  tree['coin'].push(coin);

  //	Progress report
  text = game.add.text(32, 32, 'Click to start load', { fill: '#FFFFFF' });

  //	You can listen for each of these events from Phaser.Loader
  //game.load.onLoadStart.add(loadStart, this);
  game.load.onLoadComplete.add(loadComplete, this);

}

function loadStart() {
  // do nothing...
}

function loadComplete() {

      // update all assets
      for (let prop in tree) {
        for(let i=0; i<tree[prop].length; i++) {
          tree[prop][i].loadTexture(prop,0,true);
        }
        console.log();
      }

}

updateTextures = function() {

  console.log(assets_path);

  for (let tex in assets) {

    // need other updates accordingly... text boxes, etc

    game.load.image(tex, assets_path + 'red_hat.png');  // temp swap with re_hat

  }

  // request a load for all assets..


  // start
  game.load.start();

}
