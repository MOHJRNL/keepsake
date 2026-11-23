import { expect, test } from 'claude-code/testing'

// The engine answers these beneath the plugin.
// An in-memory store stands in for the host's persistent one.
const beneath = (on: (event: string, hook: (...args: any[]) => unknown) => void) => {
  const store = new Map<string, unknown>()
  on('clock.now', () => ({ value: 1_800_000_000_000 }))
  on('command.register', () => ({ value: { command: 'remember' } }))
  on('session.start', (_: unknown, e: { cwd: string }) => ({ cwd: e.cwd }))
  on('store.get', (_: unknown, e: { key: string }) => ({ value: store.get(e.key) ?? null }))
  on('store.set', (_: unknown, e: { key: string; value: unknown }) => {
    store.set(e.key, e.value)
    return { value: undefined }
  })
}
const RUN = { presentation: { isFullscreen: false, columns: 100 } }

test('/remember keeps a note and /recall lists it', async ($, on) => {
  beneath(on as never)
  await $.session.start({ cwd: '/', surface: 'desktop', isInteractive: true })
  const saved = await $.command.run({ command: 'remember', args: 'Staging DB is read-only on weekends', ...RUN } as never)
  expect(saved.text).toContain('1 note(s) kept')
  const listed = await $.command.run({ command: 'recall', args: '', ...RUN } as never)
  expect(listed.text).toContain('Staging DB is read-only on weekends')
})

test('/remember with no text shows the usage line', async ($, on) => {
  beneath(on as never)
  await $.session.start({ cwd: '/', surface: 'desktop', isInteractive: true })
  const r = await $.command.run({ command: 'remember', args: '   ', ...RUN } as never)
  expect(r.text).toBe('Usage: /remember <note>')
})
