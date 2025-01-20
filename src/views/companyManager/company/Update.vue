<template>
  <div>
    <el-card class="box-card" :body-style="{ padding: 0 }" shadow="never">
      <el-page-header
        class="mt-14 ml-12"
        title="返回"
        content="编辑企业"
        @back="goBack"
      />
      <el-form
        size="small"
        ref="companyFormRef"
        :rules="formRules"
        :model="formModel"
        class="p-20"
        label-width="120px"
      >
        <div class="flex-row w-100 justify-between">
          <div class="w-50 pr-10">
            <el-form-item prop="admin_user_id" label="企业用户">
              <el-select
                filterable
                disabled
                class="w-100"
                v-model="formModel.admin_user_id"
                placeholder="请选择企业用户"
              >
                <el-option
                  v-for="item in adminUserList"
                  :key="item.id"
                  :label="item.username"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="企业编号" prop="company_no">
              <el-input
                class=""
                oninput="value=value.replace(/[^\d]/g,'')"
                disabled
                v-model.trim="formModel.company_no"
                placeholder="请输入企业编号"
              ></el-input>
            </el-form-item>
            <el-form-item label="企业名称" prop="company_name">
              <el-input
                v-model.trim="formModel.company_name"
                placeholder="请输入企业名称"
              ></el-input>
            </el-form-item>
            <el-form-item prop="pay_system_ip" label="支付系统Ip">
              <el-input
                v-model.trim="formModel.pay_system_ip"
                placeholder="请输入支付系统ip"
              ></el-input>
            </el-form-item>

            <el-form-item prop="pay_system_id" label="支付系统">
              <el-select
                filterable
                class="w-100"
                v-model="formModel.pay_system_id"
                placeholder="请选择支付系统"
              >
                <el-option
                  v-for="item in paySystemList"
                  :key="item.id"
                  :label="item.system_name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="client_pay_system" label="设备支付系统">
              <el-input
                v-model.trim="formModel.client_pay_system"
                placeholder="请输入设备支付系统"
              ></el-input>
            </el-form-item>
            <el-form-item label="jsApi支付系统" prop="jsapi_pay_system">
              <el-select
                filterable
                class="w-100"
                clearable
                v-model="formModel.jsapi_pay_system"
                placeholder="请选择jsApi支付系统"
              >
                <el-option
                  v-for="item in jsapi_pay_system_list"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="营养状态" prop="import_nutriment_status">
              <el-select
                filterable
                class="w-100"
                v-model="formModel.import_nutriment_status"
                placeholder="请选择营养状态"
              >
                <el-option
                  v-for="item in import_nutriment_list"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item  label="档口添加权限">
              <div>
                <el-radio v-model="formModel.diy_canteen.enable" :label="true"
                  >支持客户自行添加</el-radio
                >
                <el-radio v-model="formModel.diy_canteen.enable" :label="false"
                  >仅总后台添加</el-radio
                >
                <div v-if="formModel.diy_canteen.enable === true">
                  <el-form-item prop="diy_canteen.data">
                    <el-input
                      oninput="value=value.replace(/[^\d]/g,'')"
                      v-model="formModel.diy_canteen.data"
                      placeholder="请输入数量"
                    ></el-input>
                  </el-form-item>
                </div>
              </div>
            </el-form-item>
            <el-form-item  label="设备添加权限">
              <div>
                <el-radio v-model="formModel.addDivClient.enable" :label="true"
                  >支持客户自行添加</el-radio
                >
                <el-radio v-model="formModel.addDivClient.enable" :label="false"
                  >仅总后台添加</el-radio
                >
                <div v-if="formModel.addDivClient.enable === true">
                  <div>
                    <el-button @click="addClient()" type="primary" size="mini"
                      >添 加</el-button
                    >
                  </div>
                  <div
                    class="flex-row justify-between w-100"
                    v-for="(item, index) in formModel.addDivClient.list"
                    :key="index"
                  >
                    <div class="w-50">
                      <el-form-item
                        :prop="'addDivClient.list.' + index + '.id'"
                        :rules="[
                          {
                            required: true,
                            message: '请选择设备',
                            trigger: 'blur',
                          },
                        ]"
                      >
                        <el-select
                          filterable
                          size="mini"
                          v-model="item.id"
                          placeholder="请选择设备类型"
                        >
                          <el-option
                            v-for="item in clientTypeList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                          >
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                    <div class="w-50">
                      <el-form-item
                        :prop="'addDivClient.list.' + index + '.value'"
                        :rules="[
                          {
                            required: true,
                            message: '请输入数量',
                            trigger: 'blur',
                          },
                          {
                            pattern: /(^[1-9]\d*$)/,
                            message: '请输入正整数',
                            trigger: 'blur',
                          },
                        ]"
                      >
                        <div class="flex-row align-center">
                          <el-input
                            size="mini"
                            v-model="item.value"
                            oninput="value=value.replace(/[^\d]/g,'')"
                            placeholder="请输入数量"
                          ></el-input>
                          <div class="width-50 text-center">
                            <a
                              v-if="formModel.addDivClient.list.length > 1"
                              @click="delClient(index)"
                              title="删除"
                              href="javascript:;"
                              class="font-size-16 text-red mr-3"
                            >
                              <i class="el-icon-delete"></i>
                            </a>
                          </div>
                        </div>
                      </el-form-item>
                    </div>
                  </div>
                </div>
              </div>
            </el-form-item>
          </div>
          <div class="w-50 pl-10 pr-10">
            <el-form-item label="H5功能">
              <el-checkbox
                v-for="item in h5FnList"
                :key="item.code"
                v-model="item.checked"
              >
                <span v-text="item.code_name"></span>
              </el-checkbox>
            </el-form-item>
            <el-form-item label="设备功能">
              <el-checkbox
                v-for="item in clientFnList"
                :key="item.id"
                v-model="item.checked"
              >
                <span v-text="item.fun_name"></span>
              </el-checkbox>
            </el-form-item>
            <el-form-item label="管理后台功能">
              <el-checkbox
                :label="item.name"
                v-for="item in adminFnList"
                :key="item.id"
                v-model="item.checked"
              >
              </el-checkbox>
            </el-form-item>
            <el-form-item label="Secret key">
              <el-input
                v-model.trim="formModel.secret_key"
                placeholder="请输入secret_key"
              ></el-input>
            </el-form-item>
            <el-form-item label="开通人脸系统">
              <el-checkbox
                v-for="item in faceSystemFnList"
                :key="item.code"
                v-model="item.checked"
              >
                <span v-text="item.name"></span>
              </el-checkbox>
            </el-form-item>
            <el-form-item label="提现密码：" prop="password">
              <div class="flex-row align-center width-350">
                <el-input
                  placeholder="请输入内容"
                  type="password"
                  v-model="formModel.password"
                  show-password
                />
              </div>
            </el-form-item>
          </div>
        </div>
      </el-form>
      <div class="w-100 mt-12 mb-30 flex-row">
        <div class="w-50 text-center">
          <el-button type="warning" @click="reset()" icon="el-icon-refresh"
            >重 置</el-button
          >
        </div>
        <div class="w-50 text-center">
          <el-button
            type="primary"
            @click="submit()"
            icon="el-icon-circle-check"
            >提 交</el-button
          >
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
import { main, companyFormRef } from "@/hooks/companyManager/company/update";
import {
  import_nutriment_list,
  jsapi_pay_system_list,
} from "@/hooks/companyManager/company/data";
import formRules from "@/hooks/companyManager/company/formRules";
import { onBeforeUnmount } from "vue";
export default {
  setup() {
    onBeforeUnmount(() => {
      companyFormRef.value.resetFields();
    });
    return {
      ...main(),
      import_nutriment_list,
      formRules,
      companyFormRef,
      jsapi_pay_system_list,
    };
  },
};
</script>
