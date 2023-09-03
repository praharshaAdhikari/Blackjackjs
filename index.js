let cardsAr = []
let dCardsAr = []
let dnewCard = 0
let newCard = 0
let blackjack = false
let over = false
let message = document.getElementById("message")
let btn = document.getElementById("start")
let sum = 0
let dsum = 0
let cards = document.getElementById("cards")
let dcards = document.getElementById("dcards")
let adder = document.getElementById("sum")
let dadder = document.getElementById("dsum")
let stand = document.getElementById("stand")
let heading = document.getElementById("heading")

function draw(){
    document.getElementById("info").style.display = "block"
    heading.style.fontSize = "35px";
    stand.style.display = "block"
    message.textContent = "Do you want to draw a card, again?"
    dcards.textContent = "Dealer's Cards : " + " | " + dCardsAr[0] + " | " +  " 🎴 "
    cards.textContent = "Your Cards : "
    for (let i=0; i<cardsAr.length; i++) cards.textContent += " | " + cardsAr[i] + " | " 
    adder.textContent = "Sum : " + sum
    dadder.textContent = "Sum: " + dsum
    newCard = randomCard()
    cardsAr.push(newCard)
    sum += newCard
}

function start(){
    let firstCard = randomCard()
    let secondCard = randomCard()
    let dcard = randomCard()
    cardsAr = [firstCard, secondCard]
    dCardsAr = [dcard]
    sum += firstCard + secondCard
    dsum += dcard
    message.textContent = "Do you want to draw a card?"
    btn.onclick = function() {refresh()}
    btn.textContent = "Draw"
}

function refresh(){
    if (sum < 21){
        draw()
    } else if (sum === 21){
        draw()
        message.textContent = "You got Blackjack!"
        standFn()
    } else {
        draw()
        dnewCard = randomCard()
        dCardsAr.push(dnewCard)
        dsum += dnewCard
        dcards.textContent = "Dealer's Cards : "
        for (let i=0; i<dCardsAr.length; i++) dcards.textContent +=  " | " + dCardsAr[i] + " | " 
        dadder.textContent = "Sum: " + dsum
        message.textContent = "You lost the game."
        again()
    }
}

function again(){
    stand.style.display = "none"
    btn.textContent = "Play again"
    btn.onclick = function() {reset()}
}

function reset(){
    sum = 0
    dsum = 0
    cardsAr = []
    newCard = 0
    document.getElementById("info").style.display = "none"
    stand.style.display = "none"
    btn.textContent = "start game"
    heading.style.fontSize = "70px";
    start()
}

function standFn(){
    sum -= newCard
    while (dsum < 21 && dsum <= sum){
        dnewCard = randomCard()
        dCardsAr.push(dnewCard)
        dsum += dnewCard
    }
    dcards.textContent = "Dealer's Cards : "
    for (let i=0; i<dCardsAr.length; i++) dcards.textContent +=  " | " + dCardsAr[i] + " | " 
    dadder.textContent = "Sum: " + dsum
    if (sum < dsum && dsum <= 21) message.textContent = "You lost the game."
    else message.textContent = "Congratulations! You won!"
    again()
    sum += newCard
}

function randomCard(){
    let c = Math.floor(Math.random()*13) + 1
    if (c === 1) {
        return 11
    } else if (c > 10){
        return 10
    } else {
        return c
    }
}