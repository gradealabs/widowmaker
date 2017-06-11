# Widowmaker

Eliminates any file or directory within her sights.

## Quick Start

    npm install gradealabs/widowmaker -S

To use the API:

    import widowmaker from '@gradealabs/widowmaker'

    widowmaker('somefile.jpg', 'dest')
      .then(() => console.log('draw them into my web!'))
      .catch(error => console.error(error))

To use the CLI:

    {
      "scripts": {
        "clean": "widowmaker dest lib somefile.js"
      }
    }

## CLI

    Usage: widowmaker [options] file file ...

    Options:
      --verbose, -V  Determines if the elapsed time should be logged       [boolean]
      --help         Show help                                             [boolean]

Example:

    node ./node_modules/.bin/widowmaker -V file.txt dest

Or in a `package.json` (installed locally):

    {
      "scripts": {
        "clean": "widowmaker -V file.txt dest"
      }
    }


## API

**widowmaker(...files)**

Delete any file or directory. Can accept variadic strings or array of strings.

Example:

    import widowmaker from '@gradealabs/widowmaker'

    widowmaker('file.js', [ 'dest', 'otherfile.jpg' ], 'file.ts')
      .then(() => console.log('draw them into my web'))
      .catch(error => console.error(error))

## Building

To build your Node-based module API

    npm run build:node

To build your client UMD module

    npm run build:client

To build both the Node and client API at the same time

    bpm run build

To clean all generated folders

    npm run clean

## Testing

Unit tests are expected to be colocated next to the module/file they are testing
and have the following suffix `.test.js`.

To run unit tests through [istanbul](https://istanbul.js.org/) and
[mocha](http://mochajs.org/)

    npm test

## Maintainence

To check what modules in `node_modules` is outdated

    npm run audit

To update outdated modules while respecting the semver rules in the package.json

    npm update

To update a module to the latest major version (replacing what you have)

    npm install themodule@latest -S (if to save in dependencies)
    npm install themodule@latest -D (if to save in devDependencies)
