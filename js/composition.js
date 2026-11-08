


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
        console.log("test", player.status)

        if (player.status == "En blesse") {
            player.position = "bench"
        }

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
    localStorage.setItem("players", JSON.stringify(players));

}

// afficher les jouer in page composition:

export function affichage(players, liste, template) {

    liste.innerHTML = ``;

    players.forEach(player => {
        const clone = template.content.cloneNode(true);
        const card = clone.querySelector(".player-card");

        card.querySelector(".player-number").innerText = player.numero;
        card.querySelector(".player-name").innerText = player.nom;
        card.querySelector(".player-position").innerText = player.post;

        //add colors:

        if (player.post == "Attaquant") {
            let html = `
                   <option value="bench" selected >Sur le banc</option>
                   <option value="BU1">BU - Buteur 1</option>
                   <option value="BU2">BU - Buteur 2</option>
                  `
            card.querySelector("select").value = player.position;
            console.log(player.position)
            colors(card, "border-[#d75241]", "text-[#d75241]", html, player.position)

        } else if (player.post == "Milieu") {
            let html = `
                  <option value="bench" selected>Sur le banc</option>
                  <option value="MG">MG - Milieu gauche</option>
                  <option value="MC1">MC - Milieu central 1</option>
                  <option value="MC2">MC - Milieu central 2</option>
                  <option value="MD">MD - Milieu droit</option>
                  `
            card.querySelector("select").value = player.position;
            colors(card, "border-[#20d244]", "text-[#20d244]", html, player.position)

        } else if (player.post == "Defenseur") {
            let html = `
                  <option value="bench" selected >Sur le banc</option>
                  <option value="DG">DG - Défenseur gauche</option>
                  <option value="DC1">DC - Défenseur central 1</option>
                  <option value="DC2">DC - Défenseur central 2</option>
                  <option value="DD">DD - Défenseur droit</option>
                  `
            card.querySelector("select").value = player.position;
            colors(card, "border-[#3AC8EF]", "text-[#3AC8EF]", html, player.position)

        } else if (player.post == "Gardien") {
            let html = `
                    <option value="bench" selected>Sur le banc</option>
                  <option value="GB">GB - Gardien</option>
                  `
            colors(card, "border-orange-400", "text-orange-400", html, player.position)
        }
        if (player.status == "En blesse") {
            card.querySelector(".player-status").classList.remove("hidden");
            card.querySelector("select").innerHTML = `
                   <option value="bench" disabled selected>can't be on the bitch</option>
                  `
        }

        card.classList.remove("hidden")
        liste.appendChild(card);
    });
}

function colors(card, border, text, select, selectvalue) {
    card.classList.toggle(border);
    card.querySelector(".player-number").classList.toggle(border);
    card.querySelector(".player-position").classList.toggle(text);
    card.querySelector("select").innerHTML = `${select} `
    card.querySelector("select").value = selectvalue;
}