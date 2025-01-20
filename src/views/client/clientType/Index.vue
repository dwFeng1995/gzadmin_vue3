<template>
    <div>
        <el-card class="box-card" :body-style="{padding: 0}" shadow="never">
            <div class="ml-20 mt-20 flex-row justify-between align-center ">
                <el-form inline size="small" @submit.prevent="false;">
                    <el-form-item >
                        <el-input v-model.trim="keyWords" placeholder="设备类型/名称/备注"  @keyup.enter="queryData"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="queryData">查询</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary"  @click="resetData" icon="el-icon-refresh"> </el-button>
                    </el-form-item>
                </el-form>
                <el-form  inline size="small">
                    <el-form-item>
                        <el-button type="primary" @click="createDialogVisible = true" >添加 </el-button>
                    </el-form-item>
                </el-form>
            </div>
            <el-table :header-cell-style="{'text-align':'center','color':'#000'}" :data="tableData" size="small" align="center">
                <el-table-column align="center"  prop="id"  label="Id" />
                <el-table-column align="center"  prop="name"  label="名称" />
                <el-table-column align="center"  prop="client_type"  label="设备类型" />
                <el-table-column align="center"  prop="remark"  label="备注" />
                <el-table-column align="center"   label="启用状态" >
                    <template #default="{row}">
                        <el-switch @change="updateClientTypeStatus(row)" v-model="row.isshow" active-color="#13ce66" inactive-color="#d4d9e1"  :active-value="1" :inactive-value="0" />
                    </template>
                </el-table-column>
                <el-table-column align="center"  prop="created_at"  label="创建时间" />
                <el-table-column align="center"  prop="updated_at"  label="更新时间" />
                <el-table-column label="操作" align="center" width="180px">
                    <template #default="{row}">
                        <el-button size="mini" type="primary" icon="el-icon-edit"  @click="getClientTypeDetail(row)">编辑</el-button>
                        <el-button size="mini" type="danger" icon="el-icon-delete"  @click="deleteClientType(row)">删除</el-button>
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
                <el-dialog v-model="createDialogVisible" :close-on-click-modal="false" @close="createDialogClosed" title="添加" width="555px">
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
                <el-dialog destroy-on-close  v-model="updateDialogVisible" :close-on-click-modal="false" @close="updateDialogClosed" title="编辑" width="555px">
                    <div>
                        <Update ref="updateChildRef"  :detail="detail"  @refreshData="refreshData" />
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
    import {main, createChildRef, updateChildRef } from '@/hooks/client/clientType/index.js'
    import Create from '@/views/client/clientType/Create.vue'
    import Update from '@/views/client/clientType/Update.vue'
    export default {
        name: "ClientType",
        components: {
            Create,
            Update
        },
        setup() {
            console.log('setup')
            return {
                ...main(),
                createChildRef,
                updateChildRef
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
