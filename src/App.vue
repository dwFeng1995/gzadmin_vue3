<template>
  <div class="app">
    <el-config-provider :locale="locale">
    <router-view />
    </el-config-provider>
  </div>

</template>

<script>
import {ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
export default {
  name: 'App',
  components: {
    ElConfigProvider
  },
  setup() {
    return {
      locale: zhCn
    }
  }
}
</script>

<style lang="scss" scoped>
.app {
  width: 100%;
  height: 100%;
}
</style>
