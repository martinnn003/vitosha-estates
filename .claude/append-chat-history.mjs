// Stop hook: appends new user prompts and assistant responses from the
// session transcript (JSONL) to chat-history.md in the project root.
// Keeps a per-transcript line offset in .claude/chat-history-state.json
// so each exchange is appended exactly once.
import { readFileSync, writeFileSync, appendFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

let hook = {};
try { hook = JSON.parse(readFileSync(0, 'utf8')); } catch { process.exit(0); }

const transcriptPath = hook.transcript_path;
if (!transcriptPath || !existsSync(transcriptPath)) process.exit(0);

const projectRoot = dirname(fileURLToPath(import.meta.url)).replace(/[\\/]\.claude$/, '');
const historyFile = join(projectRoot, 'chat-history.md');
const stateFile = join(projectRoot, '.claude', 'chat-history-state.json');

let state = {};
try { state = JSON.parse(readFileSync(stateFile, 'utf8')); } catch { /* first run */ }

const lines = readFileSync(transcriptPath, 'utf8').split('\n').filter(Boolean);
const start = state[transcriptPath] || 0;

const stripTags = (t) => t
  .replace(/<system-reminder>[\s\S]*?<\/system-reminder>/g, '')
  .replace(/<ide_selection>[\s\S]*?<\/ide_selection>/g, '')
  .replace(/<ide_opened_file>[\s\S]*?<\/ide_opened_file>/g, '')
  .replace(/<ide_diagnostics>[\s\S]*?<\/ide_diagnostics>/g, '')
  .trim();

let out = '';
let lastRole = null;

for (let i = start; i < lines.length; i++) {
  let e;
  try { e = JSON.parse(lines[i]); } catch { continue; }
  if (e.isMeta) continue;
  if (e.type !== 'user' && e.type !== 'assistant') continue;
  const msg = e.message;
  if (!msg) continue;

  const texts = [];
  if (typeof msg.content === 'string') {
    texts.push(msg.content);
  } else if (Array.isArray(msg.content)) {
    for (const c of msg.content) {
      if (c && c.type === 'text' && typeof c.text === 'string') texts.push(c.text);
    }
  }
  const text = stripTags(texts.join('\n\n'));
  if (!text) continue;
  // Skip slash-command echoes, local command output, and caveat notices
  if (e.type === 'user' && /^(<command-|<local-command|Caveat:)/.test(text)) continue;

  if (e.type === 'user') {
    const ts = e.timestamp
      ? new Date(e.timestamp).toLocaleString('bg-BG', { dateStyle: 'short', timeStyle: 'short' })
      : '';
    out += `\n---\n\n## 👤 Потребител${ts ? ` — ${ts}` : ''}\n\n${text}\n`;
    lastRole = 'user';
  } else {
    out += lastRole === 'assistant' ? `\n${text}\n` : `\n## 🤖 Claude\n\n${text}\n`;
    lastRole = 'assistant';
  }
}

state[transcriptPath] = lines.length;
writeFileSync(stateFile, JSON.stringify(state, null, 2));

if (out) {
  if (!existsSync(historyFile)) {
    writeFileSync(historyFile, '# История на чата — Vitosha Estates\n');
  }
  appendFileSync(historyFile, out);
}
