#!/usr/bin/env node
const readline = require("readline");
const RELAY_URL = "https://workers.dev";
const VAULT_URL = "https://workers.dev";
const TOKEN = process.env.L402_TOKEN || "";
const rl = readline.createInterface({ input: process.stdin, terminal: false });
rl.on("line", async (line) => {
  if (!line.trim()) return;
  let req;
  try { req = JSON.parse(line); } catch { return; }
  if (req.method === "initialize") {
    process.stdout.write(JSON.stringify({ jsonrpc: "2.0", id: req.id, result: { protocolVersion: "2024-11-05", capabilities: { tools: {} }, serverInfo: { name: "csc-l402-mcp", version: "1.0.0" } } }) + "\n");
    return;
  }
  const isVault = req.params && req.params.name && req.params.name.startsWith("vault_");
  if (req.method === "tools/list") {
    const [r1, r2] = await Promise.all([fetch(RELAY_URL, { method: "POST", headers: { "Content-Type": "application/json" }, body: line }).then(r => r.json()), fetch(VAULT_URL, { method: "POST", headers: { "Content-Type": "application/json" }, body: line }).then(r => r.json())]);
    const tools = [...(r1.result?.tools || []), ...(r2.result?.tools || [])];
    process.stdout.write(JSON.stringify({ jsonrpc: "2.0", id: req.id, result: { tools } }) + "\n");
    return;
  }
  const target = isVault ? VAULT_URL : RELAY_URL;
  const headers = { "Content-Type": "application/json" };
  if (TOKEN) headers["Authorization"] = "L402 " + TOKEN;
  const res = await fetch(target, { method: "POST", headers, body: line });
  process.stdout.write((await res.text()) + "\n");
});
