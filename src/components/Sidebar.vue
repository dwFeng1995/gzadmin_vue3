<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
                 text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <template v-for="item in menuList">
                <template v-if="item.child.length >0">
                    <el-submenu v-if="item.is_hidden === 0" :index="`${item.id}`" :key="item.id">
                        <template #title>
<!--                            <i :class="item.icon"></i>-->
                            <i class="el-icon-s-promotion"></i>
                            <span>{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.child" :key="subItem.id">
                            <el-menu-item  v-if="subItem.is_hidden === 0"  :index="subItem.uri" >{{ subItem.title }}
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item  v-if="item.is_hidden === 0" :index="item.uri" :key="item.id">
<!--                        <i :class="item.icon"></i>-->
                        <i v-if="item.uri === '/dashboard'" class="el-icon-s-home"></i>
                        <i v-else class="el-icon-s-promotion"></i>
                        <template #title>{{ item.title }}</template>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
import { computed } from "vue"
import { useStore } from "vuex"
import { useRoute } from "vue-router"
export default {
    setup() {
        const route = useRoute()
        const onRoutes = computed(() => {
            return route.path;
        })

        const store = useStore();
        const collapse = computed(() => store.state.collapse);
        const menuList = store?.getters?.getMenuList  ?? []
        return {
            onRoutes,
            collapse,
            menuList
        }
    }
}
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}
.sidebar > ul {
    height: 100%;
}
</style>
