//level manager
function LevelManager() {

	//private members
	var activeArea = 1;
	var activeLevel = null;
	var nextScene = 0;
	var cameraPos = 0;

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
			level.score = servData.Score;
			level.status = servData.Status;
			scrManager.cumulateNumbers(level);
			//determine active area
			if(level.status!='locked')
				if (activeArea < level.area) activeArea = level.area;
		}
		scrManager.calculateAreas();
	};

	//start level with label
	this.startLevel = function(level) {
		cameraPos = game.camera.position;
		nextScene = 0;
		activeLevel = level;
		
		this.startNextScene();
	};

	//start next scene (state)
	this.startNextScene = function() {
		//check if level is completed
		if(nextScene >= activeLevel.scenario.length) {
			//go to MainGame
			nextScene = 0;
			scrManager.calcLevelScore(activeLevel);
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

	this.unlockNextArea = function() {
		activeArea++;
		for (var i in Levels) {
			if (Levels[i].area == activeArea) {
				Levels[i].status = 'open';
			}
		}
	};

	//getters
	this.getArea = function() {
		return activeArea;
	};
	this.getLevel = function() {
		return activeLevel;
	};
	this.getCameraPos = function() {
		return cameraPos;
	};
};
