import { players } from "./stockage.js";

export function validatename(form) {
    // let name = document.querySelector("#name").value.trim();
    // let error = document.querySelector("#name-err");
let name = form.querySelector("#name").value.trim();
    let error = form.querySelector("#name-err");
    if (name === "") {
        error.innerText = "this flied should not be empty";
    } else if (!/^[a-zA-Z\s]+$/.test(name)) {
        error.innerText = "this flied should containe just a letters";
    } else {
        error.innerText = "";
    }
}

export function validatenbr(form) {
    const nbr = form.querySelector("#nbr").value.trim();
    const error = form.querySelector("#nbr-err");
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
export function validateage(form) {
    const age = form.querySelector("#age").value.trim();
    const error = form.querySelector("#age-err");
    if (age === "") {
        error.innerText = "This field should not be empty";
    } else if (!/^(1[89]|[2-3][0-9]|4[0-3])$/.test(age)) {
        error.innerText = "This age is invalid";
    }else {
        error.innerText = "";
    }
}

export function validatepost(form) {
    const poste = form.querySelector(".player-position").value;
    const error = form.querySelector("#flied-err");

    if (poste=== "") {
        error.innerText = "Choisissez un poste";
        return;
    } else {
        error.innerText = "";

    }
}
export function validatestatus(form) {
    const poste = form.querySelector(".player-status").value;
    const error = form.querySelector("#status-err");

    if (poste=== "") {
        error.innerText = "Choisissez un poste";
        return;
    } else {
        error.innerText = "";

    }
}


//validate edit pop-up functions

// export function validateeditname(form) {
//     let name = document.querySelector("#name").value.trim();
//     let error = document.querySelector("#name-err");

//     if (name === "") {
//         error.innerText = "this flied should not be empty";
//     } else if (!/^[a-zA-Z\s]+$/.test(name)) {
//         error.innerText = "this flied should containe just a letters";
//     } else {
//         error.innerText = "";
//     }
// }

export function validateeditnbr(form,oldnumber) {
    let nbr = form.querySelector("#nbr").value.trim();
    let error = form.querySelector("#nbr-err");

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