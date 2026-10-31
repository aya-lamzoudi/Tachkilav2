export let players = JSON.parse(localStorage.getItem("players")) || [];
export let id = Number(localStorage.getItem("id")) || 0;
export let matches= JSON.parse(localStorage.getItem("matches")) || [];

export function chnageId() {
    id++;
    localStorage.setItem("id", JSON.stringify(id));
    return id;
}
