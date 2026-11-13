const fs = require('fs');
const path = require('path');

const dist = path.resolve(__dirname, '..', 'dist');
fs.readdirSync(dist).forEach(dir => {
  const cssPath = path.join(dist, dir, 'styles.css');
  if (fs.existsSync(cssPath)) {
    let css = fs.readFileSync(cssPath, 'utf8');
    css = css.replace(/background:\s*#e9e7e5;/g, 'background: #e7e5e6;');
    fs.writeFileSync(cssPath, css);
  }
  const htmlPath = path.join(dist, dir, 'index.html');
  if (fs.existsSync(htmlPath)) {
    let html = fs.readFileSync(htmlPath, 'utf8');
    html = html.replace(/class="hero-visual image-frame"/g, 'class="hero-visual"');
    fs.writeFileSync(htmlPath, html);
  }
});

console.log('Successfully updated dist files for seamless hero background');
