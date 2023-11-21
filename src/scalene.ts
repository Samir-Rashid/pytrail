import path = require("path");
import { annotateFile } from "./annotation";
import { DEBUG, myOutputChannel } from "./constants";
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

  // TODO: --cli will output to stdout so I don't have to use a file
  // Use the nonglobal scalene installation (-m) and unbuffer text output
  // so it can be streamed to debug console (-u)
  // BUG: `-u` doesn't work with scalene
  // BUG: scalene doesn't respect --json flag correctly.
  const command = `python -um scalene --json --no-browser --cli --outfile ${profilePath} ${mainpyPath}`;
  vscode.window.showInformationMessage(`running command: ${command}`);
  myOutputChannel.appendLine(`running command: ${command}`);

  const startTime = new Date();

  // Make sure command output is readable
  myOutputChannel.clear();
  myOutputChannel.show();

  // Add env var to force Python to not buffer output
  // TODO: Did not succeed.
  const addToEnv = {
    PYTHONUNBUFFERED: "",
  };
  const newEnv = { ...process.env, ...addToEnv };

  const subprocess = childProcess.spawn(command, [], {
    shell: true,
    env: newEnv,
  });

  subprocess.stdout.on("data", (data: any) => {
    myOutputChannel.append(data.toString());
  });

  subprocess.stderr.on("data", (data: any) => {
    myOutputChannel.append(data.toString());
  });

  // Running code from
  // https://github.com/formulahendry/vscode-code-runner/blob/master/src/codeManager.ts#L459
  subprocess.on("close", (code: string) => {
    const endTime = new Date();
    const elapsedTime = (endTime.getTime() - startTime.getTime()) / 1000;
    myOutputChannel.appendLine("");
    myOutputChannel.appendLine(
      "[Done] exited with code=" + code + " in " + elapsedTime + " seconds",
    );
    myOutputChannel.appendLine("");
  });

  // Notify rest of extension of new trace data
  const activeTextEditor = vscode.window.activeTextEditor?.document;
  parseAnnotationDataFile();
  annotateFile(activeTextEditor);
}
