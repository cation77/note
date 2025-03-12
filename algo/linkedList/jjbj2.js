/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * 相交链表
 * 给你两个单链表的头节点 headA 和 headB ，请你找出并返回两个单链表相交的起始节点。如果两个链表不存在相交节点，返回 null 。
 * 链接：https://leetcode.cn/leetbook/read/linked-list/jjbj2/
 * 题目：https://leetcode.cn/problems/intersection-of-two-linked-lists/description/
 *
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */

/**
 * 思路：链表中若存在公共节点那么后续节点必然也相同
 * 从后往前遍历,最后一个共同节点就是链表相交的第一个节点
 * 但是，单链表无法后往前遍历
 * 需要把 headA + headB 和 headB + headA, 分别拼接起来，此时尾部平齐
 * 这样从前往后遍历，也能找到相交节点
 */
var getIntersectionNode = function (headA, headB) {
  let skipA = headA;
  let skipB = headB;
  let count = 0;

  while (skipA && skipB) {
    if (skipA === skipB) {
      return skipA;
    }
    skipA = skipA.next;
    skipB = skipB.next;

    if (count < 2 && !skipA) {
      skipA = headB;
      count++;
    }

    if (count < 2 && !skipB) {
      skipB = headA;
      count++;
    }
  }
  return null;
};

/**
 * 方法二：哈希集合判断
 * 方法三：统计2个链表长度，让较长的链表先走，直到剩余长度相同，此时判断节点是否相同
 */
