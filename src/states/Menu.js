Menu = function(game){}

Menu.prototype = {
	create:function(){
		BackgroundCreation(this, 'sky', 'hills1');

		this.titleText = this.game.add.text(60, 80,"Don't Fear the Bear",{ fontSize: '40px' });
		this.titleText.fill = "#000";
		
		this.playText = this.game.add.text(195,this.game.height - 90,'Jugar',{ fontSize: '25px' });
		this.playText.fill = "#000";
		this.playText.inputEnabled = true;
		this.playText.events.onInputDown.add(this.startGame, this);
	},

	startGame:function(){
		this.game.state.start("Level1", true, false);
	}
}