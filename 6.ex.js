
//variables globales

const url = "http://localhost:3000/characters";
const arena$$ = document.querySelector('[data-function="arena"]');
const carts$$ = document.querySelector('[data-function="characters"]');
const title$$ = document.querySelector('[data-function="title"]');
let contVidaP1;
let contVidap2;
let player1;
let player2;
let gamePlayer;
let scoreNeto2;
let scoreNeto1;
let primRonda = true
// generador de numeros aleatorios

const random= (max,min)=>{
   const number = parseInt(Math.random() * (max-min+1) +min)
   return number;
}

// peticion de datos a la api

/* const getCarts = async () => {
  const res = await fetch(url);
  const carts = await res.json();
  printCarts(carts);
};
 */

console.log(carts.characters)
//getCarts();

// pintamos todos los posibles luchadores 

const printCarts = (carts) => {
  gamePlayer = 0;
  for (const cart of carts) {
    const div$$ = document.createElement("div");
    const img$$ = document.createElement("img");
    const h3name$$ = document.createElement("h3");
    const h5defense$$ = document.createElement("h5");
    const h5vitality$$ = document.createElement("h5");
    const btn$$ = document.createElement("button");
    btn$$.innerHTML = "Select";
    btn$$.classList.add("btn-cards");
    div$$.classList.add("c-characters__item");

    h3name$$.innerHTML = cart.name;
    img$$.src = cart.avatar;
    h5vitality$$.innerHTML = "VITALITY " + " : " + cart.vitality;
    h5defense$$.innerHTML = "DEFENSE " + " : " + cart.defense;

    div$$.appendChild(h3name$$);
    div$$.appendChild(img$$);
    div$$.appendChild(h5vitality$$);
    div$$.appendChild(h5defense$$);
    div$$.appendChild(btn$$);
    carts$$.appendChild(div$$);
    btn$$.addEventListener("click", () => {
      gamePlayer++;
      const h2$$ = document.querySelector("h2");
      h2$$.style.visibility = "visible";
      if (gamePlayer >= 2) {
        carts$$.style.display = "none";
        title$$.style.display = "none";
      } else if (gamePlayer === 1) {
        title$$.innerHTML = "SELECCIONA EL RIVAL";
        title$$.style.color = "red";
      }

      btn$$.innerHTML = "Selected";
      btn$$.classList.add("btn-Selected");
      btn$$.disabled = true;

      addCartToArena(cart);
    });
  }
};
printCarts(carts.characters);
// seleccionamos que jugador se añade a la arena y construimos el marcador

function addCartToArena(param) {
  if (player1 === undefined) {
    player1 = param;
    readyToArena(player1);
  } else {
    const btn$$ = document.createElement("button");
    btn$$.innerHTML = "Luchar";
    btn$$.classList.add("btn-cards");
    arena$$.appendChild(btn$$);
    const divMarc$$ = document.createElement("div");
    divMarc$$.classList.add("marcador");
    const h4$$ = document.createElement("h4");
    h4$$.innerHTML = 'Pulsa "luchar"';
    h4$$.setAttribute("data-function", "tirada");
    divMarc$$.appendChild(h4$$);
    divMarc$$.setAttribute("data-function", "marcador");
    arena$$.appendChild(divMarc$$);
    btn$$.addEventListener("click", () => {
      battle(btn$$);
    });
    player2 = param;
    readyToArena(player2);
  }
}

// agregamos los luchadores a la arena

function readyToArena(cart) {
  
  const div$$ = document.createElement("div");
  const img$$ = document.createElement("img");
  const h3name$$ = document.createElement("h3");
  const h5defense$$ = document.createElement("h5");
  const h5vitality$$ = document.createElement("h5");
  div$$.classList.add("c-characters__item");

  h3name$$.innerHTML = cart.name;
  img$$.src = cart.avatar;
  h5vitality$$.innerHTML = "VITALITY   : " + cart.vitality;
  h5vitality$$.setAttribute("value",cart.vitality)
  h5defense$$.innerHTML =  "DEFENSE    : " + cart.defense;

  div$$.appendChild(h3name$$);
  div$$.appendChild(img$$);
  div$$.appendChild(h5vitality$$);
  div$$.appendChild(h5defense$$);
  div$$.classList.add('.bisque')
  arena$$.classList.add("arena");
  arena$$.appendChild(div$$);
  if (gamePlayer === 1){
    div$$.setAttribute("data-function","player1");
    h5defense$$.setAttribute("data-function","def-p1");
    h5vitality$$.setAttribute("data-function","vit-p1");
  }else{
    div$$.setAttribute("data-function","player2");
    h5defense$$.setAttribute("data-function","def-p2");
    h5vitality$$.setAttribute("data-function","vit-p2");
  }
}

