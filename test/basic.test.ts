import * as crypto from 'crypto'
import * as pull from 'pull-stream'
import random from '../src'

describe('basic', () => {
  const bytes = crypto.randomBytes(256)

  it('simple', () => {
    pull(
      pull.values([bytes]),
      random(16, 64),
      pull.through(function (e) {
        expect(e.length).toBeLessThan(64)
      }),
      pull.collect(function (_, ary: Buffer[]) {
        expect(Buffer.concat(ary).length).toBe(bytes.length)
        expect(Buffer.concat(ary).toString('hex')).toBe(bytes.toString('hex'))
        expect(Buffer.concat(ary).toJSON()).toEqual(bytes.toJSON())
      })
    )
  })

  it('defaults', () => {
    pull(
      pull.values([bytes]),
      random(),
      pull.collect(function (_, ary: Buffer[]) {
        expect(Buffer.concat(ary).length).toBe(bytes.length)
        expect(Buffer.concat(ary).toString('hex')).toBe(bytes.toString('hex'))
        expect(Buffer.concat(ary).toJSON()).toEqual(bytes.toJSON())
      })
    )
  })
})
