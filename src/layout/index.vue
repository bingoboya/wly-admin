<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <sidebar class="sidebar-container" />
    <div :class="{hasTagsView:needTagsView}" class="main-container">

      <div :class="{'fixed-header':fixedHeader}">
        <el-tabs v-model="activeName" style="margin-bottom: -14px;" @tab-click="handleClick">
          <el-tab-pane label="用户管理" name="7" />
          <el-tab-pane label="配置管理" name="8" />
          <el-tab-pane label="角色管理" name="9" />
        </el-tabs>
        <navbar />
        <tags-view v-if="needTagsView" />
      </div>
      <app-main />
      <right-panel v-if="showSettings">
        <settings />
      </right-panel>
    </div>
    <!--  防止刷新后主题丢失  -->
    <Theme v-show="false" ref="theme" />
  </div>
</template>

<script>
import RightPanel from '@/components/RightPanel'
import { AppMain, Navbar, Settings, Sidebar, TagsView } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import { mapState, mapGetters } from 'vuex'
import Theme from '@/components/ThemePicker'
import Cookies from 'js-cookie'
export default {
  name: 'Layout',
  components: {
    AppMain,
    Navbar,
    RightPanel,
    Settings,
    Sidebar,
    TagsView,
    Theme
  },
  mixins: [ResizeMixin],
  data() {
    return {
      activeName: this.currentActiveName // 设置顶部页签的当前的选中项
    }
  },

  computed: {
    ...mapGetters([
      'visitedViews',
      'currentActiveName'// 设置顶部页签的当前的选中项
    ]),
    ...mapState({
      sidebar: state => state.app.sidebar,
      device: state => state.app.device,
      showSettings: state => state.settings.showSettings,
      needTagsView: state => state.settings.tagsView,
      fixedHeader: state => state.settings.fixedHeader
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  watch: {
    currentActiveName(newValue, oldval) {
      // 设置顶部页签的当前的选中项
      this.activeName = newValue.toString()
    },
    visitedViews(newValue, oldval) {
      // tags页签变化时，修改顶部导航
      this.setActiveName()
    }
  },
  mounted() {
    this.setActiveName()
    if (Cookies.get('theme')) {
      this.$refs.theme.theme = Cookies.get('theme')
      this.$store.dispatch('settings/changeSetting', {
        key: 'theme',
        value: Cookies.get('theme')
      })
    }
  },
  methods: {
    setActiveName() {
      // 刷新页面后，根据tags页签，根据最后一个页签的meta.activeName设置当前激活的的页签所在的顶部导航
      const curVisitedViews = this.$store.state.tagsView.visitedViews
      const aa = curVisitedViews[curVisitedViews.length - 1].meta
      const curVisitedView = aa.activeName ? aa.activeName : '7'
      // 设置顶部页签的当前的选中项
      this.activeName = curVisitedView.toString()
      // 切换顶部tab-pane页签，修改侧边栏的对应路由模块的显示
      this.$store.dispatch('tagsView/changeCurrentSidebarRouter', curVisitedView)
    },
    handleClick(tab, event) {
      // 切换顶部tab-pane页签，修改侧边栏的对应路由模块的显示
      // console.log('handleClick', tab.name, tab);
      this.$store.dispatch('tagsView/changeCurrentSidebarRouter', tab.name)
      this.$store.dispatch('tagsView/changeCurrentActiveName', tab.name)
    },
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/assets/styles/mixin.scss";
  @import "~@/assets/styles/variables.scss";

  .top-nav{
    display: flex;
    .top-nav-item{
      padding: 2px 5px;
      background-color: rgb(156, 156, 185);
      margin: 10px 10px;
    }
  }

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;

    &.mobile.openSidebar {
      position: fixed;
      top: 0;
    }
  }

  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    background: #fff;
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
    padding: 0;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }

  .mobile .fixed-header {
    width: 100%;
  }
</style>
