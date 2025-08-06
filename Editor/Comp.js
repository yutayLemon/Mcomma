import {drawDiv,drawInteractDiv,drawWhile,drawIf} from "./draw.js"
import {circleOverlap} from "./overlap.js"
import { canvas,ctx } from "./canvas.js"


class Comp{
    constructor(initX,initY,icolor,lineWidth){
        this.mode = "ideal";
        this.selected = false;
        this.pos = {x:initX,y:initY};//relative ??
        this.Global = {x:initX,y:initY};//Global
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
            item.update();
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
            item.draw();
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
    NotColide(point,r){
    }
    colideEvent(point,r){
    }
    PublicColideEvent(point,r){
        window.EditorState.CursorState = "hover";
    }

    colide(point,r){
        let ColideRes = this.colideSelf(point,r);
        if(ColideRes.Exact){
            //runn's if colide
            this.colideEvent(point,r);
            this.PublicColideEvent(point,r);
        }else{
            this.NotColide(point,r);
        }
        if(ColideRes.buffer){
            //clides with a buffer zone
            this.colideChildren(point,r);
        }
    }
    colideSelf(point,r){
        return 0;
    }
    colideChildren(point,r){
        for(const item of this.children){
            item.colide(point,r);
        }
    }
}


class Rect extends Comp{
    constructor(initX,initY,icolor,r){
        super(initX,initY,icolor,1);
        this.radi = r;
    }
    colideSelf(point,r){//takes the point and radius and returns if it is coliding with the object
        return circleOverlap(point,this.Global,r,this.ExpandIntRadi);
    }
    colideEvent(){
        this.color = "green";
    }
    updateSelf(){

    }
    drawSelf(){
        if(window.EditorState.debug == true){
            ctx.beginPath();
            ctx.fillStyle = this.color;
            ctx.lineWidth = this.lineWdith;
            ctx.arc(this.Global.x, this.Global.y, this.radi, 0, 2 * Math.PI);
            ctx.fill();
            ctx.strokeStyle = "black";
            ctx.lineWidth = 1;
        }
    }
}

class ExtendInter extends Comp{
    constructor(initX,initY,icolor,lineWidth){
        super(initX,initY,icolor,lineWidth);
        this.ExpandIntRadi = 10;
    }
    colideSelf(point,r){//takes the point and radius and returns if it is coliding with the object
        return circleOverlap(point,this.Global,r,this.ExpandIntRadi);
    }
    colideEvent(){
        console.log("colide with Extend");
    }
    updateSelf(){

    }
    drawSelf(){
        if(window.EditorState.mode == "edit"){
            let ExpandIntDim = 2*this.ExpandIntRadi;
            ctx.drawImage(assets.Expand.canvas,this.Global.x-this.ExpandIntRadi,this.Global.y-this.ExpandIntRadi,ExpandIntDim,ExpandIntDim);
        }
    }
}

class MoveInter extends Comp{
    constructor(initX,initY){
        super(initX,initY,"black",1);
        this.MoveIntRadi = 10;
    }
    colideEvent(){
        console.log("colide with move");
    }
    colideSelf(point,r){//takes the point and radius and returns if it is coliding with the object
        return circleOverlap(point,this.Global,r,this.ExpandIntRadi);
    }
    updateSelf(){

    }
    drawSelf(){
        if(window.EditorState.mode == "edit"){
            let MoveIntDim = this.MoveIntRadi*2;
            ctx.drawImage(assets.move.canvas,this.Global.x-this.MoveIntRadi,this.Global.y-this.MoveIntRadi,MoveIntDim,MoveIntDim);
        }
    }
}

class Division extends Comp{
    constructor(initX,initY,icolor,lineWidth,initradius){
        super(initX,initY,icolor,lineWidth);
        this.radius = initradius;
    }
    colideSelf(point,r){//takes the point and radius and returns if it is coliding with the object
        return circleOverlap(point,this.Global,this.radius,r);
    }
    NotColide(point,r){
    }
    colideEvent(){
        console.log("colide with Div");
    }
    updateSelf(){

    }
    drawSelf(){
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
    colideSelf(point,r){//takes the point and radius and returns if it is coliding with the object
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
    colideSelf(point,r){//takes the point and radius and returns if it is coliding with the object
        return circleOverlap(point,this.Global,this.radius,r);//ADD detection for traiangles
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



export {Comp,Division,WhileCirc,IfCirc,PreView,ExtendInter,MoveInter,Rect};