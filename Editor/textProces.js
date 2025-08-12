



function SpiralText(ctx,txt="hello world",radius=10,pos={x:0,y:0},size=20,color="black",font="sans-serif"){
    ctx.save();
    console.log(txt,pos);
    ctx.translate(pos.x, pos.y);
    let Radi = radius;
    let LineArr = txt.split('\n');
    ctx.font = size + 'px ' + font;
    ctx.fillStyle = color;
    for (let i = 0; i < LineArr.length; i++) {
      Radi -= size*0.9;
      console.log(Radi);
      let Dim = Math.PI * 2 * Radi;
      let LineLen = ctx.measureText(LineArr[i]).width;
      if (LineLen > Dim) {
        ctx.font = size * (Dim / LineLen) + 'px ' + font;
      } else {
        ctx.font = size + 'px ' + font;
      }
      let RadiCovered = LineLen / Radi;
      let Rotation = -RadiCovered*0.5;
      for (let j = 0; j < LineArr[i].length; j++) {
        ctx.save();
        ctx.rotate(Rotation);
        ctx.fillText(LineArr[i][j], 0, -Radi);
        ctx.restore();
        Rotation += ctx.measureText(LineArr[i][j]).width/Radi;
      }
    }

    ctx.restore();
}


export {SpiralText};