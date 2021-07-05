Menu = function(game){}

Menu.prototype = {
	create(){
		BackgroundCreation(this, 'sky', 'hills1');

		this.titleText = this.game.add.text(60, 80,"Beware of the Hunters",{ fontSize: '30px' });
		this.titleText.fill = "#000";
		
		this.playText = this.game.add.text(195,this.game.height - 90,'Jugar',{ fontSize: '25px' });
		this.playText.fill = "#000";
		this.playText.inputEnabled = true;
		this.playText.events.onInputDown.add(this.startGame, this);

		this.scoresText = this.game.add.text(275 , this.game.height - 30, "Salon de la Fama", { fontSize: '20px' })
		this.scoresText.inputEnabled = true;
		this.scoresText.events.onInputDown.add(() => {
			this.game.state.start("Scores", true, false);
		}, this)
	},

	startGame(){
		this.game.state.start("Level1", true, false);
	}
}