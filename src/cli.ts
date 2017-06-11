#!/usr/bin/env node
import * as yargs from 'yargs'
import widowmaker from './index'

if (require.main === module) {
  yargs(process.argv.slice(2))
    .usage('Usage: widowmaker [options] file file ...')
    .options({
      'verbose': {
        alias: 'V',
        type: 'boolean',
        describe: 'Determines if the elapsed time should be logged'
      }
    })
    .help()

  const argv = yargs.argv
  const { verbose = false, _: targets = [] } = argv

  if (targets.length === 0) {
    yargs.showHelp()
  } else {
    const start = new Date().getTime()
    widowmaker(targets)
      .then(() => new Date().getTime() - start)
      .then(elapsed => {
        if (verbose) {
          const time = (elapsed / 1000).toFixed(2)
          console.log('Widowmaker complete!', time, 'seconds')
        }
      })
      .catch(error => console.error(error))
  }
} else {
  throw new Error(
    'widowmaker cli is only meant to be run at the command line'
  )
}
