{ pkgs ? import <nixpkgs> { } }:
pkgs.mkShell {
  buildInputs = with pkgs; [
    nodejs
    yarn
    esbuild
  ];
  shellHook = ''
    # These lines are only needed for the initial extension bootstrap `yo code`

    # mkdir -p ./.npm-global
    # npm config set prefix '/home/samir/Documents/github/pytrail/.npm-global'
    # export PATH=/home/samir/Documents/github/pytrail/.npm-global/bin:$PATH
    
    npm install
  '';
}
