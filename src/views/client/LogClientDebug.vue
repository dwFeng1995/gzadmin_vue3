<template>
    <div>
        <el-card class="box-card" :body-style="{padding: 0}" shadow="never">

            <div class="ml-20 mt-20 flex-row justify-between align-center ">
                <el-form inline size="small">
                    <el-form-item label="选择企业：">
                        <el-select filterable clearable v-model="companyId" placeholder="请选择企业">
                            <el-option
                                    v-for="item in companyMiniList"
                                    :key="item.id"
                                    :label="item.company_name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="选择食堂：">
                        <el-select filterable clearable  v-model="canteenId" placeholder="请选择食堂">
                            <el-option
                                    v-for="item in canteenMiniList"
                                    :key="item.id"
                                    :label="item.canteen_name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="选择设备：">
                        <el-select filterable clearable v-model="clientId" placeholder="请选择设备">
                            <el-option
                                    v-for="item in clientPayMiniList"
                                    :key="item.id"
                                    :label="item.client_name  === null ? 'null' : item.client_name"
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
            </div>
            <el-table :header-cell-style="{'text-align':'center','color':'#000'}" :data="tableData" size="small" align="center">
                <el-table-column align="center" width="140"  label="企业名称" >
                    <template #default="{row}">
                        <div>{{row?.canteen?.company?.company_name}}</div>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="企业号" >
                    <template #default="{row}">
                        <div>{{row?.canteen?.company?.company_no}}</div>
                    </template>
                </el-table-column>
                <el-table-column align="center"   label="食堂名称" >
                    <template #default="{row}">
                        <div>{{row?.canteen?.canteen_name}}</div>
                    </template>
                </el-table-column>
                <el-table-column align="center"   label="食堂号" >
                    <template #default="{row}">
                        <div>{{row?.canteen?.canteen_no}}</div>
                    </template>
                </el-table-column>
                <el-table-column align="center"  label="设备名称" >
                    <template #default="{row}">
                        <div>{{row?.client?.client_name}}</div>
                    </template>
                </el-table-column>
                <el-table-column align="center"  label="设备号" >
                    <template #default="{row}">
                        <div>{{row?.client?.client_no}}</div>
                    </template>
                </el-table-column>
                <el-table-column align="center"  label="文件" >
                    <template #default="{row}">
                        <div>
<!--                            <a :href="row.file_path" >-->
<!--                                {{row.file_path === 'javascript:void(0)' ? '无文件' : '点击下载'}}-->
<!--                            </a>-->
                            <el-link :href="row.file_path"  :underline="false" type="primary" >
                                {{row.file_path === 'javascript:void(0)' ? '无文件' : '点击下载'}}
                            </el-link>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="创建时间" align="center" prop="create_at"></el-table-column>
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
    </div>
</template>

<script>
    import {main } from '@/hooks/client/logClientDebug.js'
    export default {
        name: "LogClientDebug",
        setup() {
            return {
                ...main()
            }
        }
    }
</script>

<style scoped>

</style>
