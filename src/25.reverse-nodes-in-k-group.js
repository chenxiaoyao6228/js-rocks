/*
 * @lc app=leetcode id=25 lang=javascript
 *
 * [25] Reverse Nodes in k-Group
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
// var reverseKGroup = function(head, k) {
//   let current = head
//   let count = 0
//   while (current && count !== k) {
//     current = current.next
//     count++
//   }
//   if (count === k) {
//     current = reverseKGroup(current, k)
//     while (count-- > k) {
//       let temp = head.next
//       head.next = current
//       current = head
//       head = temp
//     }
//     head = current
//   }
//   return head
// }

var reverseKGroup = function(head, k) {
  if (!head) return null
  // insert a empty note
  let dummy = new ListNode(0)
  dummy.next = head
  let prev = dummy
  while (prev != null) {
    // reverse [nk, nk+n] elements
    // return the last node in prev round of reverse
    // prev will go to next cycle as first node
    prev = reverse(prev, k)
  }
  return dummy.next
}

function reverse(prev, k) {
  // defined k elements in a group
  let last = prev
  for (let i = 0; i < k + 1; i++) {
    last = last.next
    // the last n element cannot fill k or just fill
    if (last == null && i !== k) {
      return null
    }
  }
  let tail = prev.next
  let curr = prev.next.next
  while (curr !== last) {
    let next = curr.next
    curr.next = prev.next
    prev.next = curr
    tail.next = next
    curr = next // next iteration
  }
  return tail
}

function ListNode(val) {
  this.val = val
  this.next = null
}
// @lc code=end

module.exports = {
  reverseKGroup
}
