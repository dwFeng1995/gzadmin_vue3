<template>
  <div class="pl-20 pr-30">
     <div class="ml-20 mt-20 flex-row justify-between align-center">
        <el-form inline size="small">
          <el-form-item label="选择企业：">
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
          <el-form-item label="选择食堂：">
            <el-select filterable clearable v-model="canteenId" placeholder="请选择食堂">
              <el-option
                v-for="item in canteenMiniList"
                :key="item.id"
                :label="item.canteen_name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="设备类型：">
            <el-select
              filterable
              clearable
              v-model="clientTypeId"
              placeholder="请选择设备类型"
            >
              <el-option
                v-for="item in clientTypeMiniList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input
              v-model.trim="keyWords"
              placeholder="设备名称/设备号"
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
        @selection-change="handleSelectionChange"
        max-height="450px"
        :header-cell-style="{ 'text-align': 'center', color: '#000' }"
        :data="tableData"
        size="mini"
        align="center"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column align="center" width="140" label="企业名称">
          <template #default="{ row }">
            <div>{{ row?.company?.company_name }}</div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="食堂名称">
          <template #default="{ row }">
            <div>{{ row?.canteen?.canteen_name }}</div>
          </template>
        </el-table-column>
        <el-table-column
          label="设备名称"
          align="center"
          prop="client_name"
        ></el-table-column>
        <el-table-column
          label="设备编号"
          align="center"
          prop="client_no"
        ></el-table-column>
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
  </div>
</template>
<script>
import { main } from "@/hooks/client/clientActivationCode/create.js";
export default {
  setup(props,{emit}) {
    return {
      ...main(emit),
    };
  },
};
</script>
<style lang="scss" scoped></style>
