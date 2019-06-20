const webfontsGenerator = require('webfonts-generator');
const fileType = require('file-type');
const fs = require('fs');
const path = require('path');
const buildHtml = require('./buildIconHtml')

const baseIconPath = './';
const svgsPath = path.join(process.cwd(), baseIconPath);
const templatePath = path.resolve(__dirname, '../template/css.hbs')

const files = fs.readdirSync(svgsPath)
  .filter(file => file.match(/\.svg$/))
  .map(file => {
    return `${baseIconPath}${file}`
  })

module.exports = () => {
  webfontsGenerator({
    files,
    fontName: 'generate-icon',
    cssTemplate: templatePath,
    templateOptions: {
      classPrefix: 'ui-icon-',
      baseSelector: '.ui-icon'
    },
    types: ['woff'],
    dest: './dest',
    writeFiles: true,
  }, function(error, result) {
    if (error) {
      console.log('Building Failure!', error)
    } else {
      buildHtml();
      console.log('Building Success!')
    }
  })
}