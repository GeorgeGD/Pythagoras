//level manager
function LevelManager() {

	//private members
	var activeArea = 1;
	var activeLevel = null;
	var nextScene = 0;

	// Preload function
	this.loadData = function() {

		var level = null;
		var servData = null;
		//load level data from our .json file
		Levels = game.cache.getJSON('levelData');

		//communicate with ScoreManager and determine active area
		for(var i=0; i<Levels.length; i++) {

			level = Levels[i];
			servData = GetElementLevelsArray(i+1);
			level.score = servData.score;
			level.status = servData.status;
			scrManager.cumulateReq(level.area, level.difficulty);

			//determine active area
			if(level.status!='locked')
				if (activeArea < level.area) activeArea = level.area;
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
				button = game.add.image(level.btnX+60, level.btnY+60, 'btnLocked');
			}
			else {
				button = game.add.button(level.btnX+60, level.btnY+60, 'btn'+level.difficulty, callPopUp, game, frame+4, frame, frame+8);
				button.hitArea = new Phaser.Circle(0, 0, button.width);
			}
			button.anchor.setTo(0.5);
			button.name = level.label;
			if(level.difficulty!='Boss') button.scale.set(0.7);
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
