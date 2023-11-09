const vscode = require("vscode");

export const DEBUG = false;

// Setup debug output console
export const myOutputChannel = vscode.window.createOutputChannel("Pytrail");

/// STATE ///

// Map of annotation data for each line and file
export const annotationData = new Map();

/// END STATE ///

// TODO: make 3 different colors
export const decorationType = vscode.window.createTextEditorDecorationType({
  before: {
    margin: "0 0 0 10px",
    color: "orange",

    // Options:
    // border
    // outline
    // color
    // backgroundColor
    // fontWeight
    // textDecoration
    // letterSpacing
    // opacity
  },
  // This does not work because VSCode does not currently expose hover API for this
  // https://github.com/microsoft/vscode/issues/105302
  // https://github.com/microsoft/vscode/issues/28080
  // hoverMessage: "test message",
});
