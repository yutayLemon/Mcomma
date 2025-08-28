import { EditorView, basicSetup } from "https://esm.sh/codemirror@6.0.1";
import { javascript } from "https://esm.sh/@codemirror/lang-javascript@6.1.4";

let MjsEditor  = new EditorView({
    doc: `console.log("Hello, world!");`,
    extensions: [basicSetup, javascript()],
    parent: document.querySelector(".editor-sectionMjs")
});


let McommaEditor = new EditorView({
    doc: `console.log("Hello, world!");`,
    extensions: [basicSetup, javascript()],
    parent: document.querySelector(".editor-sectionMcomma")
});







let Editors = {};
Editors.Mjs = MjsEditor;
Editors.Mcomma = McommaEditor;

export {Editors}