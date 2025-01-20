<template>
  <div>
    <el-card class="box-card" :body-style="{ padding: 0 }" shadow="never">
      <div class="ml-20 mt-20 flex-row justify-between align-center">
        <el-form inline size="small" @submit.prevent="false">
          <el-form-item label="选择企业：">
            <el-select filterable clearable v-model="companyId" placeholder="请选择企业">
              <el-option
                v-for="item in companyMiniList"
                :key="item.id"
                :label="item.company_name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择食堂：">
            <el-select filterable clearable v-model="canteenId" placeholder="请选择食堂">
              <el-option
                v-for="item in canteenMiniList"
                :key="item.id"
                :label="item.canteen_name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="设备类型：">
            <el-select
              filterable
              clearable
              v-model="clientTypeId"
              placeholder="请选择设备类型"
            >
              <el-option
                v-for="item in clientTypeMiniList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input
              v-model.trim="keyWords"
              placeholder="设备名称/设备编号/备注"
              @keyup.enter="queryData"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="queryData">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="resetData" icon="el-icon-refresh">
            </el-button>
          </el-form-item>
        </el-form>
        <el-form inline size="small">
          <el-form-item>
            <el-button type="primary" @click="activationCodeBtn">添加激活码 </el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table
        :header-cell-style="{ 'text-align': 'center', color: '#000' }"
        :data="tableData"
        size="small"
        align="center"
      >
        <el-table-column align="center" prop="id" label="Id" width="50px" />
        <el-table-column align="center" label="企业名称">
          <template #default="{ row }">
            <div>{{ row.company.company_name }}</div>
          </template>
        </el-table-column>
        <el-table-column align="center"  label="食堂名称">
          <template #default="{ row }">
            <div  v-if="row.canteen">{{ row.canteen.canteen_name }}</div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="设备类型名称">
          <template #default="{ row }">
            <div>{{ row.client_type.name }}</div>
          </template>
        </el-table-column>
        <el-table-column align="center"  label="激活状态">
          <template #default="{ row }">
            <el-tag class="mx-1" type="success" size="small">{{
              !row.is_activate ? "未使用" : "已使用"
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="activate_code" label="激活码" />
        <el-table-column align="center" prop="expiry_at" label="过期时间" />
        <el-table-column align="center" prop="update_at" label="更新时间" />
        <el-table-column label="操作" align="center" width="220px">
          <template #default="{ row }">
            <el-button
              size="mini"
              type="primary"
              @click="handleQrCode(row.id)"
              >二维码</el-button
            >
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="deleteActivationCode(row)"
              >删除</el-button
            >
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
        <el-drawer  v-model="createDrawer" title="添加激活码" direction="rtl" size="50%">
          <div>
            <Create ref="createChildRef" @refreshData="refreshData" />
          </div>
          <div class="mt-60 flex-row justify-end mr-30">
            <el-button type="primary" class="width-140" @click="submitActivationCode"
              >生成</el-button
            >
            <el-button class="width-80" @click="createDrawer = false">取消</el-button>
          </div>
        </el-drawer>
      </div>
      
   <el-dialog
    v-model="dialogVisible"
    title="二维码"
    width="450px"
  >
    <div>
        <div v-if="qrCodeData" class="qrcode">
            <div class="mb-12">{{qrCodeData.client_name}}</div>
            <div class="mb-12">{{qrCodeData.client_no}}</div>
            <img :src="qrCodeData.base64_image" alt="">
        </div>
         <div class="flex-row  justify-end">
            <el-button @click="screenshotHandler" type="primary" icon="el-icon-download" size="mini">下载二维码</el-button>
         </div>
    </div>
   </el-dialog>
    </el-card>
  </div>
</template>
<script>
import Create from "@/views/client/clientActivationCode/Create.vue";
import { main } from "@/hooks/client/clientActivationCode/index.js";
import html2canvas from 'html2canvas';
export default {
  name: "ClientTypeRelevancy",
  components: {
    Create,
  },
  setup() {
    const screenshotHandler=()=> {
  html2canvas(document.querySelector('.qrcode')).then(function (canvas) {
    let a = document.createElement("a");
    // 将 canvas  方法返回一个包含图片展示的 data URI 。可以使用 type
    // 参数其类型，默认为 PNG 格式。图片的分辨率为96dpi。
    a.href = canvas.toDataURL("image/png", 1.0);
    //将 a 标签插入到页面中
    document.body.appendChild(a);
    //download 下载图片
    a.download = canvas.toDataURL("image/png", 1.0);
    // 模拟a标签的点击事件
    var e = document.createEvent("MouseEvents");
    e.initEvent("click", true, true);
    a.dispatchEvent(e);
  });
}
    return {
        screenshotHandler,
      ...main(),
    };
  },
};
</script>
<style lang="scss" scoped>
    .qrcode{
        margin: 0 auto;
        width: 250px;
        text-align: center;
        padding: 20px 30px;
        font-size: 16px;
        color: #000;
        img{
            width: 200px;
            height: 200px;
        }
    }
    /deep/ .el-dialog__body{
        padding-top: 0px;
    }
</style>
