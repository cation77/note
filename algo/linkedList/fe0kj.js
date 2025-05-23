/**
 * 奇偶链表
 * 给定单链表的头节点 head ，将所有索引为奇数的节点和索引为偶数的节点分别组合在一起，然后返回重新排序的列表。
 * 第一个节点的索引被认为是 奇数 ， 第二个节点的索引为 偶数 ，以此类推。
 * 请注意，偶数组和奇数组内部的相对顺序应该与输入时保持一致。
 * 你必须在 O(1) 的额外空间复杂度和 O(n) 的时间复杂度下解决这个问题。
 *
 * 链接：https://leetcode.cn/leetbook/read/linked-list/fe0kj/
 * 题目：https://leetcode.cn/problems/odd-even-linked-list/description/
 *
 *
 * 示例 1:
 * 输入: head = [1,2,3,4,5]
 * 输出: [1,3,5,2,4]
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
 * 维护两个指针 odd 和 even 分别指向奇数节点和偶数节点
 */
var oddEvenList = function (head) {
  if (!head) {
    return head;
  }
  let evenHead = head.next;
  let odd = head;
  let even = evenHead;
  while (even && even.next) {
    odd.next = even.next;
    odd = odd.next;
    even.next = odd.next;
    even = even.next;
  }
  odd.next = evenHead;
  return head;
};

var oddEvenList = function (head) {
  let oddHead = { val: null, next: null };
  let oddTail = oddHead;
  let evenHead = { val: null, next: null };
  let evenTail = evenHead;
  let isOdd = true;
  while (head) {
    if (isOdd) {
      oddTail.next = head;
      oddTail = oddTail.next;
    } else {
      evenTail.next = head;
      evenTail = evenTail.next;
    }
    head = head.next;
    isOdd = !isOdd;
  }
  oddTail.next = evenHead.next;
  evenTail.next = null;
  return oddHead.next;
};
