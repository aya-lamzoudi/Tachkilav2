export let players = JSON.parse(localStorage.getItem("players")) || [];
export let id = Number(localStorage.getItem("id")) || 0;
export let matches= JSON.parse(localStorage.getItem("matches")) || [];
export let matchId = Number(localStorage.getItem("matchId")) || 0;

export function chnageId() {
    id++;
    localStorage.setItem("id", JSON.stringify(id));
    return id;
}
export function chnagematchId() {
    matchId++;
    localStorage.setItem("matchId", JSON.stringify(matchId));
    return matchId;
}