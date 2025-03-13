/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * 删除链表的倒数第N个节点
 * 给你一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点。
 * 链接：https://leetcode.cn/leetbook/read/linked-list/jf1cc/
 * 题目：https://leetcode.cn/problems/remove-nth-node-from-end-of-list/description/
 *
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */

/**
 * 快慢指针，快指针先移动 n 步
 */
var removeNthFromEnd = function (head, n) {
  let slow = head;
  let fast = head;
  // fast 移 n 步
  for (let i = 0; i < n; i++) {
    fast = fast.next;
  }
  // 如果 fast 为空，表示删除的是头结点
  if (!fast) {
    return head.next;
  }
  // 判断 fast.next 是否为 null
  while (fast.next) {
    slow = slow.next;
    fast = fast.next;
  }
  // 此处 slow 不是倒数第 n 个节点，他是倒数第 n+1 个节点
  // 删除的下一个结点才是倒数第 n 个节点
  slow.next = slow.next.next;
  return head;
};
