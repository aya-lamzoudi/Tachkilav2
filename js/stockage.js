export let players = JSON.parse(localStorage.getItem("players")) || [];
export let id = Number(localStorage.getItem("id")) || 0;

export function chnageId() {
    id++;
    localStorage.setItem("id", JSON.stringify(id));
    return id;
}
