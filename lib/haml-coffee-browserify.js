var through      = require('through'),
    CoffeeScript = require('coffee-script');

require('coffee-script/register');

var HamlCompiler = require('haml-coffee/src/haml-coffee');

/**
 * Browserify plugin to convert haml-coffee (.hamlc) templates to Javascript.
 *
 * Example:
 *
 * $ browserify -t haml-coffee-browserify foo.hamlc > bundle.js
 *
 **/
var HamlCoffeeBrowserify = {

  /**
   * HamlCoffeeBrowserify.process(file)
   * - file (String)
   *
   * Process the haml-coffee template.
   **/
  process : function (file) {
    var source = '',
        stream;

    if (!this._isHaml(file)) {
      return through();
    }

    // save a file chunk
    function write (chunk) {
      source += chunk.toString();
    }

    // end the process
    function end () {
      var options  = {},
          compiler = new HamlCompiler(options),
          template,
          compiled;

      compiler.parse(source);

      template = CoffeeScript.compile(
        compiler.precompile(),
        {
          bare: true
        }
      );

      compiled = "module.exports = function(options) {\n" +
        "return (function() {\n" +
        template + "\n" +
        "}).call(options)\n" +
        "};";

      stream.queue(compiled);

      stream.queue(null);
    }

    stream = through(write, end);

    return stream;
  },

  /**
   * HamlCoffeeBrowserify._isHaml(file) -> Boolean
   * - file (String)
   *
   * Determine if the file is a haml-coffee template.
   **/
  _isHaml : function (file) {
    return (/\.(haml|hamlc)$/).test(file);
  }
};

module.exports = HamlCoffeeBrowserify.process.bind(HamlCoffeeBrowserify);