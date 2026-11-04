
//add event lisners to page match
import { matches, chnagematchId } from "./stockage.js";
import { togglepopup, updatepopup, showsuccess } from "./interface.js";
import { validateadversaire, validatedate, validatetime, validatevanue, validatelocation } from "./validation.js";
import { affichage } from "./matchs.js";



//declaration de variables:
const popup = document.querySelector("#popup");
const popupupdate = document.querySelector("#update");
const form = document.querySelector("#form-add-match");
const editform = document.querySelector("#form-update-match");
const matchliste = document.querySelector("#matches-list");
const template = document.querySelector(".match-template");
const scoreform = document.querySelector("#score");
const scoreeditform = document.querySelector("#edit-score");
let matchid;
affichage(matches, matchliste, template)


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
    if (event.target.id == "close-match-btn" || event.target.id == "popup-cancel") {
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


        matches.push(matche);

        localStorage.setItem("matches", JSON.stringify(matches));

        affichage(matches, matchliste, template)
        // affichage(matches, matcheliste, template);
        togglepopup();
        showsuccess("the match is added with sucsses");

        //reset the value of the add pop up 
        form.querySelector("#adversaire").value = "";
        form.querySelector("#date").value = "";
        form.querySelector("#location").value = "";
        form.querySelector(".time").value = "";

    }

})



//edit match form:
editform.addEventListener("submit", function (event) {
    event.preventDefault();

    validateadversaire(editform);
    validatedate(editform);
    validatetime(editform);
    validatevanue(editform);

    validatelocation(editform);
    // check errors

    let errors = editform.querySelectorAll(".message");
    let haserror = false;
    errors.forEach(error => {
        if (error.innerText !== "") {
            haserror = true;
        }
    });


    if (!haserror) {
        matches.forEach(matche => {
           
            if (matche.id == matchid) {
                console.log(matche)
                matche.adversaire = editform.querySelector("#adversaire").value
                matche.date = editform.querySelector("#date").value
                matche.location = editform.querySelector("#location").value
                matche.time = editform.querySelector("#time").value;
                matche.domicile=validatevanue(editform);
            }

        });




        localStorage.setItem("matches", JSON.stringify(matches));

        affichage(matches, matchliste, template);
        // affichage(matches, matcheliste, template);
        updatepopup();
        showsuccess("the match is updated with sucsses");



    }

})


//add event lisner sur scor form do annuler and delect saisir:

scoreform.addEventListener("click", (event) => {
    if (event.target.id == "close-btn" || event.target.id == "popup-cancel") {
        document.querySelector("#score").classList.add("hidden");
    }
})

//add event lisner sur edit-scor form do annuler and delect saisir:

document.querySelector("#score-edit-popup").addEventListener("click", (event) => {
    if (event.target.id == "close-btn" || event.target.id == "popup-cancel") {
        document.querySelector("#score-edit-popup").classList.add("hidden");
    }
})


// add event lisner sur tout les card de match:(cantainer of them)

