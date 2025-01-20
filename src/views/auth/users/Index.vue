<template>
    <div>
        <el-card class="box-card" :body-style="{padding: 0}" shadow="never">
            <div class="ml-20 mt-20 flex-row justify-between align-center ">
                <el-form inline size="small" @submit.prevent="false;">
                    <el-form-item >
                        <el-input v-model.trim="keyWords" placeholder="账号/名称" @keyup.enter="queryData"></el-input>
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
                        <el-button type="primary" @click="createDialogVisible = true" >添加</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <el-table :data="tableData" size="small"  class="w-100" :header-cell-style="{ color:'#000', textAlign:'center'}">
                <el-table-column prop="username" label="账号" align="center" />
                <el-table-column prop="name" label="名称" align="center" />
                <el-table-column prop="created_at" label="创建时间" align="center" />
                <el-table-column label="状态" align="center" width="180px">
                    <template #default="{row}">
                        <div>
                            <el-tag  v-if="row?.is_on === 0" size="small" type="danger">禁用</el-tag>
                            <el-tag  v-if="row?.is_on === 1" size="small" type="success">启用</el-tag>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" width="300px">
                    <template #default="{row}">
                        <el-button size="mini" @click="getUserMenu(row)" type="warning" icon="el-icon-key" >菜单管理</el-button>
                        <el-button size="mini" type="primary" icon="el-icon-edit"  @click="getUserDetail(row)">编辑</el-button>
                        <el-button size="mini" type="danger" icon="el-icon-delete"  @click="deleteUser(row)">删除</el-button>
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
                <el-dialog v-model="createDialogVisible" title="添加" @close="createDialogClosed" width="555px" :close-on-click-modal="false">
                    <div>
                        <Create ref="createChildRef" @refreshData="refreshData" />
                    </div>
                    <template #footer>
                      <span class="dialog-footer">
                           <el-button type="primary" size="small" @click="submitCreate">确定</el-button>
                           <el-button size="small" @click="createDialogVisible = false">取消</el-button>
                      </span>
                    </template>
                </el-dialog>
            </div>
            <div>
                <el-dialog   v-model="updateDialogVisible" destroy-on-close title="编辑" @close="updateDialogClosed" width="555px" :close-on-click-modal="false">
                    <div>
                        <Update ref="updateChildRef" @refreshData="refreshData" :detail="detail" />
                    </div>
                    <template #footer>
                      <span class="dialog-footer">
                           <el-button type="primary" size="small" @click="submitUpdate">确定</el-button>
                           <el-button size="small" @click="updateDialogVisible = false">取消</el-button>
                      </span>
                    </template>
                </el-dialog>
            </div>
            <div class="user-menu">
                <el-dialog  top="4vh"  @close="menuDialogClosed"  v-model="menuDialogVisible" destroy-on-close title="用户菜单管理" width="555px" :close-on-click-modal="false">
                    <div>
                        <MenuTree :userMenu="userMenu" ref="menuChildRef" @refreshData="refreshData" :detail="detail" />
                    </div>
                    <template #footer>
                      <span class="dialog-footer">
                           <el-button type="primary" size="small" @click="submitUserMenu">确定</el-button>
                           <el-button size="small" @click="menuDialogVisible = false">取消</el-button>
                      </span>
                    </template>
                </el-dialog>
            </div>
        </el-card>
    </div>
</template>

<script>
    import { main, updateChildRef, createChildRef, menuChildRef} from '@/hooks/auth/users/index.js'
    import Create from '@/views/auth/users/Create'
    import Update from '@/views/auth/users/Update'
    import MenuTree from '@/views/auth/users/MenuTree'
    export default {
        name: "Users",
        components: {
            Create,
            Update,
            MenuTree
        },
        setup() {
            return {
                ...main(),
                updateChildRef,
                createChildRef,
                menuChildRef
            }
        }
    }
</script>

<style lang="scss" scoped>
.user-menu {
    /deep/ .el-dialog__body {
        max-height: 666px;
        overflow-y: auto;
    }
}
</style>
