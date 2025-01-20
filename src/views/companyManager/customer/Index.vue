<template>
    <div>
        <el-card class="box-card" :body-style="{padding: 0}" shadow="never">
            <div class="ml-20 mt-20 flex-row justify-between align-center ">
                <el-form inline size="small"  @submit.prevent="false;">
                    <el-form-item >
                        <el-input v-model.trim="keyWords" placeholder="用户名/手机号" @keyup.enter="queryData"></el-input>
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
                        <el-button type="primary"  @click="createDialogVisible = true" >添加</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <el-table class="w-100" :data="tableData"  :header-cell-style="{ color:'#000', textAlign:'center'}" size="small">
                <el-table-column prop="username" label="用户名" width="180" align="center" />
                <el-table-column prop="phone" label="手机号" width="180" align="center" />
                <el-table-column label="用户类型" align="center">
                    <template #default="{row}">
                        <div v-if="row.user_type === 1">企业账号</div>
                        <div v-if="row.user_type === 2">食堂账号</div>
                    </template>
                </el-table-column>
                <el-table-column prop="login_time" label="登录时间" width="180" align="center" />
                <el-table-column prop="login_last_time" label="最后登录时间" width="180" align="center" />
                <el-table-column prop="login_count" label="登录次数" width="180" align="center" />
                <el-table-column prop="create_at" label="创建时间" width="180" align="center" />
                <el-table-column prop="update_at" label="更新时间" width="180" align="center" />
                <el-table-column label="状态" align="center">
                    <template #default="{row}">
                        <el-switch v-model="row.is_on" active-color="#13ce66" inactive-color="#d4d9e1" :active-value="1" :inactive-value="0" @change="userStatusHandel(row)" />
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" width="180px">
                    <template #default="{row}">
                        <el-button size="mini" type="primary" icon="el-icon-edit" @click="clickEdit(row)"  >编辑</el-button>
                        <el-button size="mini" type="danger" icon="el-icon-delete"  @click="deleteHandel(row)">删除</el-button>
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
            <div>
                <el-dialog title="添加" v-model="createDialogVisible" width="500px" :close-on-click-modal="false" @close="createDialogClosed">
                    <Create ref="createClildRef" @submitCreate="submitCreate" />
                    <template #footer>
                        <div class="dialog-footer">
                            <el-button size="small" type="primary" @click="createHandel">确 定</el-button>
                            <el-button size="small"  @click="createDialogVisible = false">取 消</el-button>
                        </div>
                    </template>
                </el-dialog>
            </div>
            <div>
                <el-dialog title="编辑" v-model="updateDialogVisible" width="500px" :close-on-click-modal="false" @close="updateDialogClosed">
                    <Update ref="updateClildRef" @submitUpdate="submitUpdate" />
                    <template #footer>
                        <div class="dialog-footer">
                            <el-button size="small" type="primary" @click="updateHandel">确 定</el-button>
                            <el-button size="small"  @click="updateDialogVisible = false">取 消</el-button>
                        </div>
                    </template>
                </el-dialog>
            </div>
        </el-card>
    </div>
</template>
<script>
import {main, createClildRef, updateClildRef } from '@/hooks/companyManager/adminUser'
import Create from '@/views/companyManager/customer/Create'
import Update from '@/views/companyManager/customer/Update'
export  default  {
    name: 'Customer',
    components: {
        Create,
        Update
    },
    setup() {
        const createHandel = () =>{
            createClildRef.value.submit()
        }
        const updateHandel = ()=>{
            updateClildRef.value.submit()
        }
        return {
            ...main(),
            createClildRef,
            updateClildRef,
            createHandel,
            updateHandel
        }
    }
}
</script>
