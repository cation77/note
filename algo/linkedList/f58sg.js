/**
 * 反转链表
 * 给你单链表的头节点 head ，请你反转链表，并返回反转后的链表。
 * 链接：hhttps://leetcode.cn/leetbook/read/linked-list/f58sg/
 * 题目：https://leetcode.cn/problems/reverse-linked-list/description/
 *
 *
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */

/**
 * 解法：
 * 1，使用栈解决
 * 2，双链表求解
 * 3，递归解决
 */
var reverseList = function (head) {
  const stack = [];
  while (head) {
    stack.push({ ...head });
    head = head.next;
  }
  if (stack.length === 0) return null;
  let node = stack.pop();
  const dummy = node;
  while (stack.length) {
    const temp = stack.pop();
    node.next = temp;
    node = temp;
  }
  // 最后一个结点就是反转前的头结点，一定要让他的 next 等于空，否则会构成环
  node.next = null;
  return dummy;
};

var reverseList = function (head) {
  let pre = null;
  let current = head;

  while (current) {
    const temp = current.next;
    current.next = pre;
    pre = current;
    current = temp;
  }
  return pre;
};
