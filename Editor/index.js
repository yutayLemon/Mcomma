import {Comp,Division,WhileCirc,IfCirc} from "./Comp.js";
import { canvas,ctx ,UpdateCanvas} from "./canvas.js";
import {initControl} from "./Controles.js";

initControl();

var Componets = [];
window.Comp = Componets;//DEBUG
Componets.push(
    new Division(100,100,"red",1,50)
);
Componets[0].draw();
Componets[0].update = function(){
    this.pos.x += 1.5;
    this.pos.y += 1;
}




UpdateCanvas(Componets);
