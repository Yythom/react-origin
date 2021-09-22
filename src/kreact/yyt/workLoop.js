import { setAttr } from "../rc-dom-简版";
import { isArray, isFn, isStringOrNumber, updateNode } from "../utils";
import initFiber from "./fiber";

let nextWork = null
let wipRoot = null;
function createNode(vnode) {
    const { props, key, type } = vnode
    const node = document.createElement(type);
    updateNode(node, props)
    // eachChild(node, props.children); // 遍历子节点
    setAttr(node, props) // 设置节点属性
    return node;
}
/**
 * 
 * @param {*} node 指定插入节点 diff
 * @param {*} children 渲染内容 props.children
 * @returns 
 */
function reconcileChildren(wip, children) {
    if (typeof children === 'string') { return }
    const newChildren = isArray(children) ? children : [children];
    let previousNewFiber = null;
    newChildren.forEach(vnode => {
        const newFiber = initFiber(vnode, wip);
        if (previousNewFiber === null) {
            wip.child = newFiber;
        } else {
            previousNewFiber.sibling = newFiber;
        }
        previousNewFiber = newFiber;
    })
}


export function scheduleUpdateOnFiber(fiber) { // 开始
    wipRoot = fiber;
    wipRoot.sibling = null;
    nextWork = wipRoot;
}

function updataFunctionComponent(wip) {
    const { type, props, } = wip;
    const children = type(props)

    reconcileChildren(wip, children); // 遍历子节点
    console.log(children, 'fn');
}

function updataHostComponent(wip) {
    if (!wip.stateNode) {
        wip.stateNode = createNode(wip);
    }
    reconcileChildren(wip, wip.props.children); // 遍历子节点
    console.log(wip, 'string');
}
/**
 * @param {*} wip fiber任务 
 */
function performUnitOfWork(wip) {
    const { type } = wip;

    if (typeof type === 'string') {
        updataHostComponent(wip)
    } else if (typeof type === 'function') {
        updataFunctionComponent(wip)
    }
    if (wip.child) {
        return wip.child
    }

    // 深度优先  
    if (wip.child) { // 优先寻找第一个子fiber
        return wip.child;
    }
    let next = wip;  // nextWork
    while (next) {
        if (next.sibling) {  // 优先寻找兄弟fiber
            return next.sibling
        }
        next = next.return  // 寻找父fiber
    }
    return null;
}


function getParentNode(_return) {
    let tem = _return;
    while (tem) {
        if (tem.stateNode) {
            return tem.stateNode
        }
        tem = tem.return;
    }
}

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

function workLoop(IdleDeadline) {
    while (nextWork && IdleDeadline.timeRemaining() > 0) {
        console.log(nextWork, 'nextWork');
        nextWork = performUnitOfWork(nextWork)
    }
    if (!nextWork) {
        commitRoot()
    }
};
requestIdleCallback(workLoop)