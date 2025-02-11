const  deepCopy = (obj)=> {
    let objClone = Array.isArray(obj) ? [] : {}
    if (obj && typeof obj === "object") {
      for (let key in obj) {
        if (obj[key] && typeof obj[key] === "object") {
          objClone[key] = deepCopy(obj[key])
        } else {
          objClone[key] = obj[key]
        }
      }
    }
    return objClone
}

export {
    deepCopy
}