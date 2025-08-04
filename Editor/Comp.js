import {drawDiv,drawWhile,drawIf} from "./draw.js"
class Comp{
    constructor(initX,initY,icolor,lineWidth){
        this.mode = "ideal";
        this.selected = false;
        this.pos = {x:initX,y:initY};
        this.lineWdith = lineWidth;
        this.color = icolor;
    };
}

class Division extends Comp{
    constructor(initX,initY,icolor,lineWidth,initradius){
        super(initX,initY,icolor,lineWidth);
        this.radius = initradius;
        this.Drag = {x:initX+initradius,y:initY+initradius};//point of draging
    }
    update(){

    }
    draw(){
        drawDiv(this);
    }
}


class WhileCirc extends Comp{
    constructor(initX,initY,icolor,lineWidth,initRadiusDo,initRadiusFor,icenterDoX,icenterDoY,icenterForX,icenterForY){
        super(initX,initY,icolor,lineWidth);
        this.centerDo = {x:icenterDoX,y:icenterDoY};
        this.centerFor = {x:icenterForX,y:icenterForY};
        this.radiusDo = initRadiusDo;
        this.radiusFor = initRadiusFor;
        this.Drag = {x:initX+initradius,y:initY+initradius};//point of draging
    }
    update(){
        
    }
    draw(){
        drawWhile(this);
    }
}

class IfCirc extends Comp{
    constructor(initX,initY,icolor,lineWidth,initNumSections,iTipH,iCondH){
        super(initX,initY,icolor,lineWidth);
        this.NumSections = initNumSections;
        this.TipHight = iTipH;
        this.CondHight = iCondH;

        this.Drag = {x:initX+initradius,y:initY+initradius};//point of draging
    }
    update(){
 
    }
    draw(){
        if(window.EditorState.mode == "edit"){
            
        }
        drawIf(this);
    }
}

class PreView{
    constructor(color){
        console.log("Mouse Previews constructed");
        this.pos = {};
        this.color = color;
    }
    update(){
        this.pos.x = window.mousePos.x;
        this.pos.y = window.mousePos.y;
    }

    draw(){
        if(window.EditorState.mode == "add"){
        if(window.EditorState.type == "div"){
            drawDiv(this);
        }else if(window.EditorState.type == "whileComp"){
            drawWhile(this);
        }else if(window.EditorState.type == "ifComp"){
            drawIf(this);
        }
    }
    }

}



export {Comp,Division,WhileCirc,IfCirc,PreView};