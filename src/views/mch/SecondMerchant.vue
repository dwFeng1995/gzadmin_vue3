<template>
  <div>
    <el-card class="box-card" :body-style="{ padding: 0 }" shadow="never">
      <div class="p-20 flex-row justify-between">
        <el-form inline size="small">
          <el-form-item label="企业:">
            <el-input
              clearable
              v-model.trim="keyWords"
              placeholder="请搜索企业名称、二级商户名称"
              @keyup.enter="queryData"
            ></el-input>
          </el-form-item>
          <el-form-item label="二级商户类型:">
            <el-select v-model="secondMerchantTypeId" clearable filterable placeholder="全部类型">
              <el-option
                v-for="item in secondMerchantTypeArr"
                :key="item.type"
                :label="item.name"
                :value="item.type"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="queryData">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="resetData" icon="el-icon-refresh">
            </el-button>
          </el-form-item>
        </el-form>
        <div>
          <el-button type="primary" size="small" @click="openAddDialog"
            >新增二级商户</el-button
          >
        </div>
      </div>
      <div class="pl-20 pr-20 pb-20 font-size-14">
        <el-alert
          title="温馨提示：人员的部门，用户组信息发生变动后， 此人对应的收款方则按照新部门，新用户组的设置运用。"
          type="success"
          :closable="false"
        />
      </div>

      <div v-if="tableData.length == 0" class="el-table__empty-block"></div>
      <el-table
        v-else
        :data="tableData"
        :span-method="objectSpanMethod"
        border
        :header-cell-style="{ 'text-align': 'center', color: '#000' }"
      >
        <el-table-column
          align="center"
          prop="company_name"
          label="企业"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="company_no"
          label="企业号"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="secondName"
          label="二级商户"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="secondTypeName"
          label="二级商户类型"
          width="160"
        ></el-table-column>
        <el-table-column width="160" label="H5充值收款来源">
          <template #default="scope">
            <div v-if="scope.row.h5_recharge.user_data_name">
              <div>
                收款类型： {{ scope.row.h5_recharge.user_type == 1 ? "用户组" : "部门" }}
              </div>
              <div>
                {{ scope.row.h5_recharge.user_type == 1 ? "用户组" : "部门" }}详情：
                {{
                  scope.row.h5_recharge.user_data_name
                    ? scope.row.h5_recharge.user_data_name.split(",")[0]
                    : "暂无"
                }}
              </div>
              <div v-if="scope.row.h5_recharge.user_data_name">
                <el-popover
                  v-if="scope.row.h5_recharge.user_data_name.split(',').length > 1"
                  :width="300"
                  trigger="hover"
                  :title="scope.row.h5_recharge.user_type == 1 ? '用户组' : '部门'"
                >
                  <div style="max-height: 200px; overflow-y: auto;p-10">
                    {{ scope.row.h5_recharge.user_data_name }}
                  </div>
                  <template #reference>
                    <el-tag size="small"
                      >+{{
                        scope.row.h5_recharge.user_data_name.split(",").length
                      }}详情</el-tag
                    >
                  </template>
                </el-popover>
              </div>
            </div>
            <div v-else>暂无</div>
          </template>
        </el-table-column>
        <el-table-column  width="160" label="后台充值收款">
          <template #default="scope">
            <div v-if="scope.row.back_recharge.user_data_name">
              <div>
                收款类型：
                {{ scope.row.back_recharge.user_type == 1 ? "用户组" : "部门" }}
              </div>
              <div>
                {{ scope.row.back_recharge.user_type == 1 ? "用户组" : "部门" }}详情：
                {{
                  scope.row.back_recharge.user_data_name
                    ? scope.row.back_recharge.user_data_name.split(",")[0]
                    : "暂无"
                }}
              </div>
              <div v-if="scope.row.back_recharge.user_data_name">
                <el-popover
                  v-if="scope.row.back_recharge.user_data_name.split(',').length > 1"
                  :width="300"
                  trigger="hover"
                  :title="scope.row.back_recharge.user_type == 1 ? '用户组' : '部门'"
                >
                  <div style="max-height: 200px; overflow-y: auto;p-10">
                    {{ scope.row.back_recharge.user_data_name }}
                  </div>
                  <template #reference>
                    <el-tag size="small"
                      >+{{
                        scope.row.back_recharge.user_data_name.split(",").length
                      }}详情</el-tag
                    >
                  </template>
                </el-popover>
              </div>
            </div>
            <div v-else>暂无</div>
          </template>
        </el-table-column>
        <el-table-column  width="160" label="H5下单收款来源">
          <template #default="scope">
            <div v-if="scope.row.h5_pay && scope.row.h5_pay.user_data_name">
              <div>
                收款类型：按{{
                  scope.row.h5_pay.pay_type == 1 && scope.row.h5_pay.user_type == 1
                    ? "用户组"
                    : scope.row.h5_pay.pay_type == 1 && scope.row.h5_pay.user_type == 2
                    ? "部门"
                    : "档口"
                }}
              </div>
              <div>
                {{
                  scope.row.h5_pay.pay_type == 1 && scope.row.h5_pay.user_type == 1
                    ? "用户组"
                    : scope.row.h5_pay.pay_type == 1 && scope.row.h5_pay.user_type == 2
                    ? "部门"
                    : "档口"
                }}详情：
                {{
                  scope.row.h5_pay.user_data_name
                    ? scope.row.h5_pay.user_data_name.split(",")[0]
                    : ""
                }}
              </div>
              <div v-if="scope.row.h5_pay.user_data_name">
                <el-popover
                  v-if="scope.row.h5_pay.user_data_name.split(',').length > 1"
                  :width="300"
                  trigger="hover"
                  :title="
                    scope.row.h5_pay.pay_type == 1 && scope.row.h5_pay.user_type == 1
                      ? '用户组'
                      : scope.row.h5_pay.pay_type == 1 && scope.row.h5_pay.user_type == 2
                      ? '部门'
                      : '档口'
                  "
                >
                  <div style="max-height: 200px; overflow-y: auto;p-10">
                    {{ scope.row.h5_pay.user_data_name }}
                  </div>
                  <template #reference>
                    <el-tag size="small"
                      >+{{
                        scope.row.h5_pay.user_data_name.split(",").length
                      }}详情</el-tag
                    >
                  </template>
                </el-popover>
              </div>
            </div>
            <div v-else>暂无</div>
          </template>
        </el-table-column>
        <el-table-column  width="160" label="设备收款详情">
          <template #default="scope">
            <div v-if="scope.row.client_pay && scope.row.client_pay.user_data_name">
              <div>
                收款设备：
                {{ scope.row.client_pay.user_data_name.split(",").length }}台
              </div>
              <div>
                设备详情：
                {{ scope.row.client_pay.user_data_name.split(",")[0] }}
              </div>
              <div>
                <el-popover
                  v-if="scope.row.client_pay.user_data_name.split(',').length > 1"
                  :width="300"
                  trigger="hover"
                  :title="scope.row.client_pay.user_type == 1 ? '用户组' : '部门'"
                >
                  <div style="max-height: 200px; overflow-y: auto;p-10">
                    {{ scope.row.client_pay.user_data_name }}
                  </div>
                  <template #reference>
                    <el-tag size="small"
                      >+{{
                        scope.row.client_pay.user_data_name.split(",").length
                      }}详情</el-tag
                    >
                  </template>
                </el-popover>
              </div>
            </div>
            <div v-else>暂无</div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="对账日">
          <template #default="scope">{{ `每月${scope.row.recon_date}号` }}</template>
        </el-table-column>

        <el-table-column
          align="center"
          prop="merchant"
          label="支付平台"
          width="160"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="mchInfoId"
          label="支付平台商户ID号	"
          width="160"
        ></el-table-column>
        <el-table-column align="center" prop="status" label="商户状态"></el-table-column>
        <el-table-column
          align="center"
          prop="remark"
          label="商户平台备注"
          width="160"
        ></el-table-column>
        <el-table-column
          align="center"
          width="130"
          prop="own_remark"
          label="本系统备注"
        ></el-table-column>

        <el-table-column align="center" width="200" label="操作" fixed="right">
          <template #default="scope">
            <el-button
              size="small"
              icon="el-icon-view"
              type="primary"
              @click="handleRevamp(scope.row, false)"
              >查看</el-button
            >
            <el-button
              size="small"
              icon="el-icon-edit"
              type="primary"
              @click="handleRevamp(scope.row, true)"
              >编辑</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      

      <div class="paging">
        <el-pagination
          v-model:currentPage="pageIndex"
          :page-sizes="[10, 20, 50, 100, 200]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageTotal"
          @size-change="changePageSize"
          @current-change="changePageIndex"
        >
        </el-pagination>
      </div>

      <div>
        <el-dialog
          v-model="addDialogVisible"
          :close-on-click-modal="false"
          destroy-on-close
          title="二级商户管理"
          center
          width="700px"
        >
          <div class="pl-20 pr-20 pb-20 font-size-14">
            <el-alert
              title="温馨提示：人员的部门，用户组信息发生变动后， 此人对应的收款方则按照新部门，新用户组的设置运用。"
              type="success"
              :closable="false"
            />
          </div>
          <el-form
            ref="ruleFormRef"
            :model="secondMerchantInfo"
            :rules="formRules"
            label-width="120px"
            class="demo-ruleForm"
            size="small"
          >
            <el-form-item label="选择企业" prop="companyId">
              <el-select
                v-model="secondMerchantInfo.companyId"
                @change="selectCompany"
                placeholder="请选择企业"
                class="w-100"
                filterable
                :disabled="isDisabled"
                clearable
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
            <div>二级商户信息</div>
            <el-form-item label="二级商户信息" prop="secondName">
              <el-input
                clearable
                v-model.trim="secondMerchantInfo.secondName"
                placeholder="请输入企业名称"
                @keyup.enter="queryData"
                :disabled="!isLook"
              ></el-input>
            </el-form-item>
            <el-form-item label="二级商户类型">
              <div>
                <el-radio
                  v-model="secondMerchantInfo.second_type"
                  :disabled="!isLook"
                  label="1"
                  size="large"
                  >充值二清</el-radio
                >
                <el-radio
                  v-model="secondMerchantInfo.second_type"
                  :disabled="!isLook"
                  label="2"
                  size="large"
                  >消费二清</el-radio
                >
              </div>
            </el-form-item>

            <div v-if="secondMerchantInfo.second_type == 1">
              <el-form-item label="H5充值收款">
                <div class="flex-row ml-20">
                  <el-select
                    :disabled="!secondMerchantInfo.companyId || !isLook"
                    v-model="h5_recharge_info.userTypeId"
                    @change="selectUserType"
                    placeholder="选择用户类型"
                    clearable
                  >
                    <el-option
                      v-for="item in userTypeList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    >
                    </el-option>
                  </el-select>
                  <div class="ml-20 width-250" v-if="h5_recharge_info.userTypeId == 1">
                    <treeselect
                      placeholder="请选择"
                      v-model="h5_recharge_info.userGroupIds"
                      :multiple="true"
                      :options="userGroupList"
                      :normalizer="normalizer"
                      :clearable="false"
                      valueConsistsOf="ALL"
                      :show-count="true"
                      noOptionsText="暂无数据"
                      :maxHeight="200"
                      :limit="3"
                      :limitText="handleLimitText"
                    >
                    </treeselect>
                  </div>

                  <div class="ml-20 width-250" v-if="h5_recharge_info.userTypeId == 2">
                    <treeselect
                      placeholder="请选择"
                      v-model="h5_recharge_info.userDepartIds"
                      :multiple="true"
                      :options="departList"
                      :normalizer="normalizer"
                      :clearable="false"
                      valueConsistsOf="ALL"
                      :show-count="true"
                      noOptionsText="暂无数据"
                      :maxHeight="200"
                      :limit="3"
                      :limitText="handleLimitText"
                    >
                    </treeselect>
                  </div>
                </div>
              </el-form-item>

              <el-form-item label="后台充值收款">
                <div class="flex-row ml-20">
                  <el-select
                    v-model="h5_recharge_info.userTypeId"
                    disabled
                    placeholder="选择用户类型"
                  >
                    <el-option
                      v-for="item in userTypeList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    >
                    </el-option>
                  </el-select>
                  <div class="ml-20 width-250" v-if="h5_recharge_info.userTypeId == 1">
                    <treeselect
                      placeholder="请选择"
                      v-model="back_recharge_info.userGroupIds"
                      :multiple="true"
                      :options="userGroupList"
                      :normalizer="normalizer"
                      :clearable="false"
                      valueConsistsOf="ALL"
                      :show-count="true"
                      noOptionsText="暂无数据"
                      :maxHeight="200"
                      :limit="3"
                      :limitText="handleLimitText"
                    >
                    </treeselect>
                  </div>
                  <div class="ml-20 width-250" v-if="h5_recharge_info.userTypeId == 2">
                    <treeselect
                      placeholder="请选择"
                      v-model="back_recharge_info.userDepartIds"
                      :multiple="true"
                      :options="departList"
                      :normalizer="normalizer"
                      :clearable="false"
                      valueConsistsOf="ALL"
                      :show-count="true"
                      noOptionsText="暂无数据"
                      :maxHeight="200"
                      :limit="3"
                      :limitText="handleLimitText"
                    >
                    </treeselect>
                  </div>
                </div>
              </el-form-item>
            </div>

            <div v-if="secondMerchantInfo.second_type == 2">
              <el-form-item label="收款设备">
                <el-cascader
                  :disabled="!secondMerchantInfo.companyId"
                  v-model="h5_consume_info.FacilityIds"
                  :options="facilityAllList"
                  :props="props"
                  collapse-tags
                  collapse-tags-tooltip
                  clearable
                  filterable
                  :show-all-levels="false"
                />
              </el-form-item>
              <el-form-item label="H5下单收款类型">
                <div class="flex-row ml-20">
                  <el-select
                    :disabled="!secondMerchantInfo.companyId || !isLook"
                    v-model="h5_consume_info.userTypeId"
                    placeholder="选择用户类型"
                    clearable
                  >
                    <el-option
                      v-for="item in h5PayOrderTypeList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    >
                    </el-option>
                  </el-select>
                  <!-- 用户类型 -->
                  <div class="ml-20 width-250" v-if="h5_consume_info.userTypeId == 1">
                    <el-select
                      :disabled="!secondMerchantInfo.companyId || !isLook"
                      v-model="h5_usertype_info.userTypeId"
                      placeholder="选择用户类型"
                      clearable
                    >
                      <el-option
                        v-for="item in h5PayUserTypeList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      >
                      </el-option>
                    </el-select>
                  </div>

                  <!-- 档口 -->
                  <div class="ml-20" v-if="h5_consume_info.userTypeId == 2">
                    <el-select
                      v-model="h5_consume_info.canteenIds"
                      filterable
                      multiple
                      collapse-tags
                      clearable
                    >
                      <el-option
                        v-for="item in canteenMiniList"
                        :key="item.id"
                        :label="item.canteen_name"
                        :value="item.id"
                        :disabled="!isLook"
                      >
                      </el-option>
                    </el-select>
                  </div>
                </div>
                <!-- 用户类型 -->
                <div class="flex-row ml-20 mt-20" v-if="h5_consume_info.userTypeId == 1">
                  <div class="width-250" v-if="h5_usertype_info.userTypeId == 1">
                    <treeselect
                      placeholder="请选择"
                      v-model="h5_usertype_info.userGroupIds"
                      :multiple="true"
                      :options="userCleartList"
                      :normalizer="normalizerConsume"
                      :clearable="false"
                      valueConsistsOf="ALL"
                      :show-count="true"
                      noOptionsText="暂无数据"
                      :maxHeight="200"
                      :limit="3"
                      :limitText="handleLimitText"
                    >
                    </treeselect>
                  </div>
                  <div class="width-250" v-if="h5_usertype_info.userTypeId == 2">
                    <treeselect
                      placeholder="请选择"
                      v-model="h5_usertype_info.userDepartIds"
                      :multiple="true"
                      :options="deparCleartList"
                      :normalizer="normalizerConsume"
                      :clearable="false"
                      valueConsistsOf="ALL"
                      :show-count="true"
                      noOptionsText="暂无数据"
                      :maxHeight="200"
                      :limit="3"
                      :limitText="handleLimitText"
                    >
                    </treeselect>
                  </div>
                </div>
              </el-form-item>
            </div>
            <el-form-item label="对账日：" prop="reconciliationDay">
              <el-input
                @input="handleInput"
                clearable
                v-model.trim="secondMerchantInfo.reconciliationDay"
                placeholder="每月1号可开始对账上个月的数据，默认每月一号"
                @keyup.enter="queryData"
                type="number"
                :disabled="!isLook"
              ></el-input>
            </el-form-item>

            <div class="mb-10">
              选择已开通的支付平台：
              <span style="color: #999" v-if="!secondMerchantInfo.platformAllList.length"
                >暂无关联支付平台</span
              >
            </div>

            <el-form-item label="">
              <div class="flex-row flex-wrap">
                <div
                  class="mr-15"
                  v-for="item in secondMerchantInfo.platformAllList"
                  :key="item.pay_type_code"
                >
                  <el-checkbox
                    v-model="item.checked"
                    :disabled="!isLook"
                    style="line-height: 0px"
                  >
                    <span v-text="item.name"></span>
                  </el-checkbox>
                  <br />
                  <span v-if="item.pay_type_code == 'IKU'" class="is-red"
                    >（支持农行掌银码支付）</span
                  >
                  <span v-if="item.pay_type_code == 'ABC'" class="is-red"
                    >（支持微信、支付宝、农行掌银码支付）</span
                  >
                </div>
              </div>
            </el-form-item>

            <div
              v-for="item in secondMerchantInfo.platformAllList.filter(
                (item) => item.checked
              )"
              :key="item.type"
            >
              <el-form-item :label="`${item.name}商户ID绑定`">
                <div class="flex-row justify-end">
                  <el-input
                    type="number"
                    class="mr-20"
                    clearable
                    v-model.trim="item.input"
                    :placeholder="`请输入${item.name}商户ID绑定`"
                    @keyup.enter="queryData"
                  ></el-input>
                  <el-button type="primary" @click="searchPlatformData(item,false)"
                    >查询</el-button
                  >
                </div>
              </el-form-item>
              <div class="flex-row mt-20 mb-20 ml-20" :class="{'bor':item.isShow}" v-if="item.isShow">
                <div class="flex-1">
                  <div
                    v-for="(item1, index) in item.oddInfo"
                    :key="index"
                    class="pb-10 bor_child bor_child_r"
                  >
                    <div>
                      <span class="font-weight-600">{{ item1.name }}： </span>
                      <span class="font-size-12"> {{ item1.val }}</span>
                    </div>
                  </div>
                </div>
                <div class="flex-1">
                  <div
                    v-for="(item1, index) in item.evenInfo"
                    :key="index"
                    class="pb-10 bor_child"
                  >
                    <div>
                      <span class="font-weight-600">{{ item1.name }}： </span>
                      <span class="font-size-12"> {{ item1.val }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <el-form-item label="商铺ID">
                <el-input
                  clearable
                  v-model.trim="item.shop"
                  placeholder="请输入商铺ID"
                  @keyup.enter="queryData"
                  :disabled="!isLook"
                ></el-input>
              </el-form-item>
              <el-form-item label="备注" prop="remark">
                <el-input
                  clearable
                  v-model.trim="item.own_remark"
                  placeholder="请输入备注"
                  @keyup.enter="queryData"
                  :disabled="!isLook"
                ></el-input>
              </el-form-item>

            </div>

            <div class="flex-row justify-end mr-20">
              <el-button size="mini" @click="addDialogVisible = false">取消</el-button>
              <el-button size="mini" type="primary" @click="submitAdd" v-if="isLook"
                >保存设置</el-button
              >
            </div>
          </el-form>
        </el-dialog>
      </div>
    </el-card>
  </div>
</template>

<script>
import { main, ruleFormRef } from "@/hooks/mch/secondMerchant/index.js";
import formRules from "@/hooks/mch/secondMerchant/formRules.js";
import Treeselect from "vue3-treeselect";
import "vue3-treeselect/dist/vue3-treeselect.css";
export default {
  components: {
    Treeselect,
  },
  setup() {
    return {
      ...main(),
      formRules,
      ruleFormRef,
    };
  },
};
</script>
<style lang="scss" scoped>
.border_bottom {
  border-bottom: 1px solid #dcdfe6;
}
.mealLineTable {
  border-collapse: collapse;
  background: #fff;
  color: #606266;
  thead {
    tr {
      background: #f5f7fa;
      border: 1px solid #dcdfe6;
      th {
        padding: 10px 0;
        border: 1px solid #dcdfe6;
      }
    }
  }
  tbody {
    td {
      border: 1px solid #dcdfe6;
      // padding: 0px 0px !important;
    }
  }
  ul {
    li {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      min-height: 80px;
    }
    li:last-child {
      border-bottom: 0 !important;
    }
  }
  .btnStyle {
    ul {
      li {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
      }
    }
  }
}

.bor {
  border: 1px solid #dcdfe6;
  .bor_child {
    padding: 10px;
    border-bottom: 1px solid #dcdfe6;
  }
  .bor_child:last-child {
    border-bottom: none;
  }
  .bor_child_r {
    border-right: 1px solid #dcdfe6;
  }
}
.text {
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 120px;
}
</style>
