/**
 * 二叉搜索树满足以下条件:
 * 1. 对于根节点，左子树中所有节点的值 < 根节点的值 < 右子树中所有节点的值。
 * 2. 任意节点的左、右子树也是二叉搜索树，即同样满足条件 1.
 * 参考 https://www.hello-algo.com/chapter_tree/binary_search_tree/
 */

/**
 * Definition of TreeNode:
 * class TreeNode {
 *   constructor(val, left=null, right=null) {
 *     this.val = val;
 *     this.left = left;
 *     this.right = right;
 *   }
 * }
 */

// 二叉树 {5,4,9,2,#,8,10}，表示如下的树结构：
//         5
//        / \
//      4    9
//     /    / \
//    2    8  10

/**
 * 二叉搜索树中最接近的值
 * 给一棵非空二叉搜索树以及一个target值，找到在BST中最接近给定值的节点值
 *
 * 示例 1：
 * 输入: root = {5,4,9,2,#,8,10} and target = 6.124780
 * 输出: 5
 *
 * @param {*} root TreeNode
 * @param {*} target
 * @returns
 */

var closestValue = function (root, target) {
  let closest = root.val;
  while (root) {
    if (Math.abs(closest - target) > Math.abs(root.val - target)) {
      closest = root.val;
    }
    // 如果 target 小于 root，那么右子树的结点不可能比 root 更接近 target, 遍历左子树一遍即可，反之亦然。
    root = root.val > target ? root.left : root.right;
  }

  return closest;
};
