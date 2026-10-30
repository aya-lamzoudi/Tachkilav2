//jouer functions

import { players } from "./stockage.js";

export function addplayer(player, newplayer, aside) {

    newplayer.querySelector(".player-number").innerText = player.numero;
    newplayer.querySelector(".player-name").innerText = player.nom;
    newplayer.querySelector(".player-poste").innerText = player.post;
    //add color

    if (player.post == "Attaquant") {
        newplayer.querySelector(".player-card").classList.toggle("border-[#d75241]");
        newplayer.querySelector(".player-number").classList.toggle("border-[#d75241]");
        newplayer.querySelector(".player-poste").classList.toggle("text-[#d75241]");
        console.log("hey");
        newplayer.querySelector("select").innerHTML = `
                   <option value="bench" selected>Sur le banc</option>
                   <option value="BU1">BU - Buteur 1</option>
                   <option value="BU2">BU - Buteur 2</option>
        `
    } else if (player.post == "Milieu") {
        newplayer.querySelector(".player-card").classList.toggle("border-[#20d244]");
        newplayer.querySelector(".player-number").classList.toggle("border-[#20d244]");
        newplayer.querySelector(".player-poste").classList.toggle("text-[#20d244]");
        newplayer.querySelector("select").innerHTML = `
                  <option value="bench" selected>Sur le banc</option>
                  <option value="MG">MG - Milieu gauche</option>
                  <option value="MC1">MC - Milieu central 1</option>
                  <option value="MC2">MC - Milieu central 2</option>
                  <option value="MD">MD - Milieu droit</option>
        `
    } else if (player.post == "Defenseur") {
        newplayer.querySelector(".player-card").classList.toggle("border-[#3AC8EF]");
        newplayer.querySelector(".player-number").classList.toggle("border-[#3AC8EF]");
        newplayer.querySelector(".player-poste").classList.toggle("text-[#3AC8EF]");
        newplayer.querySelector("select").innerHTML = `
                  <option value="bench" selected>Sur le banc</option>
                  <option value="DG">DG - Défenseur gauche</option>
                  <option value="DC1">DC - Défenseur central 1</option>
                  <option value="DC2">DC - Défenseur central 2</option>
                  <option value="DD">DD - Défenseur droit</option>
                 
        `
    } else if (player.post == "Gardien") {
        newplayer.querySelector(".player-card").classList.toggle("border-orange-400");
        newplayer.querySelector(".player-number").classList.toggle("border-orange-400");
        newplayer.querySelector(".player-poste").classList.toggle("text-orange-400");
        newplayer.querySelector("select").innerHTML = `
                  <option value="bench" selected>Sur le banc</option>
                  <option value="GB">GB - Gardien</option>
        `
    }
    /////

    newplayer.classList.toggle("hidden");
    console.log(aside)
    aside.appendChild(newplayer);

    document.querySelector("#tachkila-nbr").innerText = players.length;

    // add event lesener to the select

    newplayer.addEventListener("change", function () {

        let value = newplayer.querySelector("select").value; //get the select value

        let playerCard = newplayer.querySelector(".player-card"); //get the player's div

        let poste = newplayer.querySelector(".player-poste").innerText; //get the player post
        let num = newplayer.querySelector(".player-number").innerText; //get the player number

        let exist = false;
        let checking = document.querySelectorAll(".terrain-position");
        let path = document.querySelector(`.${value}`);

        for (let j = 0; j < check.length; j++) {

            //check if the position can be tooken by the player
            if (checking[j].value == value && poste == checking[j].poste) {
                exist = true;
                break;
            }

        }
        console.log(exist);

        if (exist) {
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
            if (!found && path.querySelector(".player-name-position").innerText == "libre") {
                players.forEach(player => {

                    if (player.numero == num) {
                        console.log(player)
                        player.position = value;
                        localStorage.setItem("players", JSON.stringify(players));
                        path.querySelector(".player-name-position").innerText = playerCard.querySelector(".player-name").innerText;
                        path.querySelector(".number").innerText = playerCard.querySelector(".player-number").innerText;
                        path.querySelector(".number").classList.remove("hidden");

                        showsuccess("the player is being placed in the pitch with seccess");


                    }

                });
            } else {

                showError("this position is already exist");
            }


        } else {
            if (value == "bench") {
                players.forEach(player => {

                    if (player.numero == num) {
                        console.log(player)
                        console.log(player.position)
                        let path = document.querySelector(`.${player.position}`);
                        console.log(path)
                        player.position = value;
                        localStorage.setItem("players", JSON.stringify(players));
                        path.querySelector(".player-name-position").innerText = "libre"
                        path.querySelector(".number").innerText = ""
                        path.querySelector(".number").classList.add("hidden");
                    }

                });
            } else {
                showError("this position can not be accepted")
            }

        }

    })

}

