//utility functions

//convert level status to int
function statusToInt(status) {
	switch(status) {
		case 'open': 	return 0;
		case 'bronze': 	return 1;
		case 'silver': 	return 2;
		case 'gold': 	return 3;
		default: 		return null;
	}
}

//call level
function start(btn) {

	if (btn.name) {
	lvlManager.startLevel(btn.name);
	}
}

//score json prototype
var currentGlobalGame = {
	levels: [
	{Level:'Level1', Score: 0, Status: 'open'},
	{Level:'Level2', Score: 0, Status: 'silver'},
	{Level:'Level3', Score: 0, Status: 'gold'},
	{Level:'Level4', Score: 0, Status: 'locked'},
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
            return {Score:sc, Status:currentGlobalGame.levels[j].Status};
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