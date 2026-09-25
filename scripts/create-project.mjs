#!/usr/bin/env node
/**
 * Creates a new project from this starter kit.
 *
 *   node scripts/create-project.mjs "Vendor Portal"
 *   node scripts/create-project.mjs "Vendor Portal" --server-port 5010 --client-port 5182 --dir ../Vendor-Portal
 *   node scripts/create-project.mjs "Vendor Portal" --mongo-uri "mongodb+srv://user:pass@cluster.mongodb.net/"
 *   node scripts/create-project.mjs "Vendor Portal" --theme lagoon
 *
 * Copies the kit (without node_modules/.git/.env/dist/uploads), replaces the placeholder
 * name/slug/db/ports everywhere, sets the default theme, and writes ready-to-use .env files.
 * Without --theme you are asked to pick one (the kit default if not running in a terminal).
 * Themes are read from client/src/constants/themeColors.js, so new themes show up here automatically.
 */
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';

const KIT_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// Placeholder tokens used throughout the kit. Keep these unique so replacement is safe.
const TOKENS = {
  title: 'FullStack Starter Kit',
  slug: 'fullstack-starter-kit',
  snake: 'fullstack_starter_kit',
  serverPort: '5099',
  clientPort: '5199',
  dockerPort: '8099',
};

const THEME_FILES = [
  path.join('client', 'src', 'constants', 'themeColors.js'),
  path.join('server', 'src', 'constants', 'themeColors.js'),
];

const SKIP_DIRS = new Set(['node_modules', '.git', 'dist', 'uploads', 'coverage']);
const SKIP_FILES = new Set(['.env', '.env.local']);
const NO_REPLACE_FILES = new Set(['pnpm-lock.yaml']);
const BINARY_EXT = new Set(['.png', '.jpg', '.jpeg', '.gif', '.ico', '.webp', '.woff', '.woff2', '.pdf']);

const fail = (message) => {
  console.error(`\n  Error: ${message}\n`);
  console.error('  Usage: node scripts/create-project.mjs "Project Name" [--server-port N] [--client-port N] [--dir PATH] [--mongo-uri URI] [--theme KEY]\n');
  process.exit(1);
};

const parseArgs = (argv) => {
  const args = { name: null, serverPort: null, clientPort: null, dir: null, mongoUri: null, theme: null };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    const next = () => {
      const value = argv[(i += 1)];
      if (!value) fail(`${arg} needs a value`);
      return value;
    };
    if (arg === '--server-port') args.serverPort = Number(next());
    else if (arg === '--client-port') args.clientPort = Number(next());
    else if (arg === '--dir') args.dir = next();
    else if (arg === '--mongo-uri') args.mongoUri = next();
    else if (arg === '--theme') args.theme = next().toLowerCase();
    else if (arg.startsWith('--')) fail(`Unknown option ${arg}`);
    else if (!args.name) args.name = arg;
    else fail(`Unexpected argument "${arg}" (wrap multi-word names in quotes)`);
  }
  return args;
};

const words = (name) => name.trim().split(/[^A-Za-z0-9]+/).filter(Boolean);

const readPort = (file, pattern) => {
  try {
    const match = fs.readFileSync(file, 'utf8').match(pattern);
    return match ? Number(match[1]) : null;
  } catch {
    return null;
  }
};

// Next free port pair, based on the ports used by sibling projects in the parent folder.
const suggestPorts = (targetDir) => {
  const parent = path.dirname(KIT_ROOT);
  const serverPorts = [5000];
  const clientPorts = [5172];
  for (const entry of fs.readdirSync(parent, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const dir = path.join(parent, entry.name);
    if (dir === KIT_ROOT || dir === targetDir) continue;
    const serverPort = readPort(path.join(dir, 'server', '.env.example'), /^PORT=(\d+)/m);
    const clientPort = readPort(path.join(dir, 'client', 'vite.config.js'), /port:\s*(\d+)/);
    if (serverPort) serverPorts.push(serverPort);
    if (clientPort) clientPorts.push(clientPort);
  }
  return { serverPort: Math.max(...serverPorts) + 1, clientPort: Math.max(...clientPorts) + 1 };
};

const loadThemes = async () => {
  const { THEME_PALETTES, DEFAULT_THEME_COLOR } = await import(
    pathToFileURL(path.join(KIT_ROOT, THEME_FILES[0])).href
  );
  return { palettes: THEME_PALETTES, keys: Object.keys(THEME_PALETTES), fallback: DEFAULT_THEME_COLOR };
};

const promptTheme = async ({ palettes, keys, fallback }) => {
  if (!process.stdin.isTTY) return fallback;
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  try {
    console.log('\n  Choose a theme:');
    keys.forEach((key, i) =>
      console.log(`    ${i + 1}) ${palettes[key].label.padEnd(16)} ${key.padEnd(16)} ${palettes[key].description}`),
    );
    for (;;) {
      const answer = (await rl.question(`  Theme [${fallback}]: `)).trim().toLowerCase();
      if (!answer) return fallback;
      const byNumber = keys[Number(answer) - 1];
      if (byNumber) return byNumber;
      if (keys.includes(answer)) return answer;
      console.log(`  Please enter 1-${keys.length} or one of: ${keys.join(', ')}`);
    }
  } finally {
    rl.close();
  }
};

const setDefaultTheme = (targetDir, theme) => {
  for (const relative of THEME_FILES) {
    const file = path.join(targetDir, relative);
    const original = fs.readFileSync(file, 'utf8');
    const updated = original.replace(
      /export const DEFAULT_THEME_COLOR = '[a-z0-9-]+';/,
      `export const DEFAULT_THEME_COLOR = '${theme}';`,
    );
    if (updated === original && !original.includes(`DEFAULT_THEME_COLOR = '${theme}'`)) {
      fail(`Could not set the default theme in ${relative}`);
    }
    fs.writeFileSync(file, updated);
  }
};

const copyDir = (src, dest, visit) => {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    if (entry.isDirectory() && SKIP_DIRS.has(entry.name)) continue;
    if (entry.isFile() && SKIP_FILES.has(entry.name)) continue;
    const from = path.join(src, entry.name);
    const to = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(from, to, visit);
    else {
      fs.copyFileSync(from, to);
      visit(to, entry.name);
    }
  }
};

