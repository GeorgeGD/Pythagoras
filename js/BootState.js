//Boot state
var BootState = {

	preload: function () {

		//Load game setting here
		game.input.maxPointers = 1;
		game.input.addPointer();

	},

	create: function () {

		//When created, immediately go to 'Preload' state
		game.state.start('Preload');
	},

	update: function () {

	}
}