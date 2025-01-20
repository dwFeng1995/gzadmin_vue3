const baseApi = ()=>{
  if(process.env.NODE_ENV === 'production') {
      return process.env.VUE_APP_BASE_API
  } else {
    return process.env.VUE_APP_BASE_API  
  }
}

export {
    baseApi
}