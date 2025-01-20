import { onMounted, reactive, ref, toRefs } from "vue";
import { companyMiniListApi, secondListApi, platformListApi, createNewCommercialApi, facilityListApi, updateCommercialApi, thirdPartyListApi } from '@/api/company'
import { userDepartListApi, userGroupListApi, canteenMiniListApi } from '@/api/yqMerchantPayment'
import { allClientTypeApi } from '@/api/clientType'
import { ElMessage } from "element-plus";
import { deepCopy } from "@/utils/object"
import { treeData } from '@/utils/tree'
const ruleFormRef = ref(null)

const state = reactive({
    pageSize: 10,
    pageIndex: 1,
    pageTotal: 0,
    keyWords: '',
    tableData: [],
    secondMerchantTypeArr: [
        {
            type: 1,
            name: '充值二清'
        },
        {
            type: 2,
            name: '消费二清'
        }

    ],
    sub_mch_id: 0,
    secondMerchantTypeId: '',
    currentIndex: 0,
    addDialogVisible: false,
    isDisabled: false,
    isLook: true,
    secondMerchantInfo: {
        companyId: '',  //id
        secondName: '', //二级商户名称
        second_type: '1', //二级商户类型
        h5UserGroupIds: '',
        backUserGroupIds: '',
        reconciliationDay: '1', //对账日
        platformAllList: [], // 开通支付平台
        remark: '', //备注
        coolId: '',
        WeChatId: '',
        alipayId: '',
        days: 0,//当月天数
    },

    platformData: [
        { name: "平台商户名称", key: "merchant_name", "show": 1 },
        { name: "二级商户编号", key: "sub_mer_id", "show": 1 },
        { name: "二级商户名称", key: "sub_mer_name", "show": 1 },
        { name: "二级商户种类", key: "sub_mer_sort", "show": 1 },
        { name: "二级商户类型", key: "sub_mer_type", "show": 1 },
        { name: "证件类型", key: "certificate_type", "show": 1 },
        { name: "证件号码", key: "certificate_no", "show": 1 },
    ],



    companyMiniList: [],//所有企业列表数据


    // 充值二清
    userTypeList: [
        {
            id: 1,
            name: '用户组'
        },
        {
            id: 2,
            name: '部门'
        }
    ],
    userGroupList: [],//所有用户组列表数据
    departList: [], //所有部门列表数据

    // H5
    h5_recharge_info: {
        userTypeId: "",
        userDepartIds: [],
        userGroupIds: []
    },
    // 后台
    back_recharge_info: {
        userTypeId: '',
        userDepartIds: [],
        userGroupIds: []
    },


    // 消费二清
    h5PayOrderTypeList: [
        {
            id: 1,
            name: '按用户类型'
        },
        {
            id: 2,
            name: '按档口'
        }
    ],

    //按用户
    h5PayUserTypeList: [
        {
            id: 1,
            name: '用户组'
        },
        {
            id: 2,
            name: '部门'
        }
    ],

    deparCleartList: [], //部门数据
    userCleartList: [],//用户组数据
    canteenMiniList: [],//所有食堂/档口数据
    clientTypeList: [], //设备类型列表
    gatheringFacilityList: [], //收款设备数据
    // 档口设备
    h5_consume_info: {
        userTypeId: "",
        canteenIds: [],
        FacilityIds: []
    },

    // 支付收款用户组和部门
    h5_usertype_info: {
        userTypeId: "",
        userDepartIds: [],
        userGroupIds: []
    },

    treeDeparList: [],
    treeUserList: [],
    facilityAllList: [], //设备整合数据列表
    props: {
        multiple: true,
        label: "canteen_name",
        value: "ids",
        emitPath: false
    },
    is_Data:false



})
const newState = toRefs(state)

