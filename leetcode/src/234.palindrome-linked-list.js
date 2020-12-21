/*
 * @lc app=leetcode id=234 lang=javascript
 *
 * [234] Palindrome Linked List
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
 * @return {boolean}
 */
// O(n) time O(1) space
var isPalindrome = function(head) {
  let fast = head
  let slow = head
  while (fast && fast.next) {
    fast = fast.next.next
    slow = slow.next
  }
  fast = head
  slow = reverse(slow)
  while (fast && slow) {
    if (fast.val !== slow.val) {
      return false
    }
    fast = fast.next
    slow = slow.next
  }
  return true
}

const reverse = head => {
  let dummy = new ListNode(null)
  let pointer = head
  while (pointer !== null) {
    let next = dummy.next
    let temp = pointer.next
    dummy.next = pointer
    dummy.next.next = next
    pointer = temp
  }
  return dummy.next
}

function ListNode(val) {
  this.val = val
  this.next = null
}

// O(n) time && O(n)space
// var isPalindrome = function(head) {
//   let stack = []
//   let node = head
//   while (node != null) {
//     stack.push(node.val)
//     node = node.next
//   }
//   while (head != null) {
//     if (head.val != stack.pop()) {
//       return false
//     }
//     head = head.next
//   }
//   return true
// }

// @lc code=end
module.exports = {
  isPalindrome
}
