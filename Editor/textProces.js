function SpiralText(id,ctx,txt="hello world",radius=10,pos={x:0,y:0},size=20,color="black",font="sans-serif"){
    if(id != window.TextSetting.elemt.id && txt==""){
        txt="..Enter Text";
        color="gray";
    }
    ctx.save();
    ctx.translate(pos.x, pos.y);
    let Radi = radius;
    let LineArr = txt.split('\n');
    ctx.font = size + 'px ' + font;
    ctx.fillStyle = color;
    let Rotation = 0;
    for (let i = 0; i < LineArr.length; i++) {
      Radi -= size*0.9;
      let Dim = Math.PI * 2 * Radi;
      let LineLen = ctx.measureText(LineArr[i]).width;
      if (LineLen > Dim) {
        ctx.font = size * (Dim / LineLen) + 'px ' + font;
      } else {
        ctx.font = size + 'px ' + font;
      }
      let RadiCovered = LineLen / Radi;
      Rotation = -RadiCovered*0.5;
      let res = RenderNextChar(ctx,Rotation,LineArr[i],Radi);
    }

    if(id == window.TextSetting.elemt.id){
        Blinker(ctx,Rotation,Radi);
    }

    ctx.restore();
}

function IntersectionText(id,ctx,txt="hello world",radius=10,r2=10,pos1={x:0,y:0},pos2={x:0,y:0},size=20,color="black",font="sans-serif"){
    //r2 is constant
    if(id != window.TextSetting.elemt.id && txt==""){
        txt="..Enter Text";
        color="gray";
    }
    ctx.save();
    ctx.translate(pos1.x, pos1.y);
    let Radi = radius;
    let LineArr = txt.split('\n');
    ctx.font = size + 'px ' + font;
    ctx.fillStyle = color;
    let Dist = Math.sqrt((pos1.x-pos2.x)*(pos1.x-pos2.x)+(pos1.y-pos2.y)*(pos1.y-pos2.y));
    let OffsetAngle = Math.atan2((pos2.y-pos1.y),(pos2.x-pos1.x))+Math.PI*0.5;
    let Rotation = OffsetAngle;

    for (let i = 0; i < LineArr.length; i++) {
      Radi -= size*0.9;

      let Dim = Radi*Math.acos((Math.pow(Radi,2)-Math.pow(r2,2)+Math.pow(Dist,2)/(2*Dist*Radi)));
      let LineLen = ctx.measureText(LineArr[i]).width;
      if (LineLen > Dim) {
        ctx.font = size * (Dim / LineLen) + 'px ' + font;
      } else {
        ctx.font = size + 'px ' + font;
      }
      let RadiCovered = LineLen / Radi;
      Rotation = -RadiCovered*0.5+OffsetAngle;
      let res = RenderNextChar(ctx,Rotation,LineArr[i],Radi);
        
    }

    if(id == window.TextSetting.elemt.id){
        Blinker(ctx,Rotation,Radi);
    }

    ctx.restore();
}

function RenderNextChar(ctx,Rotation,str,Radi){//returns new roation
    for (let j = 0; j < str.length; j++) {

        ctx.save();
        ctx.rotate(Rotation);

        if(str[j] == 'r' && str.slice(j,j+4) == "redo"){
            let RedoDim = ctx.measureText("%").width*3;
            ctx.drawImage(window.assets.redo.canvas,0-RedoDim*0.5,-Radi-RedoDim*0.5,RedoDim,RedoDim)
            Rotation+=RedoDim/Radi
            j += 4;
        }else{
            ctx.fillText(str[j], 0, -Radi);
            Rotation+=ctx.measureText(str[j]).width/Radi
        }


        ctx.restore();
    }
    
    //return  {Rotate:Rotation,i:index};
}

function Blinker(ctx,Rotation,Radi){
    ctx.rotate(Rotation);
    let current = Date.now();
    if(current-window.TextSetting.lastBlink>200){
        window.TextSetting.blink = !window.TextSetting.blink;
        window.TextSetting.lastBlink = current;
    }
    if(window.TextSetting.blink){
        ctx.fillText("|",0,-Radi);
    }
}

export {SpiralText,IntersectionText};