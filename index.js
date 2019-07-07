'use strict'

const path = require('path')
const graphicsMagick = require('gm')

module.exports = class ImageminGm {
  constructor (gmPath) {
    this.gm = gmPath
      // Add trailing separator ('/' on Posix, '\\' on Windows)
      ? graphicsMagick.subClass({ appPath: path.normalize(gmPath + path.sep) })
      : graphicsMagick
  }

  resize (opts) {
    return buf => {
      opts = Object.assign({}, opts)

      if (!Buffer.isBuffer(buf)) {
        return Promise.reject(new TypeError('Expected a buffer'))
      }

      let image = this.gm(buf).resize(opts.width, opts.height)

      if (opts.gravity) {
        image = image.gravity(opts.gravity)
      }

      return new Promise((resolve, reject) =>
            image.toBuffer((err, buffer) => (err) ? reject(err) : resolve(buffer)))
    }
  }

  convert (to) {
    return buf => {
      if (!Buffer.isBuffer(buf)) {
        return Promise.reject(new TypeError('Expected a buffer'))
      }

      to = to.replace(/jpeg/i, 'JPG').toUpperCase()

      return new Promise((resolve, reject) => {
        let image = this.gm(buf)
        image.format({ bufferStream: true }, (err, format) => {
          if (err) {
            return reject(err)
          }

          if (format === to) {
            return resolve(buf)
          }

          // Make sure transparent PNGs get a white background when converted to JPG
          if (format === 'PNG') {
            image = image
              // Compression level is adjusted later in the process
              .quality(100)
              .background('#ffffff')
              .flatten()
          }

          image.toBuffer(to, (err, buffer) => (err) ? reject(err) : resolve(buffer))
        })
      })
    }
  }
}
