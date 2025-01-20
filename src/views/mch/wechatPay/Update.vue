<template>
    <div>
        <el-form size="mini"  :model="formParams" label-width="120px"  :rules="formRules" ref="formRef">
            <PlatformMerchantTips />
            <el-form-item prop="company_id" label="企业名称">
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
            <div class="w-100 flex-row  align-center">
                <div class="w-50">
                    <el-form-item prop="appid" label="微信公众平台APPID">
                        <el-input    v-model.trim="formParams.appid" ></el-input>
                    </el-form-item>
                </div>
                 <div class="w-50">
                    <el-form-item prop="mch_id" label="微信支付MCH_ID">
                        <el-input   v-model.trim="formParams.mch_id" />
                    </el-form-item>
                </div>
            </div>
            <div class="w-100 flex-row align-center">
                <div class="w-50">
                    <el-form-item prop="key" label="微信支付key">
                        <el-input   v-model.trim="formParams.key" />
                    </el-form-item>
                </div>
                <div class="w-50">
                    <el-form-item prop="app_sert" label="开发者密钥">
                        <el-input   v-model.trim="formParams.app_sert" />
                    </el-form-item>
                </div>
            </div>
            <div class="w-100 flex-row align-center">
                <div class="w-50">
                    <el-form-item prop="template_id" label="模板ID">
                        <el-input   v-model.trim="formParams.template_id" />
                    </el-form-item>
                </div>
                <div class="w-50">
                    <el-form-item prop="template_cabinet" label="取餐柜模板id">
                        <el-input   v-model.trim="formParams.template_cabinet" />
                    </el-form-item>
                </div>
            </div>
            <div class="w-100 flex-row align-center">
                <div class="w-50">
                    <el-form-item prop="template_mini_order" label="接单通知模板ID">
                        <el-input   v-model.trim="formParams.template_mini_order" />
                    </el-form-item>
                </div>
                <div class="w-50">
                    <el-form-item prop="url_h5" label="h5链接地址">
                        <el-input   v-model.trim="formParams.url_h5" />
                    </el-form-item>
                </div>    
            </div>
                <div class="w-100 flex-row align-center">
                 <div class="w-50">
                    <el-form-item prop="template_call" label="取餐通知模板ID">
                        <el-input   v-model.trim="formParams.template_call" />
                    </el-form-item>
                </div>  
            </div>
           <el-form-item prop="remark" label="备注">
                <el-input   v-model.trim="formParams.remark" />
            </el-form-item>
            <el-form-item label="cert证书">
                <div class="flex-row align-end">
                    <div class="certificate-upload">
                        <el-upload   drag :auto-upload="false" :headers="uploadHeader"
                                     class="upload-demo" ref="keyUploadRef"
                                     :on-exceed="keyUploadExceed"  :limit ="1"
                                     :on-change="keyBeforeAvatarUpload"
                                     :on-error="keyUploadError"
                                     :on-remove="keyRemoveFile"
                                     :on-success="keyUploadSuccess"
                                     :multiple="false" :file-list="keyFileList"
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
                        <el-button @click="keyUploadFile()" size="mini" type="primary" >点击上传</el-button>
                    </div>
                    <div class="ml-20">
                        <div>
                            原始值：{{formParams.cert_path  }}
                            <a class="ml-15" @click="formParams.cert_path  = ''" v-if="formParams.cert_path " href="javascript:void(0)">清空</a>
                        </div>
                        <div>如不上传文件将不更改"cert证书"字段的值</div>
                    </div>
                </div>
            </el-form-item>
            <el-form-item label="key证书">
                <div class="flex-row align-end">
                    <div class="certificate-upload" >
                        <el-upload   drag :limit ="1"   ref="pubUploadRef"  :auto-upload="false"
                                     :on-exceed="pubUploadExceed"  :headers="uploadHeader"
                                     :on-change="pubBeforeAvatarUpload"
                                     :on-error="pubUploadError"
                                     :on-remove="pubRemoveFile"
                                     :on-success="pubUploadSuccess"
                                     :multiple="false" :file-list="pubFileList"
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
                        <el-button @click="pubUploadFile()" size="mini" type="primary" >点击上传</el-button>
                    </div>
                    <div class="ml-20">
                        <div>
                            原始值：{{formParams.key_path }}
                            <a class="ml-15" @click="formParams.key_path = ''" v-if="formParams.key_path" href="javascript:void(0)">清空</a>
                        </div>
                        <div>如不上传文件将不更改"key证书"字段的值</div>
                    </div>
                </div>

            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {formParams, formRef, keyUploadRef, pubUploadRef,
        keyUploadFile, pubUploadFile, keyUploadExceed, pubUploadExceed,
        keyBeforeAvatarUpload, pubBeforeAvatarUpload, keyUploadError,
        pubUploadError, keyUploadSuccess, pubUploadSuccess,
        keyRemoveFile, pubRemoveFile, main, uploadFilePath,uploadHeader} from '@/hooks/mch/wechatPay/update.js'
    import formRules from '@/hooks/mch/wechatPay/formRules.js'
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
                formParams,
                formRules,
                formRef,
                keyUploadRef,
                pubUploadRef,
                keyUploadFile,
                pubUploadFile,
                keyUploadExceed,
                pubUploadExceed,
                keyBeforeAvatarUpload,
                pubBeforeAvatarUpload,
                keyUploadError,
                pubUploadError,
                keyUploadSuccess,
                pubUploadSuccess,
                keyRemoveFile,
                pubRemoveFile,
                ...main(props, emit),
                uploadFilePath,
                uploadHeader
            }
        }
    }
</script>

<style scoped>

</style>
