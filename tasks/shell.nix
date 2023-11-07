{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  buildInputs = [
    pkgs.python310
    pkgs.virtualenv
  ];

  shellHook = ''
    python3 -m venv venv
    source venv/bin/activate
    pip install -r requirements.txt
  '';
  # could use something like pipenv to requirements if there is no requirements.txt
}

