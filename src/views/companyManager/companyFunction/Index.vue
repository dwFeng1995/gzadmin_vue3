<template>
    <div>
        <el-card class="box-card" :body-style="{padding: 0}" shadow="never">
            <div class="ml-20 mt-20 flex-row justify-between align-center ">
                <el-form inline size="small" @submit.prevent="false;">
                    <el-form-item >
                        <el-input v-model.trim="keyWords" placeholder="代号/代号名称/备注"  @keyup.enter="queryData"></el-input>
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
                        <el-button type="primary"  @click="clickCreate" >添加</el-button>
                    </el-form-item>
                </el-form>
            </div>
           <el-table :data="tableData" size="small"  class="w-100" :header-cell-style="{ color:'#000', textAlign:'center'}">
                <el-table-column prop="code" label="代号" align="center" />
                <el-table-column prop="code_name" label="代号名称" align="center" />
                <el-table-column label="配置方式" align="center" >
                    <template #default="{row}">
                        <div v-if="row.type === 1">后台配置</div>
                        <div v-if="row.type === 2">H5配置</div>
                        <div v-if="row.type === 3">设备配置</div>
                    </template>
                </el-table-column>
                <el-table-column prop="remark" label="备注" align="center" />
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
                    @current-change="changePageIndex"
                    >
                </el-pagination>
            </div>
            <div>
                <el-dialog
                    v-model="createDialogVisible"
                    title="添加" :close-on-click-modal="false"
                    width="500px" @close="createDialogClosed()">
                    <Create ref="createClildRef"  @submitCreate="submitCreate"  />
                    <template #footer>
                    <span class="dialog-footer">
                        <el-button size="small" type="primary" @click="createHandel" >确定</el-button>
                        <el-button size="small"  @click="createDialogVisible = false">取消</el-button>
                    </span>
                    </template>
                </el-dialog>
            </div>
            <div >
                <el-dialog
                        v-model="updateDialogVisible"
                        title="编辑" :close-on-click-modal="false"
                        width="500px" @close="updateDialogClosed()">
                    <Update ref="updateClildRef"   @submitUpdate="submitUpdate"   />
                    <template #footer>
                    <span class="dialog-footer">
                        <el-button size="small" type="primary" @click="updateHandel" >确定</el-button>
                        <el-button size="small"  @click="updateDialogVisible = false">取消</el-button>
                    </span>
                    </template>
                </el-dialog>
            </div>

        </el-card>
    </div>
</template>
<script>
import {index, createClildRef, updateClildRef} from '@/hooks/companyManager/companyFunction.js'
import Create from '@/views/companyManager/companyFunction/Create'
import Update from '@/views/companyManager/companyFunction/Update'
export default {
    name: 'CompanyFunction',
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
         ...index(),
         createClildRef,
         updateClildRef,
         createHandel,
         updateHandel
     }
    }
}
</script>
<style lang="scss" scoped>

</style>
