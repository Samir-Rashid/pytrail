const vscode = require("vscode");

export const DEBUG = false;

// TODO: make 3 differnt colors
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
