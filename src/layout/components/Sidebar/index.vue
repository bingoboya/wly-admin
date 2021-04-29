<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <!-- <div style="display: flex;">
      <div @click="changeRoutes(7)" style="margin: 0 10px;background: pink;padding: 0 6px;font-size:16px">1</div>
      <div @click="changeRoutes(8)" style="margin: 0 10px;background: pink;padding: 0 6px;font-size:16px">2</div>
      <div @click="changeRoutes(9)" style="margin: 0 10px;background: pink;padding: 0 6px;font-size:16px">3</div>
    </div> -->
      <el-scrollbar v-show="currentSidebarRouter==7" wrap-class="scrollbar-wrapper">
        <el-menu
          :default-active="activeMenu"
          :collapse="isCollapse"
          :background-color="variables.menuBg"
          :text-color="variables.menuText"
          :unique-opened="$store.state.settings.uniqueOpened"
          :active-text-color="variables.menuActiveText"
          :collapse-transition="false"
          mode="vertical"
        >
          <!-- <sidebar-item v-for="route in sidebarRouters" :key="route.path" :item="route" :base-path="route.path" /> -->
          <sidebar-item v-for="route in sidebarRouters.slice(0,7)" :key="route.path" :item="route" :base-path="route.path" />
        </el-menu>
      </el-scrollbar>
      <el-scrollbar v-show="currentSidebarRouter==8" wrap-class="scrollbar-wrapper">
        <el-menu
          :default-active="activeMenu"
          :collapse="isCollapse"
          :background-color="variables.menuBg"
          :text-color="variables.menuText"
          :unique-opened="!$store.state.settings.uniqueOpened"
          :active-text-color="variables.menuActiveText"
          :collapse-transition="false"
          mode="vertical"
        >
          <sidebar-item v-for="route in sidebarRouters.slice(7,8)" :key="route.path" :item="route" :base-path="route.path" />
        </el-menu>
      </el-scrollbar>
      <el-scrollbar v-show="currentSidebarRouter==9" wrap-class="scrollbar-wrapper">
        <el-menu
          :default-active="activeMenu"
          :collapse="isCollapse"
          :background-color="variables.menuBg"
          :text-color="variables.menuText"
          :unique-opened="$store.state.settings.uniqueOpened"
          :active-text-color="variables.menuActiveText"
          :collapse-transition="false"
          mode="vertical"
        >
          <sidebar-item v-for="route in sidebarRouters.slice(8,10)" :key="route.path" :item="route" :base-path="route.path" />
        </el-menu>
      </el-scrollbar>
      
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/assets/styles/variables.scss'

export default {
  components: { SidebarItem, Logo },
  data() {
    return {
      chooseRoutes: 7
    }
  },
  created () {
    console.log(66, this.sidebarRouters.slice(7,8));
  },
  methods: {
    changeRoutes(val) {
      console.log(val);
      this.chooseRoutes = val
      // 设置顶部页签的当前的选中项
      this.$store.dispatch('tagsView/changeCurrentActiveName', val)
    }
  },
  watch: {
    currentSidebarRouter: (newValue, oldValue)=>{
      console.log(5678,newValue);
    },
  },
  computed: {
    ...mapGetters([
      'currentSidebarRouter', //切换顶部tab-pane页签，修改侧边栏的对应路由模块的显示
      'sidebarRouters',
      'sidebar'
    ]),
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // console.log(55, meta, path);
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
