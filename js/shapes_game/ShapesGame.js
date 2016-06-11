//Shapes game - Veselin Smokov
var ShapesGame = {
		version: 2,
		selectionCount: 0,
		maxSize: 6,
		dist: 100, 
		startX: 308, 
		startY: 106,
		windowWidth: 1024,
		windowHeight: 672,
        gameMatrix: new Array( this.maxSize ),
		gameTarget: [],
		myBoxes: [],
		selectedBoxes: [],
		btnReplay: null,
		gameOverStatus: 0,
		
		collectWav: null,	
		gameOverWav: null,
		gameSuccessWav: null,		
		errorWav: null,
		earthquake: null,
		
		gameBorder: null,
		prize: null,
		mvWall: null,
		crack: null,
		
		LevelSkin: 'a',

        preload: function() 
		{
			var level = parseInt(game.net.getQueryString('l'));
			if (!(isNaN(level))) {  this.LoadLevelSettings(level); }
			
			game.load.audio('collect', 'assets/shapes_files/Sound/collect.wav?v=' + this.version);
			game.load.audio('gameover', 'assets/shapes_files/Sound/gameover.wav?v=' + this.version);
			game.load.audio('success', 'assets/shapes_files/Sound/gamecomplete.wav?v=' + this.version);
			game.load.audio('error', 'assets/shapes_files/Sound/error.wav?v=' + this.version);
			game.load.audio('earthquake', 'assets/shapes_files/Sound/earthquake.wav?v=' + this.version);
			game.load.audio('rock2', 'assets/shapes_files/Sound/rock2.wav?v=' + this.version);
			
            game.load.image('box', 'assets/shapes_files/box.png?v=' + this.version);
            game.load.image('white', 'assets/shapes_files/white.png?v=' + this.version);
            game.load.image('replay', 'assets/shapes_files/Replay.png?v=' + this.version);
            game.load.image('box_fill', 'assets/shapes_files/box_fill.png?v=' + this.version);
            game.load.image('prize', 'assets/shapes_files/Skins/' + this.LevelSkin + '/Prize.png?v=' + this.version);
            game.load.image('prize2', 'assets/shapes_files/Skins/' + this.LevelSkin + '/Prize2.png?v=' + this.version);
			
			for (var ti = 1; ti <=7; ti++) { game.load.image('Layer_' + ti , 'assets/shapes_files/Skins/' + this.LevelSkin + '/Layer_' + ti + '.png?v=' + this.version); }	
			for (var ti = 1; ti <=7; ti++) { game.load.image('tetris_0' + ti , 'assets/shapes_files/Tetris/tetris_pic_0' + ti + '.png?v=' + this.version); }	
			for (var ti = 1; ti <=16; ti++) { game.load.image('stoneCube_' + ti , 'assets/shapes_files/Stone_cube/Stone_cube_' + ti + '.png?v=' + this.version); }
			
            game.load.spritesheet('moveWall', 'assets/shapes_files/WallMoving.ss.png?v=' + this.version, 683, 680, 11);
            game.load.spritesheet('crack', 'assets/shapes_files/CrackSprite.png?v=' + this.version, 46, 670, 12);

        },

        create: function() 
		{
			game.world.setBounds(0, 0, 1024, 672);
			this.LoadBackground();
			this.LoadGameSize();
			this.InitgameMatrix();
			this.AddBoxesToView();
			this.AddOverBackground();			
			this.AddTetrisItems();			
			this.GenerateSolution();
			this.InitAudion();
			this.InversegameMatrix();	
		},
		
		update: function () 
		{
			
		},
		
		LoadBackground: function ()
		{
			game.stage.backgroundColor = '#EEEEEE';
			
			for (var ti = 1; ti <=1; ti++) 
			{
				var logo = game.add.sprite(game.world.centerX, game.world.centerY, 'Layer_'+ti );
				logo.anchor.setTo(0.5, 0.5);
				logo.width = this.windowWidth;
				logo.height = this.windowHeight;
			}
			
			var prize2 = game.add.sprite(game.world.centerX + 16, game.world.centerY - 10, 'prize2');
			prize2.anchor.setTo(0.5,0.5);
			prize2.width = 475;
			prize2.height = 475;
			
			this.mvWall = game.add.sprite(game.world.centerX + 20, game.world.centerY - 7, 'moveWall', 0);
			this.mvWall.anchor.setTo(0.5,0.5);
			this.mvWall.width = 455;
			this.mvWall.height = 455;
			
			this.prize = game.add.sprite(game.world.centerX + 21, game.world.centerY - 6, 'prize');
			this.prize.anchor.setTo(0.5,0.5);
			this.prize.width = 450;
			this.prize.height = 450;
			this.prize.xOrig = this.prize.x;
			this.prize.yOrig = this.prize.y;
		},
		
		LoadGameSize: function ()
		{
			var oldmaxSize = this.maxSize;
			this.maxSize = parseInt(game.net.getQueryString('m'));
			if (isNaN(this.maxSize))	{ this.maxSize = oldmaxSize; }
			if (this.maxSize == 0 ) { this.maxSize = game.rnd.integerInRange( 5, 15 ); }
			this.dist = 450/this.maxSize;
		},
		
		InitgameMatrix: function ()
		{
			this.myBoxes = [];
			this.gameMatrix = new Array( this.maxSize );
			for (var x = 0; x < this.maxSize; x++ )
			{
			    this.gameMatrix[x] = new Array( this.maxSize );
			    for ( y = 0; y < this.maxSize; y++ )
			    {
			        this.gameMatrix[x][y] = game.rnd.integerInRange( 0, 3 );
			    }
			}
		},
		
		AddBoxesToView: function ()
		{
			for (var r = 0, bIDs = 0; r < this.maxSize; r++)
			{
				for (var c = 0; c < this.maxSize; c++)
				{
					var p = new Phaser.Point(); 
					p.x = this.startX + this.dist/2 + (c*this.dist); 
					p.y = this.startY + this.dist/2 + (r*this.dist);
					
					var box = game.add.sprite(p.x, p.y, 'box');
					box.anchor.setTo(0.5, 0.5);
					box.xOrig = box.x;
					box.yOrig = box.y;
					box.width = this.dist;
					box.height = this.dist;
					box.inputEnabled = true;
					box.isEnabled = false;
					box.visible = false;
					box.isMarked = false;
					box.positionID = bIDs;
					box.events.onInputDown.add(this.box_click, this);
					box.MyNormal = function() { if (this.myTween) { this.myTween.stop(); } this.x = this.xOrig; this.y = this.yOrig; this.tint = 0xffffff; this.angle = 0;  }
					this.myBoxes[bIDs++] = box;
				}
			}
		},
		
		AddOverBackground: function ()
		{
			for (var ti = 2; ti <=7; ti++) 
			{
				var logo = game.add.sprite(game.world.centerX, game.world.centerY, 'Layer_'+ti );
				logo.anchor.setTo(0.5, 0.5);
				logo.width = this.windowWidth;
				logo.height = this.windowHeight;
				
				if (ti === 2) { this.gameBorder = logo; }
			}
		},
		
		AddTetrisItems: function ()
		{
			var w = game.add.sprite(0, 575, 'white');
            w.alpha = 0.6;
			w.width = this.windowWidth;
			w.height = 100;
			for (var t = 1; t <= 7; t++)
			{	
				var tX = 80 + ( (t-1) * 125 );
				var tY = 600;
				var numBox = game.add.sprite(tX-20, tY-5, "box_fill");
				numBox.width = 120;
				numBox.height = 60;
				numBox.alpha = 0.58;
				
				var tetris_item = game.add.sprite( tX, tY, 'tetris_0' + t );
				tetris_item.width = 100;
				tetris_item.height = 100 / 1.985;
				this.gameTarget[t] = tetris_item;
				tetris_item.tetrisID = t;
				tetris_item.count = 0;
				tetris_item.tint = 0x3c3c3c;						
				tetris_item.text = game.add.text(tetris_item.x-15, tetris_item.y, tetris_item.count, { font: "18px Arial", fill: "#e60000" });
			}
		},
		
		GenerateSolution: function ()
		{
			for ( var t = 0; t < this.maxSize*this.maxSize; t++ )
			{
			    var rnd = game.rnd.integerInRange( 1, 8 );
			    var rnd2 = rnd;
			    var haveSolution = this.FindSolution( rnd2 );
			    while ( !haveSolution )
			    {
			        rnd2++;
			        if ( rnd2 > 8 ) { rnd2 = 0; }
			        if ( rnd2 == rnd ) { console.log( 'No more possibilities!' ); break; }
			        haveSolution = this.FindSolution( rnd2 );
			    }

			    if ( haveSolution )
			    {
			        this.gameTarget[rnd2].count++;
					this.gameTarget[rnd2].text.setText(this.gameTarget[rnd2].count);
					this.gameTarget[rnd2].tint = 0xffffff;	
			    }
			    else { break;}
			}
		},
		
		InitAudion: function ()
		{
			this.collectWav = game.add.audio('collect');
			this.gameOverWav = game.add.audio('gameover');
			this.gameSuccessWav = game.add.audio('success');
			this.errorWav = game.add.audio('error');
			rock2 = game.add.audio('rock2');
			this.earthquake = game.add.audio('earthquake');
			this.earthquake.volume = 0.6;			
		},
		
		InversegameMatrix: function ()
		{
			for (var x = 0; x < this.maxSize; x++ )
			{
			    for ( y = 0; y < this.maxSize; y++ )
			    {
			        var a = this.gameMatrix[x][y];
					if (a < 0) { this.gameMatrix[x][y] = 2; }
					else { this.gameMatrix[x][y] = -1; }
			    }
			}
		},
		
		box_click: function ()
		{
			var box = arguments[0];
			if (!box.isEnabled) {  return; }
			if (this.selectionCount == 4) { this.ClearSelection(); }
			
			box.width = this.dist;
			box.height = this.dist;
			this.selectionCount += (box.isMarked) ? -1 : 1;
			box.isMarked = !box.isMarked;
			
			if (box.isMarked)
			{
				this.selectedBoxes[this.selectionCount] = box;
				var tween = game.add.tween(box);
				box.myTween = tween;
				tween.box = box;
				new TweenShaker().Start(box, tween);
				box.tint = 0xFFD700;
			}
			else
			{
				box.loadTexture( box.stoneSkin );
				this.selectedBoxes[this.selectionCount] = null;
				box.MyNormal();
			}			
			
			if (this.selectionCount==4)
			{
				var fnd = this.checkForItem();
				if (fnd)
				{
					var fndgameTarget = this.gameTarget[fnd[0]];
					if (fndgameTarget.count > 0)
					{
						this.collectWav.play();
						fndgameTarget.count--;
						fndgameTarget.text.setText(fndgameTarget.count);
						if (fndgameTarget.count ===0) {fndgameTarget.tint = 0x3c3c3c;}
						
						for (var p=1; p < fnd.length; p++)
						{
							var mb = this.myBoxes[fnd[p].positionID];
							mb.isMarked = false;
							mb.isEnabled = false;
							mb.MyNormal();
							mb.tint = 0xFFD700;
							
							var tween = game.add.tween(mb);
							mb.myTween = tween;
							tween.box = mb;
							tween.onComplete.addOnce(function(b) {b.visible = false;}, mb.game)
							new TweenShaker().ThrowOut(mb, tween);
							
							var xy = this.IndexTo2D(fnd[p].positionID);
							this.gameMatrix[xy[1]][xy[0]] = -1;
						}	
						var go = this.CheckForGameOver();
						this.PlayGameOver(go);
						return;
					}
					// Not found
					this.errorWav.play();
					game.time.events.add(Phaser.Timer.SECOND * 0.5, this.ClearSelection, this);
				}
			}
		},
		
		ValidateItem: function ( item_id, tItemIndex )
		{
		    if ( this.checkIsBoxMarked( tItemIndex[1] ) &&
				this.checkIsBoxMarked( tItemIndex[2] ) &&
				this.checkIsBoxMarked( tItemIndex[3] ) )
		    {
		        return [item_id,
                this.myBoxes[tItemIndex[0]], this.myBoxes[tItemIndex[1]],
                this.myBoxes[tItemIndex[2]], this.myBoxes[tItemIndex[3]]];
		    }
			return null;
		},
		
		checkForItem: function () 
		{
			var first = this.findFirstItem();
			var item = null;
			
			for (var ti = 1; ti <= 7; ti++ )
			{
			    var ti_coo = TetrisItemDescriptor.GetCoordinates( ti, first, this.maxSize );
			    var posible = TetrisItemDescriptor.CheckPosibleStart( ti, first, this.maxSize );

			    for (var tcr = 0; tcr < ti_coo.length; tcr++ )
			    {    
			        if ( posible[tcr] )
			        {
			            item = this.ValidateItem( ti, ti_coo[tcr] );
			            if ( item ) 
						{
							return item; 
						}
			        }
			    }
			}
			
			return null;
		},
		
		findFirstItem: function ()
		{
			for (b=0; b < this.myBoxes.length; b++)
			{
				if (this.myBoxes[b].isMarked)
				{
					return b;
				}
			}
		},
		
		checkIsBoxMarked: function (bId)
		{
			var box = this.myBoxes[bId];
			if (box)
			{
				return box.isMarked;
			}
			return false;
		},
		
		ClearSelection: function ()
		{
			this.selectionCount = 0;
			this.selectedBoxes = [];
			for (var i=0; i < this.myBoxes.length; i++)
			{
				var box = this.myBoxes[i];
				box.isMarked = false;
				box.width = this.dist;
				box.height = this.dist;
				if (!this.myBoxes[i].isEnabled)
				{
					box.loadTexture( 'box' );
					this.myBoxes[i].visible = false;
				}
				else
				{
					box.loadTexture( this.myBoxes[i].stoneSkin );
				}
				box.MyNormal();
			}
		},

		FindSolution: function ( item_index )
		{
		    var haveSolution = false;
			var sortedPositions = this.FindBestPositions();
			for (var b=0; b < sortedPositions.length; b++)
			{
				if (sortedPositions[b].val < 0) { break; }
				
				var randomStartPosition = sortedPositions[b].idx; 
				var ti_coo = TetrisItemDescriptor.GetCoordinates( item_index, randomStartPosition, this.maxSize );
				var posible = TetrisItemDescriptor.CheckPosibleStart( item_index, randomStartPosition, this.maxSize );

				haveSolution = false;
				var tco;
				for (var tcr = 0; tcr < ti_coo.length; tcr++ )
				{
				    tco = ti_coo[tcr];
				    if ( posible[tcr] && this.ValidateSolution(tco) )
					{
						haveSolution = true;
						for (var t = 0; t < tco.length; t++ )
						{
							var stoneSkin = game.rnd.integerInRange( 1, 16 );
							var onBox = this.myBoxes[tco[t]];
							onBox.stoneSkin = 'stoneCube_' + stoneSkin;
							onBox.loadTexture( onBox.stoneSkin );
							onBox.isEnabled = true;
							onBox.visible = true;
							onBox.width = this.dist;
							onBox.height = this.dist;
							
							var xy = this.IndexTo2D(tco[t]);
							this.gameMatrix[xy[1]][xy[0]] -= 999;
						}					
						break;
					}
				}
				if ( haveSolution )
				{
				    console.log( "Have new solution: ITEM_INDEX = " + item_index + "; tco = " + tco );
				    break;
				}
				else
				{
				    //console.log( "No solution for: ITEM_INDEX = " + item_index + ";");
				}
			}
			return haveSolution;
		},
		
		CheckForGameOver: function ()
		{
			this.PrintgameMatrix();
			var haveSolution = false;
			var haveItems = false;
			for ( var t = 1; t <= 7; t++ )
			{
				if (this.gameTarget[t].count != 0)
				{
					haveItems = true;
					haveSolution = this.FindSolution2( this.gameTarget[t].tetrisID );					
					if (haveSolution) { return 0; /* There is more moves! */ }
				}
			}
			console.log( 'No more possible moves!' );
			
			if (haveItems) { console.log( 'Game Over!' ); return -1; /* Game Over! */}
			else { console.log( 'Success!' ); return 1; /* Success! */ }
		},
		
		PlayGameOver: function (go)
		{
			if (go == 1)
			{
				this.collectWav.stop();
				this.DoUnlock();
			}
			else if (go == -1)
			{
				this.collectWav.stop();
				this.gameOverWav.play();
				this.LoadNewGameScreen();
			}
			this.gameOverStatus = go;
		},
		
		LoadNewGameScreen: function ()
		{
			var w = game.add.sprite(game.world.centerX, game.world.centerY, 'white');
            w.alpha = 0;
			w.anchor.setTo(0.5, 0.5);
			w.width = this.windowWidth;
			w.height = this.windowHeight;
			
			var tw = game.add.tween(w);
			tw.to( { alpha: .8 }, 1000, Phaser.Easing.Linear.None, true);
			tw.onComplete.add(this.AddReplayButton, this);
			tw.start();
			
			for (var i=0; i < this.myBoxes.length; i++)
			{
				this.myBoxes[i].inputEnabled = false;
				if (this.myBoxes[i].isEnabled) { this.myBoxes[i].tint = 0xFF0000; }
			}
		},
		
		AddReplayButton: function ()
		{
			this.btnReplay = game.add.button(game.world.centerX - 80, game.world.centerY - 100, 'replay', this.ReplayButton_Clicked, this, 2, 1, 0);
			this.btnReplay.onInputOver.add(this.ReplayButton_Over, this);
			this.btnReplay.onInputOut.add(this.ReplayButton_Out, this);
			this.btnReplay.tint = 0x002B45;
		},
		
		ReplayButton_Clicked: function ()
		{
			//if (this.gameOverStatus == -1) { this.maxSize--;} 
			//else if (this.gameOverStatus == 1) { this.maxSize++;} 
			this.gameOverStatus = 0;
			if (this.maxSize < 3) { this.maxSize = 3; }
			
			game.state.start('MainGame');
		},
		
		ReplayButton_Over: function () 
		{
			this.btnReplay.tint = 0xFFD700;
		},

		ReplayButton_Out: function () 
		{
			this.btnReplay.tint = 0x002B45;
		},
		
		FindSolution2: function ( item_index )
		{
		    var haveSolution = false;
			var sortedPositions = this.FindBestPositions();
			for (var b = 0; b < sortedPositions.length; b++)
			{
				if (sortedPositions[b].val < 0) { break; }
				
				var randomStartPosition = sortedPositions[b].idx; 
				var ti_coo = TetrisItemDescriptor.GetCoordinates( item_index, randomStartPosition, this.maxSize );
				var posible = TetrisItemDescriptor.CheckPosibleStart( item_index, randomStartPosition, this.maxSize );

				haveSolution = false;
				var tco;
				for (var tcr = 0; tcr < ti_coo.length; tcr++ )
				{
				    tco = ti_coo[tcr];
				    if ( posible[tcr] && this.ValidateSolution(tco) )
					{
						haveSolution = true;
						break;
					}
				}
				if ( haveSolution ) { console.log( "There is more moves!" ); break; }
			}
			return haveSolution;
		},

		ValidateSolution: function ( tco )
		{
		    for ( t = 0; t < tco.length; t++ )
		    {
		        var xy = this.IndexTo2D( tco[t] );
		        if ( this.gameMatrix[xy[1]][xy[0]] < 0 )
		        { return false; }
		    }
		    return true;
		},
		
		FindBestPositions: function ()
		{
			var OneD = new Array((this.maxSize)*(this.maxSize));
			var a  = this.gameMatrix;
			
			var idx = 0;
			for(var i = 0; i < a.length; i++) 
			{
				for(var z = 0; z < a[i].length; z++) 
				{
					var v = { idx: idx, val: a[i][z] };
					OneD[idx] = v;
					idx++;
				}
			}
			
			OneD.sort(function(a, b) { return b.val - a.val; });
			var rr = "";
			for(var z = 0; z < OneD.length; z++) 
			{
				rr += this.pad("{"+OneD[z].idx+": "+OneD[z].val+"} ", 5, ' ') + "  ";
			}
			//console.log(rr);
			return OneD;
		},
		
		IndexTo2D: function (idx)
		{
			var x = ( idx ) % ( this.maxSize );
            var y = ( ( idx ) / ( this.maxSize ) )>>0;
			return [x,y];
		},
		
		PrintgameMatrix: function ()
		{
			console.clear();
			var a  = this.gameMatrix;
			for(var i = 0; i < a.length; i++) 
			{
				var rr = "";
				for(var z = 0; z < a[i].length; z++) 
				{
					rr += this.pad(a[i][z], 5, ' ') + "  ";
				}
				rr+= "\n";
				console.log(rr);
			}
		},
		
		pad: function (n, width, z) 
		{
		   z = z || '0';
		   n = n + '';
		   return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
		},
	
		DoUnlock: function ()
		{
			this.earthquake.play();
			
			var tween = game.add.tween(this.gameBorder);
			this.gameBorder.myTween = tween;
			this.gameBorder.isMarked = true;
			this.gameBorder.xOrig = this.gameBorder.x;
			this.gameBorder.yOrig = this.gameBorder.y;
			tween.box = this.gameBorder;
			new TweenShaker().Start(this.gameBorder, tween);
			
			game.add.tween(this.prize).to( { angle: 360 }, 2000, Phaser.Easing.Linear.None, true, 1000);
			game.add.tween(this.prize).to( { x: -100-this.prize.width, y: this.prize.y }, 2000, Phaser.Easing.Linear.None, true, 1000);
			game.time.events.add(Phaser.Timer.SECOND * 1.5, this.Startcracking, this);

		},

		Startcracking: function () 
		{
			this.crack = game.add.sprite(game.world.centerX, game.world.centerY, 'crack');
			this.crack.anchor.setTo(0,0);
			this.crack.width = 30;
			this.crack.height = 450;
			this.crack.x = game.world.centerX - this.crack.width/2 + 25;
			this.crack.y = 105;
			this.crack.xOrig = this.crack.x;
			this.crack.yOrig = this.crack.y;	
			this.crack.animations.add('cracking').onComplete.add(this.StartWallMoving, this);
			this.crack.animations.play('cracking', 18, false);
			this.gameBorder.myTween.stop();
			
		},

		StartWallMoving: function () 
		{
			this.crack.visible = false;
			rock2.play();
			this.mvWall.animations.add('wallMoving').onComplete.add(this.PlayWinSound, this);
			this.mvWall.animations.play('wallMoving', 18, false);
		},

		PlayWinSound: function () { this.gameSuccessWav.play(); this.LoadNewGameScreen(); },
		
		LoadLevelSettings: function (onLevel)
		{
			var lvl = Levels[onLevel-1];
			this.LevelSkin = lvl.skin;
			this.maxSize = lvl.size;
		},
	};