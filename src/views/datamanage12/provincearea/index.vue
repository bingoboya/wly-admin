<template>
  <div style="padding:30px;">
    <!-- <el-alert :closable="false" title="menu 1"> -->
      <div>
        省份地区名： 广东
        <router-view />
      </div>
    <!-- </el-alert> -->
  </div>
</template>
<script>
export default {
  name: 'provincearea'
}
</script>

