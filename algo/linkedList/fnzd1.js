/**
 * 合并两个有序链表
 * 将两个升序链表合并为一个新的 升序 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。
 *
 * 链接：https://leetcode.cn/leetbook/read/linked-list/fnzd1/
 * 题目：https://leetcode.cn/problems/merge-two-sorted-lists/solutions/
 *
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */

/**
 * 迭代
 */
var mergeTwoLists = function (list1, list2) {
  let dummy = { val: null, next: null };
  let target = null;
  let cur = dummy;
  while (list1 && list2) {
    if (list1.val <= list2.val) {
      target = list1;
      list1 = list1.next;
    } else {
      target = list2;
      list2 = list2.next;
    }
    cur.next = target;
    cur = cur.next;
  }

  cur.next = list1 ? list1 : list2;
  return dummy.next;
};

/**
 * 递归
 */
var mergeTwoLists = function (list1, list2) {
  if (!list1) return list2;
  if (!list2) return list1;

  if (list1.val <= list2.val) {
    list1.next = mergeTwoLists(list1.next, list2);
    return list1;
  } else {
    list2.next = mergeTwoLists(list1, list2.next);
    return list2;
  }
};
