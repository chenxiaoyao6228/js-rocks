// linked-list with value and next property for leetcode solution
// for full version of linked-list, check the data-structure folder

const { ListNode } = require('../24.swap-nodes-in-pairs')

function push(head, value) {
  let originHead = head
  while (head && head.next) {
    head = head.next
  }
  let node = new ListNode(value)
  head.next = node
  return originHead
}

function createList(...values) {
  let list = new ListNode(values[0])
  for (let i = 1; i < values.length; i++) {
    list = push(list, values[i])
  }
  return list
}

module.exports = {
  ListNode,
  push,
  createList
}
