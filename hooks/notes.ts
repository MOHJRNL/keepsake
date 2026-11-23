export type Note = { at: number; text: string }

/** Notes kept across sessions. */
export const CAP = 30
/** Newest notes the model sees each request. */
export const INJECT = 5
/** Most text the model sees from notes, in characters. */
export const MAX_CHARS = 800

/** Appends a note, dropping the oldest once past CAP. Empty text is not kept. */
export function addNote(notes: Note[], text: string, at: number): Note[] {
  const clean = text.trim().slice(0, 300)
  if (clean === '') return notes
  return [...notes, { at, text: clean }].slice(-CAP)
}

/** The newest notes, newest first, within MAX_CHARS. Empty when there are none. */
export function promptText(notes: Note[]): string {
  const lines: string[] = []
  let size = 0
  for (const n of notes.slice(-INJECT).reverse()) {
    const line = `- ${n.text}`
    if (size + line.length > MAX_CHARS) break
    lines.push(line)
    size += line.length + 1
  }
  return lines.join('\n')
}
