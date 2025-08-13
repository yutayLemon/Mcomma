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
      for (let j = 0; j < LineArr[i].length; j++) {
        ctx.save();
        ctx.rotate(Rotation);
        ctx.fillText(LineArr[i][j], 0, -Radi);
        ctx.restore();
        Rotation += ctx.measureText(LineArr[i][j]).width/Radi;
      }
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
      for (let j = 0; j < LineArr[i].length; j++) {
        ctx.save();
        ctx.rotate(Rotation);
        ctx.fillText(LineArr[i][j], 0, -Radi);
        ctx.restore();
        Rotation += ctx.measureText(LineArr[i][j]).width/Radi;
      }
    }

    if(id == window.TextSetting.elemt.id){
        Blinker(ctx,Rotation,Radi);
    }

    ctx.restore();
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

function GeneralToText(subject,start,end,thisTxt,seperator,indent){
        let childStr = "";
        for(const item of subject.children){
            let ChildTxt = item.toText();
            if(ChildTxt != ""){
                childStr += ChildTxt + seperator;
            }
        }   
        return (start+subject.txt.context+thisTxt+childStr+end);
}
function CondToText(subject){
        let childtxt = ChildrenText(subject);
        return ("if("+subject.txt.context+";"+childtxt+")");
}

function CurlToText(subject){
    let childStr = "";
    let Overlap = "";
        for(const item of subject.children){
            let ChildTxt = item.toText();
            if(ChildTxt != ""){
                if(item.class == "overlap"){
                    Overlap = ChildTxt;
                }else{
                    childStr += ChildTxt + ";\n";
                }
            }
        } 
    return "else " + Overlap + "{\n" + subject.txt.context + childStr +"}\n";
}

function ChildrenText(subject,seperator=""){
        let childStr = "";
        for(const item of subject.children){
            let ChildTxt = item.toText();
            if(ChildTxt != ""){
                childStr += ChildTxt + seperator;
            }
        }   
        return childStr;
}
export {SpiralText,IntersectionText,GeneralToText,CondToText,CurlToText};