// tirada de dados

const getScore = (player, numeroDeDados) => {
  let valueTotalRolls = 1;

  for (let i = 0; i < numeroDeDados.length; i++) {
    const tiradayvalor = numeroDeDados[i].split("d");
    const numDeTiradas = tiradayvalor[0];
    const valormax = tiradayvalor[1];
    for (let j = 1; j <= numDeTiradas; j++) {
      let tirada = random(valormax, 1);
      if (tirada == player.critic) {
        tirada *= 2;
      }
      valueTotalRolls += tirada;
    }
  }
  return valueTotalRolls;
};


const battle = (btn$$)=>{
  btn$$.disabled = true; /////////////////////////////////////////////////////boton
  const player1$$ = document.querySelector('[data-function="player1"]');
  const player2$$ = document.querySelector('[data-function="player2"]');
  player1$$.classList.add("bisque");
  player2$$.classList.add("bisque");
  console.log("jugador 1 ", player1$$);
  console.log("jugador 2 ", player2$$);
  console.log(player1);
  console.log(player2);
  const marcador$$ = document.querySelector('[data-function="marcador"]');

  
  if (primRonda) {
    contVidaP1 = player1.vitality;
    contVidap2 = player2.vitality;
    primRonda = false;
  }
 
   /// player 1
  

  const vitp2$$ = document.querySelector('[data-function="vit-p2"]');
  const vitp1$$ = document.querySelector('[data-function="vit-p1"]');
  const damage1 = player1.damage;
  const totalScore1 = getScore(player1, damage1);
  console.log("puntacion total de player 1 es ", totalScore1);
//debugger
  scoreNeto1 = totalScore1 - player2.defense;
  contVidap2 = contVidap2 - scoreNeto1;
  
  vitp2$$.innerHTML = "VITALITY  : " + contVidap2;
  vitp2$$.classList.add('green');
  
  if (contVidap2<150){
    vitp2$$.classList.add('orange');
  }  
  if (contVidap2<100){
    vitp2$$.classList.add('red');
  } 
    
 
   //player 2
   
  const damage2 = player2.damage;
  const totalScore2 = getScore(player2, damage2);
  console.log("puntuacion total de player 2 es ", totalScore2);

  scoreNeto2 = totalScore2 - player1.defense;
  contVidaP1 = contVidaP1 - scoreNeto2;
  vitp1$$.innerHTML = "VITALITY " + " : " + contVidaP1;
  vitp1$$.classList.add('green');
  
  if (contVidaP1<150){
    vitp1$$.classList.add('orange');
  } 
  if (contVidaP1<100){
    vitp1$$.classList.add('red');
  }
 
 btn$$.innerHTML = "Luchar de nuevo";
 btn$$.disabled = false;
 marcador$$.innerHTML = "NUEVA RONDA "
 const divFinal$$ = document.createElement('div');

 if (contVidaP1 < 0 && contVidaP1 < contVidap2){
  marcador$$.innerHTML = "Ha vencido el  " + player2.name; 
  marcador$$.classList.add('big');
  divFinal$$.innerHTML = "VIDA RESTANTE : " + contVidap2;
  marcador$$.appendChild(divFinal$$);
  btn$$.style.visibility="hidden";
  endGame(marcador$$)
 }else if (contVidap2 < 0 && contVidap2 < contVidaP1){
  marcador$$.innerHTML = "Ha vencido el " + player1.name;  
  marcador$$.classList.add('big');
  divFinal$$.innerHTML = "VIDA RESTANTE : " + contVidaP1;
  marcador$$.appendChild(divFinal$$);
  btn$$.style.visibility="hidden";
  endGame(marcador$$)
  
 }


}

const endGame = (marcador$$)=>{
  const btn2$$ = document.createElement('button');
  btn2$$.innerHTML = 'NUEVA PARTIDA'
  btn2$$.classList.add('btn-cards') 
  marcador$$.appendChild(btn2$$);
  btn2$$.addEventListener('click', ()=>{location.reload()})
}
