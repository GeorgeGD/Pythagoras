
var game = new Phaser.Game(1024, 672, Phaser.CANVAS,'');

var MainGame = {

	preload: function () {

		game.load.image('canvas', 'assets/mockups/MainGame.jpg');
	},

	create: function () {

		game.add.image(0, 0, 'canvas');
	},

	update: function () {

	}
};

game.state.add('MainGameState', MainGame);
game.state.add('ShapesState', ShapesGame);
game.state.start('ShapesState');