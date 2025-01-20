<template>
    <div>
        <el-card class="box-card" :body-style="{padding: 0}" shadow="never">
            <div class="ml-20 mt-20 flex-row justify-between align-center ">
                <el-form inline size="small">
                    <el-form-item label="选择企业：">
                        <el-select filterable clearable v-model="companyId" placeholder="请选择企业">
                            <el-option
                                    v-for="item in companyMiniList"
                                    :key="item.id"
                                    :label="item.company_name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="选择食堂：">
                        <el-select filterable clearable  v-model="canteenId" placeholder="请选择食堂">
                            <el-option
                                    v-for="item in canteenMiniList"
                                    :key="item.id"
                                    :label="item.canteen_name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="设备类型：">
                        <el-select filterable clearable v-model="clientTypeId" placeholder="请选择设备类型">
                            <el-option
                                    v-for="item in clientTypeMiniList"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item >
                        <el-input v-model.trim="keyWords" placeholder="设备名称/设备号" @keyup.enter="queryData"></el-input>
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
            <el-table :header-cell-style="{'text-align':'center','color':'#000'}" :data="tableData" size="mini" align="center">
                <el-table-column align="center" width="140"  label="企业名称" >
                    <template #default="{row}">
                        <div>{{row?.company?.company_name}}</div>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="企业号" >
                    <template #default="{row}">
                        <div>{{row?.company?.company_no}}</div>
                    </template>
                </el-table-column>
                <el-table-column align="center"   label="食堂名称" >
                    <template #default="{row}">
                        <div>{{row?.canteen?.canteen_name}}</div>
                    </template>
                </el-table-column>
                <el-table-column align="center"   label="食堂号" >
                    <template #default="{row}">
                        <div>{{row?.canteen?.canteen_no}}</div>
                    </template>
                </el-table-column>

                <el-table-column align="center"  label="添加类型" >
                    <template #default="{row}">
                        <div>
                            <el-tag v-if="row.admin_user === null" type="success" size="small">后台添加</el-tag>
                            <el-tag v-else  size="small">用户自添加</el-tag>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column align="center"  label="设备类型名称" >
                    <template #default="{row}">
                        <div>{{row?.client_type?.name}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="设备编号" align="center" prop="client_no"></el-table-column>
                <el-table-column label="设备名称" align="center" prop="client_name"></el-table-column>
                <el-table-column label="备注" align="center" prop="remark"></el-table-column>
                <el-table-column align="center"  label="是否默认" >
                    <template #default="{row}">
                        <div>
                            <el-switch v-model="row.is_default" @change="updateClientDefault(row)" active-color="#13ce66" inactive-color="#d4d9e1"  :active-value="1" :inactive-value="0" />
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="创建时间" align="center" prop="create_at"></el-table-column>
                <el-table-column label="更新时间" align="center" prop="update_at"></el-table-column>
                <el-table-column align="center"  label="启用状态" >
                    <template #default="{row}">
                        <div>
                            <el-switch v-model="row.status" @change="updateClientStatus(row)" active-color="#13ce66" inactive-color="#d4d9e1"  :active-value="1" :inactive-value="0" />
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" width="180px">
                    <template #default="{row}">
                        <el-button size="mini" type="primary" icon="el-icon-edit"  @click="getCanteenClientDetail(row)">编辑</el-button>
                        <el-button size="mini" type="danger" icon="el-icon-delete"  @click="deleteCanteenClient(row)">删除</el-button>
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
            <el-dialog v-model="updateDialogVisible" :close-on-click-modal="false" @close="updateDialogClosed" destroy-on-close title="编辑"   width="555px">
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
    </div>
</template>

<script>
    import {main, createChildRef, updateChildRef } from '@/hooks/client/canteenClient/index.js'
    import  Create from '@/views/client/canteenClient/Create.vue'
    import  Update from '@/views/client/canteenClient/Update.vue'
    export default {
        components: {
            Create,
            Update
        },
        name: "CanteenClient",
        setup() {
            return {
                ...main(),
                createChildRef,
                updateChildRef
            }
        }
    }
</script>

<style  lang="scss" scoped>

</style>
