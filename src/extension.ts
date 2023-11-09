import * as vscode from "vscode"; // TODO: is * import bad?
import { annotateFile, annotateLine } from "./annotation";
import { runScalene } from "./scalene";
import { DEBUG, myOutputChannel } from "./constants";
import { parseAnnotationDataFile } from "./utilities";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Show debug console with extension's output
  console.log("Pytrail has started");
  if (DEBUG) myOutputChannel.show();

  // TODO: add some logic to check if the trace data doesn't exist and surface an error to the user to run the getTraceData command

  // Add listeners to annotate active files
  const activeTextEditor = vscode.window.activeTextEditor?.document;
  vscode.workspace.onDidChangeTextDocument((e) => annotateFile(e.document));
  vscode.window.onDidChangeActiveTextEditor((e) => annotateFile(e?.document));
  annotateFile(activeTextEditor);

  // Register the commands here, as defined from package.json
  let disposable = vscode.commands.registerCommand("pytrail.version", () => {
    vscode.window.showInformationMessage("pytrail 0.0.1");
  });

  let doAnnotating = vscode.commands.registerCommand(
    "pytrail.doAnnotating",
    () => {
      annotateFile(activeTextEditor);
    },
  );

  let getTraceData = vscode.commands.registerCommand(
    "pytrail.getTraceData",
    () => {
      runScalene();
      parseAnnotationDataFile();
      annotateFile(activeTextEditor);
    },
  );

  context.subscriptions.push(disposable);
  context.subscriptions.push(doAnnotating);
  context.subscriptions.push(getTraceData);
}

// This method is called when your extension is deactivated
export function deactivate() {}
