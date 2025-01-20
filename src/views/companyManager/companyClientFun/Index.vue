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
                    <el-form-item  label="设备功能配置：">
                        <el-select filterable clearable v-model="clientFunInfoId" placeholder="选择设备功能配置">
                            <el-option
                                    v-for="item in clientFunctionInfoMiniList"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
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
                <el-table-column  label="企业名称" align="center" >
                    <template #default="{row}">
                        <div>{{row?.company?.company_name}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="设备功能" align="center" >
                    <template #default="{row}">
                        <div>{{row?.client_fun?.fun_name}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="设备功能配置" align="center" >
                    <template #default="{row}">
                        <div>{{row?.fun_info?.name}}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="data" label="数据" align="center" />
                <el-table-column prop="created_at" label="创建时间" align="center" />
                <el-table-column label="操作" align="center" width="180px">
                    <template #default="{row}">
                        <el-button size="mini" type="primary" icon="el-icon-edit"  @click="getDetail(row)">编辑</el-button>
                        <el-button size="mini" type="danger" icon="el-icon-delete"  @click="deleteCompanyClientFun(row)">删除</el-button>
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
                <el-dialog v-model="updateDialogVisible" destroy-on-close title="编辑" @close="updateDialogClosed" width="555px" :close-on-click-modal="false">
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
import {main, createChildRef, updateChildRef} from '@/hooks/companyManager/companyClientFun/index'
import Create from '@/views/companyManager/companyClientFun/Create'
import Update from '@/views/companyManager/companyClientFun/Update'
export default {
    name: "CompanyClientFun",
    components: {
        Create,
        Update
    },
    setup() {
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
