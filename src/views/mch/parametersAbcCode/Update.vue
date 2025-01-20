<template>
    <div>
        <el-form size="small" :model="formParams" label-width="140px"  :rules="formRules" ref="formRef">
            <PlatformMerchantTips />
            <el-form-item  prop="company_id" label="企业名称">
                <el-select disabled class="w-100" v-model="formParams.company_id" placeholder="请选择企业">
                    <el-option
                            v-for="item in companyMiniList"
                            :key="item.id"
                            :label="item.company_name"
                            :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="name" label="支付平台商户名称">
                <el-input   v-model.trim="formParams.name"  placeholder="请输入支付平台商户名称" />
            </el-form-item>
            <el-form-item prop="appid" label="appid">
               <el-input type="textarea"    :rows="2"  v-model.trim="formParams.appid" />
            </el-form-item>
            <div class="w-100 flex-row align-center">
                <div class="w-50">
                    <el-form-item prop="merchant_password" label="商户私钥加密密码">
                        <el-input   v-model.trim="formParams.merchant_password" />
                    </el-form-item>
                </div>
                <div class="w-50">
                    <el-form-item prop="store_password" label="农行根证书文件密码">
                        <el-input   v-model.trim="formParams.store_password" />
                    </el-form-item>
                </div>
            </div>
            <el-form-item prop="pay_cert_file" label="网上平台支付证书">
                <el-input   v-model.trim="formParams.pay_cert_file" />
            </el-form-item>
            <el-form-item prop="store_file" label="农行根证书文件">
                <el-input   v-model.trim="formParams.store_file" />
            </el-form-item>
            <el-form-item prop="mch_id" label="商户编号">
                <el-input   v-model.trim="formParams.mch_id" />
            </el-form-item>
            <el-form-item prop="log_path" label="交易日志文件存放目录">
                <el-input   v-model.trim="formParams.log_path" />
            </el-form-item>
            <el-form-item prop="err_url" label="错误访问链接">
                <el-input   v-model.trim="formParams.err_url" />
            </el-form-item>
            <el-form-item label="商户证书">
                <div class="flex-row align-end">
                    <div class="certificate-upload">
                        <el-upload  :headers="uploadHeader"
                                    :auto-upload="false" :limit ="1"
                                    class="upload-demo" ref="pfxUploadRef"
                                    :on-exceed="uploadExceed"
                                    :on-change="beforeAvatarUpload"
                                    :on-error="uploadError"
                                    :on-remove="removeFile"
                                    :on-success="uploadSuccess"
                                    drag  :multiple="false" :file-list="fileList"
                                    :action="`${uploadFilePath}?company_id=${formParams.company_id}`">
                            <i class="el-icon-upload"></i>
                            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                            <template #tip>
                                <div class="el-upload__tip">
                                    只能上传.pfx文件
                                </div>
                            </template>
                        </el-upload>
                        <el-button @click="uploadFile()" size="mini" type="primary" >点击上传</el-button>
                    </div>
                    <div class="ml-20">
                        <div>
                            原始值：{{formParams.merchant_cert_file  }}
                            <a class="ml-15" @click="formParams.merchant_cert_file   = ''" v-if="formParams.merchant_cert_file  " href="javascript:void(0)">清空</a>
                        </div>
                        <div>如不上传文件将不更改"商户证书"字段的值</div>
                    </div>
                </div>

            </el-form-item>
            <el-form-item prop="remark" label="备注">
                <el-input   v-model.trim="formParams.remark" />
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {pfxUploadRef,
        formParams,
        formRef,
        main,
        uploadFilePath,
        uploadHeader,
        uploadFile,
        uploadExceed,
        beforeAvatarUpload,
        uploadError,
        uploadSuccess,
        removeFile} from '@/hooks/mch/parametersAbcCode/update.js'
    import formRules from '@/hooks/mch/parametersAbcCode/formRules.js'
    import PlatformMerchantTips from '@/components/mch/PlatformMerchantTips.vue'
    export default {
        name: "Update",
        components: {
            PlatformMerchantTips
        },
        props: {
            detail: {
                required: true,
                type: Object,
                default: ()=> {}
            }
        },
        setup(props, {emit}) {
            return {
                pfxUploadRef,
                formParams,
                formRef,
                ...main(props, emit),
                uploadFilePath,
                uploadHeader,
                uploadFile,
                uploadExceed,
                beforeAvatarUpload,
                uploadError,
                uploadSuccess,
                removeFile,
                formRules
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