// 查询
const queryData = () => {
    state.isQuery = true
    state.pageIndex = 1
    getsecondList()
}
// 更新
const resetData = () => {
    state.isQuery = false
    state.keyWords = ''
    state.companyId = ''
    state.pageIndex = 1
    state.secondMerchantTypeId = ''
    getsecondList()
}
// 条数
const changePageSize = (newPageSize) => {
    state.pageIndex = 1
    state.pageSize = newPageSize
    getsecondList()
}
// 页码
const changePageIndex = (newPageIndex) => {
    state.pageIndex = newPageIndex
    getsecondList()
}
// 当前选中企业
const selectCompany = (val) => {
    state.h5_recharge_info = {
        userTypeId: "",
        userDepartIds: [],
        userGroupIds: []
    }
    state.back_recharge_info = {
        userTypeId: '',
        userDepartIds: [],
        userGroupIds: []
    }

    // 档口设备
    state.h5_consume_info = {
        userTypeId: "",
        canteenIds: [],
        FacilityIds: []
    }

    // 支付收款用户组和部门
    state.h5_usertype_info = {
        userTypeId: "",
        userDepartIds: [],
        userGroupIds: []
    }
    state.secondMerchantInfo.companyId = val
    getUserGroupList()
    getUserDepartList()
    getPlatformList()

    getCanteenMiniList()
    getFacilityList()


}

//打开新增二级商户弹窗
const openAddDialog = () => {
    state.addDialogVisible = true
    state.isDisabled = false
    state.isLook = true
    state.currentIndex = 0
    state.secondMerchantInfo = {
        companyId: '',  //id
        secondName: '', //二级商户名称
        second_type: '1', //二级商户类型
        h5UserGroupIds: '',
        backUserGroupIds: '',
        reconciliationDay: '', //对账日
        platformAllList: [], // 开通支付平台
        remark: '', //备注
        coolId: '',
        WeChatId: '',
        alipayId: '',
    }

    // H5
    state.h5_recharge_info = {
        userTypeId: "",
        userDepartIds: [],
        userGroupIds: []
    }
    // 后台
    state.back_recharge_info = {
        userTypeId: '',
        userDepartIds: [],
        userGroupIds: []
    }
    // 支付
    state.h5_consume_info = {
        userTypeId: "",
        canteenIds: [],
        userDepartIds: [],
        FacilityIds: []
    }

}




//确认添加
const submitAdd = () => {
    ruleFormRef.value.validate(async valid => {
        if (!valid) return
        if (state.isDisabled) {
            updateCommercial()
        } else {
            createNewData()
        }
    })


}

//获取所有企业列表
const getCompanyMiniList = async () => {
    const res = await companyMiniListApi()
    state.companyMiniList = res ?? []
}
//判断商户类型
const codeToName = (code) => {
    let name
    switch (true) {
        case code === null:
            name = 'null'
            break
        case code === undefined:
            name = "undefined"
            break
        case code === 'W':
            name = "微信"
            break
        case code === 'Z':
            name = "支付宝"
            break
        case code === 'PCI':
            name = "佳都缴费中心"
            break
        case code === 'IKU':
            name = "酷点支付"
            break
        case code === 'ABC_CENTER':
            name = "农行缴费中心"
            break
        case code === 'ABC':
            name = "农行综合收银台"
            break
        case code === 'GEZI':
            name = "虚拟钱包"
            break
        default:
            name = code
    }
    return name
}


//支付平台信息  对象转数组
const objectToArray = (obj) => {
    let arr = []
    for (let k in obj) {
        arr.push({
            key: k,
            payTypeName: codeToName(k),
            ...obj[k]
        })
    }
    return arr
}


// 获取所有二级商户数据列表
const getsecondList = async () => {
    const res = await secondListApi({
        page: state.pageIndex,
        page_size: state.pageSize,
        sub_type: state.secondMerchantTypeId,
        keyword: state.keyWords,
    })
    state.pageTotal = res.total
    console.log('res.data----',res.data)
    res.data.forEach((item) => {
        item.info.forEach((item1) => {
            item1.data = objectToArray(item1.mch_form_info).length ? objectToArray(item1.mch_form_info) : [1];
        });
    });
    state.tableData = handeTableData(res.data)
    console.log('state.tableData---', state.tableData);
}



//  表格数据数据处理
const handeTableData = (tableData) => {
    let result = []
    tableData.forEach((item) => {
        item.info.forEach((child, childIndex) => {
            if (child.data.length) {
                child.data.forEach((two, twoIndex) => {
                    result.push({
                        company_name: item.company_name,
                        company_no: item.company_no,
                        company_id: child.company_id,
                        secondId: child.id,
                        secondName: child.name,
                        secondTypeName: child.pay_mode === 1 ? "充值二清" : "消费二清",
                        secondType: child.pay_mode,
                        recon_date: child.recon_date,
                        platform: two.key,
                        merchant: two.payTypeName,
                        remark: two?.info?.remark,
                        status: two?.info?.status_name,
                        mchInfoId: two?.info?.mch_info_id,
                        own_remark: two?.info?.own_remark,
                        shop: two?.info?.shop_id,
                        mch_form_info: child.data,
                        h5_recharge: child.h5_recharge,
                        back_recharge: child.back_recharge,
                        h5_pay: child.h5_pay,
                        client_pay: child.client_pay,
                        oneRowSpan: childIndex === 0 && twoIndex === 0 ? getlastChild(item).length : 0, //  最为层要合并多少行 取决于最里面那层有多少个  （孙级）
                        twoRowSpan: twoIndex === 0 ? child.data.length : 0, //第二层要合并几个 取决于它的子集有多少个
                    });
                });
            }
        });
    });

    return result
}

