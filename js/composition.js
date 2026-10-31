
import { players } from "./stockage.js";
import { affichage, pitch } from "./joueurs.js";
import { showError, showsuccess } from "./interface.js";

const playerlist = document.querySelector("#playerlist");
const template =document.querySelector(".composition-card-liste");


//afficher players in the side:
affichage(players,playerlist,template);

// afficher nombre de jouer in the aside
document.querySelector("#tachkila-nbr").innerText = players.length;

//afficher players in the pitch
pitch(players);

const selects = playerlist.querySelectorAll(".player-position-select"); 



playerlist.addEventListener("change",(e)=>{

    //target the select
   let select = e.target;   
     
        let value = select.value; //get the select value
        let playerCard = select.closest(".player-card"); //get the player's div
        let poste = playerCard.querySelector(".player-position").innerText; //get the player post
        let num = playerCard.querySelector(".player-number").innerText; //get the player number
        let checking = document.querySelectorAll(".terrain-position");
        //check if the player is already in the picth:

            let found = false;
            for (let i = 0; i < checking.length; i++) {
                let checkingnbr = checking[i].querySelector(".number").innerText;
                // let checkingname = checking[i].querySelector(".player-name-position").innerText;

                console.log(checkingnbr);
                if (checkingnbr == num) {
                    found = true;
                    break;
                }
            }
             let path = document.querySelector(`.${value}`);
              if(!found && path.querySelector(".player-name-position").innerText == "libre"|| found && value=="bench"){
                 for(let i=0;i<players.length;i++){
                        console.log("array",players[i].numero)
                        console.log(num)
                        if(players[i].numero == num){
                            players[i].position=value;
                            console.log(players[i]);
                            break;  
                        }
                    }
                 

                }
               localStorage.setItem("players", JSON.stringify(players));
                 pitch(players);
                 
})



// selects.forEach(select => {
//     select.addEventListener("change", function () {
//         console.log("hey select")
//         let value = select.value; //get the select value
//         let playerCard = select.closest(".player-card"); //get the player's div
//         let poste = playerCard.querySelector(".player-position").innerText; //get the player post
//         let num = playerCard.querySelector(".player-number").innerText; //get the player number
//         console.log(num)
//         console.log(poste)
//         console.log(value)
//         let exist = false;
//         let checking = document.querySelectorAll(".terrain-position");
//         let path = document.querySelector(`.${value}`);

//         for (let j = 0; j < checking.length; j++) {
           
//             //checking if the position can be tooken by the player
//             if (checking[j].value == value && poste == checking[j].poste) {
//                 exist = true;
//                 break;
//             }

//         }
//         console.log(exist);

//         if (exist) {
//             let found = false;
//             for (let i = 0; i < checking.length; i++) {
//                 let checkingnbr = checking[i].querySelector(".number").innerText;
//                 // let checkingname = checking[i].querySelector(".player-name-position").innerText;

//                 console.log(checkingnbr);
//                 console.log("3aaat9ooniii")
//                 if (checkingnbr == num) {
//                     found = true;
//                     break;
//                 }
//             }
//             if (!found && path.querySelector(".player-name-position").innerText == "libre") {
//                 players.forEach(player => {

//                     if (player.numero == num) {
//                         console.log(player)
//                         player.position = value;
//                         localStorage.setItem("players", JSON.stringify(players));
//                         path.querySelector(".player-name-position").innerText = playerCard.querySelector(".player-name").innerText;
//                         path.querySelector(".number").innerText = playerCard.querySelector(".player-number").innerText;
//                         path.querySelector(".number").classList.remove("hidden");
//                         showsuccess("the player is being placed in the pitch with seccess");
//                         pitch(player)
//                     }

//                 });
//             } else {

//                 showError("this position is already exist");
//             }



//         } else {
//             if (value == "bench") {
//                 players.forEach(player => {

//                     if (player.numero == num) {
//                         console.log(player)
//                         console.log(player.position)
//                         let path = document.querySelector(`.${player.position}`);
//                         console.log(path)
//                         player.position = value;
//                         localStorage.setItem("players", JSON.stringify(players));
//                         path.querySelector(".player-name-position").innerText = "libre"
//                         path.querySelector(".number").innerText = ""
//                         path.querySelector(".number").classList.add("hidden");
//                     }

//                 });
//             } else {
//                 showError("this position can not be accepted")
//             }

//         }

//     })


// })