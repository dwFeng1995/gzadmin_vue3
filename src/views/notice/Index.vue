<template>
  <div>
    <el-card class="box-card">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" label="序号" width="50" />
        <el-table-column prop="name" label="模块" />
        <el-table-column label="升级提示">
          <template #default="scope">
            <div class="width-80 height-80" v-if="scope.row.code == 'ADMIN'">
              <el-image
                :preview-src-list="[scope.row.data]"
                :src="scope.row.data"
                class="width-100 height-100"
                fit="fit"
              />
            </div>
            <div v-else>
              <div v-html="scope.row.data"></div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="是否开启">
          <template #default="scope">
            <el-switch
              v-model="scope.row.enable"
              class="ml-2"
              active-color="#13ce66"
              inactive-color="#ddd"
              @change="changeSwitch(scope.row)"
            />
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="primary" size="small" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-drawer
      v-model="updateDrawerVisible"
      :size="Info.code == 'ADMIN'?'650px':'888px'"
      destroy-on-close
      :z-index="1000"
      :close-on-click-modal="false"
      title="编辑"
      @close="updateDrawerClosed"
    >
      <div class="pr-50 flex-column justify-between">
        <div class="drawe-centent">
          <Create
            :Info="Info"
            ref="updateChildRef"
            class="pr-10 pl-20"
            @refreshData="refreshData"
          />
        </div>
        <div class="flex-row justify-around">
          <div class="mt-30">
            <el-button type="primary" @click="submitUpdate" size="small">确 定</el-button>
          </div>
          <div class="mt-30">
            <el-button
              type="primary"
              plain
              size="small"
              @click="updateDrawerVisible = false"
              >取 消</el-button
            >
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>
<script>
import { main } from "@/hooks/notice/index.js";
import Create from "@/views/notice/Create";
export default {
  components: { Create },
  setup() {
    return {
      ...main(),
    };
  },
};
</script>
<style lang="scss" scoped>
.drawe-centent {
  width: 100%;
  height: calc(100vh - 200px) !important;
  overflow-y: auto;
}
</style>
