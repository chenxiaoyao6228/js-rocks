// 拆分成左树的遍历与右树的遍历
type TreeNode = {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
};

type InorderTraversal<T extends TreeNode | null> = T extends TreeNode
  ? T["left"] extends TreeNode
    ? [
        ...InorderTraversal<T["left"]>,
        T["val"],
        ...InorderTraversal<T["right"]>
      ]
    : T["right"] extends TreeNode
    ? [T["val"], ...InorderTraversal<T["right"]>]
    : [T["val"]]
  : [];
