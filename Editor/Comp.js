import {drawDiv,drawCurl} from "./draw.js"
import {circleOverlap} from "./overlap.js"
import {canvas,ctx } from "./canvas.js"
import {IntersectionText} from "./textProces.js"


class Comp{
    constructor(initX,initY,icolor,lineWidth){
        this.class = "";
        this.SubClass = "";
        this.mode = "ideal";
        this.selected = false;
        this.pos = {x:initX,y:initY};//relative ??
        this.Global = {x:initX,y:initY};//Global
        this.lineWdith = lineWidth;
        this.color = icolor;
        this.interactives = [];
        this.children = [];
        this.parent = null;
        this.layer = 0;
        this.Reached = false;//stores if accsesed in each frame//optimize
        this.PostUpdate = false;
        this.PostDraw = false;
        this.PostColide = false;
        this.MouseOver = false;
        this.drag = false;
        this.CodeComp = false;
        this.vertial = false;
        this.ExtrudingChild = [];
        this.isExtruding = false;
        this.id;
        this.SetID();
        
        this.txt = {
            context : "",
            font : "sans-serif",
            size : 20,
            color : "black"
        }
        
    };
    SetID(){
        this.id = window.IdCount;
        window.IdCount++;
    }
    SetText(txt){
        this.txtCtx = txt;
    }
    initReach(){
        this.initReachSelf();
        this.initRechChildren();
    }
    initReachSelf(){
        this.Reached = false;
        this.PostUpdate = false;
        this.PostDraw = false;
        this.PostColide = false;
        this.MouseOver = false;
    }
    initRechChildren(){
        for(const item of this.children){
            item.initReach();
        }
    }
    addChild(child){
        this.children.push(child);
        child.parent = this;
        child.layer = this.layer+1;
    }
    update(){
        this.updateSelf();
        this.Global = this.globalPos();
        this.PostUpdate = true;
        this.updateChild();
    }
    updateSelf(){
    }
    updateChild(){
        for(const item of this.children){
            if(!item.PostUpdate){
                item.update();
            }
        }
    }

    draw(){
        this.drawSelf();
        this.PostDraw = true;
        this.drawChild();
    }

