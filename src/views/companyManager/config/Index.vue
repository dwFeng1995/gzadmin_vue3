<template>
    <div>
        <el-card class="box-card" :body-style="{padding: 0}" shadow="never">
            <div class="ml-20 mt-20 flex-row justify-between align-center ">
                <el-form inline size="small" @submit.prevent="false;">
                    <el-form-item >
                        <el-input v-model.trim="keyWords" placeholder="用户名" @keyup.enter="queryData"></el-input>
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
            <el-table :data="tableData" size="small"  class="w-100" :header-cell-style="{ color:'#000', textAlign:'center'}">
                <el-table-column label="Id" align="center" prop="id"></el-table-column>
                <el-table-column label="用户名" align="center" prop="name"></el-table-column>
                <el-table-column  label="Logo" align="center" >
                    <template #default="{row}">
                        <div class="width-200">
                            <el-image :src="row.logo" class="w-100" :preview-src-list="[row.logo]" fit="fit"></el-image>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="状态" align="center">
                    <template #default="{row}">
                        <el-switch v-model="row.is_on" active-color="#13ce66" inactive-color="#d4d9e1" @change="changeStatus(row)" :active-value="1" :inactive-value="0" />
                    </template>
                </el-table-column>
                <el-table-column label="创建时间" align="center" prop="created_at"></el-table-column>
                <el-table-column label="更新时间" align="center" prop="updated_at"></el-table-column>
                <el-table-column label="操作" align="center" width="180px">
                    <template #default="{row}">
                        <el-button size="mini" type="primary" icon="el-icon-edit"  @click="getDetail(row)">编辑</el-button>
                        <el-button size="mini" type="danger" icon="el-icon-delete"  @click="deleteConfig(row)">删除</el-button>
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
            <el-drawer v-model="createDrawerVisible" size="888px"  destroy-on-close  :z-index="1000" :close-on-click-modal="false"  @close="createDrawerClosed"  title="添加">
                <div class="pl-20  flex-column justify-between">
                    <div class="drawe-centent ">
                        <Create ref="createChildRef" class="pr-10" @refreshData="refreshData" />
                    </div>
                    <div class=" height-180  flex-row justify-around">
                        <div class="mt-30">
                            <el-button type="primary" @click="submitCreate" size="small">确 定</el-button>
                        </div>
                        <div class="mt-30">
                            <el-button type="primary" plain size="small"  @click="createDrawerVisible = false">取 消</el-button>
                        </div>
                    </div>
                </div>
            </el-drawer>
            <el-drawer v-model="updateDrawerVisible" size="888px"  :z-index="1000" destroy-on-close :close-on-click-modal="false"  @close="updateDrawerClosed"  title="编辑">
                <div class="pl-20  flex-column justify-between">
                    <div class="drawe-centent ">
                        <Update ref="updateChildRef" class="pr-10" :detail="detail" @refreshData="refreshData" />
                    </div>
                    <div class=" height-180  flex-row justify-around">
                        <div class="mt-30">
                            <el-button type="primary" @click="submitUpdate" size="small">确 定</el-button>
                        </div>
                        <div class="mt-30">
                            <el-button type="primary" plain size="small"  @click="updateDrawerVisible = false">取 消</el-button>
                        </div>
                    </div>
                </div>
            </el-drawer>
        </el-card>
    </div>
</template>

<script>
    import {main, createChildRef, updateChildRef} from '@/hooks/companyManager/config/index'
    import Create from '@/views/companyManager/config/Create'
    import Update from '@/views/companyManager/config/Update'
    export default {
        name: 'CompanyConfig',
        components: {
            Create,
            Update
        },
        setup() {
            return {
                ...main(),
                createChildRef,
                updateChildRef,
            }
        }
    }
</script>

<style lang="scss" scoped>
.drawe-centent {
    width: 100%;
    height: calc(100vh - 200px) !important;
    overflow-y: auto;
}
</style>
