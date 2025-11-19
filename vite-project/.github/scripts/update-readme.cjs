const fs = require("fs");
const path = require("path");

const manifestPath = path.join(__dirname, "../../lhci-results/manifest.json");
const readmePath = path.join(__dirname, "../../README.md");

const badgeColors = (score) => {
  if (score >= 90) return "brightgreen";
  if (score >= 80) return "green";
  if (score >= 65) return "yellow";
  if (score >= 50) return "orange";
  return "red";
};

const updateReadme = () => {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  const scores = manifest[0].summary;

  const badgeBlock = `
## 🚀 Lighthouse Audit

![Performance](https://img.shields.io/badge/Performance-${scores.performance}-${badgeColors(scores.performance)})
![Accessibility](https://img.shields.io/badge/Accessibility-${scores.accessibility}-${badgeColors(scores.accessibility)})
![Best Practices](https://img.shields.io/badge/Best%20Practices-${scores["best-practices"]}-${badgeColors(scores["best-practices"])})
![SEO](https://img.shields.io/badge/SEO-${scores.seo}-${badgeColors(scores.seo)})

> Scores generated from [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci) on [dashing-liger-e55ab0.netlify.app](https://dashing-liger-e55ab0.netlify.app)
`;

  const readme = fs.readFileSync(readmePath, "utf8");
  const updated = readme.replace(
    /## 🚀 Lighthouse Audit[\s\S]*?> Scores generated.*?\n/,
    badgeBlock + "\n"
  );

  fs.writeFileSync(readmePath, updated);
  console.log("✅ README.md updated with latest Lighthouse scores.");
};

updateReadme();