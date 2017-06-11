import * as assert from 'assert'
import * as fs from 'fs'
import * as path from 'path'
import { mkdir, rmdir, touch } from '@gradealabs/fs-utils'
import widowmaker from './index'

const tree = [
  '.widow/file.txt',
  '.widow/a.txt',
  '.widow/b.txt',
  '.widow/folder/other.txt',
  '.widow/folder/me.txt',
  '.widow/folder/you.txt'
]

describe('widowmaker', function () {
  beforeEach(function () {
    return tree.reduce((p, x) => {
      return p.then(() => {
        return mkdir(path.dirname(x)).then(() => touch(x))
      })
    }, Promise.resolve())
  })

  afterEach(function () {
    return rmdir('.widow')
  })

  it('should delete files', function (done) {
    widowmaker('.widow/file.txt', [ '.widow/a.txt', '.widow/b.txt' ])
      .then(() => {
        assert.ok(!fs.existsSync('.widow/file.txt'))
        assert.ok(!fs.existsSync('.widow/a.txt'))
        assert.ok(!fs.existsSync('.widow/b.txt'))
      })
      .then(done, done)
  })

  it('should delete directories', function (done) {
    widowmaker('.widow/folder', [ '.widow/a.txt', '.widow/b.txt' ])
      .then(() => {
        assert.ok(!fs.existsSync('.widow/folder'))
        assert.ok(!fs.existsSync('.widow/folder/me.txt'))
        assert.ok(!fs.existsSync('.widow/a.txt'))
        assert.ok(!fs.existsSync('.widow/b.txt'))
      })
      .then(done, done)
  })

  it('should skip non-existant files/directories', function (done) {
    widowmaker('.widow/folder', '.widow/notthere', [ '.widow/a.txt', '.widow/b.txt' ])
      .then(() => {
        assert.ok(!fs.existsSync('.widow/folder'))
        assert.ok(!fs.existsSync('.widow/folder/me.txt'))
        assert.ok(!fs.existsSync('.widow/a.txt'))
        assert.ok(!fs.existsSync('.widow/b.txt'))
      })
      .then(done, done)
  })
})