//获取最后子级数据
const getlastChild = (item) => {
    let arr = [];
    item.info.forEach((child) => {
        arr = arr.concat(child.data);
    });
    return arr;
}

// 表格合并
const objectSpanMethod = ({ row, columnIndex }) => {
    if (columnIndex === 0) {
        return {
            rowspan: row.oneRowSpan, // 待合并行数 -- 合并的行数长度就等于之前赋值的子数据的长度；未赋值的即表示0，不显示
            colspan: row.oneRowSpan > 0 ? 1 : 0, // 待合并列数 -- 合并的列数自身占一列，被合并的要返回0，表示不显示
        };
    }
    if (columnIndex === 1) {
        return {
            rowspan: row.oneRowSpan, // 待合并行数 -- 合并的行数长度就等于之前赋值的子数据的长度；未赋值的即表示0，不显示
            colspan: row.oneRowSpan > 0 ? 1 : 0, // 待合并列数 -- 合并的列数自身占一列，被合并的要返回0，表示不显示
        };
    }
    if (columnIndex > 1 && columnIndex < 9) {
        return {
            rowspan: row.twoRowSpan, // 待合并行数 -- 合并的行数长度就等于之前赋值的子数据的长度；未赋值的即表示0，不显示
            colspan: row.twoRowSpan > 0 ? 1 : 0, // 待合并列数 -- 合并的列数自身占一列，被合并的要返回0，表示不显示
        };
    }
    if (columnIndex == 14) {
        return {
            rowspan: row.twoRowSpan, // 待合并行数 -- 合并的行数长度就等于之前赋值的子数据的长度；未赋值的即表示0，不显示
            colspan: row.twoRowSpan > 0 ? 1 : 0, // 待合并列数 -- 合并的列数自身占一列，被合并的要返回0，表示不显示
        };
    }
}


//获取所有用户组列表数据
const getUserGroupList = async () => {
    const res = await userGroupListApi({
        company_id: state.secondMerchantInfo.companyId
    })
    res.forEach((x) => {
        x.isDisabled = !state.isLook
    })
    state.userGroupList = res ?? []
    state.userCleartList = res ?? []
}

//获取所有部门列表数据
const getUserDepartList = async () => {
    const res = await userDepartListApi({
        company_id: state.secondMerchantInfo.companyId
    })
    res.forEach((x) => {
        x.isDisabled = !state.isLook
    })
    state.departList = treeData(res) ?? []
    state.deparCleartList = treeData(res) ?? []

}

//获取所有企业食堂/档口列表
const getCanteenMiniList = async () => {
    const res = await canteenMiniListApi({
        company_id: state.secondMerchantInfo.companyId
    })
    state.canteenMiniList = res ?? []
    if (res) {
        getAllClientType()
    }
    console.log(res, "食堂列表");
}


// 获取所有设备类型列表
const getAllClientType = async () => {
    const res = await allClientTypeApi({})
    state.clientTypeList = res ?? []
    if (res) {
        getFacilityList()
    }
    console.log(res, "设备类型列表");
}

// 获取设备列表
const getFacilityList = async () => {
    const res = await facilityListApi({
        company_id: state.secondMerchantInfo.companyId
    })
    state.clientMiniList = res ?? []
    if (res) {
        state.facilityAllList = await facilityDataIntegration(deepCopy(state.canteenMiniList), state.clientTypeList, deepCopy(state.clientMiniList))
    }
    console.log(state.facilityAllList, "state.facilityAllLis");
    console.log(res, "设备列表");
}


