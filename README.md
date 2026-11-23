# Keepsake: small persistent notes for Claude Code

![Claude Code plugin](https://img.shields.io/badge/Claude%20Code-plugin-D97757)
![License: PolyForm Noncommercial](https://img.shields.io/badge/license-PolyForm%20Noncommercial%201.0.0-blue)
![Version](https://img.shields.io/badge/version-0.1.0-informational)

> **In short:** Keepsake lets you save short notes with `/remember` and list them with `/recall`. Notes persist across Claude Code sessions. The newest five (at most 800 characters) are added to the system prompt, so Claude remembers them. It's a small, local note store, not a semantic memory database.

**Keywords:** Claude Code memory plugin, persistent notes, remember across sessions, claude-mem alternative, lightweight memory, Claude Code slash command, project memory, Claude Code cost.

---

## Features

- **`/remember <note>`** saves a note (up to 300 characters). Keeps the latest 30; older ones drop off.
- **`/recall`** lists the latest 10 notes.
- **Context:** the newest 5 notes are added to the system prompt, at most 800 characters, newest first. Nothing is added when there are no notes.
- **Local and cheap:** notes are stored by the plugin host. No network calls, no background work, no per-tool hooks.

## Install

### Claude Code (recommended)

```text
/plugin install keepsake --marketplace MOHJRNL/keepsake
```

Or from a shell:

```bash
claude plugin install keepsake --marketplace MOHJRNL/keepsake
```

Desktop app: **+** next to the prompt box, then **Plugins**, **Add marketplace** with `MOHJRNL/keepsake`, then **Add plugin**.

### Codex, Gemini CLI, OpenCode, Grok

Not supported as a plugin. The notes live in Claude Code's plugin store, and the `/remember` and `/recall` commands are Claude Code commands. For a similar effect in other tools, keep a notes file in the project (for example `NOTES.md`) and point your tool's instruction file at it: `AGENTS.md` for Codex and OpenCode, `GEMINI.md` for Gemini CLI.

## Usage

```text
/remember The staging database is read-only on weekends.
/recall
```

## FAQ

**Is it semantic search?** No. It injects the newest notes and lists them. It doesn't search by meaning.

**Can I import my claude-mem memories?** Not automatically. Keepsake doesn't read claude-mem's store.

**Where are notes stored?** In the plugin's store within Claude Code, shared across sessions on the same machine.

**Is there a limit?** Yes: 30 notes kept, 300 characters per note, 5 injected, 800 characters injected in total. These are constants in `hooks/notes.ts`.

## Development

```bash
claude plugin validate ./
claude plugin test ./
```

## License and commercial use

Free to use, copy and modify for non-commercial purposes, under the PolyForm Noncommercial License 1.0.0 (see `LICENSE`). For commercial use, contact the author for a separate license.
