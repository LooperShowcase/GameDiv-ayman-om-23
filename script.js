const cardsContainer = document.getElementById("cards");
let cards =[];
let firstcard, secondcard;
 let lockboard = false;
 let score = 0

let scoreboard = document.getElementById("score")
scoreboard.textContent = score
fetch("./data/cards.json")
  .then( (res) => res.json() )
  .then( (data) =>{
    console.log(cards)
    cards = [...data, ...data]
    shufflecards();
    generatecards();
    } 
 )

 function shufflecards(){
    let currentindex = cards.length;
    let randomindex;
    let temporaryValue;

    while ( currentindex >0){
        randomindex =Math.floor(Math.random()*currentindex);
        currentindex -= 1;
        temporaryValue= cards[currentindex];
       cards[currentindex]= cards[randomindex];
        cards[randomindex]=temporaryValue;

    }
   }
   
function generatecards(){
   for(let card of cards){
      const cardElement = document.createElement("div");
      cardElement.classList.add("card");
      cardElement.setAttribute("data-name" , card.name);
      cardElement.innerHTML = `
        <div class="front">
            <img class="front-image" src="${card.image}" />
        </div>
        <div class="back"></div>
        `;
        cardsContainer.appendChild(cardElement);
        cardElement.addEventListener("click" , flipcard);
        cardElement.addEventListener("touchstart" , flipcard);
   }
}
function flipcard(){
   if(lockboard){
      return;
   }
   if(this === firstcard){
      return;
   }
   this.classList.add("flipped");
   if(!firstcard){
      firstcard = this;
      return;
   }
   secondcard = this;

   lockboard = true;
   checkforMatch();
   scoreboard.textContent=score
}
function checkforMatch(){
   if(firstcard.dataset.name === secondcard.dataset.name)
   disablecards();
   
   else unflipcards()
}

function disablecards(){
   firstcard.removeEventListener("click" , flipcard);
   secondcard.removeEventListener("click" , flipcard);
   firstcard.removeEventListener("touchstart" , flipcard);
   secondcard.removeEventListener("touchstart" , flipcard);
  score++;
  if(score === 9)
  startConfetti();
  scoreboard.textContent = score;
  unlockboard();
}
function unflipcards() {
   setTimeout(() => {
      firstcard.classList.remove("flipped");
      secondcard.classList.remove("flipped");
      unlockboard();
   } , 1000)} 
function unlockboard(){
   firstcard=null;
   secondcard=null;
   lockboard=false;
}
function restart(){
   shufflecards()
   unlockboard()
   score=0;
   scoreboard.textContent = score;
   cardsContainer.innerHTML= "";
   generatecards();
   stopConfetti();
}
   