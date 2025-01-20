import { yqPaymentListApi, updateYqFormApi, platformAlliListApi, userDepartListApi, userGroupListApi, canteenMiniListApi, clientMiniListApi } from '@/api/yqMerchantPayment'
import { allPayPlatFormApi } from '@/api/merchantPayment'
import { allClientTypeApi } from '@/api/clientType'
import { reactive, toRefs, onMounted } from "vue";
import { companyMiniListApi } from '@/api/company'
import { ElMessage } from "element-plus";
import { deepCopy } from "@/utils/object"
import { treeData } from '@/utils/tree'

const state = reactive({
    pageSize: 10,
    pageIndex: 1,
    pageTotal: 0,
    keyWords: '',
    companyId: '',//企业id
    tableData: [],
    platformAllList: [],
    payPlatFormId: [],
    departList: [],
    userGroupList: [],
    updateDialogVisible: false,//配置是否打开
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
    h5PayUserTypeList: [
        {
            id: 1,
            name: '按用户类型'
        },
        {
            id: 2,
            name: '按档口'
        }
    ],
    h5_recharge_info: {
        userTypeId: "",
        userDepartIds: [],
        userGroupIds: []
    },
    back_recharge_info: {
        userTypeId: '',
        userDepartIds: [],
        userGroupIds: []
    },
    h5_pay_info: {
        collectionTypeId: '',
        userTypeId: "",
        canteenIds: [],
        userDepartIds: [],
        userGroupIds: []
    },
    client_pay_info: {
        clientIds: [],
    },
    canteenMiniList: [],
    companyMerchantInfo: {},
    payTypeInfo: {},
    clientMiniList: [],
    clientTypeList: [],
    facilityAllList: [],
    allPayPlatFormList: [
        {
            name: "微信",
            pay_type_code: "W"
        }
    ],
    centerDialogVisible: true,
    treeDataList: [],
    treeDataUser: [],
    treeCheckedId: [],

    props: {
        multiple: true,
        label: "canteen_name",
        value: "ids",
        emitPath: false
    }
})

