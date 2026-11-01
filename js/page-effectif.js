

import { validatename, validatepost, validatenbr, validateage, validatestatus, validateeditnbr } from "./validation.js";
import { togglepopup, updatepopup, showsuccess } from "./interface.js";
import { players, chnageId } from "./stockage.js";
import { affichage, statistique } from "./joueurs.js";




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


// add event lisner sur container of the card to detect the target event of update & delete & capitane:
playerliste.addEventListener("click", function (event) {
    event.preventDefault();

    const editBtn = event.target.closest(".edit-player-btn");
    const deleteBtn = event.target.closest(".delete-player-btn");
    const captanebtn = event.target.closest(".captain-btn");

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
                editform.querySelector(".player-position").value = player.post;
                editform.querySelector(".player-status").value = player.status;
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

                affichage(players, playerliste, template)
                confirm.classList.toggle("hidden");
                showsuccess("the player is the player is successfully removed");
            })

        }
        console.log(players)
    }

    if(captanebtn){
        let tenue= captanebtn.closest(".player-card").querySelector(".player-number").innerText;
        players.forEach(player => {
            if(player.numero==tenue){
                player.capitane=true;
            }else {
                player.capitane=false;
            }
        });
        localStorage.setItem("players", JSON.stringify(players));
        affichage(players, playerliste, template)

        
       
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
            post: form.querySelector(".player-position").value,
            status: form.querySelector(".player-status").value,
            numero: form.querySelector("#nbr").value,
            age: form.querySelector("#age").value,
            position: "bench",
            capitane:false
        }

        console.log(player)
        players.push(player);
        localStorage.setItem("players", JSON.stringify(players));

        affichage(players, playerliste, template);
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
                player.post = editform.querySelector(".player-position").value;
                player.numero = editform.querySelector("#nbr").value;
                player.position = editform.querySelector(".player-position").value
                player.status = editform.querySelector(".player-status").value;
                localStorage.setItem("players", JSON.stringify(players));
                affichage(players, playerliste, template);
                updatepopup();
                showsuccess("the player is updated with success");
            }
        });
    }

});


// add event lisner to fiter player:

// document.querySelector("#position-filters").addEventListener("click", (event) => {

//     if (event.target.id == "tous") {
//         console.log(event.target.id)
//         affichage(players, playerliste, template)

//         // add color of the backround:
//         document.querySelectorAll(".position-filter").forEach(element => {
//             element.classList.remove("bg-[#1eba5f]");
//         });
//         event.target.classList.add("bg-[#1eba5f]");


//     } else if (event.target.id == "Gardien") {

//         const result = players.filter((player) => player.post == "Gardien");
//         affichage(result, playerliste, template);

//         // add color of the backround:
//         document.querySelectorAll(".position-filter").forEach(element => {
//             element.classList.remove("bg-[#1eba5f]");
//         });
//         event.target.classList.add("bg-[#1eba5f]");


//     } else if (event.target.id == "Defenseur") {

//         const result = players.filter((player) => player.post == "Defenseur");
//         affichage(result, playerliste, template);

//         // add color of the backround:
//         document.querySelectorAll(".position-filter").forEach(element => {
//             element.classList.remove("bg-[#1eba5f]");
//         });
//         event.target.classList.add("bg-[#1eba5f]");


//     } else if (event.target.id == "Milieu") {

//         const result = players.filter((player) => player.post == "Milieu");
//         affichage(result, playerliste, template);

//         // add color of the backround:
//         document.querySelectorAll(".position-filter").forEach(element => {
//             element.classList.remove("bg-[#1eba5f]");
//         });
//         event.target.classList.add("bg-[#1eba5f]");


//     } else if (event.target.id == "Attaquant") {

//         const result = players.filter((player) => player.post == "Attaquant");
//         affichage(result, playerliste, template);

//         // add color of the backround:
//         document.querySelectorAll(".position-filter").forEach(element => {
//             element.classList.remove("bg-[#1eba5f]");
//         });
//         event.target.classList.add("bg-[#1eba5f]");
//     }

// })

// add event lisner to the rrecherch input
// let input=document.querySelector("#search-player")
// input.addEventListener("input",()=>{
//   let result = players.filter((player)=> player.nom == input.value )
//   console.log(result)

//   affichage(result,playerliste,template)
// })

// testing something:
const useraction = document.querySelector(".players-area")

useraction.addEventListener("click", (event) => {

    // recherche 
    if (event.target.id == "search-player") {
        let input = document.querySelector("#search-player")
        input.addEventListener("input", () => {
            let result = players.filter((player) => player.nom == input.value)
            console.log(result)
            affichage(result, playerliste, template);
            if (input.value == "") {
                affichage(players, playerliste, template);
            }
        }
        )
    }


    //filtre
    if (event.target.id == "tous") {
        console.log(event.target.id)
        affichage(players, playerliste, template)

        // add color of the backround:
        document.querySelectorAll(".position-filter").forEach(element => {
            element.classList.remove("bg-[#1eba5f]");
        });
        event.target.classList.add("bg-[#1eba5f]");


    } else if (event.target.id == "Gardien") {

        const result = players.filter((player) => player.post == "Gardien");
        affichage(result, playerliste, template);

        // add color of the backround:
        document.querySelectorAll(".position-filter").forEach(element => {
            element.classList.remove("bg-[#1eba5f]");
        });
        event.target.classList.add("bg-[#1eba5f]");


    } else if (event.target.id == "Defenseur") {

        const result = players.filter((player) => player.post == "Defenseur");
        affichage(result, playerliste, template);

        // add color of the backround:
        document.querySelectorAll(".position-filter").forEach(element => {
            element.classList.remove("bg-[#1eba5f]");
        });
        event.target.classList.add("bg-[#1eba5f]");


    } else if (event.target.id == "Milieu") {

        const result = players.filter((player) => player.post == "Milieu");
        affichage(result, playerliste, template);

        // add color of the backround:
        document.querySelectorAll(".position-filter").forEach(element => {
            element.classList.remove("bg-[#1eba5f]");
        });
        event.target.classList.add("bg-[#1eba5f]");


    } else if (event.target.id == "Attaquant") {

        const result = players.filter((player) => player.post == "Attaquant");
        affichage(result, playerliste, template);

        // add color of the backround:
        document.querySelectorAll(".position-filter").forEach(element => {
            element.classList.remove("bg-[#1eba5f]");
        });
        event.target.classList.add("bg-[#1eba5f]");
    }


})

console.log(players)
//  statistique(players)