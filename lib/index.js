const match = require('./match')
const revise = require('./revise')

function index (env, callback) {
  const patterns = env.config.revision || ['**/*']

  env.plugins.StaticFile.prototype.getFilename = function getFilename () {
    if (match(this.filepath.relative, patterns)) {
      return revise(this.filepath)
    }

    return this.filepath.relative
  }

  callback()
}

module.exports = index
