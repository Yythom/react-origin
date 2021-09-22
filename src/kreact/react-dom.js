import { isStr, updateNode } from "./utils";
import { scheduleUpdateOnFiber } from "./ReactFiberWorkLoop";

// vnode->node
function render(vnode, container) {
  // container的vnode
  const fiberRoot = {
    type: container.nodeName.toLocaleLowerCase(),
    stateNode: container,
    props: { children: vnode },
  };

  scheduleUpdateOnFiber(fiberRoot);
}

// // 处理vnode数组
// function reconcileChildren(parentNode, children) {
//   if (isStr(children)) {
//     return;
//   }
//   for (let i = 0; i < children.length; i++) {
//     const child = children[i];
//     // child vode
//     // child->node
//     // node->parentNode
//     render(child, parentNode);
//   }
// }
export default { render };
