# wintersmith-revision [![Build Status](https://travis-ci.org/xavierdutreilh/wintersmith-revision.svg?branch=master)](https://travis-ci.org/xavierdutreilh/wintersmith-revision) [![Dependency Status](https://gemnasium.com/badges/github.com/xavierdutreilh/wintersmith-revision.svg)](https://gemnasium.com/github.com/xavierdutreilh/wintersmith-revision)

> A [Wintersmith](https://github.com/jnordberg/wintersmith) plugin to revise static files

## Installation

Install globally or locally using npm:

```bash
npm install [-g] wintersmith-revision
```

Add `wintersmith-revision` to your `config.json`:

```json
{
  "plugins": [
    "wintersmith-revision"
  ]
}
```

## Usage

`wintersmith-revision` extracts all static files from the content tree and revise them. If you only want to revise some of them, you need to define the `revision` property in your config.json and specify the list of files to revise:

```json
{
  "revision": [
    "static/styles/sample.css",
    "static/scripts/**/*.js"
  ]
}
```

Please note that `wintersmith-revision` relies on `minimatch` to match filenames with specified patterns. So, any pattern supported by `minimatch` is also supported by `wintersmith-revision`.

## License

`wintersmith-revision` is released under the [MIT license](http://en.wikipedia.org/wiki/MIT_License).
