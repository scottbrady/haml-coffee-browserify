Browserify plugin to convert haml-coffee (.hamlc) templates to Javascript.

# Installation

This package is available on npm as:

```
npm install haml-coffee-browserify
```

# Usage

```
$ browserify -t haml-coffee-browserify foo.hamlc > bundle.js
```

# Configuration

You can configure the Hamlc compiler through package.json, under a `haml-coffee-browserify` key.
Check out Hamlc [Compiler Options](https://github.com/netzpirat/haml-coffee#compiler-options) and [Custom Helper Function Options](https://github.com/netzpirat/haml-coffee#custom-helper-function-options) for more info

For example:
```
  "haml-coffee-browserify": {
    "compilerOptions": {
      "customHtmlEscape": "window.HAML.escape",
      "customPreserve": "window.HAML.preserve",
      "customCleanValue": "window.HAML.cleanValue",
      "customSurround": "window.HAML.surround",
      "customSucceed": "window.HAML.succeed",
      "customPrecede": "window.HAML.precede",
      "customReference": "window.HAML.reference",
      "context": "window.HAML.context"
    }
  }
```

# License

MIT

## Acknowledgments

Based on the [hamlify](https://github.com/maxim/hamlify) project by Paul Taylor.