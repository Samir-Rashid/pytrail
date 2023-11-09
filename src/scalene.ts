import { decorationType, DEBUG } from "./constants";
import { getWorkspaceDir } from "./utilities";

const vscode = require("vscode");
const fs = require("fs");
const childProcess = require("child_process");

// Run scalene profiler on `main.py`, which stores the trace data in `profile.json`
export function runScalene() {
  // TODO: should make this more functional
  const workspaceDirectory = getWorkspaceDir();
  let command = `scalene --json --no-browser ${workspaceDirectory}/main.py `; // --cli will output to stdout so I don't have to use a file
  vscode.window.showInformationMessage(`running command: ${command}`);

  childProcess.exec(
    command,
    (error: Error | null, stdout: string, stderr: string) => {
      // Display the standard output and standard error for debugging
      if (DEBUG && stdout) {
        vscode.window.showInformationMessage(`stdout: ${stdout}`);
      }
      if (DEBUG && stderr) {
        vscode.window.showErrorMessage(`stderr: ${stderr}`);
      }
      if (error) {
        vscode.window.showErrorMessage(
          `Error running scalene: ${error.message}`,
        );
        return;
      }
    },
  );
}
