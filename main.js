const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");
const LSystem = require('lindenmayer');
const $ = require('jquery');
const reset = document.getElementById("button");
// const save = document.getElementById("save");
// const blank = document.getElementById("blank");
// const getTrainArray = document.getElementById("train");
// const inputColor = document.getElementById("inputColor");
let koch;
 
//AXIOM RANDOMIZATION
let charNum;
let axiomLength;
let axiomString ='';
let productionString ='';
let production2String ='';
let initNum;
let leftInitNum;
let rightInitNum;
let axiomInitNum;
let prodInitNum1;
let prodInitNum2;
let moveX;
let moveY;
let dividend;
let drawInitNum;
let saveInitNum;
let restoreInitNum;
let rgb;
let result;

//VALUES FOR NEURAL NET
let axiomValue;
let production1Value;
let production2Value;
let leftValue;
let rightValue;
let forwardValue;
let iterationValue;
let dividendValue;
let moveXValue;
let moveYValue;
let drawLogicValue;
let setSaveLogicValue;
let setRestoreLogicValue;
let rColorValue;
let gColorValue;
let bColorValue;
let trainObject;
let inputObject;
let outputObject;

////INITIALIZE VALUES
const leftAngleInit =()=>{
    leftInitNum= Math.floor((Math.random()*180)+1); 
    leftValue = leftInitNum/180;
    // console.log("leftValue", leftValue)
} 

const rightAngleInit =()=>{
    rightInitNum= Math.floor(((Math.random()*180)+1));   
    rightValue = rightInitNum/180;
    // console.log("rightValue", rightValue); 
} 

const axiomInit = ()=>{
    axiomInitNum = Math.floor(Math.random()*2)+1
    axiomValue = axiomInitNum/2;
    // console.log("axiomValue", axiomValue);
}

const production1Init = ()=>{
    prodInitNum1 =  Math.floor(Math.random()*7)+1
    production1Value = prodInitNum1/7;
    // console.log("prod1", production1Value,prodInitNum1);  
 }

const production2Init = ()=>{
    prodInitNum2 =  Math.floor(Math.random()*6)+1
    production2Value = prodInitNum2/6;
    // console.log("prod2", production2Value);  
 }

const dividendInit = ()=>{
    dividend = Math.floor(Math.random()*60)+10;
    dividendValue = dividend/60;
    // console.log("dividend", dividend, dividendValue);  
    
}

const moveXInit = ()=>{
    moveX = Math.floor(Math.random()*10);
    moveXValue = moveX/10;
    // console.log("moveX", moveXValue);  
    
}

const moveYInit = ()=>{
    moveY = Math.floor(Math.random()*10);
    moveYValue = moveY/10;
    // console.log("moveY", moveYValue);  
    
}

const drawLogicInit = ()=>{
    drawInitNum =  Math.floor(Math.random()*2)+1;
    drawLogicValue = drawInitNum/2; 
    // console.log("drawLogic", drawLogicValue);  
    
}

const saveLogicInit = ()=>{
    saveInitNum =  Math.floor(Math.random()*3)+1
    setSaveLogicValue = saveInitNum/3;
    // console.log("saveLogic", setSaveLogicValue);  
    
}

const restoreLogicInit=()=>{
    restoreInitNum =  Math.floor(Math.random()*2)+1
    setRestoreLogicValue = restoreInitNum/2;
    // console.log("restoreLogic", setRestoreLogicValue);         
}

///CONDITIONAL SETS
const setConditional = ()=>{
    ctx.rotate((Math.PI/180) * rightInitNum)   
}

const setConditional2 = ()=>{ 
    ctx.rotate(-((Math.PI/180) * leftInitNum)); 
}

const axiomMaker = ()=>{    
    for(let i = 0;i<2;i++){
        if (axiomInitNum === 1){
            axiomString = 'X';
        } else if(axiomInitNum === 2)   {
            axiomString = 'F';
        } 
    }
    return axiomString
}

const setProduction1 = ()=>{
    for(let i = 0;i<7;i++){
        if (prodInitNum1 === 1){
            productionString = 'F+-F';
        } else if(prodInitNum1 === 2)   {
            productionString = 'FF';
        } else if(prodInitNum1 === 3) {
            productionString ='FFF';
        } else if(prodInitNum1 === 4){
            productionString ='FF-';
        } else if(prodInitNum1 === 5){
            productionString ='FFF-';
        } else if(prodInitNum1 === 6){
            productionString ='F-FF-';
        } else if(prodInitNum1 === 7){
            productionString ='F-F++F-F';
        } 
    }    
    return productionString
}

const setProduction2 = ()=>{
    for(let i = 0;i<6;i++){
        if (prodInitNum2 === 1){
            production2String = 'F-F++F-F'
        } else if(prodInitNum2 === 2)   {
            production2String = 'X';
        } else if(prodInitNum2 === 3) {
            production2String ='F---[-F[+FX]-X';
        } else if(prodInitNum2 === 4){
            production2String ='F---[-[X]--X]-F[+FX]-X';  
        } else if(prodInitNum2 === 5){
            production2String ='F---[-[X]-F[+FX]-X';
        } else if(prodInitNum2 === 6){
            production2String ='F--[-[X]----X]-F[+FX]-X';
        } 
    }    
    return production2String
}

const  getRgb = (hex)=> {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });
  
    result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    console.log(result);
        rColorValue = result[1];
        gColorValue =result[2];
        bColorValue = result[3];
        console.log(rColorValue,gColorValue,bColorValue);
    return result ? {
        r: Math.round(parseInt(result[1], 16) / 2.55) / 100,
        g: Math.round(parseInt(result[2], 16) / 2.55) / 100,
        b: Math.round(parseInt(result[3], 16) / 2.55) / 100,
        
    } : null;
}

