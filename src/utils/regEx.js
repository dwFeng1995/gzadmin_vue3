// 这里存放正则表达式

// 校验身份证号码
const identificationNumber = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
// 校验姓名
const fullNameReg = /^[\u4E00-\u9FA5]{2,4}$/
// 校验手机号
const phoneNumber = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/

const price = /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/

export  {
    identificationNumber as identificationNumberReg,
    fullNameReg as fullNameRegReg,
    phoneNumber as phoneNumberReg,
    price as priceReg
}

