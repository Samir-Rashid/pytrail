# <img src="./images/hill.png" alt="hill icon" width="10%" /> pytrail: Python profiling as you develop

Pytrail is an extension that brings effortless performance tracing to the VSCode IDE. Pytrail only supports Python programs. Pytrail works by running [Scalene](https://github.com/plasma-umass/scalene) against the `main.py` in the root of your editor and adding performance information to all files when you run the `Annotate file` command in the Command Palette. 

## Quick setup

1. Install from VSIX inside VSCode by `right click file -> install` or use `code --install-extension ./pytrail-0.0.1.vsix`
2. Make sure you have a working main.py in the root of your vscode workspace. For example, open `tasks/` in VSCode.
3. Open command pallette and run `pytrail: Run Tracing`. This requires you to have Python and Scalene installed (`python3 -m pip install -U scalene`). 
4. You should now have timing metadata on the left of your editor for lines that ran from `main.py`.

## To set up the extension:

1. Get the dependencies by doing `npm install` or use the `nix-shell` environment.
2. I use `npm run debug` during development to build and install the extension. It is easier to use the VSCode built in way for running the extension. Something shows up in the bottom bar to run it (doesn't work for me)
3. **Simple way**: If you have the extension file, you can run `code --install-extension ./pytrail-0.0.1.vsix` and then reload VSCode. Note for the extension to work, your VSCode needs to be open to the tasks/ folder (or any folder with main.py at the root).

## Attribution

Logo icon by <a href="https://www.flaticon.com/free-icons/hill" title="hill icons">Hill icons created by Freepik - Flaticon</a>

Trace data provided by [Scalene](https://github.com/plasma-umass/scalene)

## TODO:
- https://code.visualstudio.com/api/working-with-extensions/bundling-extension
- add extension to VSCode store
- add screenshot/gif to features
- fix the huge amount of prints
- test on other machines
- add functions and import performance metadata
- add coloring mechanism

---

## Features

TODO


## Requirements

Use pip to install scalene.

## Extension Settings

None

## Known Issues

There are some hard coded values. You must have a runnable main.py.

## Release Notes

### 0.0.1

- Initial release of pytrail
- basic tracing and editor annotation support

## Contributing

Contributions welcome! File a PR or issue. Note this repository is GNU GPLv3, and your code will be licensed as such.
