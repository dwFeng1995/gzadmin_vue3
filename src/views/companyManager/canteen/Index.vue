<template>
    <div>
        <el-card class="box-card" :body-style="{padding: 0}" shadow="never">
            <div class="ml-20 mt-20 flex-row justify-between align-center ">
                <el-form inline size="small">
                    <el-form-item  label="企业：">
                        <el-select filterable clearable v-model="companyId" placeholder="请选择企业">
                            <el-option
                                    v-for="item in companyMiniList"
                                    :key="item.id"
                                    :label="item.company_name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item >
                        <el-input v-model.trim="keyWords" placeholder="食堂编号/食堂名称" @keyup.enter="queryData"></el-input>
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
                        <el-button type="primary" @click="createDrawerVisible = true" >添加</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <el-table :header-cell-style="{'text-align':'center','color':'#000'}" :data="tableData" size="small" align="center" class="w-100">
                <el-table-column prop="id" label="Id" align="center" />
                <el-table-column label="企业名称" align="center">
                    <template #default="{row}">
                        <div>{{row.company.company_name}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="企业号" align="center">
                    <template #default="{row}">
                        <div>{{row.company.company_no}}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="canteen_name" label="食堂名称" align="center" />
                <el-table-column prop="canteen_no" label="食堂编号" align="center" />
                <el-table-column label="添加类型" align="center">
                    <template #default="{row}">
                        <div v-if="row.admin_id  === 0">后台添加</div>
                        <div v-else>自添加</div>
                    </template>
                </el-table-column>
                <el-table-column prop="canteen_phone" label="食堂电话" align="center" />
                <el-table-column prop="canteen_address" label="食堂地址" align="center" />
                <el-table-column prop="opening_hours" label="营业时间" align="center" />
                <el-table-column prop="appid" label="appid" align="center" />
                <el-table-column label="人脸系统" align="center">
                    <template #default="{row}">
                        <div v-if="row.facesystem.length >0">
                            <el-tag size="small" class="mt-2 mb-2" v-for="item in row.facesystem" :key="item.id">{{item.name}}</el-tag>
                        </div>
                        <div v-else>
                            <el-tag  size="small" type="danger">暂无</el-tag>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="remark" label="备注" align="center" />
                <el-table-column label="操作" align="center" width="180px">
                    <template #default="{row}">
                        <el-button size="mini" type="primary" icon="el-icon-edit"  @click="getCanteenDetail(row)">编辑</el-button>
<!--                        <el-button size="mini" type="primary" icon="el-icon-edit"  @click="getCanteenDetail({id: 8888})">编辑</el-button>-->
                        <el-button size="mini" type="danger" icon="el-icon-delete"  @click="deleteCanteen(row)">删除</el-button>
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
        <el-drawer @close="createDrawerClosed" v-model="createDrawerVisible" title="添加" :close-on-click-modal="false" :size="555">
            <Create ref="createClildRef" @refreshData="refreshData" />
        </el-drawer>
        <el-drawer v-model="updateDrawerVisible" title="编辑" :close-on-click-modal="false"  destroy-on-close @close="updateDrawerClosed"  :size="555">
            <Update ref="updateClildRef" :detail="detail"  @refreshData="refreshData" />
        </el-drawer>
    </div>
</template>
<!--updateDrawerVisible-->
<script>
import Create from '@/views/companyManager/canteen/Create'
import Update from '@/views/companyManager/canteen/Update'
import  {main, createClildRef, updateClildRef } from '@/hooks/companyManager/canteen/index'
export default {
    name: "Canteen",
    components: {
        Create,
        Update
    },
    setup() {
       return {
           ...main(),
           createClildRef,
           updateClildRef
       }
    }
}
</script>

<style lang="scss" scoped>

</style>
