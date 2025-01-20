<template>
    <div>
        <el-card class="box-card" :body-style="{padding: 15}" shadow="never">
            <div class="ml-20 mt-20 flex-row justify-between align-center ">
                <el-form inline size="small"  @submit.prevent="false;">
                    <el-form-item >
                        <el-input v-model.trim="keyWords" placeholder="名称" @keyup.enter="queryData"></el-input>
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
            <ul>
                <li v-for="item in tableData" :key="item.id">
                    <p class="flex-row justify-between  parent-item">
                        <span>
                            {{item.title}}   <router-link v-if="item.uri" class="path" :to="item.uri">{{item.uri}}</router-link>
                        </span>
                        <span>
                            <span class="mr-16">排序: {{item.order}}</span>
                             <a @click="getMenuDetail(item)" class="edit-icon mr-12" title="编辑" href="javascript:void(0)"><i class="el-icon-edit"></i></a>
                              <a @click="deleteMenu(item)" class="delete-icon" title="删除" href="javascript:void(0)"><i class="el-icon-delete"></i></a>
                        </span>

                    </p>
                    <ul class="ml-50" v-if="item.child.length >0">
                        <li class="child-item" v-for="child in item.child" :key="child.id">
                            <span class="flex-row justify-between">
                                <span>{{child.title}}  <router-link v-if="child.uri" class="path" :to="child.uri">{{hostName}}{{child.uri}}</router-link> </span>
                                <span>
                                    <span class="mr-16">排序: {{child.order}}</span>
                                    <a  @click="getMenuDetail(child)" class="edit-icon mr-12" title="编辑"  href="javascript:void(0)"><i class="el-icon-edit"></i></a>
                                    <a @click="deleteMenu(child)" class="delete-icon" title="删除" href="javascript:void(0)"><i class="el-icon-delete"></i></a>
                                </span>
                            </span>
                        </li>
                    </ul>
                </li>
            </ul>
            <div>
                <el-dialog v-model="createDialogVisible" title="添加" @close="createDialogClosed" width="555px" :close-on-click-modal="false">
                    <div>
                        <Create ref="createChildRef" :parentList="parentList" @refreshData="refreshData" />
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
                <el-dialog   v-model="updateDialogVisible" destroy-on-close title="编辑" @close="updateDialogClosed" width="555px" :close-on-click-modal="false">
                    <div>
                        <Update ref="updateChildRef" :parentList="parentList"  @refreshData="refreshData" :detail="detail" />
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
    import { main, updateChildRef, createChildRef} from '@/hooks/auth/menu/index.js'
    import Create from '@/views/auth/menu/Create'
    import Update from '@/views/auth/menu/Update'
    export default {
        name: "Menu",
        components: {
            Create,
            Update
        },
        setup() {
            const hostName = `${location.protocol}//${location.host}/#`
            return {
                ...main(),
                updateChildRef,
                createChildRef,
                hostName
            }
        }
    }
</script>

<style lang="scss" scoped>
.child-item{
    background-color: #fbfdff;
    border: 1px dashed #c0ccda;
    height: 36px;
    line-height: 36px;
    font-size: 12px;
    margin: 5px 0;
    border-radius: 4px;
    padding-left: 20px;
    padding-right: 15px;
    cursor: pointer;
    color: #606266;
    &:hover{
        border-color: #409eff;
    }
}
.parent-item {
   font-size: 14px;
   height: 36px;
   line-height: 36px;
   border: 1px solid #E4E7ED;
   margin: 6px 0 ;
    padding-left:  20px;
    padding-right: 15px;
}

.delete-icon {
    color: #F56C6C !important;
}
.edit-icon {
   color: #409eff;
}
.path {
    color: #8cc5ff;
}
</style>
