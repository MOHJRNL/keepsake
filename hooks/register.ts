import type { EngineInterface, Register } from 'claude-code'

import { addNote, promptText } from './notes'
import type { Note } from './notes'

const KEY = 'notes'

async function load($: EngineInterface): Promise<Note[]> {
  return ((await $.store.get(KEY)) as Note[] | null) ?? []
}

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    await $.command.register({ name: 'remember', description: 'Save a note for future sessions', argumentHint: '<note>' })
    await $.command.register({ name: 'recall', description: 'Show the latest saved notes' })
    return next(e)
  })

  on('command.run', { command: 'remember' }, async ($, e) => {
    const text = e.args.trim()
    if (text === '') return { text: 'Usage: /remember <note>' }
    const notes = addNote(await load($), text, await $.clock.now())
    await $.store.set(KEY, notes)
    return { text: `Saved. ${notes.length} note(s) kept.` }
  })

  on('command.run', { command: 'recall' }, async ($) => {
    const notes = await load($)
    if (notes.length === 0) return { text: 'No notes yet. Use /remember <note>.' }
    return { text: notes.slice(-10).reverse().map(n => `- ${n.text}`).join('\n') }
  })

  // The newest few notes ride in the system prompt, after the cache boundary.
  on('prompt.compose', async ($, e, next) => {
    const r = await next(e)
    const text = promptText(await load($))
    if (text === '') return r
    return { sections: [...r.sections, { id: 'keepsake:notes', text, scope: 'session' as const }] }
  })
}
