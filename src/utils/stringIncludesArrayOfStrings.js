let stringIncludesArrayOfStrings = (fullString, arr) => {
  if (!arr?.length) return
  let finalDecision = false
  arr.some(testStr => {
    if (fullString.includes(testStr)) {
      finalDecision = true
      return true
    }
  })
  return finalDecision
}

export default stringIncludesArrayOfStrings
