const canvas = document.querySelector(".MainCanvas");
const PattCanvas = document.querySelector(".PattenCanvas");
PattCanvas.width = 30;
PattCanvas.height = 30;
const pctx = PattCanvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");


function UpdateCanvas(Components){
    ctx.save();
    window.EditorState.debug = true;
 
    ctx.scale(window.GlobalScale,window.GlobalScale);
    let inverseScale = 1/window.GlobalScale;
    ctx.clearRect(-canvas.width*inverseScale*(1/2), -canvas.height*inverseScale*(1/2), canvas.width*inverseScale, canvas.height*inverseScale);
    
    Grid(30); 
    

    initCompReach(Components.Physical);

    updateComponets(Components.Physical);
    updateComponets(Components.Vertial);
    updateDebug(Componets.DebugPhysical);

    
    DrawComponets(Components.Physical);
    DrawComponets(Components.Vertial);
    DrawComponets(Componets.DebugPhysical);

    UpdateMouseInteraction();
    ctx.restore();
    requestAnimationFrame(()=>{UpdateCanvas(Components)});
}

function CanvasResize(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    //ctx.translate(canvas.width/2,canvas.height/2);
    //window.canvasOffset = {x:canvas.width/2,y:canvas.height/2}
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
    let inverseScale = 1/window.GlobalScale;
    ctx.fillRect(-canvas.width*inverseScale*(1/2), -canvas.height*inverseScale*(1/2), canvas.width*inverseScale, canvas.height*inverseScale);
}

export{canvas,ctx,UpdateCanvas,Grid,initResize};