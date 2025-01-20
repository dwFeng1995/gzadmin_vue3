<template>
    <div>
        <el-card class="box-card" :body-style="{padding: 0}" shadow="never">
            <div class="ml-20 mt-20 flex-row justify-between align-center ">
                <el-form inline size="small">
                    <el-form-item label="选择企业：">
                        <el-select  filterable clearable  v-model="companyId" placeholder="请选择企业">
                            <el-option
                                    v-for="item in companyMiniList"
                                    :key="item.id"
                                    :label="item.company_name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item >
                        <el-input v-model.trim="keyWords" placeholder="设备名称/设备编号/备注"  @keyup.enter="queryData"></el-input>
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
                        <el-button type="primary" @click="handleAdd" >添加 </el-button>
                    </el-form-item>
                </el-form>
            </div>
            
            <el-table :header-cell-style="{'text-align':'center','color':'#000'}" :data="tableData" size="small" align="center">
                <el-table-column align="center"    label="企业名称">
                     <template #default="{row}">
                        <div>{{row.company.company_name}}</div>
                    </template>
                </el-table-column>
                   <el-table-column align="center"    label="企业号">
                     <template #default="{row}">
                        <div>{{row.company.company_no}}</div>
                    </template>
                </el-table-column>
                <el-table-column align="center"  prop="client_no"  label="设备编号" />
                <el-table-column align="center"  prop="client_name"  label="设备名称" />
                <el-table-column align="center"   label="启用状态" >
                    <template #default="{row}">
                        <el-switch @change="updateCabinetStatus(row)" v-model="row.status" active-color="#13ce66" inactive-color="#d4d9e1"  :active-value="1" :inactive-value="0" />
                    </template>
                </el-table-column>
                <el-table-column align="center"  prop="show_type"  label="菜品展示模式 ">
                      <template #default="{row}">
                          <el-tag class="mx-1" type="success" size="small">{{row.show_type==1?'无图模式':'有图模式'}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column align="center"  prop="introduce"  label="介绍语" />
                <el-table-column align="center"   label="添加类型">
                     <template #default="{row}">
                          <el-tag class="mx-1" type="success" size="small">{{row.admin_id?'用户自添加':'总后台添加'}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column align="center"  prop="remark"  label="备注" />
                <el-table-column align="center"  prop="create_at" width="140"  label="创建时间" />
                <el-table-column align="center"  prop="update_at"   width="140" label="更新时间" />
                <el-table-column label="操作" align="center" width="180px">
                    <template #default="{row}">
                        <el-button size="mini" type="primary" icon="el-icon-edit"  @click="getCabinetDetail(row)">编辑</el-button>
                        <el-button size="mini" type="danger" icon="el-icon-delete"  @click="deleteCabinet(row)">删除</el-button>
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
                        <Create :detail="detail" ref="createChildRef"  @refreshData="refreshData" />
                    </div>
                    <template #footer>
                  <span class="dialog-footer">
                      <el-button type="primary" size="small" @click="submitCreate">确定</el-button>
                      <el-button size="small" @click="createDialogVisible = false">取消</el-button>
                  </span>
                    </template>
                </el-dialog>
            </div>
        </el-card>
    </div>
</template>

<script>
    import {main, createChildRef } from '@/hooks/client/orderingMachine/index.js'
    import Create from '@/views/client/orderingMachine/Create.vue'
    export default {
        name: "OrderingMachine",
        components: {
            Create,
        },
        setup() {
            return {
                ...main(),
                createChildRef,
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
