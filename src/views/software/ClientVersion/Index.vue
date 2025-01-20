<template>
    <div>
        <el-card class="box-card" :body-style="{padding: 0}" shadow="never">
            <div class="ml-20 mt-20 flex-row justify-between align-center ">
                <el-form inline size="small">
                    <el-form-item label="设备类型" prop="client_type_id">
                        <el-select filterable class="w-100"  clearable  v-model="clientType" placeholder="请选择设备类型">
                            <el-option
                                    v-for="item in clientTypeMiniList"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.client_type">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item >
                        <el-input v-model.trim="keyWords" placeholder="设备号/设备名称" @keyup.enter="queryData"></el-input>
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
<!--                        <el-button type="primary" @click="createDialogVisible = true" >添加</el-button>-->
                    </el-form-item>
                </el-form>
            </div>
            <el-table :data="tableData" size="small"  class="w-100" :header-cell-style="{ color:'#000', textAlign:'center'}">
<!--                <el-table-column prop="id" label="Id" align="center" />-->
                <el-table-column prop="company_name" label="企业名称" align="center" />
                <el-table-column prop="canteen_name" label="食堂名称" align="center" />
                <el-table-column prop="client_type_name" label="设备类型名称" align="center" />
                <el-table-column prop="client_name" label="设备名称" align="center" />
                <el-table-column prop="client_no" label="设备号" align="center" />
                <el-table-column prop="cur_version" label="设备当前版本" align="center" />
                <el-table-column prop="uuid" label="设备唯一标识" align="center" />
                <el-table-column prop="version" label="已分配软件版本号" align="center" />
                <el-table-column prop="create_at" label="创建时间" align="center" />
                <el-table-column prop="update_at" label="更新时间" align="center" />
                <el-table-column label="操作" align="center" width="300px">
                    <template #default="{row}">
                        <el-button size="mini" type="primary" icon="el-icon-edit"  @click="getClintSoftVersion(row)">编辑</el-button>
                        <el-button size="mini" type="danger" icon="el-icon-delete"  @click="deleteClintSoftVersion(row)">删除</el-button>
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
    import { main, updateChildRef, createChildRef} from '@/hooks/software/clientVersion/index.js'
    import Update from '@/views/software/ClientVersion/Update'
    export default {
        name: "ClientVersion",
        components: {
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
