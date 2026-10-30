//interface functions


// -affichage de popup
export function togglepopup() {
    document.querySelector("#popup").classList.toggle("hidden");
}

// -affichage de editpopup

export function updatepopup() {
    console.log("edit test");
    document.querySelector("#update").classList.toggle("hidden");
}


// error function
export function showError(message) {
    const error = document.querySelector("#error-msg");

    error.innerText = message;
    error.classList.remove("hidden");

    setTimeout(() => {
        error.classList.add("hidden");
    }, 4000);
}
// seccess message
export function showsuccess(message) {
    const error = document.querySelector("#success-msg");
    console.log("hello")
    error.innerText = message;
    error.classList.remove("hidden");

    setTimeout(() => {
        error.classList.add("hidden");
    }, 4000);
}