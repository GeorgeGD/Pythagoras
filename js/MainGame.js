/*
MainGame state - represents the campaign viewport

Upkeep functions after MainGame
*/
var MainGame = {

	preload: function () {

	},

	create: function () {

		game.world.setBounds(0, 0, 2048, 672);
		game.add.image(0, 0, 'canvas');
		HUDbar = game.add.sprite(0, 0, 'HUD_bar');
		HUDbar.fixedToCamera = true;

		btnMenu = game.add.button(10, 10, 'btnMenu');
		btnMenu.fixedToCamera = true;

		btnLevel1 = game.add.button(233, 192, 'btnEasy', loadLevel);
		btnLevel2 = game.add.button(817, 114, 'btnMedium', loadLevel);
		btnLevel3 = game.add.button(1552, 381, 'btnHard', loadLevel);

		game.input.onDown.add(function() {
			console.log('pointer is down');
			this.lastposX = game.input.activePointer.x;
		}, this);
	},

	update: function () {

		//set camera movement
		pointer = game.input.activePointer;
		if (pointer.isDown) {
			game.camera.x += this.lastposX-pointer.x;
			this.lastposX = pointer.x;
		}
		
	}
};

function loadLevel () {

	game.state.start('ShapesGame');
}


