<template>
    <div>
        <el-card class="box-card" :body-style="{padding: 0}" shadow="never">
            <div class="ml-20 mt-20 flex-row justify-between align-center ">
                <el-form inline size="small" @submit.prevent="false;">
                    <el-form-item >
                        <el-input v-model.trim="keyWords" placeholder="名称" @keyup.enter="queryData"></el-input>
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
            <el-table :data="tableData" size="small"  class="w-100 pb-20" :header-cell-style="{ color:'#000', textAlign:'center'}">
                <el-table-column prop="id" label="Id" align="center" />
                <el-table-column prop="menu_type_name" label="名称" align="center" />
                <el-table-column prop="sort" label="排序" align="center" />
                <el-table-column prop="created_at" label="创建时间" align="center" />
                <el-table-column prop="updated_at" label="更新时间" align="center" />
                <el-table-column label="操作" align="center" width="180px">
                    <template #default="{row}">
                        <el-button size="mini" type="primary" icon="el-icon-edit"  @click="getAdminMenuType(row)">编辑</el-button>
                        <el-button size="mini" type="danger" icon="el-icon-delete"  @click="deleteAdminMenuType(row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
<!--            <div class="paging">-->
<!--                <el-pagination-->
<!--                        v-model:currentPage="pageIndex"-->
<!--                        :page-sizes="[10, 20, 50, 100, 200]"-->
<!--                        :page-size="pageSize"-->
<!--                        layout="total, sizes, prev, pager, next, jumper"-->
<!--                        :total="pageTotal"-->
<!--                        @size-change="changePageSize"-->
<!--                        @current-change="changePageIndex">-->
<!--                </el-pagination>-->
<!--            </div>-->
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
        </el-card>
    </div>
</template>

<script>
    import { main, updateChildRef, createChildRef} from '@/hooks/adminPermissions/menuType/index.js'
    import Create from '@/views/adminPermissions/menuType/Create'
    import Update from '@/views/adminPermissions/menuType/Update'
    export default {
        name: "AdminMenuType",
        components: {
            Create,
            Update
        },
        setup() {
            return {
                ...main(),
                updateChildRef,
                createChildRef
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
