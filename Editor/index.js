const canvas = document.querySelector(".MainCanvas");
const ctx = canvas.getContext("2d");

var Componets = [];



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
    constructor(initX,initY){
        this.selected = false;
        this.pos = {x:initX,y:initY};
    };
}

class Division extends Comp{
    constructor(initX,initY,initradius){
        super(initX,initY);
        this.radius = initradius;
        this.Drag = {x:initX+initradius,y:initY+initradius};//point of draging
    }
}

class WhileCirc extends Comp{
    constructor(initX,initY,initRadiusDo,initRadiusFor){
        super(initX,initY);
        this.radiusDo = initRadiusDo;
        this.radiusFor = initRadiusFor;
        this.Drag = {x:initX+initradius,y:initY+initradius};//point of draging
    }
}

class IfCirc extends Comp{
    constructor(initX,initY,initNumSections){
        super(initX,initY);
        this.NumSections = initNumSections;
        this.Drag = {x:initX+initradius,y:initY+initradius};//point of draging
    }
}