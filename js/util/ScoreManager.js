//score manager
function ScoreManager() {

	const maxEasy 	= 300,
		  maxMedium = 400,
		  maxHard 	= 500;

	var totalScore = 0,
		prcLevel = 0,
		highScore = 0,
		newScore = 0,
		roomCount = 0;
		lvlCompleted = false,
		areaReq = new Array();

	this.cumulateNumbers = function(level) {
		//calculate area requirements
		var points = 0;
		switch (level.difficulty) {
			case 'Easy': 	points = 1*maxEasy; 	break;
			case 'Medium': 	points = 0.5*maxMedium; break;
			case 'Hard': 	points = 0.2*maxHard; 	break;
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
	};

	this.calcLevelScore = function(level) {

		highScore = level.score;
		var points = 0;

		switch (level.difficulty) {
			case 'Easy': 	points = maxEasy; 	break;
			case 'Medium': 	points = maxMedium; break;
			case 'Hard': 	points = maxHard; 	break;
			default: break;
		}
		newScore = game.math.roundTo((prcLevel/roomCount)*points);

		if(newScore > highScore) {
			
			//update TotalScore
			totalScore += newScore - highScore;
		}

		//level completed
		lvlCompleted = true;
	};

	this.reset = function() {
		prcLevel = 0;
		highScore = 0;
		newScore = 0;
		roomCount = 0;
		lvlCompleted = false;
	};

	//getters
	this.getScore = function() {
		return totalScore;
	};
	this.getLvlScore = function() {
		return lvlScore;
	};
	this.getCompleted = function() {
		return lvlCompleted;
	};
	this.getAreaReq = function(index) {
		return areaReq[index];
	};
}
