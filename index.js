//Event Listeners

document.addEventListener("DOMContentLoaded", () => {
getAllNinjas()
})

document.querySelector("#addNinja").addEventListener("submit", handleSubmit)

document.querySelector("#filterNinja").addEventListener("change", handleChange)

document.querySelector("#FIGHT").addEventListener("click", handleFight)






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

function handleMouse(e) {
    e.target.classList.toggle("flipCard")
}

function handleClickOne(e) {
    const arrOfSquadOne = document.querySelector("#ninjasOne").children
    const ninjaInfo = e.target.parentElement.parentElement.querySelector(".front")
    if(arrOfSquadOne.length < 3) {
        const tempNinjaCard = document.createElement("div");
        tempNinjaCard.className = tempNinjaCard
        tempNinjaCard.id = `${ninjaInfo.querySelector(".name").innerText}`
        tempNinjaCard.innerHTML = `
            <img style="height:100px" class="img" src=${ninjaInfo.querySelector(".img").src}>
            <p class="power" style="display:none">${ninjaInfo.querySelector(".power").innerText}
        `
        document.querySelector("#ninjasOne").appendChild(tempNinjaCard)
    }
}

function handleClickTwo(e) {
    const arrOfSquadTwo = document.querySelector("#ninjasTwo").children
    const ninjaInfo = e.target.parentElement.parentElement.querySelector(".front")
    if(arrOfSquadTwo.length < 3) {
        const tempNinjaCard = document.createElement("div");
        tempNinjaCard.className = tempNinjaCard
        tempNinjaCard.id = `${ninjaInfo.querySelector(".name").innerText}`
        tempNinjaCard.innerHTML = `
            <img style="height:100px" class="img" src=${ninjaInfo.querySelector(".img").src}>
            <p class="power" style="display:none">${ninjaInfo.querySelector(".power").innerText}
        `
        document.querySelector("#ninjasTwo").appendChild(tempNinjaCard)
    }
}

function handleFight (e) {
    const ninjasOne = document.querySelector("#ninjasOne").children
    const arrOfOnePow = []
    for (value of ninjasOne) {
        const ninjaPower = value.querySelector(".power").innerText
        arrOfOnePow.push(ninjaPower)
    }
    const ninjasTwo = document.querySelector("#ninjasTwo").children
    const arrOfTwoPow = []
    for (value of ninjasTwo) {
        const ninjaPower = value.querySelector(".power").innerText
        arrOfTwoPow.push(ninjaPower)
    }
    if (arrOfOnePow.reduce((accumulator, currentValue) => accumulator+currentValue) > arrOfTwoPow.reduce((accumulator, currentValue) => accumulator+currentValue)) {
        const winnerOne = document.querySelector("#winnerOne")
        winnerOne.style="display:block"
        setTimeout(function() {
            winnerOne.style="display:none"
            document.querySelector("#ninjasOne").innerHTML=``
            document.querySelector("#ninjasTwo").innerHTML=``
        }, 5000)
    } else {
        const winnerTwo = document.querySelector("#winnerTwo")
        winnerTwo.style="display:block"
        setTimeout(function() {
            winnerTwo.style="display:none"
            document.querySelector("#ninjasOne").innerHTML=``
            document.querySelector("#ninjasTwo").innerHTML=``
        }, 5000)
    }
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
    ninjaCard.classList.add("ninja-card")
    ninjaCard.id = `${ninja.name}`
    ninjaCard.innerHTML =`
            <div class="front">
                <img class="img" src="${ninja.imageUrl}">
                <p class="name">Name:${ninja.name}</p>
                <p class="village">Village:${ninja.village}</p>
                <p class="rank">Rank:${ninja.rank}</p>
                <p class="power" style="display:none;">${ninja.power}</p>
            </div>
            <div class="back">
                <button id=one class=addBtn>Add to Squad 1</button>
                <button id=two class=addBtn>Add to Squad 2</button>
            </div>
    `
    ninjaCard.querySelector("#one").addEventListener("click", handleClickOne)
    ninjaCard.querySelector("#two").addEventListener("click", handleClickTwo)
    ninjaCard.addEventListener("mouseenter", handleMouse)
    ninjaCard.addEventListener("mouseleave", handleMouse)
    document.querySelector("#ninjaContainer").appendChild(ninjaCard)
}