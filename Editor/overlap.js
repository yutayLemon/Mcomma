


function circleOverlap(pos1,pos2,r1,r2){//takes the point and radius and returns if it is coliding with the object
        let dif = (pos1.x - pos2.x)*(pos1.x - pos2.x)+(pos1.y - pos2.y)*(pos1.y - pos2.y);
        let BufferZone = false;
        let ExactZone = false;
        if(dif*1.2 < (r2+r1)*(r2+r1)){
            BufferZone  = true;
        }
        if(dif < (r2+r1)*(r2+r1)){
            ExactZone  = true;
        }
        return {buffer:BufferZone,Exact:ExactZone};
    }


export {circleOverlap}