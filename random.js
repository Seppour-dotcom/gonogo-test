```javascript
/* ===========================================
   GoNoGo Pro
   random.js
=========================================== */


/*
    G = Go (سبز)

    R = NoGo (قرمز)
*/


const PRACTICE_GO = 6;
const PRACTICE_NOGO = 4;

const MAIN_GO = 42;
const MAIN_NOGO = 28;


/* ===========================================
    Shuffle
=========================================== */

function shuffle(array){

    for(let i=array.length-1;i>0;i--){

        const j=Math.floor(Math.random()*(i+1));

        [array[i],array[j]]=[array[j],array[i]];

    }

    return array;

}


/* ===========================================
    بررسی محدودیت‌های توالی
=========================================== */

function validPlacement(sequence,color){

    const n=sequence.length;

    // بیش از سه سبز پشت سر هم

    if(color==="G"){

        if(

            n>=3 &&

            sequence[n-1]==="G" &&

            sequence[n-2]==="G" &&

            sequence[n-3]==="G"

        ){

            return false;

        }

    }

    // بیش از دو قرمز پشت سر هم

    if(color==="R"){

        if(

            n>=2 &&

            sequence[n-1]==="R" &&

            sequence[n-2]==="R"

        ){

            return false;

        }

    }

    return true;

}


/* ===========================================
    ساخت توالی شبه‌تصادفی
=========================================== */

function generateSequence(goCount,noGoCount){

    let go=goCount;

    let red=noGoCount;

    let sequence=[];

    while(go>0 || red>0){

        let options=[];

        if(

            go>0 &&

            validPlacement(sequence,"G")

        ){

            options.push("G");

        }

        if(

            red>0 &&

            validPlacement(sequence,"R")

        ){

            options.push("R");

        }

        // اگر هیچ گزینه‌ای نماند

        if(options.length===0){

            return generateSequence(goCount,noGoCount);

        }

        let choice;

        // اگر هر دو مجازند

        if(options.length===2){

            const pRed=red/(go+red);

            choice=Math.random()<pRed ? "R":"G";

        }

        else{

            choice=options[0];

        }

        sequence.push(choice);

        if(choice==="G"){

            go--;

        }

        else{

            red--;

        }

    }

    return sequence;

}


/* ===========================================
    تولید کل آزمون
=========================================== */

function buildExperiment(){

    const practice=

        generateSequence(

            PRACTICE_GO,

            PRACTICE_NOGO

        );

    const main=

        generateSequence(

            MAIN_GO,

            MAIN_NOGO

        );

    return{

        practice,

        main,

        all:[

            ...practice,

            ...main

        ]

    };

}


/* ===========================================
    ابزار کمکی
=========================================== */

function countGo(sequence){

    return sequence.filter(x=>x==="G").length;

}

function countNoGo(sequence){

    return sequence.filter(x=>x==="R").length;

}


/*
نمونه استفاده:

const exp=buildExperiment();

console.log(exp.practice);

console.log(exp.main);

console.log(exp.all);

*/
```
