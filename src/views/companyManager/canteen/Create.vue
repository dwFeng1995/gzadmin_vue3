<template>
    <div class="create-container">
        <div class="centent pl-12 pr-12">
            <el-form ref="formRef" :model="formParams" size="mini" label-width="120px" :rules="formRules">
                <el-form-item label="食堂编号" prop="canteen_no">
                    <el-input v-model.trim="formParams.canteen_no" placeholder="请输入食堂编号" maxlength="2"></el-input>
                </el-form-item>
                <el-form-item label="企业名称" prop="company_id">
                    <el-select filterable v-model="formParams.company_id" placeholder="请选择企业" class="w-100">
                        <el-option
                            v-for="item in companyMiniList"
                            :key="item.id"
                            :label="item.company_name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="食堂名称" prop="canteen_name">
                    <el-input v-model.trim="formParams.canteen_name" placeholder="请输入食堂名称" ></el-input>
                </el-form-item>
                <el-form-item label="食堂电话" prop="canteen_phone">
                    <el-input v-model.trim="formParams.canteen_phone" placeholder="请输入食堂电话" ></el-input>
                </el-form-item>
                <el-form-item label="食堂地址" prop="canteen_address">
                    <el-input v-model.trim="formParams.canteen_address" placeholder="请输入食堂地址"></el-input>
                </el-form-item>
                <el-form-item label="appid" prop="appid">
                    <el-input v-model.trim="formParams.appid" placeholder="请输入appid" ></el-input>
                </el-form-item>
                <el-form-item label="Secret key" prop="secret_key">
                    <el-input v-model.trim="formParams.secret_key" placeholder="请输入Secret key" ></el-input>
                </el-form-item>
                <el-form-item label="人脸系统" prop="pay_system" >
                    <el-select filterable v-model="formParams.face_system" placeholder="请选择人脸系统" class="w-100" collapse-tags multiple>
                        <el-option
                                v-for="item in faceSystemList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="H5支付系统" prop="pay_system" >
                    <el-select filterable v-model="formParams.pay_system" placeholder="请选择H5支付系统" class="w-100" collapse-tags multiple>
                        <el-option
                                v-for="item in paySystemList"
                                :key="item.id"
                                :label="item.system_name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备注" prop="remark">
                    <el-input v-model.trim="formParams.remark" placeholder="请输入备注" ></el-input>
                </el-form-item>
                <el-form-item label="H5线上订餐订单状态">
                    <el-radio v-model="formParams.verity_status" :label="0">关闭</el-radio>
                    <el-radio v-model="formParams.verity_status" :label="1">开启</el-radio>
                    <el-form-item v-if="formParams.verity_status === 1" label="订单状态" prop="place_status" >
                        <el-select filterable v-model="formParams.place_status" placeholder="请选择订单状态">
                            <el-option
                                v-for="item in lineOrderStatus"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form-item>
                <el-form-item label="营业开始时间" prop="startTime">
                    <el-time-picker v-model="formParams.startTime" format="HH:mm" value-format="HH:mm"   placeholder="开始时间"></el-time-picker>
                </el-form-item>
                <el-form-item label="营业结束时间" prop="endTime">
                    <el-time-picker v-model="formParams.endTime" format="HH:mm"  value-format="HH:mm"   placeholder="开始时间"></el-time-picker>
                </el-form-item>
                <el-form-item label="设备默认密码">
                    <el-input type="password" v-model.trim="formParams.password" show-password  placeholder="请输入设备默认密码" ></el-input>
                </el-form-item>
<!--                -->
            </el-form>
        </div>
        <div class="footer flex-row align-center">
            <div class="text-center w-50 mb-50">
                <el-button type="primary" @click="submit(emit)" size="mini">确定</el-button>
            </div>
            <div class="text-center w-50 mb-50">
                <el-button  @click="cancel" size="mini">取消</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import  {main, formRef, formRules} from '@/hooks/companyManager/canteen/create'
export default {
    name: "Create",
    setup(props, {emit}) {
        const cancel = ()=>{
            console.log('点击了取消')
            emit('refreshData', false)
        }
        return {
            ...main(),
            formRef,
            formRules,
            cancel,
            emit
        }
    }
}
</script>

<style lang="scss" scoped>
.create-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .centent {
        height: calc(100vh - 150px);
        overflow-y: auto;
    }
    .footer {
        min-height: 120px;
    }
}
</style>
