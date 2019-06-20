const fs = require('fs');
const os = require('os');

module.exports = () => {
  const file = fs.readFileSync('./dest/generate-icon.css').toString();

  const icons = file.split(os.EOL);

  const getColor = () => '#' + Math.random().toString(16).substr(-6);

  let html = `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <title>icon 示例</title>
  <link rel="stylesheet" href="./generate-icon.css">
  <style>.ui-icon{font-size: 44px;height: 44px;width: 44px;margin: 4px;}</style>
  </head>
  <body>`;

  for (var i = 0; i < icons.length; i++) {
    var icon = icons[i];
    if (icon.includes('icon-')) {
        var className = icon.split('.')[1].split(':')[0];
        html += '<i class="ui-icon ' + className + '"></i>';
        if (i % 32 === 1) {
            html += '<br />'
        }
    }
  }

html += `<script>
        var getColor = function () {
            return '#' + Math.random().toString(16).substr(-6);
        }
        var icons = document.getElementsByTagName('i')
        for (var i = 0; i < icons.length; i++) {
            var icon = icons[i];
            icon.style.color = getColor()
        }
    </script></body>
    </html>`

  fs.writeFileSync('./dest/examples.html', html)
}