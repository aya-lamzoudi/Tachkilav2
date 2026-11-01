//jouer functions



//aficher player in the pitch

export function pitch(players) {
    //reset all html to none:

    document.querySelectorAll(".number").forEach(element => {
        element.innerHTML = "";
        element.classList.add("hidden");
    });

    document.querySelectorAll(".player-name-position").forEach(element => {
        element.innerHTML = "libre";
    });


    // add the player to the pitch
    players.forEach(player => {

        if (player.position != "bench") {


            let path = document.querySelector(`.${player.position}`);
            if (path) {
                path.querySelector(".player-name-position").innerText = player.nom
                path.querySelector(".number").innerText = player.numero;
                path.querySelector(".number").classList.remove("hidden");
                console.log(player.position)
            }

        }
    });
}


// afficher les jouer in page effective:
export function affichage(players, liste, template) {
    liste.innerHTML = ``;
    players.forEach(player => {
        const clone = template.content.cloneNode(true);
        const card = clone.querySelector(".player-card");

        card.querySelector(".player-number").innerText = player.numero;
        card.querySelector(".player-name").innerText = player.nom;
        card.querySelector(".player-position").innerText = player.post;
        if (template.id == "effectif") {
            card.querySelector("#player-age").innerText = player.age;
            card.querySelector(".player-status").innerText = player.status;

            if (player.capitane) {
                card.querySelector(".captain-btn").classList.add("bg-purple-500");
                card.querySelector(".captain-btn").classList.remove("hover:text-purple-500");
                card.querySelector(".captain-badge ").classList.remove("hidden")
            }
            statistique(players)
        }

        //check colors:

        if (player.post == "Attaquant") {
            card.classList.toggle("border-[#d75241]");
            card.querySelector(".player-number").classList.toggle("border-[#d75241]");
            card.querySelector(".player-position").classList.toggle("text-[#d75241]");
            if (template.id == "composition") {
                card.querySelector("select").innerHTML = `
                   <option value="bench" >Sur le banc</option>
                   <option value="BU1">BU - Buteur 1</option>
                   <option value="BU2">BU - Buteur 2</option>
                  `
                card.querySelector("select").value = player.position;
            }

        } else if (player.post == "Milieu") {
            card.classList.toggle("border-[#20d244]");
            card.querySelector(".player-number").classList.toggle("border-[#20d244]");
            card.querySelector(".player-position").classList.toggle("text-[#20d244]");
            if (template.id == "composition") {
                card.querySelector("select").innerHTML = `
                  <option value="bench" >Sur le banc</option>
                  <option value="MG">MG - Milieu gauche</option>
                  <option value="MC1">MC - Milieu central 1</option>
                  <option value="MC2">MC - Milieu central 2</option>
                  <option value="MD">MD - Milieu droit</option>
                  `
                card.querySelector("select").value = player.position;
            }

        } else if (player.post == "Defenseur") {
            card.classList.toggle("border-[#3AC8EF]");
            card.querySelector(".player-number").classList.toggle("border-[#3AC8EF]");
            card.querySelector(".player-position").classList.toggle("text-[#3AC8EF]");
            if (template.id == "composition") {
                card.querySelector("select").innerHTML = `
                  <option value="bench" >Sur le banc</option>
                  <option value="DG">DG - Défenseur gauche</option>
                  <option value="DC1">DC - Défenseur central 1</option>
                  <option value="DC2">DC - Défenseur central 2</option>
                  <option value="DD">DD - Défenseur droit</option>
                  `
                card.querySelector("select").value = player.position;
            }
        } else if (player.post == "Gardien") {
            card.classList.toggle("border-orange-400");
            card.querySelector(".player-number").classList.toggle("border-orange-400");
            card.querySelector(".player-position").classList.toggle("text-orange-400");
            if (template.id == "composition") {
                card.querySelector("select").innerHTML = `
                    <option value="bench" selected>Sur le banc</option>
                  <option value="GB">GB - Gardien</option>
                  `
                card.querySelector("select").value = player.position;
            }
        }



        card.classList.remove("hidden")
        liste.appendChild(card);



    });
}



