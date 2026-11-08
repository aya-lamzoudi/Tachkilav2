//match functions

import { recherch, btnfilter } from "./page-matchs.js";



export function filtre(matches, btnfilter, recherch) {
  const now = new Date();

  return matches.filter((matche) => {
    const dateMatch = new Date(`${matche.date}`);

    const AVenir = dateMatch > now;

    const Joue = dateMatch <= now;

    const parFilter =
      btnfilter === "all" ||
      (btnfilter === "upcoming" && AVenir) ||
      (btnfilter === "played" && Joue);

    const parRecherche = matche.adversaire.toLowerCase().includes(recherch.toLowerCase());

    return parFilter && parRecherche;
  });
}



export function affichage(matches, liste, template) {

  liste.innerHTML = ``;

  matches = filtre(matches, btnfilter, recherch)

  console.log(matches)
  matches.forEach(matche => {
    const clone = template.content.cloneNode(true);
    const card = clone.querySelector(".match-card");


    let date = new Date(`${matche.date}`);
    card.dataset.id = matche.id;

    card.querySelector(".date-day-name").innerText = date.toLocaleString('default', { weekday: "short" })
    card.querySelector(".date-day").innerText = date.getDate();
    card.querySelector(".date-month").innerText = date.toLocaleDateString('default', { month: 'short' });
    card.querySelector(".date-time").innerText = matche.time;


    if (matche.domicile) {
      card.querySelector(".match-status").innerText = "Domiclle";
      card.querySelector(".match-status").classList.remove("bg-slate-700");
      card.querySelector(".match-status").classList.add("bg-green-600", "text-white");
    } else {
      card.querySelector(".match-status").innerText = "Extérieur";
    }

    card.querySelector(".match-title").innerText = `Atlas FC vs ${matche.adversaire}`;
    card.querySelector("#match-location").innerText = matche.location;

    // let compaire de date with the curent date:

    let nowdate = new Date().getTime();
    let matchdate = date.getTime();
    console.log('date match', matchdate)
    console.log('now date:', nowdate)


    if (nowdate > matchdate && matche.butAtlas == null && matche.butadversaire == null) {

      card.querySelector(".score-btn").classList.remove("hidden");
    }
    if (nowdate < matchdate) {
      matche.butAtlas = null;
      matche.butadversaire = null;
      card.querySelector(".match-result").classList.add("hidden");
      card.querySelector(".match-score").innerText = ``;
      card.querySelector(".matche-status").innerText = "";

    }

    if (nowdate > matchdate && matche.butAtlas != null && matche.butadversaire != null) {
      card.querySelector(".match-result").classList.remove("hidden");
      card.querySelector(".match-score").innerText = `${matche.butAtlas} - ${matche.butadversaire}`

      if (Number(matche.butAtlas) > Number(matche.butadversaire)) {
        card.querySelector(".match-score").classList.add("text-[#20D244]");
        card.querySelector(".matche-status").classList.add("text-[#20D244]");
        card.querySelector(".matche-status").innerText = "Victoire";


      } else if (matche.butAtlas < matche.butadversaire) {
        card.querySelector(".match-score").classList.add("text-[#D75241]");
        card.querySelector(".matche-status").classList.add("text-[#D75241]");
        card.querySelector(".matche-status").innerText = "Defaite";
      } else if (matche.butAtlas == matche.butadversaire) {
        card.querySelector(".match-score").classList.add("text-slate-300");
        card.querySelector(".matche-status").classList.add("text-slate-300");
        card.querySelector(".matche-status").innerText = "Nul";
      }


    }



    card.classList.remove("hidden");
    liste.appendChild(card);
    statistique(matches)
  });

}

//statistique

export function statistique(matches) {

  let cards = document.querySelector(".match-statistique");

  cards.querySelector(".victoire-nbr").innerText = matches.filter(matche => matche.butAtlas > matche.butadversaire).length;
  cards.querySelector(".nul-nbr").innerText = matches.filter(matche => matche.butAtlas === matche.butadversaire && matche.butAtlas != null).length
  cards.querySelector(".defaite-nbr").innerText = matches.filter(matche => matche.butAtlas < matche.butadversaire).length


  cards.querySelector(".but-marque").innerText = (matches.reduce((acc, matche) => acc + Number(matche.butAtlas), 0))
  cards.querySelector(".but-encaise").innerText = (matches.reduce((acc, matche) => acc + Number(matche.butadversaire), 0))

}