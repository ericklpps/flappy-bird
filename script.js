const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

const somHit = new Audio();
somHit.src = './sons/hit.wav'

const somPulo = new Audio();
somPulo.src = './sons/pulo.wav'

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

function criaChao(){
    const chao = {
        spriteX: 0,
        spriteY: 610, 
        largura: 224,
        altura: 112, 
        x: 0,
        y: canvas.height - 112,
        atualiza(){
            const movimentoDoChao =1;
            const repeteEm = chao.largura / 2;
            const movimentacao = chao.x - movimentoDoChao;
            chao.x = movimentacao % repeteEm;
        },
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
    return chao
}


function fazColisao(flappyBird, chao){
    const flappyBirdY = flappyBird.y + flappyBird.altura
    const chaoY = chao.y

    if(flappyBirdY >= chaoY){
        return true
    }
    return false
}

function criaFlappyBird(){
    const flappyBird = {
        spriteX: 0,
        spriteY : 0,
        largura: 33, 
        altura: 24, 
        x: 10,
        y: 50,
        pulo: 4.6,
        pula(){
            somPulo.play();
            console.log('pular');
            console.log('Antes '+ flappyBird.velocidade)
            flappyBird.velocidade = - flappyBird.pulo
            console.log('Depois ' + flappyBird.velocidade)
        },
        gravidade: 0.25,
        velocidade: 0,
    
        atualiza(){
            if(fazColisao(flappyBird, chao)){
                console.log('Fez colisão');
                somHit.play();
                mudaDeTela(telas.inicio)
                return;
            }
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
    return flappyBird;
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
let globais = {};
let telaAtiva = {};


function mudaDeTela(novaTela){
    telaAtiva = novaTela
    if(telaAtiva.inicializa){
        telaAtiva.inicializa();
    }
}


const telas={
    inicio:{
        inicializa(){
            globais.flappyBird = criaFlappyBird();
            globais.chao = criaChao();
        },
        desenha(){
            planoDeFundo.desenha();
            globais.chao.desenha();
            globais.flappyBird.desenha();
            mensagemGetReady.desenha();

        },
        click(){
            mudaDeTela(telas.jogo)
        },
        atualiza(){
            globais.chao.atualiza();
        }
    }
}


telas.jogo={
    desenha(){
        planoDeFundo.desenha();
        chao.desenha();
        globais.flappyBird.desenha();
        globais.chao.desenha();
    },
    click(){
        globais.flappyBird.pula();
    },
    atualiza(){
        globais.flappyBird.atualiza();
        globais.chao.atualiza();
    }
}


function loop(){ 
    telaAtiva.desenha();
    telaAtiva.atualiza();
    requestAnimationFrame(loop); 
}

window.addEventListener('click', function(){
    if (telaAtiva.click){
        telaAtiva.click();
    }
})

mudaDeTela(telas.inicio)
loop();