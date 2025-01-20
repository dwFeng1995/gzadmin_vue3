<template>
    <div>
        <el-card class="box-card" :body-style="{padding: 0}" shadow="never">
            <div class="ml-20 mt-20 flex-row justify-between align-center ">
                <el-form inline size="small" @submit.prevent="false">
                    <!-- <el-form-item label="选择企业：">
                        <el-select filterable  clearable v-model="companyId" placeholder="请选择企业">
                            <el-option
                                    v-for="item in companyMiniList"
                                    :key="item.id"
                                    :label="item.company_name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item> -->
                    <el-form-item >
                        <el-input v-model.trim="keyWords" placeholder="名称"  @keyup.enter="queryData"></el-input>
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
                <el-table-column align="center"  prop="id"  label="Id" width="50px" />
                <el-table-column align="center"  prop="name"  label="名称" />
                <el-table-column align="center"  prop="energy"  label="热量(单位:千卡)" />
                <el-table-column align="center"  prop="protein"  label="蛋白质(单位:克)" />
                <el-table-column align="center"  prop="fat"  label="脂肪(单位:克)" />
                <el-table-column align="center"  prop="carbohydrate"  label="碳水化合物(单位:克)" />
                <el-table-column align="center"  prop="dietary_fiber"  label="膳食纤维(单位:克)" />
                <el-table-column align="center"  prop="calcium"  label="钙(单位:毫克)" />
                <el-table-column align="center"  prop="iron"  label="铁(单位:毫克)" />
                <el-table-column align="center"  prop="zinc"  label="锌(单位:毫克)" />
                <el-table-column align="center"  prop="selenium"  label="硒(单位:微克)" />
                <el-table-column label="企业名称" align="center">
                    <template #default="{row}">
                        <div v-if="row.company === null">所有人可见</div>
                        <div v-else>{{row?.company?.company_name}}</div>
                    </template>
                </el-table-column>

                <el-table-column label="操作" align="center" width="180px">
                    <template #default="{row}">
                        <el-button size="mini" type="primary" icon="el-icon-edit"  @click="getNutrimentDetail(row)">编辑</el-button>
                        <el-button size="mini" type="danger" icon="el-icon-delete"  @click="deleteNutriment(row)">删除</el-button>
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
                <el-dialog destroy-on-close v-model="createDialogVisible" :close-on-click-modal="false" @close="createDialogClosed" title="添加" width="666px">
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
    import {main, createChildRef, updateChildRef } from '@/hooks/nutriment/nutriment/index.js'
    import  Create from '@/views/nutriment/nutriment/Create.vue'
    import  Update from '@/views/nutriment/nutriment/Update.vue'
    export default {
        name: "NutrimentList",
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
