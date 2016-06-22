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
		//images
		game.load.image('canvas', 'assets/main_files/Campaign_mockup.jpg');
		game.load.image('overlay', 'assets/main_files/area_overlay.png');
		game.load.image('HUD_bar', 'assets/main_files/HUD_bar.jpg');
		game.load.image('HUD_score', 'assets/main_files/score_panel.png');
		game.load.image('lvlPanel', 'assets/main_files/level_panel.png');
		game.load.image('btnLocked', 'assets/main_files/btn_locked.png');
		game.load.image('coin', 'assets/main_files/coin.png');
		game.load.spritesheet('token', 'assets/main_files/token.png', 75, 75);
		game.load.spritesheet('btnMenu', 'assets/main_files/btn_menu.png', 200, 106);
		game.load.spritesheet('btnStart', 'assets/main_files/btn_start.png', 240, 106);
		game.load.spritesheet('btnClose', 'assets/main_files/btn_close.png', 210, 106);
		game.load.spritesheet('btnEasy', 'assets/main_files/lvl_button_easy.png', 157, 159);
		game.load.spritesheet('btnMedium', 'assets/main_files/lvl_button_medium.png', 157, 159);
		game.load.spritesheet('btnHard', 'assets/main_files/lvl_button_hard.png', 157, 159);
		game.load.spritesheet('btnBoss', 'assets/main_files/lvl_button_boss.png', 157, 159);
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
