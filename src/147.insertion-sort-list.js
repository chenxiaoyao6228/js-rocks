/*
 * @lc app=leetcode id=147 lang=javascript
 *
 * [147] Insertion Sort List
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
// var insertionSortList = function(head) {
//   if (head == null) {
//     return head
//   }
//   let dummy = new ListNode(null)
//   dummy.next = head // 插入一个节点
//   let pre = head
//   let cur = head
//   let next = null
//   while (cur != null) {
//     next = cur.next // 保存下个节点
//     while (pre.next != null && pre.next.val < cur.val) {
//       pre = pre.next // 找到要插入的位置的前一个节点
//     }
//     cur.next = pre.next
//     pre.next = cur
//     pre = dummy // 重设dummy
//     cur = next // 处理下个节点
//   }
//   return dummy.next
// }
function insertionSortList(head) {
  var before = { val: -Number.MAX_VALUE, next: null } // 这个next:null很巧妙

  while (head) {
    var prev = before

    // find prev
    while (prev.next && prev.next.val < head.val) {
      prev = prev.next
    }

    var next = head.next
    head.next = prev.next
    prev.next = head
    head = next
  }

  return before.next
}

// function ListNode(val) {
//   this.val = val
//   this.next = null
// }
// @lc code=end

module.exports = {
  insertionSortList
}
