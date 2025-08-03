const canvas = document.querySelector(".MainCanvas");
const ctx = canvas.getContext("2d");

var Componets = [];

Componets.push(
    new Division(100,100,"red",5,50)
);


function UpdateCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);    
    updateComponets();
    DrawComponets();
    requestAnimationFrame(UpdateCanvas);
}


function updateComponets(){
    for(var i = 0;i<Componets.length;i++){
        Componets[i].update();
    }
}

function DrawComponets(){
    for(var i = 0;i<Componets.length;i++){
        Componets[i].draw();
    }
}



class Comp{
    constructor(initX,initY,icolor,ilineWdith){
        this.selected = false;
        this.pos = {x:initX,y:initY};
        this.lineWdith = ilineWdith;
        this.color = icolor;
    };
}

class Division extends Comp{
    constructor(initX,initY,icolor,ilineWdith,initradius){
        super(initX,initY,icolor,ilineWdith);
        this.radius = initradius;
        this.Drag = {x:initX+initradius,y:initY+initradius};//point of draging
    }

    draw(){
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.lineWdith;
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        ctx.stroke();
    }
}

class WhileCirc extends Comp{
    constructor(initX,initY,icolor,ilineWdith,initRadiusDo,initRadiusFor,icenterDoX,icenterDoY,icenterForX,icenterForY){
        super(initX,initY,icolor,ilineWdith);
        this.centerDo = {x:icenterDoX,y:icenterDoY};
        this.centerFor = {x:icenterForX,y:icenterForY};
        this.radiusDo = initRadiusDo;
        this.radiusFor = initRadiusFor;
        this.Drag = {x:initX+initradius,y:initY+initradius};//point of draging
    }
    draw(){
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.lineWdith;
        ctx.arc(this.centerDo.x, this.centerDo.y, this.radiusDo, 0, 2 * Math.PI);
        ctx.arc(this.centerFor.x, this.centerFor.y, this.radiusFor, 0, 2 * Math.PI);
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        ctx.stroke();
    }
}

class IfCirc extends Comp{
    constructor(initX,initY,icolor,ilineWdith,initNumSections,iTipH,iCondH){
        super(initX,initY,icolor,ilineWdith);
        this.NumSections = initNumSections;
        this.TipHight = iTipH;
        this.CondHight = iCondH;

        this.Drag = {x:initX+initradius,y:initY+initradius};//point of draging
    }
    draw(){
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.lineWdith;
        ctx.arc(this.pos.x, this.pos.y, this.radiusDo, 0, 2 * Math.PI);
        ctx.moveTo(this.pos.x,this.pos.y+this.radius);
        let SectRadi = Math.cos(Math.PI/(this.NumSections*2))*this.radius;
        for(let i = 0;i<this.NumSections;i++){
            ctx.moveTo(Math.cos(SectRadi*2*i - SectRadi)*this.radius,Math.sin(SectRadi*2*i - SectRadi)*this.radius);
            ctx.lineTo(Math.cos(SectRadi*2*i - SectRadi)*(this.radius+this.TipHight),Math.sin(SectRadi*2*i - SectRadi)*(this.radius+this.TipHight));
            ctx.lineTo(Math.cos(SectRadi*2*i + SectRadi)*this.radius,Math.sin(SectRadi*2*i - SectRadi)*this.radius);
        }
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        ctx.stroke();
    }
}