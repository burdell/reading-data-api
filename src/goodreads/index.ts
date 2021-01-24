import { config } from 'dotenv'

import { syncGoodreads } from './goodreads_sync'
import { getEnv } from './env'

export async function handler() {
  const { GOODREADS_KEY, GOODREADS_USER } = getEnv()

  try {
    const bookCount = await syncGoodreads(GOODREADS_KEY, GOODREADS_USER)
    console.log(`[GOODREADS SYNC] Added ${bookCount} books`)
    return { status: 200 }
  } catch (e) {
    throw new Error(`[GOODREADS SYNC] Error: ${e.message}`)
  }
}

if (process.env.NODE_ENV === 'local') {
  config()
  handler()
}
