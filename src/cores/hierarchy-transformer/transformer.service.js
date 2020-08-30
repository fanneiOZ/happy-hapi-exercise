/**
 * @param {Map} nodeMap
 * @param {number} id
 * @return {[] | undefined}
 */
export function extractChildren(nodeMap, id) {
    const nodeChildren = nodeMap.get(id)
    if (!nodeChildren) return []

    nodeChildren.forEach((child, index) => {
        nodeChildren[index].children = extractChildren(nodeMap, child.id)
    })

    return nodeChildren
}

/**
 * @param payload
 * @return {{level: *, children: *[]|undefined, parent_id: *, id: *, title: *}[]}
 */
export function transformHierarchy(payload) {
    const nodeMap = new Map()
    const nodes = []
    const roots = []
    Object.values(payload).forEach(items => nodes.push(...items))
    nodes.forEach(node => {
        const { parent_id: parentId } = node
        if (parentId !== null) {
            const children = nodeMap.has(parentId) ? [...nodeMap.get(parentId), node] : [node]
            nodeMap.set(parentId, children)
        } else {
            roots.push(node)
        }
    })

    return roots.map(root => ({
        id: root.id,
        title: root.title,
        level: root.level,
        children: extractChildren(nodeMap, root.id),
        parent_id: root.parent_id,
    }))
}
