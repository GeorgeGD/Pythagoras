/*
MainGame state - represents the campaign viewport

Upkeep functions after MainGame
*/
var MainGame = {

	preload: function () {

	},

	create: function () {

		game.add.image(0, 0, 'canvas');
		HUDbar = game.add.sprite(0, 0, 'HUD_bar');
		HUDbar.fixedToCamera = true;

		btnMenu = game.add.button(10, 10, 'btnMenu');
		btnMenu.fixedToCamera = true;

		btnLevel1 = game.add.button(233, 192, 'btnEasy', loadLevel);
		btnLevel2 = game.add.button(817, 114, 'btnMedium', loadLevel);
		btnLevel3 = game.add.button(1552, 381, 'btnHard', loadLevel);
	},

	update: function () {


	}
};

function loadLevel () {

	game.state.start('ShapesGame');
}
