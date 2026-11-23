import { expect, test } from 'claude-code/testing'

import { CAP, INJECT, MAX_CHARS, addNote, promptText } from './notes'

test('notes are capped, empty text is dropped', () => {
  let notes: { at: number; text: string }[] = []
  for (let i = 0; i < CAP + 5; i++) notes = addNote(notes, `note ${i}`, i)
  expect(notes.length).toBe(CAP)
  expect(notes[0]!.text).toBe('note 5')
  expect(addNote(notes, '   ', 0).length).toBe(CAP)
})

test('the prompt gets the newest few, newest first, within the character cap', () => {
  const notes = Array.from({ length: 10 }, (_, i) => ({ at: i, text: `n${i}` }))
  const lines = promptText(notes).split('\n')
  expect(lines.length).toBe(INJECT)
  expect(lines[0]).toBe('- n9')
  const long = [{ at: 0, text: 'x'.repeat(MAX_CHARS) }, { at: 1, text: 'y' }]
  expect(promptText(long)).toBe('- y')
  expect(promptText([])).toBe('')
})
