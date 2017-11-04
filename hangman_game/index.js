const wrongGuess = () => new Audio(`sounds/vintage-keyboard-1.wav`);
const success = () => new Audio(`sounds/dog-bark-1.wav`);
const lost = () => new Audio(`sounds/small-explosion.wav`);
const win = () => new Audio(`sounds/dog-bark-2.wav`);
// Hangman round class. Contains all values and methods needed for game logic
class HangmanRound {
    
    constructor(myArr){
        
        this.wordArray = myArr
        this.wordDefPair = this.wordArray[Math.floor(Math.random()* this.wordArray.length)]
        this.word = this.wordDefPair[0]
        this.wordArray = this.word.split('')
        this.definition = this.wordDefPair[1]
        this.attempts = 0
        this.spaces = []
        this.gameInProgress = true;
        this.initializeSpaces();
        this.message = ""
    }

    get MAXTURNS(){
        return 6;
    }

    guess(letter){
    if(this.gameInProgress){
            
            if( findAll(letter, this.wordArray, this.spaces)){ 
                this.message ="Nice work! \n"
                success().play()
                if( !this.isComplete() ){                    
                    return this.spaces
                } else {
                    this.youWin()
                }                  
            }     else {
                wrongGuess().play()
                this.message = `Try again \n`
                this.attempts += 1;                
                if( this.canContinue() ){
                    return this.spaces
                } else {
                    this.youLose();
                }
            }
        }   else {
            this.message = `Game is over. Reload to play again! \n`
            return false
        }

    }

    initializeSpaces(){
        for(let i = 0; i< this.word.length; i++){
            this.spaces.push(' ');
        }
    }

    canContinue(){
        if(this.attempts >= this.MAXTURNS){
            return false 
        } else {
            this.message += `You have ${this.MAXTURNS- this.attempts} turns remaining.`
            return true
        }
    }

    isComplete(){
        if(this.spaces.indexOf(" ") === -1){
            
            this.youWin();
            return true;
        } else {
            return false;
        }   
    }

    youWin(){
        this.attempts = this.MAXTURNS
        win().play()
        this.message = "Great Work! You win! Reload to play again."
    }
    youLose(){
        lost().play()
        this.spaces = this.word.split("")
        this.gameInProgress = false;
        this.message = this.definition
    }
    reset(){
        this.wordDefPair = this.wordArray[Math.floor(Math.random() * this.wordArray.length)]
        this.word = this.wordDefPair[0]
        this.definition = this.wordDefPair[1]
        this.attempts = 0
        this.spaces = []
        this.initializeSpaces();
    }
    
}


// This function finds and assigns all spaces where a letter is present and returns the number of instances of that letter
function findAll(letter, arr, spaces, ){
    let recFind = ()=>{
        let hasLetter = false
        return (letter, arr, spaces)=>{
            let currIndex = arr.indexOf(letter)
            if(currIndex === -1){
                return hasLetter;
            }   else {
                hasLetter = true
                spaces[currIndex] = arr[currIndex]
                arr[currIndex] = null;
                return find(letter, arr, spaces) 
            }
        }
    }
    let find = recFind()
    return find(letter, arr, spaces)
}

// Makes alphabet into 26 divs that have ID's that correspond to their letters
function setUpBoard(arr, parent){
    let idBase = 'ID'
    let sequence = 0
    for(let space of arr){
        let el = document.createElement('div')
        el.setAttribute('class', 'board-letter')
        el.setAttribute('id', `${idBase}${sequence}`) 
        el.innerHTML =  space
        parent.appendChild(el)
        sequence += 1
    }
}

// Updates the board class with letters as they are chosen
function updateBoard(arr, className){    
    let indexNum = 0    
    document.querySelectorAll(`.${className}`).forEach((node)=>{        
        node.innerHTML = arr[indexNum]
        indexNum += 1;
    })
}
// Takes in word dictionary and parses it into an array of 2 dimensional arrays, with words and definitions paired together
function wordsToArray(dict){
    return new Promise((resolve, reject)=>{
    let wordArr = []
    for(let key in dict){
        wordArr.push([key, dict[key]])
    }
    resolve(wordArr)
})
}
// Sets up HTML DOM elements and returns a promise with all important DOM elements to be used by resetRound()
function createDom(){
    return new Promise((resolve, reject)=>{
        let letterHolder = document.createElement('div')
        letterHolder.setAttribute("id", "letterholder")
        document.body.appendChild(letterHolder)
        let board = document.createElement('div')
        board.setAttribute('class', 'board')
        document.body.appendChild(board);
        let message = document.createElement('div')
        message.setAttribute('id', "message")
        let imageDiv = document.createElement('div')
        let holderDiv = document.createElement('div')
        document.body.appendChild(holderDiv)
        holderDiv.setAttribute('class', 'holderDiv')
        imageDiv.setAttribute('class', 'imageDiv')
        holderDiv.appendChild(imageDiv)
        holderDiv.appendChild(message)
        
        returnImage(0, imageDiv);
        
        let domElements = {
            board,
            message,
            imageDiv,
            holderDiv,
            letterHolder
            
        }
        resolve(domElements)
    })
    
    
}
// Delivers hangman images to div
function returnImage ( turns, el ){
    let roundsGifs = [
        './hangman-assets/g0.jpg',
        './hangman-assets/g1.jpg',
        './hangman-assets/g2.jpg',
        './hangman-assets/g3.jpg',
        './hangman-assets/g4.jpg',
        './hangman-assets/g5.jpg',
        './hangman-assets/g6.jpg'
    ]
    el.style.backgroundImage = `url(${roundsGifs[turns]})`                                
}


// Adds event listers to DOM and controls messages sent back to user
function resetRound(round, alphabet){
    createDom().then((elems) => {
        let {
            board,
            message,
            imageDiv,
            holderDiv,
            letterHolder
            
        } = elems;
        setUpBoard(round.spaces, board)
        
        
        
        
        for (let letter of alphabet) {
            let letterBox = document.createElement('div');
            letterBox.setAttribute('id', `${letter}`);
            letterBox.setAttribute('class', 'letterbox');
            letterHolder.appendChild(letterBox)
            letterBox.innerHTML = letter
            
            letterBox.addEventListener('click', (event) => {
                let {
                    currentTarget
                } = event
                currentTarget.classList.add('red')
                round.guess(currentTarget.id)
                
                
                
                updateBoard(round.spaces, 'board-letter')
               
                message.innerHTML = round.message
                returnImage(round.attempts, imageDiv)
            })
        }
        
        document.addEventListener('keydown', (event)=>{
            console.log('keydown')
            let {key} = event
            
            let element =document.getElementById(key.toLocaleUpperCase())
            element.classList.add('red')
            if( alphabet.indexOf(key.toUpperCase()) !== -1){
                round.guess(key.toUpperCase());
                updateBoard(round.spaces, 'board-letter')
                
                message.innerHTML = round.message
                returnImage(round.attempts, imageDiv)
            }
        })        
    })    
}

// Initializes new round and calls the method to set up board 
function gameRunner(arr){
    let alphabet = ["A","B","C","D","E", "F", "G","H", "I","J", "K", "L","M",
                       "N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
   let round = new HangmanRound(arr)
   resetRound(round, alphabet)
                   
  
    
}

document.addEventListener('DOMContentLoaded', () =>{
     wordsToArray(dict).then((dict)=>{
        
        gameRunner(dict);
     })      
})