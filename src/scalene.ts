import { decorationType, DEBUG } from "./constants";
import { getWorkspaceDir } from "./utilities";

const vscode = require("vscode");
const fs = require("fs");
const childProcess = require("child_process");

// TODO: should make this more functional
export function runScalene() {
  const editor = vscode.window.activeTextEditor;

  // Run scalene profiler on `main.py`, which stores the trace data in `profile.json`
  const workspaceDirectory = getWorkspaceDir();
  let command = DEBUG ? "echo" : `scalene ${workspaceDirectory}/main.py`;

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

      // Setup debug output console
      const myOutputChannel = vscode.window.createOutputChannel("Pytrail");
      if (DEBUG) myOutputChannel.show();

      // Read the JSON data from the profile.json file
      fs.readFile(
        `${workspaceDirectory}/profile.json`,
        "utf8",
        (err: Error | null, data: string) => {
          if (err) {
            vscode.window.showErrorMessage(
              `Error reading profile.json: ${err.message}`,
            );
            return;
          }

          const profileData = JSON.parse(data);

          // Extract timing data and update decorations for each line
          for (const filePath in profileData.files) {
            myOutputChannel.appendLine("file path: " + filePath);
            const fileData = profileData.files[filePath];
            const linesData = fileData.lines;

            const decorations = [];

            // TODO: need to do this for functions and imports
            for (const line in linesData) {
              const lineData = linesData[line];

              // TODO: format floats better and need to add coloring logic
              const time = lineData.n_sys_percent.toFixed(2).padStart(5, "0"); // TODO: need to read details on the different profiling statistics
              const lineNumber = lineData.lineno - 1; // VSCode lines are 0 indexed

              myOutputChannel.appendLine(
                "line " + lineNumber + " took " + time + "percent to run",
              );
              if (lineNumber >= 0 && lineNumber < editor.document.lineCount) {
                myOutputChannel.appendLine(" ↳ ADDED");

                const range = editor.document.lineAt(lineNumber).range;
                const decoration = {
                  range,
                  renderOptions: {
                    before: {
                      contentText: `${time}% `,
                    },
                  },
                };

                decorations.push(decoration);
              }
            }
            editor.setDecorations(decorationType, decorations);
          }
        },
      );
    },
  );
}
