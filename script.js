console.log("olá mundo")

const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');



const flappyBird = {
    spriteX: 0,
    spriteY : 0,
    largura: 33, //tamanho do recorte na sprite
    altura: 24, //tamanho do recorte na sprite
    x: 10,
    y: 50,
    desenha(){
        contexto.drawImage(
            sprites,
            flappyBird.spriteX, flappyBird.spriteY,
            flappyBird.largura, flappyBird.altura,
            flappyBird.x, flappyBird.y,
            flappyBird.largura, flappyBird.altura,
        );
    }
}

function loop(){ 
//cada vez que essa função for executada, iremos pedir para desenhar 
//algo na tela, no caso, o conteúdo abaixo    

    flappyBird.desenha(); //Quando quiser desenhar o flappy bird na tela
    requestAnimationFrame(loop); //ajuda a desenhar os quadros na tela infinitamente

}

loop();