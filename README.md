# <img src="./images/hill.png" alt="hill icon" width="10%" /> pytrail: Python profiling as you develop

Pytrail is an extension that brings effortless performance tracing to the VSCode IDE. Pytrail only supports Python programs. Pytrail works by running [Scalene](https://github.com/plasma-umass/scalene) against the `main.py` in the root of your editor and adding performance information to all files when you run the `Annotate file` command in the Command Palette. 


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
