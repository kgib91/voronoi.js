import { BinaryTreeHelper } from "./BinaryTreeHelper";
import { BinaryTreeNode } from "./BinaryTreeNode";

export interface BinaryTreeStrategy<U, T> {
  insert(tree: BinaryTree<U, T>, node: BinaryTreeNode<U, T>): BinaryTreeNode<U, T>;
  remove(tree: BinaryTree<U, T>, node: BinaryTreeNode<U, T>): void;
}

export class BinaryTree<U, T> {
  private strategy: BinaryTreeStrategy<U, T>;
  public root: BinaryTreeNode<U, T> | null;
  constructor(strategy: BinaryTreeStrategy<U, T>) {
    this.strategy = strategy;
    this.root = null;
  }
  public rotateLeft(node: BinaryTreeNode<U, T> | null): BinaryTreeNode<U, T> | null {
    if (node == null) {
      return null;
    }
    const pivot = node.right;
    if (pivot == null) {
      return null;
    }
    BinaryTreeHelper.detach(pivot);
    let pivotLeft = pivot.left;
    if (pivotLeft != null) {
      BinaryTreeHelper.detach(pivotLeft);
    }
    const grandparent = node.parent;
    if (grandparent) {
      if (grandparent.right == node) {
        BinaryTreeHelper.setRightOf(grandparent, pivot);
      } else {
        BinaryTreeHelper.setLeftOf(grandparent, pivot);
      }
    }
    if (pivotLeft != null) {
      BinaryTreeHelper.setRightOf(node, pivotLeft);
    }
    BinaryTreeHelper.setRightOf(pivot, node);
    if (node == this.root) {
      BinaryTreeHelper.setRoot(this, pivot);
    }
    return pivot;
  }
  public rotateRight(node: BinaryTreeNode<U, T> | null): BinaryTreeNode<U, T> | null {
    if (node == null) {
      return null;
    }
    const grandparent = node.parent;
    const pivot = node.left;
    if (pivot == null) {
      return null;
    }
    BinaryTreeHelper.detach(pivot);
    let pivotRight = pivot.right;
    if (pivotRight != null) {
      BinaryTreeHelper.detach(pivotRight);
    }
    if (grandparent) {
      if (grandparent.right === node) {
        BinaryTreeHelper.setRightOf(grandparent, pivot);
      } else {
        BinaryTreeHelper.setLeftOf(grandparent, pivot);
      }
    }
    if (pivotRight != null) {
      BinaryTreeHelper.setLeftOf(pivotRight, node);
    }
    BinaryTreeHelper.setRightOf(pivot, node);
    if (node == this.root) {
      BinaryTreeHelper.setRoot(this, pivot);
    }
    return pivot;
  }
  public transplant(deprecated: BinaryTreeNode<U, T> | null, successor: BinaryTreeNode<U, T> | null) {
    if (successor != null) {
      BinaryTreeHelper.detach(successor);
    }
    if (deprecated != null) {
      if (deprecated.parent == null) {
        BinaryTreeHelper.setRoot(this, successor);
      } else if (deprecated == deprecated.parent.left) {
        if (successor == null) {
          BinaryTreeHelper.detach(deprecated.parent.left);
        } else {
          BinaryTreeHelper.setLeftOf(deprecated.parent, successor);
        }
      } else {
        if (successor == null) {
          BinaryTreeHelper.detach(deprecated.parent.right);
        } else {
          BinaryTreeHelper.setRightOf(deprecated.parent, successor);
        }
      }
    }
  }
  public min(node): BinaryTreeNode<U, T> | null {
    while (node.left != null) {
      node = node.left;
    }
    return node;
  }
  public max(node): BinaryTreeNode<U, T> | null {
    while (node.right != null) {
      node = node.right;
    }
    return node;
  }
  public insert(node: BinaryTreeNode<U, T>) {
    this.strategy.insert(this, node);
  }
  public remove(node: BinaryTreeNode<U, T>) {
    this.strategy.remove(this, node);
  }
}