/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * 环形链表
 * 给你一个链表的头节点 head ，判断链表中是否有环。
 * 链接：https://leetcode.cn/leetbook/read/linked-list/jbex5/
 * 题目：https://leetcode.cn/problems/linked-list-cycle/description/
 *
 * 解法：快慢指针解决
 *
 * @param {*} head
 * @returns
 */
var hasCycle = function (head) {
  let slow = head;
  let fast = head;

  // 需要判断 fast.next 是否为 null
  while (fast && fast.next) {
    // 慢指针每次只移动一步，而快指针每次移动两步
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) {
      return true;
    }
  }

  return false;
};
