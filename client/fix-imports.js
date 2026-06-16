// Run: node fix-imports.js

const fs = require('fs');
const path = require('path');

const filesToFix = [
  'src/pages/Contact.jsx',
  'src/pages/About.jsx',
  'src/pages/Home.jsx',
  'src/pages/Login.jsx',
  'src/pages/Signup.jsx',
  'src/pages/VerifyOTP.jsx',
  'src/pages/Dashboard.jsx',
  'src/pages/Registration.jsx',
  'src/pages/NotFound.jsx',
];

filesToFix.forEach((file) => {
  try {
    let content = fs.readFileSync(file, 'utf8');
    
    // Fix common wrong imports
    content = content.replace(/from ['"]\.\.\/common\//g, 'from "../components/common/');
    content = content.replace(/from ['"]\.\.\/layout\//g, 'from "../components/layout/');
    content = content.replace(/from ['"]\.\.\/sections\//g, 'from "../components/sections/');
    
    fs.writeFileSync(file, content, 'utf8');
    console.log(`✓ Fixed: ${file}`);
  } catch (error) {
    console.log(`✗ Not found: ${file}`);
  }
});

console.log('\n✓ Import paths fixed!');