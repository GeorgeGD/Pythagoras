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
	if (btn.data) {
	lvlManager.startLevel(btn.data);
	}
}

//format score to [0;1]
function formatPrcScore(prc_score) {
	if(prc_score>1) prc_score /= 100;
	prc_score = game.math.roundTo(prc_score,-2);
	console.log("format: "+prc_score);
	return prc_score;
}

//game UI panel and shared menu items
function addHUDPanel() {
	addPauseCover.call(this);
	//HUD
	this.HUD = game.add.group();			
	this.HUD_panel = game.add.image(0, 0, 'smallPanel', null, this.HUD);
	addMenuItems.call(this);
	//dynamic score ingots
	this.HUD_ingot = game.add.sprite(171, this.btn_menu.centerY, 'ingots', null, this.HUD);
	this.HUD_ingot.anchor.setTo(0.5);
	this.HUD_ingot.visible = false;
}

function addPauseCover() {
	//white pause cover
	this.pauseWhite = game.add.sprite(game.camera.position.x, game.camera.position.y, 'white');
    this.pauseWhite.alpha = 0.8;
	this.pauseWhite.width = game.width;
	this.pauseWhite.height = game.height;
	this.pauseWhite.fixedToCamera = true;
	this.pauseWhite.visible = false;
}

//update ingot frame
function updateIngot(prc_score) {
	prc_score = formatPrcScore(prc_score);
	//check
	if(prc_score==1) {
		this.HUD_ingot.frame = 2;
		this.HUD_ingot.scale.setTo(1);
		this.HUD_ingot.visible = true;
		return;
	}
	if(prc_score>=0.8) {
		this.HUD_ingot.frame = 1;
		this.HUD_ingot.scale.setTo(0.8, 1);
		this.HUD_ingot.visible = true;
		return;
	}
	if(prc_score>=0.6) {
		this.HUD_ingot.frame = 0;
		this.HUD_ingot.scale.setTo(0.6, 1);
		this.HUD_ingot.visible = true;
		return;
	}
}

//add common Menu objects
function addMenuItems() {
	//add menu button
	this.btn_menu = game.add.button(10, 35, 'btnMenu', callMenu, this, 0, 1, 2, 0, this.HUD);
	this.btn_menu.anchor.setTo(0, 0.5);
	this.btn_menu.scale.set(0.5);
	//add menu popup
	var delim = 60;
	this.mnPopup = game.add.group();
	this.mn_panel = game.add.image(10, 80, 'menuPanel', null, this.mnPopup);
	this.mn_panel.inputEnabled = !this.mn_panel.inputEnabled;
	this.mn_pause = game.add.button(this.mn_panel.centerX, this.mn_panel.y+delim+20, 'btnPause', switchPause, this, 0, 1, 2);
	this.mn_pause.hitArea = new Phaser.Circle(0, 0, this.mn_pause.width);
	this.mn_pause.anchor.setTo(0.5);
	this.mn_pause.scale.setTo(0.7);
	this.mn_sound = game.add.button(this.mn_panel.centerX, this.mn_pause.bottom+delim, 'btnSound', switchSound, this);
	this.mn_sound.hitArea = new Phaser.Circle(0, 0, this.mn_sound.width);
	this.mn_sound.anchor.setTo(0.5);
	this.mn_sound.scale.setTo(0.7);
	//set frames for sound button
	if(game.sound.mute)	this.mn_sound.setFrames(2, 3);
	else this.mn_sound.setFrames(0, 1);
	//continue
	this.mn_ladder = game.add.button(this.mn_panel.centerX, this.mn_sound.bottom+delim, 'btnLadder', callLadder, this, 0, 1, 2);
	this.mn_ladder.hitArea = new Phaser.Circle(0, 0, this.mn_ladder.width);
	this.mn_ladder.anchor.setTo(0.5);
	this.mn_ladder.scale.setTo(0.7);	
	this.mn_home = game.add.button(this.mn_panel.centerX, this.mn_ladder.bottom+delim, 'btnHome', callHome, this, 0, 1, 2);
	this.mn_home.hitArea = new Phaser.Circle(0, 0, this.mn_home.width);
	this.mn_home.anchor.setTo(0.5);
	this.mn_home.scale.setTo(0.7);
	this.mnPopup.addMultiple([this.mn_pause, this.mn_sound, this.mn_ladder, this.mn_home]);
	this.mnPopup.visible = false;
	this.mnPopup.fixedToCamera = true;
	//add data to menu button
	this.btn_menu.data.popup = this.mnPopup;
}

//menu functionality
//menu button call method
 function callMenu(btn) {
	if(btn.data.popup.visible) btn.data.popup.visible = false;
	else btn.data.popup.visible = true;
}

function switchPause(btn) {
	//game.paused = !game.paused;
	this.pauseWhite.visible = !this.pauseWhite.visible;
	this.pauseWhite.inputEnabled = !this.pauseWhite.inputEnabled;
	if(this.PopupView) this.cameraEnabled = false;
	else this.cameraEnabled = !this.cameraEnabled;
}

function switchSound(btn) {
	game.sound.mute = !game.sound.mute;
	if(game.sound.mute)	btn.setFrames(2, 3);
	else btn.setFrames(0, 1);
}

function callLadder(btn) {

}

function callHome(btn) {
	scrManager.reset();
	if (game.state.current!='MainGame') game.state.start('MainGame');
}

//prototypes
//score json prototype
var currentGlobalGame = {
	levels: [
	{Level:'Level1', Score: 0, Status: 'open'},
	{Level:'Level2', Score: 0, Status: 'open'},
	{Level:'Level3', Score: 0, Status: 'open'},
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