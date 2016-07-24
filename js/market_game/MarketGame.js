
var MarketGame = {
	loadAssets: function ()
	{
		game.load.image('sky', 'assets/background.png');
	    game.load.image('platform1', 'assets/colons/1.png');
	    game.load.image('platform2', 'assets/colons/2.png');
	    game.load.image('platform3', 'assets/colons/3.png');
	    game.load.image('platform4', 'assets/colons/4.png');
	    game.load.image('platform5', 'assets/colons/5.png');
	    game.load.image('platform6', 'assets/colons/6.png');
	    game.load.image('platform7', 'assets/colons/7.png');
	    game.load.image('ground1', 'assets/platform_left.png');
	    game.load.image('ground2', 'assets/platform_right.png');
	    game.load.image('pillar_left', 'assets/pillar_left.png');
	    game.load.image('pillar_right', 'assets/pillar_right.png');
	    game.load.image('star', 'assets/Weights/01.png');
	    game.load.image('circle', 'assets/Weights/02.png');
	    game.load.image('triangle', 'assets/Weights/03.png');
	    game.load.image('cube', 'assets/Weights/04.png');
	    game.load.image('may', 'assets/Weights/05.png');
	    game.load.image('diamond', 'assets/diamond.png');
	    game.load.image('whiteBlock', 'assets/white.jpg');
	    game.load.audio('rock', 'assets/sounds/rock-1.158.wav')
	    game.load.audio('rock2', 'assets/sounds/rock-2.174.wav')
	    game.load.audio('rock3', 'assets/sounds/rock-0.973.wav')
	}

	flag: false,
	points: 0,
	busy: [],
	tween,
	timer,
	ledge_pos: [],
	pos: [],
	prcScore: 1,
	moves: 0,
	moves_allowed: 10,
	amp: 24,

	create: function ()
	{

		game.physics.startSystem(Phaser.Physics.ARCADE);

		background = game.add.sprite(0,0,'sky');
		background.scale.setTo(0.5,0.5);

		game.add.sprite(870, 330,'diamond');

		
	    /*text2 = game.add.text(10, 45, points+ " точки", { font: "32px Arial", fill: "#ff0044", align: "center" });
	    text3 = game.add.text(10, 80, points+ " точки", { font: "32px Arial", fill: "#ff0044", align: "center" });
	    text4 = game.add.text(10, 115, points+ " точки", { font: "32px Arial", fill: "#ff0044", align: "center" });
		*/
		platforms = game.add.group();
		platforms.enableBody = true;
		game.physics.enable(platforms, Phaser.Physics.ARCADE);
		//platforms.body.immovable = true;
		

		for (var i = 0; i<=6; i++)
		{
			rand = game.rnd.integerInRange(1, 5);
			if (rand==1)
				rand = 1 * amp;
			if (rand==2)
				rand = 2 * amp;
			if (rand==3)
				rand = 3 * amp;
			if (rand==4)
				rand = 4 * amp;
			if (rand==5)
				rand = 5 * amp;
			pos[i] = rand;
			console.log(i,pos[i]);
		}

		for (var i = 0; i<=6; i++)
		{
			rand_colon = game.rnd.integerInRange(1, 7);
			if (i==6)
				ledge = platforms.create(180 + (i*90), (350-pos[i]+pos[i-1]), 'platform' + rand_colon);
			if (i<6 && i>0)
				ledge = platforms.create(180 + (i*90), (350-pos[i]+pos[i+1]+pos[i-1]), 'platform' + rand_colon);
			if (i==0)
				ledge = platforms.create(180 + (i*90), (350-pos[i]+pos[i+1]), 'platform' + rand_colon);
			//ledge = platforms.create(240 + (i*128), 350 - (game.rnd.integerInRange(0, 10) * 5), 'platform');
			ledge.scale.setTo(0.7,0.7);
			ledge.body.moves = false;
			ledge.body.checkCollision.right = false;
			ledge.body.checkCollision.left = false;
		}

		cubes = game.add.group();
		cubes.enableBody = true;
		for (var i = 0; i<=10; i++)
		{
			cube = cubes.create(650,10,'cube', i);
			cube.inputEnabled = true;
			cube.scale.setTo(0.17,0.17)
			cube.body.moves = false;
			cube.input.enableDrag();
			//cube.input.useHandCursor = true;
			cube.events.onDragStop.add(weight_20);
		}

		ground = game.add.sprite (-338 , 345,'ground1');
		ground.scale.setTo(0.5,0.5);
		ground = game.add.sprite (810 , 350,'ground2');
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
			star = stars.create(800,10,'star', i);
			star.inputEnabled = true;
			star.scale.setTo(0.17,0.17);
			star.body.moves = false;
			star.input.enableDrag(true);
			//star.input.useHandCursor = true;
			//star.input.enableSnap();
			star.events.onDragStop.add(weight_50);
		}

		circles = game.add.group();
		circles.enableBody = true;
		for (var i = 0; i<=10; i++)
		{
			circle = circles.create(700,10,'circle', i);
			circle.inputEnabled = true;
			circle.scale.setTo(0.17,0.17);
			circle.body.moves = false;
			circle.input.enableDrag(true);
			//star.input.useHandCursor = true;
			//star.input.enableSnap();
			circle.events.onDragStop.add(weight_30);
		}

		triangles = game.add.group();
		triangles.enableBody = true;
		for (var i = 0; i<=10; i++)
		{
			triangle = triangles.create(600,10,'triangle', i);
			triangle.inputEnabled = true;
			triangle.scale.setTo(0.17,0.17);
			triangle.body.moves = false;
			triangle.input.enableDrag(true);
			//star.input.useHandCursor = true;
			//star.input.enableSnap();
			triangle.events.onDragStop.add(weight_10);
		}

		diamonds = game.add.group();
		diamonds.enableBody = true;
		for (var i = 0; i<=10; i++)
		{
			diamond = diamonds.create(750,10,'may', i);
			diamond.inputEnabled = true;
			diamond.scale.setTo(0.17,0.17);
			diamond.body.moves = false;
			diamond.input.enableDrag(true);
			//star.input.useHandCursor = true;
			//star.input.enableSnap();
			diamond.events.onDragStop.add(weight_40);
		}

		rock = game.add.audio('rock');
		rock2 = game.add.audio('rock2');
		rock3 = game.add.audio('rock3');
		text = game.add.text(10, 10, points+ " точки", { font: "32px Arial", fill: "#ff0044", align: "center" });
		//The circle center of the platform
		target_x = 28;
		target_y = 27;
		//Weights from left to right
		weight_1 = 1 * amp;
		weight_2 = 2 * amp;
		weight_3 = 3 * amp;
		weight_4 = 4 * amp;
		weight_5 = 5 * amp;

		
	}

	function update ()
	{

	}

	function weight_40 (diamond)
	{
		for (var i = 0; i<=platforms.length; i++)
		{
			if (diamond.x>platforms.getAt(i).x && diamond.y>platforms.getAt(i).y && diamond.x<(platforms.getAt(i).x + 70) && diamond.y<(platforms.getAt(i).y + 70) && busy[i] != 1)
			{
				tween = game.add.tween(diamond).to( {x: platforms.getAt(i).x + target_x, y: platforms.getAt(i).y + target_y}, 500, Phaser.Easing.Linear.None, true);
				diamond.x = platforms.getAt(i).x + target_x;
				diamond.y = platforms.getAt(i).y + target_y;	
				tween.onComplete.add(sounds);
				add_moves();
				game.add.tween(platforms.getAt(i)).to( {y: platforms.getAt(i).y + weight_4}, 500, Phaser.Easing.Linear.None, true,1000);
				game.add.tween(platforms.getAt(i-1)).to( {y: platforms.getAt(i-1).y - weight_4}, 500, Phaser.Easing.Linear.None, true,1000);
				tween2 = game.add.tween(platforms.getAt(i+1)).to( {y: platforms.getAt(i+1).y - weight_4}, 500, Phaser.Easing.Linear.None, true,1000);
				tween2.onComplete.add(win);
				game.add.tween(diamond).to( {y: diamond.y + weight_4}, 500, Phaser.Easing.Linear.None, true,1000);
				diamond.events.onInputDown.add(weight_40_move);
				flag = true;
				for (var j = 0; j<=stars.length; j++)
				{
					if ((platforms.getAt(i-1).x == stars.getAt(j).x - target_x) && (platforms.getAt(i-1).y == stars.getAt(j).y - target_y))
					{
						game.add.tween(stars.getAt(j)).to( {y: stars.getAt(j).y - weight_4}, 500, Phaser.Easing.Linear.None, true,1000);
					}
					if ((platforms.getAt(i-1).x == cubes.getAt(j).x - target_x) && (platforms.getAt(i-1).y == cubes.getAt(j).y - target_y))
					{
						game.add.tween(cubes.getAt(j)).to( {y: cubes.getAt(j).y - weight_4}, 500, Phaser.Easing.Linear.None, true,1000);
					}
					if ((platforms.getAt(i-1).x == circles.getAt(j).x - target_x) && (platforms.getAt(i-1).y == circles.getAt(j).y - target_y))
					{
						game.add.tween(circles.getAt(j)).to( {y: circles.getAt(j).y - weight_4}, 500, Phaser.Easing.Linear.None, true,1000);
					}
					if ((platforms.getAt(i-1).x == triangles.getAt(j).x - target_x) && (platforms.getAt(i-1).y == triangles.getAt(j).y - target_y))
					{
						game.add.tween(triangles.getAt(j)).to( {y: triangles.getAt(j).y - weight_4}, 500, Phaser.Easing.Linear.None, true,1000);
					}
					if ((platforms.getAt(i-1).x == diamonds.getAt(j).x - target_x) && (platforms.getAt(i-1).y == diamonds.getAt(j).y - target_y))
					{
						game.add.tween(diamonds.getAt(j)).to( {y: diamonds.getAt(j).y - weight_4}, 500, Phaser.Easing.Linear.None, true,1000);
					}
					if ((platforms.getAt(i+1).x == stars.getAt(j).x - target_x) && (platforms.getAt(i+1).y == stars.getAt(j).y - target_y))
					{
						game.add.tween(stars.getAt(j)).to( {y: stars.getAt(j).y - weight_4}, 500, Phaser.Easing.Linear.None, true,1000);
					}
					if ((platforms.getAt(i+1).x == cubes.getAt(j).x - target_x) && (platforms.getAt(i+1).y == cubes.getAt(j).y - target_y))
					{
						game.add.tween(cubes.getAt(j)).to( {y: cubes.getAt(j).y - weight_4}, 500, Phaser.Easing.Linear.None, true,1000);
					}
					if ((platforms.getAt(i+1).x == circles.getAt(j).x - target_x) && (platforms.getAt(i+1).y == circles.getAt(j).y - target_y))
					{
						game.add.tween(circles.getAt(j)).to( {y: circles.getAt(j).y - weight_4}, 500, Phaser.Easing.Linear.None, true,1000);
					}
					if ((platforms.getAt(i+1).x == triangles.getAt(j).x - target_x) && (platforms.getAt(i+1).y == triangles.getAt(j).y - target_y))
					{
						game.add.tween(triangles.getAt(j)).to( {y: triangles.getAt(j).y - weight_4}, 500, Phaser.Easing.Linear.None, true,1000);
					}
					if ((platforms.getAt(i+1).x == diamonds.getAt(j).x - target_x) && (platforms.getAt(i+1).y == diamonds.getAt(j).y - target_y))
					{
						game.add.tween(diamonds.getAt(j)).to( {y: diamonds.getAt(j).y - weight_4}, 500, Phaser.Easing.Linear.None, true,1000);
					}

				}
				busy[i] = 1;
			}
		}
		if (!flag)
		{
			game.add.tween(diamond).to( {x: 750, y: 10}, 500, Phaser.Easing.Linear.None, true);
			flag = false;
		}
		flag = false;
	}

	function weight_10 (triangle)
	{
		for (var i = 0; i<=platforms.length; i++)
		{
			if (triangle.x>platforms.getAt(i).x && triangle.y>platforms.getAt(i).y && triangle.x<(platforms.getAt(i).x + 70) && triangle.y<(platforms.getAt(i).y + 70) && busy[i] != 1)
			{
				tween = game.add.tween(triangle).to( {x: platforms.getAt(i).x + target_x, y: platforms.getAt(i).y + target_y}, 500, Phaser.Easing.Linear.None, true);
				triangle.x = platforms.getAt(i).x + target_x;
				triangle.y = platforms.getAt(i).y + target_y;	
				tween.onComplete.add(sounds3);
				add_moves();
				game.add.tween(platforms.getAt(i)).to( {y: platforms.getAt(i).y + weight_1}, 400, Phaser.Easing.Linear.None, true,1000);
				game.add.tween(platforms.getAt(i-1)).to( {y: platforms.getAt(i-1).y - weight_1}, 400, Phaser.Easing.Linear.None, true,1000);
				tween2 = game.add.tween(platforms.getAt(i+1)).to( {y: platforms.getAt(i+1).y - weight_1}, 400, Phaser.Easing.Linear.None, true,1000);
				tween2.onComplete.add(win);
				game.add.tween(triangle).to( {y: triangle.y +  weight_1}, 400, Phaser.Easing.Linear.None, true,1000);
				triangle.events.onInputDown.add(weight_10_move);
				flag = true;
				for (var j = 0; j<=stars.length; j++)
				{
					if ((platforms.getAt(i-1).x == stars.getAt(j).x - target_x) && (platforms.getAt(i-1).y == stars.getAt(j).y - target_y))
					{
						game.add.tween(stars.getAt(j)).to( {y: stars.getAt(j).y - weight_1}, 400, Phaser.Easing.Linear.None, true,1000);
					}
					if ((platforms.getAt(i-1).x == cubes.getAt(j).x - target_x) && (platforms.getAt(i-1).y == cubes.getAt(j).y - target_y))
					{
						game.add.tween(cubes.getAt(j)).to( {y: cubes.getAt(j).y - weight_1}, 400, Phaser.Easing.Linear.None, true,1000);
					}
					if ((platforms.getAt(i-1).x == circles.getAt(j).x - target_x) && (platforms.getAt(i-1).y == circles.getAt(j).y - target_y))
					{
						game.add.tween(circles.getAt(j)).to( {y: circles.getAt(j).y - weight_1}, 400, Phaser.Easing.Linear.None, true,1000);
					}
					if ((platforms.getAt(i-1).x == triangles.getAt(j).x - target_x) && (platforms.getAt(i-1).y == triangles.getAt(j).y - target_y))
					{
						game.add.tween(triangles.getAt(j)).to( {y: triangles.getAt(j).y - weight_1}, 400, Phaser.Easing.Linear.None, true,1000);
					}
					if ((platforms.getAt(i-1).x == diamonds.getAt(j).x - target_x) && (platforms.getAt(i-1).y == diamonds.getAt(j).y - target_y))
					{
						game.add.tween(diamonds.getAt(j)).to( {y: diamonds.getAt(j).y - weight_1}, 400, Phaser.Easing.Linear.None, true,1000);
					}
					if ((platforms.getAt(i+1).x == stars.getAt(j).x - target_x) && (platforms.getAt(i+1).y == stars.getAt(j).y - target_y))
					{
						game.add.tween(stars.getAt(j)).to( {y: stars.getAt(j).y - weight_1}, 400, Phaser.Easing.Linear.None, true,1000);
					}
					if ((platforms.getAt(i+1).x == cubes.getAt(j).x - target_x) && (platforms.getAt(i+1).y == cubes.getAt(j).y - target_y))
					{
						game.add.tween(cubes.getAt(j)).to( {y: cubes.getAt(j).y - weight_1}, 400, Phaser.Easing.Linear.None, true,1000);
					}
					if ((platforms.getAt(i+1).x == circles.getAt(j).x - target_x) && (platforms.getAt(i+1).y == circles.getAt(j).y - target_y))
					{
						game.add.tween(circles.getAt(j)).to( {y: circles.getAt(j).y - weight_1}, 400, Phaser.Easing.Linear.None, true,1000);
					}
					if ((platforms.getAt(i+1).x == triangles.getAt(j).x - target_x) && (platforms.getAt(i+1).y == triangles.getAt(j).y - target_y))
					{
						game.add.tween(triangles.getAt(j)).to( {y: triangles.getAt(j).y - weight_1}, 400, Phaser.Easing.Linear.None, true,1000);
					}
					if ((platforms.getAt(i+1).x == diamonds.getAt(j).x - target_x) && (platforms.getAt(i+1).y == diamonds.getAt(j).y - target_y))
					{
						game.add.tween(diamonds.getAt(j)).to( {y: diamonds.getAt(j).y - weight_1}, 400, Phaser.Easing.Linear.None, true,1000);
					}

				}
				busy[i] = 1;
			}
		}
		if (!flag)
		{
			game.add.tween(triangle).to( {x: 600, y: 10}, 500, Phaser.Easing.Linear.None, true);
			flag = false;
		}
		flag = false;
	}

	function weight_30 (circle)
	{
		for (var i = 0; i<=platforms.length; i++)
		{
			if (circle.x>platforms.getAt(i).x && circle.y>platforms.getAt(i).y && circle.x<(platforms.getAt(i).x + 70) && circle.y<(platforms.getAt(i).y + 70) && busy[i] != 1)
			{
				tween = game.add.tween(circle).to( {x: platforms.getAt(i).x + target_x, y: platforms.getAt(i).y + target_y}, 500, Phaser.Easing.Linear.None, true);
				circle.x = platforms.getAt(i).x + target_x;
				circle.y = platforms.getAt(i).y + target_y;	
				tween.onComplete.add(sounds);
				add_moves();
				game.add.tween(platforms.getAt(i)).to( {y: platforms.getAt(i).y + weight_3}, 500, Phaser.Easing.Linear.None, true,1000);
				game.add.tween(platforms.getAt(i-1)).to( {y: platforms.getAt(i-1).y - weight_3}, 500, Phaser.Easing.Linear.None, true,1000);
				tween2 = game.add.tween(platforms.getAt(i+1)).to( {y: platforms.getAt(i+1).y - weight_3}, 500, Phaser.Easing.Linear.None, true,1000);
				tween2.onComplete.add(win);
				game.add.tween(circle).to( {y: circle.y +  weight_3}, 500, Phaser.Easing.Linear.None, true,1000);
				circle.events.onInputDown.add(weight_30_move);
				flag = true;
				for (var j = 0; j<=stars.length; j++)
				{
					if ((platforms.getAt(i-1).x == stars.getAt(j).x - target_x) && (platforms.getAt(i-1).y == stars.getAt(j).y - target_y))
					{
						game.add.tween(stars.getAt(j)).to( {y: stars.getAt(j).y - weight_3}, 500, Phaser.Easing.Linear.None, true,1000);
					}
					if ((platforms.getAt(i-1).x == cubes.getAt(j).x - target_x) && (platforms.getAt(i-1).y == cubes.getAt(j).y - target_y))
					{
						game.add.tween(cubes.getAt(j)).to( {y: cubes.getAt(j).y - weight_3}, 500, Phaser.Easing.Linear.None, true,1000);
					}
					if ((platforms.getAt(i-1).x == circles.getAt(j).x - target_x) && (platforms.getAt(i-1).y == circles.getAt(j).y - target_y))
					{
						game.add.tween(circles.getAt(j)).to( {y: circles.getAt(j).y - weight_3}, 500, Phaser.Easing.Linear.None, true,1000);
					}
					if ((platforms.getAt(i-1).x == triangles.getAt(j).x - target_x) && (platforms.getAt(i-1).y == triangles.getAt(j).y - target_y))
					{
						game.add.tween(triangles.getAt(j)).to( {y: triangles.getAt(j).y - weight_3}, 500, Phaser.Easing.Linear.None, true,1000);
					}
					if ((platforms.getAt(i-1).x == diamonds.getAt(j).x - target_x) && (platforms.getAt(i-1).y == diamonds.getAt(j).y - target_y))
					{
						game.add.tween(diamonds.getAt(j)).to( {y: diamonds.getAt(j).y - weight_3}, 500, Phaser.Easing.Linear.None, true,1000);
					}
					if ((platforms.getAt(i+1).x == stars.getAt(j).x - target_x) && (platforms.getAt(i+1).y == stars.getAt(j).y - target_y))
					{
						game.add.tween(stars.getAt(j)).to( {y: stars.getAt(j).y - weight_3}, 500, Phaser.Easing.Linear.None, true,1000);
					}
					if ((platforms.getAt(i+1).x == cubes.getAt(j).x - target_x) && (platforms.getAt(i+1).y == cubes.getAt(j).y - target_y))
					{
						game.add.tween(cubes.getAt(j)).to( {y: cubes.getAt(j).y - weight_3}, 500, Phaser.Easing.Linear.None, true,1000);
					}
					if ((platforms.getAt(i+1).x == circles.getAt(j).x - target_x) && (platforms.getAt(i+1).y == circles.getAt(j).y - target_y))
					{
						game.add.tween(circles.getAt(j)).to( {y: circles.getAt(j).y - weight_3}, 500, Phaser.Easing.Linear.None, true,1000);
					}
					if ((platforms.getAt(i+1).x == triangles.getAt(j).x - target_x) && (platforms.getAt(i+1).y == triangles.getAt(j).y - target_y))
					{
						game.add.tween(triangles.getAt(j)).to( {y: triangles.getAt(j).y - weight_3}, 500, Phaser.Easing.Linear.None, true,1000);
					}
					if ((platforms.getAt(i+1).x == diamonds.getAt(j).x - target_x) && (platforms.getAt(i+1).y == diamonds.getAt(j).y - target_y))
					{
						game.add.tween(diamonds.getAt(j)).to( {y: diamonds.getAt(j).y - weight_3}, 500, Phaser.Easing.Linear.None, true,1000);
					}
				}
				busy[i] = 1;
			}
		}
		if (!flag)
		{
			game.add.tween(circle).to( {x: 700, y: 10}, 500, Phaser.Easing.Linear.None, true);
			flag = false;
		}
		flag = false;
	}

	function weight_50 (star)
	{
		for (var i = 0; i<=platforms.length; i++)
		{
			if (star.x>platforms.getAt(i).x && star.y>platforms.getAt(i).y && star.x<(platforms.getAt(i).x + 70) && star.y<(platforms.getAt(i).y + 70) && busy[i] != 1)
			{
				tween = game.add.tween(star).to( {x: platforms.getAt(i).x + target_x, y: platforms.getAt(i).y + target_y}, 500, Phaser.Easing.Linear.None, true);
				star.x = platforms.getAt(i).x + target_x;
				star.y = platforms.getAt(i).y + target_y;	
				tween.onComplete.add(sounds2);
				add_moves();
				game.add.tween(platforms.getAt(i)).to( {y: platforms.getAt(i).y + weight_5}, 1000, Phaser.Easing.Linear.None, true,1000);
				game.add.tween(platforms.getAt(i-1)).to( {y: platforms.getAt(i-1).y - weight_5}, 1000, Phaser.Easing.Linear.None, true,1000);
				tween2 = game.add.tween(platforms.getAt(i+1)).to( {y: platforms.getAt(i+1).y - weight_5}, 1000, Phaser.Easing.Linear.None, true,1000);
				tween2.onComplete.add(win);
				game.add.tween(star).to( {y: star.y +  weight_5}, 1000, Phaser.Easing.Linear.None, true,1000);
				star.events.onInputDown.add(weight_50_move);
				flag = true;
				for (var j = 0; j<=stars.length; j++)
				{
					if ((platforms.getAt(i-1).x == stars.getAt(j).x - target_x) && (platforms.getAt(i-1).y == stars.getAt(j).y - target_y))
					{
						game.add.tween(stars.getAt(j)).to( {y: stars.getAt(j).y - weight_5}, 1000, Phaser.Easing.Linear.None, true,1000);
					}
					if ((platforms.getAt(i-1).x == cubes.getAt(j).x - target_x) && (platforms.getAt(i-1).y == cubes.getAt(j).y - target_y))
					{
						game.add.tween(cubes.getAt(j)).to( {y: cubes.getAt(j).y - weight_5}, 1000, Phaser.Easing.Linear.None, true,1000);
					}
					if ((platforms.getAt(i-1).x == circles.getAt(j).x - target_x) && (platforms.getAt(i-1).y == circles.getAt(j).y - target_y))
					{
						game.add.tween(circles.getAt(j)).to( {y: circles.getAt(j).y - weight_5}, 1000, Phaser.Easing.Linear.None, true,1000);
					}
					if ((platforms.getAt(i-1).x == triangles.getAt(j).x - target_x) && (platforms.getAt(i-1).y == triangles.getAt(j).y - target_y))
					{
						game.add.tween(triangles.getAt(j)).to( {y: triangles.getAt(j).y - weight_5}, 1000, Phaser.Easing.Linear.None, true,1000);
					}
					if ((platforms.getAt(i-1).x == diamonds.getAt(j).x - target_x) && (platforms.getAt(i-1).y == diamonds.getAt(j).y - target_y))
					{
						game.add.tween(diamonds.getAt(j)).to( {y: diamonds.getAt(j).y - weight_5}, 1000, Phaser.Easing.Linear.None, true,1000);
					}
					if ((platforms.getAt(i+1).x == stars.getAt(j).x - target_x) && (platforms.getAt(i+1).y == stars.getAt(j).y - target_y))
					{
						game.add.tween(stars.getAt(j)).to( {y: stars.getAt(j).y - weight_5}, 1000, Phaser.Easing.Linear.None, true,1000);
					}
					if ((platforms.getAt(i+1).x == cubes.getAt(j).x - target_x) && (platforms.getAt(i+1).y == cubes.getAt(j).y - target_y))
					{
						game.add.tween(cubes.getAt(j)).to( {y: cubes.getAt(j).y - weight_5}, 1000, Phaser.Easing.Linear.None, true,1000);
					}
					if ((platforms.getAt(i+1).x == circles.getAt(j).x - target_x) && (platforms.getAt(i+1).y == circles.getAt(j).y - target_y))
					{
						game.add.tween(circles.getAt(j)).to( {y: circles.getAt(j).y - weight_5}, 1000, Phaser.Easing.Linear.None, true,1000);
					}
					if ((platforms.getAt(i+1).x == triangles.getAt(j).x - target_x) && (platforms.getAt(i+1).y == triangles.getAt(j).y - target_y))
					{
						game.add.tween(triangles.getAt(j)).to( {y: triangles.getAt(j).y - weight_5}, 1000, Phaser.Easing.Linear.None, true,1000);
					}
					if ((platforms.getAt(i+1).x == diamonds.getAt(j).x - target_x) && (platforms.getAt(i+1).y == diamonds.getAt(j).y - target_y))
					{
						game.add.tween(diamonds.getAt(j)).to( {y: diamonds.getAt(j).y - weight_5}, 1000, Phaser.Easing.Linear.None, true,1000);
					}

				}
				busy[i] = 1;
			}
		}
		if (!flag)
		{
			game.add.tween(star).to( {x: 800, y: 10}, 500, Phaser.Easing.Linear.None, true);
			flag = false;
		}
		flag = false;
	}

	function weight_20 (cube)
	{
		for (var i = 0; i<=platforms.length; i++)
		{
			if (cube.x>platforms.getAt(i).x && cube.y>platforms.getAt(i).y&& cube.x<(platforms.getAt(i).x + 100) && cube.y<(platforms.getAt(i).y + 100) && busy[i] != 1)
			{
				tween = game.add.tween(cube).to( {x: platforms.getAt(i).x + target_x, y: platforms.getAt(i).y + target_y}, 500, Phaser.Easing.Linear.None, true);
				cube.x = platforms.getAt(i).x + target_x;
				cube.y = platforms.getAt(i).y + target_y;	
				tween.onComplete.add(sounds3);
				add_moves();
				game.add.tween(platforms.getAt(i)).to( {y: platforms.getAt(i).y + weight_2}, 500, Phaser.Easing.Linear.None, true,1000);
				game.add.tween(platforms.getAt(i-1)).to( {y: platforms.getAt(i-1).y - weight_2}, 500, Phaser.Easing.Linear.None, true,1000);
				tween2 = game.add.tween(platforms.getAt(i+1)).to( {y: platforms.getAt(i+1).y - weight_2}, 500, Phaser.Easing.Linear.None, true,1000);
				tween2.onComplete.add(win);
				game.add.tween(cube).to( {y: cube.y + weight_2}, 500, Phaser.Easing.Linear.None, true,1000);
				cube.events.onInputDown.add(weight_20_move);
				flag = true;
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
					if ((platforms.getAt(i-1).x == triangles.getAt(j).x - target_x) && (platforms.getAt(i-1).y == triangles.getAt(j).y - target_y))
					{
						game.add.tween(triangles.getAt(j)).to( {y: triangles.getAt(j).y - weight_2}, 500, Phaser.Easing.Linear.None, true,1000);
					}
					if ((platforms.getAt(i-1).x == diamonds.getAt(j).x - target_x) && (platforms.getAt(i-1).y == diamonds.getAt(j).y - target_y))
					{
						game.add.tween(diamonds.getAt(j)).to( {y: diamonds.getAt(j).y - weight_2}, 500, Phaser.Easing.Linear.None, true,1000);
					}
					if ((platforms.getAt(i+1).x == stars.getAt(j).x - target_x) && (platforms.getAt(i+1).y == stars.getAt(j).y - target_y))
					{
						game.add.tween(stars.getAt(j)).to( {y: stars.getAt(j).y - weight_2}, 500, Phaser.Easing.Linear.None, true,1000);
					}
					if ((platforms.getAt(i+1).x == cubes.getAt(j).x - target_x) && (platforms.getAt(i+1).y == cubes.getAt(j).y - target_y))
					{
						game.add.tween(cubes.getAt(j)).to( {y: cubes.getAt(j).y - weight_2}, 500, Phaser.Easing.Linear.None, true,1000);
					}
					if ((platforms.getAt(i+1).x == circles.getAt(j).x - target_x) && (platforms.getAt(i+1).y == circles.getAt(j).y - target_y))
					{
						game.add.tween(circles.getAt(j)).to( {y: circles.getAt(j).y - weight_2}, 500, Phaser.Easing.Linear.None, true,1000);
					}
					if ((platforms.getAt(i+1).x == triangles.getAt(j).x - target_x) && (platforms.getAt(i+1).y == triangles.getAt(j).y - target_y))
					{
						game.add.tween(triangles.getAt(j)).to( {y: triangles.getAt(j).y - weight_2}, 500, Phaser.Easing.Linear.None, true,1000);
					}
					if ((platforms.getAt(i+1).x == diamonds.getAt(j).x - target_x) && (platforms.getAt(i+1).y == diamonds.getAt(j).y - target_y))
					{
						game.add.tween(diamonds.getAt(j)).to( {y: diamonds.getAt(j).y - weight_2}, 500, Phaser.Easing.Linear.None, true,1000);
					}

				}
				busy[i] = 1;
			}
		}
		if (!flag)
		{
			game.add.tween(cube).to( {x: 650, y: 10}, 500, Phaser.Easing.Linear.None, true);
			flag = false;
		}
		flag = false;
	}

	function weight_40_move (diamond)
	{
		for (var i = 0; i<=platforms.length; i++)
		{
			if ((platforms.getAt(i).x == diamond.x - target_x) && (platforms.getAt(i).y == diamond.y - target_y))
			{
				for (var j = 0; j<=diamonds.length; j++)
				{
					if ((platforms.getAt(i-1).x == stars.getAt(j).x - target_x) && (platforms.getAt(i-1).y == stars.getAt(j).y - target_y))
					{
						game.add.tween(stars.getAt(j)).to( {y: stars.getAt(j).y + weight_4}, 500, Phaser.Easing.Linear.None, true,500);
					}
					if ((platforms.getAt(i-1).x == cubes.getAt(j).x - target_x) && (platforms.getAt(i-1).y == cubes.getAt(j).y - target_y))
					{
						game.add.tween(cubes.getAt(j)).to( {y: cubes.getAt(j).y + weight_4}, 500, Phaser.Easing.Linear.None, true,500);
					}
					if ((platforms.getAt(i-1).x == circles.getAt(j).x - target_x) && (platforms.getAt(i-1).y == circles.getAt(j).y - target_y))
					{
						game.add.tween(circles.getAt(j)).to( {y: circles.getAt(j).y + weight_4}, 500, Phaser.Easing.Linear.None, true,500);
					}
					if ((platforms.getAt(i-1).x == triangles.getAt(j).x - target_x) && (platforms.getAt(i-1).y == triangles.getAt(j).y - target_y))
					{
						game.add.tween(triangles.getAt(j)).to( {y: triangles.getAt(j).y + weight_4}, 500, Phaser.Easing.Linear.None, true,500);
					}
					if ((platforms.getAt(i-1).x == diamonds.getAt(j).x - target_x) && (platforms.getAt(i-1).y == diamonds.getAt(j).y - target_y))
					{
						game.add.tween(diamonds.getAt(j)).to( {y: diamonds.getAt(j).y + weight_4}, 500, Phaser.Easing.Linear.None, true,500);
					}
					if ((platforms.getAt(i+1).x == stars.getAt(j).x - target_x) && (platforms.getAt(i+1).y == stars.getAt(j).y - target_y))
					{
						game.add.tween(stars.getAt(j)).to( {y: stars.getAt(j).y + weight_4}, 500, Phaser.Easing.Linear.None, true,500);
					}
					if ((platforms.getAt(i+1).x == cubes.getAt(j).x - target_x) && (platforms.getAt(i+1).y == cubes.getAt(j).y - target_y))
					{
						game.add.tween(cubes.getAt(j)).to( {y: cubes.getAt(j).y + weight_4}, 500, Phaser.Easing.Linear.None, true,500);
					}
					if ((platforms.getAt(i+1).x == circles.getAt(j).x - target_x) && (platforms.getAt(i+1).y == circles.getAt(j).y - target_y))
					{
						game.add.tween(circles.getAt(j)).to( {y: circles.getAt(j).y + weight_4}, 500, Phaser.Easing.Linear.None, true,500);
					}
					if ((platforms.getAt(i+1).x == triangles.getAt(j).x - target_x) && (platforms.getAt(i+1).y == triangles.getAt(j).y - target_y))
					{
						game.add.tween(triangles.getAt(j)).to( {y: triangles.getAt(j).y + weight_4}, 500, Phaser.Easing.Linear.None, true,500);
					}
					if ((platforms.getAt(i+1).x == diamonds.getAt(j).x - target_x) && (platforms.getAt(i+1).y == diamonds.getAt(j).y - target_y))
					{
						game.add.tween(diamonds.getAt(j)).to( {y: diamonds.getAt(j).y + weight_4}, 500, Phaser.Easing.Linear.None, true,500);
					}
				}
				game.add.tween(platforms.getAt(i)).to( {y: platforms.getAt(i).y - weight_4}, 500, Phaser.Easing.Linear.None, true,500,sounds());
				game.add.tween(platforms.getAt(i-1)).to( {y: platforms.getAt(i-1).y + weight_4}, 500, Phaser.Easing.Linear.None, true,500);
				game.add.tween(platforms.getAt(i+1)).to( {y: platforms.getAt(i+1).y + weight_4}, 500, Phaser.Easing.Linear.None, true,500);
				busy[i] = 0;
			}
		}
	}

	function weight_10_move (triangle)
	{
		for (var i = 0; i<=platforms.length; i++)
		{
			if ((platforms.getAt(i).x == triangle.x - target_x) && (platforms.getAt(i).y == triangle.y - target_y))
			{
				for (var j = 0; j<=triangles.length; j++)
				{
					if ((platforms.getAt(i-1).x == stars.getAt(j).x - target_x) && (platforms.getAt(i-1).y == stars.getAt(j).y - target_y))
					{
						game.add.tween(stars.getAt(j)).to( {y: stars.getAt(j).y + weight_1}, 400, Phaser.Easing.Linear.None, true,500);
					}
					if ((platforms.getAt(i-1).x == cubes.getAt(j).x - target_x) && (platforms.getAt(i-1).y == cubes.getAt(j).y - target_y))
					{
						game.add.tween(cubes.getAt(j)).to( {y: cubes.getAt(j).y + weight_1}, 400, Phaser.Easing.Linear.None, true,500);
					}
					if ((platforms.getAt(i-1).x == circles.getAt(j).x - target_x) && (platforms.getAt(i-1).y == circles.getAt(j).y - target_y))
					{
						game.add.tween(circles.getAt(j)).to( {y: circles.getAt(j).y + weight_1}, 400, Phaser.Easing.Linear.None, true,500);
					}
					if ((platforms.getAt(i-1).x == triangles.getAt(j).x - target_x) && (platforms.getAt(i-1).y == triangles.getAt(j).y - target_y))
					{
						game.add.tween(triangles.getAt(j)).to( {y: triangles.getAt(j).y + weight_1}, 400, Phaser.Easing.Linear.None, true,500);
					}
					if ((platforms.getAt(i-1).x == diamonds.getAt(j).x - target_x) && (platforms.getAt(i-1).y == diamonds.getAt(j).y - target_y))
					{
						game.add.tween(diamonds.getAt(j)).to( {y: diamonds.getAt(j).y + weight_1}, 400, Phaser.Easing.Linear.None, true,500);
					}
					if ((platforms.getAt(i+1).x == stars.getAt(j).x - target_x) && (platforms.getAt(i+1).y == stars.getAt(j).y - target_y))
					{
						game.add.tween(stars.getAt(j)).to( {y: stars.getAt(j).y + weight_1}, 400, Phaser.Easing.Linear.None, true,500);
					}
					if ((platforms.getAt(i+1).x == cubes.getAt(j).x - target_x) && (platforms.getAt(i+1).y == cubes.getAt(j).y - target_y))
					{
						game.add.tween(cubes.getAt(j)).to( {y: cubes.getAt(j).y + weight_1}, 400, Phaser.Easing.Linear.None, true,500);
					}
					if ((platforms.getAt(i+1).x == circles.getAt(j).x - target_x) && (platforms.getAt(i+1).y == circles.getAt(j).y - target_y))
					{
						game.add.tween(circles.getAt(j)).to( {y: circles.getAt(j).y + weight_1}, 400, Phaser.Easing.Linear.None, true,500);
					}
					if ((platforms.getAt(i+1).x == triangles.getAt(j).x - target_x) && (platforms.getAt(i+1).y == triangles.getAt(j).y - target_y))
					{
						game.add.tween(triangles.getAt(j)).to( {y: triangles.getAt(j).y + weight_1}, 400, Phaser.Easing.Linear.None, true,500);
					}
					if ((platforms.getAt(i+1).x == diamonds.getAt(j).x - target_x) && (platforms.getAt(i+1).y == diamonds.getAt(j).y - target_y))
					{
						game.add.tween(diamonds.getAt(j)).to( {y: diamonds.getAt(j).y + weight_1}, 400, Phaser.Easing.Linear.None, true,500);
					}

				}
				game.add.tween(platforms.getAt(i)).to( {y: platforms.getAt(i).y - weight_1}, 400, Phaser.Easing.Linear.None, true,500,sounds3());
				game.add.tween(platforms.getAt(i-1)).to( {y: platforms.getAt(i-1).y + weight_1}, 400, Phaser.Easing.Linear.None, true,500);
				game.add.tween(platforms.getAt(i+1)).to( {y: platforms.getAt(i+1).y + weight_1}, 400, Phaser.Easing.Linear.None, true,500);
				busy[i] = 0;
			}
		}
	}

	function weight_30_move (circle)
	{
		for (var i = 0; i<=platforms.length; i++)
		{
			if ((platforms.getAt(i).x == circle.x - target_x) && (platforms.getAt(i).y == circle.y - target_y))
			{
				for (var j = 0; j<=circles.length; j++)
				{
					if ((platforms.getAt(i-1).x == stars.getAt(j).x - target_x) && (platforms.getAt(i-1).y == stars.getAt(j).y - target_y))
					{
						game.add.tween(stars.getAt(j)).to( {y: stars.getAt(j).y + weight_3}, 500, Phaser.Easing.Linear.None, true,500);
					}
					if ((platforms.getAt(i-1).x == cubes.getAt(j).x - target_x) && (platforms.getAt(i-1).y == cubes.getAt(j).y - target_y))
					{
						game.add.tween(cubes.getAt(j)).to( {y: cubes.getAt(j).y + weight_3}, 500, Phaser.Easing.Linear.None, true,500);
					}
					if ((platforms.getAt(i-1).x == circles.getAt(j).x - target_x) && (platforms.getAt(i-1).y == circles.getAt(j).y - target_y))
					{
						game.add.tween(circles.getAt(j)).to( {y: circles.getAt(j).y + weight_3}, 500, Phaser.Easing.Linear.None, true,500);
					}
					if ((platforms.getAt(i-1).x == triangles.getAt(j).x - target_x) && (platforms.getAt(i-1).y == triangles.getAt(j).y - target_y))
					{
						game.add.tween(triangles.getAt(j)).to( {y: triangles.getAt(j).y + weight_3}, 500, Phaser.Easing.Linear.None, true,500);
					}
					if ((platforms.getAt(i-1).x == diamonds.getAt(j).x - target_x) && (platforms.getAt(i-1).y == diamonds.getAt(j).y - target_y))
					{
						game.add.tween(diamonds.getAt(j)).to( {y: diamonds.getAt(j).y + weight_3}, 500, Phaser.Easing.Linear.None, true,500);
					}
					if ((platforms.getAt(i+1).x == stars.getAt(j).x - target_x) && (platforms.getAt(i+1).y == stars.getAt(j).y - target_y))
					{
						game.add.tween(stars.getAt(j)).to( {y: stars.getAt(j).y + weight_3}, 500, Phaser.Easing.Linear.None, true,500);
					}
					if ((platforms.getAt(i+1).x == cubes.getAt(j).x - target_x) && (platforms.getAt(i+1).y == cubes.getAt(j).y - target_y))
					{
						game.add.tween(cubes.getAt(j)).to( {y: cubes.getAt(j).y + weight_3}, 500, Phaser.Easing.Linear.None, true,500);
					}
					if ((platforms.getAt(i+1).x == circles.getAt(j).x - target_x) && (platforms.getAt(i+1).y == circles.getAt(j).y - target_y))
					{
						game.add.tween(circles.getAt(j)).to( {y: circles.getAt(j).y + weight_3}, 500, Phaser.Easing.Linear.None, true,500);
					}
					if ((platforms.getAt(i+1).x == triangles.getAt(j).x - target_x) && (platforms.getAt(i+1).y == triangles.getAt(j).y - target_y))
					{
						game.add.tween(triangles.getAt(j)).to( {y: triangles.getAt(j).y + weight_3}, 500, Phaser.Easing.Linear.None, true,500);
					}
					if ((platforms.getAt(i+1).x == diamonds.getAt(j).x - target_x) && (platforms.getAt(i+1).y == diamonds.getAt(j).y - target_y))
					{
						game.add.tween(diamonds.getAt(j)).to( {y: diamonds.getAt(j).y + weight_3}, 500, Phaser.Easing.Linear.None, true,500);
					}
				}
				game.add.tween(platforms.getAt(i)).to( {y: platforms.getAt(i).y - weight_3}, 500, Phaser.Easing.Linear.None, true,500,sounds());
				game.add.tween(platforms.getAt(i-1)).to( {y: platforms.getAt(i-1).y + weight_3}, 500, Phaser.Easing.Linear.None, true,500);
				game.add.tween(platforms.getAt(i+1)).to( {y: platforms.getAt(i+1).y + weight_3}, 500, Phaser.Easing.Linear.None, true,500);
				busy[i] = 0;
			}
		}
	}

	function weight_50_move (star)
	{
		for (var i = 0; i<=platforms.length; i++)
		{
			if ((platforms.getAt(i).x == star.x - target_x) && (platforms.getAt(i).y == star.y - target_y))
			{
				for (var j = 0; j<=stars.length; j++)
				{
					if ((platforms.getAt(i-1).x == stars.getAt(j).x - target_x) && (platforms.getAt(i-1).y == stars.getAt(j).y - target_y))
					{
						game.add.tween(stars.getAt(j)).to( {y: stars.getAt(j).y + weight_5}, 1000, Phaser.Easing.Linear.None, true,500);
					}
					if ((platforms.getAt(i-1).x == cubes.getAt(j).x - target_x) && (platforms.getAt(i-1).y == cubes.getAt(j).y - target_y))
					{
						game.add.tween(cubes.getAt(j)).to( {y: cubes.getAt(j).y + weight_5}, 1000, Phaser.Easing.Linear.None, true,500);
					}
					if ((platforms.getAt(i-1).x == circles.getAt(j).x - target_x) && (platforms.getAt(i-1).y == circles.getAt(j).y - target_y))
					{
						game.add.tween(circles.getAt(j)).to( {y: circles.getAt(j).y + weight_5}, 1000, Phaser.Easing.Linear.None, true,500);
					}
					if ((platforms.getAt(i-1).x == triangles.getAt(j).x - target_x) && (platforms.getAt(i-1).y == triangles.getAt(j).y - target_y))
					{
						game.add.tween(triangles.getAt(j)).to( {y: triangles.getAt(j).y + weight_5}, 1000, Phaser.Easing.Linear.None, true,500);
					}
					if ((platforms.getAt(i-1).x == diamonds.getAt(j).x - target_x) && (platforms.getAt(i-1).y == diamonds.getAt(j).y - target_y))
					{
						game.add.tween(diamonds.getAt(j)).to( {y: diamonds.getAt(j).y + weight_5}, 1000, Phaser.Easing.Linear.None, true,500);
					}
					if ((platforms.getAt(i+1).x == stars.getAt(j).x - target_x) && (platforms.getAt(i+1).y == stars.getAt(j).y - target_y))
					{
						game.add.tween(stars.getAt(j)).to( {y: stars.getAt(j).y + weight_5}, 1000, Phaser.Easing.Linear.None, true,500);
					}
					if ((platforms.getAt(i+1).x == cubes.getAt(j).x - target_x) && (platforms.getAt(i+1).y == cubes.getAt(j).y - target_y))
					{
						game.add.tween(cubes.getAt(j)).to( {y: cubes.getAt(j).y + weight_5}, 1000, Phaser.Easing.Linear.None, true,500);
					}
					if ((platforms.getAt(i+1).x == circles.getAt(j).x - target_x) && (platforms.getAt(i+1).y == circles.getAt(j).y - target_y))
					{
						game.add.tween(circles.getAt(j)).to( {y: circles.getAt(j).y + weight_5}, 1000, Phaser.Easing.Linear.None, true,500);
					}
					if ((platforms.getAt(i+1).x == triangles.getAt(j).x - target_x) && (platforms.getAt(i+1).y == triangles.getAt(j).y - target_y))
					{
						game.add.tween(triangles.getAt(j)).to( {y: triangles.getAt(j).y + weight_5}, 1000, Phaser.Easing.Linear.None, true,500);
					}
					if ((platforms.getAt(i+1).x == diamonds.getAt(j).x - target_x) && (platforms.getAt(i+1).y == diamonds.getAt(j).y - target_y))
					{
						game.add.tween(diamonds.getAt(j)).to( {y: diamonds.getAt(j).y + weight_5}, 1000, Phaser.Easing.Linear.None, true,500);
					}
				}
				game.add.tween(platforms.getAt(i)).to( {y: platforms.getAt(i).y - weight_5}, 1000, Phaser.Easing.Linear.None, true,500,sounds2());
				game.add.tween(platforms.getAt(i-1)).to( {y: platforms.getAt(i-1).y + weight_5}, 1000, Phaser.Easing.Linear.None, true,500);
				game.add.tween(platforms.getAt(i+1)).to( {y: platforms.getAt(i+1).y + weight_5}, 1000, Phaser.Easing.Linear.None, true,500);
				busy[i] = 0;
			}
		}
	}

	function weight_20_move (cube)
	{
		for (var i = 0; i<=platforms.length; i++)
		{
			if ((platforms.getAt(i).x == cube.x - target_x) && (platforms.getAt(i).y == cube.y - target_y))
			{
				for (var j = 0; j<=cubes.length; j++)
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
					if ((platforms.getAt(i-1).x == triangles.getAt(j).x - target_x) && (platforms.getAt(i-1).y == triangles.getAt(j).y - target_y))
					{
						game.add.tween(triangles.getAt(j)).to( {y: triangles.getAt(j).y + weight_2}, 500, Phaser.Easing.Linear.None, true,500);
					}
					if ((platforms.getAt(i-1).x == diamonds.getAt(j).x - target_x) && (platforms.getAt(i-1).y == diamonds.getAt(j).y - target_y))
					{
						game.add.tween(diamonds.getAt(j)).to( {y: diamonds.getAt(j).y + weight_2}, 500, Phaser.Easing.Linear.None, true,500);
					}
					if ((platforms.getAt(i+1).x == stars.getAt(j).x - target_x) && (platforms.getAt(i+1).y == stars.getAt(j).y - target_y))
					{
						game.add.tween(stars.getAt(j)).to( {y: stars.getAt(j).y + weight_2}, 500, Phaser.Easing.Linear.None, true,500);
					}
					if ((platforms.getAt(i+1).x == cubes.getAt(j).x - target_x) && (platforms.getAt(i+1).y == cubes.getAt(j).y - target_y))
					{
						game.add.tween(cubes.getAt(j)).to( {y: cubes.getAt(j).y + weight_2}, 500, Phaser.Easing.Linear.None, true,500);
					}
					if ((platforms.getAt(i+1).x == circles.getAt(j).x - target_x) && (platforms.getAt(i+1).y == circles.getAt(j).y - target_y))
					{
						game.add.tween(circles.getAt(j)).to( {y: circles.getAt(j).y + weight_2}, 500, Phaser.Easing.Linear.None, true,500);
					}
					if ((platforms.getAt(i+1).x == triangles.getAt(j).x - target_x) && (platforms.getAt(i+1).y == triangles.getAt(j).y - target_y))
					{
						game.add.tween(triangles.getAt(j)).to( {y: triangles.getAt(j).y + weight_2}, 500, Phaser.Easing.Linear.None, true,500);
					}
					if ((platforms.getAt(i+1).x == diamonds.getAt(j).x - target_x) && (platforms.getAt(i+1).y == diamonds.getAt(j).y - target_y))
					{
						game.add.tween(diamonds.getAt(j)).to( {y: diamonds.getAt(j).y + weight_2}, 500, Phaser.Easing.Linear.None, true,500);
					}

				}
				game.add.tween(platforms.getAt(i)).to( {y: platforms.getAt(i).y - weight_2}, 500, Phaser.Easing.Linear.None, true,500,sounds3());
				game.add.tween(platforms.getAt(i-1)).to( {y: platforms.getAt(i-1).y + weight_2}, 500, Phaser.Easing.Linear.None, true,500);
				game.add.tween(platforms.getAt(i+1)).to( {y: platforms.getAt(i+1).y + weight_2}, 500, Phaser.Easing.Linear.None, true,500);
				busy[i] = 0;
			}
		}
	}

	function sounds()
	{
		rock.play();
	}
	function sounds2()
	{
		rock2.play();
	}
	function sounds3()
	{
		rock3.play();
	}

	function win()
	{
		var count = 0;
		for (var i = 0; i<=platforms.length; i++)
		{
			if (platforms.getAt(i).y ==350)
			{
				count += 1;
			}
		}
		if (count == 7)
		{
			moves = (moves - moves_allowed)/10;
			prcScore = (prcScore - moves)*100;
			if (prcScore>100)
				prcScore=100;
			text.text = "You Win with " + prcScore + "% ";
			return true;
		}
		else
		{
			return false;
		}

	}
	function add_moves()
	{
		moves = moves + 1.0;
	}
}