// 设备数据整合
const facilityDataIntegration = async (arr1, arr2, arr3) => {
    function getNodesId(id) {
        const nodes = deepCopy(arr2).filter((v) => {
            v.children = v.children.filter((n) => n.canteen_id == id)
            v.ids = v.id + '-' + id

            return v.children.length
        })
        return nodes
    }
    function getTypeNodes(id) {
        arr3.forEach((v) => { v.canteen_name = `${v.client_name ? v.client_name : ''}(${v.client_no})`, v.ids = v.id, v.disabled = !state.isLook })
        return arr3.filter((v) => v.client_type_id == id)
    }
    arr2.forEach((x) => {
        x.children = getTypeNodes(x.id)
        x.canteen_name = x.name
        x.disabled = !state.isLook
    })
    arr1.forEach((x) => { x.children = getNodesId(x.id), x.ids = x.id, x.disabled = !state.isLook })
    return arr1
}


// 充值二清
const selectUserType = () => {
    state.back_recharge_info.userTypeId = state.h5_recharge_info.userTypeId
}

//企业已有支付平台
const getPlatformList = async () => {
    const res = await platformListApi({
        company_id: state.secondMerchantInfo.companyId,
        type: 'oneMch'
    })
    let dataList = deepCopy(res)
    if (dataList.length) {
        dataList.forEach(item => {
            item.checked = false
            item.input = ""
            item.remark = ""
            item.isShow = false
            item.oddInfo = []
            item.evenInfo = []
        })
    }
    state.secondMerchantInfo.platformAllList = dataList ?? []

    if (state.currentIndex) {
        state.currentIndex.mch_form_info.forEach(item => {
            state.secondMerchantInfo.platformAllList.forEach(item1 => {
                if (item.key == item1.pay_type_code) {
                    item1.checked = true
                    item1.input = item.info?.mch_info_id
                    item1.own_remark = item.info?.own_remark
                    item1.shop = item.info?.shop_id
                    item1.obj = item.info
                    searchPlatformData(item1,true)
                }
            })
        })
    }
}

// 添加二级商户
const createNewData = async () => {
    let { companyId, secondName, second_type, reconciliationDay, platformAllList, remark } = state.secondMerchantInfo
    let platform = platformAllList.filter(item => item.checked)
    platform.forEach(x => {
        x.Info = {}
        if (x.field_info.length) {
            x.field_info.forEach(x1 => {
                x.Info[x1.key] = x1.val
            })
        }
    })
    let obj = {}
    platform.map(item => {
        obj[item.pay_type_code] = {
            name: item.pay_type_name,
            pay_type_id: item.pay_type_id,
            info: {
                mch_info_id: item.input,
                own_remark: item.own_remark,
                shop_id: item.shop,
                ...item.Info
                // own_remark:'',
                // status:'',
            }
        }
    })
    let h5_recharge = {}
    let back_recharge = {}
    if (state.h5_recharge_info.userTypeId) {
        h5_recharge = {
            all: 0,
            user_type: state.h5_recharge_info.userTypeId,
            user_data: state.h5_recharge_info.userTypeId == 1 ? state.h5_recharge_info.userGroupIds.join() : state.h5_recharge_info.userDepartIds.join()
        }
        back_recharge = {
            all: 0,
            user_type: state.back_recharge_info.userTypeId,
            user_data: state.back_recharge_info.userTypeId == 1 ? state.back_recharge_info.userGroupIds.join() : state.back_recharge_info.userDepartIds.join()
        }
    }


    let client_pay = {
        all: 0,
        client_data: second_type == 2 ? state.h5_consume_info.FacilityIds.join() : ''
    }

    let h5_pay = {}

    if (state.h5_consume_info.userTypeId) {
        h5_pay = {
            all: 0,
            pay_type: state.h5_consume_info.userTypeId,
            user_type: state.h5_usertype_info.userTypeId == 1 ? 1 : state.h5_usertype_info.userTypeId == 2 ? 2 : '',
            user_data: state.h5_usertype_info.userTypeId == 1 ? state.h5_usertype_info.userGroupIds.join() : state.h5_usertype_info.userDepartIds.join(),
            canteen_data: state.h5_consume_info.userTypeId == 2 ? state.h5_consume_info.canteenIds.join() : ''
        }
    }




    const res = await createNewCommercialApi({
        company_id: companyId,
        name: secondName,
        pay_mode: second_type,
        recon_date: reconciliationDay ? reconciliationDay : 1,
        mch_form_info: obj || {},
        h5_recharge: second_type == 1 ? h5_recharge : {},
        back_recharge: second_type == 1 ? back_recharge : {},
        h5_pay: second_type == 2 ? h5_pay : {},
        client_pay: second_type == 2 && second_type.length ? client_pay : {},
        remark,
        mch_status: 1
    })

    if (res) {
        ElMessage.success({
            message: '添加成功！',
            showClose: true
        })
        state.addDialogVisible = false
        getsecondList()
    }
}





