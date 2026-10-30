

import { validatename, validatepost, validatenbr, validateage, validatestatus } from "./validation.js";
import { togglepopup, updatepopup, showsuccess } from "./interface.js";
import { players, id } from "./stockage.js";
import { addplayer, affichage } from "./joueurs.js";

let idtest = id


//declaration
const addplayerbtn = document.querySelector("#add-player");
const form = document.querySelector("#addplayer");
const nbr = document.querySelector("#nbr").value.trim();
const error = document.querySelector("#nbr-err");

const playerliste = document.querySelector("#player-list-effective");
let card = document.querySelector(".player-card-effective").cloneNode(true);
addplayerbtn.addEventListener("click", togglepopup);


popup.addEventListener("click", function (event) {
    if (event.target.id == "close-btn" || event.target.id == "popup-cancel") {
        togglepopup();
    }
})

form.addEventListener("submit", function (event) {
    event.preventDefault();

    validatename();
    validatenbr();
    validateage()
    validatepost();
    validatestatus();

    let value = document.querySelector(".player-position-select").value;
    let valuestatus = document.querySelector(".player-status-select").value;

    // check errors

    let errors = document.querySelectorAll(".message");
    let haserror = false;
    errors.forEach(error => {
        if (error.innerText !== "") {
            haserror = true;
        }
    });


    if (!haserror) {

        let player = {
            id: ++idtest,
            nom: document.querySelector("#name").value,
            post: value,
            status: valuestatus,
            numero: document.querySelector("#nbr").value,
            age: document.querySelector("#age").value,
            position: "bench",
        }
        console.log(player.age)

        // localStorage.setItem("id", id);
        console.log(player)
        players.push(player);
        localStorage.setItem("players", JSON.stringify(players));
     
        
        affichage(players, playerliste);
        togglepopup();
        showsuccess("the player is added with sucsses");
    }

})


document.querySelector("#close-popup-effective").addEventListener("click", updatepopup);
document.querySelector("#popup-cancel-effective").addEventListener("click", updatepopup);

document.querySelector("#player-list-effective").addEventListener("click", function (event) {
    event.preventDefault();
    // const add = event.target.closest(".add-player-btn");
    const editBtn = event.target.closest(".edit-player-btn");
    const deleteBtn = event.target.closest(".delete-player-btn");


    if (editBtn) {
        updatepopup()
        const playerCard = editBtn.closest(".player-card-effective");
        let number = playerCard.querySelector(".player-number-effective").innerText;
        console.log(number);
        players.forEach(player => {
            if (player.numero == number) {
                document.querySelector("#update-name").value = player.nom;
                document.querySelector("#update-nbr").value = player.numero;
                document.querySelector("#update-age").value = player.age;
                oldnumber = player.numero;
                document.querySelectorAll('#update input[name="poste"]').forEach(input => {
                    input.checked = input.value === player.post;
                });
                updatepopup();
            }
        });

    }

    if (deleteBtn) {    
        
        const confirm = document.querySelector("#confirm");
        confirm.classList.toggle("hidden");
        const playerCard = deleteBtn.closest(".player-card-effective");
        let number = playerCard.querySelector(".player-number-effective").innerText;
        let index = players.findIndex(player => player.numero == number);
        if (index !== -1) {
            confirm.querySelector("#cancelDelete").addEventListener("click", () => {
                confirm.classList.toggle("hidden");  //cencel the delete
            })
             confirm.querySelector("#confirmDelete").addEventListener("click", () => {

                // console.log(players[index])
                // console.log("did you see mee")
                // players[index].position = "bench";
                // console.log(players[index]);

                // hahuwa
                // let liste = document.querySelectorAll(".terrain-position");
                // console.log(liste);
                // liste.forEach(find => {

                //     if (find.querySelector(".number").innerText == players[index].numero) {
                //         console.log(find);
                //         find.querySelector(".number").innerText = "";
                //         find.querySelector(".number").classList.add("hidden");
                //         find.querySelector(".player-name-position").innerText = "libre";

                //     }

                // });

                //hahuwa


                players.splice(index, 1);
                localStorage.setItem("players", JSON.stringify(players));
                playerCard.remove();
                confirm.classList.toggle("hidden");
                showsuccess("the player is the player is successfully removed");
            })

        }
        console.log(players)
    }
});


affichage(players, playerliste);
