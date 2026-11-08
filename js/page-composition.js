
import { players } from "./stockage.js";
import { affichage, pitch } from "./composition.js";
import { showError, showsuccess } from "./interface.js";

const playerlist = document.querySelector("#playerlist");
const template = document.querySelector(".composition-card-liste");


//afficher players in the side:
affichage(players, playerlist, template);

// afficher nombre de jouer in the aside
document.querySelector("#tachkila-nbr").innerText = players.length;

//afficher players in the pitch
pitch(players);

// const selects = playerlist.querySelectorAll(".player-position-select"); 


playerlist.addEventListener("change", (e) => {

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
    if (!found && path.querySelector(".player-name-position").innerText == "libre" || found && value == "bench") {
        for (let i = 0; i < players.length; i++) {
            console.log("array", players[i].numero)
            console.log(num)
            if (players[i].numero == num) {
                players[i].position = value;

                break;
            }
        }

    } else {
        showError("this move can't be happen")
    }
    localStorage.setItem("players", JSON.stringify(players));
    pitch(players);
    affichage(players, playerlist, template);

})


// drag & drop:

let draggedPlayer = null;
let terrain = document.querySelector(".football-pitch")


// add dragstart event
playerlist.addEventListener("dragstart", (e) => {

    //target the closest player card
    let card = e.target.closest(".player-card");
    draggedPlayer = card.querySelector(".player-number").innerText;
    e.dataTransfer.setData("text/plain", draggedPlayer);
})

// add dragover event
terrain.addEventListener("dragover", (e) => {
    e.preventDefault();

})


console.log(players)
// add drop event
terrain.addEventListener("drop", (e) => {

    e.preventDefault();


    let num = e.dataTransfer.getData("text/plain");
    let path = e.target.closest(".terrain-position");
    if (!path) return;
    let value = path.dataset.position;

    let player = players.find(p => p.numero == num);

    // check the poste of the player with the poste position :

    if (player.post === path.dataset.post) {
        // Allow the drop

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

        if (!found && path.querySelector(".player-name-position").innerText == "libre" || found && value == "bench") {
            for (let i = 0; i < players.length; i++) {
                console.log("array", players[i].numero)

                if (players[i].numero == num) {
                    players[i].position = value;
                    if (players[i].status == "En blesse") {
                        console.log("heey")
                        showError("you can't place a blesse player in the pitch")
                    } else {
                        showsuccess("the player is placed successfully")
                    }
                    break;
                }
            }

        } else {
            showError("this move can't be happen")
        }


    } else {
        showError("You can't drop this player in this position");
    }


    localStorage.setItem("players", JSON.stringify(players));
    pitch(players);
    affichage(players, playerlist, template);



})



// let do the oppesite & take the player out


// add dragstart event:
terrain.addEventListener("dragstart", (e) => {

    //target the closest player card
    let position = e.target.closest(".terrain-position");
    draggedPlayer = position.querySelector(".number").innerText;
    e.dataTransfer.setData("text/plain", draggedPlayer);
})


// add dragover event:
playerlist.addEventListener("dragover", (e) => {
    e.preventDefault();
})


// add drop event:
playerlist.addEventListener("drop", (e) => {
    e.preventDefault();
    let num = e.dataTransfer.getData("text/plain");
    let player = players.find(player => player.numero == num);
    player.position = "bench";

    localStorage.setItem("players", JSON.stringify(players));
    pitch(players);
    affichage(players, playerlist, template);
    showsuccess("the player is out from the pitch");
})