// //filtre les jour par poste:

// export function filter(players, liste, template) {
//     liste.innerHTML = ``;
//     players.forEach(player => {
//         const clone = template.content.cloneNode(true);
//         const card = clone.querySelector(".player-card");


//         card.querySelector(".player-number").innerText = player.numero;
//         card.querySelector(".player-name").innerText = player.nom;
//         card.querySelector(".player-position").innerText = player.post;
//         if (template.id == "effective") {
//             card.querySelector("#player-age").innerText = player.age;
//             card.querySelector(".player-status").innerText = player.status;
//         }



//         //check colors:

//         if (player.post == "Attaquant") {
//             card.classList.toggle("border-[#d75241]");
//             card.querySelector(".player-number").classList.toggle("border-[#d75241]");
//             card.querySelector(".player-position").classList.toggle("text-[#d75241]");
//             if (template.id == "composition") {
//                 card.querySelector("select").innerHTML = `
//                    <option value="bench" selected>Sur le banc</option>
//                    <option value="BU1">BU - Buteur 1</option>
//                    <option value="BU2">BU - Buteur 2</option>
//                   `
//             }

//         } else if (player.post == "Milieu") {
//             card.classList.toggle("border-[#20d244]");
//             card.querySelector(".player-number").classList.toggle("border-[#20d244]");
//             card.querySelector(".player-position").classList.toggle("text-[#20d244]");
//             if (template.id == "composition") {
//                 card.querySelector("select").innerHTML = `
//                   <option value="bench" selected>Sur le banc</option>
//                   <option value="MG">MG - Milieu gauche</option>
//                   <option value="MC1">MC - Milieu central 1</option>
//                   <option value="MC2">MC - Milieu central 2</option>
//                   <option value="MD">MD - Milieu droit</option>
//                   `
//             }

//         } else if (player.post == "Defenseur") {
//             card.classList.toggle("border-[#3AC8EF]");
//             card.querySelector(".player-number").classList.toggle("border-[#3AC8EF]");
//             card.querySelector(".player-position").classList.toggle("text-[#3AC8EF]");
//             if (template.id == "composition") {
//                 card.querySelector("select").innerHTML = `
//                     <option value="bench" selected>Sur le banc</option>
//                   <option value="DG">DG - Défenseur gauche</option>
//                   <option value="DC1">DC - Défenseur central 1</option>
//                   <option value="DC2">DC - Défenseur central 2</option>
//                   <option value="DD">DD - Défenseur droit</option>
//                   `
//             }
//         } else if (player.post == "Gardien") {
//             card.classList.toggle("border-orange-400");
//             card.querySelector(".player-number").classList.toggle("border-orange-400");
//             card.querySelector(".player-position").classList.toggle("text-orange-400");
//             if (template.id == "composition") {
//                 card.querySelector("select").innerHTML = `
//                     <option value="bench" selected>Sur le banc</option>
//                   <option value="GB">GB - Gardien</option>
//                   `
//             }
//         }
//         card.classList.remove("hidden")
//         liste.appendChild(card);


//     });
// }


//statistique

export function statistique(players) {

    let cards = document.querySelector(".statistique");
    cards.querySelector(".totale-nbr").innerText = players.length;
    //  let f=0;
    //  let b=0;
    // players.forEach(player=>{
    //     if(player.status=="En blesse") {
    //      b++;
    //     }else{
    //         f=f+1
    //     }
    // })
    cards.querySelector(".form-nbr").innerText = players.filter(player => player.status == "En form").length;
    cards.querySelector(".blesse-nbr").innerText = players.filter(player => player.status === "En blesse").length;
    cards.querySelector(".age-moyen").innerText = (players.reduce((acc, player) => acc + Number(player.age), 0) / players.length).toFixed(2) + " ans"
}