/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * 环形链表 II
 * 给定一个链表的头节点  head ，返回链表开始入环的第一个节点。 如果链表无环，则返回 null。
 * 链接：https://leetcode.cn/leetbook/read/linked-list/jjhf6/
 * 题目：https://leetcode.cn/problems/linked-list-cycle-ii/description/
 *
 * @param {ListNode} head
 * @return {ListNode}
 */
var detectCycle = function (head) {
  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;

    if (slow === fast) {
      break;
    }
  }

  // 无环状态、fast 或者 fast.next 为 null，跳出循环
  // 此时直接返回 null
  if (!fast || !fast.next) return null;

  // 把 slow 或 fast 重置为起点 head
  // 当 slow === fast 即为环首尾相接点
  slow = head;
  while (slow !== fast) {
    slow = slow.next;
    fast = fast.next;
  }
  return slow;
};
