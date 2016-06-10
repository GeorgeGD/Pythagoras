//Boot state
var BootState = {

	preload: function () {

		//Load game setting here
		game.world.setBounds(0, 0, 2048, 672);
	},

	create: function () {

		//When created, immediately go to 'Preload' state
		game.state.start('Preload');
	},

	update: function () {

	}
}