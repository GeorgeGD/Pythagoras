//DistanceGame - Preslav Kozovski
var DistanceGame = {

    Ycoord: [120,250,500,630],
    XmostCoord: [280, 435, 590, 745],
    Otgovori: [],
    Time: [],
    TimeText: [],
    BallsSpeed: [],
    TextSpeed: [],
    Speed: [0,0,0,0],
    Balls: [],
    Prujini: [],
    Butala: [],
    Uleite: [],
    Dupki: [],
    Mostove: [],
    ProjX: [1.2,1.2,1.2,1.2],
    MScaleX: 0.75,   
    MScaleY: 2,
    prcScore: 0,
    Medals: [],
    UleiScor: 4,
    Err: 2,
    Shaker: 0,
    YouWL: {},
    howtoplay: null,
    score: 0,
  //Sounds
    skarcane: null,
    hit: null,

    loadAssets: function() {
      game.load.path = 'assets/distance_files/images/';
      game.load.image('BG');
      for (var i = 0; i <= 9; i++)game.load.image(i);
      game.load.image('platform');
      game.load.image('ulei');
      game.load.image('prujina');
      game.load.image('butalo');
      game.load.spritesheet('ball1','ball1.png', 68, 68);
      game.load.spritesheet('ball2','ball2.png', 68, 68);
      game.load.spritesheet('ball3','ball3.png', 68, 68);
      game.load.image('forNumbers');
      game.load.image('most');
      game.load.image('EXIT');
      game.load.image('Bronze');
      game.load.image('Silver');
      game.load.image('Gold');
      game.load.image('dupka');
      game.load.image('youwin');
      game.load.image('youloose');
      game.load.image('HowToPlay');
      game.load.path = 'assets/distance_files/Sound/';
      game.load.audio('skarcane', 'skarcane.wav');
      game.load.audio('hit', 'hit.wav');
      game.load.path = '';
  },
    create: function() {
      game.world.setBounds(0, 0, 1024, 672);
      game.physics.startSystem(Phaser.Physics.ARCADE);
      this.score = 0;
      this.prcScore = 0;
      this.Shaker = 0;
      this.BG = game.add.sprite(0,0,'BG');
      this.BG.width = game.width;
      this.BG.height = game.height;

      this.plt = game.add.sprite(0,game.height/2+31,'platform');
      this.plt.anchor.set(0.5);
      this.plt.scale.setTo(1,2);

      this.plt = game.add.sprite(game.width,game.height/2+31,'platform');
      this.plt.anchor.set(0.5);
      this.plt.scale.setTo(1,2);

      this.bronze = game.add.sprite(170,40,'Bronze');
      this.bronze.anchor.set(0.5);
      this.bronze.scale.setTo(0.5);
      this.bronze.alpha = 0;
      this.Medals[0]=this.bronze;

      this.silver = game.add.sprite(170,40,'Silver');
      this.silver.anchor.set(0.5);
      this.silver.scale.setTo(0.5);
      this.silver.alpha = 0;
      this.Medals[1]=this.silver;

      this.gold = game.add.sprite(170,40,'Gold');
      this.gold.anchor.set(0.5);
      this.gold.scale.setTo(0.5);
      this.gold.alpha = 0;
      this.Medals[2]=this.gold;


      for (var i = 0; i < 4; i++) {
        this.most = game.add.sprite(this.XmostCoord[i],game.height/2+31,'most');
        this.most.anchor.set(0.5);
        this.most.scale.setTo(0);
        this.most.alive = false;
        this.Mostove[i]=this.most;

        this.ulei = game.add.sprite(200,this.Ycoord[i],'ulei');
        this.ulei.scale.setTo(2.5,2);
        this.ulei.anchor.set(0,0.5);
        this.ulei.data.index = i;
        this.Uleite[i] = this.ulei;

        this.TextSpeed[i] = game.add.text(240,this.Ycoord[i],0);
        this.TextSpeed[i].anchor.set(0.5);
        this.TextSpeed[i].alpha = 0;

        this.BallsSpeed[i] = game.rnd.integerInRange(1, 3);
        this.ball = game.add.sprite(145,this.Ycoord[i], 'ball'+this.BallsSpeed[i]);
        this.ball.anchor.set(0,0.5);
        this.ball.animations.add('left', [0, 1, 2], 5*this.BallsSpeed[i], true);
        this.ball.animations.play('left');
        this.Balls[i]=this.ball;

        this.prujina = game.add.sprite(20,this.Ycoord[i],'prujina');
        this.prujina.scale.setTo(1.2);
        this.prujina.anchor.set(0,0.5);
        this.Prujini[i]=this.prujina;

        this.butalo = game.add.sprite(125,this.Ycoord[i],'butalo');
        this.butalo.scale.setTo(1.2);
        this.butalo.anchor.set(0,0.5);
        this.Butala[i]=this.butalo;

        this.ulei.inputEnabled = true;
        this.ulei.events.onInputDown.add(this.onDown, this);
        this.ulei.events.onInputUp.add(this.onUp, this);
      };
      this.SetAnswers();
      for (var i = 0; i < 4; i++) {

        this.dupka = game.add.sprite(this.Otgovori[i],this.Ycoord[i], 'dupka');
        this.dupka.anchor.set(0.5);
        this.dupka.scale.setTo(0,1);
        this.Dupki[i]=this.dupka;

        this.forNumbers = game.add.sprite(this.Otgovori[i],this.Ycoord[i]-50,'forNumbers');
        this.forNumbers.scale.setTo(0.4);
        this.forNumbers.anchor.set(0.5);
        for (var j = 0; j < 3; j++) {
          this.OtgI = this.Otgovori[i].toString()[j];
          this.numb = game.add.sprite(this.Otgovori[i]+j*15-15,this.Ycoord[i]-40,this.OtgI);
          this.numb.anchor.set(0.5);
          this.numb.scale.setTo(0.05);
        };

        this.timeText = game.add.text(this.Otgovori[i],this.Ycoord[i],this.Time[i]);
        this.timeText.anchor.set(0.5);
        this.TimeText[i]=this.timeText;
        this.Balls[i].bringToTop();
        this.Butala[i].bringToTop();
      };
      //Sounds
      skarcane = game.add.audio('skarcane');
      hit = game.add.audio('hit');

      /*this.HTPtext = game.add.text(game.width-200,5, 'Как се играе');
      this.HTPtext.inputEnabled = true;
      this.HTPtext.events.onInputDown.add(this.HTPOpen, this);

      this.howtoplay = game.add.sprite(game.width/2,game.height/2,'HowToPlay');
      this.howtoplay.anchor.set(0.5);
      this.howtoplay.scale.setTo(0);
      this.howtoplay.inputEnabled = true;
      this.howtoplay.events.onInputDown.add(this.HTPClose, this);*/

      this.YouWL.win = game.add.sprite(game.width/2,game.height/2,'youwin');
      this.YouWL.win.anchor.set(0.5);
      this.YouWL.win.scale.setTo(0);
      this.YouWL.win.inputEnabled = true;
      this.YouWL.win.events.onInputDown.add(this.Continue, this);

      this.YouWL.loose = game.add.sprite(game.width/2,game.height/2,'youloose');
      this.YouWL.loose.anchor.set(0.5);
      this.YouWL.loose.scale.setTo(0);
      this.YouWL.loose.inputEnabled = true;
      this.YouWL.loose.events.onInputDown.add(this.Continue, this);

      //add HUD panel
      addHUDPanel.call(this);
      this.gameSuccessWav = game.add.audio('success');
      this.gameOverWav = game.add.audio('gameover');

      var totalBalls = this.Balls.length+this.Err;
      this.lifes = game.add.group(this.HUD);
      this.lifes.createMultiple(totalBalls, 'ball1', 1, true);
      this.lifes.children.forEach(function(obj){
        obj.scale.setTo(0.6);
        obj.anchor.setTo(0.4);
      },this);
      this.lifes.align(-1, 1, this.btn_menu.height, this.btn_menu.height, Phaser.CENTER);
      this.lifes.position.setTo(this.HUD_panel.right+10, this.btn_menu.top);
      this.lifes.reverse();


    },
    onDown: function(obj){

      var index = obj.data.index;
      skarcane.loopFull(1);
      this.TextSpeed[index].alpha = 1;
      game.time.events.start();
      this.addSpeed = game.time.events.loop(300, function(){
        this.Speed[index] += 5;
        this.TextSpeed[index].text = this.Speed[index].toString();
        if(this.ProjX[index]>0.2)
        {
          this.ProjX[index] -= 0.02;
          this.Prujini[index].scale.setTo(this.ProjX[index],1.2);
          this.Butala[index].x -=2;
        }


      }, this, []);



    },
    onUp: function(obj){

      var index = obj.data.index;
      skarcane.stop();
      hit.play();
      this.TextSpeed[index].alpha = 0;
      game.time.events.stop();
      this.ProjX[index] = 1.2;
      this.Prujini[index].scale.setTo(this.ProjX[index]);
      this.Butala[index].x = 125;

      this.SpeedBall = this.Speed[index]*this.Time[index]*this.BallsSpeed[index];

      if(this.SpeedBall>200)
      {     
          var life = this.lifes.getFirstAlive();  
          life.alive = false;
          life.visible = false;

          this.Uleite[index].inputEnabled = false;
          this.timeValue = {};
          this.timeValue.score = this.Time[index];
          var timeTween = game.add.tween(this.timeValue).to({score: 0}, this.Time[index]*500, "Linear", true);
          timeTween.onUpdateCallback(function(){
            this.TimeText[index].text = Math.floor(this.timeValue.score);
          }, this);

          var dupkaTween = game.add.tween(this.Dupki[index].scale).to({x: 1,}, this.Time[index]*500, 'Linear', true);

          var tween1 = game.add.tween(this.Balls[index]).to( { x: this.SpeedBall-34}, this.Time[index]*500, 'Linear', true);
          var tween2 = game.add.tween(this.Balls[index]).to( { alpha: 0 }, 2000, "Linear", false);
          tween1.chain(tween2);
          tween2.onComplete.add(function(){

            this.Dupki[index].scale.x = 0;
            if(this.SpeedBall===this.Otgovori[index])
            {
                this.TimeText[index].text = '';
                this.UleiScor -=1;
                var most = game.add.tween(this.Mostove[index].scale).to({x: this.MScaleX, y: this.MScaleY}, 2000, 'Linear', true);

                most.onStart.add(function(){
                  this.score++;
                },this);

                most.onComplete.add(function(){
                  this.alive = true;
                }, this.Mostove[index], 1);

                most.onComplete.add(function(){
                  this.isWin = true;
                  for(var i=0; i<this.Mostove.length; i++){
                    if(!this.Mostove[i].alive) {
                      this.isWin = false;
                      break;
                    }
                  }
                  if(this.isWin)
                  {
                    this.endScreen();
                    this.gameSuccessWav.play();
                  }
                }, this, 0);

                most.start();
            }
            else
            {
              this.Uleite[index].inputEnabled = true;
              this.Balls[index].x = 145;
              this.Balls[index].y = this.Ycoord[index];
              this.Balls[index].alpha = 1;
              this.TimeText[index].text = this.Time[index];
              this.Shaker += 1;
              //check lose
              for (var i = 0; i < 4; i++) {        
                if (i%2===0)var tween1 = game.add.tween(this.Mostove[i]).to({angle: + this.Shaker }, 100, "Linear", true, 0, -1, true);
                else var tween1 = game.add.tween(this.Mostove[i]).to({angle: - this.Shaker }, 100, "Linear", true, 0, -1, true);
              };
            }

            if(this.lifes.countLiving()<=0)
              {
                for (var i = 0; i < 4; i++) {
                  game.add.tween(this.Mostove[i].scale).to({x: 0, y: 0}, 1000, 'Linear', true);
                };
                //this.prcScore = 0;
                this.endScreen();
                this.gameOverWav.play();
              }
          },this);
      }
      this.Speed[index] = 0;
      this.TextSpeed[index].text = '0';
    },

    update: function(){
            if(this.lifes.countDead()>0) this.prcScore = this.score/this.lifes.countDead();
            else this.prcScore = 0;
            updateIngotFX.call(this, this.prcScore);
    },

    SetAnswers: function(){
      for(var i=0; i<4; i++)
      {
          var BallSpeed = this.BallsSpeed[i];
          this.Time[i] = game.rnd.integerInRange(4, 10);
          var otg = game.rnd.integerInRange(350, 920);
          while (((otg/(this.Time[i]*BallSpeed))%5) !== 0) otg--;
          console.log(otg, this.Time[i], BallSpeed, "Otg=", otg/(this.Time[i]*BallSpeed));
          this.Otgovori[i]= otg;
      }
    },
    Continue: function(){

      //continue
      scrManager.calcRoomScore(this.prcScore);
      lvlManager.startNextScene();
    },
    HTPOpen: function(){
      this.howtoplay.scale.setTo(1);
    },
    HTPClose: function(){
      this.howtoplay.scale.setTo(0);
    },

    endScreen: function() {
      var w = game.add.sprite(game.world.centerX, game.world.centerY, 'white');
      w.alpha = 0;
      w.anchor.setTo(0.5, 0.5);
      w.width = game.width;
      w.height = game.height;
      
      var tw = game.add.tween(w);
      tw.to( { alpha: .8 }, 2000, Phaser.Easing.Linear.None, true);
      tw.onComplete.add(this.Continue, this);
      tw.start();
    },
};
