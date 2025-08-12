import { canvas,ctx } from "./canvas.js";
import {SpiralText} from "./textProces.js";

function drawDiv({
    color = "black",
    Global = {x:0,y:0},
    radius = 10,
    lineWdith=1,
    txt = {
            context : "",
            font : "sans-serif",
            size : 20,
            color : "black"
        }
} = {}){
        const Scpos =  Global;
        const Scrad =  radius;
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWdith;
        ctx.arc(Scpos.x, Scpos.y,Scrad, 0, 2 * Math.PI);
        SpiralText(ctx,txt.context,radius,Global,txt.size,txt.color,txt.font);
        ctx.stroke();
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
}

function drawCurl({
    color = "black",
    Global = {x:0,y:0},
    radius = 10,
    lineWdith=1
} = {}){
    const Scpos = Global;
    const Scrad = radius;
    const CurlWidth = Scrad * 0.2;
    const PeakCount = 7;
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWdith;

    let SubTheta = Math.PI / PeakCount;
    let i = 0;
    let CurrentPos = {
      x: Scpos.x + Scrad * Math.cos(SubTheta * (i * 2)),
      y: Scpos.y + Scrad * Math.sin(SubTheta * (i * 2)),
    }; //right up first peak
    ctx.moveTo(CurrentPos.x, CurrentPos.y);
    for (let i = 0; i < PeakCount; i++) {
    let NewMidPos = {
      x: Scpos.x + Scrad * Math.cos(SubTheta * (i * 2 + 1)),
      y: Scpos.y + Scrad * Math.sin(SubTheta * (i * 2 + 1)),
    };
    let NewEndPos = {
      x: Scpos.x + Scrad * Math.cos(SubTheta * (i * 2 + 2)),
      y: Scpos.y + Scrad * Math.sin(SubTheta * (i * 2 + 2)),
    };
    let MidCtr1 = {
      x: Scpos.x + (CurlWidth + Scrad) * Math.cos(SubTheta * (i * 2)),
      y: Scpos.y + (CurlWidth + Scrad) * Math.sin(SubTheta * (i * 2)),
    };
    let MidCtr2 = {
      x: Scpos.x + (Scrad - CurlWidth) * Math.cos(SubTheta * (i * 2 + 1)),
      y: Scpos.y + (Scrad - CurlWidth) * Math.sin(SubTheta * (i * 2 + 1)),
    }; //same as end ctr1
    let EndCtr2 = {
      x: Scpos.x + (CurlWidth + Scrad) * Math.cos(SubTheta * (i * 2 + 2)),
      y: Scpos.y + (CurlWidth + Scrad) * Math.sin(SubTheta * (i * 2 + 2)),
    };
    ctx.bezierCurveTo(
      MidCtr1.x,
      MidCtr1.y,
      MidCtr2.x,
      MidCtr2.y,
      NewMidPos.x,
      NewMidPos.y
    );
    ctx.bezierCurveTo(
      MidCtr2.x,
      MidCtr2.y,
      EndCtr2.x,
      EndCtr2.y,
      NewEndPos.x,
      NewEndPos.y
    );
    }
    ctx.stroke();
    ctx.strokeStyle = 'black';
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
    LoadImg.src = link;
})
}

function InitAssets(){
        let MoveAssert = LoadMoveToggle("./SVG/move.svg"); // from https://www.svgrepo.com/svg/533693/move-alt
        let ExpandAssert = LoadMoveToggle("./SVG/expand.svg"); // from https://www.svgrepo.com/svg/357722/expand-left
        let InterAsset = LoadMoveToggle("./SVG/inter.svg");//from https://www.svgrepo.com/svg/54622/intersection

        return Promise.all([MoveAssert,ExpandAssert,InterAsset])
        .then(([objMove,objExpand,objInter])=>{
            assets.move = objMove;
            assets.Expand = objExpand;
            assets.Inter = objInter;
            console.log("init:loaded assets");
            return "done";
        }).catch((err)=>{
            throw err;
        });
}

export {drawDiv,InitAssets,drawCurl};