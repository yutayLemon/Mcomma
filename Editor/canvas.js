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
    ctx.clearRect(0, 0, canvas.width, canvas.height);   
    Grid(30); 
    updateComponets(Components);
    DrawComponets(Components);
    requestAnimationFrame(()=>{UpdateCanvas(Components)});
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