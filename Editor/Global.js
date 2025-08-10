window.EditorState = {
    mode:"add",//move to move ,add:to add componets
    Subject:"NULL",
    type:"NULL",
    CursorState:"ideal"
}

window.mousePos = {
    x:0,
    y:0
}

window.mouseDown = false;

window.GlobalScale = 1;
window.SetScale = (n)=>{
    window.GlobalScale = n;
}
window.TopItems = {
    maxCodeItem:{class:"null"},
    maxItem:{class:"null"}
}

window.canvasOffset = {x:0,y:0};