// edit player

export function editplayer(player) {
    let findplayer = document.querySelectorAll(".player-card");
    findplayer.forEach(found => {
        let num = found.querySelector(".player-number").innerText;
        if (num == oldnumber) {
            found.querySelector(".player-number").innerText = player.numero;
            found.querySelector(".player-name").innerText = player.nom;
            found.querySelector(".player-poste").innerText = player.post;


            // remove previous coolors
            const card = found;
            const number = found.querySelector(".player-number");
            const poste = found.querySelector(".player-poste");
            card.classList.remove(
                "border-[#d75241]",
                "border-[#20d244]",
                "border-[#3AC8EF]",
                "border-orange-400"
            );

            number.classList.remove(
                "border-[#d75241]",
                "border-[#20d244]",
                "border-[#3AC8EF]",
                "border-orange-400"
            );

            poste.classList.remove(
                "text-[#d75241]",
                "text-[#20d244]",
                "text-[#3AC8EF]",
                "text-orange-400"
            );

            //add color

            if (player.post == "Attaquant") {
                found.classList.add("border-[#d75241]");
                found.querySelector(".player-number").classList.add("border-[#d75241]");
                found.querySelector(".player-poste").classList.add("text-[#d75241]");

            } else if (player.post == "Milieu") {
                found.classList.toggle("border-[#20d244]");
                found.querySelector(".player-number").classList.toggle("border-[#20d244]");
                found.querySelector(".player-poste").classList.toggle("text-[#20d244]");
            } else if (player.post == "Defenseur") {
                found.classList.toggle("border-[#3AC8EF]");
                found.querySelector(".player-number").classList.toggle("border-[#3AC8EF]");
                found.querySelector(".player-poste").classList.toggle("text-[#3AC8EF]");
            } else if (player.post == "Gardien") {
                found.classList.toggle("border-orange-400");
                found.querySelector(".player-number").classList.toggle("border-orange-400");
                found.querySelector(".player-poste").classList.toggle("text-orange-400");
            }
            /////
        }
    });
}
//aficher player in the pitch

export function pitch(players) {
    players.forEach(player => {

        if (player.position != "bench") {
            let path = document.querySelector(`.${player.position}`);
            if (path) {
                path.querySelector(".player-name-position").innerText = player.nom
                path.querySelector(".number").innerText = player.numero;
                path.querySelector(".number").classList.remove("hidden");
            }

        }
    });
}


// export function affichage(players,card,aside){

// players.forEach(player => {
//     card.querySelector(".player-number")=player.numero;
//     aside.appendChild(card)
// });
// }


export function affichage(players, liste) {
    players.forEach(player => {

        const card = document.querySelector(".player-card-effective").cloneNode(true);
        card.querySelector(".player-number-effective").innerText = player.numero;
        card.querySelector(".player-name-effective").innerText = player.nom;
        card.querySelector(".player-position-effective").innerText = player.post;
        card.querySelector("#player-age").innerText = player.age;

        //check colors:

        if (player.post == "Attaquant") {
            card.classList.toggle("border-[#d75241]");
            card.querySelector(".player-number-effective").classList.toggle("border-[#d75241]");
            card.querySelector(".player-position-effective").classList.toggle("text-[#d75241]");


        } else if (player.post == "Milieu") {
            card.classList.toggle("border-[#20d244]");
            card.querySelector(".player-number-effective").classList.toggle("border-[#20d244]");
            card.querySelector(".player-position-effective").classList.toggle("text-[#20d244]");

        } else if (player.post == "Defenseur") {
            card.classList.toggle("border-[#3AC8EF]");
            card.querySelector(".player-number-effective").classList.toggle("border-[#3AC8EF]");
            card.querySelector(".player-position-effective").classList.toggle("text-[#3AC8EF]");

        } else if (player.post == "Gardien") {
            card.classList.toggle("border-orange-400");
            card.querySelector(".player-number-effective").classList.toggle("border-orange-400");
            card.querySelector(".player-position-effective").classList.toggle("text-orange-400");

        }
        card.classList.remove("hidden")
        liste.appendChild(card);


    });
}