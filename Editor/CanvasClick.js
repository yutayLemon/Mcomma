import {canvas,ctx,UpdateMouseInteraction} from "./canvas.js";
import { Division ,ExtendInter,MoveInter, WhileCirc} from "./Comp.js";

function initCanvasClick(){
    UpdateMouseInteraction();
    canvas.addEventListener("click",function(e){
        UpdateMousePos(e);
        if(window.EditorState.mode == "add"){
            if(window.EditorState.type == "div"){
                addNewDiv();
                window.EditorState.mode = "edit";
            }else if(window.EditorState.type == "whileComp"){
                addWhile();
                window.EditorState.mode = "edit";
            }else{

            }
            //TODO division detection
        }
    });
    console.log("init:canvas click event");
}

function addNewDiv(){
            let parent = window.TopItems.maxCodeItem;
            if(!parent.Global){
                parent.Global = {x:0,y:0};
            }
            let NewDiv = new Division(window.mousePos.x-parent.Global.x,window.mousePos.y-parent.Global.y,"black",1,30);
            let NewExtend = new ExtendInter(Math.sin(Math.PI*0.25)*NewDiv.radius,
                                            Math.sin(Math.PI*0.25)*NewDiv.radius);
            let NewMove = new MoveInter(0,0);
            NewDiv.addChild(NewExtend);
            NewDiv.addChild(NewMove); 
            console.log(parent);   
            if(parent.mode){
                parent.addChild(NewDiv);
            }else{
                window.Componets.Physical.addChild(NewDiv);                     
            }
            
}

function addWhile(){
            let newWhile = new WhileCirc(window.mousePos.x,window.mousePos.y,"blue",1,30,20,
                -30,0,
                 30,0
            );
            let NewMove = new MoveInter(0,0);
            let NewExtendDo = new ExtendInter(-60,0);
            let NewExtendFor = new ExtendInter(60,0);
            newWhile.addChild(NewExtendDo);
            newWhile.addChild(NewExtendFor);
            newWhile.addChild(NewMove);

            window.Componets.Physical.addChild(newWhile);
}

function UpdateMousePos(e){
        window.mousePos.x = -window.canvasOffset.x + e.x;
        window.mousePos.y = -window.canvasOffset.y + e.y;
        window.mousePos.x /= window.GlobalScale;
        window.mousePos.y /= window.GlobalScale;

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
        UpdateMousePos(e);
    });
    console.log("init:canvas mouse move event");
}


function initWheelScroll(){
    window.addEventListener("wheel",(e)=>{
        if(Math.abs(window.GlobalScale) < 10){
        window.GlobalScale += (e.deltaY/1000)*window.GlobalScale;
        window.SetScale(window.GlobalScale);
        }
    });
    console.log("init:scroll wheel");
}

export {initCanvasClick,initCanvasHover,initCanvasMouseDown,initCanvasMouseUp,initWheelScroll}