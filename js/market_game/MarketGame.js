// MarketGame - Zlatin Vulchev
var MarketGame = {

	flag: false,
	points: 0,
	busy: [0,0,0,0],
	tween: null,
	timer: null,
	ledge_pos: [],
	pos: [],
	prcScore: 1,
	moves: 0,
	moves_allowed: 6,
	amp: 24,

	loadAssets: function()
	{
		game.load.image('sky', 'assets/market_files/background.png');
	    game.load.image('platform1', 'assets/market_files/colons/1.png');
	    game.load.image('platform2', 'assets/market_files/colons/2.png');
	    game.load.image('platform3', 'assets/market_files/colons/3.png');
	    game.load.image('platform4', 'assets/market_files/colons/4.png');
	    game.load.image('ground1', 'assets/market_files/platform_left.png');
	    game.load.image('ground2', 'assets/market_files/platform_right.png');
	    game.load.image('star', 'assets/market_files/Weights/01.png');
	    game.load.image('circle', 'assets/market_files/Weights/02.png');
	    game.load.image('triangle', 'assets/market_files/Weights/03.png');
	    game.load.image('cube', 'assets/market_files/Weights/04.png');
	    game.load.image('may', 'assets/market_files/Weights/05.png');
	    game.load.image('diamond', 'assets/market_files/diamond.png');
	    game.load.image('whiteBlock', 'assets/market_files/white.jpg');
	    game.load.image('pillar_left', 'assets/market_files/pillar_left.png');
	    game.load.image('pillar_right', 'assets/market_files/pillar_right.png');
	    game.load.audio('rock', 'assets/market_files/sounds/rock-1.158.wav')
	    game.load.audio('rock2', 'assets/market_files/sounds/rock-2.174.wav')
	    game.load.audio('rock3', 'assets/market_files/sounds/rock-0.973.wav')
	},

	create: function()
	{
		game.world.setBounds(0, 0, 1024, 672);
		game.physics.startSystem(Phaser.Physics.ARCADE);

		this.background = game.add.sprite(0,0,'sky');
		this.background.scale.setTo(0.5,0.5);
		this.gameSuccessWav = game.add.audio('success');
		this.gameOverWav = game.add.audio('gameover');

		game.add.sprite(870, 330,'diamond');

		platforms = game.add.group();
		platforms.enableBody = true;
		game.physics.enable(platforms, Phaser.Physics.ARCADE);
		//platforms.body.immovable = true;
		
		this.ledge_pos = [1,2,3,4,5];

		for (var i = 0; i<=3; i++)
		{
			rand = game.rnd.integerInRange(1, 3);
			if (rand==1)
				rand = 1 * this.amp;
			if (rand==2)
				rand = 2 * this.amp;
			if (rand==3)
				rand = 3 * this.amp;
			this.pos[i] = rand;
			console.log(i,this.pos[i]);
		}

		weight_1 = 1 * this.amp;
		weight_2 = 2 * this.amp;
		weight_3 = 3 * this.amp;
		for (var i = 0; i<=3; i++)
		{
			rand = game.rnd.integerInRange(1, 4);
			if (i==3)
				ledge = platforms.create(240 + (i*128), (350-this.pos[i]), 'platform' + rand);
			if (i<3)
				ledge = platforms.create(240 + (i*128), (350-this.pos[i]+this.pos[i+1]), 'platform' + rand);
			//ledge = platforms.create(240 + (i*128), 350 - (game.rnd.integerInRange(0, 10) * 5), 'platform');
			ledge.scale.setTo(1,1);
			ledge.body.moves = false;
			ledge.body.checkCollision.right = false;
			ledge.body.checkCollision.left = false;
		}

		cubes = game.add.group();
		cubes.enableBody = true;
		for (var i = 0; i<=10; i++)
		{
			cube = cubes.create(650,10,'cube');
			cube.inputEnabled = true;
			cube.scale.setTo(0.17,0.17)
			cube.body.moves = false;
			cube.input.enableDrag();
			//cube.input.useHandCursor = true;
			cube.events.onDragStop.add(this.weight_20, this);
		}

		grounds = game.add.group();
		grounds.enableBody = true;

		var w = game.add.sprite(640, 0, 'white');
	    w.alpha = 0.4;
	    w.scale.setTo(1,0.3);

		ground = game.add.sprite (-278 , 345,'ground1');
		ground.scale.setTo(0.5,0.5);
		ground = game.add.sprite (752 , 350,'ground2');
		ground.scale.setTo(0.5,0.5);


		pillar = game.add.sprite(0, -18, 'pillar_left');
	    pillar.scale.setTo(0.2,0.3);
	    pillar = game.add.sprite(940, -23, 'pillar_right');
	    pillar.scale.setTo(0.2,0.3);

	   // cursors = game.input.keyboard.createCursorKeys();

		stars = game.add.group();
		stars.enableBody = true;
		for (var i = 0; i<=10; i++)
		{
			star = stars.create(750,10,'star');
			star.inputEnabled = true;
			star.scale.setTo(0.17,0.17);
			star.body.moves = false;
			star.input.enableDrag(true);
			//star.input.useHandCursor = true;
			//star.input.enableSnap();
			star.events.onDragStop.add(this.weight_50, this);
		}

		circles = game.add.group();
		circles.enableBody = true;
		for (var i = 0; i<=10; i++)
		{
			circle = circles.create(700,10,'circle');
			circle.inputEnabled = true;
			circle.scale.setTo(0.17,0.17)
			circle.body.moves = false;
			circle.input.enableDrag(true);
			//star.input.useHandCursor = true;
			//star.input.enableSnap();
			circle.events.onDragStop.add(this.weight_30, this);
		}

		rock = game.add.audio('rock');
		rock2 = game.add.audio('rock2');
		rock3 = game.add.audio('rock3');
		//text = game.add.text(10, 10, this.moves+ " moves", { font: "32px Arial", fill: "#ff0044", align: "center" });
	    //text2 = game.add.text(10, 45, this.prcScore+ " %", { font: "32px Arial", fill: "#ff0044", align: "center" });
	    //text3 = game.add.text(10, 80, this.points+ " точки", { font: "32px Arial", fill: "#ff0044", align: "center" });
	    //text4 = game.add.text(10, 115, this.points+ " точки", { font: "32px Arial", fill: "#ff0044", align: "center" });
		
		//The circle center of the platform
		target_x = 50;
		target_y = 40;
		//Weights from left to right

		//shared UI panel across all games
		addHUDPanel.call(this);	
	},

	update: function()
	{

	},
	//eagle - the middle one
	weight_30: function(circle)
	{
		for (var i = 0; i<=platforms.length; i++)
		{
			if (circle.x>platforms.getAt(i).x && circle.y>platforms.getAt(i).y && circle.x<(platforms.getAt(i).x + 100) && circle.y<(platforms.getAt(i).y + 100) && this.busy[i] != 1)
			{
				this.tween = game.add.tween(circle).to( {x: platforms.getAt(i).x + target_x, y: platforms.getAt(i).y + target_y}, 500, Phaser.Easing.Linear.None, true);
				circle.x = platforms.getAt(i).x + target_x;
				circle.y = platforms.getAt(i).y + target_y;	
				this.tween.onComplete.add(this.sounds);
				this.add_moves();
				game.add.tween(platforms.getAt(i)).to( {y: platforms.getAt(i).y + weight_2}, 500, Phaser.Easing.Linear.None, true,1000);
				tween2 = game.add.tween(platforms.getAt(i-1)).to( {y: platforms.getAt(i-1).y - weight_2}, 500, Phaser.Easing.Linear.None, true,1000);
				tween2.onComplete.add(this.win, this);
				game.add.tween(circle).to( {y: circle.y + weight_2}, 500, Phaser.Easing.Linear.None, true,1000);
				circle.events.onInputDown.add(this.weight_30_move, this);		
				this.flag = true;
				for (var j = 0; j<=stars.length; j++)
				{
					if ((platforms.getAt(i-1).x == stars.getAt(j).x - target_x) && (platforms.getAt(i-1).y == stars.getAt(j).y - target_y))
					{
						game.add.tween(stars.getAt(j)).to( {y: stars.getAt(j).y - weight_2}, 500, Phaser.Easing.Linear.None, true,1000);
					}
					if ((platforms.getAt(i-1).x == cubes.getAt(j).x - target_x) && (platforms.getAt(i-1).y == cubes.getAt(j).y - target_y))
					{
						game.add.tween(cubes.getAt(j)).to( {y: cubes.getAt(j).y - weight_2}, 500, Phaser.Easing.Linear.None, true,1000);
					}
					if ((platforms.getAt(i-1).x == circles.getAt(j).x - target_x) && (platforms.getAt(i-1).y == circles.getAt(j).y - target_y))
					{
						game.add.tween(circles.getAt(j)).to( {y: circles.getAt(j).y - weight_2}, 500, Phaser.Easing.Linear.None, true,1000);
					}
				}
				this.busy[i] = 1;
			}
		}
		if (!this.flag)
		{
			game.add.tween(circle).to( {x: 700, y: 10}, 500, Phaser.Easing.Linear.None, true);
			this.flag = false;
		}
		this.flag = false;
	},
	//right one
	weight_50: function(star)
	{
		for (var i = 0; i<=platforms.length; i++)
		{
			if (star.x>platforms.getAt(i).x && star.y>platforms.getAt(i).y && star.x<(platforms.getAt(i).x + 100) && star.y<(platforms.getAt(i).y + 100) && this.busy[i] != 1)
			{
				this.tween = game.add.tween(star).to( {x: platforms.getAt(i).x + target_x, y: platforms.getAt(i).y + target_y}, 500, Phaser.Easing.Linear.None, true);
				star.x = platforms.getAt(i).x + target_x;
				star.y = platforms.getAt(i).y + target_y;	
				this.tween.onComplete.add(this.sounds2);
				this.add_moves();
				game.add.tween(platforms.getAt(i)).to( {y: platforms.getAt(i).y +weight_3}, 1000, Phaser.Easing.Linear.None, true,1000);
				tween2 = game.add.tween(platforms.getAt(i-1)).to( {y: platforms.getAt(i-1).y -weight_3}, 1000, Phaser.Easing.Linear.None, true,1000);
				tween2.onComplete.add(this.win, this);
				game.add.tween(star).to( {y: star.y + weight_3}, 1000, Phaser.Easing.Linear.None, true,1000);
				star.events.onInputDown.add(this.weight_50_move, this);
				this.flag = true;
				for (var j = 0; j<=stars.length; j++)
				{
					if ((platforms.getAt(i-1).x == stars.getAt(j).x - target_x) && (platforms.getAt(i-1).y == stars.getAt(j).y - target_y))
					{
						game.add.tween(stars.getAt(j)).to( {y: stars.getAt(j).y - weight_3}, 1000, Phaser.Easing.Linear.None, true,1000);
					}
					if ((platforms.getAt(i-1).x == cubes.getAt(j).x - target_x) && (platforms.getAt(i-1).y == cubes.getAt(j).y - target_y))
					{
						game.add.tween(cubes.getAt(j)).to( {y: cubes.getAt(j).y - weight_3}, 1000, Phaser.Easing.Linear.None, true,1000);
					}
					if ((platforms.getAt(i-1).x == circles.getAt(j).x - target_x) && (platforms.getAt(i-1).y == circles.getAt(j).y - target_y))
					{
						game.add.tween(circles.getAt(j)).to( {y: circles.getAt(j).y - weight_3}, 1000, Phaser.Easing.Linear.None, true,1000);
					}
				}
				this.busy[i] = 1;
			}
		}
		if (!this.flag)
		{
			game.add.tween(star).to( {x: 750, y: 10}, 500, Phaser.Easing.Linear.None, true);
			this.flag = false;
		}
		this.flag = false;
	},
	//left one
	weight_20: function(cube)
	{
		for (var i = 0; i<=platforms.length; i++)
		{
			if (cube.x>platforms.getAt(i).x && cube.y>platforms.getAt(i).y&& cube.x<(platforms.getAt(i).x + 100) && cube.y<(platforms.getAt(i).y + 100) && this.busy[i] != 1)
			{
				this.tween = game.add.tween(cube).to( {x: platforms.getAt(i).x + target_x, y: platforms.getAt(i).y + target_y}, 500, Phaser.Easing.Linear.None, true);
				cube.x = platforms.getAt(i).x + target_x;
				cube.y = platforms.getAt(i).y + target_y;	
				this.tween.onComplete.add(this.sounds3);
				this.add_moves();
				game.add.tween(platforms.getAt(i)).to( {y: platforms.getAt(i).y + weight_1}, 500, Phaser.Easing.Linear.None, true,1000);
				tween2 = game.add.tween(platforms.getAt(i-1)).to( {y: platforms.getAt(i-1).y - weight_1}, 500, Phaser.Easing.Linear.None, true,1000);
				tween2.onComplete.add(this.win, this);
				game.add.tween(cube).to( {y: cube.y +  weight_1}, 500, Phaser.Easing.Linear.None, true,1000);
				cube.events.onInputDown.add(this.weight_20_move, this);
				this.flag = true;
				for (var j = 0; j<=stars.length; j++)
				{
					if ((platforms.getAt(i-1).x == cubes.getAt(j).x - target_x) && (platforms.getAt(i-1).y == cubes.getAt(j).y - target_y))
					{
						game.add.tween(cubes.getAt(j)).to( {y: cubes.getAt(j).y - weight_1}, 500, Phaser.Easing.Linear.None, true,1000);
					}
					if ((platforms.getAt(i-1).x == stars.getAt(j).x - target_x) && (platforms.getAt(i-1).y == stars.getAt(j).y - target_y))
					{
						game.add.tween(stars.getAt(j)).to( {y: stars.getAt(j).y - weight_1}, 500, Phaser.Easing.Linear.None, true,1000);
					}
					if ((platforms.getAt(i-1).x == circles.getAt(j).x - target_x) && (platforms.getAt(i-1).y == circles.getAt(j).y - target_y))
					{
						game.add.tween(circles.getAt(j)).to( {y: circles.getAt(j).y - weight_1}, 500, Phaser.Easing.Linear.None, true,1000);
					}
				}
				this.busy[i] = 1;
			}
		}
		if (!this.flag)
		{
			game.add.tween(cube).to( {x: 650, y: 10}, 500, Phaser.Easing.Linear.None, true);
			this.flag = false;
		}
		this.flag = false;
	},

	weight_30_move: function(circle)
	{
		for (var i = 0; i<=platforms.length; i++)
		{
			if ((platforms.getAt(i).x == circle.x - target_x) && (platforms.getAt(i).y == circle.y -target_y))
			{
				for (var j = 0; j<=stars.length; j++)
				{
					if ((platforms.getAt(i-1).x == stars.getAt(j).x - target_x) && (platforms.getAt(i-1).y == stars.getAt(j).y - target_y))
					{
						game.add.tween(stars.getAt(j)).to( {y: stars.getAt(j).y + weight_2}, 500, Phaser.Easing.Linear.None, true,500);
					}
					if ((platforms.getAt(i-1).x == cubes.getAt(j).x - target_x) && (platforms.getAt(i-1).y == cubes.getAt(j).y - target_y))
					{
						game.add.tween(cubes.getAt(j)).to( {y: cubes.getAt(j).y + weight_2}, 500, Phaser.Easing.Linear.None, true,500);
					}
					if ((platforms.getAt(i-1).x == circles.getAt(j).x - target_x) && (platforms.getAt(i-1).y == circles.getAt(j).y - target_y))
					{
						game.add.tween(circles.getAt(j)).to( {y: circles.getAt(j).y + weight_2}, 500, Phaser.Easing.Linear.None, true,500);
					}
				}
				game.add.tween(platforms.getAt(i)).to( {y: platforms.getAt(i).y - weight_2}, 500, Phaser.Easing.Linear.None, true,500,this.sounds());
				game.add.tween(platforms.getAt(i-1)).to( {y: platforms.getAt(i-1).y + weight_2}, 500, Phaser.Easing.Linear.None, true,500);
				this.busy[i] = 0;
			}
		}
	},

	weight_50_move: function(star)
	{
		for (var i = 0; i<=platforms.length; i++)
		{
			if ((platforms.getAt(i).x == star.x - target_x) && (platforms.getAt(i).y == star.y - target_y))
			{
				for (var j = 0; j<=stars.length; j++)
				{
					if ((platforms.getAt(i-1).x == stars.getAt(j).x - target_x) && (platforms.getAt(i-1).y == stars.getAt(j).y - target_y))
					{
						game.add.tween(stars.getAt(j)).to( {y: stars.getAt(j).y + weight_3}, 1000, Phaser.Easing.Linear.None, true,500);
					}
					if ((platforms.getAt(i-1).x == cubes.getAt(j).x - target_x) && (platforms.getAt(i-1).y == cubes.getAt(j).y - target_y))
					{
						game.add.tween(cubes.getAt(j)).to( {y: cubes.getAt(j).y + weight_3}, 1000, Phaser.Easing.Linear.None, true,500);
					}
					if ((platforms.getAt(i-1).x == circles.getAt(j).x - target_x) && (platforms.getAt(i-1).y == circles.getAt(j).y - target_y))
					{
						game.add.tween(circles.getAt(j)).to( {y: circles.getAt(j).y + weight_3}, 1000, Phaser.Easing.Linear.None, true,500);
					}
				}
				game.add.tween(platforms.getAt(i)).to( {y: platforms.getAt(i).y - weight_3}, 1000, Phaser.Easing.Linear.None, true,500,this.sounds2());
				game.add.tween(platforms.getAt(i-1)).to( {y: platforms.getAt(i-1).y + weight_3}, 1000, Phaser.Easing.Linear.None, true,500);
				this.busy[i] = 0;
			}
		}
	},

	weight_20_move: function(cube)
	{
		for (var i = 0; i<=platforms.length; i++)
		{
			if ((platforms.getAt(i).x == cube.x - target_x) && (platforms.getAt(i).y == cube.y - target_y))
			{
				for (var j = 0; j<=stars.length; j++)
				{
					if ((platforms.getAt(i-1).x == stars.getAt(j).x - target_x) && (platforms.getAt(i-1).y == stars.getAt(j).y - target_y))
					{
						game.add.tween(stars.getAt(j)).to( {y: stars.getAt(j).y + weight_1}, 500, Phaser.Easing.Linear.None, true,500);
					}
					if ((platforms.getAt(i-1).x == cubes.getAt(j).x - target_x) && (platforms.getAt(i-1).y == cubes.getAt(j).y - target_y))
					{
						game.add.tween(cubes.getAt(j)).to( {y: cubes.getAt(j).y + weight_1}, 500, Phaser.Easing.Linear.None, true,500);
					}
					if ((platforms.getAt(i-1).x == circles.getAt(j).x - target_x) && (platforms.getAt(i-1).y == circles.getAt(j).y - target_y))
					{
						game.add.tween(circles.getAt(j)).to( {y: circles.getAt(j).y + weight_1}, 500, Phaser.Easing.Linear.None, true,500);
					}
				}
				game.add.tween(platforms.getAt(i)).to( {y: platforms.getAt(i).y - weight_1}, 500, Phaser.Easing.Linear.None, true,500,this.sounds3());
				game.add.tween(platforms.getAt(i-1)).to( {y: platforms.getAt(i-1).y + weight_1}, 500, Phaser.Easing.Linear.None, true,500);
				this.busy[i] = 0;
			}
		}
	},

	sounds: function ()
	{
		rock.play();
	},

	sounds2: function ()
	{
		rock2.play();
	},

	sounds3: function ()
	{
		rock3.play();
	},

	win: function ()
	{
		this.prcScore = 4*2/this.moves*100;
		console.log(this.prcScore);

		updateIngotFX.call(this, this.prcScore);
		var count = 0;
		for (var i = 0; i<=platforms.length; i++)
		{
			if (platforms.getAt(i).y ==350)
			{
				count += 1;
			}
		}
		if (count == 4)
		{
			if (this.prcScore>100)
				this.prcScore=100;
			//text.text = "You Win with " + this.prcScore + "% ";

			var w = game.add.sprite(game.world.centerX, game.world.centerY, 'white');
            w.alpha = 0;
			w.anchor.setTo(0.5, 0.5);
			w.width = game.width;
			w.height = game.height;
			
			var tw = game.add.tween(w);
			tw.to( { alpha: .8 }, 2000, Phaser.Easing.Linear.None, true);
			tw.onComplete.add(function(){
				console.log(this.prcScore);
				scrManager.calcRoomScore(this.prcScore);
				lvlManager.startNextScene();
			}, this);
			tw.start();
			this.gameSuccessWav.play();

			return true;
		}
		else
		{
			return false;
		}

	},

	add_moves: function ()
	{
		this.moves = this.moves + 1.0;
		console.log("move added: " +this.moves);
	},
}