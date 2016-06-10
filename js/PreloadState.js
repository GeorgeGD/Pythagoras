//Preload state
var PreloadState = {

	preload: function () {

		//Display loading screen and loadingBar

		//Execute chain loading of game assets here
		game.load.image('canvas', 'assets/main_files/Campaign_mockup.jpg');
		game.load.image('HUD_bar', 'assets/main_files/HUD_bar.jpg');
		game.load.image('btnMenu', 'assets/main_files/btn_menu.png');

		game.load.image('btnEasy', 'assets/main_files/lvl_button_easy.png');
		game.load.image('btnMedium', 'assets/main_files/lvl_button_medium.png');
		game.load.image('btnHard', 'assets/main_files/lvl_button_hard.png');

	},

	create: function () {

		//After preload immediately start MainGame state
		game.state.start('MainGame');
	},

	update: function () {
		
	}
}
