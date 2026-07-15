/* ==========================================
   GoNoGo Pro
   script.js
   قسمت اول
========================================== */


/* ===========================
      گرفتن المان‌های صفحه
=========================== */

const startScreen=document.getElementById("startScreen");
const countdownScreen=document.getElementById("countdownScreen");
const testScreen=document.getElementById("testScreen");
const resultScreen=document.getElementById("resultScreen");

const startButton=document.getElementById("startButton");
const restartButton=document.getElementById("restartButton");

const countdownNumber=document.getElementById("countdownNumber");

const stimulus=document.getElementById("stimulus");

const progressBar=document.getElementById("progressBar");

const phaseLabel=document.getElementById("phaseLabel");

const trialCounter=document.getElementById("trialCounter");

const summaryPanel=document.getElementById("summaryPanel");

const trialTable=document.querySelector("#trialTable tbody");


/* ===========================
      اطلاعات آزمودنی
=========================== */

const participant={

    name:"",
    code:"",
    age:"",
    gender:""

};


/* ===========================
      متغیرهای آزمون
=========================== */

let experiment=[];

let currentTrial=-1;

let currentStimulus="";

let reactionStart=0;

let responded=false;

let finished=false;


/* ===========================
      نتایج
=========================== */

let results=[];


/* ===========================
      اتصال دکمه‌ها
=========================== */

startButton.addEventListener(

    "click",

    startExperiment

);

restartButton.addEventListener(

    "click",

    restartExperiment

);


/* ===========================
      شروع آزمون
=========================== */

async function startExperiment(){

    participant.name=
        document.getElementById("participantName").value;

    participant.code=
        document.getElementById("participantCode").value;

    participant.age=
        document.getElementById("participantAge").value;

    participant.gender=
        document.getElementById("participantGender").value;

    if(participant.name.trim()==""){

        alert("نام آزمودنی را وارد کنید.");

        return;

    }

    experiment=buildExperiment().all;

    results=[];

    currentTrial=-1;

    finished=false;

    startScreen.classList.add("hidden");

    enterFullscreen();

    showCountdown();

}


/* ===========================
      Full Screen
=========================== */

async function enterFullscreen(){

    try{

        if(!document.fullscreenElement){

            await document.documentElement.requestFullscreen();

        }

    }

    catch(e){

        console.log(e);

    }

}


/* ===========================
      خروج از Fullscreen
=========================== */

function exitFullscreen(){

    if(document.fullscreenElement){

        document.exitFullscreen();

    }

}


/* ===========================
      شمارش معکوس
=========================== */

function showCountdown(){

    countdownScreen.classList.remove("hidden");

    let number=3;

    countdownNumber.innerHTML=number;

    const interval=setInterval(()=>{

        number--;

        countdownNumber.innerHTML=number;

        if(number===0){

            clearInterval(interval);

            countdownScreen.classList.add("hidden");

            testScreen.classList.remove("hidden");

            startTrials();

        }

    },1000);

}


/* ===========================
      شروع اجرای Trialها
=========================== */

function startTrials(){

    nextTrial();

}


/* ===========================
      شروع مجدد
=========================== */

function restartExperiment(){

    exitFullscreen();

    location.reload();

}
/* ==========================================
   script.js
   قسمت دوم
========================================== */


/* ===========================
      ثبت پاسخ Space
=========================== */

document.addEventListener("keydown",handleKeyPress);

function handleKeyPress(event){

    if(finished) return;

    if(currentTrial<0) return;

    if(event.code!=="Space") return;

    event.preventDefault();

    if(responded) return;

    responded=true;

    const rt=Math.round(

        performance.now()-reactionStart

    );

    results[currentTrial].pressed=true;

    results[currentTrial].rt=rt;

}


/* ===========================
      اجرای Trial بعدی
=========================== */

function nextTrial(){

    currentTrial++;

    if(currentTrial>=experiment.length){

        finishExperiment();

        return;

    }

    responded=false;

    currentStimulus=experiment[currentTrial];

    updateProgress();

    showStimulus();

}


/* ===========================
      نمایش محرک
=========================== */

function showStimulus(){

    stimulus.style.display="block";

    if(currentStimulus==="G"){

        stimulus.style.background="#20c95a";

    }

    else{

        stimulus.style.background="#d63031";

    }

    phaseLabel.innerHTML=

        currentTrial<10 ?

        "تمرین"

        :

        "اصلی";

    trialCounter.innerHTML=

        (currentTrial+1)

        +

        " / "

        +

        experiment.length;

    reactionStart=performance.now();

    results.push({

        trial:currentTrial+1,

        phase:currentTrial<10 ?

              "Practice"

              :

              "Main",

        stimulus:currentStimulus,

        pressed:false,

        rt:null

    });

    setTimeout(

        hideStimulus,

        500

    );

}


/* ===========================
      مخفی کردن محرک
=========================== */

function hideStimulus(){

    stimulus.style.display="none";

    setTimeout(

        nextTrial,

        500

    );

}


/* ===========================
      Progress Bar
=========================== */

function updateProgress(){

    const percent=

    (

        currentTrial

        /

        experiment.length

    )

    *

    100;

    progressBar.style.width=

        percent

        +

        "%";

}


/* ===========================
      پایان آزمون
=========================== */

function finishExperiment(){

    finished=true;

    testScreen.classList.add(

        "hidden"

    );

    resultScreen.classList.remove(

        "hidden"

    );

    exitFullscreen();

    showResults();

}
