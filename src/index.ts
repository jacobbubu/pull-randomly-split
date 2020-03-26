import * as pull from 'pull-stream'

type DataType = Buffer | string

export default function (min?: number, max?: number) {
  const _min = min || 1
  const _max = max || Infinity

  let buffer: Buffer
  let ended: pull.EndOrError // from up-stream's callback

  function bite() {
    const offset = _min + Math.floor(Math.random() * Math.min(_max - _min, buffer.length))
    const data = buffer.slice(0, offset)
    buffer = buffer.slice(offset)
    return data
  }

  return function (read: pull.Source<DataType>) {
    return function (abort: pull.Abort, cb: pull.SourceCallback<DataType>) {
      if (abort) {
        // terminated by down-stream's request
        return read(abort, cb)
      }
      if (buffer?.length > 0) {
        return cb(null, bite())
      }
      if (ended) {
        return cb(ended)
      }

      read(null, function (end, data) {
        if (end) {
          ended = end
          if (buffer?.length > 0) {
            return cb(null, bite())
          }
          return cb(ended)
        }

        const dataBuffer: Buffer = 'string' === typeof data ? Buffer.from(data) : data!

        // copy twice, this isn't efficient,
        // but this is just for testing.
        if (buffer) {
          buffer = Buffer.concat([buffer, dataBuffer])
        } else {
          buffer = dataBuffer
        }

        cb(null, bite())
      })
    }
  }
}