// 编辑二级商户
// const redactData = async (i, i1, id, isLook) => {
//     // H5
//     state.h5_recharge_info = {
//         userTypeId: "",
//         userDepartIds: [],
//         userGroupIds: []
//     }
//     // 后台
//     state.back_recharge_info = {
//         userTypeId: '',
//         userDepartIds: [],
//         userGroupIds: []
//     }
//     // 设备
//     state.h5_consume_info = {
//         userTypeId: "",
//         canteenIds: [],
//         FacilityIds: []
//     }
//     // 支付用户类型
//     state.h5_usertype_info = {
//         userTypeId: "",
//         userDepartIds: [],
//         userGroupIds: []
//     },

//         state.isLook = isLook
//     state.sub_mch_id = id
//     let current = state.tableData[i].Info[i1]
//     state.isDisabled = true
//     state.currentIndex = state.tableData[i].Info[i1]
//     state.addDialogVisible = true
//     state.secondMerchantInfo.companyId = current.company_id
//     state.secondMerchantInfo.secondName = current.name
//     state.secondMerchantInfo.second_type = current.pay_mode + ''
//     state.secondMerchantInfo.reconciliationDay = current.recon_date ? current.recon_date : ''
//     state.secondMerchantInfo.remark = current.remark ? current.remark : ''

//     if (state.secondMerchantInfo.second_type == 1) {
//         state.h5_recharge_info.userTypeId = current.h5_recharge.user_type
//         if (state.h5_recharge_info.userTypeId == 1) {
//             state.h5_recharge_info.userGroupIds = current.h5_recharge.user_data.length ? current.h5_recharge.user_data.split(',').map(Number) : []
//             state.back_recharge_info.userGroupIds = current.back_recharge.user_data.length ? current.back_recharge.user_data.split(',').map(Number) : []
//         } else if (state.h5_recharge_info.userTypeId == 2) {
//             state.h5_recharge_info.userDepartIds = current.h5_recharge.user_data.length ? current.h5_recharge.user_data.split(',').map(Number) : []
//             state.back_recharge_info.userDepartIds = current.back_recharge.user_data.length ? current.back_recharge.user_data.split(',').map(Number) : []
//         }
//     } else if (state.secondMerchantInfo.second_type == 2) {
//         state.h5_consume_info.userTypeId = current.h5_pay.pay_type
//         state.h5_consume_info.FacilityIds = current.client_pay.client_data.length ? current.client_pay.client_data.split(',').map(Number) : []
//         if (current.h5_pay.pay_type == 1) {
//             state.h5_usertype_info.userTypeId = current.h5_pay.user_type
//             if (state.h5_usertype_info.userTypeId == 1) {
//                 state.h5_usertype_info.userGroupIds = current.h5_pay.user_data.length ? current.h5_pay.user_data.split(',').map(Number) : []
//             } else if (state.h5_usertype_info.userTypeId == 2) {
//                 state.h5_usertype_info.userDepartIds = current.h5_pay.user_data.length ? current.h5_pay.user_data.split(',').map(Number) : []
//             }

//         } else if (current.h5_pay.pay_type == 2) {
//             state.h5_consume_info.canteenIds = current.h5_pay.canteen_data.length ? current.h5_pay.canteen_data.split(',').map(Number) : []
//         }
//     }
//     getUserGroupList()
//     getUserDepartList()
//     getCanteenMiniList()
//     getPlatformList()


// }

