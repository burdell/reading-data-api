import { writeFileSync } from 'fs'
import { resolve } from 'path'

export function writeToFile(data: unknown, dir: string, filename: string) {
  writeFileSync(resolve(dir, `${filename}`), JSON.stringify(data, null, 2))
}
