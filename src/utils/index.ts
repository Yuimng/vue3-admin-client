import { Department, Menu } from '@/api/interface/system'

/**
 * @description 使用递归扁平化菜单，方便添加动态路由
 * @param {Array} menuList 菜单列表
 * @returns {Array}
 */
export function getFlatMenuList(menuList: Menu[]): Menu[] {
  let newMenuList: Menu[] = JSON.parse(JSON.stringify(menuList))
  return newMenuList.flatMap((item) => [
    item,
    ...(item.children ? getFlatMenuList(item.children) : [])
  ])
}

/**
 * @description 使用递归过滤出需要渲染在左侧菜单的列表 (需剔除 isEnable == false 的菜单)
 * @param {Array} menuList 菜单列表
 * @returns {Array}
 * */
export function getShowMenuList(menuList: Menu[]) {
  let newMenuList: Menu[] = JSON.parse(JSON.stringify(menuList))
  return newMenuList.filter((item) => {
    item.children?.length && (item.children = getShowMenuList(item.children))
    return item.meta.isEnable
  })
}

/**
 * @description 使用递归找出所有面包屑存储到 pinia/vuex 中
 * @param {Array} menuList 菜单列表
 * @param {Array} parent 父级菜单
 * @param {Object} result 处理后的结果
 * @returns {Object}
 */
export function getAllBreadcrumbList(
  menuList: Menu[],
  parent = [],
  result: { [key: string]: any } = {}
) {
  for (const item of menuList) {
    result[item.path] = [...parent, item] // 本路径：父级对象+自己  父级递归
    if (item.children) getAllBreadcrumbList(item.children, result[item.path], result)
  }
  return result
}

export interface MenuOption {
  label: string
  value: number
  children: MenuOption[]
}

export function getTreeMenuOptions(menuList: Menu[]): MenuOption[] {
  return menuList.map((item) => {
    return {
      label: item.meta.title,
      value: item.id,
      children: item.children ? getTreeMenuOptions(item.children) : []
    }
  })
}

export interface MenuTree {
  id: number
  label: string
  children?: MenuTree[]
}

export function getTreeMenu(menuList: Menu[]): MenuTree[] {
  return menuList.map((item) => {
    const treeItem: MenuTree = {
      id: item.id,
      label: item.meta.title
    }

    if (item.children && item.children.length > 0) {
      treeItem.children = getTreeMenu(item.children)
    }

    return treeItem
  })
}

export function findNodeById(tree: Department[], id: number): Department | undefined {
  for (const node of tree) {
    if (node.id === id) {
      return node
    }
    if (node.children && node.children.length > 0) {
      const foundNode = findNodeById(node.children, id)
      if (foundNode) {
        return foundNode
      }
    }
  }
  return undefined
}
