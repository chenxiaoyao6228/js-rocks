/*
 * @lc app=leetcode id=24 lang=javascript
 *
 * [24] Swap Nodes in Pairs
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
 * @return {ListNode}
 */
// function swapPairs(head) {
//   let dummyHead = new ListNode(null)
//   dummyHead.next = head
//   let p = dummyHead
//   while (p.next && p.next.next) {
//     let node1 = p.next
//     let node2 = node1.next
//     let next = node2.next

//     // swap
//     node2.next = node1
//     node1.next = next
//     p.next = node2

//     // move pointer p to next cycle
//     p = node1
//   }
//   let result = dummyHead.next
//   dummyHead = null
//   return result
// }

function swapPairs(head) {
  if (head === null || head.next === null) {
    return head
  }
  let newHead = head.next
  head.next = newHead.next
  newHead.next = head
  head.next = swapPairs(head.next)
  return newHead
}
// @lc code=end

function ListNode(val) {
  this.val = val
  this.next = null
}

function push(head, value) {
  let originHead = head
  while (head && head.next) {
    head = head.next
  }
  let node = new ListNode(value)
  head.next = node
  return originHead
}

module.exports = {
  swapPairs,
  ListNode,
  push
}
