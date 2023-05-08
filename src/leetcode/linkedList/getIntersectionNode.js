/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * 如果将LA+LB和LB+LA的两条链表拼接起来，此时尾部对齐，从前望后遍历不就能找到公共节点了嘛！
 * 
 * 哲学：
 * 不断的去对方的轨迹中寻找对方的身影，只要二人有交集，就终会相遇！
 * 走到尽头见不到你，于是走过你来时的路，等到相遇时才发现，你也走过我来时的路。 
 * 错的人就算走过了对方的路也还是会错过
 * 要是对的人，就算开始错过了，最终还是会再次相遇在一起的
 */

/**
 * 160. 相交链表
 * 给你两个单链表的头节点 headA 和 headB ，请你找出并返回两个单链表相交的起始节点。如果两个链表不存在相交节点，返回 null 。
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function (headA, headB) {
  let linkA = headA
  let linkB = headB
  let count = 0
  while (linkA && linkB) {
    if (linkA === linkB) {
      return linkA
    }
    linkA = linkA.next
    linkB = linkB.next
    if (count < 2 && !linkA) {
      linkA = headB
      count++
    }
    if (count < 2 && !linkB) {
      linkB = headA
      count++
    }
  }
  return null
};

var getIntersectionNode = function (headA, headB) {
  if (!headA || !headB) return null
  let linkA = headA
  let linkB = headB
  while (linkA !== linkB) {
    linkA = linkA ? linkA.next : headB
    linkB = linkB ? linkB.next : headA
  }
  return linkA
};
