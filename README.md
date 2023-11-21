# <img src="./images/hill.png" alt="hill icon" width="10%" /> pytrail: Python profiling as you develop

Pytrail is an extension that brings effortless performance tracing to the VSCode IDE. Pytrail only supports Python programs. Pytrail works by running [Scalene](https://github.com/plasma-umass/scalene) against the `main.py` in the root of your editor and adding performance information to all files when you run the `Annotate file` command in the Command Palette. 

![Demo of running pytrail](./images/demo.webm.mp4):

https://github.com/Samir-Rashid/pytrail/assets/35205346/e53e6ea7-ac18-4b3a-b99f-d721e18ff835

## Quick setup
<a href="https://marketplace.visualstudio.com/items?itemName=Samir-Rashid.pytrail">
  <img src="https://img.shields.io/badge/Install-VSCode%20Marketplace-blue" alt="Marketplace Badge"/>
</a>

1. Install from VSIX inside VSCode by `right click file -> install` or use `code --install-extension ./pytrail-0.0.1.vsix`
2. Make sure you have a working main.py in the root of your vscode workspace. For example, open `tasks/` in VSCode.
3. Open command pallette and run `pytrail: Run Tracing`. This requires you to have Python and Scalene installed (`python3 -m pip install -U scalene`). 
4. You should now have timing metadata on the left of your editor for lines that ran from `main.py`.

## Development setup:

1. Get the dependencies by doing `npm install` or use the `nix-shell` environment.
2. I use `npm run debug` during development to build and install the extension. It is easier to use the VSCode built in way for running the extension. Something shows up in the bottom bar to run it (doesn't work for me)
3. **Simple way**: If you have the extension file, you can run `code --install-extension ./pytrail-0.0.1.vsix` and then reload VSCode. Note for the extension to work, your VSCode needs to be open to the tasks/ folder (or any folder with main.py at the root).

## Attribution

Logo icon by <a href="https://www.flaticon.com/free-icons/hill" title="hill icons">Hill icons created by Freepik - Flaticon</a>

Trace data provided by [Scalene](https://github.com/plasma-umass/scalene)

## TODO:
- make the function annotations highlighted to differentiate
  - this requires making my own parsing logic and profile read time to map the function data into my lines metadata map
- Outstanding bug in VSCode means I can't put the annotation in the gutter, so deleting code makes things wonky. A compromise between rerendering every keypress and every file change should be to only rerender if the number of lines in the file has changed. Of course, this will misalign the metadata, so this needs some sort of cheap extra logic to handle that case.
- bundle with scalene?
- Add ""use strict";" to all files
- Add locking mechanism to tracing. Only run one trace at a time and make it clear and interruptible. Will require major refactor to use a class for each file.
- Warn if editor is dirty befor run?
- Add colored output like [this](https://github.com/formulahendry/vscode-code-runner/commit/cf7c6467a24c46d44a44fdc1c2c04fad856c3d3f)
- add [keybindings](https://github.com/formulahendry/vscode-code-runner/blame/79e83c84e361bcf65dc4c1d5693ebbed864e694c/package.json#L67C9-L67C9)
- add the [debug menu](https://github.com/formulahendry/vscode-code-runner/blame/79e83c84e361bcf65dc4c1d5693ebbed864e694c/package.json#L88) to interrupt scalene run

---

## Features

TODO


## Requirements

Use pip to install scalene.

## Extension Settings

None

## Known Issues

There are some hard coded values. You must have a runnable main.py.

This project is tested and should work. Please file an issue if you have any problems, and I will take a look on a best effort basis.

## Release Notes

### 0.0.1

- Initial release of pytrail
- basic tracing and editor annotation support

## Contributing

Contributions welcome! File a PR or issue. Note this repository is GNU GPLv3, and your code will be licensed as such.

You MAY use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) for your PR. 
