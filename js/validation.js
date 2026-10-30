import { players } from "./stockage.js";

export function validatename() {
    let name = document.querySelector("#name").value.trim();
    let error = document.querySelector("#name-err");

    if (name === "") {
        error.innerText = "this flied should not be empty";
    } else if (!/^[a-zA-Z\s]+$/.test(name)) {
        error.innerText = "this flied should containe just a letters";
    } else {
        error.innerText = "";
    }
}

export function validatenbr() {
    const nbr = document.querySelector("#nbr").value.trim();
    const error = document.querySelector("#nbr-err");
    if (nbr === "") {
        error.innerText = "This field should not be empty";
    } else if (nbr.length < 1 && nbr.length > 99) {
        error.innerText = "This number is invalid";
    } else if (players.some(player => player.numero == nbr)) {
        error.innerText = "This number already exists";
    } else {
        error.innerText = "";
    }
}
export function validateage() {
    const age = document.querySelector("#age").value.trim();
    const error = document.querySelector("#age-err");
    if (age === "") {
        error.innerText = "This field should not be empty";
    } else if (!/^(1[89]|[2-3][0-9]|4[0-3])$/.test(age)) {
        error.innerText = "This age is invalid";
    }else {
        error.innerText = "";
    }
}

export function validatepost() {
    const poste = popup.querySelector(".player-position-select").value;
    const error = document.querySelector("#flied-err");

    if (poste=== "") {
        error.innerText = "Choisissez un poste";
        return;
    } else {
        error.innerText = "";

    }
}
export function validatestatus() {
    const poste = popup.querySelector(".player-status-select").value;
    const error = document.querySelector("#status-err");

    if (poste=== "") {
        error.innerText = "Choisissez un poste";
        return;
    } else {
        error.innerText = "";

    }
}


//validate edit pop-up functions

export function validateeditname() {
    let name = document.querySelector("#update-name").value.trim();
    let error = document.querySelector("#update-name-err");

    if (name === "") {
        error.innerText = "this flied should not be empty";
    } else if (!/^[a-zA-Z\s]+$/.test(name)) {
        error.innerText = "this flied should containe just a letters";
    } else {
        error.innerText = "";
    }
}

export function validateeditnbr() {
    let nbr = document.querySelector("#update-nbr").value.trim();
    let error = document.querySelector("#update-nbr-err");

    if (nbr === "") {
        error.innerText = "This field should not be empty";
    } else if (!/^[1-9][0-9]?$/.test(nbr)) {
        error.innerText = "This number is invalid";
    } else if (players.some(player => player.numero == nbr) && nbr !== oldnumber) {
        error.innerText = "This number already exists";
    } else {
        error.innerText = "";
    }
}

// export function validate 