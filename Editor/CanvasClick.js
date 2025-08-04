import {canvas,ctx} from "./canvas.js";
import {PreView} from "./Comp.js";

function initCanvasClick(){
    canvas.addEventListener("click",function(){

    });
}



function initCanvasHover(){
    canvas.addEventListener("mousemove",function(){
        if(window.EditorState.mode == "add"){

        }
    });
}