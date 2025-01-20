<template>
  <div>
    <el-card class="box-card" :body-style="{ padding: 0 }" shadow="never">
      <div class="ml-20 mt-20 flex-row justify-between align-center">
        <el-form inline size="small">
          <el-form-item label="企业：">
            <el-select filterable clearable v-model="companyId" placeholder="请选择企业">
              <el-option
                v-for="item in companyMiniList"
                :key="item.id"
                :label="item.company_name"
                :value="item.id"
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
        <el-form size="small" inline>
          <el-form-item>
            <el-button type="primary" @click="createDialogVisible = true">添加</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table
        :span-method="objectSpanMethod"
        :header-cell-style="{ 'text-align': 'center', color: '#000' }"
        :data="tableData"
        size="small"
        align="center"
        border style="width: 100%"
      >
        <el-table-column align="center" prop="company_name" label="企业" />
        <el-table-column align="center" prop="company_no" label="企业号" />
        <el-table-column align="center" prop="name" label="支付平台商户名称" />
        <el-table-column align="center" prop="appid" label="appid" />
        <el-table-column align="center" prop="rsa2_key_path" label="rsa2_key_path" />
        <el-table-column align="center" prop="remark" label="备注" />
        <el-table-column align="center" prop="rsa2" label="rsa2" />
        <el-table-column align="center" label="操作" width="180">
          <template #default="{ row }">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="getMchPlatformDetail(row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="deleteMchPlatform(row)"
              >删除</el-button
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
      <div>
        <el-dialog
          destroy-on-close
          v-model="updateDialogVisible"
          :close-on-click-modal="false"
          @close="updateDialogClosed"
          title="编辑"
          width="688px"
          top="6vh"
        >
          <div>
            <Update ref="updateChildRef" :detail="detail" @refreshData="refreshData" />
          </div>
          <template #footer>
            <span class="dialog-footer">
              <el-button type="primary" size="small" @click="submitUpdate"
                >确定</el-button
              >
              <el-button size="small" @click="updateDialogVisible = false"
                >取消</el-button
              >
            </span>
          </template>
        </el-dialog>
      </div>
    </el-card>
  </div>
</template>

<script>
import {
  main,
  createChildRef,
  updateChildRef,
} from "@/hooks/mch/parametersAlipay/index.js";
import Create from "@/views/mch/parametersAlipay/Create.vue";
import Update from "@/views/mch/parametersAlipay/Update.vue";
export default {
  name: "ParametersAlipay",
  components: {
    Create,
    Update,
  },
  setup() {
    return {
      ...main(),
      createChildRef,
      updateChildRef,
    };
  },
};
</script>

<style lang="scss" scoped></style>
