const vscode = require("vscode");
const fs = require("fs");
const childProcess = require("child_process");

// TODO: should make this more functional
export function runScalene() {
  const decorationType = vscode.window.createTextEditorDecorationType({
    before: {
      contentText: "100ms",
      margin: "0 0 0 10px",
      color: "orange",
    },
  });

  const editor = vscode.window.activeTextEditor;
  // Run scalene profiler on the Python script and save the JSON output
  childProcess.exec(
    `scalene /home/samir/Documents/github/pytrail/tasks/main.py`,
    (error: Error | null, stdout: string, stderr: string) => {
      // Display the standard output and standard error for debugging
      if (stdout) {
        vscode.window.showInformationMessage(`stdout: ${stdout}`);
      }
      if (stderr) {
        vscode.window.showErrorMessage(`stderr: ${stderr}`);
      }
      if (error) {
        vscode.window.showErrorMessage(
          `Error running scalene: ${error.message}`,
        );
        return;
      }

      // Read the JSON data from the profile.json file
      fs.readFile(
        `/home/samir/Documents/github/pytrail/tasks/profile.json`,
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
            const fileData = profileData.files[filePath];
            const linesData = fileData.lines;

            // TODO: need to do this for functions and imports
            for (const line in linesData) {
              const lineData = linesData[line];
              const time = lineData.n_sys_percent; // Assuming the timing data is in the second position
              const lineNumber = parseInt(lineData.lineNo) - 1; // VSCode lines are 0 indexed

              if (lineNumber >= 0 && lineNumber < editor.document.lineCount) {
                const range = editor.document.lineAt(lineNumber).range;
                const decoration = {
                  range,
                  renderOptions: {
                    before: {
                      contentText: `${time}ms`,
                    },
                  },
                };

                editor.setDecorations(decorationType, [decoration]);
              }
            }
          }
        },
      );
    },
  );
}
