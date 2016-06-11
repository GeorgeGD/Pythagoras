//Preload state
var PreloadState = {

	preload: function () {

		//Display loading screen and loadingBar
		game.add.image(0, 0, 'bootScreen');
		this.loadingBar = game.add.sprite(345, 295, 'loadingBar');
		game.load.setPreloadSprite(this.loadingBar);

		//Execute chain loading of game assets here
		//images
		game.load.image('canvas', 'assets/main_files/Campaign_mockup.jpg');
		game.load.image('HUD_bar', 'assets/main_files/HUD_bar.jpg');
		game.load.image('btnMenu', 'assets/main_files/btn_menu.png');
		game.load.image('btnEasy', 'assets/main_files/lvl_button_easy.png');
		game.load.image('btnMedium', 'assets/main_files/lvl_button_medium.png');
		game.load.image('btnHard', 'assets/main_files/lvl_button_hard.png');
		//load level data into the manager
		lvlManager.loadData();
		//Chain-load all game state assets
		ShapesGame.loadAssets();
	},

	create: function () {

		//After preload immediately start MainGame state
		game.state.start('MainGame');
	},
}
