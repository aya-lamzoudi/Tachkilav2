
//add event lisners to page match

import { togglepopup, updatepopup, showsuccess } from "./interface.js";
import { validateadversaire, validatedate, validatetime, validatevanue, validatelocation } from "./validation.js";

//declaration de variables:
const popup = document.querySelector("#popup");
const popupupdate = document.querySelector("#update");
const form = document.querySelector("#form-add-match");
const editform = document.querySelector("#form-update-match");


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
    validatelocation(form);
    // check errors


})