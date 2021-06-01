<template>
  <!-- 日分时曲线编辑 -->
  <el-dialog
    append-to-body
    title="日分时曲线编辑"
    :visible.sync="dialogDayToHourCurve.toggle"
  >
    <el-form :model="timesasingSchemeDetial">
      <div>
        <div>日分时曲线编辑</div>
        <div>
          <el-form-item label="输入方式选择*">
            <el-switch
              active-text="24点"
              inactive-text="12点"
              :width="60"
              v-model="timesasingSchemeDetial.chooseStyle"
            />
          </el-form-item>
        </div>
        <div>
          <el-form-item
            label="曲线名称"
            :label-width="formLabelWidth"
            prop="name"
            :rules="[
              { required: true, message: '请输入曲线名称', trigger: 'blur' },
            ]"
          >
            <el-input
              v-model="timesasingSchemeDetial.name"
              autocomplete="off"
            />
          </el-form-item>
        </div>
      </div>
    </el-form>
    <!-- 图表模块 -->
    <div>
      <div>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="dateType" label="日期类型" />
          <el-table-column prop="weight" label="权重" />
        </el-table>
      </div>
      <div>
        <el-row
          style="background: #fff; padding: 16px 16px 0; margin-bottom: 32px"
        >
          <div class="chart-wrapper">
            <dayToHourCurveEcharts />
          </div>
        </el-row>
      </div>
    </div>
  </el-dialog>
</template>
<script>
import dayToHourCurveEcharts from "./dayToHourCurveEcharts";

export default {
  components: { dayToHourCurveEcharts },
  props: {
    dialogDayToHourCurve: {
      type: Object,
    },
  },
  methods: {},
  data() {
    return {
      tableData: [
        {
          dateType: "节假日",
          weight: "0.71",
        },
        {
          dateType: "工作日",
          weight: "0.43",
        },
        {
          dateType: "星期六",
          weight: "0.57",
        },
        {
          dateType: "星期日",
          weight: "0.27",
        },
        {
          dateType: "调休节假日",
          weight: "0.75",
        },
      ],
      // 分时方案详情页面 -- 弹窗表单
      timesasingSchemeDetial: {
        name: "",
      },
      formLabelWidth: "120px",
    };
  },
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.chart-wrapper {
  background: #fff;
  padding: 16px 16px 0;
  margin-bottom: 32px;
}
::v-deep .el-switch__label--left {
  position: relative;
  left: 60px;
  color: #fff;
  z-index: -1111;
}
::v-deep .el-switch__label--right {
  position: relative;
  right: 54px;
  color: #fff;
  z-index: -1111;
}
::v-deep .el-switch__label--right {
  margin-left: 0 !important;
}
::v-deep .el-switch__label--right.is-active {
  z-index: 1111;
  color: #fff !important;
}
::v-deep .el-switch__label--left.is-active {
  z-index: 1111;
  color: #9c9c9c !important;
}
</style>