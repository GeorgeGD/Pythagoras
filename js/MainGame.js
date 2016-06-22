/*
MainGame state - represents the campaign viewport

Upkeep functions after MainGame
*/
var MainGame = {

	create: function() {

		//add display objects in z order
		//set world bounds and ad canvas image
		game.world.setBounds(0, 0, 2048, 672);
		game.add.image(0, 0, 'canvas');
		//add level buttons
		lvlManager.addLevelButtons();
		//add area overlay
		this.overlay = addAreaOverlay();

		//add UI objects to HUD group
		this.HUD = game.add.group();
		this.HUD_bar = game.add.image(0, 0, 'HUD_bar', null, this.HUD);
		this.HUD_menu = game.add.button(10, 35, 'btnMenu', function(){}, this, 0, 1, 2, 0, this.HUD);
		this.HUD_menu.anchor.setTo(0, 0.5);
		this.HUD_menu.scale.set(0.5);
		this.HUD_score = game.add.image(game.width-10, 35, 'HUD_score', null, this.HUD);
		this.HUD_score.anchor.setTo(1, 0.5);
		this.HUD_text = game.add.text(this.HUD_score.x-this.HUD_score.width/2+15, 38, '0000', null, this.HUD);
		this.HUD_text.anchor.setTo(0.5);
		this.HUD.fixedToCamera = true;

		//add objects to lvlPanel group

		//add objects to menuPanel group

		//assign events
		//track pointer position on input
		game.input.onDown.add(function() {
			console.log('pointer is down');
			this.lastposX = game.input.activePointer.x;
		}, this);
	},

	update: function() {

		//camera movement
		var pointer = game.input.activePointer;
		if (pointer.isDown) {
			game.camera.x += this.lastposX-pointer.x;
			this.lastposX = pointer.x;
		}
	},
};


