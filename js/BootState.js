//Boot state
var BootState = {

	preload: function() {

		//set world and stage settings
		game.stage.backgroundColor = "#000000";
		//game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;

		//load loadingBar files
		game.load.image('bootScreen','assets/loading_mockup.jpg');
		game.load.image('loadingFrame','assets/loading_frame.png');
		game.load.image('loadingFill','assets/loading_fill.png');
		//load json data
		game.load.json('levelData','assets/Levels.json');

		//set game settings here
		game.input.maxPointers = 1;
		game.input.addPointer();
	},

	create: function() {

		//go to 'Preload' state
		game.state.start('Preload');
	},
}

//addGlobalGameResult(_playerID, _score, _level, _gameID);