const main = () => {
    const newState = toRefs(state)

    //点击查询按钮
    const queryData = (() => {
        state.pageIndex = 1
        getYqPaymentList()

    })
    //点击刷新resetData按钮
    const resetData = (() => {
        state.keyWords = ''
        state.payPlatFormId = []
        state.pageIndex = 1
        getYqPaymentList()

    })
    const changePageSize = (newPageSize) => {
        state.pageIndex = 1
        state.pageSize = newPageSize
        getYqPaymentList()
    }
    const changePageIndex = (newPageIndex) => {
        state.pageIndex = newPageIndex
        getYqPaymentList()
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

    //处理支付方式信息 对象转数组
    // const handelPlatform = (merchantList, obj) => {
    //     let arr = []
    //     if (merchantList.length) {
    //         merchantList.forEach(item => {
    //             if (Object.prototype.hasOwnProperty.call(obj, item.key)) {
    //                 arr.push({
    //                     key: item.key,
    //                     payTypeName: codeToName(item.key),
    //                     ...obj[item.key],
    //                     isShowH5Recharge: obj.all
    //                 })
    //             }
    //             else {
    //                 arr.push(null)
    //             }
    //         })
    //     }
    //     return arr
    // }


    //支付平台信息  对象转数组
    // const objectToArray = (obj) => {
    //     let arr = []
    //     for (let k in obj) {
    //         arr.push({
    //             key: k,
    //             payTypeName: codeToName(k),
    //             ...obj[k],
    //         })
    //     }
    //     return arr
    // }

    // 操作对象转数组
    // const handleObjToArr = (arr, obj) => {
    //     let result = []
    //     arr.forEach(x => {
    //         if (Object.prototype.hasOwnProperty.call(obj, x.key)) {
    //             result.push({
    //                 key: x.key,
    //                 ...obj[x.key]
    //             })
    //         }
    //         else {
    //             result.push(null)
    //         }
    //     })
    //     return result
    // }
    //处理支付方式信息 对象转数


    const objectToArray = (obj) => {
        let arr = [];
        for (let k in obj) {
            arr.push({
                plat: codeToName(k),
                key: k,
                ...obj[k],
            });
        }
        return arr;
    }

    // 操作对象转数组
    const handleObjToArr = (arr, obj) => {
        let result = [];
        arr.forEach((x) => {
            if (Object.prototype.hasOwnProperty.call(obj, x.key)) {
                result.push({
                    key: x.key,
                    ...obj[x.key],
                });
            } else {
                result.push(null);
            }
        });
        return result;
    }


    //获取企业商户支付平台列表数据
    const getYqPaymentList = async () => {
        const res = await yqPaymentListApi({
            page: state.pageIndex,
            page_size: state.pageSize,
            keyword: state.keyWords,
            pay_type_code: state.payPlatFormId.length !== 0 ? state.payPlatFormId.join(',') : ''
        })
        state.pageTotal = res?.total

        res.data.forEach((item) => {
            item.info.forEach((item1) => {
                item1.data = objectToArray(item1.mch_form_info).length ? objectToArray(item1.mch_form_info) : [1];
                item1.h5_recharge_arr = handleObjToArr(item1.data, item1.h5_recharge);
                item1.back_recharge_arr = handleObjToArr(item1.data, item1.back_recharge);
                item1.h5_pay_arr = handleObjToArr(item1.data, item1.h5_pay);
                item1.client_pay_arr = handleObjToArr(item1.data, item1.client_pay);
            });
        });
        // res.data.forEach((items) => {
        //     items.info.forEach((item) => {
        //         const mch_form_info = objectToArray(item.mch_form_info)
        //         item.mch_form_info_arr = handelPlatform(mch_form_info, item.mch_form_info)
        //         item.h5_recharge_arr = handleObjToArr(item.mch_form_info_arr, item.h5_recharge)
        //         item.back_recharge_arr = handleObjToArr(item.mch_form_info_arr, item.back_recharge)
        //         item.h5_pay_arr = handleObjToArr(item.mch_form_info_arr, item.h5_pay)
        //         item.client_pay_arr = handleObjToArr(item.mch_form_info_arr, item.client_pay)
        //     })
        // })
        state.tableData = handeTableData(res.data)
        console.log(state.tableData, "数据列表");



        // state.tableData.forEach((item) => {
        //     item.info.forEach((item1) => {
        //         item1.h5_recharge_arr = []
        //         item1.back_recharge_arr = []
        //         item1.h5_pay_arr = []
        //         item1.client_pay_arr = []
        //     })
        // })
        // state.tableData.forEach((item1) => {
        //     item1.info.forEach((item) => {
        //         if (item.h5_recharge.all !== 1) {
        //             Object.keys(item.h5_recharge).filter(z => z !== "all").forEach((x) => {
        //                 item.h5_recharge_arr.push(
        //                     {
        //                         isShowH5Recharge: 0,
        //                         user_data: item.h5_recharge[x].user_data,
        //                         user_type: item.h5_recharge[x].user_type,
        //                         user_data_name: item.h5_recharge[x].user_data_name,
        //                         pay_type: x
        //                     }
        //                 )
        //             })
        //         } else {
        //             Object.keys(item.h5_recharge).forEach(() => {
        //                 item.h5_recharge_arr.push(
        //                     {
        //                         isShowH5Recharge: item.h5_recharge.all
        //                     }
        //                 )
        //             })
        //         }

        //         if (item.back_recharge.all !== 1) {
        //             Object.keys(item.back_recharge).filter(z => z !== "all").forEach((x) => {
        //                 item.back_recharge_arr.push(
        //                     {
        //                         isShowBackRecharge: 0,
        //                         user_data: item.back_recharge[x].user_data,
        //                         user_type: item.back_recharge[x].user_type,
        //                         user_data_name: item.back_recharge[x].user_data_name,
        //                         pay_type: x
        //                     }
        //                 )
        //             })
        //         } else {
        //             Object.keys(item.back_recharge).forEach(() => {
        //                 item.back_recharge_arr.push(
        //                     {
        //                         isShowBackRecharge: item.back_recharge.all,
        //                     }
        //                 )
        //             })
        //         }

        //         if (item.h5_pay.all !== 1) {
        //             Object.keys(item.h5_pay).filter(z => z !== "all").forEach((x) => {
        //                 item.h5_pay_arr.push(
        //                     {
        //                         isShowH5Pay: 0,
        //                         pay_type: x,
        //                         user_data: item.h5_pay[x].user_data,
        //                         user_type: item.h5_pay[x].user_type,
        //                         user_data_name: item.h5_pay[x].user_data_name,
        //                     }
        //                 )
        //             })
        //         } else {
        //             Object.keys(item.h5_pay).forEach(() => {
        //                 item.h5_pay_arr.push(
        //                     {
        //                         isShowH5Pay: item.h5_pay.all
        //                     }
        //                 )
        //             })
        //         }

        //         if (item.client_pay.all !== 1) {
        //             Object.keys(item.client_pay).filter(z => z !== "all").forEach((x) => {
        //                 item.client_pay_arr.push(
        //                     {
        //                         isShowClientPay: 0,
        //                         client_data: item.client_pay[x].client_data,
        //                         user_data_name: item.client_pay[x].user_data_name,
        //                         pay_type: x,
        //                     }
        //                 )
        //             })
        //         } else {
        //             Object.keys(item.client_pay).forEach(() => {
        //                 item.client_pay_arr.push(
        //                     {
        //                         isShowClientPay: item.h5_pay.all
        //                     }
        //                 )
        //             })
        //         }
        //     })



        // })

        // state.tableData.forEach((item1) => {
        //     item1.info.forEach((item => {
        //         item.data = []
        //         if (!Array.isArray(item.mch_company)) {
        //             Object.keys(item.mch_form_info).forEach((y) => {
        //                 item.data.push({
        //                     pay_type: y,
        //                     name: item.mch_form_info[y].name,
        //                     pay_type_id: item.mch_form_info[y].pay_type_id,
        //                     type: item.mch_form_info[y].type
        //                 })
        //             })
        //         }
        //     }))

        // })

        // state.tableData.forEach((item1) => {
        //     item1.info.forEach((item) => {
        //         item.data = []
        //         if (!Array.isArray(item.mch_company)) {
        //             Object.keys(item.mch_form_info).forEach((y) => {
        //                 item.data.push({
        //                     pay_type: y,
        //                     name: item.mch_form_info[y].name,
        //                     pay_type_id: item.mch_form_info[y].pay_type_id,
        //                     type: item.mch_form_info[y].type
        //                 })
        //             })
        //         }
        //         item.data.forEach((x) => {
        //             item.h5_recharge_arr.forEach((y) => {
        //                 if (x.pay_type == y.pay_type) {
        //                     x.h5_recharge = {
        //                         isShowH5Recharge: y.isShowH5Recharge,
        //                         pay_type: y.pay_type,
        //                         user_data_name: y.user_data_name,
        //                         user_data: y.user_data,
        //                         user_type: y.user_type
        //                     }
        //                 }
        //             })
        //             item.back_recharge_arr.forEach((y) => {
        //                 if (x.pay_type == y.pay_type) {
        //                     x.back_recharge = {
        //                         isShowBackRecharge: y.isShowBackRecharge,
        //                         pay_type: y.pay_type,
        //                         user_data_name: y.user_data_name,
        //                         user_data: y.user_data,
        //                         user_type: y.user_type
        //                     }
        //                 }
        //             })
        //             item.h5_pay_arr.forEach((y) => {
        //                 if (x.pay_type == y.pay_type) {
        //                     x.h5_pay = {
        //                         isShowH5Pay: y.isShowH5Pay,
        //                         pay_type: y.pay_type,
        //                         user_data_name: y.user_data_name,
        //                         user_data: y.user_data,
        //                         user_type: y.user_type
        //                     }
        //                 }
        //             })
        //             item.client_pay_arr.forEach((y) => {
        //                 if (x.pay_type == y.pay_type) {
        //                     x.client_pay = {
        //                         isShowClientPay: y.isShowClientPay,
        //                         client_data: y.client_data,
        //                         user_data_name: y.user_data_name,
        //                         pay_type: y.pay_type,
        //                     }
        //                 }
        //             })
        //         })
        //     })

        // })
    }


    //  表格数据处理
    const handeTableData = (tableData) => {
        let result = []
        tableData.forEach((item) => {
            item.info.forEach((child, childIndex) => {
                if (child.data.length) {
                    child.data.forEach((two, twoIndex) => {
                        result.push({
                            key: two.key,
                            company_id: child.company_id,
                            company_name: item.company_name,
                            company_no: item.company_no,
                            mchId: child.id,
                            mchName: child.name,
                            platform: two.plat,
                            merchant: two.name,
                            h5_recharge: child.h5_recharge_arr[twoIndex],
                            back_recharge: child.back_recharge_arr[twoIndex],
                            h5_pay: child.h5_pay_arr[twoIndex],
                            client_pay: child.client_pay_arr[twoIndex],
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
        console.log(arr, "arr");
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
        if (columnIndex === 2) {
            return {
                rowspan: row.twoRowSpan, // 待合并行数 -- 合并的行数长度就等于之前赋值的子数据的长度；未赋值的即表示0，不显示
                colspan: row.twoRowSpan > 0 ? 1 : 0, // 待合并列数 -- 合并的列数自身占一列，被合并的要返回0，表示不显示
            };
        }
    }


    //获取所有支付平台信息
    const getAllPayPlatFormList = async () => {
        const res = await allPayPlatFormApi({
        })
        state.allPayPlatFormList = res ?? []
    }

    const getCompanyMiniList = async () => {
        const res = await companyMiniListApi()
        state.addCompanyForm.companyMiniList = res ?? []
    }


    const getPlatformAlliList = async () => {
        const res = await platformAlliListApi()
        state.platformAllList = res ?? []
    }
    //获取所有用户组列表数据
    const getUserGroupList = async () => {
        const res = await userGroupListApi({
            company_id: state.companyId
        })
        state.userGroupList = res ?? []
        state.treeDataUser = res ?? []

    }

    //获取所有部门列表数据
    const getUserDepartList = async () => {
        const res = await userDepartListApi({
            company_id: state.companyId
        })
        state.departList = treeData(deepCopy(res)) ?? []
    }

    //获取所有企业食堂列表
    const getCanteenMiniList = async () => {
        const res = await canteenMiniListApi({
            company_id: state.companyId
        })
        state.canteenMiniList = res ?? []
        console.log(res, "食堂");
    }

    //获取所有设备列表
    const getClientMiniList = async () => {
        const res = await clientMiniListApi({
            company_id: state.companyId
        })
        state.clientMiniList = res ?? []
        state.clientMiniList.map(x => Object.assign(x, {
            disabled: x.status == 0 ? true : false
        }))
        if (res) {
            state.facilityAllList = await facilityDataIntegration(deepCopy(state.canteenMiniList), state.clientTypeList, deepCopy(state.clientMiniList))
            console.log(state.facilityAllList, 'state.facilityAllList');
        }
        console.log(res, "设备列表");

    }

    // 获取所有设备类型列表
    const getAllClientType = async () => {
        const res = await allClientTypeApi()
        state.clientTypeList = res ?? []
        console.log(res, "设备类型列表");
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
            arr3.forEach((v) => { v.canteen_name = `${v.client_name ? v.client_name : ''}(${v.client_no})`, v.ids = v.id })
            return arr3.filter((v) => v.client_type_id == id)
        }
        arr2.forEach((x) => {
            x.children = getTypeNodes(x.id)
            x.canteen_name = x.name
        })
        arr1.forEach((x) => { x.children = getNodesId(x.id), x.ids = x.id })
        return arr1
    }


    //关闭编辑企业用户
    const addDialogClosed = () => {
        state.updateDialogVisible = false
    }


    //打开配置窗口
    const openConfigureClick = async (info, bitem) => {
        console.log(info, bitem, "info, bitem");
        state.companyId = info.company_id
        state.payTypeInfo = bitem
        state.companyMerchantInfo = info
        state.updateDialogVisible = true
        getUserGroupList()

        getUserDepartList()
        await clearFormInfo()
        await getCanteenMiniList()
        await getAllClientType()
        await getClientMiniList()
        await handleFormInfo()

    }

    //打开配置窗口
    const handleRevamp = async (row) => {
        // console.log(row);
        if (row.key) {
            state.companyId = row.company_id
            state.companyMerchantInfo = row
            state.updateDialogVisible = true
            getUserGroupList()

            getUserDepartList()
            await clearFormInfo()
            await getCanteenMiniList()
            await getAllClientType()
            await getClientMiniList()
            await handleFormInfo()
        } else {
            ElMessage.warning({
                message: '暂未关联支付平台',
                showClose: true
            })
        }

    }

    //赋值表单数据
    const handleFormInfo = async () => {
        console.log(state.companyMerchantInfo, 'state.companyMerchantInfo');
        let h5Rercharge = state.companyMerchantInfo.h5_recharge
        let backRecharge = state.companyMerchantInfo.back_recharge
        let h5Pay = state.companyMerchantInfo.h5_pay
        let clientPay = state.companyMerchantInfo.client_pay
        state.h5_recharge_info.userTypeId = h5Rercharge ? h5Rercharge.user_type : ''
        if (state.h5_recharge_info.userTypeId == 1) {
            state.h5_recharge_info.userGroupIds = h5Rercharge && h5Rercharge.user_data.length != 0 ? h5Rercharge.user_data.split(',').map(Number) : []
        } else if (state.h5_recharge_info.userTypeId == 2) {
            state.h5_recharge_info.userDepartIds = h5Rercharge && h5Rercharge.user_data.length != 0 ? h5Rercharge.user_data.split(',').map(Number) : []
        }
        state.back_recharge_info.userTypeId = state.h5_recharge_info.userTypeId
        if (state.back_recharge_info.userTypeId == 1) {
            state.back_recharge_info.userGroupIds = backRecharge && backRecharge.user_data.length != 0 ? backRecharge.user_data.split(',').map(Number) : []
        } else if (state.back_recharge_info.userTypeId == 2) {
            state.back_recharge_info.userDepartIds = backRecharge && backRecharge.user_data.length != 0 ? backRecharge.user_data.split(',').map(Number) : []
        }
        state.h5_pay_info.collectionTypeId = h5Rercharge ? h5Pay.pay_type : ""
        state.h5_pay_info.userTypeId = h5Rercharge ? h5Pay.user_type : ""
        if (state.h5_pay_info.collectionTypeId == 2) {
            state.h5_pay_info.canteenIds = h5Pay && h5Pay.canteen_data.length !== 0 ? h5Pay.canteen_data.split(',').map(Number) : []
        }else{
            if (state.h5_pay_info.userTypeId == 1) {
                state.h5_pay_info.userGroupIds = h5Pay && h5Pay?.user_data.length !== 0 ? h5Pay?.user_data.split(',').map(Number) : []
            } else if (state.h5_pay_info.userTypeId == 2) {
                state.h5_pay_info.userDepartIds = h5Pay && h5Pay?.user_data.length !== 0 ? h5Pay.user_data?.split(',').map(Number) : []
            }
        }


        state.client_pay_info.clientIds = clientPay && clientPay.client_data.length !== 0 ? clientPay.client_data.split(',').map(Number) : ''


        console.log(state.h5_pay_info,'state.h5_pay_info');

        // let backRecharge = state.payTypeInfo.back_recharge
        // let h5Pay = state.payTypeInfo.h5_pay
        // let clientPay = state.payTypeInfo.client_pay
        // state.h5_recharge_info.userTypeId = h5Rercharge ? h5Rercharge.user_type : ''
        // if (state.h5_recharge_info.userTypeId == 1) {
        //     state.h5_recharge_info.userGroupIds = h5Rercharge && h5Rercharge.user_data.length != 0 ? h5Rercharge.user_data.split(',').map(Number) : []
        // } else if (state.h5_recharge_info.userTypeId == 2) {
        //     state.h5_recharge_info.userDepartIds = h5Rercharge && h5Rercharge.user_data.length != 0 ? h5Rercharge.user_data.split(',').map(Number) : []
        // }

        // state.back_recharge_info.userTypeId = state.h5_recharge_info.userTypeId
        // if (state.back_recharge_info.userTypeId == 1) {
        //     state.back_recharge_info.userGroupIds = backRecharge && backRecharge.user_data.length != 0 ? backRecharge.user_data.split(',').map(Number) : []
        // } else if (state.back_recharge_info.userTypeId == 2) {
        //     state.back_recharge_info.userDepartIds = backRecharge && backRecharge.user_data.length != 0 ? backRecharge.user_data.split(',').map(Number) : []
        // }


        // state.h5_pay_info.collectionTypeId = h5Rercharge ? h5Pay.pay_type : ""
        // state.h5_pay_info.userTypeId = h5Rercharge ? h5Pay.user_type : ""
        // if (state.h5_pay_info.userTypeId == 1) {
        //     state.h5_pay_info.userGroupIds = h5Pay && h5Pay.user_data.length !== 0 ? h5Pay.user_data.split(',').map(Number) : []
        // } else if (state.h5_pay_info.userTypeId == 2) {
        //     state.h5_pay_info.userDepartIds = h5Pay && h5Pay.user_data.length !== 0 ? h5Pay.user_data.split(',').map(Number) : []

        // }
        // if (state.h5_pay_info.collectionTypeId == 2) {
        //     state.h5_pay_info.canteenIds = h5Pay && h5Pay.canteen_data.length !== 0 ? h5Pay.canteen_data.split(',').map(Number) : []
        // }


        // if (state.companyMerchantInfo.info.length == 0) {
        //     clearFormInfo()
        // } else {

        // }
    }

    //清空配置收费场景表单数据
    const clearFormInfo = async () => {
        state.h5_recharge_info.userTypeId = ''
        state.h5_recharge_info.userGroupIds = []
        state.h5_recharge_info.userDepartIds = []
        state.client_pay_info.clientIds = []
        state.back_recharge_info.userTypeId = ''
        state.back_recharge_info.userGroupIds = []
        state.back_recharge_info.userDepartIds = []

        state.h5_pay_info.userTypeId = ''
        state.h5_pay_info.userGroupIds = []
        state.h5_pay_info.userDepartIds = []
        state.h5_pay_info.canteenIds = []
    }



    //关闭配置窗口
    const updateDialogClosed = () => {
        state.updateDialogVisible = false
    }

    // 当前选中/用户组/部门
    const selectUserType = (val) => {
        state.back_recharge_info.userTypeId = val
    }



    //确定配置
    const submitUpdate = async () => {
        // let obj = {}
        // state.companyMerchantInfo.mch_form_info_arr.map(item => {
        //     if (item.key == state.payTypeInfo.key) {
        //         obj[item.key] = {
        //             name: item.name,
        //             pay_type_id: item.pay_type_id,
        //         }
        //     }
        // })

        let h5_recharge_obj = {}
        let h5_recharge_arr = []
        h5_recharge_arr.push({
            type: state.companyMerchantInfo.key,
            user_type: state.h5_recharge_info.userTypeId,
            user_data: state.back_recharge_info.userTypeId == 1 ? state.h5_recharge_info.userGroupIds.join(',') : state.h5_recharge_info.userDepartIds.join(',')
        })
        h5_recharge_arr.map((e) => {
            h5_recharge_obj[e.type] = {
                user_type: e.user_type,
                user_data: e.user_data
            };
        });

        let back_recharge_obj = {}
        let back_recharge_arr = []
        back_recharge_arr.push({
            type: state.companyMerchantInfo.key,
            user_type: state.back_recharge_info.userTypeId,
            user_data: state.back_recharge_info.userTypeId == 1 ? state.back_recharge_info.userGroupIds.join(',') : state.back_recharge_info.userDepartIds.join(',')
        })
        back_recharge_arr.map((e) => {
            back_recharge_obj[e.type] = {
                user_type: e.user_type,
                user_data: e.user_data
            };
        });

        let h5_pay_obj = {}
        let h5_pay_arr = []

        console.log(state.h5_pay_info.userTypeId, ' state.h5_pay_info.userTypeId');
        console.log(state.h5_pay_info.userGroupIds, 'state.h5_pay_info.userGroupIds');
        h5_pay_arr.push({
            pay_type: state.h5_pay_info.collectionTypeId,
            type: state.companyMerchantInfo.key,
            user_type: state.h5_pay_info.userTypeId,
            canteen_data: state.h5_pay_info.canteenIds.join(','),
            user_data: state.h5_pay_info.userTypeId == 1 ? state.h5_pay_info.userGroupIds.join(',') : state.h5_pay_info.userDepartIds.join(',')
        })
        h5_pay_arr.map((e) => {
            if (state.h5_pay_info.collectionTypeId == 1) {
                h5_pay_obj[e.type] = {
                    pay_type: e.pay_type,
                    user_type: e.user_type,
                    user_data: e.user_data,
                };
            } else {
                h5_pay_obj[e.type] = {
                    pay_type: e.pay_type,
                    user_type: e.user_type,
                    canteen_data: e.canteen_data
                };
            }
        });


        let client_pay_obj = {}
        let client_pay_arr = []
        client_pay_arr.push({
            type: state.companyMerchantInfo.key,
            client_data:state.client_pay_info.clientIds?state.client_pay_info.clientIds.join(','):state.client_pay_info.clientIds
        })
        client_pay_arr.map((e) => {
            client_pay_obj[e.type] = {
                client_data: e.client_data
            };
        });



        const res = await updateYqFormApi({
            company_id: state.companyId,
            name: state.companyMerchantInfo.mchName,
            h5_recharge: h5_recharge_obj,
            back_recharge: back_recharge_obj,
            h5_pay: h5_pay_obj,
            client_pay: client_pay_obj
        }, state.companyMerchantInfo.mchId)
        if (res) {
            ElMessage.success({
                message: '编辑成功！',
                showClose: true
            })
            state.updateDialogVisible = false
            getYqPaymentList()
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

    //配置选项 H5/后台/充值
    const normalizerPay = (node) => {
        return {
            id: node.id,
            label: state.h5_pay_info.userTypeId == 2 ? node.depart_name : node.group_name,
            children: node.children,
        };
    };

    //设备选项
    const normalizeRfacility = (node) => {
        return {
            id: node.ids,
            label: node.canteen_name,
            children: node.children,
        };
    }

    onMounted(() => {
        getYqPaymentList()
        getAllPayPlatFormList()
        getPlatformAlliList()
    })

    return {
        ...newState,
        queryData,
        resetData,
        changePageIndex,
        changePageSize,
        updateDialogClosed,
        openConfigureClick,
        addDialogClosed,
        submitUpdate,
        getYqPaymentList,
        getCompanyMiniList,
        getPlatformAlliList,
        getUserGroupList,
        getUserDepartList,
        getCanteenMiniList,
        selectUserType,
        handleFormInfo,
        clearFormInfo,
        getAllPayPlatFormList,
        normalizer,
        normalizerPay,
        normalizeRfacility,
        objectSpanMethod,
        handleRevamp
    }

}




export {
    main
}
