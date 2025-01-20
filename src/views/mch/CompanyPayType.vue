<template>
    <div>
        <el-card class="box-card" :body-style="{padding: 0}" shadow="never">
            <div class="ml-20 mt-20 flex-row justify-between align-center ">
                <el-form inline size="small" @submit.prevent="false;">
                    <el-form-item >
                        <el-input v-model.trim="keyWords" placeholder="企业号/企业名称" @keyup.enter="queryData"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="queryData">查询</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary"  @click="resetData" icon="el-icon-refresh"> </el-button>
                    </el-form-item>
                </el-form>
            </div>
            <el-table :data="tableData" size="small"  class="w-100" :header-cell-style="{ color:'#000', textAlign:'center'}">
                <el-table-column prop="company_name" label="企业名称" align="center" width="200px" />
                <el-table-column prop="company_no" label="企业号" align="center" width="150px" />
                <el-table-column  label="支付方式" align="center" >
                    <template #default="{row}">
                        <div v-if="row.pay_type.length > 0">
                            <el-tag v-for="item in row.pay_type" class="mr-2" type="success" :key="item.id" size="small">{{item.name}}</el-tag>
                        </div>
                        <div v-else>
                            <el-tag type="warning" size="small">暂无支付方式</el-tag>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" width="100px" >
                    <template #default="{row}">
                        <el-button size="mini" type="primary" icon="el-icon-edit"  @click="getDetail(row)">编辑</el-button>
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
                <el-dialog v-model="updateDialogVisible" @close="updateDialogClosed" title="编辑"   width="555px" :close-on-click-modal="false">
                    <div>
                        <el-form size="small" label-width="80px">
                            <el-form-item label="企业名称">
                                <el-select v-model="primaryId" placeholder="请选择企业" class="w-100" disabled>
                                    <el-option
                                            v-for="item in companyMiniList"
                                            :key="item.id"
                                            :label="item.company_name"
                                            :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="支付方式">
                                <el-checkbox v-for="item in payTypeList" v-model="item.checked" :key="item.id" :label="item.name"></el-checkbox>
                            </el-form-item>
                        </el-form>
                    </div>
                    <template #footer>
                      <span class="dialog-footer">
                        <el-button size="small" type="primary" @click="updateCompanyPayType">确定</el-button>
                        <el-button size="small"   @click="updateDialogVisible = false">取消</el-button>
                      </span>
                    </template>
                </el-dialog>
            </div>
        </el-card>
    </div>
</template>

<script>
    import {main} from '@/hooks/mch/companyPayType.js'
    export default {
        name: "CompanyPayType",
        setup() {
            return {
                ...main()
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
