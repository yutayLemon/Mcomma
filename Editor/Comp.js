import {drawDiv,drawInteractDiv,drawWhile,drawIf} from "./draw.js"
import {circleOverlap} from "./overlap.js"

class Comp{
    constructor(initX,initY,icolor,lineWidth){
        this.mode = "ideal";
        this.selected = false;
        this.pos = {x:initX,y:initY};//relative ??
        this.Global = {x:initX,y:initY};
        this.lineWdith = lineWidth;
        this.color = icolor;
        this.interactives = [];
        this.children = [];
        this.parent = null;
    };
    addChild(child){
        this.children.push(child);
        child.parent = this;
    }
    update(){
        this.updateSelf();
        this.Global = this.globalPos();
        this.updateChild();
    }
    updateSelf(){
    }
    updateChild(){
        for(const item of this.children){
            item.updateSelf();
            item.updateChild();
        }
    }

    draw(){
        this.drawSelf();
        this.drawChild();
    }

    drawSelf(){

    }
    drawChild(){
        for(const item of this.children){
            item.drawSelf();
            item.drawChild();
        }
    }
    globalPos(){
        if(this.parent == null){
            return this.pos;
        }else{
            let ParentPos = this.parent.globalPos();
            return {
                x:ParentPos.x+this.pos.x,
                y:ParentPos.y+this.pos.y
            }
        }
    }
}

class ExtendInter extends Comp{
    constructor(initX,initY,icolor,lineWidth,initradius){
        super(initX,initY,icolor,lineWidth);
        this.radius = initradius;
        this.Drag = {x:initX+initradius,y:initY+initradius};//point of draging
    }
    colide(point,r){//takes the point and radius and returns if it is coliding with the object
        
    }
    updateSelf(){

    }
    drawSelf(){
        if(window.EditorState.mode == "edit"){
            let ExpandIntDim = 20;
            ctx.drawImage(assets.Expand.canvas,x-ExpandIntDim*0.5-Math.cos(Math.PI*0.25)*r,y-ExpandIntDim*0.5-Math.cos(Math.PI*0.25)*r,ExpandIntDim,ExpandIntDim);
        }
    }
}

class MoveInter extends Comp{
    constructor(initX,initY,icolor,lineWidth,initradius){
        super(initX,initY,icolor,lineWidth);
        this.radius = initradius;
        this.Drag = {x:initX+initradius,y:initY+initradius};//point of draging
    }
    colide(point,r){//takes the point and radius and returns if it is coliding with the object
        
    }
    updateSelf(){

    }
    drawSelf(){
        if(window.EditorState.mode == "edit"){
            let MoveIntDim = 20;
            ctx.drawImage(assets.move.canvas,x-MoveIntDim*0.5,y-MoveIntDim*0.5,MoveIntDim,MoveIntDim);
        }
    }
}

class Division extends Comp{
    constructor(initX,initY,icolor,lineWidth,initradius){
        super(initX,initY,icolor,lineWidth);
        this.radius = initradius;
        this.Drag = {x:initX+initradius,y:initY+initradius};//point of draging
    }
    colide(point,r){//takes the point and radius and returns if it is coliding with the object
        return circleOverlap(point,this.pos,this.radius,r);
    }
    updateSelf(){

    }
    drawSelf(){
        if(window.EditorState.mode == "edit"){
            drawInteractDiv(this.pos.x,this.pos.y,this.radius);
        }
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
    colide(point,r){//takes the point and radius and returns if it is coliding with the object
        return circleOverlap(point,this.centerDo,this.radiusDo,r) || circleOverlap(point,this.centerFor,this.radiusFor,r);
    }
    updateSelf(){
        
    }
    drawSelf(){
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
    colide(point,r){//takes the point and radius and returns if it is coliding with the object
        return circleOverlap(point,this.pos,this.radius,r);//ADD detection for traiangles
    }
    updateSelf(){
 
    }
    drawSelf(){
        drawIf(this);
    }
}

class PreView{
    constructor(color){
        console.log("Mouse Previews constructed");
        this.pos = {};
        this.color = color;
    }
    updateSelf(){
        this.pos.x = window.mousePos.x;
        this.pos.y = window.mousePos.y;
    }

    drawSelf(){
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