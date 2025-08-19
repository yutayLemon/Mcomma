import {SyntaxTree} from "./SyntaxTree.js"

const canvas = document.querySelector(".MainCanvas");
const PattCanvas = document.querySelector(".PattenCanvas");
PattCanvas.width = 30;
PattCanvas.height = 30;
const pctx = PattCanvas.getContext("2d");
const rect = canvas.parentElement.getBoundingClientRect();
canvas.width = rect.width;
canvas.height = rect.height;

const ctx = canvas.getContext("2d");


function UpdateCanvas(){ 
    window.EditorState.debug = true;
    let inverseScale = 1/window.GlobalScale;
    
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0,0, canvas.width, canvas.height);
    Grid(30*window.GlobalScale); //grid and clear befor scaling and positioning

    ctx.translate(canvas.width/2,canvas.height/2);
    ctx.scale(window.GlobalScale,window.GlobalScale);
    
    
    window.Componets.Physical.initReach();
    window.Componets.Physical.update();
    window.Componets.Vertial.update();
    //updateDebug(Componets.DebugPhysical);

    window.Componets.Physical.draw();
    window.Componets.Vertial.draw();
    window.Componets.DebugPhysical.draw();
    
    UpdateMouseInteraction();
    requestAnimationFrame(()=>{UpdateCanvas()});
}

function CanvasResize(){
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    ctx.translate(canvas.width/2,canvas.height/2);
    window.canvasOffset = {x:canvas.width/2,y:canvas.height/2}
}

function initResize(){
    CanvasResize();
    window.addEventListener("resize",CanvasResize);
    console.log("init:auto resize");
}

function updateDebug(Components){
    for(const point of Components.children){
        point.color = "red";
    }
    for(const item of window.Componets.Physical){//FIX
            if (typeof item.colide === "function") {
                let findebug = item.colide(Components.Global, Components.radi);//cheack for coligions
                if(findebug.buffer){
                    Components.color = "green";
                }
                if(findebug.Exact){
                    Components.color = "blue";
                }
            } 
        }
}



function UpdateMouseInteraction(){
    window.EditorState.CursorState = "ideal";
    let OverlapCompnents = [];
    let maxItem = {};
    let maxCodeItem = {};
    maxCodeItem.layer = 0;
    maxItem.layer = 0;
    if(window.Componets != undefined && window.Componets.Physical != undefined){
            if (typeof window.Componets.Physical.colide === "function") {
                let ColideArr = [];
                let itemRes = window.Componets.Physical.colide(window.mousePos, 0,ColideArr);//cheack for coligions
                
                for(const obj of  ColideArr){
                    OverlapCompnents.push(obj);
                    if(obj.layer >= maxItem.layer){
                        maxItem = obj;
                    }
                    if(obj.layer >= maxCodeItem.layer && obj.CodeComp){
                        maxCodeItem = obj;
                    }
                }
            } 
    }
    window.TopItems.maxCodeItem = maxCodeItem;
    window.TopItems.maxItem = maxItem;
    if(window.EditorState.CursorState == "hover"){
        canvas.style.cursor = "pointer";
    }else{
        canvas.style.cursor = "crosshair";
    }

}




function Grid(len){
    PattCanvas.width = len;
    PattCanvas.height = len;

    pctx.strokeStyle = 'gray';
    pctx.lineWidth = 1;

    pctx.beginPath();
    pctx.moveTo(0, 0);
    pctx.lineTo(0, len);
    pctx.lineTo(len, len);
    pctx.lineTo(len, 0);
    pctx.lineTo(0, 0);
    pctx.stroke();

    const pattern = ctx.createPattern(PattCanvas, 'repeat');
    ctx.fillStyle = pattern;
    let inverseScale = 1/window.GlobalScale;
    ctx.fillRect(0,0,canvas.width,canvas.height);
}



function updateText(){
    let Editor = document.querySelector(".CodeEditor#Mcomma");
    let SynTree = SyntaxTree.Build(window.Componets.Physical);
    console.log(SynTree);
    Editor.innerHTML = SyntaxTree.Format(SyntaxTree.DrawTree(window.Componets.Physical));
}


export{canvas,ctx,UpdateCanvas,Grid,initResize,UpdateMouseInteraction,updateText};