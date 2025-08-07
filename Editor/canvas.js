const canvas = document.querySelector(".MainCanvas");
const PattCanvas = document.querySelector(".PattenCanvas");
PattCanvas.width = 30;
PattCanvas.height = 30;
const pctx = PattCanvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");


function UpdateCanvas(Components){
    window.EditorState.debug = true;

    ctx.clearRect(0, 0, canvas.width, canvas.height);  
    Grid(30*window.GlobalScale); 

    initCompReach(Components.Physical);

    updateComponets(Components.Physical);
    updateComponets(Components.Vertial);
    updateDebug(Componets.DebugPhysical);

    ScaleCanvasComp(Components.Physical);
    
    DrawComponets(Components.Physical);
    DrawComponets(Components.Vertial);
    DrawComponets(Componets.DebugPhysical);

    UpdateMouseInteraction();

    requestAnimationFrame(()=>{UpdateCanvas(Components)});
}

function CanvasResize(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function initResize(){
    CanvasResize();
    window.addEventListener("resize",CanvasResize);
    console.log("init:auto resize");
}

function updateDebug(Components){
    for(const point of Components){
        point.color = "red";
    }
    for(const point of Components){
    for(const item of window.Componets.Physical){
            if (typeof item.colide === "function") {
                let findebug = item.colide(point.Global, point.radi);//cheack for coligions
                if(findebug.buffer){
                    point.color = "green";
                }
                if(findebug.Exact){
                    point.color = "blue";
                }
            } 
        }
    }
}

function initCompReach(Components){
    for(const point of Components){
        point.initReach();
    }
}

function ScaleCanvasComp(Components){
    for(const point of Components){
        point.scale();
    }
}



function UpdateMouseInteraction(){
    window.EditorState.CursorState = "ideal";
    let OverlapCompnents = [];
    let maxItem = {};
    maxItem.layer = 0;
    if(window.Componets != undefined && window.Componets.Physical != undefined){
        for(const item of window.Componets.Physical){
            if (typeof item.colide === "function") {
                let ColideArr = [];
                let itemRes = item.colide(window.mousePos, 0,ColideArr);//cheack for coligions
                for(const obj of  ColideArr){
                    OverlapCompnents.push(obj);
                    if(obj.layer >= maxItem.layer){
                        maxItem = obj;
                    }
                }
            } /*else {console.warn("Item missing colide():", item);}}*/
        }
    }
   // console.log(OverlapCompnents,"maxLayer:",maxItem.class);
    if(window.EditorState.CursorState == "hover"){
        canvas.style.cursor = "pointer";
    }else{
        canvas.style.cursor = "crosshair";
    }

}

function updateComponets(Components){
    for(var i = 0;i<Components.length;i++){
        Components[i].update();
    }
}

function DrawComponets(Components){
    for(var i = 0;i<Components.length;i++){
        Components[i].draw();
    }
}

function Grid(len){
    PattCanvas.width = len;
    PattCanvas.height = len;

    pctx.strokeStyle = 'gray';
    pctx.lineWidth = 1;

    pctx.beginPath();
    pctx.moveTo(0, 0);
    pctx.lineTo(0, 50);
    pctx.lineTo(50, 50);
    pctx.lineTo(50, 0);
    pctx.lineTo(0, 0);
    pctx.stroke();

    const pattern = ctx.createPattern(PattCanvas, 'repeat');
    ctx.fillStyle = pattern;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

export{canvas,ctx,UpdateCanvas,Grid,initResize};