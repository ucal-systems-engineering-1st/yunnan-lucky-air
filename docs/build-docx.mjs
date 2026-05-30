/**
 * build-docx.mjs
 * Converts exposicion-ee1.md → exposicion-ee1.docx
 * Renders Mermaid blocks as PNG images before passing to pandoc.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { execSync } from 'child_process';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dir = dirname(fileURLToPath(import.meta.url));
const srcFile = join(__dir, 'exposicion-ee1.md');
const outFile = join(__dir, 'exposicion-ee1.docx');
const imgDir  = join(__dir, '_mermaid_imgs');

mkdirSync(imgDir, { recursive: true });

let markdown = readFileSync(srcFile, 'utf8');

// Extract and replace each ```mermaid block
let idx = 0;
const mermaidRegex = /```mermaid\n([\s\S]*?)```/g;
const imgPaths = [];

let processed = markdown.replace(mermaidRegex, (_, diagram) => {
  const mmdFile = join(imgDir, `diagram-${idx}.mmd`);
  const pngFile = join(imgDir, `diagram-${idx}.png`);

  writeFileSync(mmdFile, diagram.trim());

  console.log(`Rendering diagram ${idx}...`);
  try {
    execSync(
      `npx --yes @mermaid-js/mermaid-cli mmdc -i "${mmdFile}" -o "${pngFile}" -b white --quiet`,
      { stdio: 'pipe', timeout: 60000 }
    );
  } catch (e) {
    console.error(`  Warning: diagram ${idx} failed to render — skipping.\n`, e.stderr?.toString());
    idx++;
    return `*(diagrama ${idx - 1})*`;
  }

  imgPaths.push(pngFile);
  const rel = `_mermaid_imgs/diagram-${idx}.png`;
  idx++;
  return `\n![Diagrama ${idx}](${rel})\n`;
});

const tmpMd = join(__dir, '_tmp_exposicion.md');
writeFileSync(tmpMd, processed, 'utf8');

console.log('Running pandoc...');
const pandoc = 'C:\\Program Files\\Pandoc\\pandoc.exe';
execSync(
  `"${pandoc}" "${tmpMd}" -o "${outFile}" --from markdown --to docx`,
  { cwd: __dir, stdio: 'inherit' }
);

// Cleanup temp file
execSync(`del /f "${tmpMd}"`, { shell: 'cmd.exe' });

console.log(`\nDone → ${outFile}`);
