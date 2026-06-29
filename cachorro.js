const linkAtual = window.location.href;
const itensMenu = document.querySelectorAll('.paginas a');

itensMenu.forEach(link => {
  if (linkAtual.endsWith(link.getAttribute('href'))) {
    link.classList.add('ativo');
  }
});

const osso = document.getElementById('item-arremesso');
let segurando = false;
let posX = 100, posY = 100;
let velX = 0, velY = 0;
let lastMouseX, lastMouseY;
const gravidade = 1;

let angulo = 0;
let velAngulo = 0;

osso.addEventListener('mousedown', (e) => {
  segurando = true;
  velX = 0; 
  velY = 0;
  velAngulo = 0;
});

window.addEventListener('mousemove', (e) => {
  if (segurando) {
    velX = e.clientX - lastMouseX;
    velY = e.clientY - lastMouseY;
    
    velAngulo = velX * 0.5;

    posX = e.clientX - 60;
    posY = e.clientY - 30;
    
    angulo += velAngulo;
    atualizarPosicao();
  }
  lastMouseX = e.clientX;
  lastMouseY = e.clientY;
});

window.addEventListener('mouseup', () => {
  segurando = false;
});

function animar() {
  if (!segurando) {
    velY += gravidade;
    posX += velX;
    posY += velY;
    
    angulo += velAngulo;

    velX *= 0.99;
    velY *= 0.99;
    velAngulo *= 0.98;

    if (posX + 120 > window.innerWidth || posX < 0) {
        velX *= -0.7;
        velAngulo = velY * 0.5;
        posX = posX < 0 ? 0 : window.innerWidth - 120;
    }
    
    if (posY + 60 > window.innerHeight) {
        velY *= -0.6;
        velAngulo = velX * 0.5;
        posY = window.innerHeight - 60;
        if (Math.abs(velY) < 2) {
            velY = 0;
            velAngulo *= 0.9;
        }
    } else if (posY < 0) {
        velY *= -0.7;
        velAngulo = velX * 0.5;
        posY = 0;
    }
    atualizarPosicao();
  }
  requestAnimationFrame(animar);
}

function atualizarPosicao() {
  osso.style.left = posX + 'px';
  osso.style.top = posY + 'px';
  osso.style.transform = `rotate(${angulo}deg)`;
}

animar();

let contador = 0;

function clickar(){
  contador++;
  
  let ver = parseInt(localStorage.getItem('jaAcessou')) || 0;
  const mentira = document.querySelector('.mentira');

  if(contador === 1 && ver === 0){
    window.location.href = "segredo.html";
    contador = 0;
    ver = 1;
    localStorage.setItem('jaAcessou', '1');
    return;
  }
  else if(contador === 1 && ver === 1){
    alert("te avisei");
    ver = 0;
    localStorage.setItem('jaAcessou', '0');
    contador = 0;
    return;
  }
}

const botao = document.querySelector('#segredo');

if(botao){
  botao.addEventListener('click', clickar);
}