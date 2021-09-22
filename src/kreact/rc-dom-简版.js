import kebabCase from 'kebab-case'
import { isArray } from './utils';
// vnode->node
function render(vnode, container) {
    const node = createNode(vnode,) // 加载子节点
    container.appendChild(node) // 子节点加载完->创建根节点
}

/**
 * 
 * @param {*} vnode 虚拟子节点
 * @returns 
 */
function createNode(vnode) {
    const { props, key, type } = vnode
    const node = document.createElement(type);
    reconcileChildren(node, props.children); // 遍历子节点
    setAttr(node, props) // 设置节点属性
    return node;
}
/**
 * 
 * @param {*} node 指定插入节点
 * @param {*} children 渲染内容 props.children
 * @returns 
 */
function reconcileChildren(node, children) {
    // console.log(children, 'children');
    if (typeof children === 'string') { return }
    if (!isArray(children)) {
        const _node = createNode(children)
        node.appendChild(_node)
        return
    }
    children.forEach(vnode => {
        // console.log(vnode);
        if (vnode) {
            if (typeof vnode.type === 'function') {
                const fnNode = vnode.type(vnode.props);
                const _node = createNode(fnNode)
                // console.log(fnNode, 'fnNode');
                node.appendChild(_node)
            } else {
                const _node = createNode(vnode)
                node.appendChild(_node)
            }
        }
    })
}

/**
 * 
 * @param {*} node dom节点
 * @param {*} props 属性
 */
export function setAttr(node, props) {
    Object.keys(props).forEach((attr, i) => {
        if (attr === 'children') {
            if (typeof props.children === 'string') {
                node.textContent = props.children
            }
        } else if (attr === 'style') {
            const styleAttr = kebabCase(JSON.stringify(Object.values(props)[i]).replace(/{|}|"/g, '')).replace(/,/g, ';')
            node.setAttribute(attr, styleAttr);
        } else {
            node.setAttribute(attr.replace('className', 'class'), Object.values(props)[i]);
        }
    })
}
export default { render };
