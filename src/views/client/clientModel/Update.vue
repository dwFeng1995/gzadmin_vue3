<template>
    <div>
        <el-form ref="formRef" size="small" :model="formParams" :rules="formRules" label-width="80px">
            <el-form-item label="名称" prop="fun_name">
                <el-input v-model.trim="formParams.fun_name" placeholder="请输入名称" ></el-input>
            </el-form-item>
            <el-form-item label="模式" prop="fun_type">
                <el-input v-model.trim="formParams.fun_type" placeholder="请输入模式" ></el-input>
            </el-form-item>
            <el-form-item label="设备类型" prop="fun_type_id">
                <el-select class="w-100" filterable  clearable v-model="formParams.fun_type_id" placeholder="请选择设备类型">
                    <el-option
                            v-for="item in clientTypeMiniList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="备注" prop="remark">
                <el-input v-model.trim="formParams.remark" placeholder="请输入备注"  ></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import  {main, formParams, formRef, formRules } from '@/hooks/client/clientModel/update.js'
    export default {
        name: "Update",
        props: {
            detail: {
                type: Object,
                required: true,
                default: ()=>{}
            }
        },
        setup(props, {emit}) {
            return {
                ...main(props,emit),
                formParams,
                formRef,
                formRules,
            }
        }
    }
</script>

<style scoped>

</style>
