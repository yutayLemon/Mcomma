

import {Comp,Division,WhileCirc,IfCirc, PreView} from "./Comp.js";
import { canvas,ctx ,UpdateCanvas,initResize} from "./canvas.js";
import {initControl} from "./Controles.js";
import {initCanvasHover,initCanvasClick} from "./CanvasClick.js"

initResize();
initControl();
initCanvasClick();
initCanvasHover();

var Componets = [];
window.Comp = Componets;//DEBUG
Componets.push(
    new Division(100,100,"blue",1,50)
);
Componets[0].draw();
Componets[0].update = function(){
    this.pos.x += 1.5;
    this.pos.y += 1;
}

Componets.push(new PreView("red"));



UpdateCanvas(Componets);
