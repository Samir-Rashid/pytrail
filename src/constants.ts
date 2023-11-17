const vscode = require("vscode");

export const DEBUG = false; // This value MUST be set to false for a production build

// Setup debug output console
export const myOutputChannel = vscode.window.createOutputChannel("Pytrail");

/// STATE ///

// Map of annotation data for each line and file
export const annotationData = new Map();

/// END STATE ///

export const decorationTypeLow = vscode.window.createTextEditorDecorationType({
  before: {
    margin: "0 0 0 10px",
    color: "white",
    opacity: "50%",
  },
});
export const decorationTypeMed = vscode.window.createTextEditorDecorationType({
  before: {
    margin: "0 0 0 10px",
    color: "orange",
  },
});
export const decorationTypeHigh = vscode.window.createTextEditorDecorationType({
  before: {
    margin: "0 0 0 10px",
    color: "red",
  },
});

// This does not work because VSCode does not currently expose hover API for this
// https://github.com/microsoft/vscode/issues/105302
// https://github.com/microsoft/vscode/issues/28080
// hoverMessage: "test message",
