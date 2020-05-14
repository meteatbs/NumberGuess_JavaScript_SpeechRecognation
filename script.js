const msgEl=document.getElementById('msg');

const randomNum=getRandomNumber();

window.SpeechRecognition=window.SpeechRecognition||window.webkitSpeechRecognition;


let recognation=new window.SpeechRecognition();


//Start recognation and game

recognation.start();


//Capture user speak we use eventlistener so its e
function onSpeak(e) {
    // console.log(e);
    const msg=e.results[0][0].transcript

   writeMessage(msg);
   checkNumber(msg);

    
}
//Write what user speaks
function writeMessage(msg) {
    msgEl.innerHTML=`
    <div>You said: </div>
    <span class="box">${msg}</span>
    
    `;
}
//Check message against number
function checkNumber() {
    const num=+msg;
    //Check if valid number
    if (Number.isNaN(num)) {
        msgEl.innerHTML+='<div>That is not a valid number</div>';
        return;
    }

//Check in range
    if (num>100 || num<1) {
        msgEl.innerHTML+='<div>Number must be between 1 and 100</div>';
        return;
    }

    //Check number
    if (num===randomNum) {
        document.body.innerHTML=`
        <h2>Congrats! You have guessed the number! <br><br>
        It was ${num}</h2>
        <button class="play-again" id="play-again">Play Again</button>
        `;
    }
    else if(num>randomNum){
msgEl.innerHTML+='<div>Go Lower</div>';
    }else{
        msgEl.innerHTML+='<div>Go Higher</div>';
    }
}



//Generate rundom number



console.log('Number: ',randomNum);

function getRandomNumber() {
    return Math.floor(Math.random()*100)+1;
}

//Speak result
recognation.addEventListener('result',onSpeak);

//End SR service
recognation.addEventListener('end',()=>{
    recognation.start()
})

document.body.addEventListener('click',(e)=>{
    if (e.target.id=='play-again') {
        window.location.reload();
    }
});