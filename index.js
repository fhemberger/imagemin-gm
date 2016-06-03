'use strict';

const gm = require('gm');


module.exports.resize = opts => buf => {
    opts = Object.assign({}, opts);

    if (!Buffer.isBuffer(buf)) {
        return Promise.reject(new TypeError('Expected a buffer'));
    }

    let image = gm(buf).resize(opts.width, opts.height);

    if (opts.gravity) {
        image = image.gravity(opts.gravity)
    }

    return new Promise((resolve, reject) =>
        image.toBuffer((err, buffer) => (err) ? reject(err) : resolve(buffer)));
}


module.exports.convert = (to) => buf => {

    if (!Buffer.isBuffer(buf)) {
        return Promise.reject(new TypeError('Expected a buffer'));
    }

    to = to.replace(/jpeg/i, 'JPG').toUpperCase();

    return new Promise((resolve, reject) => {

        let image = gm(buf);
        image.format({ bufferStream: true }, (err, format) => {

            if (err) {
                return reject(err);
            }

            if (format === to) {
                return resolve(buf);
            }

            // Make sure transparent PNGs get a white background when converted to JPG
            if (format === 'JPG') {
                image = image
                    // Compression level is adjusted later in the process
                    .quality(100)
                    .background('#ffffff')
                    .flatten();
            }

            image.toBuffer(to, (err, buffer) => (err) ? reject(err) : resolve(buffer));
        });
    });
}
