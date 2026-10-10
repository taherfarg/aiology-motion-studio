# AIOLOGY workspace

The production project is aiology-motion-studio/. Read its AGENTS.md and use its canonical skill at aiology-motion-studio/.agents/skills/aiology-motion-studio/SKILL.md for relevant production requests.

## CodeGraph

Prefer configured CodeGraph tools for structural questions: context for task context, explore for grouped source, search for named definitions, callers/callees for call edges, impact for changes, node for a specific signature, files for indexed paths, status for index health. Trust AST results; do not repeat them with grep or delegate architecture exploration. Use rg for literal text or an already identified file. Allow the file watcher about 500 ms after writes.

If .codegraph is absent or the server reports not initialized, ask whether to run codegraph init -i. Tools may require a Codex reload after configuration; CLI availability is not proof of MCP availability.
