const pBtn = document.getElementById('paper')
const rBtn = document.getElementById('rock')
const sBtn = document.getElementById('scissors')
const restart = document.getElementById('restart')


let output = document.getElementById('output')
let result = document.getElementById('result')
let goal = document.getElementById('goal')
let pp = 0 // player points
let cp = 0 // computer points
let start = false
let rounds

result.innerHTML = "Player points  " + pp + " - " + cp +"  Computer points"

pBtn.addEventListener('click', startBattlePaper)
rBtn.addEventListener('click', startBattleRock)
sBtn.addEventListener('click', startBattleScissors)
restart.addEventListener('click', restartGame)

function startBattlePaper() {
  if(start == true) playerMove(pBtn.id)
  else goal.innerHTML="Click new game button to start a game"
}
function startBattleRock() {
  if(start == true) playerMove(rBtn.id)
  else goal.innerHTML="Click new game button to start a game"
}
function startBattleScissors() {
  if(start == true) playerMove(sBtn.id)
  else goal.innerHTML="Click new game button to start a game"
}

function playerMove(btn){
  //makes a move
  const computerChoice = ['','paper','rock','scissors']
  let computerMove = computerChoice[simulate()]
  if(btn == computerMove) write("draw", btn, computerMove)
  else if(btn == 'paper' && computerMove == 'scissors') write("lost", btn, computerMove)
  else if(btn == 'paper') write("won", btn, computerMove)
  else if(btn == 'scissors' && computerMove == 'rock') write("lost", btn, computerMove)
  else if(btn == 'scissors') write("won", btn, computerMove)
  else if(btn == 'rock' && computerMove == 'paper') write("lost", btn, computerMove)
  else if(btn == 'rock') write("won", btn, computerMove)
  
  // chceck if you shuld still play
  if(pp == rounds){
    goal.innerHTML="CONGRATULATION you WON the battle!"
    start = false
  }   
  if(cp == rounds){
    goal.innerHTML="You lost the battle. Try again!"
    start = false
  } 
}

function simulate() {
    return Math.floor(Math.random()*3+1)
}

function write(what, btn, computerMove){
  if(what == "draw")
    output.innerHTML = "DRAW: you played " + btn + ", computer played " + computerMove
  if(what == "lost"){
    output.innerHTML = "LOST: you played " + btn + ", computer played " + computerMove
    cp++
    result.innerHTML = "Player points  " + pp + " - " + cp +"  Computer points"
  } 
  if(what == "won"){
    output.innerHTML = "WON: you played " + btn + ", computer played " + computerMove
    pp++
    result.innerHTML = "Player points  " + pp + " - " + cp +"  Computer points"
  }    
}

function restartGame(){
  rounds = prompt("How many rounds do you want to play?", "5")
  if(onlyNumbers(rounds)){
    start = true
    pp = 0
    cp = 0
    result.innerHTML = "Player points  " + pp + " - " + cp +"  Computer points"
    output.innerHTML = ""
    rounds = parseInt(rounds)
    goal.innerHTML="To win the game score " + rounds + " points."
  }
  else{
    alert("You used wrong charackters. Try again.")
  }
  
}

  function onlyNumbers(str) {
  for(let i=0; i<str.length; i++)
    if(str.charCodeAt(i) < 48 || str.charCodeAt(i) >  57) 
        return false
   return true
  }