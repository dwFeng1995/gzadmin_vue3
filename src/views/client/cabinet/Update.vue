<template>
    <div>
        <el-form ref="formRef" size="small" :model="formParams" :rules="formRules" label-width="80px">
            <el-form-item label="设备编号" prop="cabinet_id">
                <el-input v-model.trim="formParams.cabinet_id" placeholder="请输入设备编号" ></el-input>
            </el-form-item>
            <el-form-item label="设备名称" prop="cabinet_name">
                <el-input v-model.trim="formParams.cabinet_name" placeholder="请输入设备名称" ></el-input>
            </el-form-item>
            <el-form-item label="食堂名称" prop="canteen_id">
                <el-select class="w-100"  clearable  v-model="formParams.canteen_id" placeholder="请选择食堂">
                    <el-option
                            v-for="item in canteenMiniList"
                            :key="item.id"
                            :label="item.canteen_name"
                            :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="店铺地址" prop="shop_address">
                <el-input v-model.trim="formParams.shop_address" placeholder="请输入设备名称" ></el-input>
            </el-form-item>
            <el-form-item label="店铺电话" prop="shop_phone">
                <el-input v-model.trim="formParams.shop_phone" placeholder="请输入店铺电话" ></el-input>
            </el-form-item>
            <el-form-item label="取餐柜管理员密码" prop="admin_code">
                <el-input v-model.trim="formParams.admin_code" placeholder="请输入取餐柜管理员密码" ></el-input>
            </el-form-item>
            <el-form-item label="启用状态" prop="is_on">
                <el-switch v-model="formParams.is_on" active-color="#13ce66" inactive-color="#d4d9e1"  :active-value="1" :inactive-value="0" />
            </el-form-item>
            <el-form-item label="备注" prop="describe">
                <el-input v-model.trim="formParams.describe" placeholder="请输入备注"  ></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import  {main, formParams, formRef, formRules } from '@/hooks/client/cabinet/update.js'
    export default {
        name: "Update",
        props: {
            detail: {
                required: true,
                type: Object,
                default: ()=> {}
            }
        },
        setup(props, {emit}) {
            return {
                ...main(props, emit),
                formParams,
                formRef,
                formRules,
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
