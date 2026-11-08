
import { players } from "./stockage.js";
import { affichage, pitch } from "./composition.js";
import { showError, showsuccess } from "./interface.js";

const playerlist = document.querySelector("#playerlist");
const template =document.querySelector(".composition-card-liste");


//afficher players in the side:
affichage(players,playerlist,template);

// afficher nombre de jouer in the aside
document.querySelector("#tachkila-nbr").innerText = players.length;

//afficher players in the pitch
pitch(players);

// const selects = playerlist.querySelectorAll(".player-position-select"); 


playerlist.addEventListener("change",(e)=>{

    //target the select
   let select = e.target;   
     
        let value = select.value; //get the select value
        let playerCard = select.closest(".player-card"); //get the player's div
        let num = playerCard.querySelector(".player-number").innerText; //get the player number
        let checking = document.querySelectorAll(".terrain-position");
        //check if the player is already in the picth:

            let found = false;
            for (let i = 0; i < checking.length; i++) {
                let checkingnbr = checking[i].querySelector(".number").innerText;

            
                if (checkingnbr == num) {
                    found = true;
                    break;
                }
            }

             let path = document.querySelector(`.${value}`);
              if(!found && path.querySelector(".player-name-position").innerText == "libre" || found && value == "bench" ){
                 for(let i=0;i<players.length;i++){
                        console.log("array",players[i].numero)
                        console.log(num)
                        if(players[i].numero == num){
                            players[i].position=value;
                            console.log(players[i]);
                            break;  
                        }
                    }

                }else{
                    showError("this move can't be happen")
                }
               localStorage.setItem("players", JSON.stringify(players));
                 pitch(players);
                 affichage(players,playerlist,template);
                 
})



// let test = document.querySelectorAll(".composition-card-liste");

// playerlist.addEventListener("dragstart",(e)=>{
//      if(e.target.querySelector("player-status").innerText=="blesse"){
//          return;
//     }
   
//     console.log(e.target)
// })