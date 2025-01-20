<template>
  <div>
    <el-form
      ref="formRef"
      :model="formParams"
      :rules="formRules"
      label-width="95px"
      size="mini"
    >
      <el-form-item label="企业" prop="company_id">
        <el-select
          clearable
          filterable
          v-model="formParams.company_id"
          placeholder="请选择企业"
          class="w-100"
        >
          <el-option
            v-for="item in companyMiniList"
            :key="item.id"
            :label="item.company_name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="设备类型" prop="client_type_code">
        <el-select
          class="w-100"
          :disabled="formParams.download_url !== ''"
          filterable
          clearable
          v-model="formParams.client_type_code"
          placeholder="请选择设备类型"
        >
          <el-option
            v-for="item in clientTypeMiniList"
            :key="item.id"
            :label="item.name"
            :value="item.client_type"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="版本号" prop="version">
        <el-input v-model.trim="formParams.version" placeholder="请输入版本号"></el-input>
      </el-form-item>
      <el-form-item label="版本状态" prop="status">
        <el-select
          class="w-100"
          clearable
          v-model="formParams.status"
          placeholder="请选择版本状态"
        >
          <el-option
            v-for="item in statusList"
            :key="item.id"
            :label="item.label"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否强制更新" prop="is_force">
        <el-switch
          v-model="formParams.is_force"
          active-color="#13ce66"
          inactive-color="#d4d9e1"
          :active-value="1"
          :inactive-value="0"
        />
      </el-form-item>
      <el-form-item label="软件包" prop="download_url">
        <div class="certificate-upload">
          <el-upload
            :data="uploadData"
            :auto-upload="false"
            :limit="1"
            ref="uploadRef"
            :on-exceed="uploadExceed"
            :on-change="beforeAvatarUpload"
            :on-error="uploadError"
            :on-remove="removeFile"
            :on-success="uploadSuccess"
            drag
            :multiple="false"
            :file-list="fileList"
            :action="uploadPath"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <template #tip>
              <div class="el-upload__tip">
                <!--                                只能上传.pem文件-->
              </div>
            </template>
          </el-upload>
          <div v-if="formParams.download_url" class="font-size-13">
            下载地址：{{ formParams.download_url }}
          </div>
          <el-button @click="uploadFile()" size="mini" type="primary">点击上传</el-button>
        </div>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input
          type="textarea"
          v-model="formParams.remark"
          :rows="2"
          placeholder="请输入备注"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
  main,
  formRef,
  formParams,
  uploadRef,
  uploadExceed,
  uploadFile,
  uploadError,
  beforeAvatarUpload,
  uploadSuccess,
  removeFile,
  uploadData,
} from "@/hooks/software/softVersion/update";
import statusList from "@/hooks/software/softVersion/statusList";
import formRules from "@/hooks/software/softVersion/formRules";
export default {
  name: "Update",
  props: {
    clientTypeMiniList: {
      type: Array,
      default: () => [],
    },
    detail: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, { emit }) {
    return {
      ...main(props, emit),
      formRef,
      formParams,
      statusList,
      uploadRef,
      uploadExceed,
      uploadFile,
      uploadError,
      beforeAvatarUpload,
      uploadSuccess,
      removeFile,
      uploadData,
      formRules,
    };
  },
};
</script>

<style lang="scss" scoped></style>
