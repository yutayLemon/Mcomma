import { canvas,ctx } from "./canvas.js";

function drawDiv({
    color = "black",
    Global = {x:0,y:0},
    radius = 10,
    lineWdith=1
} = {}){
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWdith;
        ctx.arc(Global.x, Global.y, radius, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
}

function drawInteractDiv(x,y,r){
    let MoveIntDim = 20;
    let ExpandIntDim = 20;
    ctx.drawImage(assets.move.canvas,x-MoveIntDim*0.5,y-MoveIntDim*0.5,MoveIntDim,MoveIntDim);
    ctx.drawImage(assets.Expand.canvas,x-ExpandIntDim*0.5-Math.cos(Math.PI*0.25)*r,y-ExpandIntDim*0.5-Math.cos(Math.PI*0.25)*r,ExpandIntDim,ExpandIntDim);
    
}

function drawWhile({
    color = "black",
    Global = {x:0,y:0},
    radiusDo = 10,
    radiusFor = 5,
    lineWdith=1,
    centerDo = {x:-5,y:0},
    centerFor = {x:5,y:0}
} = {}){
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWdith;
        ctx.arc(centerDo.x, centerDo.y, radiusDo, 0, 2 * Math.PI);
        ctx.arc(centerFor.x, centerFor.y, radiusFor, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
}

function drawIf(){
        ctx.beginPath({
            color = "black",
            Global = {x:0,y:0},
            NumSections = 3,
            lineWdith=1,
            TipHight = 5,
            radius = 10
        } = {});
        ctx.strokeStyle =  color;
        ctx.lineWidth =  lineWdith;
        ctx.arc( Global.x,  Global.y,  radiusDo, 0, 2 * Math.PI);
        ctx.moveTo( Global.x, pos.y+ radius);
        let SectRadi = Math.cos(Math.PI/( NumSections*2))* radius;
        for(let i = 0;i< NumSections;i++){
            ctx.moveTo(Math.cos(SectRadi*2*i - SectRadi)* radius,Math.sin(SectRadi*2*i - SectRadi)* radius);
            ctx.lineTo(Math.cos(SectRadi*2*i - SectRadi)*( radius+ TipHight),Math.sin(SectRadi*2*i - SectRadi)*( radius+ TipHight));
            ctx.lineTo(Math.cos(SectRadi*2*i + SectRadi)* radius,Math.sin(SectRadi*2*i - SectRadi)* radius);
        }
        ctx.stroke();
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
}

let assets = {};
window.assets = assets;
function LoadMoveToggle(link){
    return new Promise((resolve,reject)=>{
    let LoadCanvas = document.createElement("canvas");
    LoadCanvas.setAttribute("hidden","true");
    let LoadCtx = LoadCanvas.getContext("2d");
    let LoadImg = new Image();
    LoadImg.onload = () => {
        LoadCanvas.width = LoadImg.width;
        LoadCanvas.height = LoadImg.height;
        LoadCtx.drawImage(LoadImg, 0, 0);
        resolve({img:LoadImg,ctx:LoadCtx,canvas:LoadCanvas});
    };
    LoadImg.onerror = (err)=>{reject(err)};
    LoadImg.src = link;//"./SVG/move.svg"; // from https://www.svgrepo.com/svg/533693/move-alt
})
}

function InitAssets(){
        let MoveAssert = LoadMoveToggle("./SVG/move.svg"); // from https://www.svgrepo.com/svg/533693/move-alt
        let ExpandAssert = LoadMoveToggle("./SVG/expand.svg"); // from https://www.svgrepo.com/svg/357722/expand-left

        return Promise.all([MoveAssert,ExpandAssert])
        .then(([objMove,objExpand])=>{
            assets.move = objMove;
            assets.Expand = objExpand;
            return "done";
        }).catch((err)=>{
            throw err;
        });
}

export {drawDiv,drawInteractDiv,drawWhile,drawIf,InitAssets};