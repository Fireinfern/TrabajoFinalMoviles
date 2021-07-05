Scores = function (game) { }

Scores.prototype = {
    create() {
        BackgroundCreation(this, 'sky', 'hills1');

        this.database = firebase.database();

        this.MainMenu = this.game.add.text(400, this.game.height - 20, "Regresar", { fontSize: '15px' })
        this.MainMenu.inputEnabled = true;
        this.MainMenu.events.onInputDown.add(() => {
            this.game.state.start("Menu", true, false);
        }, this)

        this.database.ref("/trabajofinal").get().then((res) => {
            let val = res.val();
            console.log(val);
            let properties = Object.keys(val);
            if (properties.length > 5) {
                for (let i = 0; i < 5; i++) {
                    let name = val[properties[properties.length - 1 - i]].name;
                    this.game.add.text(this.game.width / 2, (40 * (i + 1)), name);
                }
                return;
            }
            for (let i = 0; i < properties.length; i++) {
                let name = val[properties[i]].name;
                this.game.add.text(this.game.width / 2, (40 * (i + 1)), name);
            }
        });
    }
}

