const CompSelect = document.querySelectorAll(".Comp");

function initControl(){
    for(var i = 0;i<CompSelect.length;i++){
        CompSelect[i].addEventListener("click",function(){
            window.EditorState.mode = "add";
            window.EditorState.type = this.id;
            console.log("selected:"+this.id);
        });
    }
    console.log("init:click lsitener for compnent selection");
}



export {initControl};