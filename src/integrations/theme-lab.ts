/** Adds the dev-only save endpoint for the Theme lab. It registers nothing in `astro build` or `astro preview`. */
import type { AstroIntegration } from 'astro';
import { fileURLToPath } from 'node:url';
import { handleSave, MAX_BODY, SAVE_PATH } from '../theme/lab-server';

export default function themeLab(): AstroIntegration {
  let dev = false;
  const presetsDir = fileURLToPath(new URL('../theme/presets/', import.meta.url));
  return {
    name: 'theme-lab',
    hooks: {
      'astro:config:setup': ({ command }) => {
        dev = command === 'dev';
      },
      'astro:server:setup': ({ server }) => {
        if (!dev) return;
        server.middlewares.use(SAVE_PATH, (req, res) => {
          let body = '';
          let tooBig = false;
          req.setEncoding('utf8');
          req.on('data', (chunk: string) => {
            body += chunk;
            if (body.length > MAX_BODY) {
              tooBig = true;
              req.destroy();
            }
          });
          req.on('end', () => {
            if (tooBig) return;
            let out;
            try {
              out = handleSave({ method: req.method ?? '', headers: req.headers, remoteAddress: req.socket.remoteAddress, body }, presetsDir);
            } catch (error) {
              out = { status: 500, json: { ok: false, error: error instanceof Error ? error.message : 'Could not save the preset.' } };
            }
            res.statusCode = out.status;
            res.setHeader('content-type', 'application/json');
            res.setHeader('cache-control', 'no-store');
            res.end(JSON.stringify(out.json));
          });
        });
      },
    },
  };
}
