<template>
    <div>
        <el-form ref="formRef" :model="formParams"  :rules="formRules" label-width="120px" size="small">
            <el-form-item label="企业名称" prop="company_id">
                <el-select filterable clearable disabled  v-model="formParams.company_id" placeholder="请选择企业" class="w-100">
                    <el-option
                            v-for="item in companyMiniList"
                            :key="item.id"
                            :label="item.company_name"
                            :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="设备功能" prop="client_fun_id">
                <el-select filterable  clearable disabled v-model="formParams.client_fun_id" placeholder="请选择设备功能" class="w-100">
                    <el-option
                            v-for="item in companyFnList"
                            :key="item.client_fun_id"
                            :label="item.client_fun.fun_name"
                            :value="item.client_fun_id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="设备功能配置" prop="client_fun_info_id">
                <el-select filterable clearable  disabled v-model="formParams.client_fun_info_id" placeholder="请选择设备功能配置" class="w-100">
                    <el-option
                            v-for="item in companyFnInfoList"
                            :key="item.client_fun_info_id"
                            :label="item.client_fun_info.name"
                            :value="item.client_fun_info_id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="数据" prop="data">
                <el-input v-model.trim="formParams.data" placeholder="请输入数据"></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {main, formRef, formRules} from '@/hooks/companyManager/companyClientFun/update'
    export default {
        name: "Update",
        props: {
            detail: {
                type: Object
            }
        },
        setup(props, {emit}) {
            return {
                ...main(props, emit),
                formRef,
                formRules
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
