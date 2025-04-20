console.log("olá mundo")

const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

const planoDeFundo = {
    spriteX: 390,
    spriteY: 0,
    largura: 275,
    altura: 204,
    x: 0,
    y: canvas.height - 204,
    desenha(){
        contexto.drawImage(
            sprites,
            planoDeFundo.spriteX, planoDeFundo.spriteY,
            planoDeFundo.largura, planoDeFundo.altura,
            planoDeFundo.x, planoDeFundo.y,
            planoDeFundo.largura, planoDeFundo.altura,
        )
        contexto.drawImage(
            sprites,
            planoDeFundo.spriteX, planoDeFundo.spriteY,
            planoDeFundo.largura, planoDeFundo.altura,
            (planoDeFundo.x + planoDeFundo.largura), planoDeFundo.y,
            planoDeFundo.largura, planoDeFundo.altura,
        )
    }
}


const chao = {
    spriteX: 0,
    spriteY: 610, 
    largura: 224,
    altura: 112, 
    x: 0,
    y: canvas.height - 112,
    desenha(){
        contexto.drawImage(
            sprites,
            chao.spriteX, chao.spriteY,
            chao.largura, chao.altura,
            chao.x, chao.y,
            chao.largura, chao.altura,
        );
        contexto.drawImage(
            sprites,
            chao.spriteX, chao.spriteY,
            chao.largura, chao.altura,  
            (chao.x + chao.largura), chao.y,
            chao.largura, chao.altura,
        );
    }
};

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
    planoDeFundo.desenha();
    chao.desenha();
    
    requestAnimationFrame(loop); //ajuda a desenhar os quadros na tela infinitamente
}

loop();