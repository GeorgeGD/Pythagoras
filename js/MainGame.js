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
		this.addLevelButtons();
		//add area overlay
		this.overlay = addAreaOverlay();

		//add UI objects to HUD group
		this.HUD = game.add.group();
		this.HUD_bar = game.add.image(0, 0, 'HUD_bar', null, this.HUD);
		this.HUD_menu = game.add.button(10, 35, 'btnMenu', function(){}, this, 0, 1, 2, 0, this.HUD);
		this.HUD_menu.anchor.setTo(0, 0.5);
		this.HUD_menu.scale.set(0.5);
		this.HUD_scrSlot = game.add.image(game.width-10, 35, 'HUD_score', null, this.HUD);
		this.HUD_scrSlot.anchor.setTo(1, 0.5);
		this.HUD_scrText = game.add.text(this.HUD_scrSlot.x-this.HUD_scrSlot.width/2+15, 38, '0000', null, this.HUD);
		this.HUD_scrText.anchor.setTo(0.5);
		this.HUD.fixedToCamera = true;

		//add objects to level popup group
		this.lvlPopup = game.add.group();
		this.lp_panel = game.add.image(0, 0, 'lvlPanel', null, this.lvlPopup);
		this.lp_coin  = game.add.image(286, 47, 'coin', null, this.lvlPopup);
		this.lp_token = game.add.sprite(82, 59, 'token', 0, this.lvlPopup);
		this.lp_text  = game.add.text(this.lp_coin.x+25, 105, '000'+'/'+'XXX', null, this.lvlPopup);
		this.lp_text.anchor.setTo(0.5, 0);
		this.lp_start = game.add.button(39, 183, 'btnStart', callLevel, this, 0, 1, 2, 0, this.lvlPopup);
		this.lp_start.scale.setTo(0.7);
		this.lp_close = game.add.button(229, 183, 'btnClose', this.closePopUp, this, 0, 1, 2, 0, this.lvlPopup);
		this.lp_close.scale.setTo(0.7);
		this.lvlPopup.visible = false;
		this.cameraEnabled = true;
		//this.lvlPopup.setAll('fixedToCamera', true);
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
		if (pointer.isDown && this.cameraEnabled) {
			game.camera.x += this.lastposX-pointer.x;
			this.lastposX = pointer.x;
		}
	},

	//show popup with level data from the button ref
	callPopUp: function(btn) {

		this.lp_text.setText(btn.data.score+'/'+'XXX');
		this.lp_token.frame = statusToInt(btn.data.status);
		this.lp_start.name = btn.data.label;
		this.Buttons.setAll('inputEnabled', false);
		this.lvlPopup.position.setTo(game.camera.x+(game.width-this.lp_panel.width)/2, (game.height-this.lp_panel.height)/2);
		this.lvlPopup.visible = true;
		this.cameraEnabled = false;
	},
	//close popup
	closePopUp: function(btn) {
		this.Buttons.setAll('inputEnabled', true);
		this.lvlPopup.visible = false;
		this.cameraEnabled = true;
	},

	//add level buttons to MainGame
	addLevelButtons: function() {

		this.Buttons = game.add.group();
		var button = null;
		var level = null;
		var f = null;
		for (var i in Levels) {
			//create the button, set its hitArea to a circle and set its name to the level label
			level = Levels[i];
			f = statusToInt(level.status);
			//check if the button is locked
			if (f==null) {
				button = game.add.image(level.btnX+60, level.btnY+60, 'btnLocked');
			}
			else {
				button = game.add.button(level.btnX+60, level.btnY+60, 'btn'+level.difficulty, this.callPopUp, this, f+4, f, f+8, f);
				button.hitArea = new Phaser.Circle(0, 0, button.width);
			}
			button.anchor.setTo(0.5);
			button.data = level;
			if(level.difficulty!='Boss') button.scale.set(0.7);
			this.Buttons.add(button);
		}
	}
};