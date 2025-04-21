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
        contexto.fillStyle = '#70c5ce';
        contexto.fillRect(0,0, canvas.width, canvas.height);

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
    pulo: 4.6,
    pula(){
        flappyBird.velocidade = - flappyBird.pulo
    },
    gravidade: 0.25,
    velocidade: 0,

    atualiza(){
        flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;
        flappyBird.y = flappyBird.y + flappyBird.velocidade;
    },

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

const mensagemGetReady = {
    sX: 134,
    sY: 0,
    w: 174,
    h: 152,
    x: (canvas.width / 2) - 174 / 2,
    y: 50,
    desenha(){
        contexto.drawImage(
            sprites,
            mensagemGetReady.sX, mensagemGetReady.sY,
            mensagemGetReady.w, mensagemGetReady.h,
            mensagemGetReady.x, mensagemGetReady.y,
            mensagemGetReady.w, mensagemGetReady.h
        );
    },
};

//Telas

let telaAtiva = {};


function mudaDeTela(novaTela){
    telaAtiva = novaTela
}


const telas={
    inicio:{
        desenha(){
            planoDeFundo.desenha();
            chao.desenha();
            flappyBird.desenha();
            mensagemGetReady.desenha();

        },
        click(){
            mudaDeTela(telas.jogo)
        },
        atualiza(){

        }
    }
}


telas.jogo={
    desenha(){
        planoDeFundo.desenha();
        chao.desenha();
        flappyBird.desenha();
    },
    click(){
        flappyBird.pula();
    },
    atualiza(){
        flappyBird.atualiza();
    }
}


function loop(){ 
    telaAtiva.desenha();
    telaAtiva.atualiza();
    requestAnimationFrame(loop); //ajuda a desenhar os quadros na tela infinitamente
}

window.addEventListener('click', function(){
    if (telaAtiva.click){
        telaAtiva.click();
    }
})

mudaDeTela(telas.inicio)
loop();