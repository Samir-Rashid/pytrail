import path = require("path");
import { annotateFile } from "./annotation";
import { DEBUG } from "./constants";
import { getWorkspaceDir, parseAnnotationDataFile } from "./utilities";

const vscode = require("vscode");
const fs = require("fs");
const childProcess = require("child_process");

// Run scalene profiler on `main.py`, which stores the trace data in `profile.json`
export function runScalene() {
  // TODO: should make this more functional
  const workspaceDirectory = getWorkspaceDir();
  const profilePath = path.join(workspaceDirectory, "profile.json");
  const mainpyPath = path.join(workspaceDirectory, "main.py");

  let command = `python -m scalene --json --no-browser --cli --outfile ${profilePath} ${mainpyPath}`; // --cli will output to stdout so I don't have to use a file
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

  // await new Promise(r => setTimeout(r, 100)); // TODO: File doesn't read correctly immediately after the trace. Fix this by just skipping writing to a file

  // Notify rest of extension of new trace data
  const activeTextEditor = vscode.window.activeTextEditor?.document;
  parseAnnotationDataFile();
  annotateFile(activeTextEditor);
}
