// work in progress; 当前正在工作中的

import {
  updateHostComponent,
  updateFunctionComponent,
} from "./ReactFiberReconcile";
import { isFn, isStr } from "./utils";

let wipRoot = null;
let nextUnitofWork = null;

export function scheduleUpdateOnFiber(fiber) {
  wipRoot = fiber;
  wipRoot.sibling = null;
  nextUnitofWork = wipRoot;
}

function performUnitOfWork(wip) {
  //1. 更新当前任务
  const { type } = wip;
  if (isStr(type)) {
    updateHostComponent(wip);
  } else if (isFn(type)) {
    updateFunctionComponent(wip);
  }

  // 2. 返回下一个任务
  // 王朝的故事 深度优先
  if (wip.child) {
    return wip.child;
  }
  let next = wip;
  while (next) {
    if (next.sibling) {
      return next.sibling;
    }
    next = next.return;
  }

  return null;
}

function workLoop(IdleDeadline) {
  while (nextUnitofWork && IdleDeadline.timeRemaining() > 0) {
    //1. 更新当前任务
    // 2. 返回下一个任务
    nextUnitofWork = performUnitOfWork(nextUnitofWork);
  }

  //
  if (!nextUnitofWork && wipRoot) {
    commitRoot();
  }
}

requestIdleCallback(workLoop);

function commitRoot() {
  commitWorker(wipRoot.child);
}

function commitWorker(wip) {
  if (!wip) {
    return;
  }
  // 1. 更新自己
  // vnode -》 node
  const { stateNode } = wip;
  // parentNode就是父dom节点
  // fiber是不一定有dom节点
  let parentNode = getParentNode(wip.return); //wip.return.stateNode;
  if (stateNode) {
    parentNode.appendChild(stateNode);
  }

  // 2. 更新子节点
  commitWorker(wip.child);
  // 3. 更新兄弟
  commitWorker(wip.sibling);
}

function getParentNode(wip) {
  let tem = wip;
  while (tem) {
    if (tem.stateNode) {
      return tem.stateNode;
    }
    tem = tem.return;
  }
}
