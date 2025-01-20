<template>
    <div>
        <el-form ref="formRef" size="small" :model="formParams" :rules="formRules" label-width="100px">
            <el-form-item label="选择食堂：" prop="canteen_id">
                <el-select class="w-100" filterable clearable  v-model="formParams.canteen_id" placeholder="请选择食堂">
                    <el-option
                            v-for="item in canteenMiniList"
                            :key="item.id"
                            :label="item.canteen_name"
                            :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="设备类型：" prop="client_type">
                <el-select class="w-100" filterable clearable v-model="formParams.client_type" placeholder="请选择设备类型">
                    <el-option
                            v-for="item in clientTypeMiniList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.client_type">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="开始编号：" prop="start_num">
                <el-input v-model.trim="formParams.start_num" maxlength="2" placeholder="请输入设备开始编号" />
            </el-form-item>
            <el-form-item label="结束编号：" prop="end_num">
                <el-input v-model.trim="formParams.end_num" maxlength="2" placeholder="请输入设备结束编号" />
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {main, formRef,formParams, formRules} from '@/hooks/client/logCanteenClientStore/create.js'
    export default {
        name: "Create",
        setup(props, {emit}) {
            return {
                ...main(emit),
                formRef,
                formParams,
                formRules
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
