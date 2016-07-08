//Preload state
var PreloadState = {

	preload: function() {
		//Display loading screen and loadingBar
		game.add.image(0, 0, 'bootScreen');
		this.loadingBar = game.add.group();
		this.loadingBar.create(0, 0, 'loadingFill');
		this.loadingBar.create(0, 0, 'loadingFrame');
		this.loadingBar.position.setTo(game.world.centerX-125, game.world.centerY-125);
		this.loadingBar.scale.setTo(0.5);
		game.load.setPreloadSprite(this.loadingBar.getBottom());

		//Execute chain loading of game assets here
		//main assets
		game.load.image('canvas', 'assets/main_files/Campaign_mockup.jpg');
		game.load.image('overlay', 'assets/main_files/area_overlay.png');
		game.load.image('areaLock', 'assets/main_files/area_req.png');
		game.load.image('HUDpanel', 'assets/main_files/HUD_bar.jpg');
		game.load.image('HUDscore', 'assets/main_files/score_panel.png');
		game.load.image('lvlPanel', 'assets/main_files/level_panel.png');
		game.load.image('btnLocked', 'assets/main_files/btn_locked.png');
		game.load.image('lifeToken', 'assets/main_files/life_token.png');
		game.load.image('coin', 'assets/main_files/coin.png');
		game.load.spritesheet('ingots', 'assets/main_files/ingots.png', 96, 35);
		game.load.spritesheet('tokens', 'assets/main_files/tokens.png', 75, 75);
		game.load.spritesheet('btnStart', 'assets/main_files/btn_start.png', 240, 106);
		game.load.spritesheet('btnClose', 'assets/main_files/btn_close.png', 210, 106);
		game.load.spritesheet('btnEasy', 'assets/main_files/lvl_button_easy.png', 157, 157);
		game.load.spritesheet('btnMedium', 'assets/main_files/lvl_button_medium.png', 157, 157);
		game.load.spritesheet('btnHard', 'assets/main_files/lvl_button_hard.png', 157, 157);
		game.load.spritesheet('btnBoss', 'assets/main_files/lvl_button_boss.png', 157, 157);

		//menu assets
		game.load.image('smallPanel', 'assets/small_panel.png');
		game.load.image('menuPanel', 'assets/menu_files/menu_panel.png');
		game.load.spritesheet('btnMenu', 'assets/main_files/btn_menu.png', 200, 106);
		game.load.spritesheet('btnSound', 'assets/menu_files/btn_sound.png', 100, 100);
		game.load.spritesheet('btnPause', 'assets/menu_files/btn_pause.png', 100, 100);
		game.load.spritesheet('btnLadder', 'assets/menu_files/btn_ladder.png', 100, 100);
		game.load.spritesheet('btnHome', 'assets/menu_files/btn_home.png', 100, 100);

		//complete popup
		game.load.image('cmpBar', 'assets/main_files/reward_bar.jpg');
		game.load.image('cmpPanel', 'assets/main_files/cmp_panel.png');
		game.load.image('cmpScore', 'assets/main_files/scr_panel_small.png');
		game.load.spritesheet('cmpTokens', 'assets/main_files/reward_tokens.png', 51, 89);
		
		//load level data into the manager
		lvlManager.loadData();

		//Chain-load all game state assets
		ShapesGame.loadAssets();
	},

	create: function() {
		//After preload immediately start MainGame state
		game.state.start('MainGame');
	},
}
