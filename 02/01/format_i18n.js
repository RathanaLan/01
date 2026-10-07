const fs = require('fs');

// Read dnkh-i18n.js JSON object
const raw = fs.readFileSync('dnkh-i18n.js', 'utf8');
const dataStr = raw.replace(/^window\.DNKH_I18N\s*=\s*/, '').replace(/;\s*$/, '');
const parsed = JSON.parse(dataStr);

let output = 'window.DNKH_I18N = {\n';
for (const lang of ['en', 'km', 'ja', 'zh']) {
  output += `  ${lang}: {\n`;
  const dict = parsed[lang] || {};
  const keys = Object.keys(dict);
  keys.forEach((k, idx) => {
    const isLast = idx === keys.length - 1;
    output += `    ${k}: ${JSON.stringify(dict[k])}${isLast ? '' : ','}\n`;
  });
  output += lang === 'zh' ? '  }\n' : '  },\n\n';
}
output += '};\n';

fs.writeFileSync('dnkh-i18n.js', output, 'utf8');
console.log('Successfully formatted dnkh-i18n.js with unquoted language keys!');
