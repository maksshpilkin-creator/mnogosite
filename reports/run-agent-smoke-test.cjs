const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const root = path.resolve(__dirname, '..');
const suffix = process.argv[2] || '';
if (!/^(|-[a-z0-9]+)$/.test(suffix)) throw new Error('Invalid report suffix');
const promptFile = process.argv[3] || 'agent-smoke-test-prompt.txt';
if (!/^[a-z0-9-]+\.txt$/.test(promptFile)) throw new Error('Invalid prompt file');
const output = fs.createWriteStream(path.join(__dirname, 'agent-smoke-test' + suffix + '-events.jsonl'));
const errors = fs.createWriteStream(path.join(__dirname, 'agent-smoke-test' + suffix + '-stderr.log'));
const args = [
  'exec', '--ephemeral', '--skip-git-repo-check', '--json', '--color', 'never',
  '-m', 'gpt-6-luna', '-c', 'model_reasoning_effort="low"',
  '-s', 'read-only', '-C', root,
  '-o', path.join(__dirname, 'agent-smoke-test' + suffix + '-result.md'), '-'
];
const child = spawn('codex', args, { cwd: root, stdio: ['pipe', 'pipe', 'pipe'] });
let buffer = '', stderr = '', failed = false;
const timer = setTimeout(() => {
  failed = true;
  console.log('Smoke test exceeded 6 minutes; stopping controller.');
  child.kill();
}, 360000);
child.stdout.on('data', data => {
  output.write(data);
  buffer += data;
  let newline;
  while ((newline = buffer.indexOf('\n')) >= 0) {
    const line = buffer.slice(0, newline);
    buffer = buffer.slice(newline + 1);
    let event;
    try { event = JSON.parse(line); } catch { continue; }
    const item = event.item;
    if (event.type === 'thread.started') console.log(JSON.stringify({ event: event.type }));
    if (item?.type?.includes('collab')) {
      console.log(JSON.stringify({ event: event.type, tool: item.tool, status: item.status, receivers: item.receiver_thread_ids }));
    }
    if (event.type === 'turn.completed') console.log(JSON.stringify({ event: event.type, usage: event.usage }));
    if (event.type === 'error' || event.type === 'turn.failed') console.log(JSON.stringify(event));
  }
});
child.stderr.on('data', data => { errors.write(data); stderr += data; });
child.on('error', error => { failed = true; console.log(JSON.stringify({ error: error.message })); });
child.on('close', code => {
  clearTimeout(timer);
  output.end();
  errors.end();
  console.log(JSON.stringify({ exitCode: code, failed, stderrTail: stderr.slice(-1200) }));
  process.exitCode = code || (failed ? 1 : 0);
});
child.stdin.end(fs.readFileSync(path.join(__dirname, promptFile), 'utf8'));
