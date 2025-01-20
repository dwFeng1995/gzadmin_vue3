// 获取相同编号的数组
export const getOrderNumber = (tableData,OrderIndexArr,company_noArr) => {
    let OrderObj = {};
    let company_noObj = {};
    tableData.forEach((element, index) => {
        element.rowIndex = index;
        // console.log(element.company_name,OrderObj[element.company_name])
        if (OrderObj[element.company_name]) {
            let nextItem =tableData[index].company_name
                ? tableData[index].company_name
                : undefined;
            let prevItem = tableData[index - 1].company_name
                ? tableData[index - 1].company_name
                : undefined;
            if (element.company_name == nextItem) {
                OrderObj[element.company_name].push(index);
            } else if (element.company_name == prevItem) {
                OrderObj[element.company_name].push(index);
            }
        } else {
            OrderObj[element.company_name] = [];
            OrderObj[element.company_name].push(index);
        }
        if (company_noObj[element.company_no]) {
            let nextPro = tableData[index].company_no
                ? tableData[index].company_no
                : undefined;
            let prevPro = tableData[index - 1].company_no
                ? tableData[index - 1].company_no
                : undefined;
            if (element.company_no == nextPro) {
                company_noObj[element.company_no].push(index);
            } else if (element.company_no == prevPro) {
                company_noObj[element.company_no].push(index);
            }
        } else {
            company_noObj[element.company_no] = [];
            company_noObj[element.company_no].push(index);
        }
    });
    // 将数组长度大于1的值 存储到this.OrderIndexArr（也就是需要合并的项）
    for (let k in OrderObj) {
        if (OrderObj[k].length > 1) {
            handleData1(OrderObj[k],OrderIndexArr);
        }
    }
    for (let i in company_noObj) {
        if (company_noObj[i].length > 1) {
            handleData2(company_noObj[i],company_noArr);
        }
    }
}



// 处理当数组的长度大于2的时候
const handleData1 = (data,OrderIndexArr) => {
    let temp = data;
    let itemArr = [];
    let itemArrNew = [];
    let resArr = [];
    if (data.length > 2) {
        for (let i = 0; i < data.length; i++) {
            if (data[i + 1]) {
                if (data[i + 1] - data[i] > 1) {
                    itemArr = data.slice(0, i + 1);
                    itemArrNew = temp.slice(i + 1, temp.length);
                    break;
                } else {
                    resArr = data;
                    console.log(resArr);
                }
            }
        }
        if (itemArr.length > 0 || itemArrNew.length > 0) {
            OrderIndexArr.push(itemArr);
           OrderIndexArr.push(itemArrNew);
        } else {
           OrderIndexArr.push(data);
        }
    } else {
        OrderIndexArr.push(data);
    }
}

// 处理当数组的长度大于2的时候
const handleData2 = (data,company_noArr) => {
    let temp = data;
    let itemArr = [];
    let itemArrNew = [];
    let resArr = [];
    if (data.length > 2) {
        for (let i = 0; i < data.length; i++) {
            if (data[i + 1]) {
                if (data[i + 1] - data[i] > 1) {
                    itemArr = data.slice(0, i + 1);
                    itemArrNew = temp.slice(i + 1, temp.length);
                    break;
                } else {
                    resArr = data;
                    console.log(resArr);
                }
            }
        }
        if (itemArr.length > 0 || itemArrNew.length > 0) {
            company_noArr.push(itemArr);
            company_noArr.push(itemArrNew);
        } else {
            company_noArr.push(data);
        }
    } else {
        company_noArr.push(data);
    }
}

