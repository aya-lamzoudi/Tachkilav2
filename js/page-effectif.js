

import { validatename, validatepost, validatenbr, validateage, validatestatus, validateeditnbr } from "./validation.js";
import { togglepopup, updatepopup, showsuccess } from "./interface.js";
import { players, chnageId } from "./stockage.js";
import { affichage } from "./joueurs.js";




//declaration
const addplayerbtn = document.querySelector("#add-player");
const form = document.querySelector("#addplayer");
const editform = document.querySelector("#updateplayer");
let oldnumber; //to dtock the old tenue number
const playerliste = document.querySelector("#player-list-effective");
const popup = document.querySelector("#popup");
const popupupdate = document.querySelector("#update");
const template = document.querySelector(".player-card-template")

//call the function to affiche tous les cards
affichage(players, playerliste, template); 


// event lesener to affiche the add popup:
addplayerbtn.addEventListener("click", togglepopup);


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


// add event lisner sur container of the card to detect the target event of update & delete:
playerliste.addEventListener("click", function (event) {
    event.preventDefault();

    const editBtn = event.target.closest(".edit-player-btn");
    const deleteBtn = event.target.closest(".delete-player-btn");

    if (editBtn) {
        updatepopup()
        const playerCard = editBtn.closest(".player-card");
        let number = playerCard.querySelector(".player-number").innerText;
        console.log(number);
        players.forEach(player => {
            if (player.numero == number) {
                editform.querySelector("#name").value = player.nom;
                editform.querySelector("#nbr").value = player.numero;
                editform.querySelector("#age").value = player.age;
                oldnumber = player.numero;
                // editform.querySelectorAll('#update input[name="poste"]').forEach(input => {
                //     input.checked = input.value === player.post;
                // });
                editform.querySelector(".player-position").value = player.post;
                editform.querySelector(".player-status").value = player.post;
            }
        });

    }

    if (deleteBtn) {

        const confirm = document.querySelector("#confirm");
        confirm.classList.toggle("hidden");
        const playerCard = deleteBtn.closest(".player-card");
        let number = playerCard.querySelector(".player-number").innerText;
        let index = players.findIndex(player => player.numero == number);
        if (index !== -1) {
            confirm.querySelector("#cancelDelete").addEventListener("click", () => {
                console.log("first", confirm);
                confirm.classList.add("hidden");  //cencel the delete
                console.log("second", confirm);
                console.log("test");

            })
            confirm.querySelector("#confirmDelete").addEventListener("click", () => {

                players.splice(index, 1);
                localStorage.setItem("players", JSON.stringify(players));

                affichage(players, playerliste,template)
                confirm.classList.toggle("hidden");
                showsuccess("the player is the player is successfully removed");
            })

        }
        console.log(players)
    }
});


//add player form:
form.addEventListener("submit", function (event) {
    event.preventDefault();

    validatename(form);
    validatenbr(form);
    validateage(form)
    validatepost(form);
    validatestatus(form);

    let value = form.querySelector(".player-position").value;
    let valuestatus = form.querySelector(".player-status").value;

    // check errors

    let errors = form.querySelectorAll(".message");
    let haserror = false;
    errors.forEach(error => {
        if (error.innerText !== "") {
            haserror = true;
        }
    });


    if (!haserror) {

        let player = {
            id: chnageId(),
            nom: form.querySelector("#name").value,
            post: value,
            status: valuestatus,
            numero: form.querySelector("#nbr").value,
            age: form.querySelector("#age").value,
            position: "bench",
        }

        console.log(player)
        players.push(player);
        localStorage.setItem("players", JSON.stringify(players));

        affichage(players, playerliste,template);
        togglepopup();
        showsuccess("the player is added with sucsses");

        //reset the value of the add pop up 
        form.querySelector("#name").value = "";
        form.querySelector("#nbr").value = "";
        form.querySelector(".player-status").value = "";
        form.querySelector(".player-position").value = ""

    }

})

//edit player form:
editform.addEventListener("submit", function (event) {

    event.preventDefault();

    validatename(editform);

    validateeditnbr(editform, oldnumber);
    validateage(editform);
    validatepost(editform);
    validatestatus(editform);

    let value = editform.querySelector(".player-position").value;
    let valuestatus = editform.querySelector(".player-status").value;

    // check errors

    let errors = editform.querySelectorAll(".message");
    let haserror = false;


    errors.forEach(error => {
        if (error.innerText !== "") {
            haserror = true;
        }
    });


    if (!haserror) {
        players.forEach(player => {
            console.log("see", player)
            console.log(oldnumber)
            console.log(player.numero)
            if (oldnumber == player.numero) {

                player.nom = editform.querySelector("#name").value;
                player.post = value;
                player.numero = editform.querySelector("#nbr").value;
                player.position = editform.querySelector(".player-position").value
                player.status = editform.querySelector(".player-status").value;
                localStorage.setItem("players", JSON.stringify(players));
                affichage(players, playerliste,template);
                updatepopup();
                showsuccess("the player is updated with success");
            }
        });
    }

});

