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

      // Only match files that actually use Sidebar and ml-72 layout
      if (content.includes('import Sidebar from') && content.includes('className="app-container')) {
        console.log(`Fixing ${fullPath}`);

        // 1. Replace Sidebar import with Layout import
        content = content.replace(
          /import Sidebar from '([^']+)Sidebar';/,
          "import Layout from '$1Layout';"
        );

        // 2. Fix the wrapper start
        content = content.replace(
          /<div className="app-container flex min-h-screen bg-slate-50">\s*<Sidebar activePage="[^"]*" \/>\s*<main className="main-content flex-1 ml-72 p-8(?: flex flex-col)?">/,
          '<Layout>\n      <div className="p-4 lg:p-8 flex flex-col h-full">'
        );
        // Sometimes without flex flex-col
        content = content.replace(
          /<div className="app-container flex min-h-screen bg-slate-50">\s*<Sidebar activePage="[^"]*" \/>\s*<main className="main-content flex-1 ml-72 p-8">/,
          '<Layout>\n      <div className="p-4 lg:p-8 flex flex-col h-full">'
        );
        // AdminProfilPage uses different classes
        content = content.replace(
          /<div className="flex min-h-screen bg-slate-50">\s*<Sidebar activePage="[^"]*" \/>\s*<main className="flex-1 ml-72 p-8">/,
          '<Layout>\n      <div className="p-4 lg:p-8 flex flex-col h-full">'
        );

        // 3. Fix the wrapper end
        content = content.replace(
          /<\/main>\s*<\/div>\s*\);\s*};\s*(?:const|export)/,
          '      </div>\n    </Layout>\n  );\n};\n\n$&'
        );

        // A safer end replacement: replace exactly `</main>\n    </div>` before `);`
        const endRegex1 = /<\/main>\s*<\/div>\s*\)\;/g;
        if (endRegex1.test(content)) {
            content = content.replace(endRegex1, '      </div>\n    </Layout>\n  );');
        }

        fs.writeFileSync(fullPath, content);
      }
    }
  }
}

traverse(dir);
console.log('Layout migration script finished.');
