import { DEBUG, myOutputChannel, annotationData } from "./constants";
const vscode = require("vscode");
const fs = require("fs");

export function parseAnnotationDataFile() {
  const workspaceDirectory = getWorkspaceDir();
  annotationData.clear(); // Flush out of date annotation data

  // Read the JSON data from the profile.json file
  const profileJsonPath = `${workspaceDirectory}/profile.json`;
  fs.readFile(profileJsonPath, "utf8", (err: Error | null, data: string) => {
    if (err) {
      vscode.window.showErrorMessage(
        `Error reading ${profileJsonPath}: ${err.message}\nSuggested fix: if this file does not exist, you need to run the command 'pytrail: Run Tracing'.`,
      );
      return;
    }

    const profileData = JSON.parse(data);

    // Extract timing data and update decorations for each line
    for (const filePath in profileData.files) {
      myOutputChannel.appendLine("parsing file path: " + filePath);
      const fileData = profileData.files[filePath];
      const linesData = fileData.lines;

      // TODO: need to do this for functions and imports
      annotationData.set(filePath, linesData);
    }
  });

  if (DEBUG) myOutputChannel.appendLine(annotationData);
}

export function toAnnotationWidth() {}

/// Return the directory VSCode is open in.
export function getWorkspaceDir() {
  // May need to add error handling like https://github.com/wix/import-cost/blob/master/packages/vscode-import-cost/src/fs.js
  if (vscode.workspace.workspaceFolders) {
    // Get the first workspace folder
    const workspaceFolder = vscode.workspace.workspaceFolders[0];

    const workspaceDirectory = workspaceFolder.uri.fsPath;

    myOutputChannel.appendLine(`Workspace Directory: ${workspaceDirectory}`);
    return workspaceDirectory;
  } else {
    myOutputChannel.appendLine("No workspace is open.");
  }
}
