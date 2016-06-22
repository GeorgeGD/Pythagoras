//utility functions

//add area overlay
function addAreaOverlay() {

	var posX = null;
	var overlay = null;
	//check which area is active
	switch (lvlManager.getArea()) {
		case 1: posX = 651;  break;
		case 2: posX = 1295; break;
		case 3: posX = 2048; break;
		default: break;
	}
	//display the overlay if we have a valid area
	if (posX) overlay = game.add.image(posX, 0, 'overlay');
	return overlay;
}

//show a popup with info for the pressed button
function callPopUp (btn) {

	//show a popup for the pressed button
	if (btn.name) {
	lvlManager.startLevel(btn.name);
	}
}

//
//score json prototype
var currentGlobalGame = {
	levels: [
	{Level:'Level1', Score: 100, Status: 'open'},
	{Level:'Level2', Score: 150, Status: 'open'},
	{Level:'Level3', Score: 20, Status: 'open'},
	{Level:'Level4', Score: 30, Status: 'locked'},
	{Level:'Level5', Score: 0, Status: 'locked'},
	{Level:'Level6', Score: 0, Status: 'locked'},
	{Level:'Level7', Score: 0, Status: 'locked'},
	{Level:'Level8', Score: 0, Status: 'locked'},
	{Level:'Level9', Score: 0, Status: 'locked'},
	{Level:'Level10', Score: 0, Status: 'locked'}
	]
};

function GetElementLevelsArray(index){
    for(var j =0; j<currentGlobalGame.levels.length; j++){
        if(currentGlobalGame.levels[j].Level=="Level"+index){
            var sc = parseInt(currentGlobalGame.levels[j].Score);
            return {score:sc, status:currentGlobalGame.levels[j].Status}
        }
        
    }
}

function updateElementLevelsArray(index,_score,_status){
    for(var j =0; j<currentGlobalGame.levels.length; j++){
        if(currentGlobalGame.levels[j].Level=="Level"+index){
            currentGlobalGame.levels[j].Score = _score;
            currentGlobalGame.levels[j].Status = _status;
            return;
        }
        
    }
}