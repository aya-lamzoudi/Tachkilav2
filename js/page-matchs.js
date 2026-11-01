
//add event lisners to page match
import { matches, chnagematchId } from "./stockage.js";
import { togglepopup, updatepopup, showsuccess } from "./interface.js";
import { validateadversaire, validatedate, validatetime, validatevanue, validatelocation } from "./validation.js";
import {affichage  } from "./matchs.js";


//declaration de variables:
const popup = document.querySelector("#popup");
const popupupdate = document.querySelector("#update");
const form = document.querySelector("#form-add-match");
const editform = document.querySelector("#form-update-match");
const matchliste= document.querySelector("#matches-list"); 
const template = document.querySelector(".match-template");

affichage(matches,matchliste,template)


// event lisner for button d'ajouter
document.querySelector("#add-match").addEventListener("click", togglepopup);

// add event lisner to the popup so we can close & annuler:
popup.addEventListener("click", function (event) {
    if (event.target.id == "close-btn" || event.target.id == "popup-cancel") {
        togglepopup();
    }
})

// add event lisner to the update popup so we can close & annuler:
popupupdate.addEventListener("click", function (event) {
    if (event.target.id == "close-popup" || event.target.id == "popup-cancel") {
        updatepopup();
    }
})

//add match form:
form.addEventListener("submit", function (event) {
    event.preventDefault();

    validateadversaire(form)
    validatedate(form);
    validatetime(form);
    validatevanue(form);
    console.log(validatevanue(form));
    validatelocation(form);
    // check errors

    let errors = form.querySelectorAll(".message");
    let haserror = false;
    errors.forEach(error => {
        if (error.innerText !== "") {
            haserror = true;
        }
    });


    if (!haserror) {


        let matche = {
            id: chnagematchId(),
            adversaire: form.querySelector("#adversaire").value,
            date: form.querySelector("#date").value,
            time: form.querySelector("#time").value,
            location: form.querySelector("#location").value,
            domicile: validatevanue(form),
            butAtlas: null,
            butadversaire: null

        }

        console.log(matche)
        matches.push(matche);
        localStorage.setItem("matches", JSON.stringify(matches));

        affichage(matches,matchliste,template)
        // affichage(players, playerliste, template);
        togglepopup();
        showsuccess("the match is added with sucsses");

        //reset the value of the add pop up 
        form.querySelector("#adversaire").value = "";
        form.querySelector("#date").value = "";
        form.querySelector("#location").value = "";
        form.querySelector(".player-position").value = "";

    }

})

console.log(matches)