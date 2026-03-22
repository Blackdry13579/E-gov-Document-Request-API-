const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'frontend-web/src/pages');

function traverse(currentDir) {
  const files = fs.readdirSync(currentDir);
  for (const file of files) {
    const fullPath = path.join(currentDir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      traverse(fullPath);
    } else if (fullPath.endsWith('Page.jsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');

      // Remove duplicate endings more robustly
      const dupRegex = /<\/Layout>\s*\);\s*};\s*<\/div>\s*<\/Layout>\s*\);\s*};?/g;
      if (dupRegex.test(content)) {
        console.log('Fixing duplicate ending 1 in ' + fullPath);
        content = content.replace(dupRegex, '</Layout>\n  );\n};\n');
        fs.writeFileSync(fullPath, content);
      }
      
      const dupRegex2 = /<\/div>\s*<\/Layout>\s*\);\s*};\s*<\/div>\s*<\/Layout>\s*\);\s*};?/g;
      if (dupRegex2.test(content)) {
        console.log('Fixing duplicate ending 2 in ' + fullPath);
        content = content.replace(dupRegex2, '</div>\n    </Layout>\n  );\n};\n');
        fs.writeFileSync(fullPath, content);
      }

      // Fix PieChart as PieChartIcon
      if (content.includes('PieChart as PieChartIcon')) {
        content = content.replace(/PieChart as PieChartIcon/g, 'PieChart');
        fs.writeFileSync(fullPath, content);
      }
    }
  }
}

traverse(dir);
console.log('Duplicate cleaner finished.');
