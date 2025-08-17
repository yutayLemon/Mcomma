

import {Comp,Division, PreView,debugRect,container} from "./Comp.js";
import { canvas,ctx ,UpdateCanvas,initResize} from "./canvas.js";
import {initControl} from "./Controles.js";
import {initKeyInput,initCanvasHover,initCanvasClick,initCanvasMouseDown,initCanvasMouseUp,initWheelScroll} from "./CanvasClick.js"
import {InitAssets} from "./draw.js"
import {SpiralText,IntersectionText} from "./textProces.js"
import {SyntaxTree} from "./SyntaxTree.js"

initResize();
initControl();
initCanvasClick();
initCanvasHover();
initCanvasMouseDown();
initCanvasMouseUp();
initWheelScroll();
initKeyInput();

Promise.all([InitAssets()])
.then(()=>{
    main();
})

function main(){
window.testing = SyntaxTree;//DEBUG

    var Componets = {};
    var MainScope = {};
    MainScope.Physical = new container(0,0);
    MainScope.Vertial = new container(0,0);
    MainScope.DebugPhysical = new container(0,0);
    window.Componets = MainScope;//DEBUG
   /* MainScope.Physical.addChild(
       new Division(100,100,"blue",1,50)
    );
    MainScope.Physical.children[0].updateSelf = function(){
       // console.log("blue updating!!");
        this.pos.x += 1.5;
        this.pos.y += 1;
    }
*/
    //MainScope.Vertial.addChild(new PreView("red"));

    UpdateCanvas(Componets);
}
