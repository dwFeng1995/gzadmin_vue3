<template>
    <div>
        <el-card class="box-card" :body-style="{padding: 0}" shadow="never">
            <div class="ml-20 mt-20 flex-row justify-between align-center ">
                <el-form inline size="small">
                    <el-form-item label="选择食堂：">
                        <el-select  clearable filterable v-model="canteenId" placeholder="请选择食堂">
                            <el-option
                                    v-for="item in canteenMiniList"
                                    :key="item.id"
                                    :label="item.canteen_name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="设备类型：">
                        <el-select  filterable clearable v-model="clientType" placeholder="请选择设备类型">
                            <el-option
                                    v-for="item in clientTypeMiniList"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.client_type">
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
                <el-form  inline size="small">
                    <el-form-item>
                        <el-button type="primary" @click="createDialogVisible = true" >添加 </el-button>
                    </el-form-item>
                </el-form>
            </div>
            <el-table :header-cell-style="{'text-align':'center','color':'#000'}" :data="tableData" size="small" align="center">
                <el-table-column align="center" width="140"  label="食堂名称" >
                    <template #default="{row}">
                        <div>{{row?.canteen?.canteen_name}}</div>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="食堂编号" >
                    <template #default="{row}">
                        <div>{{row?.canteen?.canteen_no}}</div>
                    </template>
                </el-table-column>
                <el-table-column align="center"   label="设备类型名称" >
                    <template #default="{row}">
                        <div>{{row?.client_type?.name}}</div>
                    </template>
                </el-table-column>
                <el-table-column align="center"  prop="start_num"  label="开始编号" />
                <el-table-column align="center"  prop="end_num"  label="结束编号" />
                <el-table-column align="center"  prop="create_at"  label="创建时间" />
                <el-table-column align="center"  prop="update_at"  label="更新时间" />
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
                <el-dialog v-model="createDialogVisible"  title="添加" :close-on-click-modal="false" @close="createDialogClosed"  width="555px">
                    <div>
                         <Create ref="createChildRef" @refreshData="refreshData" />
                    </div>
                    <template #footer>
                      <span class="dialog-footer">
                        <el-button type="primary" size="small" @click="submitCreate">确定</el-button>
                        <el-button   size="small" @click="createDialogVisible = false">取消</el-button>
                      </span>
                    </template>
                </el-dialog>
            </div>
        </el-card>
    </div>
</template>
<script>
import {main, createChildRef} from '@/hooks/client/logCanteenClientStore/index.js'
import Create from '@/views/client/logCanteenClientStore/Create'
export default {
    name: 'LogCanteenClientStore',
    components: {
        Create
    },
    setup() {
        return {
            ...main(),
            createChildRef
        }
    },
}
</script>

<style lang="sass" scoped>

</style>
