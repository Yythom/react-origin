import {Placement} from "./utils";

export function createFiber(vnode, returnFiber) {
  const fiber = {
    // host string
    // function
    // class
    type: vnode.type,
    // 标记了当前层级下的唯一性
    key: vnode.key,
    props: vnode.props,
    // 第一个子节点 大阿哥 fiber
    child: null,
    // 下一个兄弟节点 fiber
    sibling: null,
    // 父fiber
    return: returnFiber,
    // 标记了当前层级下的位置
    index: 0,
    // host dom节点
    // class 实例
    stateNode: null,
    // 标记fiber是干嘛的，是插入、更新、删除
    flags: Placement,
  };
  return fiber;
}
