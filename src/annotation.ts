import { TextDocument } from "vscode";
import {
  DEBUG,
  myOutputChannel,
  annotationData,
  decorationTypeLow,
  decorationTypeMed,
  decorationTypeHigh,
} from "./constants";
const vscode = require("vscode");

export function annotateLine(lineNum: number) {}

export async function annotateFile(document: TextDocument | undefined) {
  if (document) {
    if (annotationData.size == 0) {
      myOutputChannel.appendLine(
        "annotation: There is no annotation data to use! Try running `pytrail: Run Tracing` in the command palette.",
      );
      vscode.window.showErrorMessage(
        "annotation: There is no annotation data to use! Try running `pytrail: Run Tracing` in the command palette.",
      );
      return;
    }

    const editor = vscode.window.activeTextEditor;
    const activeEditor = vscode.window.activeTextEditor;

    if (activeEditor) {
      const filePath = activeEditor.document.fileName;
      const fileAnnotationData = annotationData.get(filePath);
      myOutputChannel.appendLine(`current editor is ${filePath}`);

      const decorations = [];

      for (const line in fileAnnotationData) {
        const lineData = fileAnnotationData[line];

        // TODO: format floats better and need to add coloring logic
        const time = lineData.n_sys_percent.toFixed(2).padStart(5, "0"); // TODO: need to read details on the different profiling statistics
        const lineNumber = lineData.lineno - 1; // VSCode lines are 0 indexed

        myOutputChannel.appendLine(
          "line " + lineNumber + " took " + time + "percent to run",
        );
        if (lineNumber >= 0 && lineNumber < editor.document.lineCount) {
          myOutputChannel.appendLine(" ↳ ADDED");
          const color = time > 1 ? "red" : "white";
          const opacity = time > 1 ? "100%" : "50%";
          const range = editor.document.lineAt(lineNumber).range;
          const decoration = {
            range,
            renderOptions: {
              before: {
                contentText: `${time}% `,
                color: color,
                opacity: opacity,
              },
            },
          };

          decorations.push(decoration);
        }
      }
      editor.setDecorations(decorationTypeLow, decorations);
    }
  }
}
