import {canvas,ctx} from "./canvas.js";
import { Division } from "./Comp.js";

function initCanvasClick(){
    canvas.addEventListener("click",function(e){
        if(window.EditorState.mode == "add"){
            window.EditorState.mode = "edit";
            window.Comp.push(
                new Division(e.x,e.y,"black",1,30)
            );
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