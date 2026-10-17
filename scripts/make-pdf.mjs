// Generates the downloadable portfolio PDFs from the built site (dist/):
//   downloads/portfolio-{en|fa}-{desktop|mobile}.pdf
// Run after `npm run build`:  npm run pdf
// Env: ASTRO_BASE (e.g. /portfolio) must match the build; CHROMIUM_PATH optionally overrides the browser binary.
import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFile, mkdir, stat } from 'node:fs/promises';
import { extname, join, normalize, resolve } from 'node:path';

const dist = resolve('dist');
const base = (process.env.ASTRO_BASE || '').replace(/\/$/, '');
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.woff2': 'font/woff2', '.woff': 'font/woff', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.json': 'application/json', '.pdf': 'application/pdf' };

const server = createServer(async (req, res) => {
  try {
    let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    if (base && p.startsWith(base)) p = p.slice(base.length) || '/';
    if (p.endsWith('/')) p += 'index.html';
    const file = normalize(join(dist, p));
    if (!file.startsWith(dist)) throw new Error('forbidden');
    if ((await stat(file)).isDirectory()) throw new Error('dir');
    res.writeHead(200, { 'content-type': types[extname(file)] || 'application/octet-stream' });
    res.end(await readFile(file));
  } catch {
    res.writeHead(404).end('not found');
  }
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const origin = `http://127.0.0.1:${server.address().port}`;

const out = join(dist, 'downloads');
await mkdir(out, { recursive: true });
const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});

// Page sizes: desktop = wide landscape pages, mobile = phone-sized pages that read without zooming.
const modes = {
  desktop: { width: '1280px', height: '905px' },
  mobile: { width: '390px', height: '844px' },
};
for (const lang of ['en', 'fa']) {
  for (const [mode, size] of Object.entries(modes)) {
    const page = await browser.newPage({ viewport: { width: parseInt(size.width), height: 900 } });
    await page.goto(`${origin}${base}/${lang === 'fa' ? 'fa/' : ''}?pdf=${mode}`, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(400);
    const file = join(out, `portfolio-${lang}-${mode}.pdf`);
    await page.pdf({ path: file, ...size, printBackground: true, margin: { top: '20px', bottom: '20px', left: '0', right: '0' } });
    console.log('wrote', file);
    await page.close();
  }
}
await browser.close();
server.close();
