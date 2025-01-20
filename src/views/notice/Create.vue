<template>
  <div>
    <el-form
      :model="formParams"
      :rules="formRules"
      ref="formRef"
      label-width="80px"
      size="mini"
    >
      <el-form-item v-if="Info.code == 'ADMIN'" label="升级提示" prop="synopsis">
        <div class="boximg">
          <div class="topimg">
            <img :src="formParams.base64Url" width="200px" height="170px" />
          </div>
          <div class="botimg" @click="imgClick()">上传图片</div>
        </div>
        <div class="box_img_bottom">
          <div class="input" @click="imgClick()"></div>
          <input
            style="float: left; display: none"
            type="file"
            id="uploadFile"
            accept="image/jpeg"
            @change="showimg"
          />
        </div>
      </el-form-item>
      <el-form-item v-if="Info.code == 'H5'" label="升级提示" prop="synopsis">
        <Tinymce @getContent="getSynopsisContent" :htmlContent="formParams.synopsis" :resize="true" />
      </el-form-item>
      <el-form-item class="flex-row align-center" label="是否开启">
        <el-switch
          v-model="formParams.enable"
          active-color="#13ce66"
          inactive-color="#d4d9e1"
          :active-value="1"
          :inactive-value="0"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { main } from "@/hooks/notice/create";
import Tinymce from "@/components/editor/Tinymce";
export default {
  name: "Create",
  components: {
    Tinymce,
  },
  props: {
    Info: {
      type: Object,
      require: true,
    },
  },
  setup(props,{emit}) {
    return {
      ...main(props,emit),
    };
  },
};
</script>

<style lang="scss" scoped>
.boximg {
  .topimg {
    width: 100%;
    height: 400px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .botimg {
    text-align: center;
    margin-top:20px;
    color: blue;
    cursor: pointer;
  }
}
</style>
