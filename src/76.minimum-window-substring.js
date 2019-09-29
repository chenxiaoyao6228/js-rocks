/*
 * @lc app=leetcode id=76 lang=javascript
 *
 * [76] Minimum Window Substring
 */
/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function(s, t) {
  let map = {}
  for (let i = 0; i < t.length; i++) {
    let char = t[i]
    if (map[char] == undefined) {
      map[char] = 0
    }
    map[char]++
  }
  let start = 0
  let end = 0
  let counter = Object.keys(map).length
  let len = Infinity
  let head = 0
  while (end < s.length) {
    let char = s[end]
    if (map[char] != undefined) {
      map[char]--
      if (map[char] === 0) counter--
    }
    end++

    while (counter === 0) {
      let char = s[start]
      // change counter condition
      if (map[char] != undefined) {
        map[char]++
        if (map[char] > 0) counter++
      }
      if (end - start < len) {
        len = end - start
        head = start
      }
      start++
    }
  }

  return len === Infinity ? '' : s.substring(head, head + len)
}

module.exports = {
  minWindow
}
