# Test proof

A fresh clone of `MOHJRNL/keepsake` at commit `f1c24a5`, run on 2026-11-23 with Claude Code. The test run below is the proof.

```
$ claude plugin test ./
```

```
hooks/commands.test.ts:
(pass) /remember keeps a note and /recall lists it [90.53ms]
(pass) /remember with no text shows the usage line [46.58ms]
hooks/notes.test.ts:
(pass) notes are capped, empty text is dropped [8.92ms]
(pass) the prompt gets the newest few, newest first, within the character cap [2.67ms]
 4 pass
 0 fail
Ran 4 tests across 2 files. [0.56s]
```
