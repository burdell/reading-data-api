import { server } from './graphql'

export const handler = server.createHandler({
  cors: { origin: '*', credentials: true }
})
