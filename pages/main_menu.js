import Button from "../js/button.js";

export class main_menu extends Phaser.Scene { 
    
    constructor() {
        super("main_menu");
    }


    create() {
            
        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'background').setScale(1.1);
        
        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY/1.5, 'logo');

        const boton = new Button(this.cameras.main.centerX, this.cameras.main.centerY + this.cameras.main.centerY/3, 'Play', this, () => {
            this.scene.start("gameplay");
        });
    }
}