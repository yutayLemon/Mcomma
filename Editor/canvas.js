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
    ctx.save();
    window.EditorState.debug = true;
 
    ctx.scale(window.GlobalScale,window.GlobalScale);
    let inverseScale = 1/window.GlobalScale;
    ctx.clearRect(-canvas.width*inverseScale*(1/2), -canvas.height*inverseScale*(1/2), canvas.width*inverseScale, canvas.height*inverseScale);
    
    Grid(30); 
    
    window.Componets.Physical.initReach();

    window.Componets.Physical.update();
    window.Componets.Vertial.update();
    //updateDebug(Componets.DebugPhysical);

    window.Componets.Physical.draw();
    window.Componets.Vertial.draw();
    window.Componets.DebugPhysical.draw();

    UpdateMouseInteraction();
    ctx.restore();
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
    ctx.fillRect(-canvas.width*inverseScale*(1/2), -canvas.height*inverseScale*(1/2),
                  canvas.width*inverseScale, canvas.height*inverseScale);
}

export{canvas,ctx,UpdateCanvas,Grid,initResize,UpdateMouseInteraction};