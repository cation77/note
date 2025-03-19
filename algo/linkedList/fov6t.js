/**
 * 回文链表
 * 给你一个单链表的头节点 head ，请你判断该链表是否为回文链表。如果是，返回 true ；否则，返回 false 。
 *
 * 链接：https://leetcode.cn/leetbook/read/linked-list/fov6t/
 * 题目：https://leetcode.cn/problems/palindrome-linked-list/description/
 *
 * 示例 1：
 * 输入：head = [1,2,2,1]
 * 输出：true
 *
 * 示例 2：
 * 输入：head = [1,2]
 * 输出：false
 *
 * 进阶：你能否用 O(n) 时间复杂度和 O(1) 空间复杂度解决此题？
 *
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */

/**
 * 方法一：将值复制到数组中后用双指针法
 * 优化后
 */
var isPalindrome = function (head) {
  const nums = [];
  while (head) {
    nums.push(head.val);
    head = head.next;
  }

  let left = 0;
  let right = nums.length - 1;
  while (left < right) {
    if (nums[left] !== nums[right]) {
      return false;
    }
    left++;
    right--;
  }
  return true;
};

var isPalindrome = function (head) {
  const stack = [];
  while (head) {
    stack.push(head.val);
    head = head.next;
  }

  const len = stack.length;
  const mid = Math.floor(len / 2);
  let left = (right = mid);
  if (len % 2 === 0) {
    left = mid - 1;
  }

  while (left >= 0 && right < len) {
    if (stack[left] !== stack[right]) {
      return false;
    }
    left--;
    right++;
  }
  return true;
};

/**
 * 进阶：用 O(n) 时间复杂度和 O(1) 空间复杂度解决
 * 方法二：寻找中间节点+反转链表
 *
 */
var isPalindrome = function (head) {
  const mid = middleNode(head);
  let head2 = reverseList(mid);
  while (head2) {
    if (head.val !== head2.val) {
      return false;
    }
    head = head.next;
    head2 = head2.next;
  }
  return true;
};

/**
 * 链表有奇数个节点，那么找的是正中间的节点
 * 链表有偶数个节点，那么找的是正中间右边的节点
 */
function middleNode(head) {
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow;
}

/**
 * 反转链表
 * 把链表后半段 mid 到 末位的部分反转
 */
function reverseList(head) {
  let pre = null;
  let cur = head;
  while (cur) {
    const temp = cur.next;
    cur.next = pre;
    pre = cur;
    cur = temp;
  }
  return pre;
}
