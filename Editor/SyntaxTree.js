

class SyntaxNode{
    constructor(){
        this.class;
        this.layer = 0;
        this.id;
       
        this.info = {}
        
    };
    toMcomma(){
        
    }
    toMjs(){

    }
}

class DivSyntax extends SyntaxNode{
    constructor(){
        this.class = "div";
        super();
    }
}

class curlSyntax extends SyntaxNode{
    constructor(){
        this.class = "curl";
        super();
    }
}

class IfSyntax extends SyntaxNode{
    constructor(){
        this.class = "if";
        super();
    }
}

class SyntaxNode{
    constructor(data,parent){
        this.data = data;
        this.parent = parent;
        this.children = [[]];//2 dimentional
    }
    addChild(data,group){
        if(this.children[group]){
            this.children[group].push(new SyntaxNode(data,this));
        }else{
            this.children[group] = [new SyntaxNode(data,this)];
        }
    }
}


let groupInfo = {
    div:{
        context:0,
        defult:0
    },
    overlap:{
        context:0,
        defult:0
    },
    curl:{
        context:1,
        defult:1,
        overlap:0
    }
}


function DrawObjToSyntax(obj,head){
    if(obj.class == "div"){
        head.addChild();
        head.addChild(obj,groupInfo[div.context]);
    }else if(obj.class == "curl"){
        
    }
}