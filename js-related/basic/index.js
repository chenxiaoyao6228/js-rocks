function arrayToTree(input) {
  let obj
  for (let item of input) {
    if (!item.parentId) obj = item
    const children = input.filter(it => it.parentId === item.id)
    item.children = children || []
    delete item.parentId
  }
  return obj
}

export { arrayToTree }