// inputColor.addEventListener("input", (event) => {
//     rgb = getRgb(event.target.value);
// });

const setDrawLogic = ()=>{
    for(let i = 0;i<2;i++){
        if (drawInitNum=== 1){
            ctx.beginPath();
            // ctx.moveTo(0,0);
            ctx.moveTo(moveX,moveY);
            ctx.lineTo(0, dividend/(koch.iterations + 1));
            ctx.stroke();
            ctx.strokeStyle= "orange";
            ctx.translate(0, dividend/(koch.iterations + 1));
        } else if(drawInitNum === 2)  {
            ctx.beginPath();
            ctx.moveTo(0,0);
            ctx.lineTo(0, dividend/(koch.iterations + 1));
            ctx.stroke();
            ctx.strokeStyle= "yellow";
            ctx.translate(0, dividend/(koch.iterations + 1))
        } 
    }
}

const setSaveLogic = ()=>{
    for(let i = 0;i<3;i++){
        if (saveInitNum=== 1){
            ctx.save()  
        } else if(saveInitNum=== 2){
            ctx.save()
            ctx.strokeStyle= "aqua";   
        } else if(saveInitNum === 3){} 
    }   
};

const setRestoreLogic = ()=>{
    for(let i = 0;i<2;i++){
        if (restoreInitNum === 1){
            ctx.restore()
        } else if(restoreInitNum === 2){
            ctx.restore()
            ctx.strokeStyle= "white";   
        } 
    }   
};

//////INITIALIZE VALUES   
const launch = ()=>{
    axiomInit() 
    rightAngleInit()
    leftAngleInit() 
    dividendInit()
    moveXInit()
    moveYInit()
    drawLogicInit()
    saveLogicInit()
    restoreLogicInit()
    production1Init()
    production2Init()
}

launch();
// L-SYSTEM 
// translate to center of canvas
ctx.translate(canvas.width / 2, canvas.height / 4)


const doIt = ()=>{
    koch = new LSystem({
        axiom: axiomMaker(),
        productions: {'F': setProduction1(), 'X':setProduction2()},
        finals: {
        '+': () => {setConditional()},
        '-': () => {setConditional2()},
        'F': () => {setDrawLogic()},
        '[': () => {setSaveLogic()},
        ']': () => {setRestoreLogic()}
        }
    })
}




////BUTTONS

// let execute = ()=>{
    doIt();
    koch.iterate(5)
    koch.final()
  console.log(koch.getString())
    
// }


////////////////

let defineInputObjectLiked = ()=>{
    inputObject = {
        axiomValue:axiomValue,
        production1Value:production1Value,
        production2Value:production2Value,
        leftValue:leftValue,
        rightValue:rightValue,
        forwardValue:forwardValue,
        iterationValue:iterationValue,
        dividendValue:dividendValue,
        moveXValue: moveXValue,
        moveYValue:moveYValue,
        drawLogicValue:drawLogicValue,
        setSaveLogicValue:setSaveLogicValue,
        setRestoreLogicValue:setRestoreLogicValue,
        rColorValue:rColorValue,
        gColorValue:gColorValue,
        bColorValue:bColorValue
    }
    outputObject = {
        like:1
    }

    trainObject = {input:inputObject, output: outputObject};
}

let resetObject = ()=>{
        axiomValue=null,
        production1Value=null,
        production2Value=null,
        leftValue=null,
        rightValue=null,
        forwardValue=null,
        iterationValue=null,
        dividendValue=null,
        moveXValue= null,
        moveYValue=null,
        drawLogicValue=null,
        setSaveLogicValue=null,
        setRestoreLogicValue=null,
        rColorValue=null,
        gColorValue=null,
        bColorValue=null
}

let defineInputObjectBlank = ()=>{
    inputObject = {
    
    }
    outputObject = {
        blank:1
    }
    trainObject = {input:inputObject, output: outputObject};
}




reset.addEventListener("click", ()=>{
    console.log("ok1",koch.getString())
    canvas.height = 1000;
    canvas.width = 1000;
    ctx.translate(canvas.width / 2, canvas.height / 4)
    resetObject();    
    launch(); 
    doIt();
    koch.iterate(5);    
    koch.final();
})

// save.addEventListener("click", ()=>{
//     defineInputObjectLiked();  
// })

// blank.addEventListener("click",()=>{
//     defineInputObjectBlank();  
// })

// getTrainArray.addEventListener("click",()=>{
//     console.log(trainingArray);
// })

/////AJAX STUFF
// const getData =()=>{
//     return new Promise((resolve, reject)=>{
//         $.ajax({
//             url:"./trainingData.json"
//         }).done(data=>{
//             console.log(data);
//             resolve(data)
//         }).fail((error)=>{
//             reject(error);
//         });
//     }); 
// };

// const sendData =()=>{
//     return new Promise((resolve, reject) => { 
//         $.ajax({
//             url:`https://artnet-bbc84.firebaseio.com/`,
//             method: "POST",
//             data: trainObject
//         }).done(data => {
//             console.log(data);
//             resolve(data);
//             });
//     });
// }













///////////NEURAL NET
// const brain =require('brain.js');
// const network = new brain.NeuralNetwork({
//     activation: 'sigmoid', // activation function
//     hiddenLayers: [12],
//     learningRate: 0.6 
// })

// network.train(trainArray);

    
// let result = network.run()
// console.log(result);