import { merchantPaymentListApi, merchantPlatformminiListApi, platformAlliListApi, addCompanyFormApi, updateCompanyFormApi, allPayPlatFormApi } from '@/api/merchantPayment'
import { reactive, toRefs, onMounted, ref } from "vue";
import { companyMiniListApi } from '@/api/company'
import { ElMessage } from "element-plus";

const createChildRef = ref(null)

const state = reactive({
    pageSize: 10,
    pageIndex: 1,
    pageTotal: 0,
    isQuery: false,
    keyWords: '',
    tableData: [],
    updateDialogVisible: false,//编辑企业商户对话框
    addDialogVisible: false,//添加企业商户对话框
    companyInfo: {
        company_name: ''
    },
    companyMerchantInfo: {
        name: "",
        mch_form_info: {}
    },
    companyMiniList: [],
    platformminiList: [],
    platformAllList: [],//供全部支付平台选择数据
    tempPlatformAllList: [],
    payPlatFormId: [],//已选择的支付平台数据
    companyId: '',//企业id
    addCompanyForm: {
        companyMiniList: [],
        company_name: '',
        payPlatFormList: []
    },
    createDialogVisible: false,
    allPayPlatFormList: [
        {
            name: "微信",
            pay_type_code: "W"
        }
    ],
    payType: '',
    mchPlatformList: []
})