matchliste.addEventListener("click", (event) => {

    const editBtn = event.target.closest(".edit-match-btn");
    const deleteBtn = event.target.closest(".delete-match-btn");
    const choosescore = event.target.closest(".score-btn");
    const editscore = event.target.closest(".edit-score-btn");


    if (editBtn) {
        updatepopup();
        let card = editBtn.closest(".match-card");
       
        matchid = card.dataset.id;
        matches.forEach(matche => {
            if (matche.id == card.dataset.id) {
                editform.querySelector("#adversaire").value = matche.adversaire
                editform.querySelector("#date").value = matche.date;
                editform.querySelector("#location").value = matche.location;
                editform.querySelector("#time").value = matche.time;
                if (matche.domicile) {
                    editform.querySelector("select").value = "Domicile"
                } else {
                    editform.querySelector("select").value = "exterieur"
                }

            }
        })
    }

    if (deleteBtn) {

        const confirm = document.querySelector("#confirm");
        confirm.classList.toggle("hidden");
        let card = deleteBtn.closest(".match-card");
       

        matchid = card.dataset.id;
        let index = matches.findIndex(match => match.id == matchid);
        if (index !== -1) {
            confirm.querySelector("#cancelDelete").addEventListener("click", () => {
                confirm.classList.add("hidden");  //cencel the delete             

            })
            confirm.querySelector("#confirmDelete").addEventListener("click", () => {

                matches.splice(index, 1);
                localStorage.setItem("matches", JSON.stringify(matches));

                affichage(matches, matchliste, template)
                confirm.classList.toggle("hidden");
                showsuccess("this match is successfully removed");
            })

        }
    }
    if (choosescore) {
        document.querySelector("#score").classList.remove("hidden");
        let card = choosescore.closest(".match-card");
        matchid = card.dataset.id;
    }
    if (editscore) {
        document.querySelector("#score-edit-popup").classList.remove("hidden");
        let card = editscore.closest(".match-card");
        matchid = card.dataset.id;
        matches.forEach(matche => {
            if (matche.id == card.dataset.id) {
                scoreeditform.querySelector("#atlas-but").value = matche.butAtlas
                scoreeditform.querySelector("#adversaire-but").value = matche.butadversaire;

            }
        })
    }

})


//event lisner sur popup scote:

scoreform.addEventListener("submit", (e) => {
    e.preventDefault();
    matches.forEach(matche => {
        if (matche.id == matchid) {
            matche.butadversaire = scoreform.querySelector("#adversaire-but").value;
            matche.butAtlas = scoreform.querySelector("#atlas-but").value;

        }
        localStorage.setItem("matches", JSON.stringify(matches));
        affichage(matches, matchliste, template);
        document.querySelector("#score").classList.add("hidden");
    });

})

//event lisner sur popup edit score
scoreeditform.addEventListener("submit", (e) => {
    e.preventDefault();

    matches.forEach(matche => {
        if (matche.id == matchid) {
            matche.butadversaire = scoreeditform.querySelector("#adversaire-but").value;
            matche.butAtlas = scoreeditform.querySelector("#atlas-but").value;

        }
        localStorage.setItem("matches", JSON.stringify(matches));
        affichage(matches, matchliste, template);
        document.querySelector("#score-edit-popup").classList.add("hidden")
    });
})



console.log(matches);


//filtrage && recherch:

const useraction = document.querySelector(".matches-result")

useraction.addEventListener("click", (event) => {

    // recherche 
   
    if (event.target.id == "search-match") {
        let input = document.querySelector("#search-match")
        input.addEventListener("input", () => {
            let result = matches.filter((match) => match.adversaire.startsWith(input.value));
         
            affichage(result, matchliste, template);
            if (input.value == "") {
                affichage(matches, matchliste, template);
            }
        }
        )
    }


    //filtre
    if (event.target.id == "all") {
      
        affichage(matches, matchliste, template);

        // add color of the backround:
        document.querySelectorAll(".match-filter").forEach(element => {
            element.classList.remove("bg-[#1eba5f]");
        });
        event.target.classList.add("bg-[#1eba5f]");


    } else if (event.target.id == "upcoming") {

        const result = matches.filter((matche) => new Date(`${matche.date}`).getTime() > new Date().getTime());

        affichage(result, matchliste, template);

        // add color of the backround:
        document.querySelectorAll(".match-filter").forEach(element => {
            element.classList.remove("bg-[#1eba5f]");
        });
        event.target.classList.add("bg-[#1eba5f]");

    } else if (event.target.id == "played") {


        const result = matches.filter((matche) => new Date(`${matche.date}`).getTime() < new Date().getTime());
        affichage(result, matchliste, template);

        // add color of the backround:
        document.querySelectorAll(".match-filter").forEach(element => {
            element.classList.remove("bg-[#1eba5f]");
        });
        event.target.classList.add("bg-[#1eba5f]");


    }

})



