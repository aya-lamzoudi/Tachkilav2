
import { players } from "./stockage.js";
import { addplayer , pitch} from "./joueurs.js";


const aside = document.querySelector(".side-container");
console.log(players);

pitch(players); //afficher players in the pitch

players.forEach(player => {
    const newplayer = document.querySelector("#playerlist").cloneNode(true); 
    addplayer(player,newplayer,aside);
    console.log(player)
});
//  document.querySelector("#tachkila-nbr").innerText = players.length;



