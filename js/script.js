const pBtn = document.getElementById('paper')
const rBtn = document.getElementById('rock')
const sBtn = document.getElementById('scissors')
const restart = document.getElementById('restart')
const choiceBtns = document.querySelectorAll(".player-move")
const gameStart = document.getElementById('btn-start')

let output = document.getElementById('output')
let result = document.getElementById('result')
let goal = document.getElementById('goal')
let playerName = 'Player'
let start = false


let params = {
  rounds: 0,
  pp: 0,// player points
  cp: 0, // computer points
  progress: []
};

result.innerHTML = playerName + " " + params.pp + " " + params.cp +"  Computer"

for (let i = 0; i < choiceBtns.length; i++) {
  choiceBtns[i].addEventListener('click', startBattle)
}

restart.addEventListener('click', function(){
  document.querySelector('#modal-overlay').classList.add('show');
  document.querySelector('#modal-newgame').classList.add('show');
})

gameStart.addEventListener('click', restartGame)

function startBattle(event) {
  if(start == true) playerMove(event.target.dataset.move)
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

  //creates history of moves
    params.progress.push({
    round: params.progress.length + 1,
    pMove: btn,
    cMove: computerMove,
    score: params.pp + " - " + params.cp
  })
  
  // chceck if you shuld still play
  if(params.pp == params.rounds){
    document.querySelector('#modal-overlay').classList.add('show');
    document.querySelector('#modal-won').classList.add('show');
    createTable()
    start = false
  }   
  if(params.cp == params.rounds){
    document.querySelector('#modal-overlay').classList.add('show');
    document.querySelector('#modal-lost').classList.add('show');
    createTable()
    start = false
  } 
}

function createTable() {
  var table = "<table border='1|1'>";
  // first line
        table+="<tr>"
        table+="<td>Round</td>"
        table+="<td>"+playerName+"</td>"
        table+="<td>Computer moved</td>"
        table+="<td>Score</td>"
        table+="</tr>"
  // adding rest of data 
  for (var i = 0; i <  params.progress.length; i++) {
      table+="<tr>"
      table+="<td>"+ params.progress[i].round+"</td>"
      table+="<td>"+ params.progress[i].pMove+"</td>"
      table+="<td>"+ params.progress[i].cMove+"</td>"
      table+="<td>"+ params.progress[i].score+"</td>"
      table+="</tr>"
  }
  table+="</table>";
  document.getElementById('tbl-won').innerHTML = table;
  document.getElementById('tbl-lost').innerHTML = table;
}

function simulate() {
    return Math.floor(Math.random()*3+1)
}

function write(what, btn, computerMove){
  if(what == "draw")
    output.innerHTML = "DRAW: "+playerName+" played " + btn + ", computer played " + computerMove
  if(what == "lost"){
    output.innerHTML = "LOST: "+playerName+" played " + btn + ", computer played " + computerMove
    params.cp++
    result.innerHTML = playerName + " " + params.pp + " " + params.cp +"  Computer"
  } 
  if(what == "won"){
    output.innerHTML = "WON: "+playerName+" played " + btn + ", computer played " + computerMove
    params.pp++
    result.innerHTML = playerName + " " + params.pp + " " + params.cp +"  Computer"
  }    
}

function restartGame(){
  hideModal()
  params.progress = [] // deletes history of moves
  params.rounds = parseInt(document.getElementById('numberOfRounds').value)
  playerName = document.getElementById('playerName').value
  if(onlyNumbers(params.rounds)){
    start = true
    params.pp = 0
    params.cp = 0
    result.innerHTML = playerName + " " + params.pp + " " + params.cp +"  Computer"
    output.innerHTML = ""
    goal.innerHTML="To win the game score " + params.rounds + " points."
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

  var hideModal = function(event){
    document.querySelector('#modal-overlay').classList.remove('show');
    document.querySelector('#modal-won').classList.remove('show');
    document.querySelector('#modal-lost').classList.remove('show');
    document.querySelector('#modal-newgame').classList.remove('show');
  };

  var closeButtons = document.querySelectorAll('.modal .close');
  
  for(var i = 0; i < closeButtons.length; i++){
    closeButtons[i].addEventListener('click', hideModal);
  }

  //closing modal if you click on overlay 
  document.querySelector('#modal-overlay').addEventListener('click', hideModal);