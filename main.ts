import sjcl from 'sjcl'

const password = 'password'

const myBitArray = sjcl.hash.sha256.hash(password)
const myHash = sjcl.codec.hex.fromBits(myBitArray)
// 64 / 3 === 21.33

// split new hash into 3 sections.
const hashArray = myHash.match(/.{1,21}/g)
console.log(hashArray)

if (hashArray) {
  // 1st section is the same,
  // 2nd section is to uppercase,
  // 3rd section is to symbol,
  // last section is the same.

  const startingSymbolIndex = '!'.charCodeAt(0)
  const symbolRange = '/'.charCodeAt(0) - '!'.charCodeAt(0)

  const newPassword = [
    hashArray[0],
    hashArray[1].toLocaleUpperCase(),
    hashArray[2].split('').map(char => {
      // first modulo with range:
      const mod = char.charCodeAt(0) % symbolRange
      // then add with index
      const charBit = mod + startingSymbolIndex
      return String.fromCharCode(charBit)
    }).join(''),
    hashArray[3]
  ].join('')

  console.log(newPassword)
}

