let letters = 'abcdefghijklmnopqrstuvwxyz';
let lettersArray = Array.from(letters);

let lettersContainer = document.querySelector('.letters')

lettersArray.forEach(letter =>{
    let span = document.createElement('span')
    let theLetter = document.createTextNode(letter);
    span.appendChild(theLetter)
    //span.textContent+=letter
    span.className = 'letter-box'
    lettersContainer.appendChild(span)
})

let words = {
    programming: ["php", "javascript", "go", "scala", "fortran", "r", "mysql", "python"],
    movies: ["Prestige", "Inception", "Parasite", "Interstellar", "Whiplash", "Memento", "Coco", "Up"],
    people: ["Albert Einstein", "Hitchcock", "Alexander", "Cleopatra", "Mahatma Ghandi","Omar Taha"],
    countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"]
}

//Select A Random Word From A Random Category 
let allKeys = Object.keys(words)
let randomPropNumber = Math.floor(Math.random()*allKeys.length)
let randomCategoryName = allKeys[randomPropNumber]
let randomCategoryList = words[randomCategoryName]
let randomValueNumber = Math.floor(Math.random() * randomCategoryList.length)
let randomWord = randomCategoryList[randomValueNumber]
document.querySelector(".game-info .category span").innerHTML = randomCategoryName

//Handling Guessed Word Area
let lettersGuessContainer = document.querySelector('.letters-guess')
let lettersAndSpace = Array.from(randomWord)
lettersAndSpace.forEach(letter =>{
    let emptySpan = document.createElement('span')
    if(letter === ' '){
        emptySpan.className = 'has-space'
    }
    lettersGuessContainer.appendChild(emptySpan)
})

let guessSpans = document.querySelectorAll('.letters-guess span')
let wrongAttempts = 0;
let rightAttempts = 0;
let theDraw = document.querySelector('.hangman-draw')


//Handling Clicking On Letters
document.querySelectorAll('.letter-box').forEach(letter =>{
    letter.addEventListener('click', e=>{
        let status = false
        e.target.classList.add('clicked')
        let clickedLetter = e.target.innerHTML.toLowerCase()
        lettersAndSpace.forEach((letter,wordIndex) => {
            if(clickedLetter == letter.toLowerCase()){
                status = true
                guessSpans.forEach((span,spanIndex)=>{
                    if(wordIndex == spanIndex){
                        span.innerHTML = clickedLetter
                    }
                })
            }
        })
        if(status != true){
            wrongAttempts++;
            theDraw.classList.add(`wrong-${wrongAttempts}`)
            document.getElementById('fail').play()
            if(wrongAttempts === 8){
                endGameFail()
                lettersContainer.classList.add('finished')
            }
        }else{
            rightAttempts++
            document.getElementById('success').play()
            if(rightAttempts === [...new Set(randomWord.split(' ').join('').toLowerCase())].length){
                endGameSuccess()
                lettersContainer.classList.add('finished')
            }
        }
    })
})

//End Game
function endGameFail(){
    let div = document.createElement('div')
    let divText = document.createTextNode(`Game Over, The Word Is ${randomWord.toUpperCase()}`)
    div.appendChild(divText)
    div.className = 'popup';
    document.body.appendChild(div)
}
function endGameSuccess(){
    let div = document.createElement('div')
    let divText1 = document.createTextNode(`Great Job, The Word Is ${randomWord.toUpperCase()}, \n`)
    let divText2
    if(wrongAttempts <= 1){
        divText2 = document.createTextNode(`You Have ${wrongAttempts} Wrong Trial`)
    } else{
        divText2 = document.createTextNode(`You Have ${wrongAttempts} Wrong Trials`)
    }
    div.appendChild(divText1)
    div.appendChild(divText2)
    div.className = 'popup';
    document.body.appendChild(div)
}