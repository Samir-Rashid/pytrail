const vscode = require("vscode");

// may need to make this async if it takes a while?
export function annotateLine(lineNum: number) {
  const decorationType = vscode.window.createTextEditorDecorationType({
    before: {
      contentText: "100ms",
      margin: "0 0 0 10px",
      color: "orange",
    },
  });

  // Get the active text editor
  const editor = vscode.window.activeTextEditor;

  if (editor) {
    // Define the range where you want to add the annotation (e.g., line 1)
    const line = new vscode.Range(
      new vscode.Position(lineNum, 0),
      new vscode.Position(lineNum, 0),
    );

    // Set the decorations on the editor
    editor.setDecorations(decorationType, [{ range: line }]);
  }
}

export function annotateFile() {
  const decorationType = vscode.window.createTextEditorDecorationType({
    before: {
      contentText: "100ms", // TODO: Get runtime for line
      margin: "0 0 0 10px",
      color: "orange", // TODO: Make this dependent on runtime
    },
  });

  // Get the active text editor
  const editor = vscode.window.activeTextEditor;

  if (editor) {
    // Get the total number of lines in the active document
    const totalLines = editor.document.lineCount;

    // Create an array to store the decorations for each line
    const decorations = [];

    for (let lineNumber = 0; lineNumber < totalLines; lineNumber++) {
      const line = new vscode.Range(
        new vscode.Position(lineNumber, 0),
        new vscode.Position(lineNumber, 0),
      );
      decorations.push({ range: line });
    }

    // Set the decorations on the editor for all lines
    editor.setDecorations(decorationType, decorations);
  }
}