// 编辑二级商户
const handleRevamp = (row, isLook) => {
    // H5
    state.h5_recharge_info = {
        userTypeId: "",
        userDepartIds: [],
        userGroupIds: []
    }
    // 后台
    state.back_recharge_info = {
        userTypeId: '',
        userDepartIds: [],
        userGroupIds: []
    }
    // 设备
    state.h5_consume_info = {
        userTypeId: "",
        canteenIds: [],
        FacilityIds: []
    }
    // 支付用户类型
    state.h5_usertype_info = {
        userTypeId: "",
        userDepartIds: [],
        userGroupIds: []
    }
    state.currentIndex = row
    state.secondMerchantInfo.companyId = row.company_id
    state.sub_mch_id = row.secondId
    state.isDisabled = true
    state.isLook = isLook
    state.addDialogVisible = true
    state.secondMerchantInfo.secondName = row.secondName
    state.secondMerchantInfo.second_type = row.secondType + ''
    state.secondMerchantInfo.reconciliationDay = row.recon_date ? row.recon_date : ''
    state.secondMerchantInfo.remark = ''

 
    if (state.secondMerchantInfo.second_type == 1) {
        state.h5_recharge_info.userTypeId = row.h5_recharge.user_type
        if (state.h5_recharge_info.userTypeId == 1) {
            state.h5_recharge_info.userGroupIds = row.h5_recharge.user_data.length ? row.h5_recharge.user_data.split(',').map(Number) : []
            state.back_recharge_info.userGroupIds = row.back_recharge.user_data.length ? row.back_recharge.user_data.split(',').map(Number) : []
        } else if (state.h5_recharge_info.userTypeId == 2) {
            state.h5_recharge_info.userDepartIds = row.h5_recharge.user_data.length ? row.h5_recharge.user_data.split(',').map(Number) : []
            state.back_recharge_info.userDepartIds = row.back_recharge.user_data.length ? row.back_recharge.user_data.split(',').map(Number) : []
        }
    } else if (state.secondMerchantInfo.second_type == 2) {
        state.h5_consume_info.userTypeId = row.h5_pay.pay_type
        state.h5_consume_info.FacilityIds = row.client_pay?.client_data?.length ? row.client_pay.client_data.split(',').map(Number) : []
        if (row.h5_pay.pay_type == 1) {
            state.h5_usertype_info.userTypeId = row.h5_pay.user_type
            if (state.h5_usertype_info.userTypeId == 1) {
                state.h5_usertype_info.userGroupIds = row.h5_pay.user_data.length ? row.h5_pay.user_data.split(',').map(Number) : []
            } else if (state.h5_usertype_info.userTypeId == 2) {
                state.h5_usertype_info.userDepartIds = row.h5_pay.user_data.length ? row.h5_pay.user_data.split(',').map(Number) : []
            }

        } else if (row.h5_pay.pay_type == 2) {
            state.h5_consume_info.canteenIds = row.h5_pay.canteen_data.length ? row.h5_pay.canteen_data.split(',').map(Number) : []
        }
    }

    console.log(row, 'row');
    getUserGroupList()
    getUserDepartList()
    getCanteenMiniList()
    getPlatformList()
}

// 更新二级商户
const updateCommercial = async () => {
    let { companyId, secondName, second_type, reconciliationDay, platformAllList, remark } = state.secondMerchantInfo
    console.log(platformAllList, 'platformAllList');
    let platform = platformAllList.filter(item => item.checked)
    console.log(platform, 'platform');
    platform.forEach(x => {
        x.Info = {}
        if (x.field_info.length && !state.is_Data) {
            x.field_info.forEach(x1 => {
                x.Info[x1.key] = x1.val
            })
        }
    })
    let obj = {}
    platform.map(item => {
        obj[item.pay_type_code] = {
            name: item.pay_type_name,
            pay_type_id: item.pay_type_id,
            info: {
                mch_info_id: item.input,
                own_remark: item.own_remark,
                ...item.Info,
                shop_id:item.shop
                
                // own_remark:'',
                // status:'',
            }
        }
    })
    let h5_recharge = {}
    let back_recharge = {}
    if (state.h5_recharge_info.userTypeId) {
        h5_recharge = {
            all: 0,
            user_type: state.h5_recharge_info.userTypeId,
            user_data: state.h5_recharge_info.userTypeId == 1 ? state.h5_recharge_info.userGroupIds.join() : state.h5_recharge_info.userTypeId == 2 ? state.h5_recharge_info.userDepartIds.join() : ''
        }
        back_recharge = {
            all: 0,
            user_type: state.h5_recharge_info.userTypeId,
            user_data: state.h5_recharge_info.userTypeId == 1 ? state.back_recharge_info.userGroupIds.join() : state.h5_recharge_info.userTypeId == 2 ? state.back_recharge_info.userDepartIds.join() : ''
        }
    }

    let h5_pay = {}
    if (state.h5_consume_info.userTypeId) {
        h5_pay = {
            all: 0,
            pay_type: state.h5_consume_info.userTypeId,
            user_type: state.h5_usertype_info.userTypeId,
            user_data: state.h5_consume_info.userTypeId == 1 && state.h5_usertype_info.userTypeId == 1 ? state.h5_usertype_info.userGroupIds.join() : state.h5_consume_info.userTypeId == 1 && state.h5_usertype_info.userTypeId == 2 ? state.h5_usertype_info.userDepartIds.join() : '',
            canteen_data: state.h5_consume_info.userTypeId == 2 ? state.h5_consume_info.canteenIds.join() : ''
        }

    }

    let client_pay = {
        all: 0,
        client_data: second_type == 2 ? state.h5_consume_info.FacilityIds.join() : ''
    }



    const res = await updateCommercialApi({
        company_id: companyId,
        name: secondName,
        pay_mode: second_type,
        recon_date: reconciliationDay ? reconciliationDay : 1,
        mch_form_info: obj || {},
        h5_recharge: second_type == 1 ? h5_recharge : {},
        back_recharge: second_type == 1 ? back_recharge : {},
        h5_pay: second_type == 2 ? h5_pay : {},
        client_pay: second_type == 2 && state.h5_consume_info.FacilityIds.length ? client_pay : {},
        remark,
        mch_status: 1
    }, state.sub_mch_id)

    if (res) {
        ElMessage.success({
            message: '修改成功！',
            showClose: true
        })
        state.addDialogVisible = false
        getsecondList()
    }
}


