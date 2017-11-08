# imagemin-gm

[![npm version][npm-image]][npm-url]

GraphicsMagick plugin for [imagemin](https://github.com/imagemin/imagemin)


## Install

```
$ npm install --save imagemin-gm
```

**Important:** This plugin requires [GraphicsMagick](http://www.graphicsmagick.org) to be installed.  
On macOS for example, you can use [Homebrew](http://brew.sh): `brew install graphicsmagick`.

If this script throws the Exception `Stream yields empty buffer`, this means the GraphicsMagick binaries can not be found in your path. You can pass the location to the `ImageminGm` constructor.


## Usage

```js
const imagemin = require('imagemin')
const ImageminGm = require('imagemin-gm')
const imageminGm = new ImageminGm()

const plugins = [
  imageminGm.resize({ width: 250, height: 250, gravity: 'Center' }),
  imageminGm.convert('jpg')
]

imagemin(['images/*.gif'], 'output', { use: plugins })
  .then(() => console.log('Images converted'))
  .catch(err => console.error(err))
```


## API

### ImageminGm([gmPath])

Constructor, optionally pass the path to GraphicsMagick binaries (not the binary itself).

Example:

```js
// Posix
let imageminGm = new ImageminGm('/path/to/gm/binaries/')
// Windows
let imageminGm = new ImageminGm('C:\\Path\\to\\gm\\binaries\\')
```


### imageminGm.resize(options)

Resizes the image buffer. At least one dimension must be given, otherwise the image isn't altered. If both image dimensions are set, the image is resized to fit the constraints while maintaining the original aspect ratio. Image position can be adjusted with the `gravity` option.

#### Options
- `width`
- `height`
- `gravity` (optional): NorthWest|North|NorthEast|West|Center|East|SouthWest|South|SouthEast


### imageminGm.convert(format)

Converts the image buffer to a different image format (e.g. 'gif', 'jpeg', 'png').
**Note:** The original filename is used, although the image format has changed. You have to rename the file with the correct extension yourself afterwards.


## License

[MIT](LICENSE.txt)

[npm-url]: https://npmjs.org/package/imagemin-gm
[npm-image]: http://img.shields.io/npm/v/imagemin-gm.svg
