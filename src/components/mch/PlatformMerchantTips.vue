<template>
    <div>
        <el-form-item label="一商户模式">
            <el-alert  type="success"  :closable="false">
                则此商户作为此类支付渠道的唯一收款商户，涉及多个商家运营需分账时，则需手动或者客户后台【二级商户管理】去完成充值二清，消费二清的划分。
            </el-alert>
        </el-form-item>
        <el-form-item label="多商户模式">
            <el-alert  type="success"  :closable="false">
                则此类支付渠道的存在多个收款商户，
                此时需要在此企业后台【一清平台支付配置】配置各商户的收款场景，充值场景，H5下单支付场景，设备消费场景。
            </el-alert>
        </el-form-item>
    </div>
</template>
<script>
export default {
    name: 'PlatformMerchantTips',
    setup() {
        return {
            
        }
    }
}
</script>
<style lang="sass" scoped>

</style>