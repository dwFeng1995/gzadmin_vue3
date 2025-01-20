<template>
    <div>
        <el-card class="box-card" :body-style="{padding: 0}" shadow="never">
            <div class="ml-20 mt-20 flex-row justify-between align-center ">
                <el-form inline size="small" @submit.prevent="false;">
                    <el-form-item >
                        <el-input v-model.trim="keyWords" placeholder="名称/代号/备注"  @keyup.enter="queryData"></el-input>
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
                <el-table-column align="center"  prop="id"  label="Id" width="50px" />
                <el-table-column align="center"  prop="name"  label="名称" width="120px" />
                <el-table-column align="center"  prop="code"  label="代号"  width="120px" />
                <el-table-column align="center"  prop="data"  label="数据"  width="120px" />
                <el-table-column align="center"  label="设备功能">
                    <template #default="{row}">
                        <div>
                            <el-tag v-for="item in row?.get_client_fun"  class="mr-4 mb-4" size="small" type="success" :key="item.id">
                                {{item.fun_name}}
                            </el-tag>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column align="center"  prop="remark"  label="备注" width="220px" />
                <el-table-column align="center"  prop="create_at"  label="创建时间" width="160px" />
                <el-table-column align="center"  prop="update_at"  label="更新时间" width="160px" />

                <el-table-column label="操作" align="center" width="180px">
                    <template #default="{row}">
                        <el-button size="mini" type="primary" icon="el-icon-edit"  @click="getClientFunctionInfoDetail(row)">编辑</el-button>
                        <el-button size="mini" type="danger" icon="el-icon-delete"  @click="deleteClientFunctionInfo(row)">删除</el-button>
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
                <el-dialog destroy-on-close v-model="createDialogVisible" :close-on-click-modal="false" @close="createDialogClosed" title="添加" width="555px">
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
    import {main, createChildRef, updateChildRef } from '@/hooks/client/clientFunctionInfo/index.js'
    import  Create from '@/views/client/clientFunctionInfo/Create.vue'
    import  Update from '@/views/client/clientFunctionInfo/Update.vue'
    export default {
        name: "ClientFunctionInfo",
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
