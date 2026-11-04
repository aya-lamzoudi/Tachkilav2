import { players } from "./stockage.js";


//############ function for validate a player  #############

export function validatename(form) {

    let name = form.querySelector("#name").value.trim();
    let error = form.querySelector("#name-err");
    if (name === "") {
        error.innerText = "this flied should not be empty";
    } else if (!/^[a-zA-ZÀ-ÿ]{3,30}$/.test(name)) {
        error.innerText = "this nom is invalid";
    } else {
        error.innerText = "";
    }
}

export function validatenbr(form) {
    const nbr = form.querySelector("#nbr").value.trim();
    const error = form.querySelector("#nbr-err");
    if (nbr === "") {
        error.innerText = "This field should not be empty";
    } else if (!/^[1-9][0-9]?$/.test(nbr)) {
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
    } else if (!/^(1[89]|[23]\d)$/.test(age)) {
        error.innerText = "This age is invalid";
    } else {
        error.innerText = "";
    }
}

export function validatepost(form) {
    const poste = form.querySelector(".player-position").value;
    const error = form.querySelector("#flied-err");

    if (poste === "") {
        error.innerText = "Choisissez un poste";
        return;
    } else if (poste == "Gardien") {
        if (players.filter(player => player.post == "Gardien").length == 2) error.innerText = "there is alreadey 2 gardien";
    }

    else {
        error.innerText = "";

    }
}

export function validateeditpost(form, oldposte) {
    const poste = form.querySelector(".player-position").value;
    const error = form.querySelector("#flied-err");

    if (poste === "") {
        error.innerText = "Choisissez un poste";
        return;
    } else if (poste == "Gardien" && oldposte != "Gardien") {
        if (players.filter(player => player.post == "Gardien").length == 2) error.innerText = "there is alreadey 2 gardien";
    }

    else {
        error.innerText = "";

    }
}


export function validatestatus(form) {
    const poste = form.querySelector(".player-status").value;
    const error = form.querySelector("#status-err");

    if (poste === "") {
        error.innerText = "Choisissez un poste";
        return;
    } else {
        error.innerText = "";

    }
}

export function validateeditnbr(form, oldnumber) {
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

//############ function for validate a match #############

export function validateadversaire(form) {

    let input = form.querySelector("#adversaire").value.trim();
    let error = form.querySelector("#adversaire-err");
    if (input === "") {
        error.innerText = "this flied should not be empty";
    } else if (!/^[a-zA-ZÀ-ÿ]{3,30}$/.test(input)) {
        error.innerText = "this adversaire is invalid !";
    } else {
        error.innerText = "";
    }

}

export function validatedate(form) {

    let input = form.querySelector("#date").value.trim();
    let error = form.querySelector("#date-err");

    if (input === "") {
        error.innerText = "please choose the date of the match";
    } else {
        error.innerText = "";
    }


}

export function validatetime(form) {
    let input = document.querySelector("#time").value.trim();
    let error = document.querySelector("#time-err");

    if (input === "") {
        error.innerText = "please choose the time of the match"
    }
    // else if(!/^([01]\d|2[0-3]):[0-5]\d$/.test(input)){
    //     error.innerText="this input is invalid";
    // }
    else {
        error.innerText = ""
    }
}

export function validatelocation(form) {
    let input = form.querySelector("#location").value.trim();
    let error = form.querySelector("#location-err");
    if (input === "") {
        error.innerText = "this flied should not be empty";
    } else if (!/^[a-zA-Z]{3,}$/.test(input)) {
        error.innerText = "this location is invalid";
    } else {
        error.innerText = "";
    }
}


export function validatevanue(form) {
    let input = form.querySelector("#venue").value;
    let error = form.querySelector("#venue-err");

    if (input === "") {
        error.innerText = "Choisissez un poste";

    } else {
        error.innerText = "";
        if (input == "Domicile") {
            return true;
        } else if (input == "exterieur") {
            return false;
        }

    }
}