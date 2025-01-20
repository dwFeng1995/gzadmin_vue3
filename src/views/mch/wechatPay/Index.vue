<template>
    <div>
        <el-card class="box-card" :body-style="{padding: 0}" shadow="never">
            <div class="ml-20 mt-20 flex-row justify-between align-center ">
                <el-form inline size="small">
                    <el-form-item  label="企业：">
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
                <el-form size="small" inline>
                    <el-form-item>
                        <el-button type="primary"  @click="uploadWetchFileDialogVisible = true" icon="el-icon-upload">微信公众号域名验证文件上传</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="createDialogVisible = true" >添加</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <el-table :header-cell-style="{'text-align':'center','color':'#000'}" border :data="tableData" size="small" align="center" :span-method="objectSpanMethod">
                <el-table-column align="center"  prop="company_name"  label="企业" />
                <el-table-column align="center"  prop="company_no"  label="企业号" />
                <el-table-column align="center"  prop="name"  label="支付平台商户名称" />
                <el-table-column align="center" prop="appid" label="微信公众平台APPID" />
                <el-table-column  align="center"  prop="mch_id" label="微信支付MCH_ID" />
                <el-table-column  align="center"  prop="key" label="微信支付KEY" />
                <el-table-column  align="center" prop="app_sert" label="开发者秘钥" />
                <el-table-column  align="center" prop="template_id" label="模板ID" />
                <el-table-column  align="center" prop="template_cabinet" label="取餐柜模板id" />
                <el-table-column  align="center" prop="template_mini_order" label="接单通知模板ID" />
                <el-table-column  align="center" prop="cert_path" label="cert证书目录" />
                <el-table-column  align="center" prop="key_path" label="key证书目录" />
                <el-table-column  align="center" prop="url_h5" label="h5链接地址" />
                <el-table-column  align="center" prop="remark" label="备注" />
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
                <el-dialog destroy-on-close v-model="createDialogVisible" :close-on-click-modal="false" @close="createDialogClosed" title="添加"   width="800px" top="6vh">
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
                <el-dialog destroy-on-close  v-model="updateDialogVisible" :close-on-click-modal="false" @close="updateDialogClosed" title="编辑" width="800px" top="6vh">
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
            <div>
                 <el-dialog destroy-on-close  v-model="uploadWetchFileDialogVisible" :close-on-click-modal="false" @close="uploadWetchFileDialogClosed" title="微信公众号域名验证文件上传" width="800px" top="6vh">
                    <div>
                        <WetchPublicFile ref="wetchPublicFileRef"   @refreshData="refreshData" />
                    </div>
                    <template #footer>
                  <span class="dialog-footer">
                      <el-button type="primary" size="small" @click="submitUpload">确定</el-button>
                      <el-button size="small" @click="uploadWetchFileDialogVisible = false">取消</el-button>
                  </span>
                    </template>
                </el-dialog>
            </div>
        </el-card>
    </div>
</template>

<script>
    import {main, createChildRef, updateChildRef, wetchPublicFileRef } from '@/hooks/mch/wechatPay/index.js'
    import Create from '@/views/mch/wechatPay/Create.vue'
    import Update from '@/views/mch/wechatPay/Update.vue'
    import WetchPublicFile from '@/views/mch/wechatPay/WetchPublicFile.vue'
    export default {
        name: "WechatPay",
        components: {
            Create,
            Update,
            WetchPublicFile
        },
        setup() {
            return {
                ...main(),
                createChildRef,
                updateChildRef,
                wetchPublicFileRef
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
