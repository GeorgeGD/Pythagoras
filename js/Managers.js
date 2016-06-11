//level and score managers
function LevelManager() {

	var Levels =  null;
	var activeLevel = null;
	var nextScene = 0;

	this.loadData = function() {

		//load level data from our .json file
		Levels = game.cache.getJSON('levels');
	};

	this.loadLevel = function(label) {

		//find the level
		for (var i in Levels) {
			if (Levels[i].label == label) {
				activeLevel = Levels[i];
				break;
			}
		}
		this.startNextScene();
	};

	this.startNextScene = function() {

		//check if level is completed
		if(nextScene >= activeLevel.scenario.length) {
			//go to MainGame
			nextScene = 0;
			game.state.start('MainGame');
		} 
		else {
			//go to next room
			game.state.start(activeLevel.scenario[nextScene]);
			console.log(activeLevel.label+"\t"+"Room "+(nextScene+1)+": "+activeLevel.scenario[nextScene]);
			//set next room
			nextScene++;
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