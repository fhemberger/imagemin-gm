# imagemin-gm [![npm version][npm-image]][npm-url]

> GraphicsMagick imagemin plugin

**Important:** This plugin requires [GraphicsMagick](http://www.graphicsmagick.org) to be installed.  
On Mac OS X (for example), this can be done via [Homebrew](http://brew.sh): `brew install graphicsmagick`.


## Install

```
$ npm install --save imagemin-gm
```


## Usage

```js
const imagemin = require('imagemin');
const imageminGm = require('imagemin-gm');

const plugins = [
    imageminGm.resize({ width: 250, height: 250, gravity: 'Center' }),
    imageminGm.convert('jpg')
];
imagemin(['images/*.gif'], 'build/images', { use: plugins }).then(() => {
	console.log('Images optimized');
});
```


## API

### imageminGm.resize({options})(buffer)

Resizes the image buffer. At least one dimension must be given, otherwise the image isn't altered. If both image dimensions are set, the image is resized to fit the constraints while maintaining the original aspect ratio. Image position can be adjusted with the `gravity` parameter.

#### Options
- `width`
- `height`
- `gravity` (optional): NorthWest|North|NorthEast|West|Center|East|SouthWest|South|SouthEast

### imageminGm.convert(format)(buffer)

Converts the image buffer to a different image format.
**Note:** If you use the imagemin CLI tool or the `grunt`/`gulp` task, the original filename is used, although the image format has changed. You have to rename the file with the correct extension yourself afterwards.

#### Options
- `format` (e.g. 'gif', 'jpeg', 'png')


## License

[MIT](LICENSE.txt)

[npm-url]: https://npmjs.org/package/imagemin-gm
[npm-image]: http://img.shields.io/npm/v/imagemin-gm.svg
