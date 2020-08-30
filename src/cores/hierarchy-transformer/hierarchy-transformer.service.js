/**
 * @class HierarchyTransformerService
 * @classdesc Transform flat hierarchy into nested
 */
export class HierarchyTransformerService {
    /**
     * @access public
     * @param payload
     * @return {{level: *, children: *[]|undefined, parent_id: *, id: *, title: *}[]}
     */
    execute(payload) {
        this.nodeMap = new Map()
        this.nodes = []
        this.roots = []
        // n-Loop
        Object.values(payload).forEach(items => this.nodes.push(...items))
        // m-Loop
        this.nodes.forEach(node => {
            const { parent_id: parentId } = node
            if (parentId !== null) {
                const children = this.nodeMap.has(parentId)
                    ? [...this.nodeMap.get(parentId), node]
                    : [node]
                this.nodeMap.set(parentId, children)
            } else {
                this.roots.push(node)
            }
        })

        return this.roots.map(root => ({
            id: root.id,
            title: root.title,
            level: root.level,
            children: this.getChildren(this.nodeMap, root.id),
            parent_id: root.parent_id,
        }))
    }

    /**
     * @access private
     * @param {Map} nodeMap
     * @param {number} id
     * @return {[] | undefined}
     */
    getChildren(nodeMap, id) {
        const nodeChildren = nodeMap.get(id)
        if (!nodeChildren) return []

        nodeChildren.forEach((child, index) => {
            nodeChildren[index].children = this.getChildren(nodeMap, child.id)
        })

        return nodeChildren
    }
}