const main = () => {
    const newState = toRefs(state)

    //点击查询按钮
    const queryData = (() => {
        state.pageIndex = 1
        getMerchantPaymentList()

    })
    //点击刷新resetData按钮
    const resetData = (() => {
        state.keyWords = ''
        state.payPlatFormId = []
        state.pageIndex = 1
        getMerchantPaymentList()

    })
    const changePageSize = (newPageSize) => {
        state.pageIndex = 1
        state.pageSize = newPageSize
        getMerchantPaymentList()
    }
    const changePageIndex = (newPageIndex) => {
        state.pageIndex = newPageIndex
        getMerchantPaymentList()
    }

    //判断商户类型
    const codeToName = (code) => {
        let name;
        switch (true) {
            case code === null:
                name = "null";
                break;
            case code === undefined:
                name = "undefined";
                break;
            case code === "W":
                name = "微信";
                break;
            case code === "Z":
                name = "支付宝";
                break;
            case code === "PCI":
                name = "佳都缴费中心";
                break;
            case code === "IKU":
                name = "酷点支付";
                break;
            case code === "ABC_CENTER":
                name = "农行缴费中心";
                break;
            case code === "ABC":
                name = "农行综合收银台";
                break;
            case code === "GEZI":
                name = "虚拟钱包";
                break;
            default:
                name = code;
        }
        return name;
    }
    // 平台商户信息对象转数组
    const objectToArray = (obj) => {
        let arr = [];
        for (let k in obj) {
            arr.push({
                key: codeToName(k),
                k: k,
                ...obj[k],
            });
        }
        return arr;
    }


    //获取最后子级数据
    const getlastChild = (item) => {
        let arr = [];
        item.mch_company.forEach((child) => {
            arr = arr.concat(child.data);
        });
        return arr;
    }

    //获取企业商户支付平台列表数据
    const getMerchantPaymentList = async () => {
        const res = await merchantPaymentListApi({
            page: state.pageIndex,
            page_size: state.pageSize,
            keyword: state.keyWords,
            pay_type_code: state.payPlatFormId.join(',')
        })
        res.data.forEach((item) => {
            item.mch_company.forEach((item1) => {
                item1.data = objectToArray(item1.mch_form_info).length ? objectToArray(item1.mch_form_info) : [{ key: '' }];
            });
        });
        state.tableData = handeTableData(res.data)

        // state.tableData = res.data
        state.pageTotal = res?.total



        // state.tableData.forEach((item) => {
        //     item.mch_company.forEach((x) => {
        //         x.data = []
        //         if (x.mch_form_info) {
        //             Object.keys(x.mch_form_info).forEach((y) => {
        //                 x.data.push({
        //                     pay_tpye: y,
        //                     name: x.mch_form_info[y] ? x.mch_form_info[y].name : '',
        //                     pay_type_id: x.mch_form_info[y].pay_type_id,
        //                     type: x.mch_form_info[y].type
        //                 })
        //             })
        //         }
        //     })
        // })

    }

    // 表格数据重构
    const handeTableData = (tableDatas) => {
        let result = []
        tableDatas.forEach((item) => {
            item.mch_company.forEach((child, childIndex) => {
                if (child.data.length) {
                    child.data.forEach((two, twoIndex) => {
                        result.push({
                            company_name: item.company_name,
                            company_no: item.company_no,
                            company_id: child.company_id,
                            mchName: child.name,
                            platform: two.key,
                            merchant: two.name,
                            mchInfo: child.data,
                            mchId: child.id,
                            mch_form_info: child.mch_form_info,
                            oneRowSpan:
                                childIndex === 0 && twoIndex === 0 ? getlastChild(item).length : 0, //  最为层要合并多少行 取决于最里面那层有多少个  （孙级）
                            twoRowSpan: twoIndex === 0 ? child.data.length : 0, //第二层要合并几个 取决于它的子集有多少个
                        });
                    });
                }
            });
        });
        return result
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
        if (columnIndex === 5) {
            return {
                rowspan: row.twoRowSpan, // 待合并行数 -- 合并的行数长度就等于之前赋值的子数据的长度；未赋值的即表示0，不显示
                colspan: row.twoRowSpan > 0 ? 1 : 0, // 待合并列数 -- 合并的列数自身占一列，被合并的要返回0，表示不显示
            };
        }
    }


    const getCompanyMiniList = async () => {
        const res = await companyMiniListApi()
        state.addCompanyForm.companyMiniList = res ?? []
    }

    //获取所有支付平台信息
    const getAllPayPlatFormList = async () => {
        const res = await allPayPlatFormApi({
        })
        state.allPayPlatFormList = res ?? []
    }
    //获取对应企业的商户支付平台信息
    const getMerchantPlatformminiList = async () => {
        const res = await merchantPlatformminiListApi({
            company_id: state.companyId
        })
        state.addCompanyForm.payPlatFormList = res ?? []
        console.log(res, 'res');
        if (state.addDialogVisible) {
            state.platformAllList.forEach((x) => {
                x.checked = false
                Object.keys(state.addCompanyForm.payPlatFormList).forEach((y) => {
                    if (x.type == y) {
                        x.data = state.addCompanyForm.payPlatFormList[y]
                    }
                })
            })
        }

        if (state.updateDialogVisible) {
            state.platformAllList.forEach((x) => {
                x.checked = false
                x.payPlatFormId = ''
                Object.keys(state.addCompanyForm.payPlatFormList).forEach((v) => {
                    if (x.type == v) {
                        x.data = state.addCompanyForm.payPlatFormList[v]
                    }
                })
                state.companyMerchantInfo.mchInfo.forEach((y) => {
                    if (x.type == y.k) {
                        x.checked = true
                        x.payPlatFormId = y.pay_type_id
                    }
                })
            })
        }


    }


    const getPlatformAlliList = async () => {
        const res = await platformAlliListApi()
        state.platformAllList = res ?? []
        if (res) {
            getMerchantPlatformminiList()
        }
    }

    //打开添加企业商户对话框
    const openAddDialog = () => {
        state.addDialogVisible = true
        state.companyId = ""
        state.platformAllList = []
        state.addCompanyForm.company_name = ''
        getCompanyMiniList()

    }
    //关闭编辑企业用户
    const addDialogClosed = () => {
        state.addDialogVisible = false
    }
    //确定添加企业商户
    const submitAdd = async () => {
       
        if (!state.companyId) return ElMessage.warning({ message: '请选择企业！', showClose: true })
        if (!state.addCompanyForm.company_name) return ElMessage.warning({ message: '企业商户名称不能为空！', showClose: true })
        let obj = {}
        let arr = state.platformAllList.filter(x => x.checked)
        console.log(arr,' console.log(arr);');
        if (arr.length == 0) return ElMessage.warning({ message: '请绑定第三方支付平台！', showClose: true })
        if (!arr.every(x => x.payPlatFormId)) return ElMessage.warning({ message: '请绑定平台商户号！', showClose: true })
        arr.map((e) => {
            console.log(e);
            obj[e.type] = {
                name: e.data.find(x => e.payPlatFormId == x.id).name,
                pay_type_id: e.data.find(x => e.payPlatFormId == x.id).id,
                type: e.data.length > 1 ? "twoMch" : "oneMch"
            };
        });
        console.log("111arr", arr)
        console.log("222arr", obj)
        const res = await addCompanyFormApi({
            company_id: state.companyId,
            name: state.addCompanyForm.company_name,
            mch_form_info: JSON.parse(JSON.stringify(obj))
        })
        if (res) {
            ElMessage.success({
                message: '添加成功！',
                showClose: true
            })
            state.addDialogVisible = false
            getMerchantPaymentList()
        }
    }


    //打开编辑企业用户
    const handleRevamp = (row) => {
        state.platformAllList = []
        state.companyMerchantInfo = row
        state.companyId = row.company_id
        state.updateDialogVisible = true
        getPlatformAlliList()
    }


    //关闭编辑企业用户
    const updateDialogClosed = () => {
        state.updateDialogVisible = false
    }

    //确定编辑企业用户
    const submitUpdate = async () => {
        console.log(1111);
        if (!state.companyMerchantInfo.mchName) return ElMessage.warning({ message: '企业商户名称不能为空！', showClose: true })
        let obj = {}
        let arr = state.platformAllList.filter(x => x.checked)
        if (arr.findIndex(x => x.payPlatFormId == "") !== -1) return ElMessage.warning({ message: '请绑定对应商户号！', showClose: true })
        arr.map((e) => {
            obj[e.type] = {
                name: e.data.find(x => e.payPlatFormId == x.id).name,
                pay_type_id: e.data.find(x => e.payPlatFormId == x.id).id,
                type: e.data.length > 1 ? "twoMch" : "oneMch"
            };
        });
        console.log(arr, 11111);
        const res = await updateCompanyFormApi({
            company_id: state.companyId,
            name: state.companyMerchantInfo.mchName,
            mch_form_info: JSON.parse(JSON.stringify(obj))
        }, state.companyMerchantInfo.mchId)
        if (res) {
            ElMessage.success({
                message: '编辑成功！',
                showClose: true
            })
            state.updateDialogVisible = false
            getMerchantPaymentList()
        }

    }

    //快捷添加企业商户
    const quickAdd = (type) => {
        state.createDialogVisible = true
        state.payType = type
    }

    const changeBox = () => {
        state.platformAllList = JSON.parse(JSON.stringify(state.platformAllList))
    }

    const createDialogClosed = () => {
        createChildRef.value.resterForm()
    }


    const submitCreate = () => {
        createChildRef.value.submitForm()

    }
    const refreshData = (flag) => {
        console.log(flag)
        getMerchantPlatformminiList()
        state.createDialogVisible = false
    }

    const handleClose = () => {
        console.log("关闭");
        state.createDialogVisible = false
    }

    //选择企业获取对应支付平台的信息
    const selectCompany = () => {
        state.addCompanyForm.payPlatFormList = []
        getPlatformAlliList()

    }

    onMounted(() => {
        getMerchantPaymentList()
        getPlatformAlliList()
        getAllPayPlatFormList()
    })

    return {
        ...newState,
        queryData,
        resetData,
        changePageIndex,
        changePageSize,
        updateDialogClosed,
        openAddDialog,
        addDialogClosed,
        submitAdd,
        submitUpdate,
        getMerchantPaymentList,
        getCompanyMiniList,
        getMerchantPlatformminiList,
        getPlatformAlliList,
        selectCompany,
        quickAdd,
        getAllPayPlatFormList,
        createDialogClosed,
        submitCreate,
        changeBox,
        refreshData,
        objectSpanMethod,
        handleRevamp,
        handleClose
    }

}




export {
    main,
    createChildRef
}