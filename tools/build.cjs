const { mkdirSync, copyFileSync, writeFileSync } = require("node:fs");
mkdirSync("dist", { recursive: true });
for (const file of ["index.html", "styles.css", "script.js"])
  copyFileSync(file, `dist/${file}`);
writeFileSync("dist/.nojekyll", "");
