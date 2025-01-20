<template>
    <div>
        <el-form ref="createFormRef" :model="createParams"  :rules="formRules" label-width="80px" size="small">
             <el-form-item prop="code" label="代号">
                 <el-input v-model.trim="createParams.code" placeholder="请输入代号"></el-input>
             </el-form-item>
            <el-form-item prop="code_name" label="代号名称">
                <el-input v-model.trim="createParams.code_name" placeholder="请输入代号名称"></el-input>
            </el-form-item>
            <el-form-item prop="type" label="配置方式">
                <el-select v-model="createParams.type" placeholder="请选择配置方式" class="w-100">
                    <el-option v-for="item in configModeList" :label="item.label" :value="item.value" :key="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="remark" label="备注">
                <el-input  type="textarea" :rows="3" v-model.trim="createParams.remark" placeholder="请输入备注"></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import { configModeList, formRules, createParams,createFormRef} from '@/hooks/companyManager/companyFunction.js'
export default {
    setup( props, {emit}) {
        const submit = () =>{
            emit('submitCreate', createParams)
        }
        return {
            configModeList,
            formRules,
            createFormRef,
            createParams,
            submit
        }
    }
}
</script>
<style lang="scss" scoped>

</style>
