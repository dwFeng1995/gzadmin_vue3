<template>
    <div>
        <el-form ref="formRef" :model="formParams" :rules="formRules" label-width="80px" size="mini">
            <el-form-item label="名称" prop="name">
                <el-input v-model.trim="formParams.name" placeholder="请输入名称"></el-input>
            </el-form-item>
            <el-form-item label="Logo" prop="logo">
                <el-upload
                        class="avatar-uploader" name="logo" :headers="uploadHeaders"
                        :action="uploadPath"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :on-error="handleAvatarError"
                        :before-upload="beforeAvatarUpload">
                    <el-image  v-if="formParams.logo"  :src="formParams.logo" class="avatar"></el-image>
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="英文名" prop="en_name">
                <el-input v-model.trim="formParams.en_name" placeholder="请输入英文名"></el-input>
            </el-form-item>
            <el-form-item label="大标题" prop="title">
                <el-input v-model.trim="formParams.title" placeholder="请输入大标题"></el-input>
            </el-form-item>
            <el-form-item label="小标语" prop="summary">
                <el-input v-model.trim="formParams.summary" placeholder="请输入小标语"></el-input>
            </el-form-item>
            <el-form-item label="简介" prop="synopsis">
                <Tinymce @getContent="getSynopsisContent"  :resize="true"  />
            </el-form-item>
            <el-form-item label="icp" prop="icp">
                <Tinymce @getContent="getIcpConetnt" :resize="true"   />
                <!--                <el-input v-model.trim="formParams.synopsis" placeholder="请输入大标题"></el-input>-->
            </el-form-item>
            <el-form-item label="是否开启" >
                <el-switch v-model="formParams.is_on" active-color="#13ce66" inactive-color="#d4d9e1"  :active-value="1" :inactive-value="0" />
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {formParams, formRef, getIcpConetnt, getSynopsisContent, formRules, handleAvatarSuccess,
            beforeAvatarUpload, handleAvatarError, uploadHeaders, uploadPath, resetForm, submitForm, getEmit} from '@/hooks/companyManager/config/create'
    import Tinymce from '@/components/editor/Tinymce'
    export default {
        name: "Create",
        components: {
            Tinymce
        },
        setup(props, {emit}) {
            getEmit(emit)
            return {
                formParams,
                formRef,
                getIcpConetnt,
                getSynopsisContent,
                formRules,
                handleAvatarSuccess,
                beforeAvatarUpload,
                handleAvatarError,
                uploadHeaders,
                uploadPath,
                resetForm,
                submitForm
            }
        }
    }
</script>

<style lang="scss" scoped>
    .avatar-uploader {
        /deep/ .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            &:hover {
                border-color: #409eff;
            }
        }
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height:178px ;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>
