<template>
  <div>
    <el-card class="box-card">
      <div class="p-20 flex-row justify-between align-center">
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
        <el-form inline size="small">
          <el-form-item>
            <el-button type="danger" @click="dialogVisible = true">批量删除</el-button>
          </el-form-item>
        </el-form>
      </div>

      <div v-if="tableData.length == 0" class="el-table__empty-block"></div>
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

      <el-dialog v-model="dialogVisible" title="" width="30%" :before-close="handleClose">
        <el-form inline size="small" ref="formRef">
          <el-form-item label="选择企业列表">
            <el-select
              v-model="companyId"
              class="m-2"
              placeholder="请选择企业列表"
              size="large"
              @change="changeCompany"
            >
              <el-option
                v-for="item in companyMiniList"
                :key="item.id"
                :label="item.company_name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-form>
        <!-- 数据 -->
        <div v-if="companyId">
          <el-menu
            :default-active="activeIndex"
            @select="handleSelect"
            class="el-menu-demo"
            mode="horizontal"
          >
            <el-menu-item index="1">用户组</el-menu-item>
            <el-menu-item index="2">部门</el-menu-item>
          </el-menu>

          <div v-if="activeIndex == 1">
            <div v-if="userGroupList.length == 0" class="el-table__empty-block"></div>
            <el-table
              v-else
              ref="multipleTableRef"
              :data="userGroupList"
              style="width: 100%"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="55" />
              <el-table-column label="用户组名称" prop="group_name" />
            </el-table>
          </div>

          <div v-if="activeIndex == 2">
            <el-tree
              ref="treeRef"
              :data="departList"
              @check-change="handleCheckChange"
              :props="props"
              node-key="id"
              show-checkbox
            />
          </div>
        </div>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" v-if="companyId" @click="handleDelete"
              >删除</el-button
            >
          </span>
        </template>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
import { main,treeRef } from "@/hooks/userAdmin/userList/index.js";
export default {
  name: "UserList",
  setup() {
    return {
      ...main(),
      treeRef
    };
  },
};
</script>