    drawSelf(){

    }
    drawChild(){
        for(const item of this.children){
            if(!item.PostDraw){
                item.draw();
            }
        }
    }
   
   
    globalPos(){
        if(this.parent == null){
            return this.pos;
        }else{
            let ParentPos = this.parent.globalPos();
            return {
                x:(ParentPos.x+this.pos.x),
                y:(ParentPos.y+this.pos.y)
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

    colide(point,r,ColideArr){//ColideArr - stores the object wich colided
        let ColideRes = this.colideSelf(point,r) || {buffer:false,Exact:false};
        this.PostColide = true;
        this.MouseOver = ColideRes.Exact;
        if(ColideRes.buffer){
            //clides with a buffer zone
            this.colideChildren(point,r,ColideArr);
        }
        if(ColideRes.Exact){
            //runn's if colide
            if(ColideArr != undefined){
                ColideArr.push(this);
            }
            this.colideEvent(point,r);
            this.PublicColideEvent(point,r);
        }else{
            this.NotColide(point,r);
        }
        this.colideExtruding(point,r,ColideArr);
        
        
        return ColideRes;
    }
    colideSelf(point,r){
        return {buffer:false,Exact:false};
    }
    colideChildren(point,r,ColideArr){
        for(const item of this.children){
            if(!item.PostColide){
                item.colide(point,r,ColideArr);
            }
        }
    }
    colideExtruding(point,r,ColideArr){
        for(const item of this.ExtrudingChild){
            if(!item.PostColide){
                item.colide(point,r,ColideArr);
            }
        }
    }

    FlagAsExtruding(){
        this.isExtruding = true;
        this.NotExtrudingParent().ExtrudingChild.push(this);
    }
    NotExtrudingParent(){
        if(this.isExtruding){
            return this.parent.NotExtrudingParent();
        }else{
            return this;
        }
    }
}


class debugRect extends Comp{
    constructor(initX,initY,icolor,r){
        super(initX,initY,icolor,1);
        this.class = "debug";
        this.radi = r;
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

class container extends Comp{//These are vertial
    constructor(initX,initY){
        super(initX,initY,"white",0);
        this.vertial = true;
        this.class = "container";
    }
    colideSelf(){
        return {buffer:true,Exact:false}
    }
    drawSelf(){
        //no render
    }
}


class overlap extends Comp{//These are vertial
    constructor(Body){
        super(0,0,"white",0);
        this.vertial = false;
        this.Body = Body;//body is the sorce of over lap eg division
        this.class = "overlap";
        this.CodeComp = true;
    }
    colideEvent(){
    }
    drawSelf(){
        IntersectionText(this.id,ctx,this.txt.context,this.parent.radius,this.Body.radius,this.parent.Global,this.Body.Global,20,"black");
    }
    colideSelf(){
        if(this.Body.PostColide && this.parent.PostColide){
            if(this.Body.MouseOver && this.parent.MouseOver){
                return {Exact:true,buffer:true};
            }
        }
        return {Exact:false,buffer:false};
    }
}

class ExtendInter extends Comp{
    constructor(initX,initY,icolor,lineWidth){
        super(initX,initY,icolor,lineWidth);
        this.class = "extend";
        this.ExpandIntRadi = 10;
    }
    colideSelf(point,r){//takes the point and radius and returns if it is coliding with the object
        return circleOverlap(point,this.Global,r,this.ExpandIntRadi);
    }
    NotColide(){
        if(!window.mouseDown){//if out of range only remove drag if mouse up
            this.drag = false;
        }
    }
    colideEvent(){
        if(window.mouseDown){//if mouse down and overlap start/cont drag
            this.drag = true;
        }
        
    }
    updateSelf(){
        if(this.drag){
            let difx = window.mousePos.x - this.parent.Global.x;
            let dify = window.mousePos.y - this.parent.Global.y;
            let newRadius = Math.sqrt(difx*difx+dify*dify);
            if(newRadius > 25){
            this.parent.radius = newRadius;
            this.pos.x = Math.cos(Math.PI*0.25)*this.parent.radius;
            this.pos.y = Math.sin(Math.PI*0.25)*this.parent.radius;
            }
        }
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
        this.class = "mouse";
        this.MoveIntRadi = 10;
    }
    NotColide(){
        if(!window.mouseDown){//if out of range only remove drag if mouse up
            this.drag = false;
        }
    }
    colideEvent(){
        if(window.mouseDown){//if mouse down and overlap start/cont drag
            this.drag = true;
        }
        
    }
    colideSelf(point,r){//takes the point and radius and returns if it is coliding with the object
        return circleOverlap(point,this.Global,r,this.MoveIntRadi);
    }
    updateSelf(){
        if(this.drag){//if it's draging
           if(window.mouseDown){
            if(this.parent == null){
                console.warn("oh no");
            }else if(this.parent.parent == null){
                this.parent.pos.x = window.mousePos.x;
                this.parent.pos.y = window.mousePos.y;
            }else{
                this.parent.pos.x = window.mousePos.x - this.parent.parent.Global.x;
                this.parent.pos.y = window.mousePos.y - this.parent.parent.Global.y;
            }
        }
        }
    }
    drawSelf(){
        if(window.EditorState.mode == "edit"){
            let MoveIntDim = this.MoveIntRadi*2;
            ctx.drawImage(assets.move.canvas,this.Global.x-this.MoveIntRadi,this.Global.y-this.MoveIntRadi,MoveIntDim,MoveIntDim);
        }
    }
}


class InterSect extends Comp{
    constructor(initX,initY){
        super(initX,initY,"black",1);
        this.class = "inter";
        this.Radi = 10;
    }
    NotColide(){
        if(!window.mouseDown){//if out of range only remove drag if mouse up
            this.drag = false;
        }
    }
    colideEvent(){
        if(window.mouseDown){//if mouse down and overlap start/cont drag
            this.drag = true;
        }
        
    }
    colideSelf(point,r){//takes the point and radius and returns if it is coliding with the object
        return circleOverlap(point,this.Global,r,this.Radi);
    }
    updateSelf(){
        this.pos.x = this.parent.radius;
        this.pos.y = 0;
    }
    drawSelf(){
        if(window.EditorState.mode == "add"){
            let Dim = this.Radi*2;
            ctx.drawImage(assets.Inter.canvas,this.Global.x-this.Radi,this.Global.y-this.Radi,Dim,Dim);
        }
    }
}

class Division extends Comp{
    constructor(initX,initY,icolor,lineWidth,initradius){
        super(initX,initY,icolor,lineWidth);
        this.class = "div";
        this.radius = initradius;
        this.CodeComp = true;
    }
     
    colideSelf(point,r){//takes the point and radius and returns if it is coliding with the object
        return circleOverlap(point,this.Global,this.radius,r);
    }
    NotColide(point,r){
    }
    colideEvent(){
    }
    updateSelf(){

    }
    drawSelf(){
        drawDiv(this);
    }
}

class Curl extends Comp{
    constructor(initX,initY,icolor,lineWidth,initradius){
        super(initX,initY,icolor,lineWidth);
        this.class = "curl";
        this.radius = initradius;
        this.CodeComp = true;
    }
    colideSelf(point,r){//takes the point and radius and returns if it is coliding with the object
        return circleOverlap(point,this.Global,this.radius,r);
    }
    NotColide(point,r){
    }
    colideEvent(){
    }
    updateSelf(){

    }
    drawSelf(){
        drawCurl(this);
    }
}
//add if groups

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
        drawCurl(this);
    }

}



export {Comp,Division,ExtendInter,MoveInter,debugRect,container,PreView,Curl,InterSect,overlap};