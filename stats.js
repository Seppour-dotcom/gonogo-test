/* ==========================================
   GoNoGo Pro
   stats.js
========================================== */


/* ===========================
      محاسبه آمار آزمون
=========================== */

function calculateStatistics(results){

    let correct=0;

    let incorrect=0;

    let commission=0;

    let omission=0;

    let hits=0;

    let falseAlarms=0;

    let goTrials=0;

    let noGoTrials=0;

    let rt=[];

    results.forEach(r=>{

        if(r.stimulus==="G"){

            goTrials++;

            if(r.pressed){

                correct++;

                hits++;

                rt.push(r.rt);

            }

            else{

                incorrect++;

                omission++;

            }

        }

        else{

            noGoTrials++;

            if(r.pressed){

                incorrect++;

                commission++;

                falseAlarms++;

            }

            else{

                correct++;

            }

        }

    });

    return{

        total:results.length,

        correct,

        incorrect,

        commission,

        omission,

        hitRate:

            hits/goTrials,

        falseAlarmRate:

            falseAlarms/noGoTrials,

        accuracy:

            correct/results.length,

        meanRT:

            mean(rt),

        medianRT:

            median(rt),

        sdRT:

            standardDeviation(rt),

        minRT:

            rt.length?

            Math.min(...rt):0,

        maxRT:

            rt.length?

            Math.max(...rt):0

    };

}


/* ===========================
      نمایش نتایج
=========================== */

function showResults(){

    const s=

        calculateStatistics(results);

    accuracyValue.innerHTML=

        (s.accuracy*100).toFixed(1)+"%";

    correctValue.innerHTML=

        s.correct;

    incorrectValue.innerHTML=

        s.incorrect;

    commissionValue.innerHTML=

        s.commission;

    omissionValue.innerHTML=

        s.omission;

    meanValue.innerHTML=

        s.meanRT.toFixed(1);

    medianValue.innerHTML=

        s.medianRT.toFixed(1);

    sdValue.innerHTML=

        s.sdRT.toFixed(1);

    hitRateValue.innerHTML=

        (s.hitRate*100).toFixed(1)+"%";

    falseAlarmValue.innerHTML=

        (s.falseAlarmRate*100).toFixed(1)+"%";

    createTable();

}


/* ===========================
      جدول نتایج
=========================== */

function createTable(){

    trialTable.innerHTML="";

    results.forEach(r=>{

        let result;

        if(r.stimulus==="G"){

            result=r.pressed?

            "Correct":

            "Omission";

        }

        else{

            result=r.pressed?

            "Commission":

            "Correct";

        }

        trialTable.innerHTML+=`

<tr>

<td>${r.trial}</td>

<td>${r.phase}</td>

<td>${r.stimulus=="G"?"🟩":"🟥"}</td>

<td>${r.pressed?"Space":"-"}</td>

<td>${r.rt??"-"}</td>

<td>${result}</td>

</tr>

`;

    });

}


/* ===========================
      میانگین
=========================== */

function mean(arr){

    if(arr.length===0)

        return 0;

    return arr.reduce(

        (a,b)=>a+b,0

    )/arr.length;

}


/* ===========================
      میانه
=========================== */

function median(arr){

    if(arr.length===0)

        return 0;

    const a=[...arr].sort(

        (x,y)=>x-y

    );

    const mid=

        Math.floor(

            a.length/2

        );

    if(a.length%2===0){

        return(

            a[mid-1]+a[mid]

        )/2;

    }

    return a[mid];

}


/* ===========================
      انحراف معیار
=========================== */

function standardDeviation(arr){

    if(arr.length===0)

        return 0;

    const m=

        mean(arr);

    const variance=

        arr.reduce(

            (sum,x)=>

            sum+

            Math.pow(x-m,2),

            0

        )/

        arr.length;

    return Math.sqrt(

        variance

    );

}
