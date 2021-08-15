<template>
  <section class="app-main">
    <!-- :include这个属性缓存不起作用，没找到原因 -->
    <!-- <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive>
    </transition> -->
    <!-- 改成用下面的缓存方式 关键字用 needCache，需要缓存的路由在路由中配置 needCache:true -->
    <transition name="fade-transform" mode="out-in">
      <keep-alive>
        <router-view v-if="$route.meta.needCache" :key="key" />
      </keep-alive>
    </transition>
    <transition name="fade-transform" mode="out-in">
      <router-view v-if="!$route.meta.needCache" :key="key" />
    </transition>
    <div v-if="$store.state.settings.showFooter" id="el-main-footer">
      <span v-html="$store.state.settings.footerTxt" />
      <span> ⋅ </span>
      <a href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank">{{ $store.state.settings.caseNumber }}</a>
    </div>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.path
    }
  }
}
</script>

<style lang="scss" scoped>
.app-main {
  /* 50= navbar  50  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
  min-width: 1063px;
}

.fixed-header+.app-main {
  padding-top: 50px;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    /* 84 =  tags-view =  34 */
    min-height: calc(100vh - 34px);
  }

  .fixed-header+.app-main {
    //TODO
    padding-top: 124px;
    /* padding-top: 84px; */
  }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
