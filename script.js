const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');

const contexto = canvas.getContext('2d');

let frames = 0;

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
            flappyBird.velocidade = - flappyBird.pulo
        },
        gravidade: 0.25,
        velocidade: 0,
    
        atualiza(){
            if(fazColisao(flappyBird, globais.chao)){
                somHit.play();
                mudaDeTela(telas.inicio)
                return;
            }
            flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;
            flappyBird.y = flappyBird.y + flappyBird.velocidade;
        },
        movimentos: [
            {spriteX: 0, spriteY: 0},
            {spriteX: 0, spriteY: 26},
            {spriteX: 0, spriteY: 52},
        ],
        frameAtual: 0,
        atualizarOFrameAtual(){
            const intervaloDeFrames = 10;
            const intervaloPassado = frames % intervaloDeFrames === 0;
            if(intervaloPassado){
                const baseDoIncremento = 1;
                const incremento = baseDoIncremento + flappyBird.frameAtual;
                const baseRepeticao= flappyBird.movimentos.length;
                flappyBird.frameAtual = incremento % baseRepeticao
            }

        },
        desenha(){
            flappyBird.atualizarOFrameAtual();
            const {spriteX, spriteY} = flappyBird.movimentos[flappyBird.frameAtual];
           
            contexto.drawImage(
                sprites,
                spriteX, spriteY,
                flappyBird.largura, flappyBird.altura,
                flappyBird.x, flappyBird.y,
                flappyBird.largura, flappyBird.altura,
            );
        }
    }     
    return flappyBird;
}

function criaCanos(){
    const canos = {
        largura: 52,
        altura: 400,
        chao:{
            spriteX: 0,
            spriteY: 168,
        },
        ceu:{
            spriteX: 52,
            spriteY: 189,
        },
        espaco: 80,
        desenha(){
            canos.pares.forEach(function(par){
                const yRandom = par.y;
                const espacamentoEntreCanos = 90;
                
                const canoCeuX = par.x;
                const canoCeuY = yRandom;
               
                contexto.drawImage(
                    sprites,
                    canos.ceu.spriteX, canos.ceu.spriteY,
                    canos.largura, canos.altura,
                    canoCeuX, canoCeuY,
                    canos.largura, canos.altura,
                )
    
                //Cano do chão
                const canoChaoX = par.x;
                const canoChaoY = canos.altura + espacamentoEntreCanos + yRandom;
                contexto.drawImage(
                    sprites,
                    canos.chao.spriteX, canos.chao.spriteY,
                    canos.largura, canos.altura,
                    canoChaoX, canoChaoY,
                    canos.largura, canos.altura,
                )
            })
         
        },
        temColisaoComOFlappyBird(par){
            if(globais.flappyBird.x >= par.x){
                console.log("Flappy bird invadiu a area dos canos")
            }
            return true;
            return false;
        },
        pares: [],
        atualiza(){
            const passou100Frames = frames % 100 === 0;
            if(passou100Frames){
                canos.pares.push({
                    x: canvas.width,
                    y: -150 * (Math.random()+1),
                });    
            }

            canos.pares.forEach(function(par){
                par.x = par.x - 2;

                if(canos.temColisaoComOFlappyBird(par)){
                }

                if(par.x + canos.largura <= 0){
                    canos.pares.shift();
                }
            });
        },
    };
    return canos;
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
            globais.canos = criaCanos();
        },
        desenha(){
            planoDeFundo.desenha();
            globais.flappyBird.desenha();
            globais.canos.desenha();
            globais.chao.desenha();
            //mensagemGetReady.desenha();

        },
        click(){
            mudaDeTela(telas.jogo)
        },
        atualiza(){
            globais.chao.atualiza();
            globais.canos.atualiza(); 
        }
    }
}


telas.jogo={
    desenha(){
        planoDeFundo.desenha();
        globais.chao.desenha();
        globais.flappyBird.desenha();
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
    frames = frames + 1;
    requestAnimationFrame(loop); 
}

window.addEventListener('click', function(){
    if (telaAtiva.click){
        telaAtiva.click();
    }
})

mudaDeTela(telas.inicio)
loop();