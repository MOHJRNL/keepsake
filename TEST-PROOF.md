# Test proof

A fresh clone of `MOHJRNL/keepsake` at commit `6f926c6`, run on 2026-11-23 with Claude Code. The test run below is the proof.

```
$ claude plugin test ./
```

```
hooks/commands.test.ts:
(pass) /remember keeps a note and /recall lists it [27.93ms]
(pass) /remember with no text shows the usage line [13.88ms]
hooks/notes.test.ts:
(pass) notes are capped, empty text is dropped [1.68ms]
(pass) the prompt gets the newest few, newest first, within the character cap [0.50ms]
 4 pass
 0 fail
Ran 4 tests across 2 files. [0.22s]
```
