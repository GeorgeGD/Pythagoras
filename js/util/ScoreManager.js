//score manager
function ScoreManager() {

	var totalScore = 0;
	var lvlScore = 0;
	var areaReq = new Array();

	this.cumulateReq = function (area, difficulty) {
		var points = 0;
		switch (difficulty) {
			case 'Easy': 	points = 300; break;
			case 'Medium': 	points = 400; break;
			case 'Hard': 	points = 500; break;
			default: break;
		}
	}
}
