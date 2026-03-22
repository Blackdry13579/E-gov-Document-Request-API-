const fs = require('fs');
const path = require('path');

function convertHtmlToJsx(htmlContent, componentName) {
  // Extract body content and body classes
  const bodyMatch = htmlContent.match(/<body([^>]*)>([\s\S]*?)<\/body>/i);
  if (!bodyMatch) {
    console.error(`No body found in ${componentName}`);
    return null;
  }
  const bodyAttrs = bodyMatch[1];
  let bodyContent = bodyMatch[2];
  
  // Extract classes from body
  const classMatch = bodyAttrs.match(/class="([^"]+)"/);
  const bodyClasses = classMatch ? classMatch[1] : '';
  
  // Replace class with className
  bodyContent = bodyContent.replace(/class="/g, 'className="');
  // Force margin-left on main content if it has ml-64
  bodyContent = bodyContent.replace(/className="flex-1 ml-64"/g, 'className="flex-1 ml-64" style={{ marginLeft: \'16rem\' }}');
  // Fix for sidebar/main overlap/stacking in Admin pages (where breakpoints might fail)
  // We match the specific classes and keep the rest of the attribute
  bodyContent = bodyContent.replace(/className="flex flex-1 flex-col lg:flex-row/g, 'style={{ display: "flex", flexDirection: "row" }} className="flex flex-1 flex-row');
  bodyContent = bodyContent.replace(/className="w-full lg:w-64/g, 'style={{ width: "16rem" }} className="w-64');
  // Replace for with htmlFor
  bodyContent = bodyContent.replace(/for="/g, 'htmlFor="');
  
  // Self-closing tags
  bodyContent = bodyContent.replace(/<img([^>]*?)(?<!\/)>/g, '<img$1 />');
  bodyContent = bodyContent.replace(/<input([^>]*?)(?<!\/)>/g, '<input$1 />');
  bodyContent = bodyContent.replace(/<br([^>]*?)(?<!\/)>/g, '<br$1 />');
  bodyContent = bodyContent.replace(/<hr([^>]*?)(?<!\/)>/g, '<hr$1 />');

  // Replace HTML comments with JSX comments
  bodyContent = bodyContent.replace(/<!--([\s\S]*?)-->/g, '{/* $1 */}');

  // Convert style strings to objects
  bodyContent = bodyContent.replace(/style="([^"]+)"/g, (match, p1) => {
    const rules = p1.split(';').filter(r => r.trim());
    const reactStyles = rules.map(rule => {
      const parts = rule.split(':');
      if (parts.length < 2) return '';
      const key = parts[0].trim().replace(/-([a-z])/g, g => g[1].toUpperCase());
      const val = parts.slice(1).join(':').trim().replace(/'/g, "\\'");
      return `${key}: '${val}'`;
    }).filter(s => s);
    return `style={{ ${reactStyles.join(', ')} }}`;
  });

  return `import React from 'react';
import './${componentName}.css';

const ${componentName} = () => {
  return (
    <div className="${bodyClasses}" style={{ minHeight: '100vh' }}>
      ${bodyContent}
    </div>
  );
};

export default ${componentName};
`;
}

const adminDir = path.join(__dirname, 'admin');
const outputDir = path.join(__dirname, 'frontend-web/src/pages/admin');

const files = [
  { html: 'admin_gestion_des_demandes_globales.html', jsx: 'AdminDemandesPage.jsx' },
  { html: 'admin_statistiques_officiel.html', jsx: 'AdminStatistiquesPage.jsx' },
  { html: 'admin_tableau_de_bord_general.html', jsx: 'AdminDashboardPage.jsx' },
  { html: 'ajouter_un_nouveau_document_web_admin.html', jsx: 'AdminAjouterDocumentPage.jsx' },
  { html: 'ajouter_un_nouvel_agent_web_admin.html', jsx: 'AdminAjouterAgentPage.jsx' },
  { html: 'creer_un_nouveau_role.html', jsx: 'AdminAjouterRolePage.jsx' },
  { html: 'creer_un_nouveau_service.html', jsx: 'AdminAjouterServicePage.jsx' },
  { html: 'detail_document_admin_web.html', jsx: 'AdminDetailDocumentPage.jsx' },
  { html: 'detail_role_admin_web.html', jsx: 'AdminDetailRolePage.jsx' },
  { html: 'detail_service_admin_web.html', jsx: 'AdminDetailServicePage.jsx' },
  { html: 'gestion_des_ressources_agents_documents_unifiee.html', jsx: 'AdminRessourcesPage.jsx' },
  { html: 'gestion_du_systeme_services_roles_specifications_client.html', jsx: 'AdminSystemePage.jsx' },
  { html: 'logs_d_audit_style_officiel_admin.html', jsx: 'AdminLogsPage.jsx' },
  { html: 'profil_admin_style_officiel_admin.html', jsx: 'AdminProfilPage.jsx' },
  { html: 'super_admin_detail_profil_agent.html', jsx: 'AdminDetailAgentPage.jsx' }
];

files.forEach(file => {
  const inputFile = path.join(adminDir, file.html);
  const outputFile = path.join(outputDir, file.jsx);
  const cssOutputFile = outputFile.replace('.jsx', '.css');

  if (!fs.existsSync(inputFile)) {
    console.warn(`File not found: ${inputFile}`);
    return;
  }

  const htmlContent = fs.readFileSync(inputFile, 'utf8');

  // Extract CSS
  const styleMatch = htmlContent.match(/<style>([\s\S]*?)<\/style>/i);
  if (styleMatch) {
    fs.writeFileSync(cssOutputFile, styleMatch[1].trim());
  } else {
    fs.writeFileSync(cssOutputFile, '');
  }

  const componentName = file.jsx.replace('.jsx', '');
  const jsxResult = convertHtmlToJsx(htmlContent, componentName);
  if (jsxResult) {
    fs.writeFileSync(outputFile, jsxResult);
    console.log(`Generated ${file.jsx}`);
  }
});
