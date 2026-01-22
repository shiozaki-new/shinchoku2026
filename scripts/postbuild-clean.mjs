// Remove framework-generated leftovers so dist/ is human-maintainable HTML/CSS/IMG only
import { rmSync, existsSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { resolve } from 'node:path';

const dist = resolve(process.cwd(), 'dist');
const astroDir = resolve(dist, '_astro');

try {
  if (existsSync(astroDir)) {
    rmSync(astroDir, { recursive: true, force: true });
    console.log('[postbuild] Removed dist/_astro (not needed for static HTML).');
  } else {
    console.log('[postbuild] dist/_astro not found; nothing to remove.');
  }
  // Remove macOS metadata files if any
  try {
    execSync("find dist -name '.DS_Store' -delete", { stdio: 'ignore' });
  } catch {}
} catch (err) {
  console.error('[postbuild] Cleanup failed:', err);
  process.exitCode = 1;
}
