<template>
    <div>
        <el-card class="box-card" :body-style="{padding: 0}" shadow="never">
            <div class="ml-20 mt-20 flex-row justify-between align-center ">
                <el-form inline size="small">
                    <el-form-item label="选择企业：">
                        <el-select filterable  clearable v-model="companyId" placeholder="请选择企业">
                            <el-option
                                    v-for="item in companyMiniList"
                                    :key="item.id"
                                    :label="item.company_name"
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
                <el-form  inline size="small">
                    <el-form-item>
                        <el-button type="primary" @click="createDialogVisible = true" >添加 </el-button>
                    </el-form-item>
                </el-form>
            </div>
            <el-table :header-cell-style="{'text-align':'center','color':'#000'}" :data="tableData" size="small" align="center">
                <el-table-column align="center" width="140"  label="企业" prop="company_name"></el-table-column>
                <el-table-column align="center"  width="120"  label="企业号" prop="company_no"></el-table-column>
                <el-table-column align="center"   label="支付方式">
                    <template #default="{row}">
                        <div v-if="row.pay_list.length > 0" class="flex-row flex-wrap  justify-center ">
                            <div v-for="(item,index) in row.pay_list" :key="index" class="m-6">
                                <el-tag size="small" @close="delPayType(item.id,item.name)" type="success"  closable><span v-text="item.name"></span></el-tag>
                            </div>
                        </div>
                        <div v-else>
                            <el-tag type="warning" size="small">暂无支付方式</el-tag>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column align="center"   label="支持h5支付的充值方式">
                    <template #default="{row}">
                        <div  v-if="row.pay_list.length > 0" class="flex-row flex-wrap justify-center ">
                            <div  v-for="(item,index) in row.pay_list" :key="index" class="m-6 ">
<!--                                <el-checkbox @change="changePayTypeH5(item.id)" v-model="item.use_mt === 0 ? false :true" :label="item.name" > </el-checkbox>-->
                                <el-checkbox @change="changePayTypeH5(item.id)" v-model="item.checked" :label="item.name" > </el-checkbox>
                            </div>
                        </div>
                        <div v-else>
                            <el-tag type="warning" size="small">暂无支付方式</el-tag>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column  width="120" align="center" label="操作">
                    <template #default="{row}">
                        <el-button size="mini" type="danger" icon="el-icon-delete"  @click="deleteRechargePay(row)" >删除</el-button>
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
            <el-dialog v-model="createDialogVisible" title="添加" width="555px" :close-on-click-modal="false" @close="createDialogClosed">
                <div>
                    <el-form ref="formRef" :model="formParams" size="small" :rules="formRules" label-width="80px">
                         <el-form-item label="选择企业" prop="company_id" >
                             <el-select   class="w-100" v-model="formParams.company_id" placeholder="请选择企业" :disabled="formParams.company_id !== ''" filterable>
                                 <el-option
                                         v-for="item in companyMiniList"
                                         :key="item.id"
                                         :label="item.company_name"
                                         :value="item.id">
                                 </el-option>
                             </el-select>
                         </el-form-item>
                        <el-form-item label="支付方式" prop="pay_type_id">
                            <el-select   class="w-100" v-model="formParams.pay_type_id" :disabled="!formParams.company_id" placeholder="请选择支付方式">
                                <el-option
                                        v-for="item in companyNoPayTypeList"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                </div>
                <template #footer>
                    <span class="dialog-footer">
                        <el-button size="small" type="primary" @click="submitCreate">确定</el-button>
                        <el-button size="small" @click="createDialogVisible = false">取消</el-button>
                    </span>
                </template>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import {main, formRef, formParams, formRules} from '@/hooks/mch/rechargePayType.js'
    export default {
        name: "RechargePayType",
        setup() {
            return {
                ...main(),
                formRef,
                formParams,
                formRules
            }
        }
    }
</script>

<style scoped>

</style>
