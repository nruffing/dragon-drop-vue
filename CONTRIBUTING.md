# Contribution Guidelines

For more information on the communities code of conduct read the [guide](https://github.com/nruffing/data-grid-vue/blob/main/CODE_OF_CONDUCT.md).

## Pull Requests

Please fork repository from `main` branch and pull request changes back into the `main` branch.

## Development Environment

This repo is setup with three [pnpm workspaces](https://pnpm.io/workspaces).

The root workspace is setup with the following options via a `.nmprc` file.

```
#include ".npmrc"
```

The following will install dependencies for all workspaces including the root.

```sh
pnpm install
```

### Workspaces

#### 1. Root Workspace

The root workspace is setup to build/pack the actual package.

```sh
pnpm build
```

The compiled javascript module and typescript type definitions are built into the `dist` folder at the root of the repo.


#### 2. Local Development App

The `dev-app` folder contains the workspace for an app that consumes the package directly from the `lib` folder for local development and testing.

```sh
pnpm run dev-app:dev
```


### Development Tools

* VS Code
  * Extensions
    * [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)
    * [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
    * [Volar - TypeScript Plugin](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin)
* Node v18.*
* pnpm v8.*
* NPM dependencies
  * Vue v3.3.8+
  * Vite v5.*
  * Typescript v5.*
  * Husky
  * Prettier
    * Formats and spell checks in husky pre-commit hook
  * Vuepress 2
  * TypeDoc
* CSS
  


### Scripts

#### `pnpm ci-all`

Installs all dependencies via `pnpm i` and then runs the `build` script for each workspace including the root workspace.

#### `pnpm dev`

Runs the `dev` script in both the `vuepress` and `dev-app` workspace. The development app will bind to `https://localhost:5173` and the vuepress site will bind to `https://localhost:8080`.

#### `pnpm spellcheck`

Spellchecks the entire repo minus a few excluded files and folders configured in `cspell.json`.

#### `pnpm format`

Runs prettier formatter against the entire repo using the configuration in `.prettierrc`.

