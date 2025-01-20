import { deepCopy } from "@/utils/object"
const treeData = (data) => {
    let cloneData = deepCopy(data); // 对源数据深度克隆
    return cloneData.filter((father) => {
        let branchArr = cloneData.filter((child) => father.id == child.parent_id); //返回每一项的子级数组
        branchArr.length > 0 ? (father.children = branchArr) : ""; //如果存在子级，则给父级添加一个children属性，并赋值
        return father.parent_id == 0; //返回第一层
    });
}
export {
    treeData
}