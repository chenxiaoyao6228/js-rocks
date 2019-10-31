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

// use an extra stack
// > dummy->[1->2]->3->4->5
// function reverseKGroup(head, k) {
//   if (head == null) return null
//   let stack = []
//   let dummy = new ListNode(null)
//   dummy.next = head
//   let current = dummy // 上轮反转的最后一个元素
//   let next = dummy.next // 默认下轮反转的第一个元素
//   while (next != null) {
//     for (let i = 0; i < k && next != null; i++) {
//       stack.push(next)
//       next = next.next
//     }
//     if (stack.length !== k) return dummy.next // 最后不满足k个元素, 无需反转
//     while (stack.length !== 0) {
//       // 反转
//       current.next = stack.pop() // eg: dummy->2
//       current = current.next // eg: current指针移到2
//     }
//     current.next = next // 将最后一个元素与原剩下的链表进行链接, 如dummy->2->1与3->4
//   }
//   return dummy.next
// }

// var reverseKGroup = function(head, k) {
//   let current = head
//   let count = 0
//   while (current != null && count !== k) {
//     current = current.next
//     count++
//   }
//   if (count === k) {
//     //不满足k个, 剩余的元素不进行反转, 直接返回
//     current = reverseKGroup(current, k) // current是最后一轮反转返回的head,也就是本次反转的最后一个元素
//     while (count-- > 0) {
//       let temp = head.next
//       head.next = current // 交换首尾
//       current = head
//       head = temp // 处理区下一个元素
//     }
//     head = current
//   }
//   return head
// }

var reverseKGroup = function(head, k) {
  if (!head) return null
  let dummy = new ListNode(null)
  dummy.next = head
  let prev = dummy // 反转[nk, nk+k]是, 为nk-1
  while (prev != null) {
    prev = reverse(prev, k)
  }
  return dummy.next //返回反转后的链表
}

function reverse(prev, k) {
  let last = prev
  for (let i = 0; i < k + 1; i++) {
    // 定义区间[nk, nk+k]
    last = last.next
    if (last == null && i !== k) {
      return null
    }
  }
  let tail = prev.next // tail为本轮[nk, nk+k]反转的第一个元素, 反转结束后会变为最后一个
  let curr = prev.next.next // 当前需要和tail交换的元素
  while (curr !== last) {
    // 当前需要交换的节点不是最后一个
    let next = curr.next
    curr.next = prev.next
    prev.next = curr
    tail.next = next
    curr = next
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
