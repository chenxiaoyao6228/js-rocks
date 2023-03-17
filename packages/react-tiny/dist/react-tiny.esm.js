function h(type, props, ...children) {
    return createVNode(type, props, children);
}
function createVNode(type, props, children) {
    const vnode = {
        type,
        props: props || {},
        children: children || [],
    };
    return vnode;
}

function render(elements, rootNode) {
    rootNode.appendChild(document.createTextNode('hello world'));
}

export { h, render };
