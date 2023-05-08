/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
  // 当n=0，删除的是头结点
  if (n === 0) return head.next
  let fast = head
  let slow = head
  for (let i = 0; i < n; i++) {
    // 快指针向前移动n位，慢指针在表头不动
    fast = fast.next
  }
  while (fast && fast.next) {
    // 当快指针到达表尾时，慢指针正好到达倒数第n位
    slow = slow.next
    fast = fast.next
  }
  slow.next = slow.next.next
  return head
};