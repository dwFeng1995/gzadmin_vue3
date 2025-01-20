//存放跟数组相关的方法
const  reduceFlatten = (arr)=> {
    return arr.reduce((result, item)=> {
      return result.concat(Array.isArray(item) ? reduceFlatten(item) : item);
    }, [])
}

//对象数组 根据某一个属性 升序排序
const  objArrayAsc = (prop)=> {
    return (obj1, obj2)=> {
      let val1 = obj1[prop]
      let val2 = obj2[prop]
      if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
        val1 = Number(val1)
        val2 = Number(val2)
      }
      if (val1 < val2) {
        return -1
      } else if (val1 > val2) {
        return 1
      } else {
        return 0
      }
    }
  }
  
  //对象数组 根据某一个属性 降序排序
const  objArrayDesc = (prop)=> {
    return  (obj1, obj2)=> {
      let val1 = obj1[prop]
      let val2 = obj2[prop]
      if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
        val1 = Number(val1)
        val2 = Number(val2)
      }
      if (val1 > val2) {
        return -1
      } else if (val1 < val2) {
        return 1
      } else {
        return 0
      }
    }
  }

export {
    reduceFlatten as flattenArray,
    objArrayAsc as objectArrayAscProp,
    objArrayDesc as objectArrayDescProp
}