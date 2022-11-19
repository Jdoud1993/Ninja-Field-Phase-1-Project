document.addEventListener("DOMContentLoaded", () => {

getAllNinjas()

})



// Event Handler Functions



// JSON fetch Functions

function getAllNinjas() {
    fetch("http://localhost:3000/ninjas")
    .then(res => res.json())
    .then(ninjaData => ninjaData.forEach(ninja => renderOneNinja(ninja)))
}


//DOM Manipulation Functions

function renderOneNinja(ninja) {
    const ninjaCard = document.createElement("div")
    ninjaCard.className = "ninja-card"
    ninjaCard.id = `${ninja.name}`
    ninjaCard.innerHTML =`
        <img src="${ninja.imageUrl}">
        <h4>Name</h4>
        <p>${ninja.name}</p>
        <h4>Village</h4>
        <p>${ninja.village}</p>
        <h4>Rank</h4>
        <p>${ninja.rank}</p>
    `
    document.querySelector("#ninjaContainer").appendChild(ninjaCard)
}