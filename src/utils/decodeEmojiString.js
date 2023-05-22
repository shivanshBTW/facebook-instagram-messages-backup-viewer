import { Buffer } from 'buffer'

let decodeEmojiString = str => {
  if (!str) return
  let arr = []
  for (var i = 0; i < str.length; i++) {
    arr.push(str.charCodeAt(i))
  }
  return Buffer.from(arr).toString('utf8')
}

export default decodeEmojiString
