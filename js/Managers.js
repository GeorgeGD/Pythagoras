function LevelManager() {
	var Levels =  null;
	var currentLevel = null;
	var nextRoom = 0;

	this.loadData = function() {

		//load level data from our .json file
		Levels = game.cache.getJSON('levels');
	};

	this.loadLevel = function(label) {

		//find the level
		for (var i in Levels) {

			if (Levels[i].label == label) {

				currentLevel = Levels[i];
				break;
			}
		}

		this.startNextRoom();
	};

	this.startNextRoom = function() {

		//check if level is completed
		if(nextRoom >= currentLevel.rooms.length) {
			//go to MainGame
			nextRoom = 0;
			game.state.start('MainGame');
		} 
		else {
			//go to next room
			game.state.start(currentLevel.rooms[nextRoom]);
			console.log(currentLevel.label+"\t"+"Room "+(nextRoom+1)+": "+currentLevel.rooms[nextRoom]);

			//set next room
			nextRoom++;
			console.log('nextRoom is: ' + (nextRoom+1));
		}
	};

	this.placeButtons = function() {

		var button = null;
		var level = null;
		for (var i in Levels) {

			//create the button, set its hitArea to a circle and set its name to the level label
			level = Levels[i];
			button = game.add.button(level.btnX, level.btnY, 'btn'+level.difficulty, callPopUp);
			button.hitArea = new Phaser.Circle(button.width/2, button.height/2, button.width);
			button.name = level.label;
		}
	};
}