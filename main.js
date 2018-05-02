const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");
const LSystem = require('lindenmayer');
const $ = require('jquery');
const reset = document.getElementById("button");
const save = document.getElementById("save");
const blank = document.getElementById("blank");
const getTrainArray = document.getElementById("train");

 
//AXIOM RANDOMIZATION
let charNum;
let axiomLength;
let axiomString ='';
let productionString ='';
let initNum;
let initNum2;


//VALUES FOR NEURAL NET
let axiomDefinerLengthKey; 
let productionDefinerLengthKey;
let axiomArray = [];
let productionArray = [];
let inputObject;
let outputObject;
let trainObject;
let trainingArray =[];
let angleMaker;
let angleMaker2;


///HELPER FUNCTIONS











////INITIALIZE VALUES
const randomAngleNum =()=>{
    initNum= Math.floor((Math.random()*180)+1);   

} 

const randomAngleNum2 =()=>{
    initNum2= Math.floor((Math.random()*180)+1);   
} 


const axiomDefiner = ()=>{
    axiomLength = Math.floor(Math.random()*4)+1
    axiomDefinerLengthKey = axiomLength/4
}

const productionDefiner = ()=>{
    axiomLength = Math.floor(Math.random()*10)+1
    // productionDefinerLengthKey = axiomLength/10
 }



///CONDITIONAL SETS
const setConditional = ()=>{
    ctx.rotate((Math.PI/60) * initNum) 
    // angleMaker = initNum/60;
}

const setConditional2 = ()=>{ 
    ctx.rotate((Math.PI/60) * -initNum2) 
    // angleMaker2 = initNum2/60;
}

const axiomMaker = ()=>{
    axiomDefiner()
    for(let i = 0;i<2;i++){
        charNum =  Math.floor(Math.random()*2)+1
        // axiomArray.push(charNum/4)
        if (charNum === 1){
            axiomString = 'X';
        } else if(charNum === 2)   {
            axiomString = 'F';
        } 
    }
    return axiomString
}

const setProduction1 = ()=>{
    productionDefiner()
    for(let i = 0;i<5;i++){
        charNum =  Math.floor(Math.random()*5)+1
        // setProductionvalue = charNum/5
        if (charNum === 1){
            productionString = 'F';
        } else if(charNum === 2)   {
            productionString = 'FF';
        } else if(charNum === 3) {
            productionString ='FFF';
        } else if(charNum === 4){
            productionString ='FF-';
        } else if(charNum === 5){
            productionString ='FFF-';
        } else if(charNum === 5){
            productionString ='F-FF-';
        } else if(charNum === 5){
            productionString ='F-F++F-F';
        } 
    }    
    return productionString
}


const productionMaker2 = ()=>{
    productionDefiner()
    for(let i = 0;i<6;i++){
        charNum =  Math.floor(Math.random()*6)+1
        // productionMaker2Value = charNum/6
        if (charNum === 1){
            productionString = 'F-F++F-F'
        } else if(charNum === 2)   {
            productionString = 'X';
        } else if(charNum === 3) {
            productionString ='F---[-F[+FX]-X';
        } else if(charNum === 4){
            productionString ='F---[-[X]--X]-F[+FX]-X';  
        } else if(charNum === 5){
            productionString ='F---[-[X]-F[+FX]-X';
        } else if(charNum === 6){
            productionString ='F--[-[X]----X]-F[+FX]-X';
        } 
    }    
    return productionString
}
const setDrawLogic = ()=>{
    let setNum= ()=>{
    charNum =  Math.floor(Math.random()*2)+1
        
    }
    charNum =  Math.floor(Math.random()*2)+1
    // setDrawValue = charNum
        let dividend = Math.floor(Math.random()*60)+10
        let moveXValue = Math.floor(Math.random()*10)
        let moveYValue = Math.floor(Math.random()*10)
        

    for(let i = 0;i<2;i++){
        if (charNum === 1){

            ctx.beginPath();
            ctx.moveTo(0,0);
            
            // ctx.moveTo(moveXValue,moveYValue);
            ctx.lineTo(0, dividend/(koch.iterations + 1));
            ctx.stroke();
            ctx.strokeStyle= "blue";
            ctx.translate(0, dividend/(koch.iterations + 1))
        } else if(charNum === 2)   {
            
            ctx.beginPath();
            ctx.moveTo(0,0);
            ctx.lineTo(0, dividend/(koch.iterations + 1));
            ctx.stroke();
            ctx.strokeStyle= "blue";
            ctx.translate(0, dividend/(koch.iterations + 1))
       
        } 
    }
}


const setSaveLogic = ()=>{
    for(let i = 0;i<3;i++){
        charNum =  Math.floor(Math.random()*3)+1
        // setSaveLogicValue = charNum/3;
        if (charNum === 1){
            ctx.save()  
        } else if(charNum === 2){
            ctx.save()
            ctx.strokeStyle= "light blue";   
        } else if(charNum === 3){} 
    }   
};

const setRestoreLogic = ()=>{
    for(let i = 0;i<2;i++){
        charNum =  Math.floor(Math.random()*2)+1
        // setSaveLogicValue = charNum/3;
        if (charNum === 1){
            ctx.restore()
        } else if(charNum === 2){
            ctx.restore()
            ctx.strokeStyle= "dark blue";   
        } 
    }   
};

// L-SYSTEM 
// translate to center of canvas
ctx.translate(canvas.width / 2, canvas.height / 4)
const koch = new LSystem({
    axiom: axiomMaker(),

    productions: {'F': setProduction1(), 'X':productionMaker2() },
    finals: {
    '+': () => {setConditional()},
    '-': () => {setConditional2()},
    'F': () => {setDrawLogic()},
    '[': () => {setSaveLogic()},
    ']': () => {setRestoreLogic()}
    }

})



////BUTTONS

// let execute = ()=>{
    randomAngleNum()
    randomAngleNum2()
    koch.iterate(5)
    koch.final()
// }


reset.addEventListener("click", ()=>{
    canvas.height = 1000;
    canvas.width = 1000;
    // execute();
})

save.addEventListener("click", ()=>{
    defineInputObjectLiked();  
})

blank.addEventListener("click",()=>{
    defineInputObjectBlank();  
})

getTrainArray.addEventListener("click",()=>{
    console.log(trainingArray);
})

////////////////

let defineInputObjectLiked = ()=>{
    inputObject = {
     
    }
    outputObject = {
        like:1
    }

    trainObject = {input:inputObject, output: outputObject};
    trainingArray.push(trainObject);
}

let defineInputObjectBlank = ()=>{
    inputObject = {
    
    }
    outputObject = {
        blank:1
    }
    trainObject = {input:inputObject, output: outputObject};
    trainingArray.push(trainObject);
}

/////AJAX STUFF
const getData =()=>{
    return new Promise((resolve, reject)=>{
        $.ajax({
            url:"./trainingData.json"
        }).done(data=>{
            console.log(data);
            resolve(data)
        }).fail((error)=>{
            reject(error);
        });
    }); 
};

const sendData =()=>{
    return new Promise((resolve, reject) => { 
        $.ajax({
            url:`https://artnet-bbc84.firebaseio.com/`,
            method: "POST",
            data: trainObject
        }).done(data => {
            console.log(data);
            resolve(data);
            });
    });
}





getData();
save.addEventListener("click", sendData);








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