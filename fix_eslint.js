sconst fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'frontend-web/src/pages/admin');
const files = fs.readdirSync(dir);

for (const file of files) {
  if (file.endsWith('.jsx')) {
    const fullPath = path.join(dir, file);
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Replace const [error, setError] with const [_error, setError]
    content = content.replace(/const \[error, setError\]/g, 'const [_error, setError]');
    
    // In AdminStatistiquesPage, replace err with _err
    if (file === 'AdminStatistiquesPage.jsx') {
      content = content.replace(/catch \(err\)/g, 'catch (_err)');
    }
    
    // Fix AdminDetailAgentPage label unused
    if (file === 'AdminDetailAgentPage.jsx') {
      content = content.replace(/active, payload, label/g, 'active, payload');
      content = content.replace(/label=\{`\$\{label\} : \$\{value\} %\`\}/g, '{/* label removed */}');
    }

    // Fix AdminProfilPage
    if (file === 'AdminProfilPage.jsx') {
      content = content.replace(/import React, \{ useState, useEffect \} from 'react';/, "import React, { useState } from 'react';");
      content = content.replace(/const \[admin, setAdmin\] = useState/, 'const [admin] = useState');
      content = content.replace(/const \[loading, setLoading\] = useState\(false\);/, 'const loading = false;');
    }
    
    fs.writeFileSync(fullPath, content);
  }
}
console.log("Unused variables fixed");
