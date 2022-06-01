import Button from "../js/button.js";

var score


export class gameover extends Phaser.Scene {

    constructor(){
        super("gameover")
    }

    init(data) {
        // recupera el valor SCORE enviado como dato al inicio de la escena
        score = data.score;
    }

    create(){
            // Fondo del menú derrota
            this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, "background").setScale(1.1);
            
            this.add.image(this.cameras.main.centerX,this.cameras.main.centerY / 1.5,"logoGameOver");

            // Texto que muestra el puntaje maximo alcanzado
            this.add.text(this.cameras.main.centerX,this.cameras.main.centerY,`Puntaje alcanzado: ${score}`).setOrigin(0.5);
        
            const boton = new Button(
                this.cameras.main.centerX,
                this.cameras.main.centerY + this.cameras.main.centerY / 3,
                "Play Again",
                this,
                () => {
                  // Instrucción para pasar a la escena Play
                  this.scene.start("gameplay");
                }
              );
    }
}