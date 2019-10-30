function logObj(obj) {
  console.log(jts(obj))
}

export function jts(obj) {
  return JSON.stringify(obj)
}

module.exports = {
  logObj,
  jts
}
