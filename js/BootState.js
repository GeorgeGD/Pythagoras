//Boot state
var BootState = {

	preload: function () {

		//Load game setting here
	
	},

	create: function () {

		//When created, immediately go to 'Preload' state
		game.state.start('Preload');
	},

	update: function () {

	}
}