const vscode = require("vscode");

export function toAnnotationWidth() {}

/// Return the directory VSCode is open in.
export function getWorkspaceDir() {
  // May need to add error handling like https://github.com/wix/import-cost/blob/master/packages/vscode-import-cost/src/fs.js
  if (vscode.workspace.workspaceFolders) {
    // Get the first workspace folder
    const workspaceFolder = vscode.workspace.workspaceFolders[0];

    const workspaceDirectory = workspaceFolder.uri.fsPath;

    console.log(`Workspace Directory: ${workspaceDirectory}`);
    return workspaceDirectory;
  } else {
    console.log("No workspace is open.");
  }
}
