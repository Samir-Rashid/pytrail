import * as vscode from "vscode";
import { annotateFile, annotateLine } from "./annotation";
import { runScalene } from "./scalene";
import { DEBUG } from "./constants";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "pytrail" is now active!');

  // Register the commands here, as defined from package.json
  let disposable = vscode.commands.registerCommand("pytrail.version", () => {
    vscode.window.showInformationMessage("pytrail 0.0.1");
  });

  let doAnnotating = vscode.commands.registerCommand(
    "pytrail.doAnnotating",
    () => {
      // annotateLine(lineNum);
      // annotateFile();
      runScalene();
    },
  );

  context.subscriptions.push(disposable);
  context.subscriptions.push(doAnnotating);
}

// This method is called when your extension is deactivated
export function deactivate() {}
