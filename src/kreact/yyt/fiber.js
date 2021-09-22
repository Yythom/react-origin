import { Placement } from "../utils";

const initFiber = (vnode, returnFiber) => {
    return {
        type: vnode.type,     // 节点类型
        key: vnode.key,       // 节点key 标记了当前层级下的唯一性
        child: null,          // 第一个子节点
        props: vnode.props,   // 当前节点的props
        sibling: null,        // 下一个兄弟节点 fiber
        return: returnFiber,  // 父fiber
        index: 0,             // 标记了当前层级下的位置
        stateNode: null, // 当前node节点
        // 标记fiber是干嘛的，是插入、更新、删除
        flags: Placement,
    }
}

export default initFiber;