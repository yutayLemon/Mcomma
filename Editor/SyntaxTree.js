const MAIN = 0;
const COND = 1;
const ELSE = 2;
const REDOPARM = 1;

class SyntaxNode{
    constructor(){
        this.class = "";
        this.info = {}
        this.parent = null;
        this.children = [[],[],[]];//2 dimentional
        this.layer = 0;
        this.redoTag = false;
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

class SyntaxTree{
    constructor(type,obj){
        this.head = new SyntaxNode();
        this.head.class = "head";
        this.head.layer = 0;

        if(type == "Draw"){
            SelfFromDrawObj(obj,this.head);
        }
    }

    ToMcomma(Node){
        let mainChild = this.ChildrenToMcomma(Node.children[MAIN]);
        let condChild = this.ChildrenToMcomma(Node.children[COND]);
        let elseChild = this.ChildrenToMcomma(Node.children[ELSE]);

        let txt = "";
        switch(Node.class){
            case "txt":
                txt = Node.info.txt;//add children maby
                break;
            case "head":
                txt =  mainChild;
                break;
            case "div":
                txt =  mainChild;
                break;
            case "curl":
                txt =  `{\n${mainChild}\n}`;
                break;
            case "if":
                if(Node.children[2].length == 0){
                    txt =  `if${condChild}{\n${mainChild}\n}\n`;//c ound of figured out how to do curl
                }else{
                    txt =  `if${condChild}{\n${mainChild}\n}else${elseChild}\n`; 
                }
                break;
            case "condition":
                txt = `(${mainChild})`;
                break;
            default:
                txt = mainChild;
                break;
        }

        return txt;
    }

    
    ChildrenToMcomma(Children){
        let str = "";
        for(const child of Children){
            str += this.ToMcomma(child);
        }
        return str;
    }

    ToMjs(Node){
        let mainChild = this.ChildrenToMjs(Node.children[MAIN]);
        let condChild = this.ChildrenToMjs(Node.children[COND]);
        let elseChild = this.ChildrenToMjs(Node.children[ELSE]);

        let txt = "";
        switch(Node.class){
            case "txt":
                txt = Node.info.txt;//add children maby
                break;
            case "head":
                txt =  mainChild;
                break;
            case "div":
                txt =  mainChild;
                break;
            case "curl":
                txt =  `{\n${mainChild}\n}`;
                break;
            case "if":
                if(Node.children[2].length == 0){
                    txt =  `if${condChild}{\n${mainChild}\n}\n`;//c ound of figured out how to do curl
                }else{
                    txt =  `if${condChild}{\n${mainChild}\n}else${elseChild}\n`; 
                }
                break;
            case "condition":
                txt = `(${mainChild})`;
                break;
            default:
                txt = mainChild;
                break;
        }

        if(Node.redoTag){
            txt = `\nlable:for(;;){\n${txt}\n}`;
        }

        return txt;
    }

    
    ChildrenToMjs(Children){
        let str = "";
        for(const child of Children){
            str += this.ToMjs(child);
        }
        return str;
    }
}

function SelfFromDrawObj(obj,parent){// obj DrawObject      parent Syntax object to tack on to
                                //addchild new node , group to send to
    if(!obj.CodeComp){//skip
        ChildrenFromDrawObj(obj.children,parent);
        return 0;
    }
        

    let NewNode = new SyntaxNode();
    NewNode.layer = parent.layer;

    let Destination = MAIN;
    switch(obj.class+":"+obj.SubClass){
        case "curl:ifelse":
                NewNode.class = "curl";
                Destination = ELSE;
                break;
        case "curl:if":
                NewNode.class = "if";
                NewNode.layer++;
                break;
        case "curl:":
                NewNode.class = "curl";
                NewNode.layer++;
                break;
        case "overlap:":
                NewNode.class = "condition";
                Destination = COND;
                break;
        case "div:":
                NewNode.class = "div";
                NewNode.layer++;
                break;
        default:
                NewNode.class = "div";
                NewNode.layer++;
                break;

    }
        
    parent.addChild(NewNode,Destination);

    let TextNode = new SyntaxNode(obj.txt.context);
    TextNode.info.txt = obj.txt.context;
    TextNode.class = "txt";
    TextNode.layer = NewNode.layer;
    NewNode.addChild(TextNode,MAIN);


    //propagate up//TODO clean up
    const redoMatches = [...obj.txt.context.matchAll(/\bredo(?:\.(\d+))?\b/g)];
    for(const item of redoMatches){
        AddRedoTag(item[REDOPARM],parent);//layer is not added fix TODO
    }

    ChildrenFromDrawObj(obj.children,NewNode);
    return 0;
}
    
function ChildrenFromDrawObj(children,parent){
        for(let i = 0;i<children.length;i++){
            SelfFromDrawObj(children[i],parent);
        }
}

function AddRedoTag(backStep,Node){
        let currentNode = Node;
        let goalLayer = Node.layer - backStep;
        while(currentNode.parent != null && currentNode.parent.layer >= goalLayer){
            currentNode = currentNode.parent;
        }
        currentNode.redoTag = true;
}

function DrawObjToMcomma(obj){
    let NewSyntax = new SyntaxTree("Draw",obj);
    return NewSyntax.ToMcomma(NewSyntax.head);
}


function McommaAddWhiteSpace(str){
    let finstr = "";
    let Spacing = " ";
    let SpacingCount = 0;
    for(let i = 1;i<str.length;i++){
        let CondSemiColen = str[i-1] == ";";//no new line is added yet
        let CondBraketS = str[i-1] == "{";//no new line is added yet
        let CondBraketE = str[i-1] == "}";//will fix
        let CondNewLine = str[i] == "\n";
        finstr+=str[i-1];
        if(CondBraketS){
            SpacingCount++;
        }
        if(CondBraketE){
            SpacingCount--;
        }

        if(CondNewLine){
            finstr += "\n";
            for(let j = 0;j<SpacingCount;j++){
                finstr += Spacing;
            }
        }else{
            if((CondBraketE || CondBraketS) || CondSemiColen){
                finstr += "\n";
            }
        }
    }
    return finstr;
}

let Mcomma = {};
Mcomma.Format = McommaAddWhiteSpace;
Mcomma.DrawObj = DrawObjToMcomma;
export {SyntaxTree,Mcomma}