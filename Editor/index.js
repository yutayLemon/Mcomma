

import {Comp,Division,WhileCirc,IfCirc, PreView} from "./Comp.js";
import { canvas,ctx ,UpdateCanvas,initResize} from "./canvas.js";
import {initControl} from "./Controles.js";
import {initCanvasHover,initCanvasClick} from "./CanvasClick.js"
import {InitAssets} from "./draw.js"



initResize();
initControl();
initCanvasClick();
initCanvasHover();


Promise.all([InitAssets()])
.then(()=>{
    main();
})

function main(){
    var Componets = {};
    Componets.Physical = [];
    Componets.Vertial = [];
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
