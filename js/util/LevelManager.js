//level manager
function LevelManager() {

	//private members
	var Levels = null;
	var activeArea = 1;
	var activeLevel = null;
	var nextScene = 0;

	// Preload function
	this.loadData = function() {

		//load level data from our .json file
		Levels = game.cache.getJSON('levels');

		//determine active area
		for(var i in Levels) {
			scrManager.cumulateReq(Levels[i].area, Levels[i].difficulty);
			if(Levels[i].status!='locked')
				if (activeArea < Levels[i].area) activeArea = Levels[i].area;
		}
	};

	//start level with label
	this.startLevel = function(label) {

		//find the level
		for (var i in Levels) {
			if (Levels[i].label == label) {
				activeLevel = Levels[i];
				break;
			}
		}
		this.startNextScene();
	};

	//start next scene (state)
	this.startNextScene = function() {

		//check if level is completed
		if(nextScene >= activeLevel.scenario.length) {
			//go to MainGame
			nextScene = 0;
			game.state.start('MainGame');
		} 
		else {
			//go to next scene
			game.state.start(activeLevel.scenario[nextScene]);
			console.log(activeLevel.label+"\t"+"Room "+(nextScene+1)+": "+activeLevel.scenario[nextScene]);
			//set next scene
			nextScene++;
		}
	};

	//add level buttons to MainGame
	this.addLevelButtons = function() {

		var button = null;
		var level = null;
		var frame = null;
		for (var i in Levels) {
			//create the button, set its hitArea to a circle and set its name to the level label
			level = Levels[i];
			frame = this.statusToInt(level.status);
			//check if the button is locked
			if (frame==null) {
				button = game.add.image(level.btnX, level.btnY, 'btnLocked');
			}
			else {
				button = game.add.button(level.btnX, level.btnY, 'btn'+level.difficulty, callPopUp, game, frame+4, frame, frame+8);
				button.hitArea = new Phaser.Circle(button.width/2, button.height/2, button.width);
				button.name = level.label;
			}
			button.scale.set(0.7);
		}
	};

	//convert level status to int
	this.statusToInt = function(status) {
		switch(status) {
			case 'open': 	return 0;
			case 'bronze': 	return 1;
			case 'silver': 	return 2;
			case 'gold': 	return 3;
			default: 		return null;
		}
	};

	//Area and level getters
	this.getArea = function() {
		return activeArea;
	}
	this.getLevel = function() {
		return activeLevel;
	}
};
