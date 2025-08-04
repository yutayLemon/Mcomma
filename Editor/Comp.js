import { canvas,ctx } from "./canvas.js";

class Comp{
    constructor(initX,initY,icolor,lineWidth){
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
    draw(){
        drawIf(this);
    }
}

class PreView extends Comp{
    constructor(){
        console.log("Mouse Previews constructed");
    }
    draw(){
        if(window.EditorState.type == "div"){
            drawDiv({color:"red"});
        }
    }
}

function drawDiv({
    color = "black",
    pos = {x:0,y:0},
    radius = 10,
    lineWdith=1
} = {}){
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWdith;
        ctx.arc(pos.x, pos.y, radius, 0, 2 * Math.PI);
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        ctx.stroke();
}

function drawWhile({
    color = "black",
    pos = {x:0,y:0},
    radiusDo = 10,
    radiusFor = 5,
    lineWdith=1,
    centerDo = {x:-5,y:0},
    centerFor = {x:5,y:0}
} = {}){
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWdith;
        ctx.arc(centerDo.x, centerDo.y, radiusDo, 0, 2 * Math.PI);
        ctx.arc(centerFor.x, centerFor.y, radiusFor, 0, 2 * Math.PI);
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        ctx.stroke();
}

function drawIf(){
        ctx.beginPath({
            color = "black",
            pos = {x:0,y:0},
            NumSections = 3,
            lineWdith=1,
            TipHight = 5,
            radius = 10
        } = {});
        ctx.strokeStyle =  color;
        ctx.lineWidth =  lineWdith;
        ctx.arc( pos.x,  pos.y,  radiusDo, 0, 2 * Math.PI);
        ctx.moveTo( pos.x, pos.y+ radius);
        let SectRadi = Math.cos(Math.PI/( NumSections*2))* radius;
        for(let i = 0;i< NumSections;i++){
            ctx.moveTo(Math.cos(SectRadi*2*i - SectRadi)* radius,Math.sin(SectRadi*2*i - SectRadi)* radius);
            ctx.lineTo(Math.cos(SectRadi*2*i - SectRadi)*( radius+ TipHight),Math.sin(SectRadi*2*i - SectRadi)*( radius+ TipHight));
            ctx.lineTo(Math.cos(SectRadi*2*i + SectRadi)* radius,Math.sin(SectRadi*2*i - SectRadi)* radius);
        }
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        ctx.stroke();
}



export {Comp,Division,WhileCirc,IfCirc,PreView};