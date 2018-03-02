var h1 = document.getElementById('timer') //referencing html elements
var start = document.getElementById('start')
var stop = document.getElementById('stop')
var clear = document.getElementById('clear')
var seconds = 0 // Declare Global Variables
var minutes = 0;
var time = 0;       

function add() {    //adds one second to the timer when called
    seconds++;      //increments seconds

    //Converts 60 seconds to 1 minute on the timer
    if (seconds >= 60) {    
        seconds = 0;
        minutes++;  
    }
    
    h1.textContent = "Time : " + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
    timer();   
}
function timer() {
    time = setTimeout(add, 1000);   // Calls the add() function once every second
    }

  
/* Start Timer */
function startTimer() {
    timer();
}


/* Stop Timer */
function stopTimer() {
        clearTimeout(time);
}






