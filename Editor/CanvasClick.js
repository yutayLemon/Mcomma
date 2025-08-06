import {canvas,ctx} from "./canvas.js";
import { Division ,ExtendInter,MoveInter} from "./Comp.js";

function initCanvasClick(){
    canvas.addEventListener("click",function(e){
        if(window.EditorState.mode == "add"){
            if(window.EditorState.type == "div"){
            let NewDiv = new Division(e.x,e.y,"black",1,30);
            let NewExtend = new ExtendInter(Math.sin(Math.PI*0.25)*NewDiv.radius,
                                            Math.sin(Math.PI*0.25)*NewDiv.radius);
            let NewMove = new MoveInter(0,0);
            NewDiv.addChild(NewExtend);
            NewDiv.addChild(NewMove);                              
            window.Componets.Physical.push(
                NewDiv
            );
            window.EditorState.mode = "edit";
            }
            //TODO division detection


            
        }
    });
}



function initCanvasHover(){
    canvas.addEventListener("mousemove",function(e){
        window.mousePos.x = e.x;
        window.mousePos.y = e.y;
});
}


export {initCanvasClick,initCanvasHover}