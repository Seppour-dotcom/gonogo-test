/* ==========================================
   GoNoGo Pro
   csv.js
========================================== */


/* ===========================
      دانلود CSV
=========================== */

function downloadCSV(){

    let csv=[];

    csv.push([
        "Name",
        participant.name
    ]);

    csv.push([
        "Code",
        participant.code
    ]);

    csv.push([
        "Age",
        participant.age
    ]);

    csv.push([
        "Gender",
        participant.gender
    ]);

    csv.push([]);

    csv.push([
        "Trial",
        "Phase",
        "Stimulus",
        "Pressed",
        "ReactionTime(ms)",
        "Result"
    ]);

    results.forEach(r=>{

        let result="";

        if(r.stimulus==="G"){

            result=r.pressed
                ? "Correct"
                : "Omission";

        }

        else{

            result=r.pressed
                ? "Commission"
                : "Correct";

        }

        csv.push([

            r.trial,

            r.phase,

            r.stimulus==="G"
                ? "Green"
                : "Red",

            r.pressed
                ? "Yes"
                : "No",

            r.rt===null
                ? ""
                : r.rt,

            result

        ]);

    });

    csv.push([]);

    const stats=calculateStatistics(results);

    csv.push([
        "Accuracy",
        (stats.accuracy*100).toFixed(2)+"%"
    ]);

    csv.push([
        "Correct",
        stats.correct
    ]);

    csv.push([
        "Incorrect",
        stats.incorrect
    ]);

    csv.push([
        "Commission",
        stats.commission
    ]);

    csv.push([
        "Omission",
        stats.omission
    ]);

    csv.push([
        "Hit Rate",
        (stats.hitRate*100).toFixed(2)+"%"
    ]);

    csv.push([
        "False Alarm Rate",
        (stats.falseAlarmRate*100).toFixed(2)+"%"
    ]);

    csv.push([
        "Mean RT",
        stats.meanRT.toFixed(2)
    ]);

    csv.push([
        "Median RT",
        stats.medianRT.toFixed(2)
    ]);

    csv.push([
        "SD RT",
        stats.sdRT.toFixed(2)
    ]);

    csv.push([
        "Min RT",
        stats.minRT
    ]);

    csv.push([
        "Max RT",
        stats.maxRT
    ]);


    const csvContent=

        csv

        .map(

            row=>

            row.join(",")

        )

        .join("\n");


    const blob=new Blob(

        [csvContent],

        {

            type:"text/csv;charset=utf-8;"

        }

    );


    const url=

        URL.createObjectURL(blob);

    const link=

        document.createElement("a");

    link.href=url;

    link.download=

        participant.code===""
        ?
        "GoNoGo_Result.csv"
        :
        participant.code+"_GoNoGo.csv";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);

}


/* ===========================
      اتصال دکمه دانلود
=========================== */

window.addEventListener(

    "load",

    ()=>{

        const btn=

            document.getElementById(

                "csvButton"

            );

        if(btn){

            btn.addEventListener(

                "click",

                downloadCSV

            );

        }

    }

);
