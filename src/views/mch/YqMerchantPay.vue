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
              filterable
              collapse-tags
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
                    企业商户配置绑定：显示总后台设置的【支付方式配置】【H5下单支付方式】、【后台充值方式】、【H5充值方式】的配置情况。一个支付平台涉及多个支付平台商的需自行另外配置。
                </div> -->
        <el-alert
          title="企业商户配置绑定：显示总后台设置的【支付方式配置】【H5下单支付方式】、【后台充值方式】、【H5充值方式】的配置情况。一个支付平台涉及多个支付平台商的需自行另外配置。"
          type="success"
          :closable="false"
        />
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
          prop="merchant"
          label="平台商户号"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="platform"
          label="支付平台"
        ></el-table-column>

        <el-table-column align="center" width="200" label="H5充值">
          <template #default="scope">
            <div v-if="scope.row.h5_recharge">
              <div>
                {{ scope.row.h5_recharge.user_type == 1 ? "用户组" : "部门" }}数：{{
                  scope.row.h5_recharge.user_data_name
                    ? scope.row.h5_recharge.user_data_name.split(",").length
                    : 0
                }}个{{ scope.row.h5_recharge.user_type == 1 ? "用户组" : "部门" }}
              </div>
              <div>
                {{ scope.row.h5_recharge.user_type == 1 ? "用户组" : "部门" }}详情：
                {{ scope.row.h5_recharge.user_data_name.split(",")[0] }}
              </div>

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
            <div v-else>多平台商户模式，需单独配置，才可充值成功</div>
          </template>
        </el-table-column>
        <el-table-column align="center" width="200" label="后台充值">
          <template #default="scope">
            <div v-if="scope.row.back_recharge">
              <div>
                {{ scope.row.back_recharge.user_type == 1 ? "用户组" : "部门" }}数：{{
                  scope.row.back_recharge.user_data_name
                    ? scope.row.back_recharge.user_data_name.split(",").length
                    : 0
                }}个{{ scope.row.back_recharge.user_type == 1 ? "用户组" : "部门" }}
              </div>
              <div>
                {{ scope.row.back_recharge.user_type == 1 ? "用户组" : "部门" }}详情：
                {{ scope.row.back_recharge.user_data_name.split(",")[0] }}
              </div>

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
            <div v-else>多平台商户模式，需单独配置，才可充值成功</div>
          </template>
        </el-table-column>
        <el-table-column align="center" width="200" label="H5下单支付">
          <template #default="scope">
            <div v-if="scope.row.h5_pay">
              <div>
                收款类型：<span v-if="scope.row.h5_pay.pay_type">
                  按{{
                  scope.row.h5_pay.pay_type == 1 && scope.row.h5_pay.user_type == 1
                    ? "用户组"
                    : scope.row.h5_pay.pay_type == 1 && scope.row.h5_pay.user_type == 2
                    ? "部门"
                    : "档口"
                }}
                </span>
                <span v-else>暂无</span>
              </div>
              <div>
             <span v-if="scope.row.h5_pay.pay_type">
                  {{
                  scope.row.h5_pay.pay_type == 1 && scope.row.h5_pay.user_type == 1
                    ? "用户组"
                    : scope.row.h5_pay.pay_type == 1 && scope.row.h5_pay.user_type == 2
                    ? "部门"
                    : "档口"
                }}数：{{
                  scope.row.h5_pay.user_data_name
                    ? scope.row.h5_pay.user_data_name.split(",").length
                    : 0
                }}个
                {{
                  scope.row.h5_pay.pay_type == 1 && scope.row.h5_pay.user_type == 1
                    ? "用户组"
                    : scope.row.h5_pay.pay_type == 1 && scope.row.h5_pay.user_type == 2
                    ? "部门"
                    : "档口"
                }}
             </span>
              </div>
              <div>
              <span v-if="scope.row.h5_pay.pay_type">
                  {{
                  scope.row.h5_pay.pay_type == 1 && scope.row.h5_pay.user_type == 1
                    ? "用户组"
                    : scope.row.h5_pay.pay_type == 1 && scope.row.h5_pay.user_type == 2
                    ? "部门"
                    : "档口"
                }}
                </span>详情：
                {{ scope.row.h5_pay.user_data_name?scope.row.h5_pay.user_data_name.split(",")[0]:'暂无' }}
              </div>
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
                    >+{{ scope.row.h5_pay.user_data_name.split(",").length }}详情</el-tag
                  >
                </template>
              </el-popover>
            </div>
            <div v-else>多平台商户模式，需单独配置，才可充值成功</div>
          </template>
        </el-table-column>
        <el-table-column align="center" width="200" label="设备消费">
          <template #default="scope">
            <div v-if="scope.row.client_pay">
              <div>
                收款设备：
                {{
                  scope.row.client_pay.user_data_name
                    ? scope.row.client_pay.user_data_name.split(",").length
                    : 0
                }}台
              </div>
              <div>
                收款详情：
                {{ scope.row.client_pay.user_data_name.split(",")[0] }}
              </div>
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
            <div v-else>多平台商户模式，需单独配置，才可充值成功</div>
          </template>
        </el-table-column>
        <el-table-column align="center" width="150" label="操作">
          <template #default="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              @click="handleRevamp(scope.row)"
              size="small"
              >配置</el-button
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
            <th>一清支付平台</th>
            <th>支付平台商户名称</th>
            <th>H5充值</th>
            <th>后台充值</th>
            <th>H5下单支付</th>
            <th>设备消费</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in tableData" :key="index">
            <td>{{ item.company_name }}</td>
            <td>{{ item.company_no }}</td>
            <td>
              <ul class="p-0">
                <li
                  v-for="(item1, index1) in item.info"
                  :key="index1"
                  class="list-style-none min_height border_bottom"
                >
                  <ul
                    class="p-0 editCompanyStyle"
                    v-if="item1.mch_form_info_arr.length > 0"
                  >
                    <li
                      v-for="(bitem, bindex) in item1.mch_form_info_arr"
                      class="list-style-none"
                      :key="bindex"
                    >
                      {{ item1.name }}
                    </li>
                  </ul>
                  <ul class="p-0 editCompanyStyle" v-else>
                    <li class="list-style-none">
                      {{ item1.name }}
                    </li>
                  </ul>
                </li>
              </ul>
            </td>
            <td>
              <div>
                <ul class="p-0">
                  <li
                    v-for="(bitem, bindex) in item.info"
                    class="list-style-none min_height border_bottom"
                    :key="bindex"
                  >
                    <div
                      v-for="(item2, index2) in bitem.mch_form_info_arr"
                      :key="index2"
                      class="borchild"
                    >
                      {{ item2.name }}
                    </div>
                  </li>
                </ul>
              </div>
            </td>
            <td>
              <div>
                <ul class="p-0">
                  <li
                    v-for="(bitem, bindex) in item.info"
                    class="list-style-none min_height border_bottom"
                    :key="bindex"
                  >
                    <div
                      v-for="(item2, index2) in bitem.mch_form_info_arr"
                      :key="index2"
                      class="borchild"
                    >
                      {{ item2.payTypeName }}
                    </div>
                  </li>
                </ul>
              </div>
            </td>
            <td>
              <div>
                <ul class="p-0">
                  <li
                    v-for="(bitem, bindex) in item.info"
                    class="list-style-none min_height border_bottom"
                    :key="bindex"
                  >
                    <div v-if="bitem.h5_recharge_arr.length">
                      <div
                        v-for="(item2, index2) in bitem.h5_recharge_arr"
                        :key="index2"
                        class="borchild"
                      >
                        <div v-if="item2">
                          <div class="mb-5">
                            {{ item2.user_type == 1 ? "用户组" : "部门" }}数：
                            {{
                              item2.user_data_name
                                ? item2.user_data_name.split(",").length
                                : 0
                            }}个{{ item2.user_type == 1 ? "用户组" : "部门" }}
                          </div>
                          <div>
                            <span class="mr-10 text">
                              {{ item2.user_type == 1 ? "用户组" : "部门" }}详情：{{
                                item2.user_data_name.split(",")[0]
                              }}
                            </span>
                            <el-popover
                              v-if="item2.user_data_name.length > 4"
                              :width="300"
                              trigger="hover"
                              :title="item2.user_type == 1 ? '用户组' : '部门'"
                            >
                              <div style="max-height: 200px; overflow-y: auto;p-10">
                                {{ item2.user_data_name }}
                              </div>
                              <template #reference>
                                <el-tag size="small"
                                  >+{{
                                    item2.user_data_name.split(",").length
                                  }}详情</el-tag
                                >
                              </template>
                            </el-popover>
                          </div>
                        </div>
                        <div v-else>多平台商户模式，需单独配置，才可充值成功</div>
                      </div>
                    </div>
                    <div v-else>多平台商户模式，需单独配置，才可充值成功</div>
                  </li>
                </ul>
              </div>
            </td>
            <td>
              <div>
                <ul class="p-0">
                  <li
                    v-for="(bitem, bindex) in item.info"
                    class="list-style-none min_height border_bottom"
                    :key="bindex"
                  >
                    <div v-if="bitem.back_recharge_arr.length">
                      <div
                        v-for="(item2, index2) in bitem.back_recharge_arr"
                        :key="index2"
                        class="borchild"
                      >
                        <div v-if="item2">
                          <div class="mb-5">
                            {{ item2.user_type == 1 ? "用户组" : "部门" }}数：
                            {{
                              item2.user_data_name
                                ? item2.user_data_name.split(",").length
                                : 0
                            }}个{{ item2.user_type == 1 ? "用户组" : "部门" }}
                          </div>
                          <span class="text mt-5">
                            {{ item2.user_type == 1 ? "用户组" : "部门" }}详情：{{
                              item2.user_data_name.split(",")[0]
                            }}
                          </span>
                          <el-popover
                            v-if="item2.user_data_name.length > 4"
                            :width="300"
                            trigger="hover"
                            :title="item2.user_type == 1 ? '用户组' : '部门'"
                          >
                            <div style="max-height: 200px; overflow-y: auto;p-10">
                              {{ item2.user_data_name }}
                            </div>
                            <template #reference>
                              <el-tag size="small"
                                >+{{ item2.user_data_name.split(",").length }}详情</el-tag
                              >
                            </template>
                          </el-popover>
                        </div>
                        <div v-else>多平台商户模式，需单独配置，才可充值成功</div>
                      </div>
                    </div>
                    <div v-else>多平台商户模式，需单独配置，才可充值成功</div>
                  </li>
                </ul>
              </div>
            </td>
            <td>
              <div>
                <ul class="p-0">
                  <li
                    v-for="(bitem, bindex) in item.info"
                    class="list-style-none min_height border_bottom"
                    :key="bindex"
                  >
                    <div v-if="bitem.h5_pay_arr.length">
                      <div
                        v-for="(item2, index2) in bitem.h5_pay_arr"
                        :key="index2"
                        class="borchild"
                      >
                        <div v-if="item2 && item2.pay_type">
                          收款类型：
                          <span v-if="item2.pay_type == 1">
                            按{{ item.user_type == 1 ? "用户组" : "部门" }}
                          </span>
                          <span v-if="item2.pay_type == 2"> 按档口 </span>
                          <br />

                          <div v-if="item2.pay_type == 1">
                            {{ item.user_type == 1 ? "用户组" : "部门" }}数：{{
                              item2.user_data_name
                                ? item2.user_data_name.split(",").length
                                : 0
                            }}个{{ item.user_type == 1 ? "用户组" : "部门" }}
                          </div>
                          <div v-if="item2.pay_type == 2">
                            档口数：{{
                              item2.user_data_name
                                ? item2.user_data_name.split(",").length
                                : 0
                            }}个档口
                          </div>

                          <span class="text" v-if="item2.pay_type == 1">
                            {{ item.user_type == 1 ? "用户组" : "部门" }}详情：{{
                              item2.user_data_name.split(",")[0]
                            }}
                          </span>
                          <span class="text" v-if="item2.pay_type == 2">
                            档口详情：{{ item2.user_data_name.split(",")[0] }}
                          </span>

                          <el-popover
                            v-if="item2.user_data_name.length > 4"
                            :title="item2.pay_type == 1 ? '所属' : '档口'"
                            :width="300"
                            trigger="hover"
                          >
                            <div style="max-height: 200px; overflow-y: auto;p-10">
                              {{ item2.user_data_name }}
                            </div>
                            <template #reference>
                              <el-tag size="small"
                                >+{{ item2.user_data_name.split(",").length }}详情</el-tag
                              >
                            </template>
                          </el-popover>
                        </div>
                        <div v-else>多平台商户模式，需单独配置，才可充值成功</div>
                      </div>
                    </div>
                    <div v-else>多平台商户模式，需单独配置，才可充值成功</div>
                  </li>
                </ul>
              </div>
            </td>
            <td>
              <div>
                <ul class="p-0">
                  <li
                    v-for="(bitem, bindex) in item.info"
                    class="list-style-none min_height border_bottom"
                    :key="bindex"
                  >
                    <div v-if="bitem.client_pay_arr.length">
                      <div
                        v-for="(item2, index2) in bitem.client_pay_arr"
                        :key="index2"
                        class="borchild"
                      >
                        <div v-if="item2">
                          收款设备：{{
                            item2.user_data_name
                              ? item2.user_data_name.split(",").length
                              : 0
                          }}台
                          <br />

                          <div class="text">设备详情：{{ item2.user_data_name }}</div>
                          <el-popover
                            v-if="item2.user_data_name.length > 7"
                            title="设备"
                            :width="300"
                            trigger="hover"
                            :content="item2.user_data_name"
                          >
                            <template #reference>
                              <el-tag size="small"
                                >+{{ item2.user_data_name.split(",").length }}详情</el-tag
                              >
                            </template>
                          </el-popover>
                        </div>
                        <div v-else>多平台商户模式，需单独配置，才可充值成功</div>
                      </div>
                    </div>
                    <div v-else>多平台商户模式，需单独配置，才可充值成功</div>
                  </li>
                </ul>
              </div>
            </td>
            <td>
              <ul class="p-0">
                <li
                  v-for="(bitem, bindex) in item.info"
                  class="list-style-none min_height border_bottom"
                  :key="bindex"
                >
                  <div v-if="bitem.mch_form_info_arr.length">
                    <div
                      v-for="(item2, index2) in bitem.mch_form_info_arr"
                      :key="index2"
                      class="borchild"
                      @click="openConfigureClick(item.info[bindex], item2)"
                    >
                      <div class="btnStyle">配置</div>
                    </div>
                  </div>
                </li>
              </ul>
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
      <div class="drawer">
        <el-drawer v-model="updateDialogVisible" size="1000px" title="配置收费场景">
          <div class="pl-20 pr-20 pb-10 font-size-14">
            <el-alert
              title="温馨提示：人员的部门，用户组信息发生变动后， 此人对应的收款方则按照新部门，新用户组的设置运用。"
              type="success"
              :closable="false"
            />
          </div>
          <h4 class="ml-20">{{ companyMerchantInfo.mchName }}</h4>
          <div class="p-20">
            <div class="flex-row mb-15">
              <div class="itemStyle">
                <div class="text-center">H5充值</div>
                <div class="mt-10 mb-10">
                  用户在H5充值时，选择支付方式为此支付平台时，钱则入账到此商户
                </div>
                <div>
                  当前可收款
                  <span v-if="h5_recharge_info.userTypeId == 1"
                    >用户组
                    <span>{{ h5_recharge_info.userGroupIds.length }}个</span>
                  </span>
                  <span v-else-if="h5_recharge_info.userTypeId == 2"
                    >部门
                    <span class="text-red"
                      >{{ h5_recharge_info.userDepartIds.length }}个</span
                    >
                  </span>
                </div>
              </div>
              <div class="flex-row ml-20">
                <el-select
                  v-model="h5_recharge_info.userTypeId"
                  @change="selectUserType"
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
                <div class="ml-20 width-300" v-if="h5_recharge_info.userTypeId == 1">
                  <treeselect
                    placeholder="请选择"
                    v-model="h5_recharge_info.userGroupIds"
                    :multiple="true"
                    :options="userGroupList"
                    :normalizer="normalizer"
                    valueConsistsOf="ALL"
                    :show-count="true"
                    sort-value-by="sortValueBy"
                    :default-expand-level="1"
                    noOptionsText="暂无数据"
                    limit="4"
                  >
                  </treeselect>
                </div>
                <div class="ml-20 width-300" v-if="h5_recharge_info.userTypeId == 2">
                  <treeselect
                    placeholder="请选择"
                    v-model="h5_recharge_info.userDepartIds"
                    :multiple="true"
                    :options="departList"
                    :normalizer="normalizer"
                    :clearable="false"
                    valueConsistsOf="ALL"
                    :show-count="true"
                    sort-value-by="ORDER_SELECTED"
                    :default-expand-level="1"
                    noOptionsText="暂无数据"
                    limit="4"
                  >
                  </treeselect>
                </div>
              </div>
            </div>

            <div class="flex-row mb-15">
              <div class="itemStyle">
                <div class="text-center">后台充值</div>
                <div class="mt-10 mb-10">
                  后台充值时，选择支付方式为此支付平台时，则钱会入账到此商户
                </div>
                <div>
                  当前可收款
                  <span v-if="h5_recharge_info.userTypeId == 1"
                    >用户组
                    <span>{{ back_recharge_info.userGroupIds.length }}个</span>
                  </span>
                  <span v-else-if="h5_recharge_info.userTypeId == 2"
                    >部门
                    <span class="text-red"
                      >{{ back_recharge_info.userDepartIds.length }}个</span
                    >
                  </span>
                </div>
              </div>
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
                <div class="ml-20 width-300" v-if="h5_recharge_info.userTypeId == 1">
                  <treeselect
                    placeholder="请选择"
                    v-model="back_recharge_info.userGroupIds"
                    :multiple="true"
                    :options="userGroupList"
                    :normalizer="normalizer"
                    :clearable="false"
                    valueConsistsOf="ALL"
                    :show-count="true"
                    :default-expand-level="1"
                    sort-value-by="ORDER_SELECTED"
                    noOptionsText="暂无数据"
                    limit="4"
                  >
                  </treeselect>
                </div>
                <div class="ml-20 width-300" v-if="h5_recharge_info.userTypeId == 2">
                  <treeselect
                    placeholder="请选择"
                    v-model="back_recharge_info.userDepartIds"
                    :multiple="true"
                    :options="departList"
                    :normalizer="normalizer"
                    :clearable="false"
                    valueConsistsOf="ALL"
                    sort-value-by="ORDER_SELECTED"
                    :show-count="true"
                    :default-expand-level="1"
                    noOptionsText="暂无数据"
                    limit="4"
                  >
                  </treeselect>
                </div>
              </div>
            </div>

            <div class="flex-row mb-15">
              <div class="itemStyle">
                <div class="text-center">H5下单支付</div>
                <div class="mt-10 mb-10">
                  用户在H5下单支付时，选择支付方式为此支付平台时，则钱直接入账到此商户
                </div>
                <div>
                  收款类型
                  <el-select
                    v-model="h5_pay_info.collectionTypeId"
                    placeholder="选择收款类型"
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
              </div>
              <div>
                <div class="flex-row ml-20">
                  <div class="flex-row ml-20" v-if="h5_pay_info.collectionTypeId == 1">
                    <el-select
                      v-model="h5_pay_info.userTypeId"
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
                    <div>
                      <div class="ml-20 width-300" v-if="h5_pay_info.userTypeId == 1">
                        <treeselect
                          placeholder="请选择"
                          v-model="h5_pay_info.userGroupIds"
                          :multiple="true"
                          :options="userGroupList"
                          :normalizer="normalizerPay"
                          :clearable="false"
                          valueConsistsOf="ALL"
                          :show-count="true"
                          noOptionsText="暂无数据"
                          limit="4"
                        >
                        </treeselect>
                      </div>
                      <div class="ml-20 width-300" v-if="h5_pay_info.userTypeId == 2">
                        <treeselect
                          placeholder="请选择"
                          v-model="h5_pay_info.userDepartIds"
                          :multiple="true"
                          :options="departList"
                          :normalizer="normalizerPay"
                          :clearable="false"
                          valueConsistsOf="ALL"
                          :show-count="true"
                          noOptionsText="暂无数据"
                          limit="4"
                        >
                        </treeselect>
                      </div>
                    </div>
                  </div>
                  <div class="mt-20 ml-20" v-if="h5_pay_info.collectionTypeId == 2">
                    <div class="font-size-14">按档口</div>
                    <el-select
                      v-model="h5_pay_info.canteenIds"
                      filterable
                      clearable
                      multiple
                      collapse-tags
                    >
                      <el-option
                        v-for="item in canteenMiniList"
                        :key="item.id"
                        :label="item.canteen_name"
                        :value="item.id"
                      >
                      </el-option>
                    </el-select>
                  </div>
                </div>
              </div>
            </div>

            <div class="flex-row mb-20">
              <div class="itemStyle">
                <div class="text-center">设备消费</div>
                <div class="mt-10 mb-10">
                  用户在设备上消费时，选择支付方式为此支付平台时，则钱直接入账到此商户。
                </div>
                <div>
                  收费
                  <span
                    >已选中<span class="text-red">{{
                      client_pay_info.clientIds.length
                    }}</span
                    >台</span
                  >
                </div>
              </div>
              <div class="ml-20 width-300">
                <!-- <el-select
                  v-model="client_pay_info.clientIds"
                  filterable
                  multiple
                  clearable
                  collapse-tags
                  placeholder="选择设备"
                >
                  <el-option
                    v-for="item in clientMiniList"
                    :key="item.id"
                    :label="item.client_name"
                    :value="item.id"
                    :disabled="item.disabled"
                  >
                  </el-option>
                </el-select> -->
                <!-- <treeselect
                  v-model="client_pay_info.clientIds"
                  :multiple="true"
                  :options="facilityAllList"
                  :normalizer="normalizeRfacility"
                  :clearable="false"
                  valueConsistsOf="LEAF_PRIORITY"
                  :show-count="true"
                  noOptionsText="暂无数据"
                >
                </treeselect> -->
                <el-cascader
                  v-model="client_pay_info.clientIds"
                  :options="facilityAllList"
                  :props="props"
                  collapse-tags
                  collapse-tags-tooltip
                  clearable
                  filterable
                  :show-all-levels="false"
                />
              </div>
            </div>
          </div>
          <div class="flex-row justify-end mr-20">
            <el-button size="mini" @click="updateDialogVisible = false">取消</el-button>
            <el-button size="mini" type="primary" @click="submitUpdate"
              >保存设置</el-button
            >
          </div>
        </el-drawer>
      </div>
    </el-card>
  </div>
</template>

<script>
import { main } from "@/hooks/mch/yqMerchantPay.js";
import Treeselect from "vue3-treeselect";
import "vue3-treeselect/dist/vue3-treeselect.css";
export default {
  name: "YqMerchantPay",
  components: {
    Treeselect,
  },
  setup() {
    return {
      ...main(),
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

.itemStyle {
  width: 200px;
  border: 1px solid #ddd;
  padding: 20px;
  font-size: 14px;
}
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
        width: 200px;
      }
    }
  }
  tbody {
    td {
      padding: 0px 0 !important;
      border: 1px solid #dcdfe6;
      width: 200px;
    }
    td:last-child {
      padding: 20px 0;
    }
  }
  ul {
    li {
      min-height: 50px;
    }
    li:last-child {
      padding: 20px 0;
      border-bottom: 0;
    }
  }
}
.borchild {
  width: 200px;
  border-bottom: 1px solid #dcdfe6;
  height: 50px;
  padding: 10px 5px;
}
.borchild:last-child {
  border-bottom: none;
}
.text {
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 120px;
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
