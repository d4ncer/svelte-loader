const { compile } = require('svelte');

module.exports = function(source, map) {
  this.cacheable();

  const filename = this.resourcePath;

  try {
    let { code, map } = compile(source, {
      // name: CamelCase component name
      filename: filename,
      format: 'es',
      onerror: (err) => {
        console.log(err.message);
        this.emitError(err.message);
      },
      onwarn: (warn) => {
        console.log(warn.message);
        this.emitWarn(warn.message);
      }
    });

    this.callback(null, code, map);
  } catch (err) {
    this.callback(err);
  }
};
