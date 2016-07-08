//score manager
function ScoreManager() {

	const maxEasy 	= 300,
		  maxMedium = 400,
		  maxHard 	= 500,
		  maxBoss	= 1000;

	var totalScore = 0,
		highScore = 0,
		diffScore = 0,
		newScore = 0,
		roomCount = 0,
		prcLevel = 0,
		lifes = maxLifes,
		lvlCompleted = false,
		ingots = new Array();
		areaReq = new Array();

	this.cumulateNumbers = function(level) {
		//calculate area requirements
		var points = 0;
		switch (level.difficulty) {
			case 'Easy': 	points = 1*maxEasy; 	break;
			case 'Medium': 	points = 0.6*maxMedium; break;
			case 'Hard': 	points = 0.3*maxHard; 	break;
			case 'Boss':    points = 0.6*maxBoss;	break;
			default: break;
		}
		if (!areaReq[level.area+1]) areaReq[level.area+1] = 0;
		areaReq[level.area+1] += points;
		//calculate totalScore
		totalScore += level.score;
	};

	this.calculateAreas = function() {
		for (var i=1; i<areaReq.length; i++) {
			if(areaReq[i]) 
				for (var j=1; j<i; j++)	
					if(areaReq[j]) areaReq[i] += areaReq[j];
		}
	};

	this.calcRoomScore = function(prc_score) {
		prc_score = formatPrcScore(prc_score);
		prcLevel += prc_score;
		roomCount++;
		//add ingot reward
		ingots.push(prc_score);
	};

	this.calcLevelScore = function(level) {
		highScore = level.score;
		var points = this.getMaxScore(level.difficulty);
		prcLevel = game.math.roundTo(prcLevel/roomCount,-2);
		newScore = game.math.roundTo(prcLevel*points);
		if(newScore > highScore) {

			//update TotalScore
			diffScore = newScore - highScore;
			totalScore += diffScore;
			highScore = newScore;
		}
		//level completed
		lvlCompleted = true;
		//dynamic Levels update before MainGame start
		//eventually move to MainGame animation
		level.score = highScore;
		if(prcLevel == 1) {
			level.status = 'gold';
			if(lifes<3) lifes++;
		}
		else if(prcLevel >= 0.8) level.status = 'silver';
		else if(prcLevel >= 0.6) level.status = 'bronze';
		lifes--;
		updateElementLevelsArray(Levels.indexOf(level)+1, level.score, level.status);
		//check for next area
		if(totalScore>=areaReq[lvlManager.getArea()+1]) {
			lvlManager.unlockNextArea();
		}
	};

	this.reset = function() {
		highScore = 0,
		diffScore = 0,
		newScore = 0,
		roomCount = 0,
		prcLevel = 0,
		lvlCompleted = false;
		ingots = new Array();
	};

	this.getMaxScore = function(diff) {
		var points = 0;
		switch (diff) {
			case 'Easy': 	points = maxEasy; 	break;
			case 'Medium': 	points = maxMedium; break;
			case 'Hard': 	points = maxHard; 	break;
			case 'Boss': 	points = maxBoss;  	break;
			default: break;
		}
		return points;
	};

	this.campaignRestart = function () {
		//reset lifes
		lifes = maxLifes;
		totalScore = 0;
		lvlManager = new LevelManager();
		for(var i = 0; i<Levels.length; i++) {
			//reset score and status
			var level = Levels[i];
			level.score = 0;
			if(level.area==1) level.status = 'open';
			else level.status = 'locked';
			//update server info
			updateElementLevelsArray(i+1, level.score, level.status);
		}
		game.state.start('MainGame');
	};

	//getters
	this.getLifes = function() {
		return lifes;
	};
	this.getTotalScore = function() {
		return totalScore;
	};
	this.getHighScore = function() {
		return highScore;
	};
	this.getNewScore = function() {
		return newScore;
	};
	this.getDiffScore = function() {
		return diffScore;
	};
	this.getPrcLevel = function() {
		return prcLevel;
	};
	this.getCompleted = function() {
		return lvlCompleted;
	};
	this.getAreaReq = function(index) {
		return areaReq[index];
	};
	this.getIngots = function() {
		return ingots;
	};
}
