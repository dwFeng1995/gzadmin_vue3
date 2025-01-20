<template>
  <div>
    <el-card class="box-card" :body-style="{ padding: 0 }" shadow="never">
      <div class="p-20">
        <el-form inline size="small">
          <el-form-item label="企业商户:">
            <el-input
              clearable
              v-model.trim="keyWords"
              placeholder="请输入企业名称"
              @keyup.enter="queryData"
            ></el-input>
          </el-form-item>
          <el-form-item label="支付平台选择:">
            <el-select
              v-model="payPlatFormId"
              clearable
              multiple
              collapse-tags
              filterable
              placeholder="全部支付平台"
            >
              <el-option
                v-for="item in platformAllList"
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
      </div>
      <div class="flex-row pl-20 pr-20 pb-20 font-size-14">
        <!-- <div class="topTipStyle ">
                    每个企业默认自动有一个企业商户，不可删除。如一个企业下，需添加多个企业商户，点击编辑企业商户，在页面内添加
                </div> -->
        <el-alert
          title="每个企业默认自动有一个企业商户，不可删除。如一个企业下，需添加多个企业商户，点击编辑企业商户，在页面内添加"
          type="success"
          :closable="false"
        />
        <el-button class="ml-20" type="primary" @click="openAddDialog"
          >添加企业商户</el-button
        >
      </div>

      <div v-if="tableData.length == 0" class="el-table__empty-block"></div>
      <el-table
        v-else
        :data="tableData"
        :header-cell-style="{ 'text-align': 'center', color: '#000' }"
        :span-method="objectSpanMethod"
        border
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
        <el-table-column align="center" prop="mchName" label="企业商户"></el-table-column>
        <el-table-column
          align="center"
          prop="platform"
          label="支付平台"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="merchant"
          label="平台商户号"
        ></el-table-column>
        <el-table-column align="center" label="操作">
          <template #default="scope">
            <el-button
              size="small"
              type="primary"
              icon="el-icon-edit"
              @click="handleRevamp(scope.row)"
              >编辑企业商户</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <!-- <table
        v-else
        cellspacing="0"
        class="mealLineTable w-100 font-size-13 text-center p-20"
      >
        <thead>
          <tr>
            <th>企业</th>
            <th>企业号</th>
            <th>企业商户</th>
            <th>支付平台</th>
            <th>平台商户号</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in tableData" :key="index">
            <td>{{ item.company_name }}</td>
            <td>{{ item.company_no }}</td>
            <td>
              <div>
                <ul class="p-0">
                  <li
                    v-for="(aitem, aindex) in item.mch_company"
                    class="list-style-none border_bottom"
                    :key="aindex"
                  >
                    <ul class="p-0 editCompanyStyle" v-if="aitem.data.length > 0">
                      <li
                        v-for="(bitem, bindex) in aitem.data"
                        class="list-style-none"
                        :key="bindex"
                      >
                        {{ aitem.name }}
                      </li>
                    </ul>
                    <ul class="p-0 editCompanyStyle" v-else>
                      <li class="list-style-none">
                        {{ aitem.name }}
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </td>
            <td>
              <div>
                <ul class="p-0">
                  <li
                    v-for="(aitem, aindex) in item.mch_company"
                    class="list-style-none border_bottom"
                    :key="aindex"
                  >
                    <ul class="p-0">
                      <li
                        v-for="(bitem, bindex) in aitem.data"
                        class="list-style-none"
                        :key="bindex"
                      >
                        {{
                          allPayPlatFormList.find(
                            (x) => x.pay_type_code == bitem.pay_tpye
                          ).name
                        }}
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </td>
            <td>
              <div>
                <ul class="p-0">
                  <li
                    v-for="(aitem, aindex) in item.mch_company"
                    class="list-style-none border_bottom"
                    :key="aindex"
                  >
                    <ul class="p-0">
                      <li
                        v-for="(bitem, bindex) in aitem.data"
                        class="list-style-none"
                        :key="bindex"
                      >
                        {{ bitem.name }}
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </td>
            <td>
              <div>
                <ul class="p-0">
                  <li
                    v-for="(aitem, aindex) in item.mch_company"
                    class="list-style-none border_bottom"
                    :key="aindex"
                  >
                    <ul class="p-0 editCompanyStyle" v-if="aitem.data.length > 0">
                      <li
                        v-for="(bitem, bindex) in aitem.data"
                        class="list-style-none btnStyle"
                        :key="bindex"
                        @click="openEditDialog(item, aitem)"
                      >
                        编辑企业商户
                      </li>
                    </ul>
                    <ul class="p-0 editCompanyStyle" v-else>
                      <li
                        class="list-style-none btnStyle"
                        @click="openEditDialog(item, aitem)"
                      >
                        编辑企业商户
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </td>
          </tr>
        </tbody>
      </table> -->

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
      <!-- 抽屉编辑企业商户信息 -->
      <div>
        <el-drawer
          v-model="updateDialogVisible"
          size="777px"
          :title="companyMerchantInfo.company_name"
        >
          <template #default>
            <div class="p-20 font-size-14">
              <el-form size="small" v-model="companyMerchantInfo">
                <el-form-item label="企业商户:">
                  <el-input
                    clearable
                    v-model.trim="companyMerchantInfo.mchName"
                    placeholder="请输入企业名称"
                  ></el-input>
                </el-form-item>
                <div>
                  <div>绑定第三方支付平台</div>
                  <div class="m-20" v-if="!addCompanyForm.payPlatFormList">
                    <span>此企业暂无配置此第三方平台</span>
                    <span class="text-red"
                      >（注意：如需配置此平台，可前往【相应平台支付配置页】）</span
                    >
                  </div>
                  <div class="m-20" v-else>
                    <span>此企业已配置以下平台，可选中作进一步绑定</span>
                    <div>
                      <el-form-item label="">
                        <el-checkbox
                          v-for="item in platformAllList"
                          :key="item.type"
                          v-model="item.checked"
                        >
                          <span v-text="item.name"></span>
                        </el-checkbox>
                      </el-form-item>
                    </div>
                  </div>
                </div>

                <div>
                  <div>绑定虚拟支付平台</div>
                  <div class="m-20" v-if="!addCompanyForm.payPlatFormList">
                    <span>此企业暂无配置此虚拟平台</span>
                  </div>
                  <el-form-item label="" v-else>
                    <table
                      cellspacing="0"
                      class="mealLineTable w-100 font-size-13 text-center mt-20"
                    >
                      <thead>
                        <tr>
                          <th>第三方平台</th>
                          <th>绑定平台商户号</th>
                          <th>备注</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="item in platformAllList.filter((x) => x.checked)"
                          :key="item.type"
                        >
                          <td>{{ item.name }}</td>
                          <td>
                            <el-select
                              v-model="item.payPlatFormId"
                              placeholder="请绑定平台商户号"
                            >
                              <el-option
                                v-for="aitem in item.data"
                                :key="aitem.id"
                                :label="aitem.name"
                                :value="aitem.id"
                              >
                              </el-option>
                            </el-select>
                            <el-button
                              class="ml-20"
                              size="mini"
                              type="primary"
                              @click="quickAdd(item.type)"
                              >快捷添加商户号</el-button
                            >
                            <!-- <el-button style="opacity:0" class="ml-20 width-116" size="mini" type="primary" v-if="item.type=='GEZI'"></el-button> -->
                          </td>
                          <td>
                            <div v-for="(titem, index) in item.data" :key="index">
                              <span v-if="item.payPlatFormId == titem.id">{{
                                titem.remark
                              }}</span>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </el-form-item>
                </div>
              </el-form>
            </div>
            <div class="flex-row justify-end mr-20">
              <el-button size="mini" @click="updateDialogVisible = false">取消</el-button>
              <el-button size="mini" type="primary" @click="submitUpdate"
                >保存设置</el-button
              >
            </div>
          </template>
          <!-- <template #footer>
                        
                    </template> -->
        </el-drawer>
      </div>

      <div>
        <el-dialog
          v-model="addDialogVisible"
          :close-on-click-modal="false"
          @close="addDialogClosed"
          destroy-on-close
          title="添加企业商户"
          width="700px"
        >
          <div>
            <el-form size="small" v-model="addCompanyForm">
              <el-form-item label="企业:">
                <el-select
                  v-model="companyId"
                  filterable
                  @change="selectCompany"
                  placeholder="请选择企业"
                  class="w-100"
                >
                  <el-option
                    v-for="item in addCompanyForm.companyMiniList"
                    :key="item.id"
                    :label="item.company_name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="企业商户:">
                <el-input
                  clearable
                  v-model.trim="addCompanyForm.company_name"
                  placeholder="请输入企业名称"
                ></el-input>
              </el-form-item>
              <div>
                <div>绑定第三方支付平台</div>
                <div class="m-20" v-if="addCompanyForm.payPlatFormList.length == 0">
                  <span>此企业暂无配置此第三方平台</span>
                  <span class="text-red"
                    >（注意：如需配置此平台，可前往【相应平台支付配置页】）</span
                  >
                </div>
                <div class="m-20" v-else>
                  <!-- <span>此企业已配置以下平台，可选中作进一步绑定</span> -->
                  <div>
                    <el-form-item label="">
                      <el-checkbox
                        v-for="item in platformAllList"
                        :key="item.type"
                        v-model="item.checked"
                        v-show="item.type !== 'GEZI'"
                      >
                        <span v-text="item.name"></span>
                      </el-checkbox>
                    </el-form-item>
                  </div>
                </div>
              </div>

              <div>
                <div>绑定虚拟支付平台</div>
                <div v-if="addCompanyForm.payPlatFormList.length == 0"></div>
                <div class="m-20" v-else>
                  <!-- <span>此企业已配置以下平台，可选中作进一步绑定</span> -->
                  <div>
                    <el-form-item label="">
                      <el-checkbox
                        v-for="item in platformAllList"
                        :key="item.type"
                        v-model="item.checked"
                        v-show="item.type == 'GEZI'"
                      >
                        <span v-text="item.name"></span>
                      </el-checkbox>
                    </el-form-item>
                  </div>
                </div>
                <div class="m-20" v-if="addCompanyForm.payPlatFormList.length == 0">
                  <span>此企业暂无配置此虚拟平台</span>
                </div>
                <el-form-item label="" v-else>
                  <table
                    cellspacing="0"
                    class="mealLineTable w-100 font-size-13 text-center mt-20"
                  >
                    <thead>
                      <tr>
                        <th>第三方平台</th>
                        <th>绑定平台商户号</th>
                        <th>备注</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="item in platformAllList.filter((x) => x.checked)"
                        :key="item.type"
                      >
                        <td>{{ item.name }}</td>
                        <td>
                          <el-select
                            v-model="item.payPlatFormId"
                            clearable
                            placeholder="请绑定平台商户号"
                          >
                            <el-option
                              v-for="aitem in item.data"
                              :key="aitem.id"
                              :label="aitem.name"
                              :value="aitem.id"
                            >
                            </el-option>
                          </el-select>
                          <el-button
                            class="ml-20"
                            size="mini"
                            type="primary"
                            @click="quickAdd(item.type)"
                            >快捷添加商户号</el-button
                          >
                        </td>
                        <td>
                          <div v-for="(titem, index) in item.data" :key="index">
                            <span v-if="item.payPlatFormId == titem.id">{{
                              titem.remark
                            }}</span>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </el-form-item>
              </div>
            </el-form>
          </div>
          <template #footer>
            <span class="dialog-footer">
              <el-button type="primary" size="small" @click="submitAdd">确定</el-button>
              <el-button size="small" @click="addDialogVisible = false">取消</el-button>
            </span>
          </template>
        </el-dialog>

        <div v-if="payType == 'ABC_CENTER'">
          <el-dialog
            destroy-on-close
            v-model="createDialogVisible"
            :close-on-click-modal="false"
            @close="createDialogClosed"
            title="添加"
            width="688px"
            top="6vh"
          >
            <div>
              <AbcCreate ref="createChildRef"  @refreshData="refreshData" />
            </div>

            <template #footer>
              <span class="dialog-footer">
                <el-button type="primary" size="small" @click="submitCreate"
                  >确定</el-button
                >
                <el-button size="small" @click="createDialogVisible = false"
                  >取消</el-button
                >
              </span>
            </template>
          </el-dialog>
        </div>
        <div v-if="payType == 'ABC'">
          <el-dialog
            destroy-on-close
            v-model="createDialogVisible"
            :close-on-click-modal="false"
            @close="createDialogClosed"
            title="添加"
            width="800px"
            top="5vh"
          >
            <div>
              <AbcCodeCreate ref="createChildRef" @refreshData="refreshData" />
            </div>
            <template #footer>
              <span class="dialog-footer">
                <el-button type="primary" size="small" @click="submitCreate"
                  >确定</el-button
                >
                <el-button size="small" @click="createDialogVisible = false"
                  >取消</el-button
                >
              </span>
            </template>
          </el-dialog>
        </div>

        <div v-if="payType == 'Z'">
          <el-dialog
            destroy-on-close
            v-model="createDialogVisible"
            :close-on-click-modal="false"
            @close="createDialogClosed"
            title="添加"
            width="688px"
            top="6vh"
          >
            <div>
              <Create ref="createChildRef" @refreshData="refreshData" />
            </div>
            <template #footer>
              <span class="dialog-footer">
                <el-button type="primary" size="small" @click="submitCreate"
                  >确定</el-button
                >
                <el-button size="small" @click="createDialogVisible = false"
                  >取消</el-button
                >
              </span>
            </template>
          </el-dialog>
        </div>
        <div v-if="payType == 'W'">
          <el-dialog
            destroy-on-close
            v-model="createDialogVisible"
            :close-on-click-modal="false"
            @close="createDialogClosed"
            title="添加"
            width="800px"
            top="6vh"
          >
            <div>
              <WechatCreate ref="createChildRef" />
            </div>
            <template #footer>
              <span class="dialog-footer">
                <el-button type="primary" size="small" @click="submitCreate"
                  >确定</el-button
                >
                <el-button size="small" @click="createDialogVisible = false"
                  >取消</el-button
                >
              </span>
            </template>
          </el-dialog>
        </div>

        <div v-if="payType == 'PCI'">
          <el-dialog
            destroy-on-close
            v-model="createDialogVisible"
            :close-on-click-modal="false"
            @close="createDialogClosed"
            title="添加"
            width="800px"
            top="6vh"
          >
            <div>
              <PciCreate ref="createChildRef" @refreshData="refreshData" />
            </div>
            <template #footer>
              <span class="dialog-footer">
                <el-button type="primary" size="small" @click="submitCreate"
                  >确定</el-button
                >
                <el-button size="small" @click="createDialogVisible = false"
                  >取消</el-button
                >
              </span>
            </template>
          </el-dialog>
        </div>
        <!-- <div v-if="payType == 'PCI'">
          <el-dialog
            destroy-on-close
            v-model="createDialogVisible"
            :close-on-click-modal="false"
            @close="createDialogClosed"
            title="添加"
            width="800px"
            top="6vh"
          >
            <div>
              <PciCreate ref="createChildRef" />
            </div>
            <template #footer>
              <span class="dialog-footer">
                <el-button type="primary" size="small" @click="submitCreate"
                  >确定</el-button
                >
                <el-button size="small" @click="createDialogVisible = false"
                  >取消</el-button
                >
              </span>
            </template>
          </el-dialog>
        </div> -->
        <div v-if="payType == 'IKU'">
          <el-dialog
            destroy-on-close
            v-model="createDialogVisible"
            :close-on-click-modal="false"
            @close="createDialogClosed"
            title="添加"
            width="800px"
            top="6vh"
          >
            <div>
              <IkuCreate ref="createChildRef" @refreshData="refreshData" />
            </div>
            <template #footer>
              <span class="dialog-footer">
                <el-button type="primary" size="small" @click="submitCreate"
                  >确定</el-button
                >
                <el-button size="small" @click="createDialogVisible = false"
                  >取消</el-button
                >
              </span>
            </template>
          </el-dialog>
        </div>
        <div v-if="payType == 'GEZI'">
          <el-dialog
            destroy-on-close
            v-model="createDialogVisible"
            :close-on-click-modal="false"
            @close="createDialogClosed"
            title="添加"
            width="800px"
            top="6vh"
          >
            <div>
              <CreateGezi ref="createChildRef" @refreshData="refreshData" />
            </div>
            <template #footer>
              <span class="dialog-footer">
                <el-button type="primary" size="small" @click="submitCreate"
                  >确定</el-button
                >
                <el-button size="small" @click="handleClose"
                  >取消</el-button
                >
              </span>
            </template>
          </el-dialog>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
