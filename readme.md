Sample NodeJS project using a TypeScript module published to GitHub

### Install
* `yarn install` 
* or `npm install`

### Build
* `gulp clean:dependencies`
* `gulp compile:dependencies`
* `gulp clean`
* `gulp compile`
* `gulp` (clean-dependencies + compile-dependencies + clean + compile)

### Run
* `yarn run main`
* or `npm run main`

### Including TypeScript Modules from GitHub
* Module should include `./tsconfig.json`
* Module source should be in `./src`
* Module transpiles to `./dist`

```
$ yarn add git+ssh://git@github.com/<account>/<repository>.git#branch --save
```
or
```
$ npm install git+ssh://git@github.com/<account>/<repository>.git#branch --save
```

```
// gulpfile.js
var tsModules = [
    'ts-npm-module',
    'my-ts-module-1', // add ts module here
    'my-ts-module-2', // add ts module here
];
```

```
$ gulp build
```