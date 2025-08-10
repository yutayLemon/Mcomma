import {canvas,ctx,UpdateMouseInteraction} from "./canvas.js";
import { Division ,ExtendInter,MoveInter,Curl,InterSect} from "./Comp.js";

function initCanvasClick(){
    UpdateMouseInteraction();
    canvas.addEventListener("click",function(e){
        UpdateMousePos(e);
        if(window.EditorState.mode == "add"){
            if(window.EditorState.type == "div"){
                addNewDiv();
                window.EditorState.mode = "edit";
            }else if(window.EditorState.type == "curl"){
                addNewCurl();
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
            parent.Global ??= {x: 0, y: 0};
            let button = window.TopItems.maxItem;
            
            let NewDiv = new Division(window.mousePos.x-parent.Global.x,window.mousePos.y-parent.Global.y,"black",1,30);
            if(parent.mode){
                parent.addChild(NewDiv);
            }else{
                window.Componets.Physical.addChild(NewDiv);                     
            }
            let NewExtend = new ExtendInter(Math.sin(Math.PI*0.25)*NewDiv.radius,
                                            Math.sin(Math.PI*0.25)*NewDiv.radius);
            let NewInter = new InterSect(NewDiv.radius,0);
            let NewMove = new MoveInter(0,0);
            NewDiv.addChild(NewExtend);
            NewDiv.addChild(NewMove); 
            NewDiv.addChild(NewInter); 
            
            
}


function addNewCurl(){
            let parent = window.TopItems.maxCodeItem;
            parent.Global ??= {x: 0, y: 0};
            let button = window.TopItems.maxItem;

            if(button.class == "inter"){
                console.log("added onto");
            }else{
                console.log("added normaly");
            }
            
            let NewCurl = new Curl(window.mousePos.x-parent.Global.x,window.mousePos.y-parent.Global.y,"black",1,30);
            if(parent.mode){//have to add right after for correct layer proagation
                parent.addChild(NewCurl);
            }else{
                window.Componets.Physical.addChild(NewCurl);                     
            }

            let NewExtend = new ExtendInter(Math.sin(Math.PI*0.25)*NewCurl.radius,
                                            Math.sin(Math.PI*0.25)*NewCurl.radius);
            let NewMove = new MoveInter(0,0);
            NewCurl.addChild(NewExtend);
            NewCurl.addChild(NewMove);    
            
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