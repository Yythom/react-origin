import { isArray, isStr, updateNode } from "./utils";
import { createFiber } from "./fiber";

export function updateHostComponent(wip) {
  // 更新节点自己
  if (!wip.stateNode) {
    wip.stateNode = createNode(wip);
  }

  // 协调子节点
  reconcileChildren(wip, wip.props.children);
}

// vnode(host)->node
function createNode(vnode) {
  const { type, props } = vnode;
  const node = document.createElement(type);

  updateNode(node, props);

  return node;
}

export function updateFunctionComponent(wip) {
  // 更新节点自己
  // 协调子节点
  const { type, props } = wip;
  const children = type(props);
  reconcileChildren(wip, children);
}

// 初次渲染、更新
// 更新新的fiber结构的过程
function reconcileChildren(wip, children) {
  if (isStr(children)) {
    return;
  }
  const newChildren = isArray(children) ? children : [children];
  let previousNewFiber = null;
  for (let i = 0; i < newChildren.length; i++) {
    const newChild = newChildren[i];
    const newFiber = createFiber(newChild, wip);

    if (previousNewFiber === null) {
      wip.child = newFiber;
    } else {
      previousNewFiber.sibling = newFiber;
    }
    previousNewFiber = newFiber;
  }
}