const replaceAll = (text, replacements) =>
  replacements.reduce((acc, [from, to]) => acc.split(from).join(to), text);

const main = async () => {
  const args = parseArgs(process.argv.slice(2));
  if (!args.name) fail('Project name is required');

  const parts = words(args.name);
  if (!parts.length) fail('Project name must contain letters or numbers');

  const title = parts.join(' ');
  const slug = parts.join('-').toLowerCase();
  const snake = parts.join('_').toLowerCase();
  const folderName = parts.join('-');

  const targetDir = path.resolve(args.dir || path.join(path.dirname(KIT_ROOT), folderName));
  if (fs.existsSync(targetDir) && fs.readdirSync(targetDir).length) {
    fail(`Target folder already exists and is not empty: ${targetDir}`);
  }

  const themes = await loadThemes();
  if (args.theme && !themes.keys.includes(args.theme)) {
    fail(`Unknown theme "${args.theme}". Choose one of: ${themes.keys.join(', ')}`);
  }
  const theme = args.theme || (await promptTheme(themes));

  const suggested = suggestPorts(targetDir);
  const serverPort = args.serverPort || suggested.serverPort;
  const clientPort = args.clientPort || suggested.clientPort;
  const dockerPort = 8080 + Math.max(serverPort - 5000, 0);
  if (![serverPort, clientPort].every(Number.isInteger)) fail('Ports must be numbers');

  const replacements = [
    [TOKENS.title, title],
    [TOKENS.slug, slug],
    [TOKENS.snake, snake],
    [TOKENS.serverPort, String(serverPort)],
    [TOKENS.clientPort, String(clientPort)],
    [TOKENS.dockerPort, String(dockerPort)],
  ];

  copyDir(KIT_ROOT, targetDir, (file, name) => {
    if (NO_REPLACE_FILES.has(name) || BINARY_EXT.has(path.extname(name).toLowerCase())) return;
    const original = fs.readFileSync(file, 'utf8');
    const updated = replaceAll(original, replacements);
    if (updated !== original) fs.writeFileSync(file, updated);
  });

  setDefaultTheme(targetDir, theme);

  // The generator itself and kit-only docs don't belong in the new project.
  fs.rmSync(path.join(targetDir, 'scripts', 'create-project.mjs'), { force: true });
  const scriptsDir = path.join(targetDir, 'scripts');
  if (fs.existsSync(scriptsDir) && !fs.readdirSync(scriptsDir).length) fs.rmdirSync(scriptsDir);

  const pkgPath = path.join(targetDir, 'package.json');
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  delete pkg.scripts['create-project'];
  fs.writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`);

  const readmePath = path.join(targetDir, 'README.MD');
  const readme = fs.readFileSync(readmePath, 'utf8');
  fs.writeFileSync(
    readmePath,
    readme.replace(/<!-- starter-kit:start -->[\s\S]*?<!-- starter-kit:end -->\n*/g, ''),
  );

  const secret = () => crypto.randomBytes(48).toString('hex');
  let serverEnv = fs
    .readFileSync(path.join(targetDir, 'server', '.env.example'), 'utf8')
    .replace(/^JWT_SECRET=.*$/m, `JWT_SECRET=${secret()}`)
    .replace(/^JWT_REFRESH_SECRET=.*$/m, `JWT_REFRESH_SECRET=${secret()}`);
  if (args.mongoUri) {
    serverEnv = serverEnv.replace(/^MONGODB_URI=.*$/m, () => `MONGODB_URI=${args.mongoUri}`);
  }
  fs.writeFileSync(path.join(targetDir, 'server', '.env'), serverEnv);
  fs.copyFileSync(
    path.join(targetDir, 'client', '.env.example'),
    path.join(targetDir, 'client', '.env'),
  );

  const relative = path.relative(process.cwd(), targetDir) || '.';
  console.log(`
  Created "${title}" in ${targetDir}

    Server port : ${serverPort}  (API http://localhost:${serverPort}/api/v1/health)
    Client port : ${clientPort}  (http://localhost:${clientPort})
    Theme       : ${themes.palettes[theme].label} (${theme})
    Database    : ${snake}_db
    Storage keys: ${snake}_*

  Next steps:
    cd "${relative}"${
      args.mongoUri
        ? ''
        : `
    # REQUIRED: set MONGODB_URI in server/.env — the API won't start (and login fails) without it`
    }
    pnpm install
    pnpm dev

  Login: superadmin / super123 (created on first boot)
`);
};

main().catch((err) => fail(err.message));
