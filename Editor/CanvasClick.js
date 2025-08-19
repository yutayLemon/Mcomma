import {canvas,ctx,UpdateMouseInteraction,updateText} from "./canvas.js";
import { Division ,ExtendInter,MoveInter,Curl,InterSect,overlap} from "./Comp.js";


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
        }else if(window.EditorState.mode == "edit"){
            window.TextSetting.elemt = window.TopItems.maxCodeItem;
        }
        updateText();
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
            let radius = 30;
            parent.Global ??= {x: 0, y: 0};
            let button = window.TopItems.maxItem;
           
            let NewExtend = new ExtendInter(Math.sin(Math.PI*0.25)*radius,
                                            Math.sin(Math.PI*0.25)*radius);
            let NewMove = new MoveInter(0,0);
            let NewInter = new InterSect(radius,0);
            let NewCurl = {};
            if(button.class == "inter" && button.parent.class == "div"){
                NewCurl = new Curl(window.mousePos.x-button.parent.Global.x,
                                       window.mousePos.y-button.parent.Global.y,
                                       "black",1,radius);
                NewCurl.SubClass = "if";
                button.parent.addChild(NewCurl);
                NewCurl.FlagAsExtruding();

                let NewOverlap = new overlap(button.parent);//add body
                NewCurl.addChild(NewOverlap);//add to sorce

            }else if(button.class == "inter" && button.parent.class == "curl"){
                NewCurl = new Curl(window.mousePos.x-button.parent.Global.x,
                                       window.mousePos.y-button.parent.Global.y,
                                       "black",1,radius);
                NewCurl.SubClass = "ifelse";
                button.parent.addChild(NewCurl);
                NewCurl.FlagAsExtruding();

                let NewOverlap = new overlap(button.parent);//add body
                NewCurl.addChild(NewOverlap);//add to sorce
                
            }else if(button.class == "inter"){
                console.warn("not supported intersection:"+button.parent.class);
            }else{
                NewCurl = new Curl(window.mousePos.x-parent.Global.x,
                                       window.mousePos.y-parent.Global.y,
                                       "black",1,radius);
                //if parent not valid use comp physical
                (parent.mode ? parent : window.Componets.Physical).addChild(NewCurl);
                console.log("added normaly");
            }
            NewCurl.addChild(NewExtend);
            NewCurl.addChild(NewMove);  
            NewCurl.addChild(NewInter);  
            
            

              
            
}

function UpdateMousePos(e){
        const rect = canvas.getBoundingClientRect();
        window.mousePos.x = -window.canvasOffset.x + e.x - rect.left;
        window.mousePos.y = -window.canvasOffset.y + e.y - rect.top;
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

function initKeyInput(){
    window.addEventListener("keydown",(e)=>{
        if(e.key.length == 1){
            if(window.TextSetting.elemt.txt){
                window.TextSetting.elemt.txt.context += e.key;
            }
        }else{
        switch (e.key) {
            case "Backspace":
                window.TextSetting.elemt.txt.context = window.TextSetting.elemt.txt.context.slice(0, -1);
                break;
            case "Enter":
                window.TextSetting.elemt.txt.context += "\n";
                break;
            default:
                break;
        }
    }
    updateText();
    });
    console.log("init:Key input");
}

export {initKeyInput,initCanvasClick,initCanvasHover,initCanvasMouseDown,initCanvasMouseUp,initWheelScroll}