<template>
    <div>
        <el-form ref="formRef" :model="formParams" :rules="formRules" label-width="120px" size="mini">
            <el-form-item label="设备唯一标识">
                <el-input disabled v-model.trim="formParams.uuid"></el-input>
            </el-form-item>
            <el-form-item label="企业名称" prop="username">
                <el-input disabled v-model.trim="formParams.company_name" ></el-input>
            </el-form-item>
            <el-form-item label="食堂名称">
                <el-input disabled   v-model.trim="formParams.canteen_name" ></el-input>
            </el-form-item>
            <el-form-item label="设备类型">
                <el-input disabled   v-model.trim="formParams.client_type_name" ></el-input>
            </el-form-item>
            <el-form-item label="设备编号">
                <el-input disabled   v-model.trim="formParams.client_no" ></el-input>
            </el-form-item>
            <el-form-item label="当前软件版本号">
                <el-input disabled   v-model.trim="formParams.cur_version" ></el-input>
            </el-form-item>
            <el-form-item label="分配软件版本号" prop="client_version_id">
                <el-select clearable  filterable  v-model="formParams.client_version_id" placeholder="选择版本号" class="w-100">
                    <el-option
                            v-for="item in clientVersionList"
                            :key="item.id"
                            :label="item.version"
                            :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {main, formRef, formParams} from '@/hooks/software/clientVersion/update.js'
    import formRules from '@/hooks/software/clientVersion/formRules.js'
    export default {
        name: "Update",
        props: {
            detail: {
                type: Object,
                default: ()=>{}
            }
        },
        setup(props, {emit}) {
            return {
                formRef,
                formParams,
                formRules,
                ...main(props, emit)
            }
        }
    }
</script>

<style  lang="scss" scoped>

</style>
