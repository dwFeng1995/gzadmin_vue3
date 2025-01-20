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
             <el-table :header-cell-style="{'text-align':'center','color':'#000'}" border :span-method="objectSpanMethod" :data="tableData" size="small" align="center">
              
                <el-table-column align="center"  prop="company_name"  label="企业" />
                <el-table-column align="center"  prop="company_no"  label="企业号" />
                <el-table-column align="center"  prop="name"  label="支付平台商户名称" />
                <el-table-column align="center" prop="appid" label="appid"/>
                <el-table-column  align="center"  prop="vendor_sn" label="服务商序列号" />
                <el-table-column  align="center"  prop="vendor_key" label="服务商密钥" />
                <el-table-column  align="center"  prop="terminal_sn" label="终端号" />
                <el-table-column  align="center"  prop="terminal_key" label="终端密钥" />
                <el-table-column  align="center"  prop="device_id" label="终端设备id" />
                <el-table-column  align="center"  prop="has_activate" label="是否激活" >
                    <template #default="{row}">
                        <div>
                            <el-tag size="small" v-if="row.has_activate === 1" type="success">已激活</el-tag>
                            <el-tag size="small" v-if="row.has_activate === 0" type="danger">未激活</el-tag>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column  align="center" prop="remark" label="备注" />
                <el-table-column  align="center" prop="activate_at" label="激活时间" />
                <el-table-column  align="center" prop="checkin_at" label="签到时间" />
                <el-table-column  align="center" label="操作" width="180">
                    <template #default="{row}">
                        <el-button size="mini" type="primary" icon="el-icon-edit"  @click="getMchPlatformDetail(row)">编辑</el-button>
                        <el-button size="mini" type="danger" icon="el-icon-delete"  @click="deleteMchPlatform(row)" >删除</el-button>
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
                <el-dialog destroy-on-close v-model="createDialogVisible" :close-on-click-modal="false" @close="createDialogClosed" title="添加"   width="688px" top="6vh">
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
                <el-dialog destroy-on-close  v-model="updateDialogVisible" :close-on-click-modal="false" @close="updateDialogClosed" title="编辑" width="688px" top="6vh">
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
import {main, createChildRef, updateChildRef } from '@/hooks/mch/parametersSqb/index.js'
import Create from '@/views/mch/parametersSqb/Create.vue'
import Update from '@/views/mch/parametersSqb/Update.vue'
export default {
    name: 'ParametersSqb',
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
    },
}
</script>
<style lang="scss" scoped>

</style>