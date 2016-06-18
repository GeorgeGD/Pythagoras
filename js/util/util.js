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
