import {canvas,ctx} from "./canvas.js";
import { Division ,ExtendInter,MoveInter} from "./Comp.js";

function initCanvasClick(){
    canvas.addEventListener("click",function(e){
        window.mousePos.x = -window.canvasOffset.x + e.x;
        window.mousePos.y = -window.canvasOffset.y + e.y;
        if(window.EditorState.mode == "add"){
            if(window.EditorState.type == "div"){
            let NewDiv = new Division(window.mousePos.x,window.mousePos.y,"black",1,30);
            let NewExtend = new ExtendInter(Math.sin(Math.PI*0.25)*NewDiv.radius,
                                            Math.sin(Math.PI*0.25)*NewDiv.radius);
            let NewMove = new MoveInter(0,0);
            NewDiv.addChild(NewExtend);
            NewDiv.addChild(NewMove);                              
            window.Componets.Physical.push(NewDiv);
            window.EditorState.mode = "edit";
            }
            //TODO division detection
        }
    });
    console.log("init:canvas click event");
}

function initCanvasMouseDown(){
    canvas.addEventListener("mousedown",function(e){
        window.mouseDown = true;
    });
    console.log("init:canvas mouse down event");
}

function initCanvasMouseUp(){
    canvas.addEventListener("mouseup",function(e){
        window.mouseDown = false;
    });
    console.log("init:canvas mouse up event");
}

function initCanvasHover(){
    canvas.addEventListener("mousemove",function(e){
        window.mousePos.x = -window.canvasOffset.x + e.x;
        window.mousePos.y = -window.canvasOffset.y + e.y;
    });
    console.log("init:canvas mouse move event");
}


export {initCanvasClick,initCanvasHover,initCanvasMouseDown,initCanvasMouseUp}