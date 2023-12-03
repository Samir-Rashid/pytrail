import * as vscode from "vscode"; // TODO: is * import bad?
import { annotateFile, annotateLine } from "./annotation";
import { runScalene } from "./scalene";
import { DEBUG, myOutputChannel } from "./constants";
import { parseAnnotationDataFile } from "./utilities";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Show output console with extension's output
  myOutputChannel.appendLine("Pytrail has started");

  // Add listeners to annotate active files
  const activeTextEditor = vscode.window.activeTextEditor?.document;
  parseAnnotationDataFile();
  annotateFile(activeTextEditor);
  vscode.window.onDidChangeActiveTextEditor((e) => annotateFile(e?.document));

  // Register the commands here, as defined from package.json
  let disposable = vscode.commands.registerCommand("pytrail.version", () => {
    vscode.window.showInformationMessage("pytrail 0.0.3"); // TODO: get this value from package.json
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
      runScalene(); // TODO: if this fails, don't continue executing. This spews a bunch of unreadable errors.
    },
  );

  context.subscriptions.push(disposable);
  context.subscriptions.push(doAnnotating);
  context.subscriptions.push(getTraceData);
}

// This method is called when your extension is deactivated
export function deactivate() {}
