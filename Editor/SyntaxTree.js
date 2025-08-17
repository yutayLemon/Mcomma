

class SyntaxNode{
    constructor(){
        this.class;
        this.info = {}
        this.parent;
        this.children = [[]];//2 dimentional
    };
    addChild(child,group){
        child.parent = this;
        if(this.children[group]){
            this.children[group].push(child);
        }else{
            this.children[group] = [child];
        }
    }
}

function DrawObjToSyntax(obj){
    let TreeHead = new SyntaxNode();
    TreeHead.class = "head";
    SingleDrawObjToSyntax(obj,TreeHead);
    return TreeHead;
}


function SingleDrawObjToSyntax(obj,parent){// obj DrawObject      parent Syntax object to tack on to
    //addchild new node , group to send to
    if(!obj.CodeComp){
        ChildrenSyntax(obj.children,parent);
        return 0;
    }
    let TextNode = new SyntaxNode(obj.txt.context);
    TextNode.info.txt = obj.txt.context;
    TextNode.class = "txt";
    let NewNode = new SyntaxNode();
    if(obj.class == "curl" && obj.SubClass == "ifelse"){
        NewNode.class = "curl";
        parent.addChild(NewNode,2);
    }else if(obj.class == "curl" && obj.SubClass == "if"){
        NewNode.class = "if";
        parent.addChild(NewNode,0);//TODO FIX UP
    }else if(obj.class == "div"){
        NewNode.class = "div";
        parent.addChild(NewNode,0);//group 0 main body, group 1 conditionals ,group 2 else body
    }else if(obj.class == "overlap"){
        NewNode.class = "condition";
        parent.addChild(NewNode,1);
    }else if(obj.class == "curl"){
        NewNode.class = "curl";
        parent.addChild(NewNode,0);
    }else{
        NewNode.class = "div";
        parent.addChild(NewNode,0);
    }
    NewNode.addChild(TextNode,0);
    ChildrenSyntax(obj.children,NewNode);
    return 0;
}

function ChildrenSyntax(children,parent){
    for(let i = 0;i<children.length;i++){
        SingleDrawObjToSyntax(children[i],parent);
    }
}


function SyntaxTreeToMcomma(Node){
    switch(Node.class){
        case "txt":
            return Node.info.txt;//add children maby
        case "head":
            return ChildToMcomma(Node.children[0]);
        case "div":
            return ChildToMcomma(Node.children[0]) + ";";
        case "curl":
            return "{"+ChildToMcomma(Node.children[0])+"}";
        case "if":
            if(Node.children[2] == undefined){
                return "if " + ChildToMcomma(Node.children[1]) + "{"+ ChildToMcomma(Node.children[0]) +"}";//c ound of figured out how to do curl
            }else{
                return "if " + ChildToMcomma(Node.children[1]) +"{"+ ChildToMcomma(Node.children[0]) +"}"+ "else" + ChildToMcomma(Node.children[2]); 
            }
        case "condition":
            return "("+ChildToMcomma(Node.children[0])+")";
        default:
            return ChildToMcomma(Node.children[0]);
    }
}
function McommaWhiteSpace(Node){
    switch(Node.class){
        case "txt":
            return Node.info.txt;//add children maby
        case "head":
            return ChildToMcomma(Node.children[0]);
        case "div":
            return ChildToMcomma(Node.children[0]) + ";\n";
        case "curl":
            return "{\n"+ChildToMcomma(Node.children[0])+"\n}";
        case "if":
            if(Node.children[2] == undefined){
                return "\nif " + ChildToMcomma(Node.children[1]) + "{\n"+ ChildToMcomma(Node.children[0]) +"\n}";//c ound of figured out how to do curl
            }else{
                return "\nif " + ChildToMcomma(Node.children[1]) +"{\n"+ ChildToMcomma(Node.children[0]) +"\n}"+ "else" + ChildToMcomma(Node.children[2]); 
            }
        case "condition":
            return "("+ChildToMcomma(Node.children[0])+")";
        default:
            return ChildToMcomma(Node.children[0]);
    }
}



function ChildToMcomma(Children){
    let str = "";
    for(let i = 0;i<Children.length;i++){
       // str += SyntaxTreeToMcomma(Children[i]);
        str += McommaWhiteSpace(Children[i]);
    }
    return str;
}

function DrawObjToMcomma(obj){
    let SyntaxHead = DrawObjToSyntax(obj);
    return McommaWhiteSpace(SyntaxHead);
}


let SyntaxTree = {};
SyntaxTree.ToMcomma = SyntaxTreeToMcomma;
SyntaxTree.Build = DrawObjToSyntax;
SyntaxTree.DrawTree = DrawObjToMcomma;


export {SyntaxTree}