function TweenShaker()
{
	this.Start = function(b, t)
	{	
		try
		{	
			var offset = 1;			
			b.tIdx = b.game.rnd.integerInRange( 1, 6 );
			
			if (b.tIdx == 3) { DoTween1(b.myTween, b, offset); }
			else if (b.tIdx == 2) { DoTween2(b.myTween, b, offset); }
			else if (b.tIdx == 1) { DoTween3(b.myTween, b, offset); }
			else if (b.tIdx == 4) { DoTween4(b.myTween, b, offset); }
			else { DoTween5(b.myTween, b, offset); }		
			
			if (b.isMarked)
			{
				var nf = new TweenShaker().Start;
				b.myTween.onComplete.addOnce(nf, b.game);
				b.myTween.start();	
			}
			else
			{
				b.MyNormal();
			}
		}
		catch (ex)
		{
			console.log(ex);
		}
	};
	
	var DoTween1 = function (t, b, o) { t.to( { x: b.xOrig + o, angle:'+1' }, 50, Phaser.Easing.Elastic.InOut, true, 4, true); };
	var DoTween2 = function (t, b, o) { t.to( { y: b.yOrig + o, angle:'-1' }, 50, Phaser.Easing.Elastic.InOut, true, 4, true); };
	var DoTween3 = function (t, b, o) { t.to( { x: b.xOrig - o, angle:'+1' }, 50, Phaser.Easing.Elastic.InOut, true, 4, true); };
	var DoTween4 = function (t, b, o) { t.to( { y: b.yOrig - o, angle:'-1' }, 50, Phaser.Easing.Elastic.InOut, true, 4, true); };
	var DoTween5 = function (t, b, o) { t.to( { x: b.xOrig, y: b.yOrig }, 50, Phaser.Easing.Elastic.InOut, true, 4, true); };
	
	this.ThrowOut = function(b, t)
	{	
		try
		{				
			t.to( { x: b.game.width/2, y: b.game.height+100 }, 1000, Phaser.Easing.Elastic.InOut, true);
		}
		catch (ex)
		{
			console.log(ex);
		}
	};
};