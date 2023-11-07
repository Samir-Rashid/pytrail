const vscode = require("vscode");
const decorationType = vscode.window.createTextEditorDecorationType({
  before: {
    contentText: "100ms",
    margin: "0 0 0 10px",
    color: "orange",
  },
});