import { main } from "@/hooks/mch/merchantPayment.js";
import { createChildRef } from "@/hooks/mch/merchantPayment.js";
import AbcCreate from "@/views/mch/parametersAbc/Create.vue";
import AbcCodeCreate from "@/views/mch/parametersAbcCode/Create.vue";
import Create from "@/views/mch/parametersAlipay/Create.vue";
import WechatCreate from "@/views/mch/wechatPay/Create.vue";
import PciCreate from "@/views/mch/parametersPci/Create.vue";
import IkuCreate from "@/views/mch/parametersIku/Create.vue";
import CreateGezi from "@/views/mch/parametersGezi/Create.vue";

export default {
  name: "CompanyMerchantPay",
  components: {
    AbcCreate,
    AbcCodeCreate,
    Create,
    WechatCreate,
    PciCreate,
    IkuCreate,
    CreateGezi,
  },
  setup() {
    return {
      ...main(),
      createChildRef,
    };
  },
};
</script>

<style lang="scss" scoped>
.topTipStyle {
  background: #409eff;
  color: white;
  line-height: 40px;
  padding: 0 10px;
}
.border_bottom {
  border-bottom: 1px solid #dcdfe6;
}
// .min_height{
//     height: 20px;
// }
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
      padding: 10px 0;
    }
    td:last-child {
      padding: 10px 0;
    }
  }
}
ul {
  li {
    min-height: 18px;
  }
  li:last-child {
    border-bottom: 0;
  }
}
.editCompanyStyle {
  li {
    opacity: 0;
  }
  li:first-child {
    opacity: 1;
  }
}
</style>
