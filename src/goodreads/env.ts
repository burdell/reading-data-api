export function getEnv() {
  const { GOODREADS_KEY, GOODREADS_USER } = process.env
  if (!GOODREADS_KEY || !GOODREADS_USER) {
    throw new Error('Proper env variables not set')
  }

  return { GOODREADS_KEY, GOODREADS_USER }
}
