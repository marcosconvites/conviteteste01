const botaoAbrir=document.getElementById('abertura');
const abertura=document.getElementById('abertura');
const convite=document.getElementById('convite');
const musicaConvite=document.getElementById('musicaConvite');
const controleMusica=document.getElementById('controleMusica');
let aberturaEmAndamento=false;
let musicaDisponivel=Boolean(musicaConvite && musicaConvite.querySelector('source'));
function atualizarControle(){
  if(!controleMusica)return;
  controleMusica.classList.remove('escondido');
  controleMusica.setAttribute('aria-pressed',String(!musicaConvite.paused));
  controleMusica.innerHTML=musicaConvite.paused?'♫ <span>Música pausada</span>':'♫ <span>Música ligada</span>';
}
function iniciarMusica(){
  if(!musicaDisponivel)return;
  musicaConvite.volume=.28;
  const tentativa=musicaConvite.play();
  if(tentativa)tentativa.then(atualizarControle).catch(()=>atualizarControle());
}
controleMusica.addEventListener('click',()=>{
  if(!musicaDisponivel){alert('A música ainda não foi adicionada a este convite.');return;}
  if(musicaConvite.paused)iniciarMusica();else musicaConvite.pause();
  atualizarControle();
});
function abrirConvite(){
  if(aberturaEmAndamento)return;
  aberturaEmAndamento=true;
  iniciarMusica();
  abertura.classList.add('abrindo');
  abertura.setAttribute('aria-busy','true');
  botaoAbrir.setAttribute('aria-disabled','true');
  setTimeout(()=>{
    abertura.classList.add('escondido');abertura.style.display='none';
    convite.classList.remove('escondido');convite.setAttribute('aria-hidden','false');
    controleMusica.classList.remove('escondido');window.scrollTo({top:0,behavior:'smooth'});
    aberturaEmAndamento=false;
  },950);
}
botaoAbrir.addEventListener('click',abrirConvite);
botaoAbrir.addEventListener('keydown',(evento)=>{
  if(evento.key==='Enter'||evento.key===' '){evento.preventDefault();abrirConvite();}
});
document.getElementById('voltar').addEventListener('click',()=>{
  musicaConvite.pause();convite.classList.add('escondido');convite.setAttribute('aria-hidden','true');
  abertura.classList.remove('escondido','abrindo');abertura.style.display='';
  botaoAbrir.removeAttribute('aria-disabled');controleMusica.classList.add('escondido');
  window.scrollTo({top:0,behavior:'smooth'});
});
const dataCasamento=new Date('2027-09-18T16:30:00-03:00');
function atualizarContagem(){
 let segundos=Math.max(0,Math.floor((dataCasamento-Date.now())/1000));
 document.getElementById('dias').textContent=Math.floor(segundos/86400);
 document.getElementById('horas').textContent=String(Math.floor(segundos%86400/3600)).padStart(2,'0');
 document.getElementById('minutos').textContent=String(Math.floor(segundos%3600/60)).padStart(2,'0');
 document.getElementById('segundos').textContent=String(segundos%60).padStart(2,'0');
}
atualizarContagem();setInterval(atualizarContagem,1000);
