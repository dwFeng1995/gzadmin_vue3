<template>
    <div>
        <el-form size="small" :model="formParams" label-width="120px"  :rules="formRules" ref="formRef">
            <PlatformMerchantTips />
            <el-form-item prop="company_id" label="企业名称">
                <el-select filterable clearable class="w-100"  :disabled="formParams.rsa2_key_path !== ''" v-model="formParams.company_id" placeholder="请选择企业">
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
                <el-input   v-model.trim="formParams.appid" />
            </el-form-item>
            <el-form-item label="密钥证书" prop="rsa2_key_path">

                <div class="certificate-upload" >
                    <el-upload    :auto-upload="false" :limit ="1" :headers="uploadHeader"
                                  class="upload-demo" ref="pemUploadRef"
                                  :on-exceed="uploadExceed"
                                  :on-change="beforeAvatarUpload"
                                  :on-error="uploadError"
                                  :on-remove="removeFile"
                                  :on-success="uploadSuccess"
                                  drag  :multiple="false" :file-list="fileList"
                                 :action="`${uploadFilePath}?company_id=${formParams.company_id}`">
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">
                            将文件拖到此处，或<em>点击上传</em>
                        </div>
                        <template #tip>
                            <div class="el-upload__tip">
                                只能上传.pem文件
                            </div>
                        </template>
                    </el-upload>
                    <el-button @click="uploadFile()" size="mini" type="primary" >点击上传</el-button>
                </div>
            </el-form-item>
            <el-form-item prop="remark" label="备注">
                <el-input   v-model.trim="formParams.remark" />
            </el-form-item>
            <el-form-item prop="rsa2" label="Rsa2">
                <el-input   v-model.trim="formParams.rsa2" />
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {  formRef,
        formParams,
        uploadSuccess,
        removeFile,
        uploadFile,
        uploadError,
        uploadFilePath,
        uploadExceed,
        beforeAvatarUpload,
        uploadHeader,
        pemUploadRef,
        main} from '@/hooks/mch/parametersAlipay/create.js'
    import formRules from '@/hooks/mch/parametersAlipay/formRules.js'
    import PlatformMerchantTips from '@/components/mch/PlatformMerchantTips.vue'
    export default {
        name: "Create",
        components: {
            PlatformMerchantTips
        },
        setup(props, {emit}) {
          return {
              formRef,
              formParams,
              uploadSuccess,
              removeFile,
              uploadFile,
              uploadError,
              uploadFilePath,
              uploadExceed,
              beforeAvatarUpload,
              uploadHeader,
              formRules,
              pemUploadRef,
              ...main(emit),
          }
        }
    }
</script>

<style  lang="scss" scoped>

</style>
