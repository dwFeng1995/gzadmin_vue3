<template>
    <div>
        <el-form size="mini"  :model="formParams" :rules="formRules" label-width="120px"  ref="formRef">
            <PlatformMerchantTips />
            <el-form-item prop="company_id" label="企业名称">
                <el-select filterable clearable :disabled="formParams.path_key!== '' || formParams.path_crt !== ''" class="w-100" v-model="formParams.company_id" placeholder="请选择企业">
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
            <el-form-item prop="appid" label="缴费编号">
                <el-input    v-model.trim="formParams.appid" ></el-input>
            </el-form-item>
            <el-form-item prop="redirect_url" label="重定向地址">
                <el-input   v-model.trim="formParams.redirect_url" />
            </el-form-item>
            <el-form-item label="加密私钥">
                <div class="certificate-upload">
                    <el-upload :headers="uploadHeader"
                               :auto-upload="false" :limit ="1"
                               class="upload-demo" ref="keyUploadRef"
                               :on-exceed="keyUploadExceed"
                               :on-change="keyBeforeAvatarUpload"
                               :on-error="keyUploadError"
                               :on-remove="keyRemoveFile"
                               :on-success="keyUploadSuccess"
                               drag  :multiple="false" :file-list="keyFileList"
                               :action="`${uploadFilePath}?company_id=${formParams.company_id}`">
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                        <template #tip>
                            <div class="el-upload__tip">
                                只能上传.key文件
                            </div>
                        </template>
                    </el-upload>
                    <el-button @click="keyUploadFile()" size="mini" type="primary" >点击上传</el-button>
                </div>
            </el-form-item>
            <el-form-item label="解密公钥">
                <div  class="certificate-upload ">
                    <el-upload :headers="uploadHeader"
                            :auto-upload="false" :limit ="1"
                            class="upload-demo" ref="crtUploadRef"
                            :on-exceed="crtUploadExceed"
                            :on-change="crtBeforeAvatarUpload"
                            :on-error="crtUploadError"
                            :on-remove="crtRemoveFile"
                            :on-success="crtUploadSuccess"
                            drag  :multiple="false" :file-list="crtFileList"
                            :action="`${uploadFilePath}?company_id=${formParams.company_id}`">
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                        <template #tip>
                            <div class="el-upload__tip">
                                只能上传.crt文件
                            </div>
                        </template>
                    </el-upload>
                    <el-button @click="crtUploadFile()" size="mini" type="primary" >点击上传</el-button>
                </div>
            </el-form-item>
            <el-form-item prop="remark" label="备注">
                <el-input   v-model.trim="formParams.remark" />
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {formParams,
        formRef,
        uploadFilePath,
        uploadHeader,
        crtRemoveFile,
        keyRemoveFile,
        crtUploadSuccess,
        keyUploadSuccess,
        keyUploadError,
        crtUploadError,
        crtBeforeAvatarUpload,
        keyBeforeAvatarUpload,
        keyUploadExceed,
        crtUploadExceed,
        keyUploadFile,
        crtUploadFile,
        main,keyUploadRef,
        crtUploadRef} from '@/hooks/mch/parametersAbc/create.js'
    import formRules from '@/hooks/mch/parametersAbc/formRules.js'
    import PlatformMerchantTips from '@/components/mch/PlatformMerchantTips.vue'
    export default {
        name: "Create",
        components: {
            PlatformMerchantTips
        },
        setup(props, {emit}) {
            return {
                formParams,
                formRef,
                uploadFilePath,
                uploadHeader,
                crtRemoveFile,
                keyRemoveFile,
                crtUploadSuccess,
                keyUploadSuccess,
                keyUploadError,
                crtUploadError,
                crtBeforeAvatarUpload,
                keyBeforeAvatarUpload,
                keyUploadExceed,
                crtUploadExceed,
                keyUploadFile,
                crtUploadFile,
                ...main(emit),
                formRules,
                keyUploadRef,
                crtUploadRef
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
