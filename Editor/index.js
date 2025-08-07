

import {Comp,Division,WhileCirc,IfCirc, PreView,debugRect} from "./Comp.js";
import { canvas,ctx ,UpdateCanvas,initResize} from "./canvas.js";
import {initControl} from "./Controles.js";
import {initCanvasHover,initCanvasClick,initCanvasMouseDown,initCanvasMouseUp} from "./CanvasClick.js"
import {InitAssets} from "./draw.js"



initResize();
initControl();
initCanvasClick();
initCanvasHover();
initCanvasMouseDown();
initCanvasMouseUp();


Promise.all([InitAssets()])
.then(()=>{
    main();
})

function main(){
    var Componets = {};
    Componets.Physical = [];//colide
    Componets.Vertial = [];//no colide
    Componets.DebugPhysical = [];
    /*for(var i = 0;i<12000;i++){
        Componets.DebugPhysical.push(
            new debugRect(Math.random()*canvas.clientWidth,Math.random()*canvas.clientHeight,"red",2)
        );
    }*/

    window.Componets = Componets;//DEBUG
    Componets.Physical.push(
       new Division(100,100,"blue",1,50)
    );
    Componets.Physical[0].updateSelf = function(){
       // console.log("blue updating!!");
        this.pos.x += 1.5;
        this.pos.y += 1;
    }

    Componets.Vertial.push(new PreView("red"));


    UpdateCanvas(Componets);
}
