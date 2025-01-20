<template>
  <div>
    <el-card class="box-card" :body-style="{ padding: 0 }" shadow="never">
      <div class="ml-20 mt-20 flex-row justify-between align-center">
        <el-form inline size="small" @submit.prevent="false">
          <el-form-item>
            <el-input
              v-model.trim="keyWords"
              placeholder="设备/名称/类型"
              @keyup.enter="queryData"
            ></el-input>
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
      <el-table
        :header-cell-style="{ 'text-align': 'center', color: '#000' }"
        :data="tableData"
        size="small"
        align="center"
      >
        <el-table-column align="center" prop="id" label="Id" width="50px" />
        <el-table-column align="center" prop="name" label="设备名称" width="160px" />
        <el-table-column
          align="center"
          prop="client_type"
          label="设备类型"
          width="160px"
        />
        <el-table-column align="center" label="关联模式">
          <template #default="{ row }">
            <div>
              <el-tag
                v-for="item in row?.pay_source"
                class="mr-4 mb-4"
                size="small"
                type="success"
                :key="item.id"
              >
                {{ item.name }}
              </el-tag>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center" width="180px">
          <template #default="{ row }">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="getClientDetail(row)"
              >编辑</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <div>
        <el-dialog
          destroy-on-close
          v-model="updateDialogVisible"
          :close-on-click-modal="false"
          @close="updateDialogClosed"
          title="编辑"
          width="555px"
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
import { main } from "@/hooks/client/clientTypeRelevancy/index.js";
import Update from '@/views/client/clientTypeRelevancy/Update.vue'
export default {
  name: "ClientTypeRelevancy",
  components:{Update},
  setup() {
    return {
      ...main(),
    };
  },
};
</script>
