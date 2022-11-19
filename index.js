//Event Listeners

document.addEventListener("DOMContentLoaded", () => {
getAllNinjas()
})

document.querySelector("#addNinja").addEventListener("submit", handleSubmit)

document.querySelector("#filterNinja").addEventListener("change", handleChange)



// Event Handler Functions

function handleSubmit(e) {
    e.preventDefault()
    const ninjaObj = {
        name:e.target.name.value,
        imageUrl:e.target.img.value,
        village:e.target.village.value,
        rank:e.target.rank.value,
        power:(Math.floor(Math.random()*100)+1)
    }
    renderOneNinja(ninjaObj)
    addNinja(ninjaObj)
    document.querySelector("#addNinja").reset()
}

function handleChange(e) {
    const selectedVillage = e.target.value
    const arrOfNinja = document.querySelectorAll(".ninja-card")
    arrOfNinja.forEach(ninja => {
        if(`Village:${selectedVillage}` === ninja.querySelector(".village").innerText){
            ninja.style.display="flex"
        } else {
            ninja.style.display="none"
        }
    })
}


// JSON fetch Functions

function getAllNinjas() {
    fetch("http://localhost:3000/ninjas")
    .then(res => res.json())
    .then(ninjaData => ninjaData.forEach(ninja => renderOneNinja(ninja)))
}

function addNinja(ninjaObj) {
    fetch("http://localhost:3000/ninjas", {
        method:"POST",
        headers: {
            "Content-Type": "application/json"
        },
        body:JSON.stringify(ninjaObj)
    })
    .then(res => res.json())
    .then(data => console.log(data))
}


//DOM Manipulation Functions

function renderOneNinja(ninja) {
    const ninjaCard = document.createElement("div")
    ninjaCard.classList = "ninja-card"
    ninjaCard.id = `${ninja.name}`
    ninjaCard.innerHTML =`
            <img src="${ninja.imageUrl}">
            <p class="name">Name:${ninja.name}</p>
            <p class="village">Village:${ninja.village}</p>
            <p class="rank">Rank:${ninja.rank}</p>
            <p class="power" style="display:none;">${ninja.power}</p> 
    `
    document.querySelector("#ninjaContainer").appendChild(ninjaCard)
}