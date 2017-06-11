import * as fs from 'fs'
import { rmdir } from '@gradealabs/fs-utils'

/**
 * Delete files and directories.
 */
export default function widowmaker (...filesOrDirectories: Array<string | string[]>): Promise<void> {
  // Accept variadic string arguments or an array of strings.
  const files: string[] = [].concat(...filesOrDirectories)

  return Promise.all(
    files.map(fileName => {
      return new Promise((resolve, reject) => {
        fs.unlink(fileName, error => {
          if (error && error.code === 'EPERM') {
            rmdir(fileName).then(resolve, reject)
          } else if (error && error.code === 'ENOENT') {
            resolve()
          /* istanbul ignore next */
          } else if (error) {
            /* istanbul ignore next */
            reject(error)
          } else {
            resolve()
          }
        })
      })
    })
  ).then(() => void 0)
}