// 商户平台对象转换数组
const jectToArray1 = (data) => {
    let arr = []
    for (let k in data) {
        arr.push({
            key: k,
            val: data[k]
        })
    }
    return arr
}


//关联商户查询
const searchPlatformData = async (item,status) => {
    console.log(item,'item');
    state.is_Data=false
    item.isShow = false
    item.oddInfo = []
    item.evenInfo = []
    if (!item.input && !status){
        ElMessage.warning({ message: "请输入商户ID", showClose: true })
        state.is_Data=true
        return
    }
    if(!item.input && status) return state.is_Data=true
    const res = await thirdPartyListApi({
        company_id: state.secondMerchantInfo.companyId,
        plat_form: item.pay_type_code,
        mch_info_id: item.input
    })
    console.log(res,'res');
    if (!Array.isArray(res) && res !== undefined) {
        item.isShow = true
        item.field_info.forEach((x, i) => {
            jectToArray1(res).forEach(item1 => {
                if (x.key == item1.key) {
                    x.val = item1.val
                }
            })
            if (i % 2 === 0) {
                item.oddInfo.push(x)
            } else {
                item.evenInfo.push(x)
            }


        })
    }else if (Array.isArray(res) && !status) {
        ElMessage.warning({ message: "暂无数据", showClose: true })
        if(item.pay_type_code=='IKU'){
            state.is_Data=true
        }
    }

    if((Array.isArray(res) || res==undefined) &&  item.pay_type_code=='IKU' ){
        state.is_Data=true
     }

}

//配置选项 H5/后台/充值
const normalizer = (node) => {
    return {
        id: node.id,
        label: state.h5_recharge_info.userTypeId == 2 ? node.depart_name : node.group_name,
        children: node.children,
    };
};

//配置选项 消费
const normalizerConsume = (node) => {
    return {
        id: node.id,
        label: state.h5_usertype_info.userTypeId == 2 ? node.depart_name : node.group_name,
        children: node.children,
    };
};


// 
const handleLimitText = (count) => {
    return count + '+'
}

const handleInput = (val) => {

    if (parseInt(val) > 28) {
        state.secondMerchantInfo.reconciliationDay = 28
    }
    if (parseInt(val) < 1) {
        state.secondMerchantInfo.reconciliationDay = 1
    }
}

const main = () => {
    onMounted(() => {
        getsecondList()
        getCompanyMiniList()
    })
    return {
        ...newState,
        queryData,
        resetData,
        changePageIndex,
        changePageSize,
        openAddDialog,
        getCompanyMiniList,
        submitAdd,
        searchPlatformData,
        selectCompany,
        getsecondList,
        getUserDepartList,
        getUserGroupList,
        selectUserType,
        getCanteenMiniList,
        getPlatformList,
        getFacilityList,
        createNewData,
        updateCommercial,
        normalizer,
        handleLimitText,
        normalizerConsume,
        getAllClientType,
        handleInput,
        objectSpanMethod,
        handleRevamp
    }

}

export {
    main,
    ruleFormRef
}