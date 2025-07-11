{
  description = "SvelteKit dev shell with Node.js and npm";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs { inherit system; };
      in {
        devShells.default = pkgs.mkShell {
          buildInputs = [
            pkgs.nodejs_24
          ];

          shellHook = ''
            npm install
            clear
            echo "Development Enviroment Ready."
            echo "NPM packages installed."
          '';
        };
      });
}
