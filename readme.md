### Install
* `yarn install` 
* or `npm install`

### Build
* `gulp clean-dependencies`
* `gulp compile-dependencies`
* `gulp clean`
* `gulp compile`
* `gulp` (clean-dependencies + compile-dependencies + clean + compile)

### Run
* `npm start`

### Including TypeScript Modules from GitHub
```
$ yarn add git+ssh://git@github.com/<account>/<repository>.git#branch --save
```

```
gulp.task('clean-dependencies', function () {
    return merge([
        cleanDependency('ts-npm-module'),
        cleanDependency('my-ts-module-1'), // add ts modules here
        cleanDependency('my-ts-module-2'), // add ts modules here
    ]);
});
```

```
gulp.task('compile-dependencies', function () {
    return merge([
        compileDependency('ts-npm-module'),
        compileDependency('my-ts-module-1'), // add ts modules here
        compileDependency('my-ts-module-2'), // add ts modules here
    ]);
});
```