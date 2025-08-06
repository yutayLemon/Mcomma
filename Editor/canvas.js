const canvas = document.querySelector(".MainCanvas");
const PattCanvas = document.querySelector(".PattenCanvas");
PattCanvas.width = 30;
PattCanvas.height = 30;
const pctx = PattCanvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");

function CanvasResize(){
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
}

function initResize(){
    CanvasResize();
    window.addEventListener("resize",CanvasResize);
}

function UpdateCanvas(Components){
    window.EditorState.debug = true;

    ctx.clearRect(0, 0, canvas.width, canvas.height);  
    UpdateCanvasState(Components);
    Grid(30); 

    updateComponets(Components.Physical);
    updateComponets(Components.Vertial);
    updateComponets(Componets.DebugPhysical);
    
    DrawComponets(Components.Physical);
    DrawComponets(Components.Vertial);
    DrawComponets(Componets.DebugPhysical);

    requestAnimationFrame(()=>{UpdateCanvas(Components)});
}

function UpdateCanvasState(Components){
    window.EditorState.CursorState = "ideal";
    if(window.Componets != undefined && window.Componets.Physical != undefined){
        for(const item of window.Componets.Physical){
            if (typeof item.colide === "function") {
                item.colide(window.mousePos, 0);//cheack for coligions
            } /*else {console.warn("Item missing colide():", item);}}*/
        }
    }
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