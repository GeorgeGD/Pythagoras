/*
MainGame state - represents the campaign viewport

*/

var MainGame = {

	create: function() {
		//add display objects in z order
		//set world bounds and ad canvas image
		game.world.setBounds(0, 0, 2048, 672);
		game.camera.position = lvlManager.getCameraPos();
		game.add.image(0, 0, 'canvas');
		this.cameraEnabled = true;
		this.PopupView = false;

		//add level buttons
		this.addLevelButtons();
		//add area overlay
		this.addAreaOverlay();
		//add objects to level popup group
		this.addLevelPopup();
		//add objects to complete popup group
		this.addCompletePopup();
		//add objects to HUD group
		this.addHUD();

		//show popup if a level is completed
		if(scrManager.getCompleted()) {
			this.callComplete();
		}
		//First time enter - campaign end condition
		else {
			this.checkEndCondition();
		}

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

	updateHUD: function() {
		//general hud FX function
		//this is called after cmpPopup is closed
		//life tokens FX
		var life = null;

		//on poor performance take a life
		if(scrManager.getPrcLevel()<0.6 && this.lifes.countDead()<3) {
			life = this.lifes.children[this.lifes.countDead()];
			life.tint = 0x4d4d4d;
			life.scale.setTo(0.7);
			life.alive = false;
			scrManager.takeLife();
			//Play FX
		}
		
		//on gold token give a life
		if(scrManager.getPrcLevel()==1 && this.lifes.countLiving()<3) {
			life = this.lifes.children[this.lifes.countLiving()];
			life.tint = 0xffffff;
			life.scale.setTo(1);
			life.alive = true;
			scrManager.giveLife();
			//Play FX
		}

		//check for end of campaign
		this.checkEndCondition();
	},

	//show and close popups
	//level popup
	callLevel: function(btn) {

		this.lvl_text.setText(btn.data.score+'/'+scrManager.getMaxScore(btn.data.difficulty));
		this.lvl_token.frame = statusToInt(btn.data.status);
		this.lvl_start.data = btn.data;
		this.Buttons.setAll('inputEnabled', false);
		this.lvlPopup.position.setTo(game.camera.x+(game.width-this.lvl_panel.width)/2, (game.height-this.lvl_panel.height)/2);
		this.lvlPopup.visible = true;
		this.cameraEnabled = false;
		this.PopupView = true;
	},

	//complete popup
	callComplete: function() {

		//show popup and disable input
		this.Buttons.setAll('inputEnabled', false);
		this.cmpPopup.visible = true;
		this.cameraEnabled = false;
		this.PopupView = true;

		//tween objects
		this.cmpPopup.position.setTo(game.camera.x+(game.width-this.cmp_panel.width)/2, (game.height-this.cmp_panel.height)/2);
		this.cmp_text.text = scrManager.getNewScore()+"/"+scrManager.getMaxScore(lvlManager.getLevel().difficulty);
		this.cmp_scrDiff.text = "+"+scrManager.getDiffScore();

		//check previous score and set earned rewards
		if(scrManager.getOldScore()>=0.6) {
			this.cmp_bronze.tint = 0xffffff;
		}
		if(scrManager.getOldScore()>=0.8) {
			this.cmp_silver.tint = 0xffffff;
		}
		if(scrManager.getOldScore()==1) {
			this.cmp_gold.tint = 0xffffff;
			this.cmp_life.tint = 0xffffff;
		}

		//tween ingots
		//test with: var ingArray = [1, 1, 1, 1, 1];
		var ingArray = scrManager.getRoomScores();

		//if the player has earned ingots then create them
		if(ingArray.length>0) {

			var frame = null;
			var ingot = null;
			var width = null;
			this.tweens = new Array();
			var pos = {x: this.cmp_bFill.left, y: this.cmp_bFill.top};
			//place all ingots
			for(var i=0; i<ingArray.length; i++) {

				if (ingArray[i]<0.6) { continue; }
				if (ingArray[i]>=0.6) {
					frame = 0;
					width = 0.6*this.cmp_bFill.width/ingArray.length;
				}
				if (ingArray[i]>=0.8) {
					frame = 1;
					width = 0.8*this.cmp_bFill.width/ingArray.length;
				}
				if (ingArray[i]==1) {
					frame = 2;
					width = this.cmp_bFill.width/ingArray.length;
				}
				ingot = this.cmpPopup.create(pos.x, pos.y, 'ingots', frame, true);
				ingot.width = width;
				ingot.alpha = 0;
				this.tweens.push(game.add.tween(ingot));
				pos.x = ingot.right;
			}

			//if there are any ingots add effect for the them
			if(this.tweens.length>0) {
				this.next = 0;
				//put life token on top of all ingots
				this.cmp_life.bringToTop();
				for (var i=0; i<this.tweens.length; i++) {
					this.tweens[i].to({alpha: 1}, 100, 'Linear', false, 200);
					if (i<this.tweens.length-1)
					//chain ingot complete FX events 
						this.tweens[i].onComplete.add( nextIngotFX, this);
					else
					//place a special FX for the last ingot
						this.tweens[i].onComplete.add( lastIngotFX, this);
				}	
				this.tweens[0].start();
			}
		}
		//end of if(ingArray.length>0)
	},

	//close popup
	closePopUp: function(btn) {

		this.Buttons.setAll('inputEnabled', true);
		btn.data.popup.visible = false;
		this.cameraEnabled = true;
		this.PopupView = false;
		//if its the cmpPopup call for HUD update
		if(btn.data.name=='cmpPopup')
			this.updateHUD();
	},

	checkEndCondition: function() {

		//if victory is achieved show campaign end
		if(scrManager.isWin()) {
			this.callCampaignEnd(true);
		}

		//check for lose conditions
		if(scrManager.isLose()) {
			this.callCampaignEnd(false);
		}
	},

	//call campaign end
	callCampaignEnd: function(victory) {

		this.cameraEnabled = false;
		this.endCover = game.add.sprite(game.camera.position.x, game.camera.position.y, 'white');
		this.endCover.inputEnabled = !this.endCover.inputEnabled;
	    this.endCover.alpha = 0;
		this.endCover.width = game.width;
		this.endCover.height = game.height;
		this.endCover.fixedToCamera = true;
		var tween = game.add.tween(this.endCover);
		tween.to( { alpha: 0.8 }, 1000, Phaser.Easing.Linear.None, true);

		tween.onComplete.add(function() {

			//add objects to layer
			this.statement = game.add.text(this.endCover.centerX, this.endCover.centerY-120);
			this.statement.anchor.setTo(0.5);
			this.fScore = game.add.image(this.endCover.centerX-40, this.endCover.centerY-30, 'HUDscore');
			this.fScore.anchor.setTo(0.5);
			this.fsText = game.add.text(this.fScore.centerX+12, this.fScore.centerY+3);
			this.fsText.text = scrManager.getTotalScore();
			this.fsText.anchor.setTo(0.5);
			this.lboard = game.add.button(this.fScore.right+60, this.fScore.y, 'btnLadder', callLadder, this, 0, 1, 2);
			this.lboard.hitArea = new Phaser.Circle(0, 0, this.lboard.width);
			this.lboard.scale.setTo(0.7);
			this.lboard.anchor.setTo(0.5);

			//assign properties according to condition
			if(victory) {
				//player is victorious
				this.statement.text = "YOU ARE VICTORIOUS!";
				this.statement.addColor('#009900', 0);
			}
			else {
				//player is defeated
				this.statement.text = "YOU ARE DEFEATED!";
				this.statement.addColor('#cc0000', 0);
			}

			//add restart button
			this.restart = game.add.button(this.endCover.centerX, this.lboard.bottom+30, 'restart', scrManager.campaignRestart);
			this.restart.setFrames(0, 1);
			this.restart.anchor.setTo(0.5, 0);
			this.restart.scale.setTo(0.7);
		}, this);



		//start campaign end tween
		tween.start();
	},

	//add assets to the state
	//add area overlay
	addAreaOverlay: function() {

		var pos = null;
		//check which area is active
		switch (lvlManager.getArea()) {
			case 1: pos = {x: 651, y: 240};  break;
			case 2: pos = {x: 1295, y: 346}; break;
			default: break;
		}
		//display the overlay if we have a valid area
		if (pos) {
			this.overlay = game.add.image(pos.x, 0, 'overlay');
			this.locks = game.add.group();
			this.areaLock = game.add.image(pos.x+10, pos.y, 'areaLock', null, this.locks);
			this.textReq = game.add.text(this.areaLock.centerX+20, this.areaLock.centerY, '700', null, this.locks);
			this.textReq.text = scrManager.getAreaReq(lvlManager.getArea()+1);
			this.textReq.addColor('red', 0);
			this.textReq.anchor.setTo(0.5);
		}
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
			if (f!=null) {
				button = game.add.button(level.btnX, level.btnY, 'btn'+level.difficulty, this.callLevel, this, f+4, f, f+8, f);
				button.hitArea = new Phaser.Circle(0, 0, button.width);
				button.anchor.setTo(0.5);
				button.data = level;
				if(level.difficulty=='Boss') button.scale.set(0.8);
				else button.scale.set(0.6);
				this.Buttons.add(button);
			}
		}
	},

	//HUD object
	addHUD: function() {

		addPauseCover.call(this);
		this.HUD = game.add.group();
		this.HUD_panel = game.add.image(0, 0, 'HUDpanel', null, this.HUD);
		this.HUD_score = game.add.image(game.width-10, 35, 'HUDscore', null, this.HUD);
		this.HUD_score.anchor.setTo(1, 0.5);
		this.HUD_text = game.add.text(this.HUD_score.centerX+12, this.HUD_score.centerY+3, null, null, this.HUD);
		this.HUD_text.text = scrManager.getTotalScore();
		this.HUD_text.anchor.setTo(0.5);
		//add shared menu items
		addMenuItems.call(this);

		//add lifes
		this.lifes = game.add.group(this.HUD);
		this.lifes.createMultiple(maxLifes, 'lifeToken', null, true);
		for(var i=0; i<maxLifes; i++) {
			var life = this.lifes.children[i];
			//if life position is less than lifes, kill it
			if(i<maxLifes-scrManager.getLifes()) {
				life.tint = 0x4d4d4d;
				life.scale.setTo(0.7);
				life.alive = false;
			}
			life.anchor.setTo(0.5);
		}
		this.lifes.align(-1, 1, -this.btn_menu.height, this.btn_menu.height, Phaser.CENTER);
		this.lifes.position.setTo(this.HUD_score.left-20, this.btn_menu.top);
		//fix HUD to camera
		this.HUD.fixedToCamera = true;
	},

	//level popup object
	addLevelPopup: function() {	

		this.lvlPopup  = game.add.group();
		this.lvl_panel = game.add.image(0, 0, 'lvlPanel', null, this.lvlPopup);
		this.lvl_coin  = game.add.image(286, 47, 'coin', null, this.lvlPopup);
		this.lvl_token = game.add.sprite(82, 59, 'tokens', 0, this.lvlPopup);
		this.lvl_text  = game.add.text(this.lvl_coin.centerX, 105, '000'+'/'+'XXX', null, this.lvlPopup);
		this.lvl_text.anchor.setTo(0.5, 0);
		this.lvl_start = game.add.button(39, 183, 'btnStart', start, this, 0, 1, 2, 1, this.lvlPopup);
		this.lvl_start.scale.setTo(0.7);
		this.lvl_close = game.add.button(229, 183, 'btnClose', this.closePopUp, this, 0, 1, 2, 1, this.lvlPopup);
		this.lvl_close.scale.setTo(0.7);
		this.lvl_close.data.popup = this.lvlPopup;
		this.lvl_close.data.name = "lvlPopup";
		this.lvlPopup.visible = false;
	},

	//complete popup object
	addCompletePopup: function() {	

		this.cmpPopup  = game.add.group();
		this.cmp_panel = game.add.image(0, 0, 'cmpPanel', null, this.cmpPopup);
		this.cmp_bFrame  = game.add.image(this.cmp_panel.centerX-12, 80, 'cmpBarFrame', null, this.cmpPopup);
		this.cmp_bFrame.anchor.setTo(0.5, 0);
		this.cmp_bFill   = game.add.image(this.cmp_bFrame.centerX, this.cmp_bFrame.centerY, 'cmpBarFill', null, this.cmpPopup);
		this.cmp_bFill.anchor.setTo(0.5);
		this.cmp_life  = game.add.sprite(this.cmp_bFrame.right, this.cmp_bFrame.centerY, 'lifeToken', null, this.cmpPopup);
		this.cmp_life.anchor.setTo(0.5);
		this.cmp_gold  = game.add.sprite(this.cmp_life.centerX, this.cmp_life.top, 'tokens', 3, this.cmpPopup);
		this.cmp_gold.scale.setTo(0.66);
		this.cmp_gold.anchor.setTo(0.5, 1);
		this.cmp_silver = game.add.sprite(0, this.cmp_bFill.bottom, 'cmpTokens', 1, this.cmpPopup);
		this.cmp_silver.x = this.cmp_bFill.left+0.8*this.cmp_bFill.width;
		this.cmp_silver.anchor.setTo(0.5, 1);
		this.cmp_bronze = game.add.sprite(0, this.cmp_bFill.bottom, 'cmpTokens', 0, this.cmpPopup);
		this.cmp_bronze.x = this.cmp_bFill.left+0.6*this.cmp_bFill.width;
		this.cmp_bronze.anchor.setTo(0.5, 1);
		this.cmp_coin  = game.add.image(this.cmp_panel.centerX-90, this.cmp_bFrame.bottom+20, 'coin', null, this.cmpPopup);
		this.cmp_text  = game.add.text(this.cmp_coin.right+10, this.cmp_coin.centerY, '000'+'/'+'XXX', null, this.cmpPopup);
		this.cmp_text.anchor.setTo(0, 0.5);
		this.cmp_close = game.add.button(this.cmp_panel.centerX, 300, 'btnClose', this.closePopUp, this, 0, 1, 2, 1, this.cmpPopup);
		this.cmp_close.anchor.setTo(0.5, 0);
		this.cmp_close.scale.setTo(0.7);
		this.cmp_close.data.popup = this.cmpPopup;
		this.cmp_close.data.name = "cmpPopup";
		this.cmp_score = game.add.image(this.cmp_close.centerX, this.cmp_close.top-20, 'cmpScore', null, this.cmpPopup);
		this.cmp_score.anchor.setTo(0.5, 1);
		this.cmp_scrDiff = game.add.text(this.cmp_score.centerX+12, this.cmp_score.centerY+3, '+9999', null, this.cmpPopup);
		this.cmp_scrDiff.anchor.setTo(0.5);
		this.cmp_gold.tint = 0x7f7f7f;
		this.cmp_silver.tint = 0x7f7f7f;
		this.cmp_bronze.tint = 0x7f7f7f;
		this.cmp_life.tint = 0x7f7f7f;
		this.cmpPopup.visible = false;
	},
};