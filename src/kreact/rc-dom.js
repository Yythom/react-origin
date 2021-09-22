import kebabCase from 'kebab-case'
import { isArray } from './utils';
import initFiber from './yyt/fiber';
import { scheduleUpdateOnFiber } from './yyt/workLoop'
// vnode->node
function render(vnode, container) {
    // container的vnode
    const fiberRoot = {
        type: container.nodeName.toLocaleLowerCase(),
        stateNode: container,
        props: { children: vnode.props.children },
    };

    scheduleUpdateOnFiber(fiberRoot);
    // console.log(fiberRoot, 'fiberRoot');
}

export default { render };
