/* ==========================================
   GoNoGo Pro
   random.js
========================================== */


/*
    G = Go (سبز)

    R = No-Go (قرمز)
*/


/* ===========================
        تنظیمات آزمون
=========================== */

const PRACTICE_TRIALS = 10;
const MAIN_TRIALS = 70;

const GO_RATIO = 0.60;
const NOGO_RATIO = 0.40;

const MAX_GO_STREAK = 3;
const MAX_NOGO_STREAK = 2;


/* ===========================
      ساخت یک بلوک آزمون
=========================== */

function buildBlock(totalTrials){

    const goTarget =
        Math.round(totalTrials * GO_RATIO);

    const noGoTarget =
        totalTrials - goTarget;

    while(true){

        const seq = generateSequence(
            goTarget,
            noGoTarget
        );

        if(validateSequence(seq)){

            return seq;

        }

    }

}


/* ===========================
      ساخت کل آزمون
=========================== */

function buildExperiment(){

    const practice =
        buildBlock(PRACTICE_TRIALS);

    const main =
        buildBlock(MAIN_TRIALS);

    return{

        practice,

        main,

        all:[
            ...practice,
            ...main
        ]

    };

}


/* ===========================
      الگوریتم تولید توالی
=========================== */

function generateSequence(goCount,noGoCount){

    let sequence=[];

    let go=goCount;

    let noGo=noGoCount;

    while(go>0 || noGo>0){

        let choices=[];

        if(

            go>0 &&

            canPlace(
                sequence,
                "G"
            )

        ){

            choices.push("G");

        }

        if(

            noGo>0 &&

            canPlace(
                sequence,
                "R"
            )

        ){

            choices.push("R");

        }

        if(choices.length===0){

            return [];

        }

        let pick;

        if(choices.length===2){

            const probability =
                noGo/(go+noGo);

            pick =
                Math.random()<probability
                ?
                "R"
                :
                "G";

        }

        else{

            pick=choices[0];

        }

        sequence.push(pick);

        if(pick==="G"){

            go--;

        }

        else{

            noGo--;

        }

    }

    return sequence;

}


/* ===========================
      محدودیت پشت سر هم
=========================== */

function canPlace(sequence,color){

    if(color==="G"){

        let streak=0;

        for(
            let i=sequence.length-1;
            i>=0;
            i--
        ){

            if(sequence[i]==="G"){

                streak++;

            }

            else{

                break;

            }

        }

        if(streak>=MAX_GO_STREAK){

            return false;

        }

    }

    else{

        let streak=0;

        for(
            let i=sequence.length-1;
            i>=0;
            i--
        ){

            if(sequence[i]==="R"){

                streak++;

            }

            else{

                break;

            }

        }

        if(streak>=MAX_NOGO_STREAK){

            return false;

        }

    }

    return true;

}


/* ===========================
      اعتبارسنجی نهایی
=========================== */

function validateSequence(sequence){

    if(sequence.length===0){

        return false;

    }

    let goRun=0;
    let redRun=0;

    let redGap=0;

    for(let i=0;i<sequence.length;i++){

        if(sequence[i]==="G"){

            goRun++;

            redRun=0;

            redGap++;

            if(goRun>MAX_GO_STREAK){

                return false;

            }

            /*
                اگر بیش از ۶ سبز
                پشت سر هم در فاصله
                بین دو قرمز ایجاد شود
                توالی رد می‌شود.
            */

            if(redGap>6){

                return false;

            }

        }

        else{

            redRun++;

            goRun=0;

            redGap=0;

            if(redRun>MAX_NOGO_STREAK){

                return false;

            }

        }

    }

    return true;

}


/* ===========================
      ابزارهای کمکی
=========================== */

function countGo(sequence){

    return sequence.filter(
        x=>x==="G"
    ).length;

}

function countNoGo(sequence){

    return sequence.filter(
        x=>x==="R"
    ).length;

}

function printSequence(sequence){

    console.log(

        sequence.join(" ")

    );

}
