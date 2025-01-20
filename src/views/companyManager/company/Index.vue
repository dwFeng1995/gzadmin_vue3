<template>
  <div>
    <el-card class="box-card" :body-style="{padding: 0}" shadow="never">
      <div class="ml-20 mt-20 flex-row justify-between align-center ">
        <el-form inline size="small" @submit.prevent="false;">
          <el-form-item >
            <el-input v-model.trim="keyWords" placeholder="企业号/企业名称" @keyup.enter="queryData"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="queryData">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"  @click="resetData" icon="el-icon-refresh"> </el-button>
          </el-form-item>
        </el-form>
        <el-form size="small" inline>
          <el-form-item>
            <el-button type="primary" @click="goToCreate" >添加</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table :header-cell-style="{'text-align':'center','color':'#000'}" :data="tableData" size="small" align="center">
        <el-table-column align="center" prop="user" label="企业用户" > </el-table-column>
        <el-table-column align="center" prop="company_name" label="企业名称" > </el-table-column>
        <el-table-column  align="center"  prop="company_no" label="企业号" >  </el-table-column>
        <el-table-column  align="center" prop="remark" label="备注" >  </el-table-column>
        <el-table-column align="center"   label="档口管理">
          <template #default="{row}">
            <div v-if="row.company_canteen_function.enable === 2">
              <el-tag size="small" type="warning">仅支持后台添加</el-tag>
            </div>
            <div v-else>
              <el-tag size="small" type="success">支持自添加<span v-text="JSON.parse(row.company_canteen_function.data) + '个'"></span></el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center"   label="设备管理">
          <template #default="{row}">
            <div v-if="row.company_client_function === 2">
              <el-tag size="small" type="warning">仅支持后台添加</el-tag>
            </div>
            <div v-else>
              <el-tag size="small" type="success">支持自添加</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column  align="center" prop="create_at" label="创建时间" >  </el-table-column>
        <el-table-column  align="center" width="100px" label="操作">
          <template  #default="{row}">
            <el-button size="mini" type="primary" icon="el-icon-edit"  @click="goToUpdate(row)">编辑</el-button>
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
                @current-change="changePageIndex">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import {main} from '@/hooks/companyManager/company/index'
export default {
  name: 'Company',
  setup() {
    return {
      ...main()
    }
  }
}
</script>

<style>

</style>
