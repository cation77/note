/**
 * 移除链表元素
 * 给你一个链表的头节点 head 和一个整数 val ，请你删除链表中所有满足 Node.val == val 的节点，并返回 新的头节点 。
 * 链接：hhttps://leetcode.cn/leetbook/read/linked-list/f9izv/
 * 题目：https://leetcode.cn/problems/remove-linked-list-elements/description/
 *
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
 * @param {number} val
 * @return {ListNode}
 */
var removeElements = function (head, val) {
  const stack = [];
  while (head) {
    if (head.val !== val) {
      stack.push(head);
    }
    head = head.next;
  }
  if (stack.length === 0) return null;
  let node = stack.unshift();
  const dummy = node;
  while (stack.length) {
    const temp = stack.unshift();
    node.next = temp;
    node = temp;
  }
  return dummy;
};

var removeElements = function (head, val) {
  let dummy = { val: null, next: null };
  dummy.next = head;
  let temp = dummy;
  while (temp.next) {
    if (temp.next.val === val) {
      temp.next = temp.next.next;
    } else {
      temp = temp.next;
    }
  }
  return dummy.next;
};
