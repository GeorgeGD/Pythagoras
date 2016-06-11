//Boot state
var BootState = {

	preload: function () {

		//set world and stage settings
		game.stage.backgroundColor = "#000000";

		//load loadingBar files
		game.load.image('bootScreen','assets/loading_mockup.jpg');
		game.load.image('loadingBar','assets/bar_mockup.jpg');

		//json data
		game.load.json('levels','assets/Levels.json');
		
		//set game settings here
		game.input.maxPointers = 1;
		game.input.addPointer();
	},

	create: function () {
		
		//go to 'Preload' state
		game.state.start('Preload');
	},

	update: function () {

	}
}